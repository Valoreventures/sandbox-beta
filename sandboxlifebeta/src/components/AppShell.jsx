import React, { useState, useEffect } from 'react';
import { useDashboard } from '../contexts/DashboardContext';

/**
 * AppShell Container Component
 * 
 * Provides the main layout structure for Dashboard v2 with:
 * - Responsive breakpoint handling (Mobile ≤480px, Tablet 481-1024px, Desktop ≥1025px)
 * - Sidebar and right rail toggling
 * - Density mode switching (comfort/compact)
 * - Accessibility support
 * 
 * Requirements: 2.1, 2.5, 10.2, 10.3, 10.4
 */
const AppShell = ({ 
  children, 
  sidebarContent, 
  rightRailContent, 
  headerContent 
}) => {
  const { state, actions } = useDashboard();
  const [breakpoint, setBreakpoint] = useState('desktop');

  // Responsive breakpoint detection
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setBreakpoint('mobile');
      } else if (width <= 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Initial check
    updateBreakpoint();

    // Add resize listener
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (breakpoint === 'mobile' && !state.sidebarCollapsed) {
      actions.toggleSidebar();
    }
  }, [breakpoint, state.sidebarCollapsed, actions]);

  // Auto-hide right rail on mobile and tablet
  useEffect(() => {
    if ((breakpoint === 'mobile' || breakpoint === 'tablet') && state.rightRailVisible) {
      actions.toggleRightRail();
    } else if (breakpoint === 'desktop' && !state.rightRailVisible) {
      // Optionally restore right rail on desktop
      // actions.toggleRightRail();
    }
  }, [breakpoint, state.rightRailVisible, actions]);

  // Get density-based spacing classes
  const getDensityClasses = () => {
    return state.densityMode === 'compact' 
      ? 'gap-2 p-2' 
      : 'gap-4 p-4';
  };

  // Get accessibility classes
  const getAccessibilityClasses = () => {
    const baseClasses = 'transition-all duration-200';
    const contrastClasses = state.accessibilityMode === 'high-contrast'
      ? 'bg-white text-black border-black'
      : 'bg-lightpapyrus text-gray-900';
    const textSizeClasses = {
      'default': 'text-base',
      'large': 'text-lg',
      'extra-large': 'text-xl'
    }[state.textSize] || 'text-base';
    const motionClasses = state.reducedMotion ? '' : 'transition-all duration-200';

    return `${baseClasses} ${contrastClasses} ${textSizeClasses} ${motionClasses}`;
  };

  // Get sidebar width classes based on breakpoint and state
  const getSidebarClasses = () => {
    if (state.sidebarCollapsed) {
      return 'w-0 overflow-hidden';
    }

    switch (breakpoint) {
      case 'mobile':
        return 'fixed inset-y-0 left-0 z-50 w-64 transform translate-x-0';
      case 'tablet':
        return 'w-64';
      case 'desktop':
      default:
        return 'w-64';
    }
  };

  // Get right rail classes based on breakpoint and state
  const getRightRailClasses = () => {
    if (!state.rightRailVisible || breakpoint === 'mobile') {
      return 'w-0 overflow-hidden';
    }

    switch (breakpoint) {
      case 'tablet':
        return 'w-80';
      case 'desktop':
      default:
        return 'w-80';
    }
  };

  // Get main content classes based on layout
  const getMainContentClasses = () => {
    const baseClasses = 'flex-1 min-w-0 overflow-hidden';
    const densityClasses = getDensityClasses();
    
    return `${baseClasses} ${densityClasses}`;
  };

  // Mobile overlay for sidebar
  const renderMobileOverlay = () => {
    if (breakpoint !== 'mobile' || state.sidebarCollapsed) {
      return null;
    }

    return (
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={actions.toggleSidebar}
        aria-hidden="true"
      />
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${getAccessibilityClasses()}`}>
      {/* Header Bar - Fixed at top */}
      <header className="flex-shrink-0 z-30 border-b border-gray-200">
        {headerContent}
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Overlay */}
        {renderMobileOverlay()}

        {/* Left Sidebar */}
        <aside 
          className={`
            ${getSidebarClasses()}
            bg-white border-r border-gray-200 flex-shrink-0
            ${breakpoint === 'mobile' ? 'shadow-lg' : ''}
            ${state.accessibilityMode === 'high-contrast' ? 'border-black' : ''}
          `}
        >
          {sidebarContent}
        </aside>

        {/* Main Content Area */}
        <main className={getMainContentClasses()}>
          <div className="h-full overflow-auto">
            {children}
          </div>
        </main>

        {/* Right Rail */}
        <aside 
          className={`
            ${getRightRailClasses()}
            bg-white border-l border-gray-200 flex-shrink-0
            ${state.accessibilityMode === 'high-contrast' ? 'border-black' : ''}
          `}
        >
          {rightRailContent}
        </aside>
      </div>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default AppShell;