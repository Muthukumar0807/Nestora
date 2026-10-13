import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { Layout, CheckCircle2, ArrowRight, ArrowLeft, Layers, Compass, HelpCircle } from 'lucide-react';

interface WireframeStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  primaryAction: string;
  secondaryAction: string;
  nestoRole: string;
  uxPrinciple: string;
  layoutStructure: string[];
}

const WIREFRAME_STEPS: WireframeStep[] = [
  {
    id: 'wf-landing',
    number: '01',
    title: 'Landing Page Wireframe',
    subtitle: 'Entry Header & Value Proposition Hero',
    purpose: 'Communicate Nestora philosophy and drive new user conversion without cognitive overload.',
    primaryAction: 'Start Building My Nest',
    secondaryAction: 'Explore Inspiration',
    nestoRole: 'Contextual companion introduce Baya Weaver philosophy.',
    uxPrinciple: 'Von Restorff Effect (highlighted green CTA), Aesthetic-Usability Effect',
    layoutStructure: [
      'Top Nav Header: [Logo] | Home | Build Nest | Inspiration | [Ask Nesto Button]',
      'Hero Container: Headline ("Build Your Dream Home") + Subtitle + Dual Action Buttons',
      'Companion Teaser Card: Mascot Nesto Avatar + Speech Bubble ("Hi! Ready to build?")',
      'Value Props Grid (3 Cards): Guided Choice | Explainable AI | Budget Fit',
      'Footer Links: UX Rationale | Design System | Wireframe Guide',
    ],
  },
  {
    id: 'wf-dashboard',
    number: '02',
    title: 'User Dashboard Wireframe',
    subtitle: 'Zeigarnik Momentum Hub & Project Navigator',
    purpose: 'Prompt resumption of unfinished nests and display active project states cleanly.',
    primaryAction: 'Start New Nest',
    secondaryAction: 'Resume In-Progress Nest',
    nestoRole: 'Greets user warmly and highlights unfinished nest progress.',
    uxPrinciple: 'Zeigarnik Effect (unfinished task banner), Hick\'s Law (3-5 active choices)',
    layoutStructure: [
      'Welcome Banner: Greeting + User Level Rank + Active Nesto Avatar',
      'Zeigarnik Action Banner: "Living Room Nest - 75% Complete" [Resume Button]',
      'Space Creation Bar: Quick Toggle [Interior Space] vs [Exterior Elevation]',
      'Active Projects Carousel: 3 Cards (Living Room, Bedroom, Front Elevation)',
      'Curated Inspiration Palette Strip: 4 Quick Apply Color Cards',
    ],
  },
  {
    id: 'wf-wizard',
    number: '03',
    title: 'Design Wizard Configurator',
    subtitle: 'Step 1 to 5 Progressive Preference Collector',
    purpose: 'Chunk complex room parameters into simple visual card choices.',
    primaryAction: 'Continue to Next Step',
    secondaryAction: 'Back / Previous Step',
    nestoRole: 'Explains technical lighting and room size considerations in plain language.',
    uxPrinciple: 'Miller\'s Law (chunking 5 steps), Goal-Gradient Effect (Progress percentage)',
    layoutStructure: [
      'Wizard Top Bar: Progress Bar (Step 3 of 5 - 60%) + Back Control',
      'Step Container: "What atmosphere do you want to create?"',
      'Visual Card Selection Matrix (6 Cards): Calm & Peaceful | Warm & Cozy | Modern Minimal | etc.',
      'Lighting & Space Detail Form: Light Level (Low/Med/High) | Room Size (Compact/Spacious)',
      'Bottom Action Dock: [Back Button] -------- [Continue Button]',
    ],
  },
  {
    id: 'wf-recommendations',
    number: '04',
    title: 'Recommendations Overview',
    subtitle: '3-5 Curated Design Cards with Explainable AI Rationale',
    purpose: 'Provide limited, high-fit design options with explicit "Why This Works" rationale.',
    primaryAction: 'Visualize & Customize This Nest',
    secondaryAction: 'Why You Might Not Choose It',
    nestoRole: 'Presents tailored recommendations based on LRV light reflection and budget.',
    uxPrinciple: 'Hick\'s Law (strictly 3 options), Recognition over Recall',
    layoutStructure: [
      'Header: "3 Curated Nests Recommended for Your Living Room"',
      'Recommendation Card Grid (3 Columns):',
      '  - Card Header: Design Title + Style Pill + Match Score (96%)',
      '  - Swatch Strip: Wall Color, Accent Color, Ceiling Color, Trim Color',
      '  - Rationale Box: "Why This Works" (Natural light complement + Budget tier fit)',
      '  - Card Action: [Visualize & Customize Nest Button]',
    ],
  },
  {
    id: 'wf-visualizer',
    number: '05',
    title: '2D Workspace Visualizer',
    subtitle: 'Interactive Recolorable Room Vector Canvas',
    purpose: 'Allow safe, non-destructive experimentation with instant visual feedback.',
    primaryAction: 'Save Version & Compare',
    secondaryAction: 'Undo / Redo / Reset',
    nestoRole: 'Suggests complementary accent colors when user selects main wall tone.',
    uxPrinciple: 'Visibility of System Status, User Control & Freedom (1-click Undo)',
    layoutStructure: [
      'Workspace Header: [Undo] [Redo] [Reset] | Title | [Save Version] [Compare]',
      'Main Canvas (Left 65%): 2D Vector SVG Room (Walls, Accent, Ceiling, Furniture overlay)',
      'Control Drawer (Right 35%): Accordion Tabs for Main Wall, Accent Wall, Ceiling, Lighting Mood',
      'Swatch Picker Palette: 8 Curated Colors with LRV rating & Finish tags',
      'Bottom Status Bar: Current Palette Summary & Nest Score Indicator (94/100)',
    ],
  },
  {
    id: 'wf-compare',
    number: '06',
    title: 'Side-by-Side Comparison',
    subtitle: 'Dual Viewport & Metric Breakdown Matrix',
    purpose: 'Help users resolve hesitation between two favorite versions confidently.',
    primaryAction: 'Select Winning Nest Design',
    secondaryAction: 'Return to Visualizer',
    nestoRole: 'Summarizes key tradeoffs (e.g. Version A is brighter; Version B has lower maintenance).',
    uxPrinciple: 'Miller\'s Law, Fitts\'s Law (prominent winner selection CTAs)',
    layoutStructure: [
      'Compare Top Bar: "Comparing Version 1 vs Version 2" | [Back to Workspace]',
      'Dual Preview Split (50/50): Left Room Canvas (Version 1) | Right Room Canvas (Version 2)',
      'Metric Comparison Table:',
      '  - Style Match Score: 94% vs 88%',
      '  - Lighting Suitability: Bright & Airy vs Warm & Evening',
      '  - Maintenance Index: Low Effort vs Moderate Care',
      '  - Budget Tier: Tier 1 ($) vs Tier 2 ($$)',
      'Bottom Dual CTAs: [Choose Version 1] ---------- [Choose Version 2]',
    ],
  },
];

export const WireframesPage: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = WIREFRAME_STEPS[activeStepIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-[#173C35] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5EBDD] text-xs font-bold uppercase tracking-wider">
          <Layout className="w-3.5 h-3.5" />
          <span>Phase 2 Deliverable • Low-Fidelity Wireframes</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Inter']">
          Structural Layout & Navigation Blueprint
        </h1>

        <p className="text-sm sm:text-base text-[#F5EBDD]/90 max-w-3xl leading-relaxed">
          Interactive low-fidelity wireframe specification outlining screen hierarchy, structural component placement, mascot integration, and UX principle mappings prior to high-fidelity visual styling.
        </p>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {WIREFRAME_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-[#F5EBDD] text-[#173C35] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {step.number}. {step.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Wireframe Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wireframe Mockup Canvas (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-[#795548]/20 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#24312D]/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#173C35] text-white flex items-center justify-center font-bold text-xs">
                {currentStep.number}
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-[#24312D]">{currentStep.title}</h3>
                <p className="text-xs text-[#795548] font-medium">{currentStep.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => prev - 1)}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                aria-label="Previous Wireframe"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeStepIndex === WIREFRAME_STEPS.length - 1}
                onClick={() => setActiveStepIndex((prev) => prev + 1)}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                aria-label="Next Wireframe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grayscale Wireframe Representation */}
          <div className="bg-[#F8F9FA] rounded-2xl border-2 border-dashed border-gray-300 p-6 space-y-4 font-mono text-xs text-gray-700">
            <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg border border-gray-300">
              <span className="font-bold">[HEADER NAV: NESTORA LOGO]</span>
              <span className="text-[10px] bg-gray-300 px-2 py-1 rounded">[NAV LINKS]</span>
            </div>

            <div className="space-y-3 py-2">
              {currentStep.layoutStructure.map((line, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-lg border border-gray-300 shadow-2xs font-sans text-xs text-gray-800 leading-relaxed"
                >
                  <span className="font-bold text-gray-500 mr-2">#{i + 1}</span>
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg border border-gray-300">
              <span className="text-[11px] font-semibold text-gray-600">Primary CTA: {currentStep.primaryAction}</span>
              <span className="text-[11px] text-gray-500">Secondary: {currentStep.secondaryAction}</span>
            </div>
          </div>
        </div>

        {/* Structural Specifications Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#F5EBDD] rounded-3xl border border-[#795548]/30 p-6 space-y-4">
            <h4 className="text-sm font-bold text-[#173C35] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>UX & Structural Specs</span>
            </h4>

            <div className="space-y-3 text-xs text-[#24312D]">
              <div>
                <span className="font-bold text-[#795548] block">Screen Purpose:</span>
                <p className="leading-relaxed">{currentStep.purpose}</p>
              </div>

              <div>
                <span className="font-bold text-[#795548] block">Primary UX Law:</span>
                <p className="font-semibold text-[#173C35]">{currentStep.uxPrinciple}</p>
              </div>

              <div>
                <span className="font-bold text-[#795548] block">Nesto Companion Role:</span>
                <p className="leading-relaxed">{currentStep.nestoRole}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#173C35] text-white rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <NestoAvatar mood="explaining" size="md" />
              <div>
                <h5 className="font-bold text-sm text-[#F5EBDD]">Nesto Structural Note</h5>
                <p className="text-xs text-white/80 leading-relaxed">
                  Low-fidelity layouts prioritize structural recognition over decorative polish. Once verified, Phase 4 renders high-fidelity production components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
