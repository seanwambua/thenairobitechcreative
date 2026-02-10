
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProspectsBanner } from './prospects-banner';

describe('ProspectsBanner', () => {
  it('renders the prospects banner with logos', () => {
    render(<ProspectsBanner logoUrl="/logo.png" />);
    const heading = screen.getByRole('heading', {
      name: /Trusted by leading companies/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
