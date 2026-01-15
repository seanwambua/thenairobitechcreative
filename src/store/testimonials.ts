'use client';
import { create } from 'zustand';
import { type Testimonial as TestimonialType } from '@prisma/client';
import { 
    getTestimonials,
    createTestimonial as createTestimonialAction, 
    updateTestimonial as updateTestimonialAction,
    deleteTestimonial as deleteTestimonialAction 
} from '@/app/actions/testimonials';
import { TestimonialSchemaType } from '@/lib/schemas';

export type Testimonial = TestimonialType;

type CreateTestimonial = Omit<TestimonialSchemaType, 'id' | 'createdAt' | 'updatedAt'>;

interface TestimonialState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  fetchTestimonials: () => Promise<void>;
  addTestimonial: (testimonial: CreateTestimonial) => Promise<void>;
  updateTestimonial: (updatedTestimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (testimonialId: number) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  error: null,
  fetchTestimonials: async () => {
    set({ isLoading: true });
    try {
        const testimonials = await getTestimonials();
        set({ testimonials, isLoading: false, error: null });
    } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
    }
  },
  addTestimonial: async (testimonial) => {
    set({ isLoading: true });
    try {
      await createTestimonialAction(testimonial);
      await get().fetchTestimonials();
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateTestimonial: async (updatedTestimonial) => {
    set({ isLoading: true });
    try {
      await updateTestimonialAction(updatedTestimonial);
      await get().fetchTestimonials();
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deleteTestimonial: async (testimonialId) => {
    const originalTestimonials = get().testimonials;
    set(state => ({ testimonials: state.testimonials.filter(t => t.id !== testimonialId) }));
    try {
      await deleteTestimonialAction(testimonialId);
      await get().fetchTestimonials();
    } catch (error) {
      set({ testimonials: originalTestimonials, error: (error as Error).message });
      throw error;
    }
  },
}));
