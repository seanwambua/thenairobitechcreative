'use server';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { PostSchema } from '@/lib/schemas';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Post } from '@/lib/data';
import { eq, desc } from 'drizzle-orm';

// Helper to convert string dates to Date objects
function toPost(record: typeof schema.posts.$inferSelect): Post {
    return {
        ...record,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
    };
}

// Action to get all posts
export async function getPosts() {
    const results = await db.query.posts.findMany({
        orderBy: [desc(schema.posts.createdAt)],
    });
    return results.map(toPost);
}

export async function createPost(data: Pick<Post, 'title' | 'description' | 'content' | 'author'>) {
    const validatedData = PostSchema.pick({
      title: true,
      description: true,
      content: true,
      author: true,
    }).parse(data);

    const [newPostRecord] = await db.insert(schema.posts).values({
          ...validatedData,
          slug: validatedData.title.toLowerCase().replace(/\s+/g, '-'),
          imageUrl: placeholderImages.blog1.imageUrl,
          imageHint: placeholderImages.blog1.imageHint,
          authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
          authorAvatarHint: placeholderImages.testimonial1.imageHint,
          likes: 0,
          comments: '',
        }).returning();
    
    const newPost = toPost(newPostRecord);

    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${newPost.slug}`);
    return newPost;
}


export async function updatePost(post: Post) {
    const validatedData = PostSchema.parse(post);
    const { createdAt, updatedAt, ...updateData } = validatedData;
    
    const [updatedPostRecord] = await db.update(schema.posts)
        .set({ ...updateData, updatedAt: new Date().toISOString() })
        .where(eq(schema.posts.id, validatedData.id))
        .returning();

    const updatedPost = toPost(updatedPostRecord);

    revalidatePath('/dashboard/content');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    return updatedPost;
}

export async function deletePost(postId: number) {
    const post = await db.query.posts.findFirst({ where: eq(schema.posts.id, postId) });
    if (post) {
        await db.delete(schema.posts).where(eq(schema.posts.id, postId));
        revalidatePath('/dashboard/content');
        revalidatePath('/dashboard/analytics');
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
    }
}
