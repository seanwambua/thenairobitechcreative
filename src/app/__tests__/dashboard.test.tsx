import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../dashboard/page';

describe('Dashboard Page', () => {
  it('renders the dashboard page', () => {
    render(<DashboardPage />);
    const headingElement = screen.getByText(/Dashboard/i);
    expect(headingElement).toBeInTheDocument();
  });
});
