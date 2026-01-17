'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { PostSchema } from '@/lib/schemas';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Post } from '@prisma/client';

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

export async function createPost(data: Pick<Post, 'title' | 'description' | 'content' | 'author'>) {
    const validatedData = PostSchema.pick({
      title: true,
      description: true,
      content: true,
      author: true,
    }).parse(data);

    const newPost = await db.post.create({
        data: {
            ...validatedData,
            slug: validatedData.title.toLowerCase().replace(/\s+/g, '-'),
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
    const { id, title, description, content, author, imageUrl, imageHint, authorAvatarUrl, authorAvatarHint, likes, comments } = PostSchema.parse(post);
    
    const updatedPost = await db.post.update({
        where: { id },
        data: { 
            title,
            description,
            content,
            author,
            imageUrl,
            imageHint,
            authorAvatarUrl,
            authorAvatarHint,
            likes,
            comments,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
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
