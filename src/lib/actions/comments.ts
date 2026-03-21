'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import db from '@/lib/prisma';
import { Role } from '@/lib/roles';

const CommentSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  postId: z.number().int(),
});

async function getComments(postId: number) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return db.comment.findMany({
        where: { postId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
    });
}

export async function togglePinComment(commentId: number) {
  await new Promise(resolve => setTimeout(resolve, 400));
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }
  try {
    const comment = await db.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      return { success: false, message: 'Comment not found.' };
    }
    if (comment.userId !== session.user.id && session.user.role !== Role.ADMIN) {
      return { success: false, message: 'You are not authorized to pin this comment.' };
    }
    await db.comment.update({
      where: { id: commentId },
      data: { isPinned: !comment.isPinned },
    });
    revalidatePath(`/blog/${comment.postId}`);
    return { success: true, message: 'Comment pinned/unpinned successfully.' };
  } catch (error) {
    console.error('Error pinning/unpinning comment:', error);
    return { success: false, message: 'Failed to pin/unpin comment.' };
  }
}

export async function createComment(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 400));
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  const validatedFields = CommentSchema.safeParse({
    content: formData.get('content'),
    postId: parseInt(formData.get('postId') as string, 10),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid comment data.' };
  }

  const { content, postId } = validatedFields.data;

  try {
    await db.comment.create({
      data: {
        content,
        postId,
        userId: session.user.id as string,
      },
    });
    revalidatePath(`/blog/${postId}`);
    return { success: true, message: 'Comment posted successfully.' };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false, message: 'Failed to post comment.' };
  }
}

export async function updateComment(commentId: number, content: string) {
  await new Promise(resolve => setTimeout(resolve, 400));
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  if (!content.trim()) {
    return { success: false, message: 'Content cannot be empty.' };
  }

  try {
    const comment = await db.comment.findUnique({ where: { id: commentId } });

    if (!comment) {
      return { success: false, message: 'Comment not found.' };
    }

    if (comment.userId !== session.user.id && session.user.role !== Role.ADMIN) {
      return { success: false, message: 'You are not authorized to edit this comment.' };
    }

    await db.comment.update({
      where: { id: commentId },
      data: { content },
    });
    const post = await db.post.findFirst({ where: { comments: { some: { id: commentId } } } });

    if (post) {
      revalidatePath(`/blog/${post.id}`);
    }

    return { success: true, message: 'Comment updated successfully.' };
  } catch (error) {
    console.error('Error updating comment:', error);
    return { success: false, message: 'Failed to update comment.' };
  }
}

export async function deleteComment(commentId: number) {
  await new Promise(resolve => setTimeout(resolve, 400));
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  try {
    const comment = await db.comment.findUnique({ where: { id: commentId } });

    if (!comment) {
      return { success: false, message: 'Comment not found.' };
    }

    if (comment.userId !== session.user.id && session.user.role !== Role.ADMIN) {
      return { success: false, message: 'You are not authorized to delete this comment.' };
    }
    const post = await db.post.findFirst({ where: { comments: { some: { id: commentId } } } });

    await db.comment.delete({ where: { id: commentId } });

    if (post) {
      revalidatePath(`/blog/${post.id}`);
    }
    
    return { success: true, message: 'Comment deleted successfully.' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, message: 'Failed to delete comment.' };
  }
}

export { getComments };
