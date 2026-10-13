import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ColorSwatch, FinishType } from '../../types';
import { SWATCH_PRESETS } from '../../data/mockData';
import { Check, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ColorSwatchesProps {
  currentColor: string;
  onSelectColor: (hex: string, name?: string) => void;
  surfaceLabel: string;
  currentFinish: FinishType;
  onChangeFinish?: (finish: FinishType) => void;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  currentColor,
  onSelectColor,
  surfaceLabel,
  currentFinish,
  onChangeFinish,
}) => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'earth' | 'botanical' | 'neutrals' | 'custom'>('recommended');

  const swatchesList = Object.values(SWATCH_PRESETS);

  const getFilteredSwatches = () => {
    switch (activeTab) {
      case 'botanical':
        return swatchesList.filter((s) => s.category === 'accent' && s.hex.includes('3') || s.name.includes('Sage') || s.name.includes('Baya') || s.name.includes('Eucalyptus') || s.name.includes('Moss'));
      case 'earth':
        return swatchesList.filter((s) => s.category === 'earth' || s.name.includes('Terracotta') || s.name.includes('Amber') || s.name.includes('Ochre') || s.name.includes('Clay'));
      case 'neutrals':
        return swatchesList.filter((s) => s.category === 'base' || s.category === 'ceiling' || s.category === 'trim');
      case 'recommended':
      default:
        return swatchesList.slice(0, 10);
    }
  };

  const finishes: FinishType[] = ['Matte', 'Eggshell', 'Satin', 'Velvet'];

  return (
    <div className="bg-[#FAF8F5] border border-[#E3DACB] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1E3F30] flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F5B34]" />
            Color Palette for {surfaceLabel}
          </h4>
          <p className="text-xs text-[#6B726B]">
            Harmonized natural shades tailored to your space lighting.
          </p>
        </div>
      </div>

      {/* Categories / Family tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F0EBE1] rounded-xl mb-3 text-xs overflow-x-auto">
        {[
          { key: 'recommended', label: 'Curated' },
          { key: 'botanical', label: 'Botanical Greens' },
          { key: 'earth', label: 'Warm Terracotta' },
          { key: 'neutrals', label: 'Airy Neutrals' },
          { key: 'custom', label: 'Custom Hex' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#234B38] text-white shadow-xs'
                : 'text-[#4A524A] hover:bg-[#E5DEC3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Swatch Grid */}
      {activeTab !== 'custom' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {getFilteredSwatches().map((swatch) => {
            const isSelected = currentColor.toLowerCase() === swatch.hex.toLowerCase();
            return (
              <motion.button
                key={swatch.hex + swatch.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectColor(swatch.hex, swatch.name)}
                className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#234B38] bg-white ring-2 ring-[#234B38]/20 shadow-xs'
                    : 'border-[#E6DEC3] bg-[#FAF8F5] hover:bg-white hover:border-[#D5C9B3]'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg shrink-0 border border-black/10 relative flex items-center justify-center shadow-2xs"
                  style={{ backgroundColor: swatch.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        swatch.lightReflectance > 60 ? 'text-black' : 'text-white'
                      }`}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#1C1E1B] truncate">
                    {swatch.name}
                  </div>
                  <div className="text-[10px] text-[#6B726B] flex items-center justify-between">
                    <span>LRV {swatch.lightReflectance}%</span>
                    <span className="font-mono text-[9px]">{swatch.hex}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      ) : (
        /* Custom Color Picker */
        <div className="p-3 bg-white rounded-xl border border-[#E0D7C8] flex flex-wrap items-center gap-3">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onSelectColor(e.target.value, 'Custom Tone')}
            className="w-10 h-10 rounded-lg cursor-pointer border border-[#D5C9B3] p-0.5 bg-transparent"
          />
          <div className="flex-1 min-w-[120px]">
            <label className="text-xs font-semibold text-[#1C1E1B] block">
              Direct Hex / Custom Pigment
            </label>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => onSelectColor(e.target.value, 'Custom Tone')}
              className="w-full text-xs font-mono px-2.5 py-1.5 rounded-lg border border-[#D5C9B3] bg-[#FAF8F5] uppercase focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              placeholder="#A3B899"
            />
          </div>
        </div>
      )}

      {/* Paint Finish Selector */}
      {onChangeFinish && (
        <div className="mt-3 pt-3 border-t border-[#E8DFC5] flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-[#8F5B34]">
            Wall Finish Sheen:
          </div>
          <div className="flex items-center gap-1">
            {finishes.map((f) => (
              <button
                key={f}
                onClick={() => onChangeFinish(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentFinish === f
                    ? 'bg-[#8F5B34] text-white'
                    : 'bg-[#F2ECE1] text-[#4A524A] hover:bg-[#E5DEC3]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
