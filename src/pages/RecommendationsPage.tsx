import React from 'react';
import { motion } from 'motion/react';
import { DesignRecommendation, UserPreferences } from '../types';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { NestoBubble } from '../components/common/NestoBubble';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Layers,
  Heart,
  Sun,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface RecommendationsPageProps {
  recommendations: DesignRecommendation[];
  preferences: UserPreferences;
  onSelectDesign: (recommendation: DesignRecommendation) => void;
  onCompareDesigns: (recA: DesignRecommendation, recB: DesignRecommendation) => void;
  onOpenWizard: () => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  recommendations,
  preferences,
  onSelectDesign,
  onCompareDesigns,
  onOpenWizard,
}) => {
  const topPick = recommendations[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nesto's Tailored Harmonies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            Curated Designs for Your {preferences.roomType.replace('_', ' ').toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B726B] mt-1">
            Carefully weaved to harmonize with your {preferences.lighting} lighting and {preferences.flooring.replace(/_/g, ' ')}.
          </p>
        </div>

        <button
          onClick={onOpenWizard}
          className="px-4 py-2 rounded-xl bg-white border border-[#D5CABB] text-[#4A524A] hover:text-[#1C1E1B] text-xs font-semibold hover:bg-[#FAF8F5] transition-all self-start md:self-auto cursor-pointer"
        >
          Adjust Preferences
        </button>
      </div>

      {/* Nesto's Overview Dialogue */}
      <NestoBubble
        mood="happy"
        title="Nesto's Rationale"
        message={`I analyzed your natural light and floor tone. I selected these 4 distinct harmonies ranging from peaceful botanical calm to warm terracotta earth. Tap "Visualize in Studio" to test coats in real-time.`}
      />

      {/* Recommendation Cards Grid (Hick's Law 4 cards max) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => {
          const isTopPick = index === 0;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-3xl border p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-md transition-all relative ${
                isTopPick ? 'border-2 border-[#234B38]' : 'border-[#E0D7C6]'
              }`}
            >
              {isTopPick && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#234B38] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Highest Preference Match
                </div>
              )}

              {/* Title & Style */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3F30]">{rec.name}</h3>
                    <span className="text-xs font-semibold text-[#8F5B34]">{rec.style}</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-[#6B726B] uppercase">Nest Score</span>
                    <span className="text-lg font-black text-[#234B38] leading-none">
                      {rec.score.overall}
                      <span className="text-[10px] font-normal text-[#6B726B]">/100</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#526658] leading-relaxed mb-4">{rec.tagline}</p>

                {/* Color Swatch Strip with names */}
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC5] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F5B34] block">
                    Curated Color Palette
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { role: 'Base Wall', swatch: rec.palette.primaryWall },
                      { role: 'Accent Wall', swatch: rec.palette.accentWall },
                      { role: 'Ceiling', swatch: rec.palette.ceiling },
                      { role: 'Trim / Detail', swatch: rec.palette.accentDetails },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="w-full h-8 rounded-lg border border-black/10 shadow-2xs"
                          style={{ backgroundColor: item.swatch.hex }}
                        />
                        <span className="text-[9px] font-bold text-[#2C332D] block mt-1 truncate">
                          {item.swatch.name}
                        </span>
                        <span className="text-[8px] text-[#8F5B34] block font-medium">
                          {item.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Nesto recommends it (Explainability) */}
                <div className="mt-4 space-y-2 text-xs text-[#3D473E]">
                  <div className="flex items-start gap-2 bg-[#F3EFE7] p-2.5 rounded-xl border border-[#E5DEC3]">
                    <NestoAvatar mood="explaining" size="sm" />
                    <div>
                      <span className="font-bold text-[#8F5B34] block">Why Nesto Recommends It:</span>
                      <p className="text-[11px] text-[#2C332D] leading-relaxed mt-0.5">
                        {rec.whyRecommended}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E5DEC3]">
                      <span className="font-semibold text-[#8F5B34] block">Lighting Fit</span>
                      <span className="text-[#4A524A]">{rec.lightingFit}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E5DEC3]">
                      <span className="font-semibold text-[#8F5B34] block">Budget Estimate</span>
                      <span className="text-[#234B38] font-semibold">{rec.estimatedBudgetCategory}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-[#EAE2D2] flex flex-wrap items-center justify-between gap-2">
                {recommendations.length > 1 && (
                  <button
                    onClick={() => {
                      const other = recommendations.find((r) => r.id !== rec.id) || recommendations[1];
                      onCompareDesigns(rec, other);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-[#8F5B34] hover:bg-[#F7EFE6] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Compare with Alternative</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectDesign(rec)}
                  className="ml-auto px-5 py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>Visualize & Customize in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
