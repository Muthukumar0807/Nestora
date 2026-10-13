import React from 'react';
import { motion } from 'motion/react';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import { COLOR_PALETTES } from '../data/mockData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Heart,
  Layers,
  Sun,
  Eye,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  onStartDesigning: () => void;
  onExploreInspiration: () => void;
  onViewUXStudy: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartDesigning,
  onExploreInspiration,
  onViewUXStudy,
}) => {
  return (
    <div className="min-w-0 flex flex-col bg-[#FAF8F5]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#E8DFC5]">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-12 left-10 w-80 h-80 rounded-full bg-[#E5DEC3] blur-3xl" />
          <div className="absolute top-24 right-10 w-96 h-96 rounded-full bg-[#EBF2EE] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              {/* Mascot Introduction Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EBF2EE] border border-[#234B38]/20 text-[#234B38] text-xs font-semibold shadow-2xs">
                <NestoAvatar mood="happy" size="sm" />
                <span>Meet Nesto — Your Baya Weaver Home Guide</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1E1B] tracking-tight leading-[1.15] font-['Plus_Jakarta_Sans']">
                Build Your Dream Home, <br className="hidden sm:inline" />
                <span className="text-[#234B38] font-['Playfair_Display'] italic font-medium">
                  One Confident Choice
                </span>{' '}
                at a Time.
              </h1>

              {/* Supporting Subtext */}
              <p className="text-base sm:text-lg text-[#4A524A] leading-relaxed max-w-xl">
                Nestora removes design anxiety and color overwhelm. Guided by the meticulous craft of the Baya Weaver bird, visualize tailored interior and exterior palettes without needing design jargon.
              </p>

              {/* CTAs (Fitts's Law generous targets) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartDesigning}
                  className="px-6 py-3.5 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-[#FAF8F5] text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Start Building My Nest</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <button
                  onClick={onExploreInspiration}
                  className="px-5 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE] hover:border-[#234B38] text-[#2C332D] text-sm sm:text-base font-semibold hover:bg-white transition-all cursor-pointer"
                >
                  Explore Inspiration
                </button>
              </div>

              {/* Value Signals */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EAE2D2] text-xs text-[#526658]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#234B38] shrink-0" />
                  <span>No Jargon</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#234B38] shrink-0" />
                  <span>Light-Aware Palettes</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#234B38] shrink-0" />
                  <span>Instant Compare</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visualizer Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl bg-white p-3 sm:p-4 border border-[#E0D7C6] shadow-xl">
                <RoomVisualizer
                  roomType="living_room"
                  spaceCategory="interior"
                  wallColor="#EDE8DF"
                  accentColor="#A3B899"
                  ceilingColor="#FCFAF7"
                  trimColor="#F0EBE1"
                  lightingMood="warm_evening"
                  finish="Matte"
                  interactive={true}
                />

                {/* Floating Nesto Tip Badge */}
                <motion.div
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 left-6 right-6 sm:right-auto bg-[#FAF8F5] border border-[#D5CABB] rounded-2xl p-3 shadow-md flex items-center gap-3 text-xs"
                >
                  <NestoAvatar mood="explaining" size="sm" />
                  <div className="min-w-0">
                    <span className="font-bold text-[#8F5B34] block">Nesto's Insight:</span>
                    <span className="text-[#2C332D] truncate block">
                      "Warm Sage expands north-facing living rooms with serene organic balance."
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE BAYA WEAVER CONCEPT & PHILOSOPHY */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E8DFC5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold uppercase tracking-wider mb-2">
              Our Core Inspiration
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
              Why the Baya Weaver?
            </h2>
            <p className="text-sm sm:text-base text-[#526658] mt-2">
              The Baya Weaver does not build randomly. It meticulously inspects every strand of grass, testing flexibility, weather resistance, and light harmony. Nestora brings that same thoughtful care to your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DACB] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#234B38] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E3F30]">Guided, Never Overwhelmed</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Rather than drowning you in 2,000 paint chips, Nesto curates 3-4 optimal harmony palettes tailored strictly to your natural light and floor textures.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DACB] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#F7EFE6] text-[#8F5B34] flex items-center justify-center font-bold">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E3F30]">Light-Aware Intelligence</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Colors behave differently under morning sun vs warm 2700K evening lighting. Nestora calculates Light Reflectance Values (LRV) so you never get surprised.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DACB] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#234B38] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E3F30]">Confidence Before You Buy</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Compare designs side-by-side, gather family votes, and receive actionable Nest Scores before spending a single rupee on paint or contractor work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW NESTORA WORKS (Simple 3-Step Journey) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8DFC5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F5B34]">
              Effortless Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] mt-1">
              How You Weave Your Nest in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl bg-white border border-[#E2D8C6] shadow-xs">
              <div className="text-4xl font-extrabold text-[#E5DEC3] font-mono mb-2">01</div>
              <h3 className="text-base font-bold text-[#1E3F30] mb-1">Tell Nesto About Your Space</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Select your room or exterior elevation, tell us how much natural light it receives, and pick your floor finish.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white border border-[#E2D8C6] shadow-xs">
              <div className="text-4xl font-extrabold text-[#E5DEC3] font-mono mb-2">02</div>
              <h3 className="text-base font-bold text-[#1E3F30] mb-1">Visualize & Customize in Studio</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Explore tailored recommendations, test wall finishes (Matte vs Satin), switch lighting moods, and tweak accent tones.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white border border-[#E2D8C6] shadow-xs">
              <div className="text-4xl font-extrabold text-[#E5DEC3] font-mono mb-2">03</div>
              <h3 className="text-base font-bold text-[#1E3F30] mb-1">Compare & Complete with Confidence</h3>
              <p className="text-xs sm:text-sm text-[#4A524A] leading-relaxed">
                Review your Nest Score breakdown, share family voting polls, and export your ready-to-execute paint specification sheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED PALETTES SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E8DFC5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F5B34]">
                Design Harmonies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B]">
                Crafted for Every Room Atmosphere
              </h2>
            </div>
            <button
              onClick={onExploreInspiration}
              className="text-xs font-bold text-[#234B38] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Inspirations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLOR_PALETTES.slice(0, 3).map((pal) => (
              <div
                key={pal.id}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E3DACB] p-5 space-y-4 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-[#1E3F30]">{pal.name}</span>
                    <span className="text-[10px] bg-[#EBF2EE] text-[#234B38] px-2 py-0.5 rounded-full">
                      {pal.styleMatch}
                    </span>
                  </div>
                  <p className="text-xs text-[#526658]">{pal.description}</p>
                </div>

                {/* Swatches strip */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#EAE2D2]">
                  {[pal.primaryWall, pal.accentWall, pal.ceiling, pal.accentDetails].map((s, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div
                        className="w-full h-10 rounded-lg border border-black/10 shadow-2xs"
                        style={{ backgroundColor: s.hex }}
                      />
                      <span className="text-[9px] font-medium text-[#6B726B] block mt-1 truncate">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] to-[#EFE8DC]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <NestoAvatar mood="celebrating" size="lg" className="mx-auto" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            Ready to Weave Your Dream Nest?
          </h2>
          <p className="text-base text-[#4A524A] max-w-xl mx-auto">
            Join thousands of homeowners creating calm, luminous, and personalized spaces without confusion.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartDesigning}
              className="px-7 py-3.5 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-[#FAF8F5] text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Begin Your Design Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewUXStudy}
              className="px-5 py-3.5 rounded-2xl bg-white border border-[#D5CABB] text-[#2C332D] text-sm font-semibold hover:bg-[#FAF8F5] transition-all cursor-pointer"
            >
              View UX Architecture & Laws
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
