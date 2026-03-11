import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupPage from '../signup/page';

describe('Signup Page', () => {
  it('renders the signup page', () => {
    render(<SignupPage />);
    const headingElement = screen.getByText(/Sign Up/i);
    expect(headingElement).toBeInTheDocument();
  });
});
