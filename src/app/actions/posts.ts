'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Post } from '@prisma/client';
import { PostSchema } from '@/lib/schemas';
import { placeholderImages } from '@/lib/placeholder-images';

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'imageUrl' | 'imageHint' | 'authorAvatarUrl' | 'authorAvatarHint' | 'date' | 'likes' | 'comments'>) {
    const validatedData = PostSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).parse({
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      imageUrl: placeholderImages.blog1.imageUrl,
      imageHint: placeholderImages.blog1.imageHint,
      authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
      authorAvatarHint: placeholderImages.testimonial1.imageHint,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      comments: '',
    });

    const newPost = await prisma.post.create({
        data: validatedData,
    });

    revalidatePath('/dashboard/content');
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
