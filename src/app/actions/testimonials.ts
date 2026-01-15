'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TestimonialSchema, type TestimonialSchemaType } from '@/lib/schemas';
import type { Testimonial } from '@prisma/client';

export async function createTestimonial(data: Omit<TestimonialSchemaType, 'id' | 'createdAt' | 'updatedAt'>) {
    const validatedData = TestimonialSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    const newTestimonial = await prisma.testimonial.create({
        data: validatedData,
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
    const validatedData = TestimonialSchema.parse(testimonial);
    const updatedTestimonial = await prisma.testimonial.update({
        where: { id: validatedData.id },
        data: validatedData,
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
    await prisma.testimonial.delete({
        where: { id: testimonialId },
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
}
