
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the hero component with an image and a call to action', () => {
    render(<Hero heroImage="/hero.jpg" logoUrl="/logo.png" />);
    const heading = screen.getByRole('heading', {
      name: /A modern solution for your digital needs/i,
    });
    const ctaButton = screen.getByRole('button', { name: /Get a Quote/i });

    expect(heading).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });
});
