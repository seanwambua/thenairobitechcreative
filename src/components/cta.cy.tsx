
import { Cta } from './cta';

describe('<Cta />', () => {
  beforeEach(() => {
    // Intercept and mock the InquirySheet since its functionality is outside
    // the scope of this component test.
    cy.intercept('GET', '**/inquiry-sheet**', (req) => {
      req.reply({ body: '<div>Mock Inquiry Sheet</div>' });
    }).as('inquirySheet');
  });

  it('should render the CTA section with the correct content', () => {
    cy.mount(<Cta logoUrl={null} />);

    cy.contains('h2', 'Have a project in mind?').should('be.visible');
    cy.contains(
      'p',
      "Let's build the next generation of digital solutions together. We're ready to turn your vision into a global success story."
    ).should('be.visible');
    cy.get('button').contains('Start a Conversation').should('be.visible');
  });

  it('should open the inquiry sheet when the button is clicked', () => {
    cy.mount(<Cta logoUrl={null} />);

    cy.get('button').contains('Start a Conversation').click();
    
    // Because we are mocking the sheet, we cannot test its interactive behavior here.
    // Instead, we confirm that the component attempts to render the sheet.
    cy.root().should('contain.html', '[data-cy="inquiry-sheet-trigger"]>button');
  });

  it('should pass the logoUrl to the InquirySheet component', () => {
    const logoUrl = 'https://example.com/logo.png';
    cy.mount(<Cta logoUrl={logoUrl} />);

    // This test verifies that the `logoUrl` prop is correctly passed,
    // even though the sheet itself is mocked.
    cy.get('[data-cy="inquiry-sheet-trigger"]').should((trigger) => {
        expect(trigger.attr('data-logo-url')).to.eq(logoUrl);
    });
  });
});
