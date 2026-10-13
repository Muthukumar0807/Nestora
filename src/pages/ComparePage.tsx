import React from 'react';
import { motion } from 'motion/react';
import { CustomizedDesign, DesignRecommendation, UserPreferences } from '../types';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { NestoBubble } from '../components/common/NestoBubble';
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
  Sun,
  ShieldCheck,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

interface ComparePageProps {
  designA: CustomizedDesign | DesignRecommendation;
  designB: CustomizedDesign | DesignRecommendation;
  preferences: UserPreferences;
  onSelectWinner: (chosen: CustomizedDesign | DesignRecommendation) => void;
  onBackToStudio: () => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  designA,
  designB,
  preferences,
  onSelectWinner,
  onBackToStudio,
}) => {
  const getDesignColors = (d: any) => {
    return {
      wall: d.wallColor || d.palette.primaryWall.hex,
      accent: d.accentColor || d.palette.accentWall.hex,
      ceiling: d.ceilingColor || d.palette.ceiling.hex,
      trim: d.trimColor || d.palette.trim.hex,
      finish: d.finish || d.palette.primaryWall.finish || 'Matte',
      mood: d.lightingMood || 'warm_evening',
      score: d.score?.overall || 90,
    };
  };

  const colorsA = getDesignColors(designA);
  const colorsB = getDesignColors(designB);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToStudio}
            className="flex items-center gap-1.5 text-xs font-bold text-[#6B726B] hover:text-[#1C1E1B] mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Studio Visualizer</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            Design Comparison: Side-by-Side
          </h1>
          <p className="text-xs sm:text-sm text-[#6B726B] mt-0.5">
            Compare color acoustics, reflectance values, and atmosphere side-by-side to choose with confidence.
          </p>
        </div>
      </div>

      {/* Nesto's Comparative Verdict */}
      <NestoBubble
        mood="explaining"
        title="Nesto's Comparative Analysis"
        message={`"${designA.name}" offers a more spacious, high-reflectance daylight feeling, whereas "${designB.name}" creates a cozier, warmer evening retreat. Both harmonize well with your ${preferences.flooring.replace(/_/g, ' ')}.`}
      />

      {/* Side by Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* DESIGN A */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-5 shadow-xs flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F5B34] bg-[#F7EFE6] px-2.5 py-0.5 rounded-full">
                  Option A
                </span>
                <h3 className="text-xl font-bold text-[#1E3F30] mt-1">{designA.name}</h3>
                <span className="text-xs font-medium text-[#6B726B]">{designA.style}</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#6B726B] uppercase">Nest Score</span>
                <span className="text-xl font-black text-[#234B38]">{colorsA.score}/100</span>
              </div>
            </div>

            {/* Visualizer Mini Canvas */}
            <div className="rounded-2xl overflow-hidden border border-[#E3DACB]">
              <RoomVisualizer
                roomType={preferences.roomType}
                spaceCategory={preferences.spaceCategory}
                wallColor={colorsA.wall}
                accentColor={colorsA.accent}
                ceilingColor={colorsA.ceiling}
                trimColor={colorsA.trim}
                lightingMood={colorsA.mood}
                finish={colorsA.finish}
                interactive={false}
              />
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC5]">
                <span className="text-[10px] font-semibold text-[#8F5B34] block">Atmosphere</span>
                <span className="font-bold text-[#1C1E1B]">Luminous & Spacious</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC5]">
                <span className="text-[10px] font-semibold text-[#8F5B34] block">Maintenance</span>
                <span className="font-bold text-[#234B38]">Low Effort (Wipeable)</span>
              </div>
            </div>

            {/* Swatch chips */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#EFE8DC]">
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsA.wall }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Main Wall</span>
              </div>
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsA.accent }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Feature Accent</span>
              </div>
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsA.ceiling }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Ceiling</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectWinner(designA)}
            className="w-full py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Choose Design A</span>
          </button>
        </motion.div>

        {/* DESIGN B */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-5 shadow-xs flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F5B34] bg-[#F7EFE6] px-2.5 py-0.5 rounded-full">
                  Option B
                </span>
                <h3 className="text-xl font-bold text-[#1E3F30] mt-1">{designB.name}</h3>
                <span className="text-xs font-medium text-[#6B726B]">{designB.style}</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#6B726B] uppercase">Nest Score</span>
                <span className="text-xl font-black text-[#234B38]">{colorsB.score}/100</span>
              </div>
            </div>

            {/* Visualizer Mini Canvas */}
            <div className="rounded-2xl overflow-hidden border border-[#E3DACB]">
              <RoomVisualizer
                roomType={preferences.roomType}
                spaceCategory={preferences.spaceCategory}
                wallColor={colorsB.wall}
                accentColor={colorsB.accent}
                ceilingColor={colorsB.ceiling}
                trimColor={colorsB.trim}
                lightingMood={colorsB.mood}
                finish={colorsB.finish}
                interactive={false}
              />
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC5]">
                <span className="text-[10px] font-semibold text-[#8F5B34] block">Atmosphere</span>
                <span className="font-bold text-[#1C1E1B]">Spacious & Bright</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC5]">
                <span className="text-[10px] font-semibold text-[#8F5B34] block">Priority Fit ({preferences.userPriority || 'Balance'})</span>
                <span className="font-bold text-[#234B38]">94% Match</span>
              </div>
            </div>

            {/* Swatch chips */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#EFE8DC]">
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsB.wall }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Main Wall</span>
              </div>
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsB.accent }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Feature Accent</span>
              </div>
              <div className="flex-1 text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/10"
                  style={{ backgroundColor: colorsB.ceiling }}
                />
                <span className="text-[9px] text-[#6B726B] block mt-1">Ceiling</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectWinner(designB)}
            className="w-full py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Choose Design B</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
