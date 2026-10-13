# Phase 1 — Information Architecture & Site Structure

## 1. Information Hierarchy

```
NESTORA ROOT
├── Entry Experience
│   ├── Landing Page (Value Proposition, Mascot Nesto Intro, How It Works)
│   ├── Onboarding (3-Step Benefits Walkthrough: Explore -> Visualize -> Decide)
│   └── Personalization (Design knowledge level, preferred atmosphere, budget preference)
│
├── Main Dashboard
│   ├── Welcome & Nesto Contextual Greeting
│   ├── Resume Unfinished Nest (Zeigarnik Effect)
│   ├── Quick Start "Build New Nest"
│   └── Saved Nests & Inspiration Carousel
│
├── Design Journey (Wizard to Completion)
│   ├── Step 1: Space Category (Interior vs Exterior)
│   ├── Step 2: Room/Space Type (Living Room, Bedroom, Front Elevation, Balcony, etc.)
│   ├── Step 3: Lighting & Space Details (Light level, room size, flooring type)
│   ├── Step 4: Design Goal & Atmosphere (Calm & Peaceful, Spacious & Airy, Warm & Cozy)
│   ├── Step 5: Preferred Style (Modern Minimal, Warm Earth, Scandinavian, etc.)
│   ├── Step 6: Budget Tier & Focus (Budget-Friendly, Moderate, Premium, Luxury)
│   ├── Recommendations Engine Output (3-5 Curated Palettes + Explanations)
│   ├── 2D Workspace Visualizer (Wall, Accent, Ceiling, Trim, Lighting, Finish toggles)
│   ├── Version History & Side-by-Side Comparison
│   ├── Nest Score Calculation (Color Harmony, Lighting, Budget, Maintenance)
│   └── Completion & Export (Summary Card, Share, Next Room)
│
├── Supporting Experience
│   ├── My Nest (Active, Saved, Completed Projects Management)
│   ├── Inspiration Gallery (Filter by style, instant palette apply)
│   ├── Nesto Companion (Floating drawer with "I'm Confused" quick assistant)
│   ├── Family Voting Prototype (Share link preview, collector for feedback)
│   ├── Nest Challenges (Fun design practice scenarios with XP rewards)
│   ├── Design System Showcase (/design-system)
│   └── Low-Fidelity Wireframes Showcase (/wireframes)
│
└── Account & Settings
    ├── Profile (User level, rank badges: Apprentice -> Baya Weaver)
    └── Local Storage Data Reset
```

---

## 2. Navigation Matrix

| Screen | Desktop Header | Mobile Drawer | Contextual Mascot Prompt |
|---|---|---|---|
| Landing | Logo, Start CTA, Inspiration link | Compact menu | "Hi, I'm Nesto! Ready to build your nest?" |
| Onboarding | Skip button | Top progress indicator | "Let's personalize Nestora for you." |
| Dashboard | Full Navigation | Hamburger Drawer | "Welcome back! Ready to continue your Living Room Nest?" |
| Wizard | Progress Header, Exit button | Top step indicator | "Tell me about your space so I can find the best match." |
| Recommendations | Full Navigation | Hamburger Drawer | "Here are 3 curated options tailored to your lighting and budget." |
| Visualizer | Workspace Header, Undo/Redo/Reset | Compact toolbar | "Tap any wall or palette chip to experiment safely!" |
| Compare | Full Navigation | Top comparison header | "Which version feels more like home?" |
| Completion | Exit to Dashboard | Top header | "Congratulations! Your Nest is complete." |
