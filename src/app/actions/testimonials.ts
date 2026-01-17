'use server';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { TestimonialSchema, type TestimonialSchemaType } from '@/lib/schemas';
import type { Testimonial } from '@/lib/data';

function toTestimonial(record: typeof schema.testimonials.$inferSelect): Testimonial {
    return {
        ...record,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
    };
}

export async function getTestimonials() {
    const results = await db.query.testimonials.findMany({
        orderBy: [desc(schema.testimonials.createdAt)],
    });
    return results.map(toTestimonial);
}

export async function createTestimonial(data: Omit<TestimonialSchemaType, 'id' | 'createdAt' | 'updatedAt'>) {
    const validatedData = TestimonialSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    const [newTestimonialRecord] = await db.insert(schema.testimonials).values({
        ...validatedData,
    }).returning();
    
    const newTestimonial = toTestimonial(newTestimonialRecord);
    revalidatePath('/dashboard/testimonials');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    return newTestimonial;
}

export async function updateTestimonial(testimonial: Testimonial) {
    const validatedData = TestimonialSchema.parse(testimonial);
    const { createdAt, updatedAt, ...updateData } = validatedData;
    const [updatedTestimonialRecord] = await db.update(schema.testimonials)
        .set({ ...updateData, updatedAt: new Date().toISOString() })
        .where(eq(schema.testimonials.id, validatedData.id))
        .returning();

    const updatedTestimonial = toTestimonial(updatedTestimonialRecord);

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
