
'use server';

import { db } from '@/lib/db/index';
import { revalidatePath } from 'next/cache';
import { PostSchema, PostInputSchema } from '@/lib/schemas';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Post } from '@prisma/client';
import { z } from 'zod';

export async function getPosts() {
    const results = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return results;
}

export async function getPostBySlug(slug: string) {
    const result = await db.post.findUnique({
        where: { slug },
    });
    return result;
}

export async function createPost(data: z.infer<typeof PostInputSchema>) {
    const validatedData = PostInputSchema.parse(data);

    const newPost = await db.post.create({
        data: {
            ...validatedData,
            slug: String(validatedData.title || '').toLowerCase().replace(/\s+/g, '-'),
            imageUrl: placeholderImages.blog1.imageUrl,
            imageHint: placeholderImages.blog1.imageHint,
            authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
            authorAvatarHint: placeholderImages.testimonial1.imageHint,
            likes: 0,
            comments: '',
        }
    });

    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${newPost.slug}`);
    return newPost;
}


export async function updatePost(post: Post) {
    const validatedData = PostSchema.parse(post);
    const { id, title } = validatedData;
    
    const updatedPost = await db.post.update({
        where: { id },
        data: { 
            ...validatedData,
            slug: String(title || '').toLowerCase().replace(/\s+/g, '-'),
        },
    });

    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidatePath('/');
    return updatedPost;
}

export async function deletePost(postId: number) {
    const post = await db.post.findUnique({ where: { id: postId } });
    if (post) {
        await db.post.delete({ where: { id: postId } });
        revalidatePath('/dashboard/content');
        revalidatePath('/dashboard/analytics');
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
    }
}
