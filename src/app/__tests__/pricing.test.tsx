import React from 'react';
import { render, screen } from '@testing-library/react';
import PricingPage from '../pricing/page';

describe('Pricing Page', () => {
  it('renders the pricing page', () => {
    render(<PricingPage />);
    const headingElement = screen.getByText(/Pricing/i);
    expect(headingElement).toBeInTheDocument();
  });
});
