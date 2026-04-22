import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useKeyboardNavigation, useEscapeKey } from '../hooks/useKeyboardNavigation';
import { FocusIndicator } from './FocusManager';

/**
 * AccessibilityControls Component
 * Provides UI controls for accessibility preferences including text size,
 * high contrast mode, and reduced motion settings
 */
const AccessibilityControls = ({ className = '', compact = false }) => {
  const { state, actions, utils } = useAccessibility();
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle ESC key to close dropdown
  useEscapeKey(() => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  }, isExpanded);

  // Text size options
  const textSizeOptions = [
    { value: 'default', label: 'A', description: 'Default text size' },
    { value: 'large', label: 'A+', description: 'Large text size' },
    { value: 'extra-large', label: 'A++', description: 'Extra large text size' }
  ];

  // Handle text size change
  const handleTextSizeChange = (size) => {
    actions.setTextSize(size);
    utils.announce(`Text size changed to ${size === 'default' ? 'default' : size}`, 'polite');
  };

  // Handle high contrast toggle
  const handleHighContrastToggle = () => {
    actions.toggleHighContrast();
    utils.announce(
      `High contrast mode ${!state.highContrastMode ? 'enabled' : 'disabled'}`,
      'polite'
    );
  };

  // Handle reduced motion toggle
  const handleReducedMotionToggle = () => {
    actions.toggleReducedMotion();
    utils.announce(
      `Reduced motion ${!state.reducedMotion ? 'enabled' : 'disabled'}`,
      'polite'
    );
  };

  // Handle larger touch targets toggle
  const handleLargerTouchTargetsToggle = () => {
    actions.toggleLargerTouchTargets();
    utils.announce(
      `Larger touch targets ${!state.largerTouchTargets ? 'enabled' : 'disabled'}`,
      'polite'
    );
  };

  // Compact view for toolbar/header integration
  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <FocusIndicator variant="default" shape="rounded">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-expanded={isExpanded}
            aria-haspopup="true"
            aria-label="Accessibility settings"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
              />
            </svg>
            <span className="hidden sm:inline">Accessibility</span>
          </button>
        </FocusIndicator>

        {isExpanded && (
          <div 
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            role="dialog"
            aria-label="Accessibility settings panel"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Accessibility Settings
              </h3>
              
              {/* Text Size Controls */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Size
                </label>
                <div className="flex space-x-2" role="radiogroup" aria-label="Text size options">
                  {textSizeOptions.map((option) => (
                    <FocusIndicator key={option.value} variant="default" shape="rounded">
                      <button
                        onClick={() => handleTextSizeChange(option.value)}
                        className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          state.textSize === option.value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        aria-label={option.description}
                        aria-pressed={state.textSize === option.value}
                        role="radio"
                        aria-checked={state.textSize === option.value}
                      >
                        {option.label}
                      </button>
                    </FocusIndicator>
                  ))}
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.highContrastMode}
                    onChange={handleHighContrastToggle}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">High Contrast Mode</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.reducedMotion}
                    onChange={handleReducedMotionToggle}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Reduce Motion</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.largerTouchTargets}
                    onChange={handleLargerTouchTargetsToggle}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Larger Touch Targets</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full view for settings pages
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Accessibility Settings
      </h2>

      {/* Text Size Controls */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Text Size</h3>
        <p className="text-sm text-gray-600 mb-4">
          Adjust the text size throughout the application for better readability.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {textSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTextSizeChange(option.value)}
              className={`px-6 py-3 text-lg font-medium rounded-lg border-2 transition-all duration-150 min-w-[80px] ${
                state.textSize === option.value
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
              aria-label={option.description}
              aria-pressed={state.textSize === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          Current setting: {state.textSize === 'default' ? 'Default' : state.textSize}
        </div>
      </div>

      {/* Visual Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Visual Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="high-contrast"
                type="checkbox"
                checked={state.highContrastMode}
                onChange={handleHighContrastToggle}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700">
                High Contrast Mode
              </label>
              <p className="text-sm text-gray-500">
                Increases contrast and strengthens borders for better visibility.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="reduced-motion"
                type="checkbox"
                checked={state.reducedMotion}
                onChange={handleReducedMotionToggle}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="reduced-motion" className="text-sm font-medium text-gray-700">
                Reduce Motion
              </label>
              <p className="text-sm text-gray-500">
                Minimizes animations and transitions that may cause discomfort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Interaction Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="larger-touch-targets"
                type="checkbox"
                checked={state.largerTouchTargets}
                onChange={handleLargerTouchTargetsToggle}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="larger-touch-targets" className="text-sm font-medium text-gray-700">
                Larger Touch Targets
              </label>
              <p className="text-sm text-gray-500">
                Increases the size of buttons and interactive elements for easier tapping.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={actions.resetPreferences}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default AccessibilityControls;