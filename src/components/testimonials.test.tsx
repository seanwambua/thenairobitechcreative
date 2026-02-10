
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials as TestimonialsComponent } from './testimonials';
import { Testimonial } from '@/lib/types';

describe('Testimonials', () => {
  it('renders testimonials', () => {
    const testimonials: Testimonial[] = [
      {
        id: '1',
        name: 'John Doe',
        review: 'This is a great product!',
        title: 'CEO of Company',
        company: 'Test Company',
        imageUrl: '/avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
      {
        id: '2',
        name: 'Jane Doe',
        review: 'I highly recommend this service.',
        title: 'CTO of Other Company',
        company: 'Other Company',
        imageUrl: '/avatar2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
    ];

    render(<TestimonialsComponent testimonials={testimonials} />);

    const johnDoe = screen.getByText(/John Doe/i);
    const janeDoe = screen.getByText(/Jane Doe/i);

    expect(johnDoe).toBeInTheDocument();
    expect(janeDoe).toBeInTheDocument();
  });
});
