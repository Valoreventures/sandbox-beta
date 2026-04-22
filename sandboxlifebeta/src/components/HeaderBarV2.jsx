import React, { useState, useEffect } from "react";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon,
  BookOpenIcon,
  CalendarIcon,
  LightBulbIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";
import sandboxlife from "../assets/sandboxlife.png";
import Backdrop from "./Backdrop";
import { useOverlay } from "../hooks/useOverlay";
import { useDashboard } from "../contexts/DashboardContext";
import AccessibilityControls from "./AccessibilityControls";
import { useAccessibility } from "../contexts/AccessibilityContext";
import { useKeyboardNavigation, useEscapeKey } from "../hooks/useKeyboardNavigation";

/**
 * HeaderBarV2 Component
 * 
 * Enhanced header for Dashboard v2 with:
 * - Brand and breadcrumb navigation
 * - Global search with filter tokens
 * - Split "New" button with dropdown
 * - Integration with dashboard context
 * 
 * Requirements: 2.1, 7.1, 7.2
 */
const HeaderBarV2 = ({ onToggleMenu }) => {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const { state, actions } = useDashboard();
  const { state: accessibilityState } = useAccessibility();
  
  const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Use overlay hook for dropdown management
  useOverlay(isNewDropdownOpen, () => setIsNewDropdownOpen(false), {
    preventBodyScroll: false,
    closeOnEscape: true
  });

  // Handle ESC key to close dropdown
  useEscapeKey(() => {
    if (isNewDropdownOpen) {
      setIsNewDropdownOpen(false);
    }
  }, isNewDropdownOpen);

  // Generate breadcrumb navigation based on current route
  const getBreadcrumb = () => {
    const path = pathname.split("/").filter(Boolean);
    
    if (path.includes("dashboard-v2")) return ["Dashboard v2"];
    if (path.includes("library")) return ["Dashboard", "Library"];
    if (path.includes("setb-preview")) return ["Dashboard", "Library", "Set B Preview"];
    if (path.includes("my-calendar")) return ["Dashboard", "Calendar"];
    if (path.includes("my-book")) return ["Dashboard", "My Book"];
    if (path.includes("dailyjournal")) return ["Dashboard", "Daily Journal"];
    if (path.includes("bookjourney")) return ["Dashboard", "Book Journey"];
    if (path.includes("thoughtoftheday")) return ["Dashboard", "Thought of the Day"];
    
    return ["Dashboard"];
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    actions.setSearchQuery(query);
    
    // TODO: Implement actual search functionality
    // For now, just simulate search results
    if (query.length > 2) {
      setSearchResults([
        { id: 1, title: "Daily Reflection", type: "daily", date: "Today" },
        { id: 2, title: "Book Chapter", type: "book", date: "Yesterday" },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  // Toggle filter functionality
  const toggleFilter = (filter) => {
    const currentFilters = state.activeFilters;
    const newFilters = currentFilters.includes(filter)
      ? currentFilters.filter(f => f !== filter)
      : [...currentFilters, filter];
    
    actions.setActiveFilters(newFilters);
  };

  // Remove specific filter
  const removeFilter = (filter) => {
    const newFilters = state.activeFilters.filter(f => f !== filter);
    actions.setActiveFilters(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    actions.setActiveFilters([]);
  };

  // New menu items configuration
  const newMenuItems = [
    {
      icon: BookOpenIcon,
      label: "Book Entry",
      description: "Deep reflection journey",
      path: `/bookjourney/${userId}`,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: CalendarIcon,
      label: "Daily Entry",
      description: "Quick daily reflection",
      path: `/dailyjournal/${userId}`,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: LightBulbIcon,
      label: "Status Update",
      description: "Share your thoughts",
      path: `/thoughtoftheday/${userId}`,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: SparklesIcon,
      label: "Collection",
      description: "Create new collection",
      path: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      disabled: true
    }
  ];

  // Filter options configuration
  const filterOptions = [
    { 
      key: "daily", 
      label: "Daily", 
      color: "bg-green-100 text-green-800 border-green-200",
      hoverColor: "hover:bg-green-50"
    },
    { 
      key: "weekly", 
      label: "Weekly", 
      color: "bg-blue-100 text-blue-800 border-blue-200",
      hoverColor: "hover:bg-blue-50"
    },
    { 
      key: "book", 
      label: "Book", 
      color: "bg-orange-100 text-orange-800 border-orange-200",
      hoverColor: "hover:bg-orange-50"
    },
    { 
      key: "status", 
      label: "Status", 
      color: "bg-purple-100 text-purple-800 border-purple-200",
      hoverColor: "hover:bg-purple-50"
    }
  ];

  // Get accessibility classes
  const getAccessibilityClasses = () => {
    const baseClasses = "transition-colors duration-200";
    const contrastClasses = accessibilityState.highContrastMode
      ? 'bg-white border-black text-black'
      : 'bg-white border-gray-200 text-gray-900';
    
    return `${baseClasses} ${contrastClasses}`;
  };

  return (
    <header 
      className={`border-b sticky top-0 z-50 ${getAccessibilityClasses()}`}
      role="banner"
      id="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand + Breadcrumb */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <Bars4Icon className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <Link to={`/dashboard-v2/${userId}`} className="flex items-center">
                <img
                  src={sandboxlife}
                  alt="SandboxLife"
                  className="h-8 w-auto"
                />
              </Link>
              
              <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                {getBreadcrumb().map((crumb, index) => (
                  <React.Fragment key={crumb}>
                    {index > 0 && <span className="text-gray-300">/</span>}
                    <span 
                      className={
                        index === getBreadcrumb().length - 1 
                          ? "text-gray-900 font-medium" 
                          : "hover:text-gray-700 cursor-pointer"
                      }
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </div>

          {/* Center: Search with Filters */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative" id="search">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search entries, collections, topics..."
                  value={state.searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  aria-label="Search entries, collections, and topics"
                  role="searchbox"
                  aria-expanded={isSearchFocused && searchResults.length > 0}
                  aria-haspopup="listbox"
                  className={`
                    block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 
                    placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${accessibilityState.highContrastMode 
                      ? 'bg-white border-black text-black' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                  `}
                />
              </div>

              {/* Search Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                  role="listbox"
                  aria-label="Search results"
                >
                  {searchResults.map((result, index) => (
                    <div
                      key={result.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
                      role="option"
                      tabIndex={0}
                      aria-selected={false}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          // Handle selection
                        }
                      }}
                    >
                      <div className="font-medium text-gray-900">{result.title}</div>
                      <div className="text-sm text-gray-500">{result.type} • {result.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Filters Display */}
              {state.activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {state.activeFilters.map(filter => {
                    const filterOption = filterOptions.find(f => f.key === filter);
                    return (
                      <span
                        key={filter}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${filterOption?.color}`}
                      >
                        {filterOption?.label}
                        <button
                          onClick={() => removeFilter(filter)}
                          className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 focus:outline-none"
                          aria-label={`Remove ${filterOption?.label} filter`}
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline focus:outline-none"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Quick Filter Buttons */}
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-500">Filters:</span>
              {filterOptions.map(filter => (
                <button
                  key={filter.key}
                  onClick={() => toggleFilter(filter.key)}
                  className={`px-2 py-1 text-xs rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    state.activeFilters.includes(filter.key)
                      ? filter.color
                      : `border-gray-300 text-gray-600 ${filter.hoverColor}`
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Accessibility Controls + Split New Button */}
          <div className="flex items-center space-x-3">
            {/* Accessibility Controls */}
            <AccessibilityControls compact={true} />
            
            {/* Split New Button */}
            <div className="relative dropdown-container">
            <button
              onClick={() => setIsNewDropdownOpen(!isNewDropdownOpen)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-expanded={isNewDropdownOpen}
              aria-haspopup="true"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New
              <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                isNewDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Backdrop for dropdown */}
            <Backdrop 
              isVisible={isNewDropdownOpen} 
              onClick={() => setIsNewDropdownOpen(false)}
            />

            {/* New Entry Dropdown */}
            {isNewDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Create New Entry</h3>
                  <p className="text-xs text-gray-600 mt-0.5">Start your journaling journey</p>
                </div>
                
                <div className="py-1">
                  {newMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.disabled ? "#" : item.path}
                        onClick={(e) => {
                          if (item.disabled) {
                            e.preventDefault();
                            return;
                          }
                          setIsNewDropdownOpen(false);
                        }}
                        className={`flex items-start px-4 py-3 transition-colors ${
                          item.disabled 
                            ? "opacity-50 cursor-not-allowed bg-gray-50" 
                            : "hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:outline-none"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.disabled ? 'bg-gray-100' : item.bgColor
                        }`}>
                          <IconComponent className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {item.label}
                            </span>
                            {item.disabled && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                Soon
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={state.searchQuery}
            onChange={handleSearch}
            className={`
              block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${accessibilityState.highContrastMode 
                ? 'bg-white border-black text-black' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          />
        </div>

        {/* Mobile Filter Chips */}
        {state.activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {state.activeFilters.map(filter => {
              const filterOption = filterOptions.find(f => f.key === filter);
              return (
                <span
                  key={filter}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${filterOption?.color}`}
                >
                  {filterOption?.label}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderBarV2;