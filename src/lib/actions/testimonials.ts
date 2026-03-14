'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { TestimonialSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import type { Testimonial } from '@prisma/client';

const TestimonialInput = TestimonialSchema.omit({ id: true, createdAt: true, updatedAt: true, userId: true });

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return prisma.testimonial.findMany();
}

// Create testimonial
export async function createTestimonial(data: z.infer<typeof TestimonialInput>) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');

  const validatedData = TestimonialInput.parse(data);
  const testimonial = await prisma.testimonial.create({ data: { ...validatedData, userId } });
  revalidatePath('/');
  return testimonial;
}

// Update testimonial
export async function updateTestimonial(id: number, data: z.infer<typeof TestimonialInput>) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');

  const validatedData = TestimonialInput.parse(data);
  const testimonial = await prisma.testimonial.update({ where: { id }, data: { ...validatedData, userId } });
  revalidatePath('/');
  return testimonial;
}

// Delete testimonial
export async function deleteTestimonial(id: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');
  
  const testimonial = await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/');
  return testimonial;
}
