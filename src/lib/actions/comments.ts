'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Role } from '@/lib/roles';

const CommentInputSchema = z.object({
  content: z.string().min(1),
  postId: z.number(),
});

export async function createComment(data: z.infer<typeof CommentInputSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to create a comment.');
  }

  const validatedData = CommentInputSchema.parse(data);

  const newComment = await prisma.comment.create({
    data: {
      ...validatedData,
      userId: session.user.id,
    },
  });

  revalidatePath(`/blog/${newComment.postId}`);
  return newComment;
}

export async function updateComment(commentId: number, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to update a comment.');
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comment not found.');
  }

  if (session.user.role !== Role.ADMIN && session.user.id !== comment.userId) {
    throw new Error('You are not authorized to update this comment.');
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });

  revalidatePath(`/blog/${updatedComment.postId}`);
  return updatedComment;
}

export async function deleteComment(commentId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to delete a comment.');
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comment not found.');
  }

  if (session.user.role !== Role.ADMIN && session.user.id !== comment.userId) {
    throw new Error('You are not authorized to delete this comment.');
  }

  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
  });

  revalidatePath(`/blog/${deletedComment.postId}`);
  return deletedComment;
}

export async function getComments(postId: number) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
