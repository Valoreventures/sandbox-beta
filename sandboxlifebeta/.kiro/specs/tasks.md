# Dashboard Refactor — Tasks

Goal: ship a **card-first, full-screen dashboard** optimized for adults 30+ and senior users (readable, calm, low-friction, high-contrast-ready).

## Product principles
- **Big cards, few choices**: 1–3 primary actions visible at once.
- **Always recoverable**: undo, clear confirmations, gentle errors.
- **Predictable navigation**: consistent back/close behavior; no surprise context changes.
- **Readable by default**: large type, spacious layout, high hit-targets.

---

## P0 — Foundations (must-have)
### IA + layout refactor
- [ ] Define “primary object” = **Topic** (the thing users continue daily/weekly).
- [ ] Implement **App Shell v2**:
  - [ ] HeaderBar (brand/breadcrumb, global search, split “New” button)
  - [ ] Left Sidebar (Collections, Filters, Settings)
  - [ ] Main canvas (Card Deck area)
  - [ ] Optional Right Rail (Next Up / Recent) — collapsible
- [ ] Add **Comfort (default) vs Compact** density toggle (persisted).
- [ ] Add **Focus Mode**: one full-screen card at a time (great for seniors).

### Card system (design + engineering)
- [ ] Create reusable **Card** base component with:
  - [ ] Title + subtitle
  - [ ] Meta row (count, cadence, last updated)
  - [ ] Primary CTA (Continue/Review/Add)
  - [ ] Secondary actions (⋯ menu)
  - [ ] Visual token (artwork tile / icon)
  - [ ] States: hover, pressed, focused, selected, disabled
- [ ] Create **Chip** component (cadence/status/type) with icon + label.
- [ ] Create **Progress** component (streak, completion, or “last entry”).
- [ ] Standardize **Toast / Banner** (non-blocking, dismissible, stacked).

### Dashboard content modules
- [ ] **Overview Card** (top of deck): highlights today’s status (streak, reminders, last entry).
- [ ] **Next Up module** (list of 3–5 items): Continue buttons, sorted by relevance.
- [ ] **Topic Cards grid**:
  - [ ] Sorting: Last updated / Pinned / Alphabetical
  - [ ] Pin/unpin from card menu
  - [ ] Archive from card menu (with undo)
- [ ] **Recent Activity** module: last 5 changes, tap to open.

### Search + filtering
- [ ] Global search across Topics + Entries + Collections
- [ ] Filter chips: Daily / Weekly / Book / Status (Active/Paused/Archived)
- [ ] “Clear filters” control with visible state

### States + reliability
- [ ] Empty states for: no topics, no results, no activity (with a clear CTA)
- [ ] Offline/failed network state messaging
- [ ] Skeleton loading for card deck + lists
- [ ] Consistent error-toasts with actionable copy

---

## P1 — Senior-friendly enhancements (high leverage)
### Readability + confidence
- [ ] Default type scale to **18px base** (Comfort mode) + allow size stepper (A− / A+)
- [ ] Add **High Contrast Mode** toggle
- [ ] Add **“Confirmations with Undo”** pattern for destructive actions (Archive/Delete)
- [ ] Add “What happens next?” microcopy on primary CTAs (e.g., “Continue → opens today’s entry”)

### Interaction improvements
- [ ] Keyboard navigation: Tab order, skip-to-content, visible focus rings
- [ ] Large hit-targets: minimum 48×48 for clickable elements
- [ ] Optional **swipe** between full-screen cards on touch devices (Focus Mode)
- [ ] Drag-to-reorder pinned topics (desktop + touch)

### Personalization
- [ ] “Pinned” section in sidebar + on dashboard
- [ ] Set default landing: Dashboard / Focus Mode / Last opened
- [ ] Optional reminder settings surfaced in-context on Overview Card

---

## P2 — Polishing + quality
### Visual + motion
- [ ] Refine iconography set (consistent stroke/size)
- [ ] Subtle motion tokens (reduced motion supported)
- [ ] Illustration/texture background token (very light, optional)

### Analytics + QA
- [ ] Track dashboard interactions (open topic, continue, create, pin, search)
- [ ] Run accessibility audit (automated + manual)
- [ ] Usability testing script for ages 55–75 (task-based)

---

## Definition of done (dashboard)
- [ ] Comfort mode is the default and passes internal readability checks
- [ ] All interactive elements are reachable by keyboard and have visible focus
- [ ] Color is never the only indicator of state
- [ ] Card deck works at 320px → 1440px widths
- [ ] Empty/loading/error states are implemented and polished
- [ ] Archive/delete supports undo and confirmations
