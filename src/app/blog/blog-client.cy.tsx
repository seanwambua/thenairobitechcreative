/// <reference types="cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import { BlogClient } from './blog-client';
import { Post } from '@/lib/definitions';

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    description: 'This is the first post.',
    imageUrl: 'https://via.placeholder.com/800x600/1',
    createdAt: new Date('2023-01-01'),
    author: 'John Doe',
    content: '<p>This is the full body of the blog post.</p>',
    updatedAt: new Date('2023-01-01'),
    imageHint: 'This is a hint for the first post',
    authorAvatarUrl: 'https://via.placeholder.com/150/1',
    authorAvatarHint: 'This is a hint for the author of the first post',
    likes: 0,
    comments: ''
  },
  {
    id: 2,
    title: 'Second Post',
    slug: 'second-post',
    description: 'This is the second post.',
    imageUrl: 'https://via.placeholder.com/800x600/2',
    createdAt: new Date('2023-01-02'),
    author: 'Jane Smith',
    content: '<p>This is the full body of the blog post.</p>',
    updatedAt: new Date('2023-01-02'),
    imageHint: 'This is a hint for the second post',
    authorAvatarUrl: 'https://via.placeholder.com/150/2',
    authorAvatarHint: 'This is a hint for the author of the second post',
    likes: 0,
    comments: ''
  },
];

describe('<BlogClient />', () => {
  it('should render blog posts when provided', () => {
    cy.mount(<BlogClient posts={mockPosts} error={null} />);

    cy.contains('h1', 'From the Blog').should('be.visible');
    cy.get('a[href*="/blog/"]').should('have.length', 2);
    cy.contains('h2', 'First Post').should('be.visible');
    cy.contains('h2', 'Second Post').should('be.visible');
  });

  it('should display an error message when an error is provided', () => {
    cy.mount(<BlogClient posts={null} error={new Error('Failed to fetch')} />);

    cy.get('[role=alert]').should('be.visible');
    cy.contains('h5', 'Error Loading Blog').should('be.visible');
  });

  it('should display a "no posts" message when posts are null or empty', () => {
    cy.mount(<BlogClient posts={[]} error={null} />);

    cy.contains('h2', 'No Posts Found').should('be.visible');
    cy.contains('p', 'There are no blog posts to display at the moment.').should('be.visible');

    cy.mount(<BlogClient posts={null} error={null} />);
    cy.contains('h2', 'No Posts Found').should('be.visible');
  });
});
