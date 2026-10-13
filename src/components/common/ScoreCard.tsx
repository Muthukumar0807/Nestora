import React from 'react';
import { motion } from 'motion/react';
import { NestScoreBreakdown } from '../../types';
import { NestoAvatar } from './NestoAvatar';
import { Sparkles, CheckCircle2, Lightbulb, ShieldCheck, HelpCircle } from 'lucide-react';

interface ScoreCardProps {
  score: NestScoreBreakdown;
  compact?: boolean;
  onOpenDetails?: () => void;
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  compact = false,
  onOpenDetails,
  className = '',
}) => {
  const categories = [
    { label: 'Color Harmony', value: score.colorHarmony, color: 'bg-[#234B38]' },
    { label: 'Lighting Compatibility', value: score.lightingCompatibility, color: 'bg-[#C28E58]' },
    { label: 'Style Consistency', value: score.styleConsistency, color: 'bg-[#2A4D3B]' },
    { label: 'Budget Fit', value: score.budgetFit, color: 'bg-[#8F5B34]' },
    { label: 'Practicality', value: score.practicality, color: 'bg-[#526658]' },
  ];

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-[#234B38]';
    if (val >= 80) return 'text-[#8F5B34]';
    return 'text-[#B86A4C]';
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-3 bg-[#FAF8F5] border border-[#E2D8C7] rounded-xl px-3 py-2 shadow-2xs ${className}`}>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#EBF2EE] border border-[#234B38]/20">
          <span className={`text-sm font-extrabold ${getScoreColor(score.overall)}`}>
            {score.overall}
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#1E3F30] flex items-center gap-1">
            <span>Nest Score</span>
            <span className="text-[10px] font-normal text-[#6B726B]">/ 100</span>
          </div>
          <p className="text-[11px] text-[#4A524A] truncate max-w-[180px]">
            {score.nestoExplanation}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#FAF8F5] border border-[#E3DACB] rounded-2xl p-5 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[#EAE2D5]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#1E3F30]">Nestora Design Guidance Score</h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#EBF2EE] text-[#234B38] rounded-full">
              Holistic Guidance
            </span>
          </div>
          <p className="text-xs text-[#6B726B] mt-0.5">
            Evaluates color acoustics, light exposure, and everyday maintenance harmony.
          </p>
        </div>

        <div className="flex flex-col items-center bg-[#EBF2EE] border border-[#234B38]/20 rounded-2xl px-4 py-2 text-center shrink-0">
          <span className="text-[11px] font-bold text-[#8F5B34] uppercase tracking-wider">Overall</span>
          <span className={`text-2xl font-black ${getScoreColor(score.overall)} leading-tight`}>
            {score.overall}
            <span className="text-xs font-semibold text-[#6B726B]">/100</span>
          </span>
        </div>
      </div>

      {/* Breakdown Criteria Bars */}
      <div className="space-y-3 mb-5">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-[#2C332D]">{cat.label}</span>
              <span className="text-[#1E3F30] font-mono font-bold">{cat.value}%</span>
            </div>
            <div className="w-full h-2 bg-[#EDE7DC] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.value}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`h-full rounded-full ${cat.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Nesto's Advice Section */}
      <div className="bg-[#F3EFE7] rounded-xl p-3.5 border border-[#E0D7C6] flex items-start gap-3">
        <NestoAvatar mood={score.overall >= 90 ? 'celebrating' : 'explaining'} size="sm" />
        <div className="flex-1 text-xs">
          <div className="font-bold text-[#8F5B34] mb-0.5">Nesto's Design Insight</div>
          <p className="text-[#2C332D] leading-relaxed mb-1.5">{score.nestoExplanation}</p>
          {score.improvementTip && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#234B38] font-medium bg-white/70 px-2.5 py-1 rounded-lg border border-[#DCD3C2]">
              <Lightbulb className="w-3.5 h-3.5 text-[#E5A83B] shrink-0" />
              <span>{score.improvementTip}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
