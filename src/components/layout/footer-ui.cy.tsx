
import { FooterUI } from './footer-ui';

describe('<FooterUI />', () => {
  it('should render the footer with the logo and correct text', () => {
    const logoUrl = 'https://example.com/logo.png';
    cy.mount(<FooterUI logoUrl={logoUrl} />);

    cy.get('footer').within(() => {
      cy.get('img[src="' + logoUrl + '"]').should('be.visible');
      cy.contains('span', 'The Nairobi Tech Creative').should('be.visible');
      cy.contains(
        'p',
        `© ${new Date().getFullYear()} The Nairobi Tech Creative. All rights reserved.`
      ).should('be.visible');
    });
  });

  it('should render the fallback stamp when no logo URL is provided', () => {
    cy.mount(<FooterUI logoUrl={null} />);

    cy.get('footer').within(() => {
      cy.get('[data-cy=stamp-fallback]').should('be.visible');
      cy.contains('span', 'The Nairobi Tech Creative').should('be.visible');
    });
  });
});
