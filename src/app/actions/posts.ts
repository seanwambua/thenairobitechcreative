'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PostSchema } from '@/lib/schemas';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Post } from '@prisma/client';
import { z } from 'zod';

// Action to get all posts
export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createPost(data: Pick<Post, 'title' | 'description' | 'content' | 'author'>) {
    const validatedData = PostSchema.pick({
      title: true,
      description: true,
      content: true,
      author: true,
    }).parse(data);

    const newPost = await prisma.post.create({
        data: {
          ...validatedData,
          slug: validatedData.title.toLowerCase().replace(/\s+/g, '-'),
          imageUrl: placeholderImages.blog1.imageUrl,
          imageHint: placeholderImages.blog1.imageHint,
          authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
          authorAvatarHint: placeholderImages.testimonial1.imageHint,
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


export async function updatePost(post: Post) {
    const validatedData = PostSchema.parse(post);
    const updatedPost = await prisma.post.update({
        where: { id: validatedData.id },
        data: validatedData,
    });
    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    return updatedPost;
}

export async function deletePost(postId: number) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post) {
        await prisma.post.delete({
            where: { id: postId },
        });
        revalidatePath('/dashboard/content');
        revalidatePath('/dashboard/analytics');
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
    }
}
