'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import db  from '@/lib/prisma';
import { Role } from '@/lib/roles';

const FeedbackSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  rating: z.coerce.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  subject: z.string().min(1, 'Subject is required'),
  page: z.string().min(1, 'Page is required'),
  heardFrom: z.string().optional(),
});

export async function createFeedback(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  const validatedFields = FeedbackSchema.safeParse({
    content: formData.get('content'),
    rating: formData.get('rating'),
    subject: formData.get('subject'),
    page: formData.get('page'),
    heardFrom: formData.get('heardFrom'),
  });

  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid feedback data.' };
  }

  const { content, rating, subject, page, heardFrom } = validatedFields.data;

  try {
    await db.feedback.create({
      data: {
        content,
        rating,
        subject,
        page,
        heardFrom: heardFrom ? JSON.parse(heardFrom) : [],
        userId: session.user.id as string,
      },
    });
    revalidatePath('/'); // Revalidate all pages
    return { success: true, message: 'Feedback submitted successfully.' };
  } catch (error) {
    console.error('Error creating feedback:', error);
    return { success: false, message: 'Failed to submit feedback.' };
  }
}

export async function updateFeedback(id: number, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 600));
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  const validatedFields = FeedbackSchema.safeParse({
    content: formData.get('content'),
    rating: formData.get('rating'),
    subject: formData.get('subject'),
    page: formData.get('page'),
    heardFrom: formData.get('heardFrom'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid feedback data.' };
  }

  const { content, rating, subject, page, heardFrom } = validatedFields.data;

  try {
    const existingFeedback = await db.feedback.findUnique({ where: { id } });
    if (!existingFeedback) {
      return { success: false, message: 'Feedback not found.' };
    }

    if (existingFeedback.userId !== session.user.id && session.user.role !== Role.ADMIN) {
      return { success: false, message: 'You are not authorized to update this feedback.' };
    }

    await db.feedback.update({
      where: { id },
      data: {
        content,
        rating,
        subject,
        page,
        heardFrom: heardFrom ? JSON.parse(heardFrom) : [],
      },
    });
    revalidatePath('/');
    return { success: true, message: 'Feedback updated successfully.' };
  } catch (error) {
    console.error('Error updating feedback:', error);
    return { success: false, message: 'Failed to update feedback.' };
  }
}

export async function deleteFeedback(id: number) {
  await new Promise(resolve => setTimeout(resolve, 600));
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: 'Authentication required.' };
  }

  try {
    const existingFeedback = await db.feedback.findUnique({ where: { id } });
    if (!existingFeedback) {
      return { success: false, message: 'Feedback not found.' };
    }

    if (existingFeedback.userId !== session.user.id && session.user.role !== Role.ADMIN) {
      return { success: false, message: 'You are not authorized to delete this feedback.' };
    }

    await db.feedback.delete({ where: { id } });
    revalidatePath('/');
    return { success: true, message: 'Feedback deleted successfully.' };
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return { success: false, message: 'Failed to delete feedback.' };
  }
}
