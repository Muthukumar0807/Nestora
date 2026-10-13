import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { Logo } from '../components/common/Logo';
import { Palette, Layers, CheckCircle2, Sparkles, Sliders, Type, Grid, Heart } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<'neutral' | 'happy' | 'thinking' | 'explaining' | 'curious' | 'celebrating' | 'concerned'>('explaining');
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'components' | 'nesto'>('tokens');

  const colorTokens = [
    { name: 'Primary Forest Green', hex: '#173C35', role: 'Brand Core, Headers, Primary CTAs', textDark: false },
    { name: 'Secondary Earthy Brown', hex: '#795548', role: 'Secondary Accents, Card Outlines', textDark: false },
    { name: 'Background Warm Cream', hex: '#F5EBDD', role: 'Main Page Canvas, Subtle Surfaces', textDark: true },
    { name: 'Surface Pure White', hex: '#FFFFFF', role: 'Card Shells, Input Containers', textDark: true },
    { name: 'Deep Charcoal Text', hex: '#24312D', role: 'Body Typography & High-Contrast Headings', textDark: false },
    { name: 'Botanical Sage Success', hex: '#386641', role: 'High Nest Score, Success Toast', textDark: false },
    { name: 'Warm Amber Warning', hex: '#E5A83B', role: 'Nesto Highlights, Caution Alerts', textDark: fontContrast('#E5A83B') },
    { name: 'Terracotta Rust Error', hex: '#BC4749', role: 'Destructive Modals, Error Badges', textDark: false },
  ];

  function fontContrast(hex: string) {
    return hex === '#E5A83B' || hex === '#F5EBDD' || hex === '#FFFFFF';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-[#173C35] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5EBDD] text-xs font-bold uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5" />
          <span>Phase 3 Deliverable • Design System Showcase</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Inter']">
          Nestora Design Tokens & Component Library
        </h1>

        <p className="text-sm sm:text-base text-[#F5EBDD]/90 max-w-3xl leading-relaxed">
          Comprehensive production design system featuring strictly enforced brand palettes, Inter typography scale, Baya Weaver mascot expressions, and accessible UI component guidelines.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: 'tokens', label: 'Color Tokens' },
            { id: 'typography', label: 'Typography Scale' },
            { id: 'components', label: 'UI Components' },
            { id: 'nesto', label: 'Nesto Expressions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#F5EBDD] text-[#173C35] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. COLOR TOKENS */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="border-b border-[#795548]/20 pb-2">
            <h2 className="text-xl font-bold text-[#173C35] flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#795548]" />
              Strict Brand Color System
            </h2>
            <p className="text-xs text-[#795548]">
              Application UI strictly follows 2 primary brand colors + warm cream background. Realistic paint colors exist only inside the 2D room canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((token) => (
              <div
                key={token.hex}
                className="rounded-2xl border border-[#795548]/20 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-shadow"
              >
                <div
                  className="h-28 p-4 flex flex-col justify-between"
                  style={{ backgroundColor: token.hex, color: token.textDark ? '#24312D' : '#FFFFFF' }}
                >
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/10 backdrop-blur-xs w-fit">
                    {token.hex}
                  </span>
                  <span className="font-bold text-sm">{token.name}</span>
                </div>
                <div className="p-3 text-xs text-[#24312D] space-y-1 bg-[#FAF8F5]">
                  <span className="font-semibold text-[#795548] block">Role:</span>
                  <p className="text-[11px] text-[#24312D]/80 leading-snug">{token.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TYPOGRAPHY */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          <div className="border-b border-[#795548]/20 pb-2">
            <h2 className="text-xl font-bold text-[#173C35] flex items-center gap-2">
              <Type className="w-5 h-5 text-[#795548]" />
              Inter Typography Scale & Hierarchy
            </h2>
            <p className="text-xs text-[#795548]">
              Clean, highly legible typeface optimized for digital home design decision interfaces.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#795548]/20 p-6 space-y-6 shadow-2xs">
            <div className="space-y-1 pb-4 border-b border-gray-200">
              <span className="text-xs text-gray-500 font-mono">Display H1 • 36px / Extrabold (800)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173C35] font-['Inter']">
                Weave Your Dream Home with Confidence
              </h1>
            </div>

            <div className="space-y-1 pb-4 border-b border-gray-200">
              <span className="text-xs text-gray-500 font-mono">Heading H2 • 28px / Bold (700)</span>
              <h2 className="text-2xl font-bold text-[#173C35] font-['Inter']">
                Curated Living Room Palette Recommendations
              </h2>
            </div>

            <div className="space-y-1 pb-4 border-b border-gray-200">
              <span className="text-xs text-gray-500 font-mono">Heading H3 • 20px / Bold (700)</span>
              <h3 className="text-lg font-bold text-[#795548] font-['Inter']">
                Why This Color Palette Works for Your Space
              </h3>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-mono">Body Text • 14px / Regular (400)</span>
              <p className="text-sm text-[#24312D] leading-relaxed max-w-2xl font-['Inter']">
                Nestora addresses choice overload by offering explainable 3-option recommendations paired with light reflectance ratings, budget suitability indices, and contextual Nesto guidance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. UI COMPONENTS */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="border-b border-[#795548]/20 pb-2">
            <h2 className="text-xl font-bold text-[#173C35] flex items-center gap-2">
              <Grid className="w-5 h-5 text-[#795548]" />
              Reusable Production Components
            </h2>
            <p className="text-xs text-[#795548]">
              Standardized interactive controls with state support (Default, Hover, Active, Disabled).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons Showcase */}
            <div className="bg-white rounded-3xl border border-[#795548]/20 p-6 space-y-4">
              <h3 className="text-base font-bold text-[#173C35]">Button Component Variants</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-[#173C35] text-white font-bold text-xs hover:bg-[#0E2823] cursor-pointer">
                  Primary Forest Green
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-[#795548] text-white font-bold text-xs hover:bg-[#5D4037] cursor-pointer">
                  Secondary Earthy Brown
                </button>
                <button className="px-5 py-2.5 rounded-xl border border-[#173C35] text-[#173C35] font-bold text-xs hover:bg-[#F5EBDD] cursor-pointer">
                  Outline Variant
                </button>
                <button disabled className="px-5 py-2.5 rounded-xl bg-[#173C35]/40 text-white font-bold text-xs cursor-not-allowed">
                  Disabled State
                </button>
              </div>
            </div>

            {/* Logo Component */}
            <div className="bg-white rounded-3xl border border-[#795548]/20 p-6 space-y-4">
              <h3 className="text-base font-bold text-[#173C35]">Brand Logo Variants</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Logo size="lg" />
                <Logo size="md" />
                <Logo size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. NESTO EXPRESSIONS */}
      {activeTab === 'nesto' && (
        <div className="space-y-6">
          <div className="border-b border-[#795548]/20 pb-2">
            <h2 className="text-xl font-bold text-[#173C35] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E5A83B]" />
              Baya Weaver Mascot (Nesto) Mood Expressions
            </h2>
            <p className="text-xs text-[#795548]">
              Contextual companion supporting 7 distinct emotional and guidance expressions.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#795548]/20 p-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              {(['neutral', 'happy', 'thinking', 'explaining', 'curious', 'celebrating', 'concerned'] as const).map(
                (mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      selectedMood === mood
                        ? 'bg-[#173C35] text-white shadow-sm'
                        : 'bg-[#F5EBDD] text-[#173C35] hover:bg-[#EADBCE]'
                    }`}
                  >
                    {mood}
                  </button>
                )
              )}
            </div>

            <div className="p-8 bg-[#F5EBDD] rounded-2xl border border-[#795548]/20 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <NestoAvatar mood={selectedMood} size="xl" />
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173C35] text-white text-xs font-bold capitalize">
                  Current Expression: {selectedMood}
                </div>
                <h4 className="text-lg font-extrabold text-[#173C35]">
                  {selectedMood === 'explaining' && '"Here is why this palette suits your low natural lighting!"'}
                  {selectedMood === 'happy' && '"Your Nest Score reached 94! Beautiful harmony."'}
                  {selectedMood === 'thinking' && '"Analyzing room dimensions and budget constraints..."'}
                  {selectedMood === 'curious' && '"What atmosphere do you want to create in this space?"'}
                  {selectedMood === 'celebrating' && '"Congratulations! Your dream home nest is ready!"'}
                  {selectedMood === 'concerned' && '"Notice: This dark accent wall may reduce perceived space."'}
                  {selectedMood === 'neutral' && '"Hello! I am Nesto, your Baya Weaver companion."'}
                </h4>
                <p className="text-xs text-[#795548]">
                  Clean SVG vector rendering guarantees crisp presentation without broken image dependencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
