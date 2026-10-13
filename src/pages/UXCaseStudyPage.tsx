import React from 'react';
import { motion } from 'motion/react';
import { UX_LAWS_DOCUMENTATION } from '../data/mockData';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { BookOpen, CheckCircle2, Sparkles, Award, Compass, Layers } from 'lucide-react';

export const UXCaseStudyPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-[#234B38] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5A83B] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic UX Traceability & Architecture</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans']">
          UX Psychology & Laws in Nestora
        </h1>

        <p className="text-sm sm:text-base text-[#E5DEC3] max-w-3xl leading-relaxed">
          Nestora is designed as an intentional, decision-support product. Rather than merely presenting features, every component, micro-interaction, and progressive flow is directly grounded in established cognitive psychology and UX laws.
        </p>
      </div>

      {/* Grid of UX Laws Traceability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {UX_LAWS_DOCUMENTATION.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#1E3F30]">{item.law}</h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#234B38]">
                  Verified
                </span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC5] text-xs text-[#526658] mb-3 italic">
                "{item.definition}"
              </div>

              <div className="text-xs text-[#2C332D] space-y-1">
                <span className="font-bold text-[#8F5B34] block">How Nestora Implements It:</span>
                <p className="leading-relaxed text-[#3D473E]">{item.nestoraApplication}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Methodology Summary */}
      <div className="p-6 bg-[#F4EFE6] rounded-3xl border border-[#E2D8C6] flex items-start gap-4">
        <NestoAvatar mood="explaining" size="lg" />
        <div className="text-xs sm:text-sm text-[#2C332D] space-y-1.5">
          <h4 className="font-bold text-[#1E3F30] text-base">User-Centered Product Craftsmanship</h4>
          <p className="leading-relaxed text-[#4A524A]">
            By transforming interior design complexity into intuitive feeling-based choices, Nestora shifts cognitive load away from the user (Tesler's Law) and preserves momentum (Goal-Gradient Effect) toward building a harmonious dream home.
          </p>
        </div>
      </div>
    </div>
  );
};
