
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from './project-card';
import { Project } from '@/lib/types';

describe('ProjectCard', () => {
  it('renders the project card with project details', () => {
    const project: Project = {
      id: '1',
      title: 'Test Project',
      description: 'Test Description',
      imageUrl: '/test-project.jpg',
      stack: ['React', 'TypeScript'],
      url: 'https://test-project.com',
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
    };

    render(<ProjectCard project={project} />);

    const title = screen.getByText(/Test Project/i);
    const description = screen.getByText(/Test Description/i);
    const reactBadge = screen.getByText(/React/i);
    const typescriptBadge = screen.getByText(/TypeScript/i);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(reactBadge).toBeInTheDocument();
    expect(typescriptBadge).toBeInTheDocument();
  });
});
