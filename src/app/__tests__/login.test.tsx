import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../login/page';

describe('Login Page', () => {
  it('renders the login page', () => {
    render(<LoginPage />);
    const headingElement = screen.getByText(/Login/i);
    expect(headingElement).toBeInTheDocument();
  });
});
