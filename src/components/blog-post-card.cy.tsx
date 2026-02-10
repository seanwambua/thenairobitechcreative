/// <reference types="cypress" />
/// <reference path="../../cypress/support/component.ts" />

import { BlogPostCard } from './blog-post-card';
import { Post } from '@/lib/definitions';
import { format } from 'date-fns';

const mockPost: Post = {
  id: 1,
  title: 'The Importance of a Strong Digital Presence for Creatives',
  slug: 'digital-presence-for-creatives',
  description: 'In today\'s competitive landscape, a compelling online portfolio is no longer a luxury—it\'s a necessity. Learn how to craft a digital presence that captivates audiences and opens doors to new opportunities.',
  imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageHint: 'A person working on a laptop with code on the screen, representing a digital creative at work.',
  createdAt: new Date('2024-07-01T10:00:00.000Z'),
  updatedAt: new Date('2024-07-01T10:00:00.000Z'),
  author: 'The NTC Team',
  authorAvatarUrl: 'https://example.com/avatar.png',
  authorAvatarHint: 'The logo for The Nairobi Tech Creative team.',
  content: '<p>This is the full body of the blog post.</p>',
  likes: 0,
  comments: ''
};

describe('<BlogPostCard />', () => {
  beforeEach(() => {
    cy.mount(<BlogPostCard post={mockPost} />);
  });

  it('should link to the correct blog post slug', () => {
    cy.get('a').should('have.attr', 'href', `/blog/${mockPost.slug}`);
  });

  it('should display the post image with correct alt text', () => {
    cy.get(`img[alt="${mockPost.title}"]`)
      .should('be.visible')
      .and(($img) => {
        // Check that the image has a src attribute
        expect($img.attr('src')).to.not.be.empty;
      });
  });

  it('should display the post title and description', () => {
    cy.contains('h3', mockPost.title).should('be.visible');
    cy.contains('p', mockPost.description).should('be.visible');
  });

  it('should display author information correctly', () => {
    cy.get(`img[alt="${mockPost.author}"]`).should('be.visible');
    cy.contains('p', mockPost.author).should('be.visible');
  });

  it('should display the formatted creation date', () => {
    const formattedDate = format(new Date(mockPost.createdAt), 'MMM d, yyyy');
    cy.contains('p', formattedDate).should('be.visible');
  });
});
