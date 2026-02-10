
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Cta } from './cta';

describe('Cta', () => {
  it('renders the call to action with a button', () => {
    render(<Cta logoUrl="/logo.png" />);
    const heading = screen.getByRole('heading', {
      name: /Ready to start your project?/i,
    });
    const ctaButton = screen.getByRole('button', { name: /Get a Quote/i });

    expect(heading).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });
});
