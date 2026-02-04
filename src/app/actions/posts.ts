'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PostSchema, PostInputSchema, PostSummary } from '@/lib/schemas';
import type { Post } from '@/generated/client';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { z } from 'zod';
import { auth } from '@/auth';

export async function getPosts(): Promise<Post[]> {
  const results = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return results;
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  const results = await prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      imageUrl: true,
      imageHint: true,
      author: true,
      authorAvatarUrl: true,
      authorAvatarHint: true,
      _count: {
        select: { likes: true, comments: true },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Remap the data to flatten the _count object and ensure correct types
  return results.map((post) => ({
    ...post,
    likes: post._count.likes,
    comments: String(post._count.comments), // Convert number to string to match PostSummary type
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await prisma.post.findUnique({
    where: { slug },
  });
  return result;
}

// Helper function to generate a URL-friendly slug
function generateSlug(title: string): string {
  return String(title || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars, but keep spaces and hyphens
    .replace(/[\s_-]+/g, '-') // collapse whitespace and underscores to a single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

// Helper function to ensure slug is unique
async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlug(title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Check if the slug already exists and append a number if it does
  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
}

export async function createPost(
  data: z.infer<typeof PostInputSchema>
): Promise<Post> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const validatedData = PostInputSchema.parse(data);
  const uniqueSlug = await generateUniqueSlug(validatedData.title);

  const newPost = await prisma.post.create({
    data: {
      ...validatedData,
      slug: uniqueSlug,
      imageUrl: validatedData.imageUrl ?? placeholderImages.blog1Image.imageUrl,
      imageHint: placeholderImages.blog1Image.imageHint,
      authorAvatarUrl:
        validatedData.authorAvatarUrl ??
        placeholderImages.testimonial1Image.imageUrl,
      authorAvatarHint: placeholderImages.testimonial1Image.imageHint,
    },
  });

  revalidatePath('/dashboard/content');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/blog');
  revalidatePath(`/blog/${newPost.slug}`);
  return newPost;
}

export async function updatePost(post: Post): Promise<Post> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  try {
    const validatedData = PostSchema.parse(post);
    const { id, slug } = validatedData; // Keep original slug for revalidation

    // Prepare data for update, excluding immutable and relational fields.
    const {
      id: _id,
      slug: _slug,
      createdAt: _createdAt,
      userId: _userId,
      likes: _likes, // Exclude relational field
      comments: _comments, // Exclude relational field
      ...dataToUpdate
    } = validatedData;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`); // Use the original, immutable slug
    revalidatePath('/');
    return updatedPost;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`
      );
    } else {
      // Handle other potential errors (e.g., database connection)
      throw new Error('Failed to update post due to a server error.');
    }
  }
}

export async function deletePost(postId: number): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (post) {
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
  }
}
