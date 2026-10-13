import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CustomizedDesign, ProjectNest } from '../types';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import { ScoreCard } from '../components/common/ScoreCard';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  Share2,
  Download,
  PlusCircle,
  Layers,
  Printer,
  Heart,
  Home,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface CompletionPageProps {
  design: CustomizedDesign;
  project: ProjectNest;
  onSaveToMyNest: () => void;
  onStartAnotherRoom: () => void;
  onViewMyNest: () => void;
}

export const CompletionPage: React.FC<CompletionPageProps> = ({
  design,
  project,
  onSaveToMyNest,
  onStartAnotherRoom,
  onViewMyNest,
}) => {
  // Peak-End Rule Confetti Celebration
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#234B38', '#C28E58', '#E5A83B', '#B86A4C', '#FAF8F5'],
      });
    } catch (e) {}
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Nestora — ${design.name}`,
          text: `Check out our dream home design weaved with Nesto on Nestora! Nest Score: ${design.score.overall}/100`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Design link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. CELEBRATION HEADER (Peak-End Rule) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 bg-gradient-to-b from-[#FAF4EA] to-[#F4EFE6] border border-[#E3D8C6] rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden"
      >
        <NestoAvatar mood="celebrating" size="xl" className="mx-auto mb-2" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A83B]" />
          <span>Nest Weaved Successfully</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
          Your Nest is Ready!
        </h1>

        <p className="text-sm sm:text-base text-[#4A524A] max-w-xl mx-auto leading-relaxed">
          "Beautiful work! You have crafted a balanced, luminous sanctuary. Here is your full design blueprint ready for execution."
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onSaveToMyNest}
            className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save to My Nest</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-white border border-[#D5CABB] hover:border-[#234B38] text-[#2C332D] text-sm font-semibold hover:bg-[#FAF8F5] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Design</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-3 rounded-2xl bg-white border border-[#D5CABB] hover:border-[#234B38] text-[#2C332D] text-sm font-semibold hover:bg-[#FAF8F5] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Specification</span>
          </button>
        </div>
      </motion.div>

      {/* 2. DESIGN BLUEPRINT SPECIFICATION SHEET */}
      <div className="bg-white rounded-3xl border border-[#E0D7C6] p-6 sm:p-8 space-y-8 shadow-xs print:border-none print:shadow-none">
        {/* Specification Top Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE2D2] gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F5B34]">
              Specification Sheet
            </span>
            <h2 className="text-2xl font-bold text-[#1E3F30] font-['Plus_Jakarta_Sans']">
              {design.name}
            </h2>
            <div className="text-xs text-[#6B726B] mt-1 flex flex-wrap items-center gap-3">
              <span>Space: {design.roomType.replace('_', ' ').toUpperCase()}</span>
              <span>•</span>
              <span>Style: {design.style}</span>
              <span>•</span>
              <span>Finish: {design.finish} Sheen</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#EBF2EE] border border-[#234B38]/20 text-center">
              <span className="text-[10px] font-bold text-[#8F5B34] uppercase block">Nest Score</span>
              <span className="text-2xl font-black text-[#234B38]">{design.score.overall}/100</span>
            </div>
          </div>
        </div>

        {/* Visualizer Snapshot */}
        <div className="rounded-2xl overflow-hidden border border-[#E3DACB]">
          <RoomVisualizer
            roomType={design.roomType}
            spaceCategory={design.spaceCategory}
            wallColor={design.wallColor}
            accentColor={design.accentColor}
            ceilingColor={design.ceilingColor}
            trimColor={design.trimColor}
            lightingMood={design.lightingMood}
            finish={design.finish}
            interactive={false}
          />
        </div>

        {/* Exact Paint Swatch Breakdown */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#1E3F30]">
            Exact Paint & Coating Palette
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Feature Accent Wall', color: design.accentColor, finish: design.finish },
              { label: 'Main Perimeter Wall', color: design.wallColor, finish: 'Eggshell / Matte' },
              { label: 'Ceiling Tone', color: design.ceilingColor, finish: 'Flat Matte' },
              { label: 'Trims & Baseboards', color: design.trimColor, finish: 'Satin / Enamel' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E3DACB] space-y-2">
                <div
                  className="w-full h-14 rounded-xl border border-black/10 shadow-2xs"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <span className="text-xs font-bold text-[#1C1E1B] block">{item.label}</span>
                  <span className="font-mono text-xs text-[#8F5B34] font-semibold">{item.color}</span>
                  <span className="text-[10px] text-[#6B726B] block mt-0.5">{item.finish}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nest Score Analysis Card */}
        <ScoreCard score={design.score} />

        {/* Execution Guidance for Painter / Contractor */}
        <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E2D8C6] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8F5B34]">
            <ShieldCheck className="w-4 h-4 text-[#234B38]" />
            <span>Painter / Contractor Execution Checklist:</span>
          </div>

          <ul className="text-xs text-[#3D473E] space-y-1.5 list-disc list-inside leading-relaxed">
            <li>Apply 2 coats of low-VOC breathable primer before coating with <span className="font-mono font-bold text-[#1C1E1B]">{design.wallColor}</span>.</li>
            <li>Feature accent wall <span className="font-mono font-bold text-[#1C1E1B]">{design.accentColor}</span> should be applied with {design.finish} roller for consistent texture without stipple marks.</li>
            <li>Maintain warm 2700K–3000K LED lighting to faithfully replicate the previewed warmth.</li>
          </ul>
        </div>
      </div>

      {/* 3. NEXT ACTIONS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          onClick={onViewMyNest}
          className="px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#D5CABB] hover:border-[#234B38] text-xs sm:text-sm font-bold text-[#2C332D] hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          <span>Go to My Nest</span>
        </button>

        <button
          onClick={onStartAnotherRoom}
          className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Design Another Room</span>
        </button>
      </div>
    </div>
  );
};
