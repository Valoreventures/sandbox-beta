# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint (strict: max-warnings 0)
npm run test         # Run tests once
npm run test:watch   # Tests in watch mode
npm run test:ui      # Launch Vitest UI dashboard
```

## Architecture Overview

**Stack:** React 18 + Vite + Tailwind CSS + Supabase (PostgreSQL)

### Core Application Structure

```
src/
├── App.jsx              # React Router setup (all routes)
├── pages/               # Route pages (14 pages)
│   ├── Home.jsx         # Dashboard v1 (classic grid view)
│   ├── DashboardV2.jsx  # Dashboard v2 (card-based, new architecture)
│   └── [DailyJournal, BookJourney, ThoughtOfTheDay, Library, etc.]
├── components/          # Reusable UI components (35+)
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── utils/
│   ├── supabase.jsx     # Database queries & mutations
│   └── helpers.jsx      # GridList component, formatting
└── constants/           # Form fields, questions, icon definitions
```

### State Management (React Context)

Three specialized contexts - import from `src/contexts/`:

- **AccessibilityContext** - Text scaling, high contrast, reduced motion, focus visibility, touch targets
- **DashboardContext** - View mode (card-deck/focus), density, filters, sidebar/rail state
- **OverlayContext** - Modal z-index stacking management

All persist to localStorage automatically.

### Dual Dashboard Architecture

Users can switch between two dashboard versions:
- **v1** (`/home/:userId`) - Traditional grid-based journal view in `Home.jsx`
- **v2** (`/dashboard-v2/:userId`) - New card system with enhanced accessibility in `DashboardV2.jsx`

Preference stored in localStorage (`preferred_dashboard_version`). Use `useDashboardRedirect` hook for auto-redirect logic.

### Key Custom Hooks (src/hooks/)

- `useOverlay(isOpen, onClose, options)` - Overlay management + focus trap + click-outside
- `useDashboardRedirect({ enableAutoRedirect, skipInitialRedirect })` - Dashboard version switching
- `useKeyboardNavigation()` - Keyboard nav utilities

### Database Integration (Supabase)

Table: `user_journal_entries` with columns: `user_id`, `journal_type`, `journal_id`, `journal_icon`, `journal_meaning`, `journal_entry`, `wisdom_message`, `created_at`

Key functions in `src/utils/supabase.jsx`:
- `insertJournalEntry(userId, journalType, journalId, journalIcon, journalMeaning, journalEntry, wisdomMessage)`
- `fetchTopUserRecords(userId)` - Latest 6 entries
- `fetchEntries(userId, journalType, limit)`
- `fetchDailyEntryCount(userId)`

## Key Patterns

### Performance (Critical for GridList with 100+ cards)

Components use aggressive memoization:
```jsx
const GridList = memo(({ items }) => {
  const filtered = useMemo(() => filterItems(items), [items, filters]);
  const handleClick = useCallback((data) => setSelected(data), []);
});
```

### Accessibility-First Design

The app targets seniors and accessibility-conscious users. All new components must support:
- Text scaling via `--text-scale` CSS custom property
- High contrast mode (`.high-contrast` class)
- Reduced motion (`@media (prefers-reduced-motion: reduce)`)
- Keyboard navigation with focus trapping in modals
- Touch targets minimum 44x44px (48x48px with `largerTouchTargets` setting)
- Screen reader announcements via `announce(message, priority)`

### Tailwind Design System

Custom tokens in `tailwind.config.js`:
- Colors: `bgpapyrus`, `lightpapyrus`, `darkpapyrus`, `red` (accent)
- Spacing: Uses 8-point system with semantic tokens (`section`, `component`, `card`)
- Z-index: `dropdown(1000)`, `modal-backdrop(1040)`, `modal(1050)`, `tooltip(1070)`
- Border radius: `card (0.5rem)`

### Component Patterns

- `AppShell.jsx` - Main layout container with responsive breakpoints
- `BaseCard.jsx` - Foundation card component for dashboard v2
- `JournalEntry.jsx` - Core journal card display (heavily memoized)
- `OptimizedImage.jsx` - Progressive loading with skeleton states

## Testing

Framework: Vitest with jsdom + React Testing Library

Test files in `src/test/` cover:
- Accessibility compliance (WCAG)
- Component rendering states
- Overlay z-index stacking
- Performance (memoization verification)
- Spacing system compliance

Run single test file: `npm run test -- src/test/accessibility-compliance.test.jsx`

## Routing

All authenticated routes use `:userId` param:
```
/                    → LoginPage
/signup              → SignupPage
/home/:userId        → Dashboard v1
/dashboard-v2/:userId → Dashboard v2
/my-book/:userId     → MyBook
/library/:userId     → Library
/profile/:userId     → ProfilePage
/settings/:userId    → SettingsPage
/bookjourney         → BookJourney (journaling flow)
/dailyjournal        → DailyJournal (journaling flow)
/thoughtoftheday     → ThoughtOfTheDay (journaling flow)
```

## Icons

Journal icons are in `src/assets/icons/` (PNG format). Icon constants defined in `src/constants/setb-icons.jsx`.
