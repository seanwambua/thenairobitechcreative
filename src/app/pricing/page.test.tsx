
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PricingPage from './page';

describe('PricingPage', () => {
  it('renders the pricing plans', () => {
    render(<PricingPage />);
    const starterPlan = screen.getByRole('heading', { name: /Starter/i });
    const proPlan = screen.getByRole('heading', { name: /Pro/i });
    const enterprisePlan = screen.getByRole('heading', { name: /Enterprise/i });

    expect(starterPlan).toBeInTheDocument();
    expect(proPlan).toBeInTheDocument();
    expect(enterprisePlan).toBeInTheDocument();
  });
});
