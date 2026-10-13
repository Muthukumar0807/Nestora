# Phase 3 — Design System Specification

## 1. Brand Identity & Strictly Enforced Palette

Nestora follows a strict brand color palette for application interfaces, with realistic room paint colors permitted only within the visualization canvas.

| Token | Name | Hex Code | Role / Usage |
|---|---|---|---|
| `color-primary` | Deep Forest Green | `#173C35` | Primary brand color, header background, active state borders, primary CTAs |
| `color-secondary` | Earthy Brown | `#795548` | Secondary brand color, subtitles, card accents, secondary CTAs |
| `color-bg` | Warm Cream | `#F5EBDD` | Main page background, subtle card containers |
| `color-surface` | Pure White | `#FFFFFF` | Card backgrounds, visualizer workspace panel, input fields |
| `color-text` | Deep Charcoal | `#24312D` | Body text, headings, dark icons |
| `color-success` | Botanical Sage | `#386641` | Success alerts, high Nest Score indicators, completion checkmarks |
| `color-warning` | Warm Amber | `#E5A83B` | Nesto attention alerts, maintenance notes |
| `color-error` | Terracotta Rust | `#BC4749` | Error validation, destructive delete confirmations |

---

## 2. Typography Hierarchy

Primary Typeface: **Inter** (Fallback: system-ui, sans-serif)

| Style | Font Weight | Desktop Size | Mobile Size | Line Height |
|---|---|---|---|---|
| Display H1 | Extrabold (800) | 36px (2.25rem) | 28px (1.75rem) | 1.2 |
| Heading H2 | Bold (700) | 28px (1.75rem) | 22px (1.375rem) | 1.25 |
| Heading H3 | Bold (700) | 20px (1.25rem) | 18px (1.125rem) | 1.3 |
| Subheading | Semibold (600) | 16px (1.0rem) | 15px (0.9375rem) | 1.4 |
| Body Text | Regular (400) | 14px (0.875rem) | 14px (0.875rem) | 1.5 |
| Small Label | Medium (500) | 12px (0.75rem) | 12px (0.75rem) | 1.4 |
| Caption | Medium (500) | 11px (0.6875rem) | 10px (0.625rem) | 1.3 |

---

## 3. Spacing & Grid System
Based on an 8-pixel base unit:
- `space-1` (4px): Micro gaps between icons & labels
- `space-2` (8px): Button internal padding, chip spacing
- `space-3` (12px): Small card padding
- `space-4` (16px): Standard component margin & padding
- `space-6` (24px): Card group padding, grid gap
- `space-8` (32px): Section padding
- `space-12` (48px): Page section whitespace

---

## 4. Baya Weaver Mascot Expressions (Nesto)

Nesto is a contextual design companion inspired by the Baya Weaver bird. The design supports 7 distinct mood expressions implemented as clean, scalable vector assets:

1. **Neutral:** Default state, welcoming user on dashboard.
2. **Happy:** Celebrating project completion or design save.
3. **Thinking:** Evaluating preferences inside the recommendation engine.
4. **Explaining:** Providing "Why This Recommendation Works" breakdown.
5. **Curious:** Prompting user for missing preference details.
6. **Celebrating:** Confetti event when Nest Score > 90.
7. **Concerned:** Warning user when color reflectance (LRV) is too low for a dark room.

---

## 5. Interactive Logo System

The Nestora logo combines: **Baya Weaver Bird + Woven Nest Structure + Home Silhouette**.

Three standard logo formats:
1. **Full Logo:** Horizontal icon + typography ("NESTORA") + tagline ("Weave Your Dream Home")
2. **Header Logo:** Compact icon + "NESTORA" title
3. **Icon-Only Logo:** Favicon and compact mobile header symbol

*Hover Effect:* Subtle motion scale-up (1.03x) with gentle weave glow.
*Click Event:* Navigates directly to Home/Dashboard.

---

## 6. Accessibility & WCAG 2.2 AA Compliance
- All text meets minimum contrast ratio of 4.5:1 against Warm Cream (`#F5EBDD`) and White (`#FFFFFF`).
- Focus rings display visible 2px outline on keyboard `Tab` focus.
- Touch targets on mobile meet minimum 44px x 44px bounds.
- Motion animations respect `prefers-reduced-motion` media queries.
