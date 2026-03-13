'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
  TestimonialSchema,
  TestimonialInputSchema,
  type TestimonialInputSchemaType,
} from '@/lib/schemas';
import type { Testimonial } from '@prisma/client';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';

/**
 * Fetches all testimonials. Used for the public homepage.
 */
export async function getAllTestimonials() {
  try {
    const results = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return results;
  } catch (error) {
    console.error('[GET_ALL_TESTIMONIALS_ERROR]:', error);
    return [];
  }
}

/**
 * Fetches testimonials for the dashboard. 
 * Admins see all, users see only their own.
 */
export async function getTestimonials() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const where = session.user.role === Role.ADMIN ? {} : { userId: session.user.id };
  
  try {
    const results = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return results;
  } catch (error) {
    console.error('[GET_TESTIMONIALS_ERROR]:', error);
    return [];
  }
}

export async function createTestimonial(data: TestimonialInputSchemaType) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be signed in to create a testimonial.');
  }
  
  const validatedData = TestimonialInputSchema.parse(data);
  
  const newTestimonial = await prisma.testimonial.create({
    data: {
      ...validatedData,
      userId: session.user.id,
    },
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: Session expired.');
  }

  const existing = await prisma.testimonial.findUnique({ where: { id: testimonial.id } });
  if (!existing) throw new Error('Testimonial not found.');

  if (session.user.role !== Role.ADMIN && session.user.id !== existing.userId) {
    throw new Error('You are not authorized to update this testimonial.');
  }
  
  const { id, createdAt, updatedAt, userId, ...rest } = testimonial;
  const validatedData = TestimonialInputSchema.parse(rest);
  
  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized: Session expired.');
  }

  const testimonial = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
  if (!testimonial) return;

  if (session.user.role !== Role.ADMIN && session.user.id !== testimonial.userId) {
    throw new Error('You are not authorized to delete this testimonial.');
  }

  await prisma.testimonial.delete({ where: { id: testimonialId } });
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
}
