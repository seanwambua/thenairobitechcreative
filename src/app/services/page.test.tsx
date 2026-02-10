
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServicesPage from './page';

describe('ServicesPage', () => {
  it('renders the services offered', () => {
    render(<ServicesPage />);
    const webDevelopment = screen.getByRole('heading', { name: /Web Development/i });
    const mobileDevelopment = screen.getByRole('heading', { name: /Mobile Development/i });
    const uiuxDesign = screen.getByRole('heading', { name: /UI\/UX Design/i });

    expect(webDevelopment).toBeInTheDocument();
    expect(mobileDevelopment).toBeInTheDocument();
    expect(uiuxDesign).toBeInTheDocument();
  });
});
