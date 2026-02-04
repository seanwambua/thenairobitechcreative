'use server';

import { Role } from '@/generated/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  TestimonialSchema,
  type TestimonialInputSchemaType,
} from '@/lib/schemas';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// ARCHITECT: Removed 'import { use } from react'. Never use hooks in 'use server' files.

export type Testimonial = z.infer<typeof TestimonialSchema>;

/**
 * Senior Dev: Adding 'use cache' (optional) if you want these
 * testimonials to be globally cached in Next.js 16.
 */
export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTestimonial(data: TestimonialInputSchemaType) {
  // Senior QA: Await auth() immediately in the new async lifecycle
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to create a testimonial.');
  }

  const validatedData = TestimonialSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  }).parse(data);

  const newTestimonial = await prisma.testimonial.create({
    data: {
      ...validatedData,
      userId: session.user.id,
    },
  });

  // Architect: Next 16 batch revalidation logic
  revalidatePath('/');
  revalidatePath('/dashboard/testimonials');

  return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
  const session = await auth();

  // Guard Clause for Authorization
  if (session?.user?.role !== Role.ADMIN && session?.user?.id !== testimonial.userId) {
    throw new Error('Unauthorized');
  }

  const { id, ...updateData } = TestimonialSchema.parse(testimonial);

  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: updateData,
  });

  revalidatePath('/dashboard/testimonials');
  return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
  const session = await auth();

  const testimonial = await prisma.testimonial.findUnique({
    where: { id: testimonialId }
  });

  if (!testimonial) throw new Error('Testimonial not found.');

  if (session?.user?.role !== Role.ADMIN && session?.user?.id !== testimonial.userId) {
    throw new Error('Unauthorized');
  }

  await prisma.testimonial.delete({ where: { id: testimonialId } });

  revalidatePath('/dashboard/testimonials');
  revalidatePath('/');
}