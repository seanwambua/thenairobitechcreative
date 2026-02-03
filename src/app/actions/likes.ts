'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';

const LikeInputSchema = z.object({
  postId: z.number(),
});

export async function likePost(data: z.infer<typeof LikeInputSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to like a post.');
  }

  const validatedData = LikeInputSchema.parse(data);

  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId: validatedData.postId,
      },
    },
  });

  if (existingLike) {
    throw new Error('You have already liked this post.');
  }

  const newLike = await db.like.create({
    data: {
      userId: session.user.id,
      postId: validatedData.postId,
    },
  });

  revalidatePath(`/blog/${newLike.postId}`);
  return newLike;
}

export async function unlikePost(data: z.infer<typeof LikeInputSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to unlike a post.');
  }

  const validatedData = LikeInputSchema.parse(data);

  const deletedLike = await db.like.delete({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId: validatedData.postId,
      },
    },
  });

  revalidatePath(`/blog/${deletedLike.postId}`);
  return deletedLike;
}

export async function getLikes(postId: number) {
  return await db.like.count({
    where: { postId },
  });
}

export async function hasLiked(postId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const like = await db.like.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId,
      },
    },
  });

  return !!like;
}
