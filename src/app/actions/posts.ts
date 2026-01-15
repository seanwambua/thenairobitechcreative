'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Post } from '@prisma/client';

export async function createPost(data: Omit<Post, 'id' | 'likes' | 'createdAt' | 'updatedAt' | 'comments' | 'date'>) {
    const newPost = await prisma.post.create({
        data: {
            ...data,
            likes: 0,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            comments: '', // Storing comments as a string for now
        },
    });
    revalidatePath('/dashboard/content');
    revalidatePath('/blog');
    revalidatePath(`/blog/${newPost.slug}`);
    return newPost;
}

export async function updatePost(post: Post) {
    const updatedPost = await prisma.post.update({
        where: { id: post.id },
        data: post,
    });
    revalidatePath('/dashboard/content');
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    return updatedPost;
}

export async function deletePost(postId: number) {
    await prisma.post.delete({
        where: { id: postId },
    });
    revalidatePath('/dashboard/content');
    revalidatePath('/blog');
}
