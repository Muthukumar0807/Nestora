import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FinishType,
  LightingMood,
  RoomType,
  SpaceCategory,
} from '../../types';
import {
  Sun,
  Moon,
  Sunset,
  CloudSun,
  Layers,
  Maximize2,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';

import { getSpaceConfig } from '../../data/spaceConfigs';

interface RoomVisualizerProps {
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  wallColor: string;
  accentColor: string;
  ceilingColor: string;
  trimColor: string;
  lightingMood: LightingMood;
  finish: FinishType;
  selectedSurface?: 'wall' | 'accent' | 'ceiling' | 'trim';
  onSelectSurface?: (surface: 'wall' | 'accent' | 'ceiling' | 'trim') => void;
  onLightingChange?: (mood: LightingMood) => void;
  originalColors?: { wall: string; accent: string };
  interactive?: boolean;
}

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  roomType,
  spaceCategory,
  wallColor,
  accentColor,
  ceilingColor,
  trimColor,
  lightingMood,
  finish,
  selectedSurface = 'accent',
  onSelectSurface,
  onLightingChange,
  originalColors,
  interactive = true,
}) => {
  const spaceConfig = getSpaceConfig(roomType, spaceCategory);
  const [splitView, setSplitView] = useState(false);
  const [splitPos, setSplitPos] = useState(50);
  const [isZoomed, setIsZoomed] = useState(false);

  // Lighting overlay styles
  const getLightingFilter = () => {
    switch (lightingMood) {
      case 'warm_evening':
        return {
          gradient: 'radial-gradient(ellipse at 75% 45%, rgba(255, 190, 118, 0.28) 0%, rgba(200, 130, 60, 0.12) 60%, rgba(30, 20, 10, 0.15) 100%)',
          overlayClass: 'mix-blend-color-dodge opacity-60',
          lampGlow: '#FFA726',
        };
      case 'golden_sunset':
        return {
          gradient: 'linear-gradient(135deg, rgba(255, 160, 60, 0.3) 0%, rgba(210, 100, 40, 0.15) 50%, rgba(50, 20, 10, 0.1) 100%)',
          overlayClass: 'mix-blend-overlay opacity-75',
          lampGlow: '#FF9800',
        };
      case 'soft_twilight':
        return {
          gradient: 'linear-gradient(180deg, rgba(140, 160, 190, 0.18) 0%, rgba(90, 110, 130, 0.15) 100%)',
          overlayClass: 'mix-blend-multiply opacity-40',
          lampGlow: '#FFE082',
        };
      case 'bright_daylight':
      default:
        return {
          gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(240, 245, 250, 0.05) 100%)',
          overlayClass: 'mix-blend-soft-light opacity-50',
          lampGlow: '#FFF8E1',
        };
    }
  };

  const lighting = getLightingFilter();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#E8E2D8] border border-[#D5CBBF] shadow-inner flex flex-col group">
      {/* Top Visualizer Control Bar */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#FAF8F5]/90 backdrop-blur-xs border-b border-[#E5DEC3] z-20 text-xs text-[#4A524A]">
          {/* Dynamic Surface selector tabs driven by spaceConfig */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#8F5B34] mr-1 hidden sm:inline">Region:</span>
            {spaceConfig.editableRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => onSelectSurface?.(region.id as any)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedSurface === region.id
                    ? 'bg-[#234B38] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#2C332D] hover:bg-[#E7DFC0]'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* Lighting mood switchers */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#8F5B34] mr-1 hidden md:inline">Lighting:</span>
            {[
              { mood: 'bright_daylight', icon: Sun, title: 'Daylight' },
              { mood: 'warm_evening', icon: Moon, title: 'Warm Evening' },
              { mood: 'golden_sunset', icon: Sunset, title: 'Golden Hour' },
              { mood: 'soft_twilight', icon: CloudSun, title: 'Twilight' },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = lightingMood === m.mood;
              return (
                <button
                  key={m.mood}
                  title={m.title}
                  onClick={() => onLightingChange?.(m.mood as LightingMood)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#8F5B34] text-white'
                      : 'bg-[#F2ECE1] text-[#4A524A] hover:bg-[#E5DDCF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline text-[11px] font-medium">{m.title}</span>
                </button>
              );
            })}

            {/* Split toggle */}
            {originalColors && (
              <button
                onClick={() => setSplitView(!splitView)}
                className={`ml-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  splitView ? 'bg-[#234B38] text-white' : 'bg-[#F2ECE1] text-[#2C332D]'
                }`}
                title="Split Before & After"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">A/B Split</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Vector Scene Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden select-none">
        {/* Render Vector Room SVG based on spaceCategory & roomType */}
        <svg
          viewBox="0 0 1000 625"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ceiling shadow gradient */}
            <linearGradient id="ceilingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
            </linearGradient>

            {/* Floor depth gradient */}
            <linearGradient id="floorWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A5338" />
              <stop offset="100%" stopColor="#513320" />
            </linearGradient>

            {/* Warm window sunlight ray */}
            <linearGradient id="sunRay" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4D2" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFF4D2" stopOpacity="0" />
            </linearGradient>

            {/* Feature wall depth shadow */}
            <linearGradient id="accentShadow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* 1. CEILING */}
          <polygon
            points="0,0 1000,0 820,130 180,130"
            fill={ceilingColor}
            onClick={() => onSelectSurface?.('ceiling')}
            className="cursor-pointer transition-colors duration-300"
          />
          <polygon
            points="0,0 1000,0 820,130 180,130"
            fill="url(#ceilingGrad)"
            pointerEvents="none"
          />

          {/* 2. LEFT SIDE WALL (Main Wall) */}
          <polygon
            points="0,0 180,130 180,480 0,625"
            fill={wallColor}
            onClick={() => onSelectSurface?.('wall')}
            className="cursor-pointer transition-colors duration-300"
          />
          {/* Subtle side wall shadow */}
          <polygon
            points="0,0 180,130 180,480 0,625"
            fill="#000000"
            opacity="0.06"
            pointerEvents="none"
          />

          {/* 3. RIGHT SIDE WALL (Main Wall with Window or Architecture) */}
          <polygon
            points="1000,0 820,130 820,480 1000,625"
            fill={wallColor}
            onClick={() => onSelectSurface?.('wall')}
            className="cursor-pointer transition-colors duration-300"
          />
          <polygon
            points="1000,0 820,130 820,480 1000,625"
            fill="#000000"
            opacity="0.04"
            pointerEvents="none"
          />

          {/* 4. BACK FEATURE ACCENT WALL */}
          <polygon
            points="180,130 820,130 820,480 180,480"
            fill={accentColor}
            onClick={() => onSelectSurface?.('accent')}
            className="cursor-pointer transition-colors duration-300 hover:opacity-95"
          />
          <polygon
            points="180,130 820,130 820,480 180,480"
            fill="url(#accentShadow)"
            pointerEvents="none"
          />

          {/* Active Surface Highlight Border */}
          {selectedSurface === 'accent' && (
            <polygon
              points="182,132 818,132 818,478 182,478"
              fill="none"
              stroke="#E5A83B"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
          )}

          {/* 5. FLOORING (Warm Natural Wood Planks or Stone) */}
          <polygon
            points="0,625 180,480 820,480 1000,625"
            fill="url(#floorWood)"
          />
          {/* Floor Planks Perspective lines */}
          <line x1="280" y1="480" x2="160" y2="625" stroke="#3A2314" strokeWidth="1.5" opacity="0.4" />
          <line x1="420" y1="480" x2="380" y2="625" stroke="#3A2314" strokeWidth="1.5" opacity="0.4" />
          <line x1="580" y1="480" x2="620" y2="625" stroke="#3A2314" strokeWidth="1.5" opacity="0.4" />
          <line x1="720" y1="480" x2="840" y2="625" stroke="#3A2314" strokeWidth="1.5" opacity="0.4" />

          {/* Floor Area Rug */}
          <polygon
            points="260,500 740,500 840,610 160,610"
            fill="#EFE7DA"
            opacity="0.92"
            stroke="#D6CBB8"
            strokeWidth="2"
          />
          {/* Rug Organic Geometry */}
          <line x1="300" y1="520" x2="700" y2="520" stroke="#CBBFA9" strokeWidth="1" />
          <line x1="240" y1="560" x2="760" y2="560" stroke="#CBBFA9" strokeWidth="1" />

          {/* Baseboard Trim */}
          <polygon
            points="180,474 820,474 820,480 180,480"
            fill={trimColor}
          />
          <polygon
            points="0,621 180,476 180,480 0,625"
            fill={trimColor}
          />
          <polygon
            points="1000,621 820,476 820,480 1000,625"
            fill={trimColor}
          />

          {/* 6. ROOM FURNITURE & ARCHITECTURAL ELEMENTS */}
          {/* 6. SPACE-SPECIFIC FURNISHINGS & ARCHITECTURE */}
          {roomType === 'bathroom' ? (
            /* 1. BATHROOM SCENE (Toilet, Vanity/Basin, Mirror, Shower/Glass Partition, Tiles, Fixtures) */
            <g id="bathroom-furnishings">
              {/* Tile Grid overlay on Feature Wall */}
              <pattern id="tilePattern" width="40" height="25" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />
              </pattern>
              <polygon points="180,130 820,130 820,480 180,480" fill="url(#tilePattern)" pointerEvents="none" />

              {/* Glass Shower Enclosure (Right Side) */}
              <rect x="620" y="160" width="180" height="320" fill="#EBF3F5" opacity="0.35" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="620" y1="160" x2="620" y2="480" stroke="#CCCCCC" strokeWidth="4" />
              {/* Shower Head & Pipe */}
              <path d="M710 160V200H740" stroke="#C8A870" strokeWidth="4" fill="none" strokeLinecap="round" />
              <ellipse cx="740" cy="205" rx="14" ry="4" fill="#C8A870" />
              {/* Shower Water Spray */}
              <path d="M730 210L720 280 M740 210L740 290 M750 210L760 280" stroke="#B0E0E6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

              {/* Wall-Mounted Illuminated Round Vanity Mirror (Center) */}
              <circle cx="420" cy="240" r="55" fill="#F4F8FA" stroke="#C8A870" strokeWidth="4" />
              <circle cx="420" cy="240" r="58" fill="none" stroke={lighting.lampGlow} strokeWidth="2" opacity="0.8" />
              <ellipse cx="405" cy="225" rx="20" ry="8" fill="#FFFFFF" opacity="0.5" />

              {/* Modern Wooden Vanity Counter & Sink Basin */}
              <rect x="300" y="350" width="240" height="75" rx="6" fill="#6B3E26" stroke="#482715" strokeWidth="2" />
              <ellipse cx="420" cy="350" rx="60" ry="16" fill="#FFFFFF" stroke="#D0C8B8" strokeWidth="2" />
              <ellipse cx="420" cy="350" rx="52" ry="12" fill="#F4F0E8" />
              {/* Brass Faucet */}
              <path d="M420 330C420 315 420 315 420 335" stroke="#C8A870" strokeWidth="5" strokeLinecap="round" />

              {/* Modern Wall-Hung Toilet (Left Side) */}
              <rect x="200" y="360" width="70" height="90" rx="10" fill="#FFFFFF" stroke="#D5CBBF" strokeWidth="2" />
              <ellipse cx="235" cy="385" rx="30" ry="22" fill="#F4F0E8" stroke="#E0D7C6" strokeWidth="1.5" />
              <rect x="200" y="310" width="70" height="50" rx="6" fill="#FAF8F5" stroke="#D5CBBF" strokeWidth="2" />
              <circle cx="235" cy="335" r="6" fill="#C8A870" />

              {/* Rolled Towel Basket */}
              <rect x="310" y="440" width="50" height="35" rx="4" fill="#C28E58" />
              <ellipse cx="325" cy="435" rx="8" ry="5" fill="#FAF8F5" />
              <ellipse cx="345" cy="435" rx="8" ry="5" fill="#A3B899" />
            </g>
          ) : roomType === 'bedroom' ? (
            /* 2. BEDROOM SCENE (Bed, Headboard, Nightstands, Lamps, Pillows, Wardrobe Closet) */
            <g id="bedroom-furnishings">
              {/* Left Side Built-in Wardrobe Closet */}
              <rect x="180" y="140" width="110" height="340" fill="#FAF7F0" stroke="#D9C9B4" strokeWidth="2" />
              <line x1="235" y1="140" x2="235" y2="480" stroke="#D9C9B4" strokeWidth="2" />
              <rect x="228" y="300" width="4" height="30" rx="2" fill="#875237" />
              <rect x="238" y="300" width="4" height="30" rx="2" fill="#875237" />

              {/* Upholstered Bed Headboard */}
              <rect x="360" y="270" width="300" height="210" rx="16" fill="#D9C9B4" stroke="#B8A48D" strokeWidth="2" />
              {/* Bed Mattress & Layered Linen */}
              <rect x="330" y="410" width="360" height="130" rx="10" fill="#FAF7F2" stroke="#E3DACB" strokeWidth="2" />
              {/* Cozy Throw Blanket (Warm Ochre) */}
              <rect x="330" y="485" width="360" height="55" rx="4" fill="#C28E58" opacity="0.9" />
              {/* Pillows */}
              <rect x="370" y="365" width="110" height="50" rx="10" fill="#FAF8F5" stroke="#DDD4C5" strokeWidth="1.5" />
              <rect x="520" y="365" width="110" height="50" rx="10" fill="#FAF8F5" stroke="#DDD4C5" strokeWidth="1.5" />
              <rect x="400" y="380" width="75" height="38" rx="8" fill="#7E9987" opacity="0.85" />
              <rect x="525" y="380" width="75" height="38" rx="8" fill="#B86A4C" opacity="0.85" />

              {/* Right Bedside Table & Pendant Lamp */}
              <rect x="700" y="430" width="70" height="70" rx="6" fill="#875237" />
              <circle cx="735" cy="385" r="14" fill={lighting.lampGlow} opacity="0.9" />
              <line x1="735" y1="130" x2="735" y2="370" stroke="#C8A870" strokeWidth="2" />

              {/* Framed Wall Art above bed */}
              <rect x="440" y="160" width="140" height="90" rx="3" fill="#FAF8F5" stroke="#513320" strokeWidth="4" />
              <circle cx="510" cy="205" r="22" fill="#E5A83B" opacity="0.65" />
              <path d="M460 235C480 210 510 220 560 235Z" fill="#234B38" opacity="0.75" />
            </g>
          ) : roomType === 'kitchen' ? (
            /* 3. KITCHEN SCENE (Upper Cabinets, Backsplash Tile, Countertop, Sink/Faucet, Appliances) */
            <g id="kitchen-furnishings">
              {/* Back Upper Storage Cabinets */}
              <rect x="220" y="150" width="560" height="135" fill="#FAF8F5" stroke="#E0D7C8" strokeWidth="2" />
              <line x1="360" y1="150" x2="360" y2="285" stroke="#E0D7C8" strokeWidth="2" />
              <line x1="500" y1="150" x2="500" y2="285" stroke="#E0D7C8" strokeWidth="2" />
              <line x1="640" y1="150" x2="640" y2="285" stroke="#E0D7C8" strokeWidth="2" />
              {/* Cabinet Brass Handles */}
              <rect x="345" y="250" width="10" height="3" fill="#C8A870" />
              <rect x="370" y="250" width="10" height="3" fill="#C8A870" />
              <rect x="485" y="250" width="10" height="3" fill="#C8A870" />
              <rect x="510" y="250" width="10" height="3" fill="#C8A870" />

              {/* Subway Backsplash Tile Band */}
              <rect x="220" y="285" width="560" height="95" fill="#F4EFEB" stroke="#D5C9B8" strokeWidth="1.5" />
              <line x1="220" y1="315" x2="780" y2="315" stroke="#E0D5C5" strokeWidth="1" />
              <line x1="220" y1="345" x2="780" y2="345" stroke="#E0D5C5" strokeWidth="1" />

              {/* Kitchen Countertop (Granite / Quartz) */}
              <rect x="200" y="380" width="600" height="130" fill="#3D3028" rx="4" />
              <rect x="190" y="375" width="620" height="15" fill="#EAE5DC" rx="2" />

              {/* Undermount Stainless Sink & Brass Gooseneck Faucet */}
              <rect x="440" y="390" width="120" height="60" rx="6" fill="#525C65" stroke="#37414A" strokeWidth="2" />
              <path d="M500 375V330C500 315 520 315 520 330V345" stroke="#C8A870" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Espresso Machine / Kettle Appliance on counter */}
              <rect x="240" y="325" width="45" height="50" rx="4" fill="#2A2D2B" />
              <rect x="245" y="335" width="35" height="20" rx="2" fill="#8FA1A9" />

              {/* Brass Island Pendant Lights */}
              <line x1="330" y1="0" x2="330" y2="200" stroke="#2A2D2B" strokeWidth="2" />
              <polygon points="310,225 350,225 330,200" fill="#C8A870" />
              <circle cx="330" cy="228" r="8" fill={lighting.lampGlow} opacity="0.9" />
              <line x1="670" y1="0" x2="670" y2="200" stroke="#2A2D2B" strokeWidth="2" />
              <polygon points="650,225 690,225 670,200" fill="#C8A870" />
              <circle cx="670" cy="228" r="8" fill={lighting.lampGlow} opacity="0.9" />
            </g>
          ) : roomType === 'dining_room' ? (
            /* 4. DINING ROOM SCENE (Dining Table, Chairs, Pendant Chandelier, Sideboard, Curtains) */
            <g id="dining-room-furnishings">
              {/* Window & Curtains (Right side) */}
              <rect x="700" y="140" width="100" height="260" fill="#EDF3F7" stroke="#FAF8F5" strokeWidth="3" />
              <path d="M680 130C710 200 700 320 680 420" fill="#FAF7F0" stroke="#E0D7C6" strokeWidth="2" />
              <path d="M820 130C790 200 800 320 820 420" fill="#FAF7F0" stroke="#E0D7C6" strokeWidth="2" />

              {/* Sideboard Credenza & Decorative Mirror */}
              <rect x="220" y="320" width="160" height="120" rx="4" fill="#6B3E26" stroke="#482715" strokeWidth="2" />
              <rect x="240" y="180" width="120" height="110" rx="6" fill="#FAF8F5" stroke="#C8A870" strokeWidth="3" />

              {/* Solid Teak Dining Table */}
              <rect x="360" y="440" width="280" height="22" rx="4" fill="#875237" stroke="#513320" strokeWidth="2" />
              <rect x="380" y="462" width="16" height="85" fill="#513320" />
              <rect x="604" y="462" width="16" height="85" fill="#513320" />

              {/* Dining Chairs (4 Chairs around table) */}
              {/* Back Chairs */}
              <rect x="400" y="370" width="55" height="70" rx="6" fill="#234B38" />
              <rect x="545" y="370" width="55" height="70" rx="6" fill="#234B38" />
              {/* Front Chairs */}
              <rect x="420" y="460" width="60" height="75" rx="6" fill="#C28E58" stroke="#875237" strokeWidth="2" />
              <rect x="520" y="460" width="60" height="75" rx="6" fill="#C28E58" stroke="#875237" strokeWidth="2" />

              {/* Statement Dining Chandelier */}
              <line x1="500" y1="0" x2="500" y2="240" stroke="#2A2D2B" strokeWidth="3" />
              <ellipse cx="500" cy="245" rx="60" ry="12" fill="#C8A870" />
              <circle cx="460" cy="255" r="10" fill={lighting.lampGlow} opacity="0.9" />
              <circle cx="500" cy="255" r="10" fill={lighting.lampGlow} opacity="0.9" />
              <circle cx="540" cy="255" r="10" fill={lighting.lampGlow} opacity="0.9" />
            </g>
          ) : roomType === 'study_room' ? (
            /* 5. STUDY ROOM SCENE (Executive Desk, Chair, Large Bookshelf, Desk Lamp, Window) */
            <g id="study-furnishings">
              {/* Large Wall Bookshelf (Left Wall) */}
              <rect x="200" y="150" width="220" height="330" fill="#FAF7F0" stroke="#875237" strokeWidth="3" />
              <line x1="200" y1="230" x2="420" y2="230" stroke="#875237" strokeWidth="3" />
              <line x1="200" y1="310" x2="420" y2="310" stroke="#875237" strokeWidth="3" />
              <line x1="200" y1="390" x2="420" y2="390" stroke="#875237" strokeWidth="3" />
              {/* Colorful Books */}
              <rect x="220" y="170" width="18" height="60" fill="#234B38" />
              <rect x="240" y="180" width="16" height="50" fill="#B86A4C" />
              <rect x="258" y="175" width="20" height="55" fill="#C8A870" />
              <rect x="220" y="250" width="22" height="60" fill="#37414A" />
              <rect x="244" y="260" width="18" height="50" fill="#7E9987" />

              {/* Right Side Window */}
              <rect x="680" y="150" width="120" height="220" fill="#EDF3F7" stroke="#FAF8F5" strokeWidth="4" />
              <line x1="740" y1="150" x2="740" y2="370" stroke="#FAF8F5" strokeWidth="2" />

              {/* Modern Wooden Study Desk */}
              <rect x="440" y="410" width="280" height="20" rx="4" fill="#6B3E26" stroke="#482715" strokeWidth="2" />
              <rect x="460" y="430" width="16" height="90" fill="#482715" />
              <rect x="680" y="430" width="16" height="90" fill="#482715" />

              {/* Ergonomic Study Chair */}
              <rect x="530" y="380" width="75" height="110" rx="10" fill="#2A2D2B" stroke="#1C1E1B" strokeWidth="2" />
              <circle cx="567" cy="510" r="14" fill="#37414A" />

              {/* Laptop & Desk Lamp */}
              <rect x="520" y="395" width="45" height="15" rx="2" fill="#8FA1A9" />
              <path d="M640 410C640 370 620 360 610 360" stroke="#C8A870" strokeWidth="3" fill="none" />
              <ellipse cx="610" cy="365" rx="10" ry="5" fill="#C8A870" />
              <circle cx="610" cy="368" r="6" fill={lighting.lampGlow} opacity="0.9" />
            </g>
          ) : roomType === 'balcony' ? (
            /* 5. BALCONY OASIS SCENE (Outdoor Decking, Glass Sliding Door, Railing, Overhang, Planters, Horizon Background) */
            <g id="balcony-furnishings">
              {/* Outdoor Horizon Background (Sky & Tree Silhouettes) */}
              <rect x="180" y="130" width="640" height="350" fill="#E8F1F5" />
              <circle cx="500" cy="220" r="90" fill="#FFF4D2" opacity="0.6" />
              {/* Distant Sunset Hills & Tree Canopy */}
              <path d="M180 320C280 270 380 310 480 280C580 250 680 300 820 270V480H180Z" fill="#A3B899" opacity="0.5" />
              <path d="M180 360C320 310 450 350 600 320C700 300 780 340 820 330V480H180Z" fill="#526658" opacity="0.65" />

              {/* Glass Sliding Patio Door Frame (Left Side connecting to interior) */}
              <rect x="180" y="130" width="160" height="350" fill="#8FA1A9" opacity="0.3" stroke="#37414A" strokeWidth="4" />
              <line x1="260" y1="130" x2="260" y2="480" stroke="#37414A" strokeWidth="4" />
              <rect x="252" y="280" width="4" height="40" fill="#C8A870" />

              {/* Balcony Overhang Canopy Overhead */}
              <polygon points="180,130 820,130 800,165 200,165" fill={ceilingColor} />
              <polygon points="180,130 820,130 800,165 200,165" fill="#000000" opacity="0.15" />

              {/* Outdoor Weatherproof Balcony Flooring Deck Planks */}
              <polygon points="180,480 820,480 880,625 120,625" fill="#7A5338" />
              <line x1="260" y1="480" x2="220" y2="625" stroke="#513320" strokeWidth="2" />
              <line x1="380" y1="480" x2="360" y2="625" stroke="#513320" strokeWidth="2" />
              <line x1="500" y1="480" x2="500" y2="625" stroke="#513320" strokeWidth="2" />
              <line x1="620" y1="480" x2="640" y2="625" stroke="#513320" strokeWidth="2" />
              <line x1="740" y1="480" x2="780" y2="625" stroke="#513320" strokeWidth="2" />

              {/* Modern Glass & Metal Railing / Balustrade (Foreground Security) */}
              <rect x="340" y="380" width="480" height="100" fill="#8FA1A9" opacity="0.35" stroke={trimColor} strokeWidth="3" />
              <line x1="340" y1="380" x2="820" y2="380" stroke={trimColor} strokeWidth="6" />
              <line x1="340" y1="430" x2="820" y2="430" stroke={trimColor} strokeWidth="2" />
              {/* Railing Vertical Posts */}
              <line x1="460" y1="380" x2="460" y2="480" stroke={trimColor} strokeWidth="4" />
              <line x1="580" y1="380" x2="580" y2="480" stroke={trimColor} strokeWidth="4" />
              <line x1="700" y1="380" x2="700" y2="480" stroke={trimColor} strokeWidth="4" />

              {/* Outdoor Rattan Bistro Seating & Small Side Table */}
              <ellipse cx="440" cy="460" rx="35" ry="12" fill="#875237" />
              <rect x="415" y="415" width="50" height="40" rx="8" fill="#C28E58" stroke="#875237" strokeWidth="2" />
              <ellipse cx="440" cy="415" rx="20" ry="6" fill="#FAF8F5" />
              {/* Round Bistro Coffee Table */}
              <ellipse cx="510" cy="470" rx="22" ry="8" fill="#3D3028" />
              <ellipse cx="510" cy="466" rx="20" ry="6" fill="#C8A870" />

              {/* Lush Outdoor Planters & Terracotta Pots */}
              <rect x="730" y="420" width="50" height="50" rx="4" fill="#B86A4C" />
              <circle cx="755" cy="395" r="28" fill="#234B38" />
              <circle cx="740" cy="385" r="22" fill="#3D6852" />
              <circle cx="770" cy="385" r="20" fill="#7E9987" />

              {/* Hanging String Festoon / Sconce Lights */}
              <path d="M200 165Q500 210 800 165" stroke="#2A2D2B" strokeWidth="1.5" fill="none" />
              <circle cx="300" cy="182" r="5" fill={lighting.lampGlow} opacity="0.9" />
              <circle cx="420" cy="192" r="5" fill={lighting.lampGlow} opacity="0.9" />
              <circle cx="540" cy="192" r="5" fill={lighting.lampGlow} opacity="0.9" />
              <circle cx="660" cy="182" r="5" fill={lighting.lampGlow} opacity="0.9" />
            </g>
          ) : spaceCategory === 'exterior' ? (
            /* 6. EXTERIOR ELEVATION SCENE (Roof Eaves, Facade, Windows, Main Door, Balcony Glass, Gate) */
            <g id="exterior-elevation">
              {/* Roof Eaves & Tiles */}
              <polygon points="120,150 880,150 820,100 180,100" fill="#3A2D28" />
              <line x1="180" y1="125" x2="820" y2="125" stroke="#A85A3F" strokeWidth="2" />

              {/* Upper Level Windows */}
              <rect x="260" y="190" width="110" height="90" rx="4" fill="#8FA1A9" stroke="#FAF8F5" strokeWidth="3" />
              <rect x="630" y="190" width="110" height="90" rx="4" fill="#8FA1A9" stroke="#FAF8F5" strokeWidth="3" />

              {/* Architectural Glass Balcony Railing */}
              <rect x="240" y="295" width="520" height="65" rx="4" fill="#8FA1A9" opacity="0.45" stroke="#FAF8F5" strokeWidth="2" />
              <line x1="240" y1="325" x2="760" y2="325" stroke="#FAF8F5" strokeWidth="2" />

              {/* Modern Teak Main Entry Door (Center) */}
              <rect x="440" y="375" width="120" height="165" rx="4" fill="#6B3E26" stroke="#482715" strokeWidth="3" />
              <rect x="538" y="455" width="6" height="28" rx="2" fill="#C8A870" />

              {/* Outdoor Sconce Lanterns */}
              <rect x="395" y="420" width="18" height="34" rx="3" fill="#1C1E1B" />
              <circle cx="404" cy="437" r="8" fill={lighting.lampGlow} opacity="0.85" />
              <rect x="587" y="420" width="18" height="34" rx="3" fill="#1C1E1B" />
              <circle cx="596" cy="437" r="8" fill={lighting.lampGlow} opacity="0.85" />

              {/* Entrance Gate Posts & Boundary Pillars */}
              <rect x="180" y="460" width="50" height="80" rx="2" fill="#526658" />
              <rect x="770" y="460" width="50" height="80" rx="2" fill="#526658" />
            </g>
          ) : (
            /* 7. DEFAULT LIVING ROOM SCENE (Sofa, TV Unit, Coffee Table, Rug, Windows, Arc Lamp) */
            <g id="living-room-furnishings">
              {/* Left Daylight Window & Curtains */}
              <polygon points="30,80 150,165 150,420 30,510" fill="#EDF3F7" stroke="#FAF8F5" strokeWidth="4" />
              <line x1="90" y1="122" x2="90" y2="465" stroke="#FAF8F5" strokeWidth="2" />
              <line x1="30" y1="295" x2="150" y2="292" stroke="#FAF8F5" strokeWidth="2" />
              {/* Sunlight Beam over floor */}
              <polygon points="150,320 480,560 220,620 90,465" fill="url(#sunRay)" pointerEvents="none" />

              {/* Mounted TV Unit on Accent Wall */}
              <rect x="410" y="165" width="180" height="110" rx="4" fill="#1C1E1B" stroke="#37414A" strokeWidth="3" />
              <rect x="420" y="175" width="160" height="90" rx="2" fill="#2A2D2B" />
              <polygon points="490,210 510,220 490,230" fill="#FAF8F5" opacity="0.6" />

              {/* Low-profile Wooden Credenza / TV Console */}
              <rect x="340" y="430" width="320" height="55" rx="4" fill="#6B3E26" stroke="#4B2B1B" strokeWidth="1.5" />
              <line x1="500" y1="430" x2="500" y2="485" stroke="#4B2B1B" strokeWidth="1.5" />
              <circle cx="480" cy="455" r="3" fill="#C8A870" />
              <circle cx="520" cy="455" r="3" fill="#C8A870" />

              {/* Large Cozy 3-Seater Linen Sofa */}
              <rect x="290" y="450" width="420" height="85" rx="12" fill="#F4EFE6" stroke="#D3C7B5" strokeWidth="2" />
              <rect x="310" y="455" width="125" height="55" rx="8" fill="#EAE2D5" />
              <rect x="438" y="455" width="125" height="55" rx="8" fill="#EAE2D5" />
              <rect x="566" y="455" width="125" height="55" rx="8" fill="#EAE2D5" />
              {/* Accent Pillows */}
              <rect x="315" y="465" width="35" height="35" rx="6" fill="#7E9987" opacity="0.9" />
              <rect x="650" y="465" width="35" height="35" rx="6" fill="#B86A4C" opacity="0.9" />

              {/* Coffee Table (Round Teak) */}
              <ellipse cx="500" cy="550" rx="90" ry="24" fill="#875237" stroke="#5A3521" strokeWidth="2" />
              <ellipse cx="500" cy="548" rx="85" ry="20" fill="#A66F43" />

              {/* Fiddle Leaf Fig Plant */}
              <polygon points="210,540 250,540 242,590 218,590" fill="#B86A4C" stroke="#873F25" strokeWidth="1.5" />
              <ellipse cx="225" cy="495" rx="20" ry="14" fill="#2A4D3B" transform="rotate(-25 225 495)" />
              <ellipse cx="245" cy="480" rx="22" ry="16" fill="#3D6852" transform="rotate(20 245 480)" />

              {/* Modern Minimal Floor Arc Lamp */}
              <path d="M780 570C780 320 740 180 620 180" fill="none" stroke="#2A2D2B" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="620" cy="185" rx="20" ry="8" fill="#C8A870" />
              <polygon points="605,190 635,190 690,440 550,440" fill={lighting.lampGlow} opacity="0.16" pointerEvents="none" />
              <circle cx="620" cy="190" r="10" fill={lighting.lampGlow} opacity="0.8" />
            </g>
          )}

          {/* Dynamic Lighting Overlay Layer */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="625"
            fill="none"
            style={{ background: lighting.gradient }}
            className={`pointer-events-none ${lighting.overlayClass}`}
          />
        </svg>

        {/* Finish Sheen badge in bottom corner */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#D9CEBF] shadow-xs text-[11px] font-semibold text-[#2C332D]">
          <span className="w-2 h-2 rounded-full bg-[#234B38]" />
          <span>{finish} Sheen</span>
          <span className="text-[#8F5B34] border-l border-[#D9CEBF] pl-1.5">
            {roomType.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Hotspot Interactive Tooltips */}
        {interactive && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onSelectSurface?.('accent')}
              className={`absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-all ${
                selectedSurface === 'accent'
                  ? 'bg-[#E5A83B] text-[#1C1E1B] ring-2 ring-white'
                  : 'bg-[#FAF8F5]/90 text-[#234B38] hover:bg-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#B86A4C]" />
              Feature Accent
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onSelectSurface?.('wall')}
              className={`absolute top-[48%] left-[10%] px-2 py-0.5 rounded-full text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 transition-all ${
                selectedSurface === 'wall'
                  ? 'bg-[#E5A83B] text-[#1C1E1B] ring-2 ring-white'
                  : 'bg-[#FAF8F5]/80 text-[#234B38] hover:bg-white'
              }`}
            >
              Main Wall
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};
