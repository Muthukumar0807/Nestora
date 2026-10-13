import React from 'react';
import { motion } from 'motion/react';
import { NestoMood } from '../../types';

interface NestoAvatarProps {
  mood?: NestoMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const NestoAvatar: React.FC<NestoAvatarProps> = ({
  mood = 'happy',
  size = 'md',
  showBadge = false,
  className = '',
}) => {
  const sizePixels = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 88,
  }[size];

  // Motion variants for subtle bird life
  const birdVariants = {
    idle: {
      y: [0, -2, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
    thinking: {
      rotate: [0, -4, 2, 0],
      y: [0, -1, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
    celebrating: {
      y: [0, -6, 0],
      rotate: [-3, 3, -3],
      scale: [1, 1.05, 1],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const currentVariant = mood === 'celebrating' ? 'celebrating' : mood === 'thinking' ? 'thinking' : 'idle';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: sizePixels, height: sizePixels }}
    >
      <motion.div
        className="w-full h-full rounded-2xl bg-gradient-to-b from-[#FAF4EA] to-[#EFE7D8] p-1.5 border border-[#E3D9C9] shadow-sm flex items-center justify-center relative overflow-hidden"
        variants={birdVariants}
        animate={currentVariant}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Woven Halo */}
          <circle cx="50" cy="50" r="44" stroke="#D4A373" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

          {/* Baya Weaver Body (Golden Yellow Crown & Warm Amber Chest) */}
          <path
            d="M32 75C28 65 30 45 42 35C52 26 68 28 72 40C76 52 70 72 58 78C46 84 34 82 32 75Z"
            fill="#E5A83B"
          />

          {/* Warm Earthy Belly Patch */}
          <path
            d="M38 60C38 52 46 45 56 46C64 47 68 56 64 68C60 76 48 76 42 72C39 68 38 64 38 60Z"
            fill="#FAF5EE"
          />

          {/* Baya Wings (Forest Moss Green / Teak) */}
          <path
            d="M28 50C22 58 20 72 26 80C34 82 38 72 40 62C42 54 36 46 28 50Z"
            fill="#234B38"
          />
          <path
            d="M28 56C25 62 25 72 30 76"
            stroke="#D4A373"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Beak with straw / grass thread depending on mood */}
          <path
            d="M68 42L82 45L68 50Z"
            fill="#8F5B34"
          />

          {/* Weaver Straw in beak when celebrating or guiding */}
          {(mood === 'celebrating' || mood === 'guiding' || mood === 'happy') && (
            <path
              d="M74 46C82 48 88 56 86 64"
              stroke="#B86A4C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Eyes depending on mood */}
          {mood === 'thinking' ? (
            <circle cx="62" cy="38" r="3" fill="#1C1E1B" />
          ) : mood === 'celebrating' || mood === 'happy' ? (
            <path
              d="M58 40C60 36 64 36 66 40"
              stroke="#1C1E1B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle cx="62" cy="39" r="3.5" fill="#1C1E1B" />
              <circle cx="63" cy="38" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Crown Feathers (Baya characteristic) */}
          <path
            d="M44 32C46 25 52 22 56 20C54 26 50 30 46 33"
            fill="#C98B27"
          />
        </svg>

        {/* Thinking / mood bubble indicator */}
        {mood === 'thinking' && (
          <div className="absolute top-1 right-1 flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-[#8F5B34] animate-ping" />
            <span className="w-1 h-1 rounded-full bg-[#234B38]" />
          </div>
        )}
      </motion.div>

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-[#234B38] text-[#FAF8F5] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-xs">
          Guide
        </span>
      )}
    </div>
  );
};
