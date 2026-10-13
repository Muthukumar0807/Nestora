# Phase 3 — Component Library Guidelines

## Component Guidelines & API Contracts

### 1. Button Component (`Button`)
**Variants:**
- `primary`: Background `#173C35`, Text `#FFFFFF`, Hover `#0E2823`
- `secondary`: Background `#795548`, Text `#FFFFFF`, Hover `#5D4037`
- `outline`: Border `#173C35`, Text `#173C35`, Hover `#F5EBDD`
- `ghost`: Transparent, Text `#173C35`, Hover `rgba(23, 60, 53, 0.08)`

**States:** `default`, `hover`, `active`, `disabled` (opacity 50%), `loading` (with animated spinner).

---

### 2. Color Swatch Component (`ColorSwatch`)
**Props:**
- `hex`: Color hex string
- `name`: Human-readable name (e.g. "Morning Sage")
- `lrv`: Light Reflectance Value (0-100)
- `finish`: "Matte" | "Satin" | "Eggshell"
- `isSelected`: boolean

**Interaction:** Click selects color for target active room region. Shows subtle checkmark icon when selected.

---

### 3. Recommendation Card Component (`RecommendationCard`)
**Props:**
- `title`: Design Title
- `style`: Design Style
- `score`: Nest Score rating (0-100)
- `palette`: Full color palette object
- `whyItWorks`: Array of explanation strings
- `whyNot`: Array of tradeoff strings
- `onSelect`: Function callback

---

### 4. Nesto Avatar Component (`NestoAvatar`)
**Props:**
- `mood`: 'neutral' | 'happy' | 'thinking' | 'explaining' | 'curious' | 'celebrating' | 'concerned'
- `size`: 'sm' (24px) | 'md' (36px) | 'lg' (48px) | 'xl' (64px)

---

### 5. 2D Room Vector Canvas (`RoomVisualizer`)
**Props:**
- `roomType`: RoomType identifier
- `spaceCategory`: 'interior' | 'exterior'
- `wallColor`: Primary wall hex string
- `accentColor`: Accent wall hex string
- `ceilingColor`: Ceiling hex string
- `trimColor`: Trim/Door hex string
- `lightingMood`: 'warm_evening' | 'bright_daylight' | 'golden_sunset' | 'soft_twilight'
