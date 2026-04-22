import React from 'react';

/**
 * Reusable backdrop component for all overlays
 * Provides consistent semi-transparent overlay behavior
 * 
 * @param {boolean} isVisible - Whether the backdrop should be visible
 * @param {function} onClick - Callback when backdrop is clicked
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 */
const Backdrop = ({ 
  isVisible, 
  onClick, 
  className = "", 
  style = {},
  children 
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-200 z-modal-backdrop ${className}`}
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      aria-label="Close overlay"
    >
      {children}
    </div>
  );
};

export default Backdrop;