'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Role } from '@/lib/roles';

/**
 * SCHEMAS & CONSTANTS
 */
const CommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(2000, "Comment too long"),
  postId: z.number(),
});

const MAX_PINS_PER_POST = 3;

/**
 * AUTHENTICATION HELPER
 * Ensures user is logged in and returns session data.
 */
async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to perform this action.');
  }
  return session.user;
}

/**
 * ACTIONS
 */

export async function createComment(data: z.infer<typeof CommentSchema>) {
  const user = await getAuthenticatedUser();
  const { content, postId } = CommentSchema.parse(data);

  // Create and fetch slug in one trip via 'include'
  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      userId: user.id,
    },
    include: { post: { select: { slug: true } } }
  });

  revalidatePath(`/blog/${newComment.post.slug}`);
  return { success: true, data: newComment };
}

export async function updateComment(commentId: number, content: string) {
  const user = await getAuthenticatedUser();
  
  // Validate input
  const validatedContent = z.string().min(1).max(2000).parse(content);

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true }
  });

  if (!comment) throw new Error('Comment not found.');
  if (user.role !== Role.ADMIN && user.id !== comment.userId) {
    throw new Error('Unauthorized to update this comment.');
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content: validatedContent },
    include: { post: { select: { slug: true } } }
  });

  revalidatePath(`/blog/${updatedComment.post.slug}`);
  return { success: true };
}

export async function deleteComment(commentId: number) {
  const user = await getAuthenticatedUser();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error('Comment not found.');
  if (user.role !== Role.ADMIN && user.id !== comment.userId) {
    throw new Error('Unauthorized to delete this comment.');
  }

  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
    include: { post: { select: { slug: true } } }
  });

  revalidatePath(`/blog/${deletedComment.post.slug}`);
  return { success: true };
}

export async function togglePinComment(commentId: number) {
  const user = await getAuthenticatedUser();

  // We use 'select' to ensure 'post' and 'isPinned' are available to TS
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      isPinned: true, 
      postId: true,
      post: {
        select: {
          userId: true, // Needed for auth check
          slug: true,   // Needed for revalidatePath
        }
      }
    }
  });

  if (!comment) throw new Error('Comment not found.');

  // Logic check: only authors of the post or admins can pin
  const isPostAuthor = comment.post.userId === user.id;
  const isAdmin = user.role === Role.ADMIN;
  if (!isPostAuthor && !isAdmin) throw new Error('Unauthorized');

  // Business Rule: Pin limit
  if (!comment.isPinned) {
    const pinnedCount = await prisma.comment.count({
      where: { postId: comment.postId, isPinned: true }
    });
    if (pinnedCount >= 3) throw new Error('Maximum of 3 pins reached.');
  }

  // Update
  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { isPinned: !comment.isPinned },
    include: { post: { select: { slug: true } } }
  });

  revalidatePath(`/blog/${updatedComment.post.slug}`);
  return { success: true };
}

export async function getComments(postId: number) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: { // SECURITY: Never leak hashed passwords or private emails
          id: true,
          name: true,
          image: true,
        }
      },
    },
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ],
  });
}