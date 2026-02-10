
import { ProspectsBanner } from './prospects-banner';

describe('<ProspectsBanner />', () => {
  it('should render the banner with the correct content', () => {
    cy.mount(<ProspectsBanner logoUrl={null} />);

    cy.contains('h2', 'Now accepting 2026 projects').should('be.visible');
    cy.contains(
      'p',
      'Looking to step into the digital space? Lets connect and explore what best works for you'
    ).should('be.visible');
    cy.get('button').contains('Inquire Now').should('be.visible');
  });

  it('should be dismissible when the close button is clicked', () => {
    cy.mount(<ProspectsBanner logoUrl={null} />);

    cy.get('button[aria-label="Close banner"]').click();
    cy.get('.fixed.bottom-0').should('not.exist');
  });

  it('should display the inquiry sheet trigger button', () => {
    cy.mount(<ProspectsBanner logoUrl={null} />);
    
    cy.get('button').contains('Inquire Now').should('be.visible');
    // We can check that the button is a trigger for the sheet, 
    // without needing to test the sheet's full functionality here.
    cy.get('[data-cy="inquiry-sheet-trigger"]').should('exist');
  });

  it('should pass the logoUrl to the InquirySheet component', () => {
    const logoUrl = 'https://example.com/logo.png';
    cy.mount(<ProspectsBanner logoUrl={logoUrl} />);

    cy.get('[data-cy="inquiry-sheet-trigger"]').should((trigger) => {
        expect(trigger.attr('data-logo-url')).to.eq(logoUrl);
    });
  });
});
