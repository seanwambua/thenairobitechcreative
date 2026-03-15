import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesPage from '../services/page';

describe('Services Page', () => {
  it('renders the services page', () => {
    render(<ServicesPage />);
    const headingElement = screen.getByText(/Services/i);
    expect(headingElement).toBeInTheDocument();
  });
});
