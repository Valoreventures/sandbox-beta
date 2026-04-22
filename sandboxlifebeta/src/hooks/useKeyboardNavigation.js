import { useEffect, useCallback, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * useKeyboardNavigation Hook
 * 
 * Provides comprehensive keyboard navigation support including:
 * - ESC key handling for closing menus/modals
 * - Tab order management
 * - Focus trapping for modals
 * - Arrow key navigation for lists/grids
 * - Enter/Space activation
 * 
 * Requirements: 4.5, 4.6
 */
export const useKeyboardNavigation = (options = {}) => {
  const {
    onEscape,
    onEnter,
    onSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    trapFocus = false,
    containerRef,
    enabled = true,
    preventDefault = true
  } = options;

  const { state: accessibilityState, utils } = useAccessibility();
  const lastFocusedElement = useRef(null);

  // Handle keydown events
  const handleKeyDown = useCallback((event) => {
    if (!enabled || !accessibilityState.keyboardNavigation) return;

    const { key, shiftKey, ctrlKey, altKey, metaKey } = event;
    
    // Don't handle if modifier keys are pressed (except Shift for Tab)
    if ((ctrlKey || altKey || metaKey) && key !== 'Tab') return;

    switch (key) {
      case 'Escape':
        if (onEscape) {
          if (preventDefault) event.preventDefault();
          onEscape(event);
          utils.announce('Menu closed', 'polite');
        }
        break;

      case 'Enter':
        if (onEnter) {
          if (preventDefault) event.preventDefault();
          onEnter(event);
        }
        break;

      case ' ':
      case 'Space':
        if (onSpace) {
          if (preventDefault) event.preventDefault();
          onSpace(event);
        }
        break;

      case 'ArrowUp':
        if (onArrowUp) {
          if (preventDefault) event.preventDefault();
          onArrowUp(event);
        }
        break;

      case 'ArrowDown':
        if (onArrowDown) {
          if (preventDefault) event.preventDefault();
          onArrowDown(event);
        }
        break;

      case 'ArrowLeft':
        if (onArrowLeft) {
          if (preventDefault) event.preventDefault();
          onArrowLeft(event);
        }
        break;

      case 'ArrowRight':
        if (onArrowRight) {
          if (preventDefault) event.preventDefault();
          onArrowRight(event);
        }
        break;

      case 'Tab':
        if (onTab) {
          onTab(event, shiftKey);
        }
        
        // Handle focus trapping
        if (trapFocus && containerRef?.current) {
          handleFocusTrap(event, shiftKey);
        }
        break;

      default:
        break;
    }
  }, [
    enabled,
    accessibilityState.keyboardNavigation,
    onEscape,
    onEnter,
    onSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    trapFocus,
    containerRef,
    preventDefault,
    utils
  ]);

  // Handle focus trapping for modals
  const handleFocusTrap = useCallback((event, shiftKey) => {
    if (!containerRef?.current) return;

    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, [containerRef]);

  // Get all focusable elements within a container
  const getFocusableElements = useCallback((container) => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter(element => {
        // Check if element is visible and not hidden
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               element.offsetParent !== null;
      });
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (!enabled) return;

    const target = containerRef?.current || document;
    target.addEventListener('keydown', handleKeyDown);

    return () => {
      target.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown, containerRef]);

  // Focus management utilities
  const focusUtils = {
    // Save current focus for restoration later
    saveFocus: () => {
      lastFocusedElement.current = document.activeElement;
    },

    // Restore previously saved focus
    restoreFocus: () => {
      if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
        lastFocusedElement.current.focus();
        lastFocusedElement.current = null;
      }
    },

    // Focus first focusable element in container
    focusFirst: (container = containerRef?.current) => {
      if (!container) return false;
      
      const focusableElements = getFocusableElements(container);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return true;
      }
      return false;
    },

    // Focus last focusable element in container
    focusLast: (container = containerRef?.current) => {
      if (!container) return false;
      
      const focusableElements = getFocusableElements(container);
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
        return true;
      }
      return false;
    },

    // Check if element is focusable
    isFocusable: (element) => {
      if (!element) return false;
      
      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ];

      return focusableSelectors.some(selector => element.matches(selector));
    },

    // Get all focusable elements in container
    getFocusableElements
  };

  return {
    focusUtils,
    isKeyboardNavigationEnabled: accessibilityState.keyboardNavigation
  };
};

/**
 * useArrowNavigation Hook
 * 
 * Specialized hook for arrow key navigation in lists, grids, and carousels
 */
export const useArrowNavigation = (items, options = {}) => {
  const {
    orientation = 'vertical', // 'vertical' | 'horizontal' | 'grid'
    loop = true,
    columns = 1, // For grid navigation
    onSelectionChange,
    containerRef
  } = options;

  const { state: accessibilityState, utils } = useAccessibility();
  const currentIndex = useRef(0);

  const navigate = useCallback((direction) => {
    if (!accessibilityState.keyboardNavigation || !items.length) return;

    let newIndex = currentIndex.current;

    switch (orientation) {
      case 'vertical':
        if (direction === 'up') {
          newIndex = loop ? (newIndex - 1 + items.length) % items.length : Math.max(0, newIndex - 1);
        } else if (direction === 'down') {
          newIndex = loop ? (newIndex + 1) % items.length : Math.min(items.length - 1, newIndex + 1);
        }
        break;

      case 'horizontal':
        if (direction === 'left') {
          newIndex = loop ? (newIndex - 1 + items.length) % items.length : Math.max(0, newIndex - 1);
        } else if (direction === 'right') {
          newIndex = loop ? (newIndex + 1) % items.length : Math.min(items.length - 1, newIndex + 1);
        }
        break;

      case 'grid':
        const row = Math.floor(newIndex / columns);
        const col = newIndex % columns;
        const totalRows = Math.ceil(items.length / columns);

        if (direction === 'up' && row > 0) {
          newIndex = (row - 1) * columns + col;
        } else if (direction === 'down' && row < totalRows - 1) {
          newIndex = Math.min((row + 1) * columns + col, items.length - 1);
        } else if (direction === 'left' && col > 0) {
          newIndex = newIndex - 1;
        } else if (direction === 'right' && col < columns - 1 && newIndex < items.length - 1) {
          newIndex = newIndex + 1;
        }
        break;

      default:
        break;
    }

    if (newIndex !== currentIndex.current) {
      currentIndex.current = newIndex;
      
      if (onSelectionChange) {
        onSelectionChange(newIndex, items[newIndex]);
      }

      // Announce the change
      const item = items[newIndex];
      const itemLabel = typeof item === 'string' ? item : item?.label || item?.name || `Item ${newIndex + 1}`;
      utils.announce(`${itemLabel}, ${newIndex + 1} of ${items.length}`, 'polite');
    }
  }, [items, orientation, loop, columns, onSelectionChange, accessibilityState.keyboardNavigation, utils]);

  const keyboardHandlers = {
    onArrowUp: () => navigate('up'),
    onArrowDown: () => navigate('down'),
    onArrowLeft: () => navigate('left'),
    onArrowRight: () => navigate('right')
  };

  useKeyboardNavigation({
    ...keyboardHandlers,
    containerRef,
    enabled: true
  });

  return {
    currentIndex: currentIndex.current,
    setCurrentIndex: (index) => {
      if (index >= 0 && index < items.length) {
        currentIndex.current = index;
        if (onSelectionChange) {
          onSelectionChange(index, items[index]);
        }
      }
    },
    navigate
  };
};

/**
 * useEscapeKey Hook
 * 
 * Simplified hook for handling ESC key to close modals/dropdowns
 */
export const useEscapeKey = (callback, enabled = true) => {
  useKeyboardNavigation({
    onEscape: callback,
    enabled
  });
};

/**
 * useFocusTrap Hook
 * 
 * Specialized hook for trapping focus within a container (modals, dropdowns)
 */
export const useFocusTrap = (containerRef, isActive = true) => {
  const { focusUtils } = useKeyboardNavigation({
    trapFocus: isActive,
    containerRef,
    enabled: isActive
  });

  useEffect(() => {
    if (isActive && containerRef?.current) {
      focusUtils.saveFocus();
      focusUtils.focusFirst();

      return () => {
        focusUtils.restoreFocus();
      };
    }
  }, [isActive, containerRef, focusUtils]);

  return focusUtils;
};