import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  StarIcon,
  FunnelIcon,
  Cog6ToothIcon,
  EyeIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  CalendarDaysIcon as CalendarDaysSolid,
  BookOpenIcon as BookOpenSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextSolid,
  SparklesIcon as SparklesSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import { useDashboard } from '../contexts/DashboardContext';
import { useKeyboardNavigation, useArrowNavigation } from '../hooks/useKeyboardNavigation';
import { FocusIndicator } from './FocusManager';

/**
 * SidebarNav Component
 * 
 * Enhanced sidebar navigation for Dashboard v2 with:
 * - Collections switcher integration
 * - Pinned topics section
 * - Filter chips for Daily/Weekly/Book/Status
 * - Settings and accessibility access
 * 
 * Requirements: 2.2, 6.5, 7.2, 7.3
 */
const SidebarNav = ({ 
  isCollapsed, 
  pinnedTopics = [], 
  onTopicReorder, 
  onSettingsAccess 
}) => {
  const { userId } = useParams();
  const location = useLocation();
  const { state, actions } = useDashboard();
  
  const [showPinnedMenu, setShowPinnedMenu] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  // Keyboard navigation for menu items
  useKeyboardNavigation({
    onEscape: () => {
      if (showPinnedMenu) setShowPinnedMenu(false);
      if (showAccessibilityMenu) setShowAccessibilityMenu(false);
    },
    enabled: showPinnedMenu || showAccessibilityMenu
  });

  // Navigation items configuration
  const navigationItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      iconSolid: HomeSolid,
      path: `/dashboard-v2/${userId}`,
      color: 'text-blue-600',
      activeColor: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      key: 'daily',
      label: 'Daily Journal',
      icon: CalendarDaysIcon,
      iconSolid: CalendarDaysSolid,
      path: `/dailyjournal/${userId}`,
      color: 'text-green-600',
      activeColor: 'bg-green-50 border-green-200 text-green-700',
      count: state.topics.filter(t => t.journal_type === 'daily_journal').length,
    },
    {
      key: 'book',
      label: 'Book Journey',
      icon: BookOpenIcon,
      iconSolid: BookOpenSolid,
      path: `/bookjourney/${userId}`,
      color: 'text-orange-600',
      activeColor: 'bg-orange-50 border-orange-200 text-orange-700',
      count: state.topics.filter(t => t.journal_type === 'book_journal').length,
    },
    {
      key: 'thoughts',
      label: 'Thoughts',
      icon: ChatBubbleBottomCenterTextIcon,
      iconSolid: ChatBubbleBottomCenterTextSolid,
      path: `/thoughtoftheday/${userId}`,
      color: 'text-purple-600',
      activeColor: 'bg-purple-50 border-purple-200 text-purple-700',
      count: state.topics.filter(t => t.journal_type === 'thought_of_the_day').length,
    },
    {
      key: 'library',
      label: 'Library',
      icon: SparklesIcon,
      iconSolid: SparklesSolid,
      path: `/library/${userId}`,
      color: 'text-indigo-600',
      activeColor: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    },
  ];

  // Filter options
  const filterOptions = [
    { 
      key: 'daily', 
      label: 'Daily', 
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CalendarDaysIcon,
    },
    { 
      key: 'weekly', 
      label: 'Weekly', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: CalendarDaysIcon,
    },
    { 
      key: 'book', 
      label: 'Book', 
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: BookOpenIcon,
    },
    { 
      key: 'status', 
      label: 'Status', 
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: ChatBubbleBottomCenterTextIcon,
    },
  ];

  // Get current active item
  const getCurrentActiveItem = () => {
    const currentPath = location.pathname;
    return navigationItems.find(item => currentPath.includes(item.key)) || navigationItems[0];
  };

  // Toggle filter
  const toggleFilter = (filterKey) => {
    const currentFilters = state.activeFilters;
    const newFilters = currentFilters.includes(filterKey)
      ? currentFilters.filter(f => f !== filterKey)
      : [...currentFilters, filterKey];
    
    actions.setActiveFilters(newFilters);
  };

  // Handle accessibility settings
  const handleAccessibilityToggle = (setting, value) => {
    const preferences = {
      [setting]: value
    };
    actions.setUserPreferences(preferences);
  };

  // Get accessibility classes
  const getAccessibilityClasses = () => {
    const baseClasses = 'transition-colors duration-200';
    const contrastClasses = state.accessibilityMode === 'high-contrast'
      ? 'bg-white border-black text-black'
      : 'bg-white border-gray-200 text-gray-900';
    
    return `${baseClasses} ${contrastClasses}`;
  };

  // Render navigation item
  const NavItem = ({ item, isActive }) => {
    const IconComponent = isActive ? item.iconSolid : item.icon;
    
    return (
      <FocusIndicator variant="default" shape="rounded">
        <Link
          to={item.path}
          className={`
            flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isActive 
              ? `${item.activeColor} border` 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? item.label : undefined}
          aria-label={`${item.label}${item.count ? ` (${item.count} entries)` : ''}`}
          aria-current={isActive ? 'page' : undefined}
        >
          <IconComponent 
            className={`w-5 h-5 ${isActive ? '' : item.color} ${isCollapsed ? '' : 'mr-3'}`}
            aria-hidden="true"
          />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.count > 0 && (
                <span 
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    isActive 
                      ? 'bg-white bg-opacity-70' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  aria-label={`${item.count} entries`}
                >
                  {item.count}
                </span>
              )}
            </>
          )}
        </Link>
      </FocusIndicator>
    );
  };

  // Render filter chip
  const FilterChip = ({ filter }) => {
    const isActive = state.activeFilters.includes(filter.key);
    const IconComponent = filter.icon;
    
    return (
      <FocusIndicator variant="subtle" shape="pill">
        <button
          onClick={() => toggleFilter(filter.key)}
          className={`
            flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${isActive 
              ? filter.color 
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }
            ${isCollapsed ? 'justify-center w-8 h-8' : ''}
          `}
          title={isCollapsed ? filter.label : undefined}
          aria-label={`Filter by ${filter.label}`}
          aria-pressed={isActive}
        >
          <IconComponent className={`w-3 h-3 ${isCollapsed ? '' : 'mr-1'}`} aria-hidden="true" />
          {!isCollapsed && filter.label}
        </button>
      </FocusIndicator>
    );
  };

  if (isCollapsed) {
    return (
      <div className={`h-full flex flex-col ${getAccessibilityClasses()}`}>
        {/* Collapsed Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              isActive={getCurrentActiveItem().key === item.key}
            />
          ))}
        </nav>

        {/* Collapsed Filters */}
        <div className="px-2 py-2 border-t border-gray-200">
          <div className="space-y-1">
            {filterOptions.map((filter) => (
              <FilterChip key={filter.key} filter={filter} />
            ))}
          </div>
        </div>

        {/* Collapsed Settings */}
        <div className="px-2 py-2 border-t border-gray-200">
          <FocusIndicator variant="default" shape="rounded">
            <button
              onClick={onSettingsAccess}
              className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Settings"
              aria-label="Open settings"
            >
              <Cog6ToothIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </FocusIndicator>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${getAccessibilityClasses()}`}>
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Main navigation">
        <div className="mb-6">
          <h2 
            className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
            id="collections-heading"
          >
            Collections
          </h2>
          <div role="list" aria-labelledby="collections-heading">
            {navigationItems.map((item) => (
              <div key={item.key} role="listitem">
                <NavItem
                  item={item}
                  isActive={getCurrentActiveItem().key === item.key}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Topics Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center">
              <StarIcon className="w-3 h-3 mr-1" />
              Pinned Topics
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowPinnedMenu(!showPinnedMenu)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <EllipsisVerticalIcon className="w-4 h-4" />
              </button>
              
              {showPinnedMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <PlusIcon className="w-4 h-4 inline mr-2" />
                    Pin Topic
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Manage Pinned
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {pinnedTopics.length > 0 ? (
            <div className="space-y-1">
              {pinnedTopics.map((topic, index) => (
                <div
                  key={topic.id || index}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <StarSolid className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="flex-1 truncate">{topic.name || topic.journal_meaning}</span>
                  <span className="text-xs text-gray-500">{topic.count || 0}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic px-3 py-2">
              No pinned topics yet
            </div>
          )}
        </div>

        {/* Filter Chips Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center">
              <FunnelIcon className="w-3 h-3 mr-1" />
              Filters
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <FilterChip key={filter.key} filter={filter} />
            ))}
          </div>
          
          {state.activeFilters.length > 0 && (
            <button
              onClick={() => actions.setActiveFilters([])}
              className="text-xs text-gray-500 hover:text-gray-700 mt-2 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </nav>

      {/* Settings and Accessibility */}
      <div className="border-t border-gray-200 px-4 py-4 space-y-3">
        {/* Accessibility Quick Controls */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              Accessibility
            </h3>
            <button
              onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
            </button>
          </div>
          
          {showAccessibilityMenu && (
            <div className="space-y-2 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">High Contrast</span>
                <button
                  onClick={() => handleAccessibilityToggle('accessibilityMode', 
                    state.accessibilityMode === 'high-contrast' ? 'standard' : 'high-contrast'
                  )}
                  className={`w-8 h-4 rounded-full transition-colors ${
                    state.accessibilityMode === 'high-contrast' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    state.accessibilityMode === 'high-contrast' 
                      ? 'translate-x-4' 
                      : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Reduced Motion</span>
                <button
                  onClick={() => handleAccessibilityToggle('reducedMotion', !state.reducedMotion)}
                  className={`w-8 h-4 rounded-full transition-colors ${
                    state.reducedMotion ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    state.reducedMotion ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Text Size</span>
                <select
                  value={state.textSize}
                  onChange={(e) => handleAccessibilityToggle('textSize', e.target.value)}
                  className="text-xs border border-gray-300 rounded px-1 py-0.5"
                >
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <FocusIndicator variant="default" shape="rounded">
          <button
            onClick={onSettingsAccess}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Open settings"
          >
            <Cog6ToothIcon className="w-5 h-5 mr-3" aria-hidden="true" />
            Settings
          </button>
        </FocusIndicator>
      </div>
    </div>
  );
};

export default SidebarNav;