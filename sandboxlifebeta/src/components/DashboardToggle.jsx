import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SparklesIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * Dashboard Version Toggle Component
 * Provides switching between Dashboard v1 (current) and Dashboard v2
 * Maintains user context and preferences during version switches
 */
const DashboardToggle = ({ currentVersion = 'v1', className = '' }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get user's preferred dashboard version from localStorage
  const [preferredVersion, setPreferredVersion] = useState(() => {
    return localStorage.getItem('preferred_dashboard_version') || 'v1';
  });

  // Save version preference when it changes
  useEffect(() => {
    localStorage.setItem('preferred_dashboard_version', preferredVersion);
  }, [preferredVersion]);

  const handleVersionSwitch = async (targetVersion) => {
    if (isTransitioning || targetVersion === currentVersion) return;

    setIsTransitioning(true);
    setPreferredVersion(targetVersion);

    try {
      // Add smooth transition delay
      await new Promise(resolve => setTimeout(resolve, 150));

      if (targetVersion === 'v2') {
        // Navigate to Dashboard v2
        navigate(`/dashboard-v2/${userId}`, { 
          replace: true,
          state: { fromVersion: 'v1' }
        });
      } else {
        // Navigate back to Dashboard v1 (Home)
        navigate(`/home/${userId}`, { 
          replace: true,
          state: { fromVersion: 'v2' }
        });
      }
    } catch (error) {
      console.error('Error switching dashboard version:', error);
      setIsTransitioning(false);
    }
  };

  // Render "Try New Dashboard" button for v1
  if (currentVersion === 'v1') {
    return (
      <div className={`dashboard-toggle-v1 ${className}`}>
        <button
          onClick={() => handleVersionSwitch('v2')}
          disabled={isTransitioning}
          className={`
            inline-flex items-center space-x-2 px-4 py-2 
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-blue-600 hover:to-purple-700
            text-white font-medium rounded-lg
            transition-all duration-200 ease-in-out
            transform hover:scale-105 hover:shadow-card-hover
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:transform-none disabled:shadow-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
        >
          <SparklesIcon className="h-5 w-5" />
          <span>
            {isTransitioning ? 'Switching...' : 'Try New Dashboard'}
          </span>
        </button>
        
        {/* Optional description with 8pt spacing */}
        <p className="text-sm text-gray-600 mt-3 max-w-xs">
          Experience our enhanced card-first interface with improved accessibility and focus mode.
        </p>
      </div>
    );
  }

  // Render "Back to Classic" button for v2
  if (currentVersion === 'v2') {
    return (
      <div className={`dashboard-toggle-v2 ${className}`}>
        <button
          onClick={() => handleVersionSwitch('v1')}
          disabled={isTransitioning}
          className={`
            inline-flex items-center space-x-2 px-4 py-2
            bg-white border border-gray-300 
            hover:bg-gray-50 hover:border-gray-400
            text-gray-700 font-medium rounded-lg
            transition-all duration-200 ease-in-out
            transform hover:scale-105 hover:shadow-card
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:transform-none disabled:shadow-none
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
          `}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>
            {isTransitioning ? 'Switching...' : 'Back to Classic'}
          </span>
        </button>
        
        {/* Optional description with 8pt spacing */}
        <p className="text-sm text-gray-600 mt-3 max-w-xs">
          Return to the familiar dashboard interface.
        </p>
      </div>
    );
  }

  return null;
};

/**
 * Hook to get and set dashboard version preference
 * Useful for components that need to know the user's preferred version
 */
export const useDashboardVersion = () => {
  const [version, setVersion] = useState(() => {
    return localStorage.getItem('preferred_dashboard_version') || 'v1';
  });

  const setPreferredVersion = (newVersion) => {
    setVersion(newVersion);
    localStorage.setItem('preferred_dashboard_version', newVersion);
  };

  return {
    preferredVersion: version,
    setPreferredVersion,
    isV2Preferred: version === 'v2'
  };
};

/**
 * Utility function to check if user should be redirected to their preferred dashboard
 * Can be used in route guards or initial page loads
 */
export const shouldRedirectToDashboardVersion = (currentPath, userId) => {
  const preferredVersion = localStorage.getItem('preferred_dashboard_version') || 'v1';
  
  const isOnV1 = currentPath.includes('/home/');
  const isOnV2 = currentPath.includes('/dashboard-v2/');
  
  if (preferredVersion === 'v2' && isOnV1) {
    return `/dashboard-v2/${userId}`;
  }
  
  if (preferredVersion === 'v1' && isOnV2) {
    return `/home/${userId}`;
  }
  
  return null;
};

export default DashboardToggle;