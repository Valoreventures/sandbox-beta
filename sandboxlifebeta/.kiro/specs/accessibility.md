# Dashboard Refactor — Accessibility

Target: **WCAG 2.2 AA** (minimum), with senior-friendly defaults.

## Visual accessibility
- **Default text size:** 18px in Comfort mode
- Provide **text size controls** (A− / A+) with at least 2 larger steps
- **Contrast:** meet AA (4.5:1 for body text; 3:1 for large text)
- **High Contrast Mode:** increases contrast, strengthens borders, reduces subtle grays
- Avoid relying on color alone:
  - Status and category use **text labels + icons + chips**
- Keep line length readable:
  - Target 45–80 characters per line for longer text blocks

## Interaction accessibility
- **Touch targets:** minimum 48×48 px for all interactive elements
- **Keyboard support:**
  - Logical tab order
  - Visible focus indicator on every interactive element
  - Skip-to-content link (desktop/web)
  - ESC closes menus/modals/drawers
- **Pointer alternatives:** no hover-only affordances; expose actions via ⋯ menu and focus states

## Screen reader support
- Semantic structure:
  - Header, nav, main landmarks
  - Cards as articles/sections with headings
- Accessible names:
  - Buttons include action + target: “Continue: Transformation”
  - Icon-only controls must have aria-labels
- Announcements:
  - Toasts announced via aria-live (polite) for success/info; assertive for errors
- Lists:
  - Next Up and Recent Activity should be proper lists with item counts

## Motion + cognition
- Respect OS setting: **prefers-reduced-motion**
- Keep animations short (150–250ms) and subtle
- Avoid unexpected layout shifts; use skeletons and stable placeholders
- Provide clear confirmations:
  - “Archived” + **Undo** toast
  - Destructive confirmations for permanent deletes
- Use plain language:
  - Short sentences, direct labels, predictable terminology

## Forms + journaling entry
- Labels always visible (no placeholder-only labels)
- Errors shown inline with clear fix instructions
- Provide autosave feedback (“Saved”) without interrupting flow
- Support zoom to 200% without breaking layout

## Testing checklist
- Keyboard-only walkthrough of dashboard and topic flow
- Screen reader pass (VoiceOver/NVDA):
  - Card titles, buttons, and menus announced correctly
- Contrast checks on all chips, text, and states
- Zoom 200% + reflow at 320px width
- Reduced motion mode verification
- Touch target verification on mobile/tablet
