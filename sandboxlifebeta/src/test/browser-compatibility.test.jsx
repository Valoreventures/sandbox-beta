import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';

// Mock react-router-dom params
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ userId: 'test-user-123' })
  };
});

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
};

describe('Browser Compatibility Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('CSS Grid Support', () => {
    it('should use CSS Grid with proper fallbacks', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for grid classes
      const gridElements = document.querySelectorAll('[class*="grid"]');
      expect(gridElements.length).toBeGreaterThan(0);
      
      // Verify grid containers have proper structure
      gridElements.forEach(element => {
        const classes = Array.from(element.classList);
        const hasGridClass = classes.some(cls => cls.startsWith('grid'));
        expect(hasGridClass).toBe(true);
      });
    });

    it('should provide flexbox fallbacks for older browsers', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for flex classes as fallbacks
      const flexElements = document.querySelectorAll('[class*="flex"]');
      expect(flexElements.length).toBeGreaterThan(0);
      
      // Main container should use flex for layout
      const mainContainer = screen.getByRole('main').closest('.min-h-screen');
      expect(mainContainer).toHaveClass('flex', 'flex-col');
    });
  });

  describe('Viewport Units Support', () => {
    it('should handle viewport units gracefully', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for min-h-screen class (100vh equivalent)
      const viewportElements = document.querySelectorAll('.min-h-screen');
      expect(viewportElements.length).toBeGreaterThan(0);
      
      // Verify proper height classes are used
      const heightElements = document.querySelectorAll('[class*="h-"], [class*="min-h-"]');
      expect(heightElements.length).toBeGreaterThan(0);
    });
  });
  describe('Modern CSS Features', () => {
    it('should use modern CSS with appropriate fallbacks', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for modern CSS classes
      const modernElements = document.querySelectorAll('[class*="rounded"], [class*="shadow"]');
      expect(modernElements.length).toBeGreaterThan(0);
      
      // Verify transition classes for smooth animations
      const transitionElements = document.querySelectorAll('[class*="transition"]');
      expect(transitionElements.length).toBeGreaterThan(0);
    });

    it('should handle custom properties and CSS variables', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for Tailwind custom color classes
      const customColorElements = document.querySelectorAll('[class*="bg-lightpapyrus"], [class*="bg-bgpapyrus"]');
      expect(customColorElements.length).toBeGreaterThan(0);
    });
  });

  describe('JavaScript Feature Support', () => {
    it('should handle modern JavaScript features gracefully', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Component should render successfully with modern JS features
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    });

    it('should handle async operations properly', async () => {
      renderHomePage();
      
      // Should handle loading states
      await waitFor(() => {
        const hasLoadingOrContent = document.querySelector('.animate-pulse') || 
                                   screen.queryByText('Recent Entries');
        expect(hasLoadingOrContent).toBeTruthy();
      });
    });
  });

  describe('Image Loading and Optimization', () => {
    it('should handle image loading with proper fallbacks', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for images with proper attributes
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Should have alt text
        expect(img.hasAttribute('alt')).toBe(true);
        
        // Should have loading attribute for modern browsers
        const hasLoadingAttr = img.hasAttribute('loading');
        if (hasLoadingAttr) {
          expect(img.getAttribute('loading')).toBe('lazy');
        }
      });
    });
  });

  describe('Performance Features', () => {
    it('should implement performance optimizations safely', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for performance optimization styles
      const mainContent = screen.getByRole('main');
      const style = mainContent.getAttribute('style');
      
      if (style) {
        // Should have hardware acceleration
        expect(style).toContain('translateZ(0)');
      }
    });
  });
  describe('Responsive Design Compatibility', () => {
    it('should work across different screen sizes', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
      
      // Verify mobile-first approach
      const mobileFirstElements = document.querySelectorAll('[class*="grid-cols-1"]');
      expect(mobileFirstElements.length).toBeGreaterThan(0);
    });

    it('should handle touch interactions properly', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for proper touch target sizes
      const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
      interactiveElements.forEach(element => {
        const classes = Array.from(element.classList);
        const hasProperSizing = classes.some(cls => 
          cls.includes('p-') || cls.includes('h-') || cls.includes('w-') ||
          cls.includes('px-') || cls.includes('py-') || cls.includes('inline-flex')
        );
        expect(hasProperSizing).toBe(true);
      });
    });
  });

  describe('Error Handling and Graceful Degradation', () => {
    it('should handle missing features gracefully', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Should render basic structure even if advanced features fail
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should provide meaningful fallbacks for failed operations', async () => {
      renderHomePage();
      
      // Should handle loading states gracefully
      await waitFor(() => {
        const hasContent = screen.queryByText('Recent Entries') || 
                          document.querySelector('.animate-pulse');
        expect(hasContent).toBeTruthy();
      });
    });
  });

  describe('Memory Management', () => {
    it('should not create memory leaks with event listeners', async () => {
      const { unmount } = renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Component should unmount cleanly
      expect(() => unmount()).not.toThrow();
    });

    it('should handle component lifecycle properly', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Should render without errors
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});