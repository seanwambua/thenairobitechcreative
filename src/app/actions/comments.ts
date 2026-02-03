'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Role } from '@/generated/client';

const CreateCommentSchema = z.object({
  postId: z.number(),
  comment: z.string().min(1, 'Comment must be at least 1 character'),
});

const UpdateCommentSchema = z.object({
  commentId: z.number(),
  comment: z.string().min(1, 'Comment must be at least 1 character'),
});

const DeleteCommentSchema = z.object({
  commentId: z.number(),
});

export async function createComment(values: z.infer<typeof CreateCommentSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: You must be logged in to comment.');
  }

  const validatedValues = CreateCommentSchema.parse(values);

  const newComment = await db.comment.create({
    data: {
      content: validatedValues.comment,
      postId: validatedValues.postId,
      userId: session.user.id,
    },
  });

  revalidatePath(`/blog/${validatedValues.postId}`);

  return newComment;
}

export async function updateComment(values: z.infer<typeof UpdateCommentSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: You must be logged in to update this comment.');
  }

  const validatedValues = UpdateCommentSchema.parse(values);

  const commentToUpdate = await db.comment.findUnique({
    where: { id: validatedValues.commentId },
  });

  if (!commentToUpdate) {
    throw new Error('Comment not found.');
  }

  if (commentToUpdate.userId !== session.user.id && session.user.role !== Role.ADMIN) {
    throw new Error('Forbidden: You are not authorized to update this comment.');
  }

  const updatedComment = await db.comment.update({
    where: { id: validatedValues.commentId },
    data: {
      content: validatedValues.comment,
    },
  });

  revalidatePath(`/blog/${commentToUpdate.postId}`);

  return updatedComment;
}

export async function deleteComment(values: z.infer<typeof DeleteCommentSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: You must be logged in to delete this comment.');
  }

  const validatedValues = DeleteCommentSchema.parse(values);

  const commentToDelete = await db.comment.findUnique({
    where: { id: validatedValues.commentId },
  });

  if (!commentToDelete) {
    throw new Error('Comment not found.');
  }

  if (commentToDelete.userId !== session.user.id && session.user.role !== Role.ADMIN) {
    throw new Error('Forbidden: You are not authorized to delete this comment.');
  }

  await db.comment.delete({
    where: { id: validatedValues.commentId },
  });

  revalidatePath(`/blog/${commentToDelete.postId}`);

  return { success: true };
}

export async function getComments(postId: number) {
  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return comments;
}
