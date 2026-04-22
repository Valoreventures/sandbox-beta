import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JournalEntry from '../components/JournalEntry';

describe('JournalEntry Card Layout', () => {
  const mockProps = {
    id: 1,
    title: 'Daily',
    iconTitle: 'Transformation',
    date: '2024-01-04',
    image: 'https://example.com/image.jpg',
    message: 'This is a test journal entry message that should be properly formatted and truncated if too long.',
    time: '10:30',
    selected: false,
    index: 0
  };

  it('renders with consistent card structure and dimensions', () => {
    const { container } = render(<JournalEntry {...mockProps} />);

    // Check that the main card has proper structure
    const card = container.firstChild;
    expect(card).toHaveClass('min-h-[280px]');
    expect(card).toHaveClass('w-full', 'h-full');
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200');
    expect(card).toHaveClass('rounded-card', 'shadow-card');
  });

  it('displays proper content padding and spacing', () => {
    const { container } = render(<JournalEntry {...mockProps} />);
    
    // Check for proper padding
    const card = container.firstChild;
    expect(card).toHaveClass('p-6');
    
    // Check that title is displayed
    expect(screen.getByText('Transformation')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();
  });

  it('maintains image aspect ratio with proper styling', async () => {
    render(<JournalEntry {...mockProps} />);

    // Wait for the OptimizedImage to load
    await waitFor(() => {
      const image = screen.getByAltText('Transformation journal entry');
      expect(image).toBeInTheDocument();
    });

    const image = screen.getByAltText('Transformation journal entry');
    // OptimizedImage uses w-full h-full transition-opacity classes
    expect(image).toHaveClass('w-full', 'h-full', 'transition-opacity');
    expect(image).toHaveAttribute('loading', 'lazy');

    // Check that the container has proper styling for layout stability
    // OptimizedImage wraps in a div with relative and overflow-hidden classes
    const container = image.closest('.relative.overflow-hidden');
    expect(container).toBeInTheDocument();
  });

  it('provides clear hover states and interactive feedback', () => {
    const { container } = render(<JournalEntry {...mockProps} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-card-hover', 'hover:scale-[1.02]', 'hover:border-gray-300');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('transition-all', 'duration-200', 'ease-in-out');
  });

  it('displays legible typography with proper line height', () => {
    render(<JournalEntry {...mockProps} />);
    
    // Check title typography
    const title = screen.getByText('Transformation');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-6');
    
    // Check message typography
    const message = screen.getByText(/This is a test journal entry/);
    expect(message).toHaveClass('text-sm', 'leading-relaxed');
  });

  it('handles content truncation properly', () => {
    const longMessage = 'A'.repeat(150); // Long message that should be truncated
    render(<JournalEntry {...mockProps} message={longMessage} />);
    
    const messageElement = screen.getByText(/A+\.\.\./);
    expect(messageElement).toBeInTheDocument();
  });

  it('displays date and time in footer section', () => {
    render(<JournalEntry {...mockProps} />);
    
    expect(screen.getByText('2024-01-04')).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('shows journal type icon with proper styling', () => {
    const { container } = render(<JournalEntry {...mockProps} />);
    
    // Look for the icon container with specific classes
    const iconContainer = container.querySelector('.w-10.h-10.bg-gray-50');
    expect(iconContainer).toBeInTheDocument();
  });
});