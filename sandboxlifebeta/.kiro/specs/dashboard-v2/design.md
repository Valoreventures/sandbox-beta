# Dashboard v2 Design Document

## Overview

Dashboard v2 represents a comprehensive modernization of the SandboxLife journaling interface, implementing a card-first design philosophy that prioritizes accessibility, clarity, and user-centered workflows. The design builds upon the existing foundation while introducing enhanced navigation, improved content organization, and senior-friendly features that make journaling more accessible and engaging.

The v2 dashboard transforms the current grid-based layout into an intelligent, adaptive interface that guides users through their journaling practice with clear visual hierarchy, contextual actions, and personalized content recommendations.

## Architecture

### Component Hierarchy

```
DashboardV2.jsx (Main Container)
├── AppShell.jsx
│   ├── HeaderBarV2.jsx
│   │   ├── BrandBreadcrumb.jsx
│   │   ├── GlobalSearch.jsx
│   │   └── SplitNewButton.jsx
│   ├── SidebarNav.jsx
│   │   ├── CollectionsSwitcher.jsx
│   │   ├── PinnedTopics.jsx
│   │   ├── FilterChips.jsx
│   │   └── SettingsAccess.jsx
│   └── RightRail.jsx (Optional)
│       ├── NextUpModule.jsx
│       └── RecentActivityModule.jsx
├── MainCanvas.jsx
│   ├── CardDeck.jsx
│   │   ├── OverviewCard.jsx
│   │   ├── TodayActivityCard.jsx
│   │   ├── TopicCard.jsx (Multiple)
│   │   └── NextUpCard.jsx (Mobile/Tablet)
│   └── FocusMode.jsx
└── DashboardToggle.jsx (v1/v2 Switcher)
```

### State Management Architecture

```javascript
// Global Dashboard Context
const DashboardContext = {
  // View State
  currentView: 'card-deck' | 'focus-mode',
  densityMode: 'comfort' | 'compact',
  sidebarCollapsed: boolean,
  rightRailVisible: boolean,
  
  // Content State
  topics: Array<Topic>,
  pinnedTopics: Array<Topic>,
  recentActivity: Array<Activity>,
  nextUpItems: Array<NextUpItem>,
  
  // Filter/Search State
  activeFilters: Array<Filter>,
  searchQuery: string,
  sortOrder: 'last-updated' | 'pinned' | 'alphabetical',
  
  // User Preferences
  defaultLanding: 'dashboard' | 'focus-mode' | 'last-opened',
  accessibilityMode: 'standard' | 'high-contrast',
  textSize: 'default' | 'large' | 'extra-large',
  reducedMotion: boolean
}
```

### Data Flow Architecture

```
Supabase Database
    ↓
Dashboard Context Provider
    ↓
Component State Management
    ↓
Card Rendering System
    ↓
User Interactions
    ↓
State Updates & Persistence
```

## Components and Interfaces

### Core Card System

#### BaseCard Component
```javascript
interface BaseCardProps {
  title: string;
  subtitle?: string;
  metaInfo?: MetaCluster;
  primaryAction?: CardAction;
  secondaryActions?: Array<CardAction>;
  visualToken?: string | ReactNode;
  progressIndicator?: ProgressInfo;
  state?: 'default' | 'hover' | 'pressed' | 'focused' | 'selected' | 'disabled';
  size?: 'small' | 'medium' | 'large' | 'full-width';
  density?: 'comfort' | 'compact';
}

interface MetaCluster {
  cadence?: string;
  lastUpdated?: string;
  count?: number;
  additionalInfo?: string;
}

interface CardAction {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  description?: string; // For "What happens next?" microcopy
}
```

#### TopicCard Component
```javascript
interface TopicCardProps extends BaseCardProps {
  topicId: string;
  journalType: 'daily_journal' | 'book_journal' | 'thought_of_the_day';
  isPinned: boolean;
  streak?: number;
  lastEntryDate?: Date;
  entryCount: number;
  onPin: (topicId: string) => void;
  onArchive: (topicId: string) => void;
  onRename: (topicId: string, newName: string) => void;
}
```

#### OverviewCard Component
```javascript
interface OverviewCardProps {
  todayStatus: {
    dailyStreak: number;
    entriesCompleted: number;
    nextReminder?: Date;
    lastEntry?: JournalEntry;
  };
  quickActions: Array<CardAction>;
  personalizedMessage?: string;
}
```

### Navigation Components

#### HeaderBarV2 Component
```javascript
interface HeaderBarV2Props {
  currentBreadcrumb: Array<BreadcrumbItem>;
  onSearch: (query: string, filters: Array<Filter>) => void;
  onNewEntry: (type: JournalType) => void;
  onToggleMenu: () => void;
  searchQuery: string;
  activeFilters: Array<Filter>;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive: boolean;
}
```

#### SidebarNav Component
```javascript
interface SidebarNavProps {
  isCollapsed: boolean;
  pinnedTopics: Array<Topic>;
  activeFilters: Array<Filter>;
  onFilterChange: (filters: Array<Filter>) => void;
  onTopicReorder: (topicIds: Array<string>) => void;
  onSettingsAccess: () => void;
}
```

### Layout Components

#### AppShell Component
```javascript
interface AppShellProps {
  children: ReactNode;
  sidebarContent: ReactNode;
  rightRailContent?: ReactNode;
  headerContent: ReactNode;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  densityMode: 'comfort' | 'compact';
}
```

#### CardDeck Component
```javascript
interface CardDeckProps {
  cards: Array<CardData>;
  layout: 'grid' | 'masonry' | 'single-column';
  sortOrder: SortOrder;
  onCardAction: (cardId: string, action: string) => void;
  loading: boolean;
  emptyState?: ReactNode;
}
```

## Data Models

### Topic Model
```javascript
interface Topic {
  id: string;
  name: string;
  journalType: 'daily_journal' | 'book_journal' | 'thought_of_the_day';
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastEntryDate?: Date;
  entryCount: number;
  streak: number;
  iconUrl?: string;
  description?: string;
  tags: Array<string>;
}
```

### Dashboard State Model
```javascript
interface DashboardState {
  topics: Array<Topic>;
  recentEntries: Array<JournalEntry>;
  nextUpItems: Array<NextUpItem>;
  userPreferences: UserPreferences;
  viewState: ViewState;
  filterState: FilterState;
}

interface UserPreferences {
  densityMode: 'comfort' | 'compact';
  defaultView: 'card-deck' | 'focus-mode';
  textSize: 'default' | 'large' | 'extra-large';
  highContrastMode: boolean;
  reducedMotion: boolean;
  sidebarCollapsed: boolean;
  rightRailVisible: boolean;
}

interface ViewState {
  currentView: 'card-deck' | 'focus-mode';
  focusedCardId?: string;
  scrollPosition: number;
  selectedCards: Array<string>;
}

interface FilterState {
  activeFilters: Array<Filter>;
  searchQuery: string;
  sortOrder: 'last-updated' | 'pinned' | 'alphabetical';
  dateRange?: DateRange;
}
```

### Next Up Item Model
```javascript
interface NextUpItem {
  id: string;
  type: 'continue-entry' | 'new-entry' | 'review-entry' | 'complete-streak';
  title: string;
  description: string;
  priority: number;
  topicId?: string;
  dueDate?: Date;
  estimatedTime?: number; // minutes
  action: CardAction;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Dashboard View Consistency
*For any* dashboard state transition, the active view mode (card-deck or focus-mode) should be preserved in user preferences and restored on subsequent sessions.
**Validates: Requirements 1.6, 5.5**

### Property 2: Card Action Completeness
*For any* topic card displayed in the dashboard, all primary and secondary actions should be accessible and functional regardless of the current view mode or density setting.
**Validates: Requirements 3.2, 6.1, 6.2**

### Property 3: Accessibility Compliance
*For any* interactive element in the dashboard, the minimum touch target size of 48×48px should be maintained across all density modes and breakpoints.
**Validates: Requirements 4.4, 10.5**

### Property 4: Search and Filter Consistency
*For any* combination of search query and active filters, the displayed results should be deterministic and match the specified criteria across all view modes.
**Validates: Requirements 7.1, 7.2, 7.5**

### Property 5: Responsive Layout Integrity
*For any* viewport width between 320px and 1440px+, the dashboard layout should remain functional and readable without horizontal scrolling or content overflow.
**Validates: Requirements 10.1, 10.6**

### Property 6: State Persistence Reliability
*For any* user preference change (density mode, text size, pinned topics), the setting should be persisted to local storage and restored accurately on page reload.
**Validates: Requirements 6.4, 4.2**

### Property 7: Focus Mode Navigation
*For any* sequence of focus mode navigation actions, users should be able to traverse all available cards and return to the card deck view without losing their position or context.
**Validates: Requirements 5.2, 5.3, 5.6**

### Property 8: Keyboard Navigation Completeness
*For any* dashboard interface element, keyboard navigation should provide access to all functionality available through mouse/touch interactions.
**Validates: Requirements 4.5, 4.6**

### Property 9: Loading State Consistency
*For any* data loading operation, appropriate skeleton states or loading indicators should be displayed until content is ready, preventing layout shifts.
**Validates: Requirements 12.1, 12.3**

### Property 10: Backward Compatibility Preservation
*For any* existing journal entry or user data, the v2 dashboard should display and interact with the content identically to the v1 dashboard functionality.
**Validates: Requirements 1.4, 11.1, 11.2**

## Error Handling

### Network Error Handling
- **Connection Failures**: Display retry mechanisms with exponential backoff
- **Timeout Errors**: Provide clear messaging and manual retry options
- **Data Sync Issues**: Implement offline-first approach with sync indicators

### User Input Error Handling
- **Invalid Search Queries**: Graceful handling with suggested corrections
- **Filter Conflicts**: Automatic resolution with user notification
- **Navigation Errors**: Fallback to safe default states

### State Management Error Handling
- **Corrupted Preferences**: Reset to defaults with user notification
- **Missing Data**: Provide meaningful empty states with recovery actions
- **Concurrent Modifications**: Implement optimistic updates with conflict resolution

## Testing Strategy

### Unit Testing Approach
- **Component Isolation**: Test each card component independently with mock data
- **State Management**: Verify context providers and state transitions
- **Utility Functions**: Test search, filter, and sorting algorithms
- **Accessibility Helpers**: Validate ARIA attributes and keyboard navigation

### Property-Based Testing Configuration
- **Framework**: Use React Testing Library with Jest for property-based tests
- **Test Iterations**: Minimum 100 iterations per property test
- **Data Generation**: Create realistic test data generators for topics, entries, and user preferences
- **Property Validation**: Each property test must reference its design document property

### Integration Testing Strategy
- **Cross-Component Communication**: Test data flow between dashboard components
- **Responsive Behavior**: Validate layout changes across breakpoints
- **User Workflow Testing**: Test complete user journeys from dashboard to entry creation
- **Performance Testing**: Monitor rendering performance with large datasets

### Accessibility Testing Requirements
- **Automated Testing**: Use axe-core for automated accessibility validation
- **Manual Testing**: Keyboard-only navigation testing across all features
- **Screen Reader Testing**: Validate with VoiceOver/NVDA for proper announcements
- **Visual Testing**: Verify high contrast mode and text scaling functionality

### Browser Compatibility Testing
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Responsive Testing**: Validate across device sizes and orientations
- **Performance Testing**: Monitor Core Web Vitals across target browsers