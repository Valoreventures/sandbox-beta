import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * SkipLinks Component
 * 
 * Provides skip navigation links for keyboard users to quickly jump
 * to main content areas, bypassing repetitive navigation elements.
 * 
 * Requirements: 4.5, 4.6
 */
const SkipLinks = ({ links = [] }) => {
  const { state, utils } = useAccessibility();

  // Default skip links if none provided
  const defaultLinks = [
    {
      href: '#main-content',
      label: 'Skip to main content',
      description: 'Jump directly to the main content area'
    },
    {
      href: '#navigation',
      label: 'Skip to navigation',
      description: 'Jump to the main navigation menu'
    },
    {
      href: '#search',
      label: 'Skip to search',
      description: 'Jump to the search functionality'
    }
  ];

  const skipLinks = links.length > 0 ? links : defaultLinks;

  // Handle skip link activation
  const handleSkipLinkClick = (event, link) => {
    event.preventDefault();
    
    const targetElement = document.querySelector(link.href);
    if (targetElement) {
      // Set focus to the target element
      targetElement.focus();
      
      // If the element is not naturally focusable, make it focusable temporarily
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
        
        // Remove tabindex after focus is lost
        const removeFocusHandler = () => {
          targetElement.removeAttribute('tabindex');
          targetElement.removeEventListener('blur', removeFocusHandler);
        };
        targetElement.addEventListener('blur', removeFocusHandler);
      }

      // Scroll to the element
      targetElement.scrollIntoView({ 
        behavior: state.reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      // Announce the skip action
      utils.announce(`Skipped to ${link.label}`, 'polite');
    }
  };

  // Don't render if keyboard navigation is disabled
  if (!state.keyboardNavigation) {
    return null;
  }

  return (
    <div className="skip-links-container">
      {skipLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="skip-link"
          onClick={(e) => handleSkipLinkClick(e, link)}
          onFocus={() => utils.announce(`${link.label} link focused`, 'polite')}
          aria-label={link.description || link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;