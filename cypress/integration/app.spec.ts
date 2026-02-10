/// <reference types="cypress" />

describe('Portfolio E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the hero section with the correct heading', () => {
    cy.get('h1').should('contain.text', 'Building digital experiences');
  });

  it('should navigate to the projects section when the "Projects" link is clicked', () => {
    cy.contains('Projects').click();
    cy.get('#projects').should('be.visible');
  });

  it('should navigate to the testimonials section when the "Testimonials" link is clicked', () => {
    cy.contains('Testimonials').click();
    cy.get('#testimonials').should('be.visible');
  });

  it('should display a list of projects', () => {
    cy.get('#projects').find('[data-testid="project-card"]').should('have.length.gt', 0);
  });

  it('should display a list of testimonials', () => {
    cy.get('#testimonials').find('[data-testid="testimonial-card"]').should('have.length.gt', 0);
  });
});
