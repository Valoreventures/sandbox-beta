# Dashboard Refactor — Design Spec

## North star
A calm, card-first dashboard that makes journaling feel like **opening one large, friendly page**. The user sees what to do next and their main topics without hunting.

## Layout model
### App Shell
- **HeaderBar (fixed)**
  - Left: hamburger (mobile), brand, breadcrumb (optional)
  - Center: search with filter tokens
  - Right: split “New” button + profile/settings
- **Left Sidebar (persistent desktop, drawer on mobile)**
  - Collections switcher
  - Pinned Topics
  - Filters (Daily / Weekly / Book / Status)
  - Settings / Accessibility
- **Main Canvas**
  - Card Deck (big cards)
- **Right Rail (optional)**
  - Next Up
  - Recent Activity
  - Collapse control

### Breakpoints
- **Mobile (≤ 480px):** Focus Mode by default; single column; sidebar as drawer.
- **Tablet (481–1024px):** 1–2 columns; Next Up collapsible.
- **Desktop (≥ 1025px):** 2–3 columns; sidebar persistent; optional right rail.

---

## Density modes
### Comfort (default)
- Base font: **18px**
- Card padding: 20–24
- Grid gap: 18–22
- Touch targets: 48×48

### Compact
- Base font: 16px
- Card padding: 16–18
- Grid gap: 14–16

---

## Card deck structure
Order (top to bottom):
1. **Overview Card** (wide)
2. **Today’s Activity Card** (wide; optional merge into Overview)
3. **Next Up Module** (right rail or large card)
4. **Topic Cards** (main grid)
5. **Recent Activity** (right rail or card)

### Topic Card (primary pattern)
**Purpose:** open or continue a journaling thread.

**Anatomy**
- Title (H3)
- Meta row: cadence chip + last updated + optional count
- Visual token: artwork tile (right side)
- Primary CTA: “Continue” (or “Review”)
- Secondary: ⋯ menu (Rename, Pin, Move, Archive)
- Optional: progress indicator (streak or completion)

**Sizing**
- Desktop: 360–520px wide; 180–240px tall
- Focus Mode: full width; 60–75% viewport height

**States**
- Default / Hover / Pressed
- Focused (strong ring)
- Selected (for multi-select or reordering)
- Disabled (archived)

---

## Navigation behavior
- Clicking a Topic Card opens **Topic View**.
- Primary CTA opens **Today’s entry** (or next required step).
- Back returns to dashboard preserving scroll and filters.
- Archive/Delete always uses **Undo toast** and confirmation where needed.

---

## Visual language (brand-consistent)
### Color tokens (names, not hex)
- **Sage** (habit/active)
- **Sky** (reading/research)
- **Sand** (projects/transformation)
- **Ink** (text)
- **Mist** (surface background)
- **Cloud** (card background)
- **Line** (borders/dividers)

Usage rules
- Card backgrounds: Cloud
- Category accents: thin top border or left stripe + chip color
- Never rely on background saturation for meaning; use chips + labels.

### Type scale (Comfort)
- H1: 32–36
- H2: 24–28
- H3: 20–22
- Body: 18
- Meta: 15–16 (still readable)

### Elevation
- Cards: soft shadow + border (one system)
- Hover: slightly stronger shadow, no dramatic motion

---

## Components list (Figma-ready)
**Atoms**
- Icon (16/20/24)
- Divider
- Focus ring token
- Badge dot / count pill

**Molecules**
- Chip (icon + label)
- MetaCluster (cadence, last updated, count)
- Button (primary/secondary/ghost)
- SplitButton (New + dropdown)
- Toast/Banner (info/success/warn/error)

**Organisms**
- HeaderBar
- SidebarNav
- TopicCard
- OverviewCard
- NextUpList
- RecentActivityList
- CardDeckGrid

---

## Content + microcopy guidelines
- Prefer verbs: **Continue, Add entry, Review, Pin**
- Avoid jargon and abbreviations
- Time wording: “Updated 2 days ago” + explicit date on secondary line
- Buttons: keep to 1–2 per card; hide the rest in ⋯

---

## Acceptance criteria (design)
- Dashboard reads clearly at arm’s length on a laptop
- Focus Mode supports single-card journaling flow
- A new user can find “Continue today” in under 3 seconds
- Cards remain consistent across all collections
