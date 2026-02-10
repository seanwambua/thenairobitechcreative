
import { ProjectCard } from './project-card';
import { Project } from '@/lib/types';

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'This is a test project',
  imageUrl: 'https://via.placeholder.com/150',
  stack: ['React', 'TypeScript', 'Tailwind CSS'],
  url: 'https://example.com',
  featured: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true,
};

describe('<ProjectCard />', () => {
  it('renders the project information correctly', () => {
    cy.mount(<ProjectCard project={mockProject} />);

    cy.get('h2').should('contain.text', 'Test Project');
    cy.get('p').should('contain.text', 'This is a test project');
    cy.get('[data-testid="tech-badge"]').should('have.length', 3);
    cy.get('[data-testid="tech-badge"]').eq(0).should('contain.text', 'React');
    cy.get('[data-testid="tech-badge"]').eq(1).should('contain.text', 'TypeScript');
    cy.get('[data-testid="tech-badge"]').eq(2).should('contain.text', 'Tailwind CSS');
  });
});
