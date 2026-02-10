
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from './page';

describe('Page', () => {
  it('renders the main heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', {
      name: /A modern solution for your digital needs/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
