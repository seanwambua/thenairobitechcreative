'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
  TestimonialSchema,
  type TestimonialInputSchemaType,
} from '@/lib/schemas';
import type { Testimonial } from '@/app/generated/prisma';

export async function getTestimonials() {
  const results = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return results;
}

export async function createTestimonial(data: TestimonialInputSchemaType) {
  const validatedData = TestimonialSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);
  const newTestimonial = await prisma.testimonial.create({
    data: {
      ...validatedData,
    },
  });

  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
  const { id, ...updateData } = TestimonialSchema.parse(testimonial);
  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: { ...updateData },
  });

  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
  return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
  await prisma.testimonial.delete({ where: { id: testimonialId } });
  revalidatePath('/dashboard/testimonials');
  revalidatePath('/dashboard/analytics');
  revalidatePath('/');
}
