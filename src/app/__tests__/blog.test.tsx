import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPage from '../blog/page';

describe('Blog Page', () => {
  it('renders the blog page', () => {
    render(<BlogPage />);
    const headingElement = screen.getByText(/Blog/i);
    expect(headingElement).toBeInTheDocument();
  });
});
