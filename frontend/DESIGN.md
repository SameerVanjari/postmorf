---
name: Functional Clarity
source: Stitch — PostMorph AI Content Workspace
primary_color: '#007AFF'
color_mode: LIGHT
font_family: Inter
roundness: 4px
spacing_unit: 8px
---

# PostMorph Design System

## Brand & Philosophy

The design system is rooted in the philosophy of **"Invisible Productivity."** It prioritizes content and task-completion over visual flourish, drawing from the architectural precision of high-density software and the breathing room of modern document editors.

The style is **Minimalist-Professional.** It leverages high-quality typography and a disciplined 8px spatial system to create a sense of order and calm. By removing heavy gradients and unnecessary decorative elements, the system minimizes cognitive load, making it ideal for power users who value speed and focus. The interface feels like a high-end tool: sharp, reliable, and responsive.

---

## Colors

The palette is intentionally restrained to keep focus on user data. The primary accent is a refined blue used sparingly for interactive states and primary actions.

### Color Roles

| Token | Hex | oklch (Tailwind v4) | Role |
|-------|-----|---------------------|------|
| `background` | `#f9f9ff` | `oklch(0.98 0.003 270)` | Main canvas |
| `surface` | `#f9f9ff` | `oklch(0.98 0.003 270)` | Elevated surfaces |
| `surface-bright` | `#f9f9ff` | `oklch(0.98 0.003 270)` | Brightest surface |
| `surface-dim` | `#d8d9e5` | `oklch(0.89 0.01 260)` | Dimmed surfaces |
| `surface-container-lowest` | `#ffffff` | `oklch(1 0 0)` | Base white |
| `surface-container-low` | `#f1f3fe` | `oklch(0.96 0.008 265)` | Low elevation container |
| `surface-container` | `#ecedf9` | `oklch(0.94 0.01 265)` | Default container |
| `surface-container-high` | `#e6e8f3` | `oklch(0.92 0.01 265)` | High elevation container |
| `surface-container-highest` | `#e0e2ed` | `oklch(0.90 0.01 265)` | Highest elevation container |
| `on-background` | `#181c23` | `oklch(0.17 0.01 255)` | Primary text on background |
| `on-surface` | `#181c23` | `oklch(0.17 0.01 255)` | Primary text on surface |
| `on-surface-variant` | `#414755` | `oklch(0.35 0.01 255)` | Secondary text |

### Primary (Accent Blue)

| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `primary` | `#0058bc` | `oklch(0.41 0.17 258)` | Primary action fill |
| `on-primary` | `#ffffff` | `oklch(1 0 0)` | Text on primary |
| `primary-container` | `#0070eb` | `oklch(0.48 0.19 260)` | Primary container fill |
| `on-primary-container` | `#fefcff` | `oklch(0.99 0.005 280)` | Text on primary container |
| `primary-fixed` | `#d8e2ff` | `oklch(0.90 0.03 262)` | Tinted background |
| `primary-fixed-dim` | `#adc6ff` | `oklch(0.82 0.06 262)` | Dimmed tint background |

### Secondary (Neutral)

| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `secondary` | `#5e5e5e` | `oklch(0.44 0.0 0)` | Secondary action fill |
| `on-secondary` | `#ffffff` | `oklch(1 0 0)` | Text on secondary |
| `secondary-container` | `#e1dfdf` | `oklch(0.90 0.0 0)` | Secondary container |
| `on-secondary-container` | `#626262` | `oklch(0.45 0.0 0)` | Text on secondary container |

### Tertiary (Orange/Warm)

| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `tertiary` | `#9e3d00` | `oklch(0.44 0.13 42)` | Tertiary accent |
| `on-tertiary` | `#ffffff` | `oklch(1 0 0)` | Text on tertiary |
| `tertiary-container` | `#c64f00` | `oklch(0.52 0.15 45)` | Tertiary container |
| `on-tertiary-container` | `#fffbff` | `oklch(0.99 0.005 280)` | Text on tertiary container |

### Error

| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `error` | `#ba1a1a` | `oklch(0.40 0.18 22)` | Error fill |
| `on-error` | `#ffffff` | `oklch(1 0 0)` | Text on error |
| `error-container` | `#ffdad6` | `oklch(0.90 0.04 22)` | Error background |
| `on-error-container` | `#93000a` | `oklch(0.32 0.15 15)` | Text on error container |

### Borders & Outlines

| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `outline` | `#717786` | `oklch(0.53 0.01 260)` | Component borders |
| `outline-variant` | `#c1c6d7` | `oklch(0.82 0.01 260)` | Subtle dividers |
| `surface-variant` | `#e0e2ed` | `oklch(0.90 0.01 265)` | Variant surface |

### Contrast Philosophy
- **Primary text:** High contrast for readability (`on-background`)
- **Secondary text:** Pushed back using soft grey (`on-surface-variant`)
- **Accents:** Blue is the sole "active" color signaling intent and selection
- **Semantic colors** (red errors, green success) use low-saturation variants

---

## Typography

**Font Family:** Inter — system-centric sans-serif for zero-latency rendering and a native-app feel.

| Scale | Size | Weight | Line Height | Letter Spacing | Use |
|-------|------|--------|-------------|----------------|-----|
| `h1` | 32px | 600 | 1.2 | -0.02em | Page titles |
| `h2` | 24px | 600 | 1.3 | -0.01em | Section headers |
| `h3` | 18px | 600 | 1.4 | -0.01em | Subsection headers |
| `body-lg` | 16px | 400 | 1.7 | 0 | Long-form reading |
| `body-md` | 14px | 400 | 1.6 | 0 | Default body text |
| `label-md` | 13px | 500 | 1.4 | 0.01em | Labels, metadata |
| `label-sm` | 12px | 500 | 1.2 | 0.02em | Small labels, badges |

### Typography Principles
- Headlines use tighter tracking and heavier weights for structural hierarchy
- Body text features generous line heights (1.6x–1.7x) for long-form editing
- Label styles prioritize density and clarity for technical/keyboard-first elements
- Content area remains spacious; interactive UI uses tighter spacing

---

## Layout & Spacing

**Grid System:** 12-column grid for dashboard views; single-column centered layout for focused content creation.

**Spatial Rhythm:** 8px base unit governs all padding and margins.

| Token | Size | Use |
|-------|------|-----|
| `xs` | 4px | Tight internal spacing |
| `sm` | 8px | Component internal spacing |
| `md` | 16px | Standard padding |
| `lg` | 24px | Section headers, content blocks |
| `xl` | 40px | Major section separation |
| `gutter` | 20px | Page gutter |
| `container-max` | 1200px | Max content width |

### Layout Philosophy — Fixed-Fluid Hybrid
- Main content containers respect maximum width for optimal reading line lengths
- Workspace panels and sidebars are fluid
- Interactive UI (sidebars, toolbars) use tighter spacing (8px–12px) for "pro-tool" density
- Content area remains spacious, emulating a document editor

---

## Elevation & Depth

Depth is communicated through **low-contrast outlines** supplemented by soft, ambient shadows.

| Layer | Specification | Use |
|-------|---------------|-----|
| **Flat** | 1px border `#c1c6d7` | Default containers, inputs |
| **Raised** | `0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.02)` | Cards, dropdowns |
| **Overlay** | Slightly more pronounced shadow + subtle backdrop blur | Modals, menus |

**Rule:** Avoid heavy drop shadows or colored glows. Depth should be felt, not noticed.

---

## Shapes

| Token | Value | Use |
|-------|-------|-----|
| `sm` | 4px (0.25rem) | Status indicators, small tags |
| `DEFAULT` | 4px (0.25rem) | Uniform corner radius — all containers, buttons, inputs |
| `md` | 6px (0.375rem) | Slightly softer cards |
| `lg` | 8px (0.5rem) | Larger containers |
| `xl` | 12px (0.75rem) | Modals |
| `full` | 9999px | User avatars only |

---

## Component Specifications

### Buttons
- **Primary:** Solid `#0058bc` fill, white text, 4px radius
  - Hover: Slightly darker (`#004493`)
  - Active: scale(0.98) tactile push
- **Secondary:** White background, 1px `#c1c6d7` border
  - Hover: Slight background tint
- **Ghost:** No background/border by default; appears on hover
  - Preferred for secondary toolbar actions to minimize visual noise

### Input Fields
- 1px border `#c1c6d7`
- 8px padding (sm)
- 14px text (body-md)
- Focus: 1px `#007AFF` border with faint blue outer halo
- Label positioned above input
- Error state: Red border + inline error text below

### Status Badges
- **Draft:** Light grey background `#ecedf9`, `#414755` text
- **Final/Published:** Blue tint background, `#0058bc` text
- Small, uppercase label-sm style for quick scanning

### Cards
- White background, 1px border `#c1c6d7`
- No shadow unless hovered
- 16px (md) internal padding
- Hover: Subtle elevation shift

### Lists
- **Navigation lists:** 32px row height (high-density)
- **Content lists:** 48px+ row height (comfortable)

### Keyboard Shortcuts
- Small `kbd` component: light grey fill, subtle bottom border
- Mimics physical key appearance
- Inline with text, label-sm size

---

## Icons

**Library:** Lucide React (already installed in project)

Use 16px–20px icons for UI chrome; 24px for standalone decorative use. Icons should inherit text color via `currentColor`.

---

## Motion & Interaction

- **Transitions:** 150ms–200ms ease-out for hover states
- **Buttons:** scale(0.98) on active press
- **Page transitions:** Content fade-in (opacity 0→1, 200ms)
- **Loading:** Skeletal shimmer matching content layout, not circular spinners
- **Focus:** 2px offset ring in primary color

---

## Implementation — Tailwind CSS v4

### CSS Variables (in `src/styles.css`)

```css
@import 'tailwindcss';

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* Surface hierarchy */
  --background: oklch(0.98 0.003 270);
  --foreground: oklch(0.17 0.01 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.17 0.01 255);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.17 0.01 255);

  /* Primary */
  --primary: oklch(0.41 0.17 258);
  --primary-foreground: oklch(1 0 0);

  /* Secondary */
  --secondary: oklch(0.44 0.0 0);
  --secondary-foreground: oklch(1 0 0);

  /* Muted */
  --muted: oklch(0.94 0.01 265);
  --muted-foreground: oklch(0.35 0.01 255);

  /* Accent */
  --accent: oklch(0.94 0.01 265);
  --accent-foreground: oklch(0.17 0.01 255);

  /* Destructive */
  --destructive: oklch(0.40 0.18 22);
  --destructive-foreground: oklch(1 0 0);

  /* Borders & Inputs */
  --border: oklch(0.82 0.01 260);
  --input: oklch(0.82 0.01 260);
  --ring: oklch(0.48 0.19 260);

  /* Radius */
  --radius: 0.25rem;

  /* Sidebar */
  --sidebar-background: oklch(0.94 0.01 265);
  --sidebar-foreground: oklch(0.17 0.01 255);
  --sidebar-primary: oklch(0.41 0.17 258);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.90 0.01 265);
  --sidebar-accent-foreground: oklch(0.17 0.01 255);
  --sidebar-border: oklch(0.82 0.01 260);
  --sidebar-ring: oklch(0.48 0.19 260);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 2px);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar-background: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
}
```

---

## DevTools & Configuration

### shadcn/ui Setup
```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "#/components",
    "utils": "#/lib/utils",
    "ui": "#/components/ui",
    "lib": "#/lib",
    "hooks": "#/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Commands
- **Add shadcn component:** `npx shadcn@latest add button`
- **Format:** `bun run format`
- **Lint:** `bun run lint`

---

## Anti-Patterns (Banned)

- No dark backgrounds — this is a **light mode** design system
- No serif fonts — Inter only across all surfaces
- No heavy gradients or decorative flourishes
- No oversized hero sections — PostMorph is a workspace tool, not a marketing site
- No emojis in UI chrome
- No pure black (`#000000`) — use `on-background` dark charcoal
- No floating labels — labels sit above inputs
- No circular loading spinners — skeletal shimmer only
- No decorative box shadows on cards unless hovered
- No low-contrast text on light backgrounds — maintain WCAG AA compliance (4.5:1 minimum)

---

## Screen Inventory (from Stitch)

The design system applies across all 12 screens in the PostMorph AI Content Workspace:

1. **Dashboard** — Overview of posts, drafts, analytics
2. **Editor Workspace** — Rich text / markdown editor with sidebar panels
3. **Create Post** — Post creation form with platform/account selection
4. **All Posts** — Browseable, filterable post library
5. **Saved** — Bookmarked/saved content repository
6. **Source Posts** — Imported source content browser
7. **Generated Post** — AI-generated post preview with action bar
8. **Edit Post** — Post editing interface with versioning
9. **Post Detail** — Full post preview with metadata sidebar
10. **Connect Account** — Social platform account connection flow
11. **Artifacts** — Generated content artifacts gallery
12. **Crafting Post** — AI generation progress/animation screen

Stitch Project: `projects/13263253442724248241`
