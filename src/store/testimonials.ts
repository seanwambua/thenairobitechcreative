'use client';
import { create } from 'zustand';
import { type Testimonial as TestimonialType } from '@prisma/client';

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

export const useTestimonialStore = create<TestimonialState>((set) => ({
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
      set({ testimonials, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  addTestimonial: async (testimonial) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      });
      if (!response.ok) throw new Error('Failed to create testimonial');
      const newTestimonial = await response.json();
      set((state) => ({
        testimonials: [newTestimonial, ...state.testimonials],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateTestimonial: async (updatedTestimonial) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/testimonials/${updatedTestimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonial),
      });
      if (!response.ok) throw new Error('Failed to update testimonial');
      const result = await response.json();
      set((state) => ({
        testimonials: state.testimonials.map((t) =>
          t.id === updatedTestimonial.id ? result : t
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deleteTestimonial: async (testimonialId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete testimonial');
      set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== testimonialId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
