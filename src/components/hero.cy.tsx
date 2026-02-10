
import { Hero } from './hero';

describe('<Hero />', () => {
  it('renders the hero section with the correct content', () => {
    cy.mount(<Hero heroImage={null} logoUrl={null} />);

    cy.get('h1').should('contain.text', 'African solutions, global markets');
    cy.get('p').should(
      'contain.text',
      'We build innovative digital products that empower businesses and communities across the continent and beyond.'
    );
    cy.get('button').should('contain.text', 'Explore Our Work');
    cy.get('button').should('contain.text', 'Contact Us');
  });

  it('renders the hero image when provided', () => {
    const heroImageUrl = 'https://via.placeholder.com/600';
    cy.mount(<Hero heroImage={heroImageUrl} logoUrl={null} />);

    cy.get('img').should('have.attr', 'src', heroImageUrl);
  });
});
