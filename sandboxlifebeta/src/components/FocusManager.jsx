import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * FocusManager Component
 * 
 * Manages focus behavior throughout the application including:
 * - Visible focus indicators
 * - Logical tab order
 * - Focus restoration
 * - Focus announcements
 * 
 * Requirements: 4.5, 4.6
 */
const FocusManager = ({ children, className = '' }) => {
  const { state, utils } = useAccessibility();
  const containerRef = useRef(null);
  const [focusedElement, setFocusedElement] = useState(null);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  // Track keyboard vs mouse usage
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Handle focus events within the container
  useEffect(() => {
    if (!containerRef.current || !state.keyboardNavigation) return;

    const container = containerRef.current;

    const handleFocusIn = (event) => {
      const target = event.target;
      setFocusedElement(target);

      // Announce focus changes for screen readers
      if (state.announcements && isKeyboardUser) {
        const announcement = getFocusAnnouncement(target);
        if (announcement) {
          utils.announce(announcement, 'polite');
        }
      }
    };

    const handleFocusOut = (event) => {
      // Small delay to check if focus moved to another element within container
      setTimeout(() => {
        if (!container.contains(document.activeElement)) {
          setFocusedElement(null);
        }
      }, 0);
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [state.keyboardNavigation, state.announcements, isKeyboardUser, utils]);

  // Generate focus announcement for screen readers
  const getFocusAnnouncement = (element) => {
    if (!element) return null;

    // Get element type and label
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const title = element.getAttribute('title');
    const textContent = element.textContent?.trim();

    // Determine element type for announcement
    let elementType = '';
    if (role) {
      elementType = role;
    } else if (tagName === 'button') {
      elementType = 'button';
    } else if (tagName === 'input') {
      const inputType = element.getAttribute('type') || 'text';
      elementType = `${inputType} input`;
    } else if (tagName === 'a') {
      elementType = 'link';
    } else if (tagName === 'select') {
      elementType = 'dropdown';
    } else if (tagName === 'textarea') {
      elementType = 'text area';
    }

    // Determine element label
    let elementLabel = '';
    if (ariaLabel) {
      elementLabel = ariaLabel;
    } else if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy);
      elementLabel = labelElement?.textContent?.trim() || '';
    } else if (title) {
      elementLabel = title;
    } else if (textContent && textContent.length < 100) {
      elementLabel = textContent;
    } else if (tagName === 'input') {
      const placeholder = element.getAttribute('placeholder');
      elementLabel = placeholder || 'input field';
    }

    // Construct announcement
    if (elementLabel && elementType) {
      return `${elementLabel}, ${elementType}`;
    } else if (elementLabel) {
      return elementLabel;
    } else if (elementType) {
      return elementType;
    }

    return null;
  };

  // Get container classes based on accessibility settings
  const getContainerClasses = () => {
    const baseClasses = 'focus-manager';
    const focusClasses = state.focusVisible ? 'focus-visible' : '';
    const keyboardClasses = isKeyboardUser ? 'keyboard-user' : 'mouse-user';
    
    return `${baseClasses} ${focusClasses} ${keyboardClasses} ${className}`.trim();
  };

  return (
    <div 
      ref={containerRef}
      className={getContainerClasses()}
      data-focus-manager="true"
    >
      {children}
    </div>
  );
};

/**
 * FocusIndicator Component
 * 
 * Provides enhanced visual focus indicators for interactive elements
 */
export const FocusIndicator = ({ 
  children, 
  className = '',
  variant = 'default', // 'default' | 'prominent' | 'subtle'
  shape = 'rounded' // 'rounded' | 'square' | 'pill'
}) => {
  const { state } = useAccessibility();
  
  if (!state.focusVisible) {
    return children;
  }

  const getIndicatorClasses = () => {
    const baseClasses = 'focus-indicator relative';
    
    const variantClasses = {
      'default': 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'prominent': 'focus:ring-4 focus:ring-blue-600 focus:ring-offset-2 focus:shadow-lg',
      'subtle': 'focus:ring-1 focus:ring-blue-400 focus:ring-offset-1'
    };

    const shapeClasses = {
      'rounded': 'focus:rounded-md',
      'square': 'focus:rounded-none',
      'pill': 'focus:rounded-full'
    };

    return `${baseClasses} ${variantClasses[variant]} ${shapeClasses[shape]} ${className}`;
  };

  return (
    <div className={getIndicatorClasses()}>
      {children}
    </div>
  );
};

/**
 * TabOrderManager Component
 * 
 * Ensures logical tab order within a container
 */
export const TabOrderManager = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const { state } = useAccessibility();

  useEffect(() => {
    if (!containerRef.current || !state.keyboardNavigation) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );

    // Ensure logical tab order by setting tabindex if needed
    focusableElements.forEach((element, index) => {
      if (!element.hasAttribute('tabindex') || element.getAttribute('tabindex') === '0') {
        element.setAttribute('tabindex', '0');
      }
    });
  }, [state.keyboardNavigation]);

  return (
    <div 
      ref={containerRef}
      className={`tab-order-manager ${className}`}
      data-tab-order-managed="true"
    >
      {children}
    </div>
  );
};

export default FocusManager;