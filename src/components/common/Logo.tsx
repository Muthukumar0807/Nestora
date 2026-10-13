import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  size = 'md',
  showTagline = true,
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;

  return (
    <motion.button
      id="nestora-logo-btn"
      onClick={onClick}
      className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#234B38] rounded-xl px-1.5 py-1 transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Baya Weaver Nest + Bird + House emblem */}
      <div
        className="relative flex items-center justify-center rounded-2xl bg-[#234B38] text-[#F3EFE9] shadow-sm group-hover:shadow-md transition-shadow"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5 transition-transform duration-300 group-hover:rotate-[-4deg]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Woven Nest Form (Teardrop architecture) */}
          <path
            d="M50 8C35 24 24 45 24 64C24 78 35 90 50 90C65 90 76 78 76 64C76 45 65 24 50 8Z"
            stroke="#D4A373"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            className="opacity-90"
          />
          {/* Inner Cozy House Profile */}
          <path
            d="M38 68V54L50 44L62 54V68H54V58H46V68H38Z"
            fill="#FAF8F5"
          />
          {/* Golden Baya Weaver Perched on Top Entry */}
          <circle cx="58" cy="30" r="7" fill="#E9B949" />
          <path
            d="M62 30L69 32L62 34Z"
            fill="#8F5B34"
          />
          {/* Eye */}
          <circle cx="59" cy="29" r="1.5" fill="#1C1E1B" />
          {/* Subtle Wing feather curve */}
          <path
            d="M54 32C52 38 48 44 42 46C46 42 50 36 54 32Z"
            fill="#234B38"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-bold tracking-tight text-[#1E3F30] text-xl font-['Plus_Jakarta_Sans']">
            NESTORA
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B86A4C]" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-wide text-[#8F5B34] -mt-0.5">
            Weave Your Dream Home
          </span>
        )}
      </div>
    </motion.button>
  );
};
