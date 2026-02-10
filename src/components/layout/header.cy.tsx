import { Header } from './header';
import { navLinks } from '@/lib/data';

// Mock next-auth `useSession` hook
const mockUseSession = (sessionData: any) => {
  cy.stub(require('next-auth/react'), 'useSession').returns(sessionData);
};

describe('<Header />', () => {
  context('Unauthenticated state', () => {
    beforeEach(() => {
      mockUseSession({ data: null, status: 'unauthenticated' });
      cy.mount(<Header logoUrl={null} />);
    });

    it('should display the logo and title', () => {
      cy.get('a[href="/"]').should('contain.text', 'The Nairobi Tech Creative');
    });

    it('should display navigation links on desktop', () => {
      cy.viewport('macbook-15');
      navLinks.forEach((link) => {
        cy.get(`nav a[href="${link.href}"]`).should('contain.text', link.label);
      });
    });

    it('should show Sign In button when unauthenticated', () => {
      cy.get('button').contains('Sign In').should('be.visible');
    });

    it('should toggle the mobile menu', () => {
      cy.viewport('iphone-xr');
      cy.get('button[aria-label="Open menu"]').click();
      cy.get('nav[class*="flex-col"]').should('be.visible');
      cy.get('button[aria-label="Close menu"]').click();
      cy.get('nav[class*="flex-col"]').should('not.exist');
    });

    it('should display navigation links in the mobile menu', () => {
      cy.viewport('iphone-xr');
      cy.get('button[aria-label="Open menu"]').click();
      navLinks.forEach((link) => {
        cy.get(`nav a[href="${link.href}"]`).should('be.visible');
      });
      cy.get('button').contains('Get In Touch').should('be.visible');
    });
  });

  context('Authenticated state', () => {
    const session = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://via.placeholder.com/150',
        role: 'USER',
      },
    };

    beforeEach(() => {
      mockUseSession({ data: session, status: 'authenticated' });
      cy.mount(<Header logoUrl={null} />);
    });

    it('should display the user avatar', () => {
      cy.get('img[alt="Test User"]').should('be.visible');
    });

    it('should not show the Sign In button', () => {
      cy.get('button').contains('Sign In').should('not.exist');
    });

    it('should show the user dropdown with a sign-out button', () => {
      cy.get('[aria-haspopup="menu"]').click();
      cy.get('div[role="menu"]').should('be.visible');
      cy.get('div[role="menuitem"]').contains('Sign Out').should('be.visible');
    });

    it('should not show the dashboard link for non-admin users', () => {
      cy.get('[aria-haspopup="menu"]').click();
      cy.get('a[href="/dashboard"]').should('not.exist');
    });
  });

  context('Admin state', () => {
    const adminSession = {
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
        image: 'https://via.placeholder.com/150',
        role: 'ADMIN',
      },
    };

    beforeEach(() => {
      mockUseSession({ data: adminSession, status: 'authenticated' });
      cy.mount(<Header logoUrl={null} />);
    });

    it('should show the dashboard link for admin users', () => {
      cy.get('[aria-haspopup="menu"]').click();
      cy.get('a[href="/dashboard"]').should('be.visible');
      cy.get('a[href="/dashboard"]').should('contain.text', 'Dashboard');
    });
  });
});
