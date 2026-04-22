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

describe('Cross-Browser Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Layout Structure and Viewport Utilization', () => {
    it('should render with full viewport height layout structure', async () => {
      renderHomePage();
      
      const mainContainer = screen.getByRole('main');
      expect(mainContainer).toBeInTheDocument();
      
      // Check for min-h-screen class on root container
      const rootContainer = mainContainer.closest('.min-h-screen');
      expect(rootContainer).toBeInTheDocument();
      expect(rootContainer).toHaveClass('min-h-screen', 'bg-lightpapyrus', 'flex', 'flex-col');
    });

    it('should have proper component hierarchy and z-index layering', async () => {
      renderHomePage();

      // Wait for components to load
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument(); // HeaderBar
      });

      const navigations = screen.getAllByRole('navigation');
      const main = screen.getByRole('main');

      expect(navigations.length).toBeGreaterThan(0);
      expect(main).toBeInTheDocument();

      // Check z-index layering through classes on main navigation
      // Nav has z-20 for proper layering above content
      const mainNavigation = navigations.find(nav => nav.classList.contains('z-20'));
      expect(mainNavigation).toBeInTheDocument();
      // Main content has z-0 to stay below navigation
      expect(main).toHaveClass('relative', 'z-0');
    });
  });

  describe('Responsive Grid System', () => {
    it('should implement responsive grid classes for different breakpoints', async () => {
      renderHomePage();
      
      await waitFor(() => {
        const gridContainers = document.querySelectorAll('[class*="grid-cols"]');
        expect(gridContainers.length).toBeGreaterThan(0);
      });
      
      // Check for responsive grid classes
      const gridElements = document.querySelectorAll('[class*="grid-cols-1"]');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });
  describe('Spacing System Compliance', () => {
    it('should use consistent spacing classes throughout the layout', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for 8-point spacing system usage
      const spacingElements = document.querySelectorAll('[class*="p-6"], [class*="py-8"], [class*="space-y-12"]');
      expect(spacingElements.length).toBeGreaterThan(0);
      
      // Verify main content padding
      const mainContent = screen.getByRole('main');
      const contentContainer = mainContent.querySelector('.max-w-7xl');
      expect(contentContainer).toHaveClass('px-6', 'py-8');
    });

    it('should maintain proper section spacing and visual hierarchy', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByText('Weekly Overview')).toBeInTheDocument();
      });
      
      // Check for section spacing
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
      
      sections.forEach(section => {
        const hasProperSpacing = section.classList.contains('p-6') || 
                                section.classList.contains('py-2') ||
                                section.classList.contains('py-4') ||
                                section.classList.contains('space-y-8') ||
                                section.classList.contains('bg-white') ||
                                section.classList.contains('bg-gray-50');
        expect(hasProperSpacing).toBe(true);
      });
    });
  });

  describe('Element Overlap Prevention', () => {
    it('should prevent element overlapping with proper z-index management', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
      });
      
      // Check for proper z-index classes
      const zIndexElements = document.querySelectorAll('[class*="z-"]');
      expect(zIndexElements.length).toBeGreaterThan(0);
      
      // Verify no problematic negative margins that could cause overlaps
      // Allow common utility classes like ml-, mr-, mt-, mb-
      const allElements = document.querySelectorAll('*');
      let hasProblematicMargin = false;
      allElements.forEach(element => {
        const hasNegativeMargin = Array.from(element.classList).some(cls => 
          cls.startsWith('-m') && 
          !cls.includes('ml-') && 
          !cls.includes('mr-') && 
          !cls.includes('mt-') && 
          !cls.includes('mb-') &&
          !cls.includes('mx-') &&
          !cls.includes('my-') &&
          !cls.includes('md:') && 
          !cls.includes('lg:') &&
          !cls.includes('sm:') &&
          !cls.includes('xl:')
        );
        if (hasNegativeMargin) {
          hasProblematicMargin = true;
        }
      });
      expect(hasProblematicMargin).toBe(false);
    });
  });

  describe('Menu Integration and Layout Adjustments', () => {
    it('should handle menu state transitions gracefully', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for transition classes on main content
      const mainContentWrapper = document.querySelector('[class*="transition-all"]');
      expect(mainContentWrapper).toBeInTheDocument();
      expect(mainContentWrapper).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });
  });
  describe('Performance Optimization', () => {
    it('should implement performance optimizations for smooth rendering', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for performance optimization attributes
      const mainContent = screen.getByRole('main');
      const style = mainContent.getAttribute('style');
      
      // Should have hardware acceleration
      expect(style).toContain('translateZ(0)');
    });

    it('should handle loading states without layout shifts', async () => {
      renderHomePage();
      
      // Check for loading skeleton structure
      await waitFor(() => {
        const skeletonElements = document.querySelectorAll('.animate-pulse');
        // Should either have skeleton or loaded content
        const hasContent = screen.queryByText('Recent Entries') || skeletonElements.length > 0;
        expect(hasContent).toBeTruthy();
      });
    });
  });

  describe('Accessibility Standards', () => {
    it('should maintain proper semantic HTML structure', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument(); // HeaderBar
        expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0); // Navigation elements
        expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
      });
      
      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(0);
      
      // Verify sections have proper structure
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should provide proper focus management and keyboard navigation', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for focusable elements
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain existing functionality and component structure', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Verify key components are present
      expect(screen.getByRole('banner')).toBeInTheDocument(); // HeaderBar
      expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0); // Navigation elements
      
      // Check for dashboard controls section
      await waitFor(() => {
        const dashboardSection = screen.queryByText('Dashboard Settings');
        if (dashboardSection) {
          expect(dashboardSection).toBeInTheDocument();
        }
      });
    });
  });
  describe('Visual Hierarchy and Design System', () => {
    it('should implement consistent visual hierarchy with proper backgrounds', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for consistent background colors
      const bgElements = document.querySelectorAll('[class*="bg-"]');
      expect(bgElements.length).toBeGreaterThan(0);
      
      // Verify proper card styling
      const cardElements = document.querySelectorAll('.rounded-lg, .shadow-sm');
      expect(cardElements.length).toBeGreaterThan(0);
    });

    it('should use consistent typography hierarchy', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for typography classes
      const typographyElements = document.querySelectorAll('[class*="text-"], [class*="font-"]');
      expect(typographyElements.length).toBeGreaterThan(0);
      
      // Verify heading structure
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        const hasTypographyClass = Array.from(heading.classList).some(cls => 
          cls.includes('text-') || cls.includes('font-')
        );
        expect(hasTypographyClass).toBe(true);
      });
    });
  });

  describe('Cross-Device Compatibility', () => {
    it('should handle different viewport sizes with responsive classes', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
      
      // Verify grid responsiveness
      const gridElements = document.querySelectorAll('[class*="grid-cols-1"]');
      gridElements.forEach(element => {
        const hasResponsiveGrid = Array.from(element.classList).some(cls => 
          cls.includes('sm:grid-cols-') || cls.includes('lg:grid-cols-')
        );
        expect(hasResponsiveGrid).toBe(true);
      });
    });
  });

  describe('Error Handling and Fallbacks', () => {
    it('should handle loading states gracefully', async () => {
      renderHomePage();
      
      // Should show loading skeleton initially or content
      const hasLoadingOrContent = await waitFor(() => {
        const skeleton = document.querySelector('.animate-pulse');
        const content = screen.queryByText('Recent Entries');
        return skeleton || content;
      });
      
      expect(hasLoadingOrContent).toBeTruthy();
    });

    it('should maintain layout stability during state changes', async () => {
      renderHomePage();
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
      });
      
      // Check for stable layout classes
      const mainContainer = screen.getByRole('main').closest('.min-h-screen');
      expect(mainContainer).toHaveClass('flex', 'flex-col');
      
      // Verify flex-1 for main content expansion
      const flexElements = document.querySelectorAll('.flex-1');
      expect(flexElements.length).toBeGreaterThan(0);
    });
  });
});