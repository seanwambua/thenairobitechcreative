
import { Testimonials } from './testimonials';
import { Testimonial } from '@/lib/types';

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'This is a test testimonial.',
    author: 'John Doe',
    title: 'CEO, Acme Inc.',
    avatarUrl: 'https://via.placeholder.com/150',
    avatarHint: 'A placeholder image',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  },
];

describe('<Testimonials />', () => {
  it('renders the testimonials correctly', () => {
    cy.mount(<Testimonials testimonials={mockTestimonials} />);

    cy.get('h2').should('contain.text', 'Trusted by Innovators');
    cy.get('blockquote').should('contain.text', 'This is a test testimonial.');
    cy.get('p').should('contain.text', 'John Doe');
    cy.get('p').should('contain.text', 'CEO, Acme Inc.');
    cy.get('img').should('have.attr', 'src', 'https://via.placeholder.com/150');
  });
});
