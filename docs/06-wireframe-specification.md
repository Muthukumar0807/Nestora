# Phase 2 — Structural Low-Fidelity Wireframe Specifications

## 1. Overview & Objectives
Phase 2 defines the low-fidelity structural wireframes for all 26 key screens/views in Nestora.
Wireframes focus on content hierarchy, component placement, navigation flow, and CTA positioning using grayscale layouts and clear structural boundaries without high-fidelity visual decoration.

---

## 2. Low-Fidelity Wireframe Index (26 Key Screens)

### Core Journey Wireframes

#### WF-01: Landing Page
- **Header:** Logo (left), Navigation links (Center), "Start Building" CTA (Right)
- **Hero Section:** Headline block, Subtitle, Dual CTAs ("Start Building My Nest", "Explore Inspiration"), Nesto Companion Card
- **Value Proposition:** 3 Grid Blocks (Guided Choice, Explainable Recommendations, Budget-Aware)
- **Interactive Teaser:** Mini room preview box with quick color swatches
- **Footer:** Links, UX Case Study link, Copyright

#### WF-02: Onboarding
- **Progress Bar:** 3-step indicator at top
- **Illustration Box:** Grayscale wireframe vector placeholder
- **Content:** Title ("Visualize Before You Commit"), Paragraph
- **Actions:** Secondary "Skip", Primary "Next"

#### WF-03: Personalization
- **Question Container:** "How experienced are you with interior design?"
- **Selection Cards:** 3 options (Beginner, Intermediate, Enthusiast) with radio indicators
- **Actions:** "Continue" button enabled on selection

#### WF-04: Dashboard
- **Welcome Banner:** User name greeting, Nesto mascot avatar + speech bubble
- **In-Progress Card (Zeigarnik):** Active Nest image, Progress bar, "Resume Building" CTA
- **Action Hub:** "Start New Nest" primary card with Interior / Exterior toggle buttons
- **Recent Projects Carousel:** 3 Saved Nest cards with title, room type, date, status pill

#### WF-05: Create Nest Wizard (Space Category)
- **Wizard Header:** Step 1 of 5 progress indicator, Back button
- **Content:** Dual choice cards (Interior Space vs Exterior Elevation)
- **Actions:** Continue button (Disabled until choice made)

#### WF-06: Room / Space Selection
- **Wizard Header:** Step 2 of 5
- **Grid:** 6 Room Cards (Living Room, Bedroom, Kitchen, Dining, Bathroom, Study Room) with icon placeholders
- **Actions:** Back / Continue

#### WF-07: Home Information & Lighting
- **Wizard Header:** Step 3 of 5
- **Form Groups:** Light level toggle (Low / Medium / High), Room Size radio group, Flooring style selector
- **Actions:** Back / Continue

#### WF-08: Design Goal & Atmosphere
- **Wizard Header:** Step 4 of 5
- **Choice Matrix:** 6 Goal Cards (Calm & Peaceful, Spacious & Airy, Warm & Cozy, etc.)
- **Actions:** Back / Continue

#### WF-09: Style Selection
- **Wizard Header:** Step 5 of 5
- **Style Grid:** 6 Style Cards (Modern Minimal, Warm Earth, Scandinavian, etc.) with thumbnail placeholders
- **Actions:** Back / "Generate Recommendations"

#### WF-10: Color Preferences & Dislikes
- **Section:** Preferred color family chips, Disliked colors multi-select
- **Nesto Note:** "I'll make sure to exclude colors you dislike from recommendations."

#### WF-11: Budget Selection
- **Inputs:** Tier buttons (Budget-Friendly, Moderate, Premium, Luxury), Focus dropdown (Paint, Furniture, Lighting)
- **Nesto Helper:** Explanation of budget impact on finish types

#### WF-12: Recommendations Overview
- **Header:** "3 Curated Nests Recommended for You"
- **Card Grid:** 3 Recommendation Cards (Name, Style match %, Color swatches, Budget tier, Preview image placeholder)
- **Primary CTA:** "Visualize This Nest" button on each card

#### WF-13: "Why This Recommendation" Detail Modal / Drawer
- **Drawer Header:** Design Name + Match Score
- **Section A:** "Why This Works for Your Space" (Bulleted design rationale: light LRV match, mood match)
- **Section B:** "Why You Might Not Choose It" (Maintenance notice, contrast caveat)
- **Action:** "Apply & Open Visualizer"

#### WF-14: 2D Visualization Workspace
- **Layout:** 2-Column Desktop split (Left: 2D recolorable SVG canvas, Right: Customization controls panel)
- **Canvas Area:** Interactive room SVG vector with labeled regions (Main Wall, Accent Wall, Ceiling, Trim)
- **Top Bar:** Undo, Redo, Reset, Save Version, Compare actions

#### WF-15: Customization Panel
- **Accordion 1:** Main Wall Color (Swatch picker with LRV rating & color name)
- **Accordion 2:** Accent Wall Color
- **Accordion 3:** Lighting Mood (Warm Evening, Bright Daylight, Sunset)
- **Accordion 4:** Paint Finish (Matte, Satin, Eggshell)

#### WF-16: Version History Panel
- **Sidebar Drawer:** List of saved snapshots (Version 1, Version 2) with timestamp and thumbnail
- **Action:** "Compare Selected Versions"

#### WF-17: Side-by-Side Comparison
- **Layout:** Dual viewport split (Left: Version A, Right: Version B)
- **Difference Matrix:** Table comparing Style, Palette, Budget Tier, Maintenance score, Lighting suitability
- **Primary CTAs:** "Choose Version A" / "Choose Version B"

#### WF-18: Nest Score Breakdown
- **Card Container:** Overall Nest Score (e.g. 92/100)
- **Sub-scores:** Color Harmony (25/25), Lighting Compatibility (22/25), Budget Fit (25/25), Practicality (20/25)
- **Explanations:** Text explanation for each sub-score rating

#### WF-19: My Nest Management
- **Tab Bar:** Active Nests (2), Completed Nests (5), Saved Drafts (1)
- **Card Actions:** Resume, Duplicate, Share, Delete (with confirmation modal)

#### WF-20: Nest Completion Screen
- **Hero:** Celebratory badge, Final room render preview
- **Summary Box:** Selected Palette chips, Finish, Nest Score, Estimated Paint volume/cost category
- **Actions:** Download Summary Sheet, Share Link, Start Next Room

---

### Supporting Feature Wireframes

#### WF-21: Nesto Companion Chat Drawer
- **Drawer Layout:** Slide-over from right
- **Message Feed:** Nesto avatar + contextual suggestions
- **Quick Buttons:** "Suggest Accent Color", "I'm Confused", "Explain LRV"

#### WF-22: Inspiration Gallery
- **Filter Bar:** Space (Interior/Exterior), Style dropdown, Atmosphere pills
- **Grid Layout:** 3-column photo cards with palette overlay on hover
- **Action:** "Use This Palette"

#### WF-23: Design History Modal
- **Timeline View:** Chronological list of user edits in active session with revert buttons

#### WF-24: Design Challenge Screen
- **Banner:** "Monthly Small Space Challenge"
- **Constraints Box:** Fixed room parameters & target budget
- **Action:** "Accept Challenge & Start Nest"

#### WF-25: Family Voting Modal
- **Header:** "Ask Your Family to Vote"
- **Voting Options:** 2 design options side-by-side with vote buttons ("Love it", "Needs tweaking")
- **Comments Feed:** List of family feedback notes

#### WF-26: Profile & Settings
- **User Rank Box:** Current Rank ("Baya Weaver Level 2"), XP bar, Badges
- **Preference Settings:** Default light level, accessibility toggles
- **Data Management:** "Reset Local Prototype Data" with warning confirm
