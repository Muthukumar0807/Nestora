import React from 'react';
import { motion } from 'motion/react';
import { NestoAvatar } from './NestoAvatar';
import { NestoMood } from '../../types';

interface NestoBubbleProps {
  message: string;
  mood?: NestoMood;
  title?: string;
  quickChoices?: { label: string; action: () => void; active?: boolean }[];
  className?: string;
  compact?: boolean;
}

export const NestoBubble: React.FC<NestoBubbleProps> = ({
  message,
  mood = 'guiding',
  title = 'Nesto says',
  quickChoices,
  className = '',
  compact = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#F4EFE6] border border-[#E2D8C7] rounded-2xl p-3.5 sm:p-4 text-[#1C1E1B] shadow-xs relative flex items-start gap-3 ${className}`}
    >
      <NestoAvatar mood={mood} size={compact ? 'sm' : 'md'} showBadge={!compact} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F5B34]">
            {title}
          </span>
          <span className="text-[10px] text-[#6B726B] font-medium">Baya Weaver Companion</span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-[#2C332D] font-normal">
          {message}
        </p>

        {quickChoices && quickChoices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {quickChoices.map((choice, i) => (
              <button
                key={i}
                onClick={choice.action}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  choice.active
                    ? 'bg-[#234B38] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#234B38] border border-[#D5CABB] hover:border-[#234B38] hover:bg-white'
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
