import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../page';

describe('Main Page', () => {
  it('renders the main page', () => {
    render(<Page />);
    const headingElement = screen.getByText(/Welcome to our page/i);
    expect(headingElement).toBeInTheDocument();
  });
});
