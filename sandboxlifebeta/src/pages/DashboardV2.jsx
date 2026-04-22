import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';
import { OverlayProvider } from '../contexts/OverlayContext';
import { AccessibilityProvider, useAccessibility } from '../contexts/AccessibilityContext';

// Components
import DashboardToggle from '../components/DashboardToggle';
import AppShell from '../components/AppShell';
import HeaderBarV2 from '../components/HeaderBarV2';
import SidebarNav from '../components/SidebarNav';
import SkipLinks from '../components/SkipLinks';
import FocusManager from '../components/FocusManager';

// Utilities
import { fetchTopUserRecords, fetchEntries } from '../utils/supabase';

/**
 * Dashboard v2 Main Component
 * Implements the new card-first dashboard with enhanced accessibility
 * and senior-friendly features while maintaining backward compatibility
 */
const DashboardV2Content = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { state, actions } = useDashboard();
  const { state: accessibilityState, utils: accessibilityUtils } = useAccessibility();
  
  // Local state for data management
  const [entries, setEntries] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [entryCounts, setEntryCounts] = useState({
    daily: 0,
    book: 0,
    thoughts: 0
  });

  // Handle initial data loading
  useEffect(() => {
    if (!userId) return;

    const loadDashboardData = async () => {
      actions.setLoading(true);
      actions.setError(null);

      try {
        // Load thought of the day
        const todayData = await fetchEntries(userId, 'thought_of_the_day', 1);
        if (todayData && todayData.length > 0) {
          setTodayEntry(todayData[0]);
          setEntryCounts(prev => ({ ...prev, thoughts: todayData.length }));
        }

        // Load recent entries
        const recentData = await fetchTopUserRecords(userId);
        if (recentData && recentData.success) {
          const formattedEntries = recentData.data.map((entry) => {
            const formattedDatetime = formatDatetime(entry.created_at);
            return {
              ...entry,
              date: formattedDatetime.date,
              time: formattedDatetime.time,
            };
          });
          
          setEntries(formattedEntries);
          
          // Count entries by type
          const dailyCount = formattedEntries.filter(entry => entry.journal_type === 'daily_journal').length;
          const bookCount = formattedEntries.filter(entry => entry.journal_type === 'book_journal').length;
          
          setEntryCounts(prev => ({
            ...prev,
            daily: dailyCount,
            book: bookCount
          }));

          // Update dashboard context with topics
          actions.setTopics(formattedEntries);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        actions.setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        actions.setLoading(false);
      }
    };

    loadDashboardData();
  }, [userId, actions]);

  // Handle transition animations from v1
  useEffect(() => {
    if (location.state?.fromVersion === 'v1') {
      toast.success('Welcome to Dashboard v2! 🎉', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }, [location.state]);

  // Format datetime utility (matching existing pattern)
  const formatDatetime = (datetimeStr) => {
    const date = new Date(datetimeStr);

    const formatDate = () => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}`;
    };

    const formatTime = () => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return {
      date: formatDate(),
      time: formatTime(),
    };
  };

  // Handle settings access
  const handleSettingsAccess = () => {
    toast.info('Settings panel coming soon!');
  };

  // Handle topic reordering
  const handleTopicReorder = (topicIds) => {
    // TODO: Implement topic reordering
    console.log('Reordering topics:', topicIds);
  };

  // Apply accessibility and density classes based on user preferences
  const getDashboardClasses = () => {
    const baseClasses = 'min-h-screen transition-all duration-200';
    const densityClasses = state.densityMode === 'compact' 
      ? 'text-sm leading-tight' 
      : 'text-base leading-relaxed';
    const accessibilityClasses = accessibilityState.highContrastMode
      ? 'bg-white text-black high-contrast'
      : 'bg-lightpapyrus text-gray-900';
    const textSizeClasses = {
      'default': '',
      'large': 'text-scale-large',
      'extra-large': 'text-scale-xl'
    }[accessibilityState.textSize] || '';
    const motionClasses = accessibilityState.reducedMotion ? 'reduce-motion' : '';
    const focusClasses = accessibilityState.focusVisible ? 'focus-visible' : '';
    const touchClasses = accessibilityState.largerTouchTargets ? 'large-touch-targets' : '';

    return `${baseClasses} ${densityClasses} ${accessibilityClasses} ${textSizeClasses} ${motionClasses} ${focusClasses} ${touchClasses}`;
  };

  // Render main dashboard content
  const renderMainContent = () => (
    <div className="h-full overflow-auto">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={() => accessibilityUtils.announce('Skip to main content link focused', 'polite')}
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="max-w-7xl mx-auto px-4 py-8" tabIndex="-1">
        {/* Dashboard Toggle - positioned in top right */}
        <div className="fixed top-4 right-4 z-50">
          <DashboardToggle currentVersion="v2" />
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard v2
              </h1>
              <p className="text-gray-600">
                Welcome to your enhanced journaling experience
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="text-center">
                <div className="font-semibold text-lg text-blue-600">{entryCounts.daily}</div>
                <div>Daily</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-orange-600">{entryCounts.book}</div>
                <div>Book</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-green-600">{entryCounts.thoughts}</div>
                <div>Thoughts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {state.isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your dashboard...</span>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-600 font-medium">Error:</div>
              <div className="ml-2 text-red-700">{state.error}</div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!state.isLoading && !state.error && (
          <div className="space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {todayEntry ? '1' : '0'}
                  </div>
                  <div className="text-sm text-gray-600">Today's Entries</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {entries.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {state.currentView === 'focus-mode' ? 'Focus' : 'Card'}
                  </div>
                  <div className="text-sm text-gray-600">Current View</div>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
              {entries.length > 0 ? (
                <div className="space-y-3">
                  {entries.slice(0, 5).map((entry, index) => (
                    <div key={entry.id || index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={entry.journal_icon} 
                        alt={entry.journal_meaning}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{entry.journal_meaning}</div>
                        <div className="text-sm text-gray-600">
                          {entry.date} at {entry.time}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {entry.journal_type.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No entries yet. Start your journaling journey!</p>
                </div>
              )}
            </div>

            {/* App Shell Integration Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-blue-600 font-medium">App Shell Architecture</div>
              </div>
              <div className="mt-2 text-blue-700 text-sm">
                This dashboard now uses the new App Shell architecture with HeaderBarV2, SidebarNav, 
                and responsive layout management. The shell provides consistent navigation, 
                accessibility features, and responsive behavior across all breakpoints.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render sidebar content
  const renderSidebarContent = () => (
    <SidebarNav
      isCollapsed={state.sidebarCollapsed}
      pinnedTopics={state.pinnedTopics}
      onTopicReorder={handleTopicReorder}
      onSettingsAccess={handleSettingsAccess}
    />
  );

  // Render right rail content (placeholder for now)
  const renderRightRailContent = () => (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Next Up
        </h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900">Continue Daily Reflection</div>
            <div className="text-xs text-gray-500">2 min ago</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900">Review Book Chapter</div>
            <div className="text-xs text-gray-500">1 hour ago</div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Recent Activity
        </h3>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Created</span> new daily entry
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Updated</span> book chapter
          </div>
        </div>
      </div>
    </div>
  );

  // Render header content
  const renderHeaderContent = () => (
    <HeaderBarV2 onToggleMenu={actions.toggleSidebar} />
  );

  return (
    <div className={getDashboardClasses()}>
      {/* Skip Links for keyboard navigation */}
      <SkipLinks 
        links={[
          { href: '#main-content', label: 'Skip to main content' },
          { href: '#navigation', label: 'Skip to navigation' },
          { href: '#search', label: 'Skip to search' }
        ]}
      />
      
      <FocusManager>
        <AppShell
          headerContent={renderHeaderContent()}
          sidebarContent={renderSidebarContent()}
          rightRailContent={state.rightRailVisible ? renderRightRailContent() : null}
        >
          {renderMainContent()}
        </AppShell>
      </FocusManager>

      <ToastContainer />
    </div>
  );
};

/**
 * Dashboard v2 Main Wrapper
 * Provides all necessary context providers
 */
const DashboardV2 = () => {
  return (
    <AccessibilityProvider>
      <OverlayProvider>
        <DashboardProvider>
          <DashboardV2Content />
        </DashboardProvider>
      </OverlayProvider>
    </AccessibilityProvider>
  );
};

export default DashboardV2;