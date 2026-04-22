import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Accessibility Context for managing accessibility preferences
const AccessibilityContext = createContext();

// Initial state for accessibility preferences
const initialState = {
  // Text size controls
  textSize: 'default', // 'default' | 'large' | 'extra-large'
  
  // High contrast mode
  highContrastMode: false,
  
  // Motion preferences
  reducedMotion: false,
  
  // Focus management
  focusVisible: true,
  
  // Screen reader preferences
  announcements: true,
  
  // Keyboard navigation
  keyboardNavigation: true,
  
  // Touch target size
  largerTouchTargets: false
};

// Action types
const ACCESSIBILITY_ACTIONS = {
  SET_TEXT_SIZE: 'SET_TEXT_SIZE',
  TOGGLE_HIGH_CONTRAST: 'TOGGLE_HIGH_CONTRAST',
  TOGGLE_REDUCED_MOTION: 'TOGGLE_REDUCED_MOTION',
  TOGGLE_FOCUS_VISIBLE: 'TOGGLE_FOCUS_VISIBLE',
  TOGGLE_ANNOUNCEMENTS: 'TOGGLE_ANNOUNCEMENTS',
  TOGGLE_KEYBOARD_NAVIGATION: 'TOGGLE_KEYBOARD_NAVIGATION',
  TOGGLE_LARGER_TOUCH_TARGETS: 'TOGGLE_LARGER_TOUCH_TARGETS',
  SET_PREFERENCES: 'SET_PREFERENCES',
  RESET_PREFERENCES: 'RESET_PREFERENCES'
};

// Reducer function
const accessibilityReducer = (state, action) => {
  switch (action.type) {
    case ACCESSIBILITY_ACTIONS.SET_TEXT_SIZE:
      return { ...state, textSize: action.payload };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_HIGH_CONTRAST:
      return { ...state, highContrastMode: !state.highContrastMode };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_REDUCED_MOTION:
      return { ...state, reducedMotion: !state.reducedMotion };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_FOCUS_VISIBLE:
      return { ...state, focusVisible: !state.focusVisible };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_ANNOUNCEMENTS:
      return { ...state, announcements: !state.announcements };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_KEYBOARD_NAVIGATION:
      return { ...state, keyboardNavigation: !state.keyboardNavigation };
    
    case ACCESSIBILITY_ACTIONS.TOGGLE_LARGER_TOUCH_TARGETS:
      return { ...state, largerTouchTargets: !state.largerTouchTargets };
    
    case ACCESSIBILITY_ACTIONS.SET_PREFERENCES:
      return { ...state, ...action.payload };
    
    case ACCESSIBILITY_ACTIONS.RESET_PREFERENCES:
      return { ...initialState };
    
    default:
      return state;
  }
};

// Accessibility Context Provider
export const AccessibilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, initialState);

  // Load accessibility preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibility_preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({
          type: ACCESSIBILITY_ACTIONS.SET_PREFERENCES,
          payload: preferences
        });
      } catch (error) {
        console.error('Error loading accessibility preferences:', error);
      }
    }

    // Check for system preferences (only if window.matchMedia is available)
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      
      if (prefersReducedMotion && !savedPreferences) {
        dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_REDUCED_MOTION });
      }
      
      if (prefersHighContrast && !savedPreferences) {
        dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_HIGH_CONTRAST });
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('accessibility_preferences', JSON.stringify(state));
  }, [state]);

  // Apply CSS custom properties based on accessibility preferences
  useEffect(() => {
    // Only apply DOM changes if document is available (not in test environment)
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    // Text size scaling
    const textSizeScale = {
      'default': '1',
      'large': '1.125',
      'extra-large': '1.25'
    };
    root.style.setProperty('--text-scale', textSizeScale[state.textSize]);
    
    // High contrast mode
    if (state.highContrastMode) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (state.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Focus visibility
    if (state.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
    
    // Larger touch targets
    if (state.largerTouchTargets) {
      root.classList.add('large-touch-targets');
    } else {
      root.classList.remove('large-touch-targets');
    }
  }, [state]);

  // Action creators
  const actions = {
    setTextSize: (size) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_TEXT_SIZE, payload: size }),
    toggleHighContrast: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_HIGH_CONTRAST }),
    toggleReducedMotion: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_REDUCED_MOTION }),
    toggleFocusVisible: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_FOCUS_VISIBLE }),
    toggleAnnouncements: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_ANNOUNCEMENTS }),
    toggleKeyboardNavigation: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_KEYBOARD_NAVIGATION }),
    toggleLargerTouchTargets: () => dispatch({ type: ACCESSIBILITY_ACTIONS.TOGGLE_LARGER_TOUCH_TARGETS }),
    setPreferences: (preferences) => dispatch({ type: ACCESSIBILITY_ACTIONS.SET_PREFERENCES, payload: preferences }),
    resetPreferences: () => dispatch({ type: ACCESSIBILITY_ACTIONS.RESET_PREFERENCES })
  };

  // Utility functions
  const utils = {
    // Get CSS classes for current accessibility settings
    getAccessibilityClasses: () => {
      const classes = [];
      
      if (state.highContrastMode) classes.push('high-contrast');
      if (state.reducedMotion) classes.push('reduce-motion');
      if (state.focusVisible) classes.push('focus-visible');
      if (state.largerTouchTargets) classes.push('large-touch-targets');
      
      // Text size classes
      if (state.textSize === 'large') classes.push('text-scale-large');
      if (state.textSize === 'extra-large') classes.push('text-scale-xl');
      
      return classes.join(' ');
    },
    
    // Announce message to screen readers
    announce: (message, priority = 'polite') => {
      if (!state.announcements) return;
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    
    // Check if element meets minimum touch target size
    checkTouchTargetSize: (element) => {
      const rect = element.getBoundingClientRect();
      const minSize = state.largerTouchTargets ? 48 : 44;
      return rect.width >= minSize && rect.height >= minSize;
    }
  };

  const value = {
    state,
    actions,
    utils,
    ACCESSIBILITY_ACTIONS
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use Accessibility context
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Export action types for external use
export { ACCESSIBILITY_ACTIONS };