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

export async function getAllTestimonials() {
  const results = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return results;
}

export async function getTestimonials() {
  const session = await auth();
  const where = session?.user?.role === Role.ADMIN ? {} : { userId: session?.user?.id };
  const results = await prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return results;
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

  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN && session?.user?.id !== testimonial.userId) {
    throw new Error('You are not authorized to update this testimonial.');
  }
  
  const { id, createdAt, updatedAt, userId, ...rest } = testimonial;
  
  // Validate rest of the fields
  const validatedData = TestimonialInputSchema.parse(rest);
  
  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
  const session = await auth();
  const testimonial = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
  if (session?.user?.role !== Role.ADMIN && session?.user?.id !== testimonial?.userId) {
    throw new Error('You are not authorized to delete this testimonial.');
  }
  await prisma.testimonial.delete({ where: { id: testimonialId } });
  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
}
