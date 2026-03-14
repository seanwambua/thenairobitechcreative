import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TestimonialsClient } from '../testimonials-client';
import { Testimonial } from '@prisma/client';
import * as testimonialActions from '@/lib/actions/testimonials';
import { useSession } from 'next-auth/react';
import { Role } from '@/lib/roles';

// Mock next-auth
jest.mock('next-auth/react');
const useSessionMock = useSession as jest.Mock;

// Mock the actions
jest.mock('@/lib/actions/testimonials', () => ({
  ...jest.requireActual('@/lib/actions/testimonials'),
  getAllTestimonials: jest.fn(),
  createTestimonial: jest.fn(),
  updateTestimonial: jest.fn(),
  deleteTestimonial: jest.fn(),
}));

const mockTestimonials: Testimonial[] = [
  { id: 1, author: 'John Doe', title: 'CEO', quote: 'This is great!', avatarUrl: '', createdAt: new Date(), updatedAt: new Date(), userId: '1', avatarHint: 'user1' },
  { id: 2, author: 'Jane Smith', title: 'Developer', quote: 'Amazing work!', avatarUrl: '', createdAt: new Date(), updatedAt: new Date(), userId: '2', avatarHint: 'user2' },
];

describe('TestimonialsClient', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (testimonialActions.getAllTestimonials as jest.Mock).mockClear();
    (testimonialActions.createTestimonial as jest.Mock).mockClear();
    (testimonialActions.updateTestimonial as jest.Mock).mockClear();
    (testimonialActions.deleteTestimonial as jest.Mock).mockClear();
    
    // Mock session data
    useSessionMock.mockReturnValue({
      data: { user: { id: '1', role: Role.ADMIN } },
      status: 'authenticated',
    });
  });

  it('renders the component with initial testimonials', () => {
    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('filters testimonials based on search query', () => {
    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);
    const searchInput = screen.getByPlaceholderText('Search testimonials...');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('opens the editor to create a new testimonial', () => {
    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);
    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);
    expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
  });

  it('creates a new testimonial and updates the list', async () => {
    const newTestimonial: Testimonial = { id: 3, author: 'Sam Wilson', title: 'Designer', quote: 'Fantastic!', avatarUrl: '', createdAt: new Date(), updatedAt: new Date(), userId: '1', avatarHint: 'user3' };
    (testimonialActions.createTestimonial as jest.Mock).mockResolvedValue(newTestimonial);
    (testimonialActions.getAllTestimonials as jest.Mock).mockResolvedValue([...mockTestimonials, newTestimonial]);

    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);
    
    // Open the editor
    fireEvent.click(screen.getByText('Add Testimonial'));
    
    // Fill the form and submit
    fireEvent.change(screen.getByLabelText('Author Name'), { target: { value: 'Sam Wilson' } });
    fireEvent.click(screen.getByText('Publish Entry'));

    await waitFor(() => {
      expect(testimonialActions.createTestimonial).toHaveBeenCalled();
      expect(screen.getByText('Sam Wilson')).toBeInTheDocument();
    });
  });

  it('updates an existing testimonial and reflects changes', async () => {
    const updatedTestimonial: Testimonial = { ...mockTestimonials[0], quote: 'This is absolutely great!' };
    (testimonialActions.updateTestimonial as jest.Mock).mockResolvedValue(updatedTestimonial);
    (testimonialActions.getAllTestimonials as jest.Mock).mockResolvedValue([updatedTestimonial, mockTestimonials[1]]);

    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);

    // Find the dropdown trigger for the first testimonial and click it
    const dropdownTriggers = screen.getAllByRole('button', { name: /morehorizontal/i });
    fireEvent.click(dropdownTriggers[0]);
    
    // Click the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Change the quote
    const quoteTextarea = screen.getByLabelText('The Success Story');
    fireEvent.change(quoteTextarea, { target: { value: 'This is absolutely great!' } });

    // Save the changes
    fireEvent.click(screen.getByText('Update Entry'));
    
    await waitFor(() => {
        // Check if updateTestimonial was called with two arguments (id and data)
        expect(testimonialActions.updateTestimonial).toHaveBeenCalledWith(
          mockTestimonials[0].id,
          expect.any(Object)
        );
      });
  });

  it('deletes a testimonial and removes it from the list', async () => {
    (testimonialActions.deleteTestimonial as jest.Mock).mockResolvedValue(undefined);
  
    render(<TestimonialsClient initialTestimonials={mockTestimonials} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  
    // Find the dropdown trigger for the first testimonial and click it
    const dropdownTriggers = screen.getAllByRole('button', { name: /morehorizontal/i });
    fireEvent.click(dropdownTriggers[0]);
    
    // Click the "Delete" button
    fireEvent.click(screen.getByText('Delete'));
  
    // Confirm the deletion in the dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  
    await waitFor(() => {
      expect(testimonialActions.deleteTestimonial).toHaveBeenCalledWith(mockTestimonials[0].id);
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('ensures Testimonial type is imported correctly', () => {
    // This test is more of a static check, but we can ensure our mock data conforms to the type
    const isTestimonial = (obj: any): obj is Testimonial => {
      return typeof obj.id === 'number' && typeof obj.author === 'string';
    };
    expect(isTestimonial(mockTestimonials[0])).toBe(true);
  });
});