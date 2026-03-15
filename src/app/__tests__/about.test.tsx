import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../about/page';

describe('About Page', () => {
  it('renders the about page', () => {
    render(<AboutPage />);
    const headingElement = screen.getByText(/About Us/i);
    expect(headingElement).toBeInTheDocument();
  });
});
