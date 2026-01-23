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
        .replace(/\s+/g, '-'),
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
  const { id, title } = validatedData;

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      ...validatedData,
      slug: String(title || '')
        .toLowerCase()
        .replace(/\s+/g, '-'),
    },
  });

  revalidatePath('/dashboard/content');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/blog');
  revalidatePath(`/blog/${updatedPost.slug}`);
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
