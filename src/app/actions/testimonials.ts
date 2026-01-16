'use server';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { TestimonialSchema, type TestimonialSchemaType } from '@/lib/schemas';
import type { Testimonial } from '@/lib/data';

export async function getTestimonials() {
    return await db.query.testimonials.findMany({
        orderBy: [desc(schema.testimonials.createdAt)],
    });
}

export async function createTestimonial(data: Omit<TestimonialSchemaType, 'id' | 'createdAt' | 'updatedAt'>) {
    const validatedData = TestimonialSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    const [newTestimonial] = await db.insert(schema.testimonials).values({
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
    const validatedData = TestimonialSchema.parse(testimonial);
    const [updatedTestimonial] = await db.update(schema.testimonials)
        .set({ ...validatedData, updatedAt: new Date() })
        .where(eq(schema.testimonials.id, validatedData.id))
        .returning();

    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    return updatedTestimonial;
}

export async function deleteTestimonial(testimonialId: number) {
    await db.delete(schema.testimonials).where(eq(schema.testimonials.id, testimonialId));
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
}
