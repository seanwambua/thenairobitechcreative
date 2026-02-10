
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoPortfolio } from './bento-portfolio';
import { Project } from '@/lib/types';

describe('BentoPortfolio', () => {
  it('renders the portfolio with projects', () => {
    const projects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        description: 'Description 1',
        imageUrl: '/project1.jpg',
        stack: ['React', 'Node.js'],
        url: 'https://project1.com',
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
      {
        id: '2',
        title: 'Project 2',
        description: 'Description 2',
        imageUrl: '/project2.jpg',
        stack: ['Angular', 'Firebase'],
        url: 'https://project2.com',
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
    ];

    render(<BentoPortfolio projects={projects} />);

    const project1 = screen.getByText(/Project 1/i);
    const project2 = screen.getByText(/Project 2/i);

    expect(project1).toBeInTheDocument();
    expect(project2).toBeInTheDocument();
  });
});
