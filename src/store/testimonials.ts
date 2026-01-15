'use client';
import { create } from 'zustand';
import { type Testimonial as TestimonialType } from '@prisma/client';
import { initialTestimonials } from '@/lib/data';
import { 
    createTestimonial, 
    updateTestimonial as updateTestimonialAction,
    deleteTestimonial as deleteTestimonialAction 
} from '@/app/actions/testimonials';

export type Testimonial = TestimonialType;

interface TestimonialState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  setTestimonials: (testimonials: Testimonial[]) => void;
  fetchTestimonials: () => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTestimonial: (updatedTestimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (testimonialId: number) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  error: null,
  setTestimonials: (testimonials) => set({ testimonials }),
  fetchTestimonials: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const testimonials = await response.json();
      if (testimonials.length === 0) {
        set({ testimonials: initialTestimonials, isLoading: false });
      } else {
        set({ testimonials, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, testimonials: initialTestimonials });
    }
  },
  addTestimonial: async (testimonial) => {
    set({ isLoading: true });
    try {
      await createTestimonial(testimonial);
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
