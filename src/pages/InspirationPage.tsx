import React, { useState } from 'react';
import { motion } from 'motion/react';
import { InspirationItem, RoomType, SpaceCategory } from '../types';
import { INSPIRATIONS_DATA } from '../data/mockData';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import { NestoAvatar } from '../components/common/NestoAvatar';
import {
  Sparkles,
  ArrowRight,
  Sun,
  Flame,
  Feather,
  Layers,
  Heart,
  Compass,
} from 'lucide-react';

interface InspirationPageProps {
  onApplyStyle: (item: InspirationItem) => void;
}

export const InspirationPage: React.FC<InspirationPageProps> = ({ onApplyStyle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Natural',
    'Minimal',
    'Scandinavian',
    'Indian Contemporary',
    'Small Space',
  ];

  const filteredItems = INSPIRATIONS_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Design Harmonies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            Picked for Your Dream Nest
          </h1>
          <p className="text-xs sm:text-sm text-[#6B726B] mt-0.5">
            Explore authentic Baya-inspired natural combinations. Tap any harmony to apply it directly to your room.
          </p>
        </div>
      </div>

      {/* Category Chips (Hick's law 6 options) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#234B38] text-white shadow-xs'
                : 'bg-white border border-[#D5CABB] text-[#4A524A] hover:bg-[#FAF8F5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inspirations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-[#E0D7C6] p-5 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#8F5B34] bg-[#F7EFE6] px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#6B726B] font-medium">
                  {item.roomType.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1E3F30]">{item.title}</h3>
              <p className="text-xs text-[#526658] leading-relaxed">{item.description}</p>

              {/* Room preview mini canvas */}
              <div className="rounded-xl overflow-hidden border border-[#E3DACB] aspect-[16/10]">
                <RoomVisualizer
                  roomType={item.roomType}
                  spaceCategory={item.roomType.includes('elevation') ? 'exterior' : 'interior'}
                  wallColor={item.palette.primaryWall.hex}
                  accentColor={item.palette.accentWall.hex}
                  ceilingColor={item.palette.ceiling.hex}
                  trimColor={item.palette.trim.hex}
                  lightingMood={item.lightingMood}
                  finish="Matte"
                  interactive={false}
                />
              </div>

              {/* Swatches strip */}
              <div className="flex items-center gap-1.5 pt-1">
                {[
                  item.palette.primaryWall,
                  item.palette.accentWall,
                  item.palette.ceiling,
                  item.palette.accentDetails,
                ].map((s, idx) => (
                  <div key={idx} className="flex-1 text-center">
                    <div
                      className="w-full h-6 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: s.hex }}
                    />
                    <span className="text-[8px] text-[#6B726B] block mt-0.5 truncate">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] font-semibold text-[#234B38] bg-[#EBF2EE] p-2 rounded-xl border border-[#234B38]/10">
                Key Feature: {item.keyFeature}
              </div>
            </div>

            <button
              onClick={() => onApplyStyle(item)}
              className="w-full py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Apply Style to My Nest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
