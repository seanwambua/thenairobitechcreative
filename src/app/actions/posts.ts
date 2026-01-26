
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PostSchema, PostInputSchema } from '@/lib/schemas';
import type { Post } from '@/app/generated/prisma';
import { placeholderImages } from '@/lib/placeholder-images';
import { z } from 'zod';

export async function getPosts(): Promise<Post[]> {
  const results = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return results;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) {
    return null;
  }
  const result = await prisma.post.findUnique({
    where: { slug },
  });
  return result;
}

export async function createPost(
  data: z.infer<typeof PostInputSchema>
): Promise<Post> {
  const validatedData = PostInputSchema.parse(data);

  const newPost = await prisma.post.create({
    data: {
      ...validatedData,
      slug: String(validatedData.title || '')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // remove non-word chars, but keep spaces and hyphens
        .replace(/[\s_-]+/g, '-') // collapse whitespace and underscores to a single hyphen
        .replace(/^-+|-+$/g, ''), // trim leading/trailing hyphens
      imageUrl: placeholderImages.blog1Image.imageUrl,
      imageHint: placeholderImages.blog1Image.imageHint,
      authorAvatarUrl: placeholderImages.testimonial1Image.imageUrl,
      authorAvatarHint: placeholderImages.testimonial1Image.imageHint,
      likes: 0,
      comments: '',
    },
  });

  revalidatePath('/dashboard/content');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/blog');
  revalidatePath(`/blog/${newPost.slug}`);
  return newPost;
}

export async function updatePost(post: Post): Promise<Post> {
  const validatedData = PostSchema.parse(post);
  const { id, slug } = validatedData; // Keep original slug for revalidation

  // Prepare data for update, excluding immutable fields like id and slug.
  const {
    id: _id,
    slug: _slug,
    createdAt: _createdAt,
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
}

export async function deletePost(postId: number): Promise<void> {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (post) {
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
  }
}

export async function likePost(postId: number): Promise<Post> {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new Error('Post not found');
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/blog/${post.slug}`);
  return updatedPost;
}
