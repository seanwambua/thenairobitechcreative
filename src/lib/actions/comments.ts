'use server';

import { revalidatePath } from 'next/cache';
import  prisma  from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { z } from 'zod';

const FormSchema = z.object({
  content: z.string().min(1, { message: 'Comment cannot be empty.' }),
  postId: z.number(),
});

export async function getComments(postId: number) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function createComment(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('You must be logged in to comment.');
  }

  const validatedFields = FormSchema.safeParse({
    content: formData.get('content'),
    postId: Number(formData.get('postId')),
  });

  if (!validatedFields.success) {
    throw new Error('Invalid comment data.');
  }

  const { content, postId } = validatedFields.data;
  const userId = session.user.id;

  try {
    await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
    revalidatePath(`/`);
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment.');
  }
}

export async function updateComment(commentId: number, content: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Authentication required.');
  }

  if (!content.trim()) {
    throw new Error('Comment cannot be empty.');
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comment not found.');
  }

  if (session.user.role !== Role.ADMIN && session.user.id !== comment.userId) {
    throw new Error('Unauthorized to edit this comment.');
  }

  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
    revalidatePath(`/`);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error('Failed to update comment.');
  }
}

export async function deleteComment(commentId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Authentication required.');
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comment not found.');
  }

  if (session.user.role !== Role.ADMIN && session.user.id !== comment.userId) {
    throw new Error('Unauthorized to delete this comment.');
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    revalidatePath(`/`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment.');
  }
}

export async function togglePinComment(commentId: number) {
    const session = await auth();
    if (session?.user?.role !== Role.ADMIN) {
        throw new Error('Unauthorized');
    }

    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
    });

    if (!comment) {
        throw new Error('Comment not found');
    }

    try {
        await prisma.comment.update({
            where: { id: commentId },
            data: { pinned: !comment.pinned },
        });
        revalidatePath(`/`);
    } catch (error) {
        console.error('Error toggling pin:', error);
        throw new Error('Failed to toggle pin on comment.');
    }
}
