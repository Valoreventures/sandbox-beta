import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

/**
 * Hook to handle automatic redirection to user's preferred dashboard version
 * This ensures users land on their preferred dashboard version when accessing
 * dashboard routes directly or through navigation
 */
export const useDashboardRedirect = (options = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const { 
    enableAutoRedirect = true, 
    skipInitialRedirect = false 
  } = options;

  useEffect(() => {
    if (!enableAutoRedirect || !userId || skipInitialRedirect) return;

    const preferredVersion = localStorage.getItem('preferred_dashboard_version') || 'v1';
    const currentPath = location.pathname;
    
    // Check if we're on a dashboard route
    const isOnV1Dashboard = currentPath.includes('/home/');
    const isOnV2Dashboard = currentPath.includes('/dashboard-v2/');
    
    // Only redirect if we're on a dashboard route and it doesn't match preference
    if (isOnV1Dashboard || isOnV2Dashboard) {
      let shouldRedirect = false;
      let targetPath = null;

      if (preferredVersion === 'v2' && isOnV1Dashboard) {
        shouldRedirect = true;
        targetPath = `/dashboard-v2/${userId}`;
      } else if (preferredVersion === 'v1' && isOnV2Dashboard) {
        shouldRedirect = true;
        targetPath = `/home/${userId}`;
      }

      if (shouldRedirect && targetPath) {
        // Use replace to avoid adding to history stack
        navigate(targetPath, { 
          replace: true,
          state: { 
            autoRedirect: true,
            fromPath: currentPath 
          }
        });
      }
    }
  }, [navigate, location.pathname, userId, enableAutoRedirect, skipInitialRedirect]);

  // Return utility functions for manual version switching
  const switchToV1 = () => {
    if (userId) {
      localStorage.setItem('preferred_dashboard_version', 'v1');
      navigate(`/home/${userId}`, { 
        replace: true,
        state: { manualSwitch: true, fromVersion: 'v2' }
      });
    }
  };

  const switchToV2 = () => {
    if (userId) {
      localStorage.setItem('preferred_dashboard_version', 'v2');
      navigate(`/dashboard-v2/${userId}`, { 
        replace: true,
        state: { manualSwitch: true, fromVersion: 'v1' }
      });
    }
  };

  const getCurrentVersion = () => {
    const currentPath = location.pathname;
    if (currentPath.includes('/dashboard-v2/')) return 'v2';
    if (currentPath.includes('/home/')) return 'v1';
    return null;
  };

  const getPreferredVersion = () => {
    return localStorage.getItem('preferred_dashboard_version') || 'v1';
  };

  return {
    switchToV1,
    switchToV2,
    getCurrentVersion,
    getPreferredVersion,
    currentVersion: getCurrentVersion(),
    preferredVersion: getPreferredVersion()
  };
};

/**
 * Utility function to get dashboard version info without the hook
 * Useful for components that need version info but don't need redirect functionality
 */
export const getDashboardVersionInfo = () => {
  const preferredVersion = localStorage.getItem('preferred_dashboard_version') || 'v1';
  
  return {
    preferredVersion,
    isV2Preferred: preferredVersion === 'v2',
    setPreferredVersion: (version) => {
      localStorage.setItem('preferred_dashboard_version', version);
    }
  };
};

export default useDashboardRedirect;