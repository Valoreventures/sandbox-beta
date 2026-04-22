import React, { createContext, useContext, useState, useCallback } from 'react';

const OverlayContext = createContext();

/**
 * Global overlay context for managing multiple overlays
 * Handles overlay stacking, conflicts, and cleanup
 */
export const OverlayProvider = ({ children }) => {
  const [activeOverlays, setActiveOverlays] = useState(new Set());
  
  const registerOverlay = useCallback((id) => {
    setActiveOverlays(prev => new Set([...prev, id]));
  }, []);
  
  const unregisterOverlay = useCallback((id) => {
    setActiveOverlays(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);
  
  const hasActiveOverlays = activeOverlays.size > 0;
  
  const getOverlayZIndex = useCallback((id) => {
    const overlayArray = Array.from(activeOverlays);
    const index = overlayArray.indexOf(id);
    if (index === -1) return 1050; // Default modal z-index
    
    // Each subsequent overlay gets a higher z-index
    return 1050 + (index * 10);
  }, [activeOverlays]);
  
  const value = {
    registerOverlay,
    unregisterOverlay,
    hasActiveOverlays,
    activeOverlays,
    getOverlayZIndex
  };
  
  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
};

/**
 * Hook to use the overlay context
 * @returns {object} Overlay context methods and state
 */
export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlayContext must be used within an OverlayProvider');
  }
  return context;
};

/**
 * Hook for managing individual overlay registration
 * Automatically registers/unregisters overlay on mount/unmount
 * 
 * @param {string} overlayId - Unique identifier for the overlay
 * @param {boolean} isOpen - Whether the overlay is currently open
 * @returns {number} The calculated z-index for this overlay
 */
export const useOverlayRegistration = (overlayId, isOpen) => {
  const { registerOverlay, unregisterOverlay, getOverlayZIndex } = useOverlayContext();
  
  React.useEffect(() => {
    if (isOpen) {
      registerOverlay(overlayId);
      return () => unregisterOverlay(overlayId);
    }
  }, [isOpen, overlayId, registerOverlay, unregisterOverlay]);
  
  return getOverlayZIndex(overlayId);
};