
'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialTestimonials, type Testimonial as TestimonialType } from '@/lib/data';

export type Testimonial = TestimonialType;

interface TestimonialState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (updatedTestimonial: Testimonial) => void;
  deleteTestimonial: (testimonialId: number) => void;
}

export const useTestimonialStore = create(
  persist<TestimonialState>(
    (set) => ({
      testimonials: initialTestimonials,
      addTestimonial: (testimonial) =>
        set((state) => ({ testimonials: [testimonial, ...state.testimonials] })),
      updateTestimonial: (updatedTestimonial) =>
        set((state) => ({
          testimonials: state.testimonials.map((testimonial) =>
            testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
          ),
        })),
      deleteTestimonial: (testimonialId) =>
        set((state) => ({
          testimonials: state.testimonials.filter(
            (testimonial) => testimonial.id !== testimonialId
          ),
        })),
    }),
    {
      name: 'testimonial-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
