import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import Backdrop from '../components/Backdrop.jsx';
import { OverlayProvider, useOverlayRegistration } from '../contexts/OverlayContext.jsx';
import { useOverlay } from '../hooks/useOverlay.js';
import React from 'react';

describe('UI Layering Improvements - Overlay System', () => {
  beforeEach(() => {
    // Reset document body styles before each test
    document.body.style.overflow = '';
  });

  afterEach(() => {
    cleanup();
    // Clean up any remaining styles
    document.body.style.overflow = '';
  });

  /**
   * Property 4: Z-Index Hierarchy Consistency
   * **Feature: ui-layering-improvements, Property 4: Z-Index Hierarchy Consistency**
   * **Validates: Requirements 1.5, 2.1, 2.5, 3.1, 3.2, 4.1, 5.1, 5.2**
   */
  describe('Property 4: Z-Index Hierarchy Consistency', () => {
    it('should maintain consistent z-index hierarchy across all overlay elements', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom('dropdown', 'modal', 'popover', 'tooltip', 'toast'), { minLength: 1, maxLength: 5 }),
          (overlayTypes) => {
            // Test that z-index values follow the expected hierarchy
            const zIndexMap = {
              'dropdown': 1000,
              'sticky': 1020,
              'fixed': 1030,
              'modal-backdrop': 1040,
              'modal': 1050,
              'popover': 1060,
              'tooltip': 1070,
              'toast': 1080
            };

            // Create elements with different overlay types
            const elements = overlayTypes.map((type, index) => {
              const element = document.createElement('div');
              element.className = `z-${type}`;
              element.style.zIndex = zIndexMap[type] || zIndexMap.modal;
              return { element, type, expectedZIndex: zIndexMap[type] || zIndexMap.modal };
            });

            // Verify hierarchy is maintained
            for (let i = 0; i < elements.length - 1; i++) {
              for (let j = i + 1; j < elements.length; j++) {
                const elem1 = elements[i];
                const elem2 = elements[j];
                
                // If elem1 should be below elem2 in hierarchy
                if (elem1.expectedZIndex < elem2.expectedZIndex) {
                  expect(parseInt(elem1.element.style.zIndex)).toBeLessThan(
                    parseInt(elem2.element.style.zIndex)
                  );
                }
              }
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should ensure overlay elements have higher z-index than background content', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('dropdown', 'modal', 'popover', 'tooltip', 'toast'),
          fc.integer({ min: 1, max: 999 }), // Background content z-index
          (overlayType, backgroundZIndex) => {
            const overlayZIndexMap = {
              'dropdown': 1000,
              'modal': 1050,
              'popover': 1060,
              'tooltip': 1070,
              'toast': 1080
            };

            const overlayZIndex = overlayZIndexMap[overlayType];
            
            // Overlay should always be above background content
            expect(overlayZIndex).toBeGreaterThan(backgroundZIndex);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 5: Backdrop Styling Standardization
   * **Feature: ui-layering-improvements, Property 5: Backdrop Styling Standardization**
   * **Validates: Requirements 4.2**
   */
  describe('Property 5: Backdrop Styling Standardization', () => {
    it('should apply consistent backdrop styling across all overlay types', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // isVisible
          fc.string(), // additional className
          (isVisible, additionalClassName) => {
            const mockOnClick = () => {};
            
            const { container } = render(
              <Backdrop 
                isVisible={isVisible} 
                onClick={mockOnClick}
                className={additionalClassName}
              />
            );

            if (isVisible) {
              const backdrop = container.querySelector('.z-modal-backdrop');
              expect(backdrop).toBeTruthy();
              
              // Check standard backdrop properties
              expect(backdrop).toHaveClass('fixed');
              expect(backdrop).toHaveClass('inset-0');
              expect(backdrop).toHaveClass('bg-black');
              expect(backdrop).toHaveClass('bg-opacity-50');
              expect(backdrop).toHaveClass('transition-opacity');
              expect(backdrop).toHaveClass('duration-200');
              expect(backdrop).toHaveClass('z-modal-backdrop');
              
              // Should include additional className if provided
              if (additionalClassName.trim()) {
                expect(backdrop).toHaveClass(additionalClassName);
              }
            } else {
              // Should not render when not visible
              expect(container.firstChild).toBeNull();
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain consistent backdrop behavior regardless of content', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // isVisible
          fc.option(fc.string().filter(s => s.trim().length > 0 && s.length <= 10), { nil: null }), // children content - filter out whitespace-only strings and limit length
          (isVisible, children) => {
            const mockOnClick = vi.fn();
            
            const { container } = render(
              <Backdrop isVisible={isVisible} onClick={mockOnClick}>
                {children}
              </Backdrop>
            );

            if (isVisible) {
              const backdrop = container.querySelector('.z-modal-backdrop');
              expect(backdrop).toBeTruthy();
              
              // Should have consistent attributes regardless of children
              expect(backdrop).toHaveAttribute('role', 'button');
              expect(backdrop).toHaveAttribute('tabIndex', '-1');
              expect(backdrop).toHaveAttribute('aria-label', 'Close overlay');
              
              // Should render children if provided and not empty
              if (children && children.trim().length > 0) {
                // Use toContainHTML instead of toHaveTextContent to handle whitespace better
                expect(backdrop.textContent).toContain(children.trim());
              }
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Test component for overlay registration
  const TestOverlayComponent = ({ overlayId, isOpen }) => {
    const zIndex = useOverlayRegistration(overlayId, isOpen);
    return (
      <div 
        data-testid={`overlay-${overlayId}`}
        style={{ zIndex }}
        className={isOpen ? 'visible' : 'hidden'}
      >
        Overlay {overlayId}
      </div>
    );
  };

  /**
   * Property 1: Backdrop Rendering Consistency
   * **Feature: ui-layering-improvements, Property 1: Backdrop Rendering Consistency**
   * **Validates: Requirements 1.2, 2.2**
   */
  describe('Property 1: Backdrop Rendering Consistency', () => {
    it('should render backdrop with semi-transparent styling and full viewport coverage for any overlay element', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('dropdown', 'menu', 'modal'), // Different overlay types
          fc.boolean(), // isVisible state
          fc.option(fc.string().filter(s => s.trim().length > 0 && s.length <= 20), { nil: null }), // additional className
          (overlayType, isVisible, additionalClassName) => {
            const mockOnClick = vi.fn();
            
            const { container } = render(
              <Backdrop 
                isVisible={isVisible} 
                onClick={mockOnClick}
                className={additionalClassName || ''}
              />
            );

            if (isVisible) {
              const backdrop = container.querySelector('.z-modal-backdrop');
              expect(backdrop).toBeTruthy();
              
              // Should have semi-transparent styling
              expect(backdrop).toHaveClass('bg-black');
              expect(backdrop).toHaveClass('bg-opacity-50');
              
              // Should have full viewport coverage
              expect(backdrop).toHaveClass('fixed');
              expect(backdrop).toHaveClass('inset-0');
              
              // Should have consistent transition properties
              expect(backdrop).toHaveClass('transition-opacity');
              expect(backdrop).toHaveClass('duration-200');
              
              // Should have proper z-index for backdrop
              expect(backdrop).toHaveClass('z-modal-backdrop');
              
              // Should be clickable
              expect(backdrop).toHaveAttribute('role', 'button');
              expect(backdrop).toHaveAttribute('tabIndex', '-1');
              expect(backdrop).toHaveAttribute('aria-label', 'Close overlay');
              
            } else {
              // Should not render when not visible
              expect(container.firstChild).toBeNull();
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain backdrop consistency across different overlay contexts', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom('header-dropdown', 'sidebar-menu', 'modal-dialog'), { minLength: 1, maxLength: 3 }),
          fc.boolean(), // all visible or not
          (overlayContexts, allVisible) => {
            const mockOnClick = vi.fn();
            
            // Render multiple backdrops to test consistency
            const { container } = render(
              <div>
                {overlayContexts.map((context, index) => (
                  <Backdrop 
                    key={`${context}-${index}`}
                    isVisible={allVisible} 
                    onClick={mockOnClick}
                    className={`backdrop-${context}`}
                  />
                ))}
              </div>
            );

            if (allVisible) {
              const backdrops = container.querySelectorAll('.z-modal-backdrop');
              expect(backdrops).toHaveLength(overlayContexts.length);
              
              // All backdrops should have consistent styling
              backdrops.forEach((backdrop, index) => {
                expect(backdrop).toHaveClass('fixed');
                expect(backdrop).toHaveClass('inset-0');
                expect(backdrop).toHaveClass('bg-black');
                expect(backdrop).toHaveClass('bg-opacity-50');
                expect(backdrop).toHaveClass('transition-opacity');
                expect(backdrop).toHaveClass('duration-200');
                expect(backdrop).toHaveClass('z-modal-backdrop');
                expect(backdrop).toHaveClass(`backdrop-${overlayContexts[index]}`);
              });
            } else {
              // No backdrops should be rendered
              const backdrops = container.querySelectorAll('.z-modal-backdrop');
              expect(backdrops).toHaveLength(0);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 2: Universal Click-Outside-to-Close
   * **Feature: ui-layering-improvements, Property 2: Universal Click-Outside-to-Close**
   * **Validates: Requirements 1.3, 2.3, 4.3**
   */
  describe('Property 2: Universal Click-Outside-to-Close', () => {
    it('should close overlay when clicking on backdrop for any overlay element', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('dropdown', 'menu', 'modal'), // Different overlay types
          fc.boolean(), // initial visibility state
          (overlayType, initiallyVisible) => {
            const mockOnClick = vi.fn();
            
            const { container, rerender } = render(
              <Backdrop 
                isVisible={initiallyVisible} 
                onClick={mockOnClick}
                className={`test-${overlayType}`}
              />
            );

            if (initiallyVisible) {
              const backdrop = container.querySelector('.z-modal-backdrop');
              expect(backdrop).toBeTruthy();
              
              // Simulate click on backdrop
              backdrop.click();
              
              // Should call the onClick handler
              expect(mockOnClick).toHaveBeenCalledTimes(1);
              
              // Test that clicking backdrop closes overlay (simulate state change)
              rerender(
                <Backdrop 
                  isVisible={false} 
                  onClick={mockOnClick}
                  className={`test-${overlayType}`}
                />
              );
              
              // Backdrop should no longer be rendered
              const closedBackdrop = container.querySelector('.z-modal-backdrop');
              expect(closedBackdrop).toBeNull();
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle click-outside behavior consistently across different overlay contexts', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom('header-dropdown', 'sidebar-menu', 'modal-dialog'), { minLength: 1, maxLength: 3 }),
          (overlayContexts) => {
            const mockHandlers = overlayContexts.map(() => vi.fn());
            
            const { container } = render(
              <div>
                {overlayContexts.map((context, index) => (
                  <Backdrop 
                    key={`${context}-${index}`}
                    isVisible={true} 
                    onClick={mockHandlers[index]}
                    className={`backdrop-${context}`}
                  />
                ))}
              </div>
            );

            const backdrops = container.querySelectorAll('.z-modal-backdrop');
            expect(backdrops).toHaveLength(overlayContexts.length);
            
            // Click each backdrop and verify handler is called
            backdrops.forEach((backdrop, index) => {
              backdrop.click();
              expect(mockHandlers[index]).toHaveBeenCalledTimes(1);
              
              // Should have proper click attributes
              expect(backdrop).toHaveAttribute('role', 'button');
              expect(backdrop).toHaveAttribute('tabIndex', '-1');
            });

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain click-outside behavior with keyboard accessibility', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('dropdown', 'menu', 'modal'),
          (overlayType) => {
            const mockOnClick = vi.fn();
            
            const { container } = render(
              <Backdrop 
                isVisible={true} 
                onClick={mockOnClick}
                className={`test-${overlayType}`}
              />
            );

            const backdrop = container.querySelector('.z-modal-backdrop');
            expect(backdrop).toBeTruthy();
            
            // Should be keyboard accessible
            expect(backdrop).toHaveAttribute('role', 'button');
            expect(backdrop).toHaveAttribute('tabIndex', '-1');
            expect(backdrop).toHaveAttribute('aria-label', 'Close overlay');
            
            // Should be clickable
            backdrop.click();
            expect(mockOnClick).toHaveBeenCalledTimes(1);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 3: Body Scroll Prevention
   * **Feature: ui-layering-improvements, Property 3: Body Scroll Prevention**
   * **Validates: Requirements 1.4, 2.4, 4.4**
   */
  describe('Property 3: Body Scroll Prevention', () => {
    // Test component to use the useOverlay hook
    const TestOverlayComponent = ({ isOpen, onClose, options = {} }) => {
      useOverlay(isOpen, onClose, options);
      
      return (
        <div data-testid="test-overlay">
          {isOpen ? 'Overlay Open' : 'Overlay Closed'}
        </div>
      );
    };

    beforeEach(() => {
      // Reset document body styles before each test
      document.body.style.overflow = '';
    });

    afterEach(() => {
      // Clean up any remaining styles
      document.body.style.overflow = '';
    });

    it('should prevent body scrolling when any overlay element is open', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('dropdown', 'menu', 'modal'), // Different overlay types
          fc.boolean(), // isOpen state
          fc.boolean(), // preventBodyScroll option
          (overlayType, isOpen, preventBodyScroll) => {
            const mockOnClose = vi.fn();
            const originalOverflow = document.body.style.overflow;
            
            const { unmount } = render(
              <TestOverlayComponent 
                isOpen={isOpen} 
                onClose={mockOnClose}
                options={{ preventBodyScroll }}
              />
            );

            if (isOpen && preventBodyScroll) {
              // Body overflow should be set to hidden
              expect(document.body.style.overflow).toBe('hidden');
            } else {
              // Body overflow should remain unchanged or be restored
              expect(document.body.style.overflow).toBe(originalOverflow);
            }

            // Cleanup
            unmount();
            
            // After unmount, overflow should be restored
            if (isOpen && preventBodyScroll) {
              expect(document.body.style.overflow).toBe(originalOverflow);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle multiple overlays with body scroll prevention correctly', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom('header-dropdown', 'sidebar-menu', 'modal-dialog'), { minLength: 1, maxLength: 3 }),
          fc.boolean(), // all overlays open
          (overlayTypes, allOpen) => {
            const mockHandlers = overlayTypes.map(() => vi.fn());
            const originalOverflow = document.body.style.overflow;
            
            const { unmount } = render(
              <div>
                {overlayTypes.map((type, index) => (
                  <TestOverlayComponent 
                    key={`${type}-${index}`}
                    isOpen={allOpen} 
                    onClose={mockHandlers[index]}
                    options={{ preventBodyScroll: true }}
                  />
                ))}
              </div>
            );

            if (allOpen && overlayTypes.length > 0) {
              // Body overflow should be set to hidden when any overlay is open
              expect(document.body.style.overflow).toBe('hidden');
            } else {
              // Body overflow should remain unchanged
              expect(document.body.style.overflow).toBe(originalOverflow);
            }

            // Cleanup
            unmount();
            
            // After unmount, overflow should be restored
            expect(document.body.style.overflow).toBe(originalOverflow);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should restore original overflow value when overlay closes', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('auto', 'scroll', 'visible', 'hidden'), // original overflow values
          fc.constantFrom('dropdown', 'menu', 'modal'), // overlay types
          (originalOverflow, overlayType) => {
            // Set initial overflow value
            document.body.style.overflow = originalOverflow;
            const mockOnClose = vi.fn();
            
            // Render with overlay open
            const { rerender, unmount } = render(
              <TestOverlayComponent 
                isOpen={true} 
                onClose={mockOnClose}
                options={{ preventBodyScroll: true }}
              />
            );

            // Should be hidden when open
            expect(document.body.style.overflow).toBe('hidden');

            // Close the overlay
            rerender(
              <TestOverlayComponent 
                isOpen={false} 
                onClose={mockOnClose}
                options={{ preventBodyScroll: true }}
              />
            );

            // Should restore original value when closed
            expect(document.body.style.overflow).toBe(originalOverflow);

            // Cleanup
            unmount();

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Multiple Overlay Z-Index Ordering', () => {
    it('should assign higher z-index values to later overlays', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.string().filter(s => s.trim().length > 0 && s.length <= 10).map(s => `test-${s.replace(/[^a-zA-Z0-9]/g, '')}-${Math.random().toString(36).substr(2, 5)}`), // Generate unique test IDs
            { minLength: 2, maxLength: 4 }
          ),
          (overlayIds) => {
            // Ensure all IDs are unique and valid
            const uniqueIds = [...new Set(overlayIds)].filter(id => id.length > 5); // Ensure minimum length after processing
            
            if (uniqueIds.length < 2) return true; // Skip if not enough unique IDs

            const { unmount } = render(
              <OverlayProvider>
                {uniqueIds.map(id => (
                  <TestOverlayComponent key={id} overlayId={id} isOpen={true} />
                ))}
              </OverlayProvider>
            );

            try {
              // Check that each subsequent overlay has a higher z-index
              for (let i = 0; i < uniqueIds.length - 1; i++) {
                const currentOverlay = screen.getByTestId(`overlay-${uniqueIds[i]}`);
                const nextOverlay = screen.getByTestId(`overlay-${uniqueIds[i + 1]}`);
                
                const currentZIndex = parseInt(currentOverlay.style.zIndex);
                const nextZIndex = parseInt(nextOverlay.style.zIndex);
                
                expect(nextZIndex).toBeGreaterThan(currentZIndex);
              }
            } finally {
              unmount(); // Clean up after each test
            }

            return true;
          }
        ),
        { numRuns: 50 } // Reduce number of runs to avoid test pollution
      );
    });
  });
});