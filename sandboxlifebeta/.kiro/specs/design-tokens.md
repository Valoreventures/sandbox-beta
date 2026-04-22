# Design Tokens & Guidelines

Based on the visual analysis of the "Sandbox UI" reference.

## Colors

### Primary Palette (Pastels)
- **Sage Green**: `#D1E7DD` (Backgrounds, Cards)
- **Soft Green**: `#A8D5BA` (Accents, Buttons)
- **Peach/Orange**: `#FDE6D2` (Cards, Highlights)
- **Sky Blue**: `#D0E8F2` (Accents, Cards)
- **Cream/Off-White**: `#FEFEFD` (Base Backgrounds)

### Text Colors
- **Primary Text**: `#2D3748` (Dark Gray/Charcoal)
- **Secondary Text**: `#718096` (Medium Gray)
- **Accents**: `#4A5568`

### Status/Functional
- **Success**: `#48BB78` (Vibrant Green icons/checks)
- **Warning**: `#ED8936` (Orange accents)
- **Info**: `#4299E1` (Blue icons)

## Typography

font-family: 'Inter', sans-serif (assumed based on clean look)

### Hierarchy
- **Card Title**: 
  - Weight: 600 (SemiBold)
  - Size: 1.125rem (18px)
  - Letter-spacing: -0.01em
- **Section Header**:
  - Weight: 500 (Medium)
  - Size: 0.875rem (14px)
  - Uppercase, Tracking: 0.05em
- **Body/Content**:
  - Weight: 400 (Regular)
  - Size: 0.9375rem (15px)
  - Line-height: 1.5
- **Meta/Caption**:
  - Weight: 400
  - Size: 0.75rem (12px)
  - Color: Secondary Text

## Spacing & Layout

- **Card Padding**: 1.5rem (24px) for 'Comfort', 1rem (16px) for 'Compact'
- **Gap between elements**: 0.75rem (12px) or 1rem (16px)
- **Corner Radius**: 
  - Cards: `16px` (lg/xl)
  - Buttons: `8px` or `12px` (md/lg)
  - Inner Elements: `8px`

## Effects

- **Shadows**:
  - Card: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)` (Soft, diffused)
  - Hover: `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)`
- **Glassmorphism**:
  - Detailed cards use semi-transparent backgrounds with backdrop blur in some areas.
  - Gradients: Soft linear gradients (e.g., Top-Left to Bottom-Right) for card backgrounds.

## Component Specs: Card

### Base Structure
- **Container**: Flex column, bg-white (or gradient), rounded-xl, shadow-sm.
- **Header**: Flex row, space-between. Title + Icon/Badge.
- **Content**: Center aligned or Left aligned depending on context.
- **Footer/Actions**: Flex row, buttons or date/meta info.

### Specific "Transformation" Card (Refactor Target)
- **Align**: Center content (Image/Icon).
- **Title**: Top center or Top Left.
- **Badge**: Top Right or below Title.
- **Image**: Central, prominent.
- **Footer**: Date/Time split (Left/Right).

## Design System Elements (List)

1. **Cards**: Various sizes (Small square, Wide rectangle).
2. **Buttons**:
   - `Continue`: Pill shape or Rounded Rect, Solid Color (Green/Orange).
   - `Review`: Outline or Light bg.
3. **Icons**:
   - Realistic/3D style icons (Butterflies, Globes, Leaves) for topics.
   - Simple UI icons (Checkmarks, Plus, Settings) for actions.
4. **Inputs/Search**: Rounded, light gray bg, internal icon.
5. **Navigation**: Sidebar with clean list items, active state indicator.
