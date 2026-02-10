
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogPage from './page';

describe('BlogPage', () => {
  it('renders the blog posts', () => {
    render(<BlogPage />);
    const blogTitle = screen.getByRole('heading', { name: /The Blog/i });
    expect(blogTitle).toBeInTheDocument();
  });
});
