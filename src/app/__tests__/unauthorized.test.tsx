import React from 'react';
import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '../unauthorized/page';

describe('Unauthorized Page', () => {
  it('renders the unauthorized page', () => {
    render(<UnauthorizedPage />);
    const headingElement = screen.getByText(/Access Denied/i);
    expect(headingElement).toBeInTheDocument();
  });
});
