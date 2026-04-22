import { useEffect, useCallback } from 'react';

// Global state for managing body scroll prevention across multiple overlays
let overlayCount = 0;
let originalOverflow = '';

/**
 * Custom hook for managing overlay states and preventing body scrolling
 * Handles escape key events and body scroll prevention
 * 
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} onClose - Callback to close the overlay
 * @param {object} options - Configuration options
 * @param {boolean} options.preventBodyScroll - Whether to prevent body scrolling (default: true)
 * @param {boolean} options.closeOnEscape - Whether to close on escape key (default: true)
 */
export const useOverlay = (isOpen, onClose, options = {}) => {
  const {
    preventBodyScroll = true,
    closeOnEscape = true
  } = options;

  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape && isOpen) {
      onClose();
    }
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen && preventBodyScroll) {
      // If this is the first overlay, store the original overflow value
      if (overlayCount === 0) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      overlayCount++;
      
      // Cleanup function to decrement count and restore overflow if needed
      return () => {
        overlayCount--;
        if (overlayCount === 0) {
          document.body.style.overflow = originalOverflow;
        }
      };
    }
  }, [isOpen, preventBodyScroll]);

  useEffect(() => {
    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [handleEscape, closeOnEscape]);
};

/**
 * Custom hook for handling click-outside behavior
 * Closes overlay when clicking outside the specified element
 * 
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} onClose - Callback to close the overlay
 * @param {string} containerSelector - CSS selector for the container element
 */
export const useClickOutside = (isOpen, onClose, containerSelector) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(containerSelector)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose, containerSelector]);
};

/**
 * Custom hook for focus management in overlays
 * Traps focus within the overlay and returns focus when closed
 * 
 * @param {boolean} isActive - Whether focus trap is active
 * @param {React.RefObject} containerRef - Ref to the container element
 */
export const useFocusTrap = (isActive, containerRef) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Focus first element when trap becomes active
    firstElement?.focus();

    container.addEventListener('keydown', handleTabKey);
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, containerRef]);
};