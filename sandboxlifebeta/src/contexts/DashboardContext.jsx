import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Dashboard v2 Context for state management
const DashboardContext = createContext();

// Initial state for Dashboard v2
const initialState = {
  // View State
  currentView: 'card-deck', // 'card-deck' | 'focus-mode'
  densityMode: 'comfort', // 'comfort' | 'compact'
  sidebarCollapsed: false,
  rightRailVisible: true,
  
  // Content State
  topics: [],
  pinnedTopics: [],
  recentActivity: [],
  nextUpItems: [],
  
  // Filter/Search State
  activeFilters: [],
  searchQuery: '',
  sortOrder: 'last-updated', // 'last-updated' | 'pinned' | 'alphabetical'
  
  // User Preferences
  defaultLanding: 'dashboard', // 'dashboard' | 'focus-mode' | 'last-opened'
  accessibilityMode: 'standard', // 'standard' | 'high-contrast'
  textSize: 'default', // 'default' | 'large' | 'extra-large'
  reducedMotion: false,
  
  // Loading States
  isLoading: false,
  error: null
};

// Action types
const DASHBOARD_ACTIONS = {
  SET_VIEW: 'SET_VIEW',
  SET_DENSITY_MODE: 'SET_DENSITY_MODE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_RIGHT_RAIL: 'TOGGLE_RIGHT_RAIL',
  SET_TOPICS: 'SET_TOPICS',
  SET_PINNED_TOPICS: 'SET_PINNED_TOPICS',
  SET_RECENT_ACTIVITY: 'SET_RECENT_ACTIVITY',
  SET_NEXT_UP_ITEMS: 'SET_NEXT_UP_ITEMS',
  SET_ACTIVE_FILTERS: 'SET_ACTIVE_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SORT_ORDER: 'SET_SORT_ORDER',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case DASHBOARD_ACTIONS.SET_VIEW:
      return { ...state, currentView: action.payload };
    
    case DASHBOARD_ACTIONS.SET_DENSITY_MODE:
      return { ...state, densityMode: action.payload };
    
    case DASHBOARD_ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    
    case DASHBOARD_ACTIONS.TOGGLE_RIGHT_RAIL:
      return { ...state, rightRailVisible: !state.rightRailVisible };
    
    case DASHBOARD_ACTIONS.SET_TOPICS:
      return { ...state, topics: action.payload };
    
    case DASHBOARD_ACTIONS.SET_PINNED_TOPICS:
      return { ...state, pinnedTopics: action.payload };
    
    case DASHBOARD_ACTIONS.SET_RECENT_ACTIVITY:
      return { ...state, recentActivity: action.payload };
    
    case DASHBOARD_ACTIONS.SET_NEXT_UP_ITEMS:
      return { ...state, nextUpItems: action.payload };
    
    case DASHBOARD_ACTIONS.SET_ACTIVE_FILTERS:
      return { ...state, activeFilters: action.payload };
    
    case DASHBOARD_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case DASHBOARD_ACTIONS.SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    
    case DASHBOARD_ACTIONS.SET_USER_PREFERENCES:
      return { 
        ...state, 
        defaultLanding: action.payload.defaultLanding || state.defaultLanding,
        accessibilityMode: action.payload.accessibilityMode || state.accessibilityMode,
        textSize: action.payload.textSize || state.textSize,
        reducedMotion: action.payload.reducedMotion !== undefined ? action.payload.reducedMotion : state.reducedMotion
      };
    
    case DASHBOARD_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case DASHBOARD_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case DASHBOARD_ACTIONS.RESET_STATE:
      return { ...initialState };
    
    default:
      return state;
  }
};

// Dashboard Context Provider
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('dashboard_v2_preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({
          type: DASHBOARD_ACTIONS.SET_USER_PREFERENCES,
          payload: preferences
        });
        
        // Apply view and density preferences
        if (preferences.currentView) {
          dispatch({
            type: DASHBOARD_ACTIONS.SET_VIEW,
            payload: preferences.currentView
          });
        }
        
        if (preferences.densityMode) {
          dispatch({
            type: DASHBOARD_ACTIONS.SET_DENSITY_MODE,
            payload: preferences.densityMode
          });
        }
        
        if (preferences.sidebarCollapsed !== undefined) {
          if (preferences.sidebarCollapsed !== state.sidebarCollapsed) {
            dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_SIDEBAR });
          }
        }
        
        if (preferences.rightRailVisible !== undefined) {
          if (preferences.rightRailVisible !== state.rightRailVisible) {
            dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_RIGHT_RAIL });
          }
        }
      } catch (error) {
        console.error('Error loading dashboard preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    const preferences = {
      currentView: state.currentView,
      densityMode: state.densityMode,
      sidebarCollapsed: state.sidebarCollapsed,
      rightRailVisible: state.rightRailVisible,
      defaultLanding: state.defaultLanding,
      accessibilityMode: state.accessibilityMode,
      textSize: state.textSize,
      reducedMotion: state.reducedMotion
    };
    
    localStorage.setItem('dashboard_v2_preferences', JSON.stringify(preferences));
  }, [
    state.currentView,
    state.densityMode,
    state.sidebarCollapsed,
    state.rightRailVisible,
    state.defaultLanding,
    state.accessibilityMode,
    state.textSize,
    state.reducedMotion
  ]);

  // Action creators
  const actions = {
    setView: (view) => dispatch({ type: DASHBOARD_ACTIONS.SET_VIEW, payload: view }),
    setDensityMode: (mode) => dispatch({ type: DASHBOARD_ACTIONS.SET_DENSITY_MODE, payload: mode }),
    toggleSidebar: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_SIDEBAR }),
    toggleRightRail: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_RIGHT_RAIL }),
    setTopics: (topics) => dispatch({ type: DASHBOARD_ACTIONS.SET_TOPICS, payload: topics }),
    setPinnedTopics: (topics) => dispatch({ type: DASHBOARD_ACTIONS.SET_PINNED_TOPICS, payload: topics }),
    setRecentActivity: (activity) => dispatch({ type: DASHBOARD_ACTIONS.SET_RECENT_ACTIVITY, payload: activity }),
    setNextUpItems: (items) => dispatch({ type: DASHBOARD_ACTIONS.SET_NEXT_UP_ITEMS, payload: items }),
    setActiveFilters: (filters) => dispatch({ type: DASHBOARD_ACTIONS.SET_ACTIVE_FILTERS, payload: filters }),
    setSearchQuery: (query) => dispatch({ type: DASHBOARD_ACTIONS.SET_SEARCH_QUERY, payload: query }),
    setSortOrder: (order) => dispatch({ type: DASHBOARD_ACTIONS.SET_SORT_ORDER, payload: order }),
    setUserPreferences: (preferences) => dispatch({ type: DASHBOARD_ACTIONS.SET_USER_PREFERENCES, payload: preferences }),
    setLoading: (loading) => dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: DASHBOARD_ACTIONS.SET_ERROR, payload: error }),
    resetState: () => dispatch({ type: DASHBOARD_ACTIONS.RESET_STATE })
  };

  const value = {
    state,
    actions,
    DASHBOARD_ACTIONS
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use Dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Export action types for external use
export { DASHBOARD_ACTIONS };