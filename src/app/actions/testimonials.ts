'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Testimonial } from '@prisma/client';

type CreateableTestimonial = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>

export async function createTestimonial(data: CreateableTestimonial) {
    const newTestimonial = await prisma.testimonial.create({
        data,
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/');
    return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
    const updatedTestimonial = await prisma.testimonial.update({
        where: { id: testimonial.id },
        data: testimonial,
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/');
    return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
    await prisma.testimonial.delete({
        where: { id: testimonialId },
    });
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/');
}
