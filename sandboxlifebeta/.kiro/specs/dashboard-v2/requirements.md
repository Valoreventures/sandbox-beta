# Dashboard v2 Requirements Document

## Introduction

This specification defines the requirements for Dashboard v2, a modernized card-first dashboard that enhances the SandboxLife journaling experience while maintaining full backward compatibility with the existing dashboard. The v2 dashboard implements the design vision outlined in the original dashboard refactor specifications with improved accessibility, senior-friendly features, and enhanced user experience.

## Glossary

- **Dashboard_v1**: The current Home.jsx implementation with basic grid layout
- **Dashboard_v2**: The new card-first dashboard with enhanced features and accessibility
- **Topic_Card**: A journaling thread or collection that users can continue or review
- **Overview_Card**: Summary card showing today's status, streaks, and quick actions
- **Next_Up_Module**: Prioritized list of recommended actions for the user
- **Focus_Mode**: Single-card view optimized for seniors and distraction-free journaling
- **Comfort_Mode**: Default accessibility mode with 18px base font and spacious layout
- **Compact_Mode**: Denser layout option for users who prefer more content per screen
- **App_Shell**: The persistent navigation structure (HeaderBar, Sidebar, Main Canvas)
- **Card_Deck**: The main content area displaying cards in a responsive grid
- **Right_Rail**: Optional sidebar for Next Up and Recent Activity modules

## Requirements

### Requirement 1: Backward Compatibility and Migration

**User Story:** As an existing user, I want to access both the current dashboard and the new v2 dashboard, so that I can gradually transition to the new interface without losing functionality.

#### Acceptance Criteria

1. WHEN a user visits the dashboard, THE System SHALL display the current v1 dashboard by default
2. WHEN a user clicks "Try New Dashboard" button, THE System SHALL navigate to the v2 dashboard interface
3. WHEN a user is on the v2 dashboard, THE System SHALL provide a "Back to Classic" button to return to v1
4. THE System SHALL preserve all existing functionality from v1 in the v2 implementation
5. THE System SHALL maintain the same URL structure and routing for backward compatibility
6. WHEN switching between dashboards, THE System SHALL preserve user context and selected filters

### Requirement 2: App Shell Architecture

**User Story:** As a user, I want a consistent navigation structure across the application, so that I can easily find features and maintain my orientation.

#### Acceptance Criteria

1. THE System SHALL implement a fixed HeaderBar with brand, breadcrumb navigation, global search, and split "New" button
2. THE System SHALL provide a persistent left sidebar on desktop with Collections, Pinned Topics, Filters, and Settings
3. WHEN on mobile devices, THE System SHALL convert the left sidebar to a drawer that can be toggled
4. THE System SHALL include an optional collapsible right rail for Next Up and Recent Activity modules
5. THE System SHALL maintain responsive breakpoints: Mobile (≤480px), Tablet (481-1024px), Desktop (≥1025px)
6. WHEN the viewport changes, THE System SHALL adapt the layout appropriately without losing functionality

### Requirement 3: Card-First Content System

**User Story:** As a user, I want my journaling content presented as clear, actionable cards, so that I can quickly understand what to do next and access my topics efficiently.

#### Acceptance Criteria

1. THE System SHALL display content as cards with consistent visual hierarchy and spacing
2. WHEN displaying Topic Cards, THE System SHALL include title, meta information, visual token, primary CTA, and secondary actions menu
3. THE System SHALL implement an Overview Card showing today's status, streaks, reminders, and last entry
4. THE System SHALL provide a Next Up module with 3-5 prioritized action items sorted by relevance
5. THE System SHALL display Recent Activity as a list of the last 5 changes with tap-to-open functionality
6. WHEN cards are displayed, THE System SHALL maintain consistent sizing: Desktop (360-520px wide, 180-240px tall)

### Requirement 4: Accessibility and Senior-Friendly Features

**User Story:** As a senior user or user with accessibility needs, I want the dashboard to be readable and easy to navigate, so that I can use the journaling application comfortably.

#### Acceptance Criteria

1. THE System SHALL default to Comfort Mode with 18px base font size and spacious layout
2. THE System SHALL provide text size controls (A−/A+) with at least 2 larger size steps
3. THE System SHALL offer a High Contrast Mode toggle that increases contrast and strengthens borders
4. THE System SHALL ensure all interactive elements have minimum 48×48px touch targets
5. THE System SHALL implement comprehensive keyboard navigation with visible focus indicators
6. THE System SHALL provide skip-to-content links and logical tab order
7. WHEN displaying status or categories, THE System SHALL use text labels, icons, and chips (not color alone)
8. THE System SHALL respect the user's prefers-reduced-motion setting for animations

### Requirement 5: Focus Mode Implementation

**User Story:** As a user who prefers minimal distractions, I want a Focus Mode that shows one card at a time, so that I can concentrate on single tasks without visual clutter.

#### Acceptance Criteria

1. THE System SHALL provide a Focus Mode toggle that displays one full-screen card at a time
2. WHEN Focus Mode is active, THE System SHALL show cards at 60-75% viewport height with full width
3. THE System SHALL provide navigation controls to move between cards in Focus Mode
4. WHEN on mobile devices, THE System SHALL default to Focus Mode for optimal experience
5. THE System SHALL allow users to set Focus Mode as their default landing preference
6. WHEN exiting Focus Mode, THE System SHALL return to the previous card deck view state

### Requirement 6: Density and Personalization Options

**User Story:** As a user with specific layout preferences, I want to customize the dashboard density and personalization settings, so that the interface matches my workflow needs.

#### Acceptance Criteria

1. THE System SHALL provide Comfort Mode (default) and Compact Mode density options
2. WHEN Comfort Mode is selected, THE System SHALL use 18px base font, 20-24px card padding, and 18-22px grid gaps
3. WHEN Compact Mode is selected, THE System SHALL use 16px base font, 16-18px card padding, and 14-16px grid gaps
4. THE System SHALL persist density mode selection across sessions
5. THE System SHALL allow users to pin topics to a dedicated "Pinned" section in the sidebar and dashboard
6. THE System SHALL provide drag-to-reorder functionality for pinned topics on desktop and touch devices

### Requirement 7: Search and Filtering System

**User Story:** As a user with many journal entries, I want to search and filter my content effectively, so that I can quickly find specific topics or entries.

#### Acceptance Criteria

1. THE System SHALL implement global search across Topics, Entries, and Collections
2. THE System SHALL provide filter chips for Daily, Weekly, Book, and Status (Active/Paused/Archived)
3. THE System SHALL display active filters with clear removal capability
4. THE System SHALL include a "Clear filters" control with visible state indication
5. WHEN no results are found, THE System SHALL display helpful empty states with clear CTAs
6. THE System SHALL maintain search and filter state when navigating between dashboard views

### Requirement 8: Enhanced User Experience Features

**User Story:** As a user, I want smooth interactions and helpful feedback, so that the dashboard feels responsive and guides me through my journaling workflow.

#### Acceptance Criteria

1. THE System SHALL implement smooth animations and transitions (150-250ms duration)
2. THE System SHALL provide skeleton loading states for card deck and lists during data fetching
3. THE System SHALL display toast notifications for user actions with appropriate urgency levels
4. THE System SHALL implement "Confirmations with Undo" pattern for destructive actions
5. THE System SHALL provide "What happens next?" microcopy on primary CTAs
6. THE System SHALL handle offline and network failure states with clear messaging

### Requirement 9: Topic Management and Organization

**User Story:** As a user, I want to organize and manage my journaling topics effectively, so that I can maintain my journaling practice and find content easily.

#### Acceptance Criteria

1. THE System SHALL allow users to pin/unpin topics from the card menu
2. THE System SHALL provide archive functionality from the card menu with undo capability
3. THE System SHALL support sorting options: Last updated, Pinned, Alphabetical
4. THE System SHALL display progress indicators (streaks, completion, or last entry) on topic cards
5. THE System SHALL implement rename functionality for topics through the secondary actions menu
6. WHEN topics are archived, THE System SHALL move them to an archived state with recovery options

### Requirement 10: Responsive Design and Cross-Device Support

**User Story:** As a user who accesses the dashboard on multiple devices, I want a consistent experience that adapts to different screen sizes, so that I can journal effectively anywhere.

#### Acceptance Criteria

1. THE System SHALL implement responsive design that works from 320px to 1440px+ widths
2. WHEN on mobile (≤480px), THE System SHALL use single column layout with drawer navigation
3. WHEN on tablet (481-1024px), THE System SHALL use 1-2 column layout with collapsible Next Up
4. WHEN on desktop (≥1025px), THE System SHALL use 2-3 column layout with persistent sidebar and optional right rail
5. THE System SHALL support touch interactions including swipe navigation in Focus Mode
6. THE System SHALL maintain readability and functionality when zoomed to 200%

### Requirement 11: Integration with Existing Journal System

**User Story:** As a user, I want the new dashboard to work seamlessly with my existing journal entries and creation workflow, so that my journaling practice remains uninterrupted.

#### Acceptance Criteria

1. THE System SHALL integrate with the existing Supabase database schema without modifications
2. THE System SHALL display journal entries from daily_journal, book_journal, and thought_of_the_day types
3. THE System SHALL maintain compatibility with the existing icon selection and entry creation workflow
4. THE System SHALL preserve the existing CalendarDateHeader functionality and integration
5. THE System SHALL support the existing CollectionsSwitcher component and entry counting
6. WHEN creating new entries, THE System SHALL use the existing journal creation pages and components

### Requirement 12: Performance and Loading States

**User Story:** As a user, I want the dashboard to load quickly and provide feedback during data operations, so that I have a smooth and responsive experience.

#### Acceptance Criteria

1. THE System SHALL implement skeleton loading states for all major content areas
2. THE System SHALL lazy load images and non-critical content to improve initial load time
3. THE System SHALL provide loading indicators for search and filter operations
4. THE System SHALL cache frequently accessed data to reduce server requests
5. THE System SHALL handle slow network conditions gracefully with appropriate timeouts
6. WHEN data fails to load, THE System SHALL provide retry mechanisms and clear error messages
