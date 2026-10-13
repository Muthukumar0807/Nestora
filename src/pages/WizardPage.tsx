import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BudgetFocus,
  BudgetTier,
  DesignGoal,
  DesignStyle,
  FlooringType,
  LightCondition,
  RoomSize,
  RoomType,
  SpaceCategory,
  UserPreferences,
} from '../types';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { NestoBubble } from '../components/common/NestoBubble';
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Home,
  Compass,
  Sparkles,
  CheckCircle2,
  Sliders,
  DollarSign,
  Palette,
  Maximize2,
  TreePine,
  Coffee,
  Feather,
  Flame,
  Shield,
  Layers,
} from 'lucide-react';

interface WizardPageProps {
  initialPrefs: UserPreferences;
  onCompleteWizard: (prefs: UserPreferences) => void;
  onCancel: () => void;
}

export const WizardPage: React.FC<WizardPageProps> = ({
  initialPrefs,
  onCompleteWizard,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isWeaving, setIsWeaving] = useState<boolean>(false);
  const [weavingStage, setWeavingStage] = useState<string>('Analyzing natural lighting & exposure...');

  const [prefs, setPrefs] = useState<UserPreferences>(initialPrefs);

  const totalSteps = 4;

  const interiorRooms: { id: RoomType; label: string; desc: string }[] = [
    { id: 'living_room', label: 'Living Room', desc: 'Central family gathering space' },
    { id: 'bedroom', label: 'Bedroom', desc: 'Restful circadian sleep retreat' },
    { id: 'kitchen', label: 'Kitchen & Dining', desc: 'Bright, culinary daily hub' },
    { id: 'study_room', label: 'Study & Work Nook', desc: 'Deep focus & productivity' },
    { id: 'bathroom', label: 'Bathroom', desc: 'Clean, luminous sanctuary' },
    { id: 'balcony', label: 'Balcony Oasis', desc: 'Breezy outdoor greenery' },
  ];

  const exteriorRooms: { id: RoomType; label: string; desc: string }[] = [
    { id: 'front_elevation', label: 'Front Elevation', desc: 'Main facade & architectural curb appeal' },
    { id: 'exterior_wall', label: 'Exterior Walls', desc: 'Weather-resilient masonry coats' },
    { id: 'door_window', label: 'Door & Windows', desc: 'Heritage teak & framed trims' },
    { id: 'balcony', label: 'Exterior Balcony', desc: 'Outdoor railings & louvers' },
    { id: 'gate', label: 'Main Entrance Gate', desc: 'Boundary & welcoming hardware' },
    { id: 'roof', label: 'Roof & Parapet', desc: 'Terrace & upper eaves' },
  ];

  const moods: { id: DesignGoal; label: string; desc: string; icon: any }[] = [
    { id: 'calm_peaceful', label: 'Calm & Peaceful', desc: 'Gentle botanical sage, warm linen, low visual noise', icon: Feather },
    { id: 'spacious_airy', label: 'Spacious & Airy', desc: 'High light-reflectance neutrals, crisp brightness', icon: Sun },
    { id: 'warm_cozy', label: 'Warm & Cozy', desc: 'Terracotta earth, amber glow, inviting intimacy', icon: Flame },
    { id: 'modern_minimal', label: 'Modern & Minimal', desc: 'Clean lines, smoked accents, zero clutter', icon: Maximize2 },
    { id: 'natural_earthy', label: 'Natural & Earthy', desc: 'Teak grain, jute textures, organic grounding', icon: TreePine },
    { id: 'timeless_luxury', label: 'Timeless Luxury', desc: 'Subtle velvet depth, brass touches, refined finish', icon: Sparkles },
  ];

  const styles: { id: DesignStyle; label: string; desc: string }[] = [
    { id: 'Warm Earth', label: 'Warm Earth', desc: 'Terracotta, ochre, teak & botanical tones' },
    { id: 'Calm Scandinavian', label: 'Calm Scandinavian', desc: 'Airy chalk neutrals, misty blues & light oak' },
    { id: 'Contemporary Indian', label: 'Contemporary Indian', desc: 'Baya forest emerald, warm ivory & brass' },
    { id: 'Japandi Serenity', label: 'Japandi Serenity', desc: 'Wabi-sabi simplicity, moss stone & bamboo' },
    { id: 'Modern Minimal', label: 'Modern Minimal', desc: 'Architectural charcoal, soft white & warm metal' },
    { id: 'Soft Luxury', label: 'Soft Luxury', desc: 'Rich muted tones, velvet matte walls & walnut' },
  ];

  const flooringOptions: { id: FlooringType; label: string }[] = [
    { id: 'light_oak_wood', label: 'Light Oak Wood' },
    { id: 'dark_walnut_wood', label: 'Dark Walnut / Teak' },
    { id: 'warm_beige_tile', label: 'Warm Beige Tiles' },
    { id: 'cool_grey_marble', label: 'Grey Italian Marble' },
    { id: 'terracotta', label: 'Terracotta Clay Tiles' },
    { id: 'natural_stone', label: 'Natural Kota / Slate Stone' },
  ];

  const colorFamilyOptions = [
    'Earthy Sage Green',
    'Warm Terracotta',
    'Soft Sand Linen',
    'Smoked Charcoal',
    'Nordic Fog Blue',
    'Amber Ochre',
    'Pure Cloud White',
  ];

  const handleFinishWizard = () => {
    setIsWeaving(true);

    const stages = [
      'Nesto is inspecting your room orientation...',
      'Calculating Light Reflectance Values (LRV)...',
      'Harmonizing wall undertones with your flooring...',
      'Weaving 4 curated design options...',
    ];

    stages.forEach((msg, idx) => {
      setTimeout(() => {
        setWeavingStage(msg);
      }, idx * 600);
    });

    setTimeout(() => {
      setIsWeaving(false);
      onCompleteWizard(prefs);
    }, 2500);
  };

  const currentRooms = prefs.spaceCategory === 'interior' ? interiorRooms : exteriorRooms;

  // Nesto's contextual step message
  const getNestoStepMessage = () => {
    switch (step) {
      case 1:
        return `Let's start by choosing what space we are designing. Are we building an interior room or crafting exterior curb appeal?`;
      case 2:
        return `Lighting and flooring are the foundation of any room. A low-light room needs lighter walls to breathe, while high-light rooms can enjoy richer accents.`;
      case 3:
        return `How do you want this space to feel when you walk in? You don't need to know color codes—just tell me your desired atmosphere.`;
      case 4:
      default:
        return `Almost ready! Tell me any colors you love or want to avoid, and where you'd like your investment to focus.`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Header & Goal Gradient Progress */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={step === 1 ? onCancel : () => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#6B726B] hover:text-[#1C1E1B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel & Return' : 'Back'}</span>
          </button>

          <span className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider">
            Step {step} of {totalSteps} • Goal-Gradient Progress
          </span>
        </div>

        {/* Visual Progress Bar (Goal-Gradient Effect) */}
        <div className="w-full h-2.5 bg-[#EDE7DC] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#234B38] rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Nesto's Guidance Bubble */}
        <NestoBubble
          mood={step === 4 ? 'celebrating' : 'guiding'}
          title={`Nesto • Step ${step} Guidance`}
          message={getNestoStepMessage()}
          compact={true}
        />
      </div>

      {/* WEAVING LOADING STATE OVERLAY */}
      <AnimatePresence>
        {isWeaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <NestoAvatar mood="thinking" size="xl" className="mb-6" />
            <h3 className="text-2xl font-extrabold text-[#1E3F30] mb-2 font-['Plus_Jakarta_Sans']">
              Nesto is Weaving Your Recommendations
            </h3>
            <p className="text-sm font-semibold text-[#8F5B34] max-w-md animate-pulse">
              {weavingStage}
            </p>

            <div className="w-64 h-2 bg-[#EDE7DC] rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
                className="h-full bg-[#234B38] rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 1: INTERIOR/EXTERIOR & ROOM SELECTION */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 bg-[#FAF8F5] border border-[#E3DACB] rounded-3xl p-6 sm:p-8 shadow-xs"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B]">
              What space are we designing today?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B726B] mt-1">
              Select Interior or Exterior, then pick the specific room.
            </p>
          </div>

          {/* Interior vs Exterior Switcher */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { id: 'interior', label: 'Interior Design' },
              { id: 'exterior', label: 'Exterior & Facade' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setPrefs({
                    ...prefs,
                    spaceCategory: cat.id as SpaceCategory,
                    roomType: cat.id === 'interior' ? 'living_room' : 'front_elevation',
                  })
                }
                className={`py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  prefs.spaceCategory === cat.id
                    ? 'bg-[#234B38] text-white border-[#234B38] shadow-xs'
                    : 'bg-white text-[#4A524A] border-[#D5CABB] hover:bg-[#F2EDE4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Room Selection Grid (Hick's Law 6 choices) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {currentRooms.map((room) => {
              const isSelected = prefs.roomType === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setPrefs({ ...prefs, roomType: room.id })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'bg-white border-[#234B38] ring-2 ring-[#234B38]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E0D7C6] hover:bg-white hover:border-[#D5CABB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1C1E1B]">{room.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#234B38]" />}
                  </div>
                  <span className="text-xs text-[#6B726B] leading-relaxed">{room.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Continue Action */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Continue to Lighting & Floor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: LIGHTING & FLOORING CONDITIONS */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 bg-[#FAF8F5] border border-[#E3DACB] rounded-3xl p-6 sm:p-8 shadow-xs"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B]">
              Tell Nesto about the space conditions
            </h2>
            <p className="text-xs sm:text-sm text-[#6B726B] mt-1">
              Natural light and floor texture dictate which pigments will look best in reality.
            </p>
          </div>

          {/* Natural Light Exposure (Low / Medium / High) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
              Natural Daylight Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'low', label: 'Low Natural Light', desc: 'North-facing or few windows; needs light bounce' },
                { id: 'medium', label: 'Moderate / Balanced', desc: 'Standard windows with gentle filtered daylight' },
                { id: 'high', label: 'High / Bright Sunlight', desc: 'Large south/west windows with direct sun' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setPrefs({ ...prefs, lighting: l.id as LightCondition })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    prefs.lighting === l.id
                      ? 'bg-white border-[#234B38] ring-2 ring-[#234B38]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E0D7C6] hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-[#1C1E1B] mb-1">{l.label}</div>
                  <div className="text-[11px] text-[#6B726B] leading-tight">{l.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flooring Texture */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
              Existing or Planned Flooring
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {flooringOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPrefs({ ...prefs, flooring: f.id })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    prefs.flooring === f.id
                      ? 'bg-white border-[#234B38] text-[#234B38] ring-1 ring-[#234B38]'
                      : 'bg-[#FAF8F5] border-[#E0D7C6] text-[#4A524A] hover:bg-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Room Size */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
              Approximate Room Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'compact', label: 'Compact (<120 sq ft)' },
                { id: 'medium', label: 'Medium (120–250 sq ft)' },
                { id: 'spacious', label: 'Spacious (>250 sq ft)' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setPrefs({ ...prefs, roomSize: s.id as RoomSize })}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                    prefs.roomSize === s.id
                      ? 'bg-[#234B38] text-white border-[#234B38]'
                      : 'bg-white text-[#4A524A] border-[#E0D7C6]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs font-semibold text-[#6B726B] hover:underline cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Continue to Desired Mood</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: DESIRED MOOD & STYLE */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 bg-[#FAF8F5] border border-[#E3DACB] rounded-3xl p-6 sm:p-8 shadow-xs"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B]">
              What feeling should your space have?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B726B] mt-1">
              Choose the emotional atmosphere you want to experience in this room.
            </p>
          </div>

          {/* Mood selection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = prefs.desiredGoal === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPrefs({ ...prefs, desiredGoal: m.id })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'bg-white border-[#234B38] ring-2 ring-[#234B38]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E0D7C6] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#EBF2EE] text-[#234B38]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1C1E1B]">{m.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#234B38]" />}
                  </div>
                  <p className="text-[11px] text-[#6B726B] leading-tight mt-2">{m.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Aesthetic Style match */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
              Preferred Design Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {styles.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setPrefs({ ...prefs, preferredStyle: st.id })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    prefs.preferredStyle === st.id
                      ? 'bg-white border-[#234B38] text-[#234B38] ring-1 ring-[#234B38]'
                      : 'bg-[#FAF8F5] border-[#E0D7C6] text-[#4A524A] hover:bg-white'
                  }`}
                >
                  <div>{st.label}</div>
                  <div className="text-[10px] text-[#6B726B] font-normal mt-0.5 truncate">
                    {st.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 text-xs font-semibold text-[#6B726B] hover:underline cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Continue to Color & Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: COLOR PREFERENCES & BUDGET FOCUS */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 bg-[#FAF8F5] border border-[#E3DACB] rounded-3xl p-6 sm:p-8 shadow-xs"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B]">
              Color preferences & budget focus
            </h2>
            <p className="text-xs sm:text-sm text-[#6B726B] mt-1">
              Select which color families feel like home to you.
            </p>
          </div>

          {/* Favorite Color Families Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
              Colors You Like
            </label>
            <div className="flex flex-wrap gap-2">
              {colorFamilyOptions.map((c) => {
                const isSelected = prefs.favoriteColorFamilies.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => {
                      const updated = isSelected
                        ? prefs.favoriteColorFamilies.filter((f) => f !== c)
                        : [...prefs.favoriteColorFamilies, c];
                      setPrefs({ ...prefs, favoriteColorFamilies: updated });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#234B38] text-white border-[#234B38]'
                        : 'bg-white text-[#4A524A] border-[#D8CEBD] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Tier & Investment Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
                Approximate Budget Range
              </label>
              <select
                value={prefs.budgetTier}
                onChange={(e) => setPrefs({ ...prefs, budgetTier: e.target.value as BudgetTier })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-white text-xs font-semibold text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              >
                <option value="budget_friendly">Budget-Friendly (₹30,000 – ₹50,000)</option>
                <option value="moderate">Moderate (₹50,000 – ₹80,000)</option>
                <option value="premium">Premium (₹80,000 – ₹1,30,000)</option>
                <option value="luxury">Luxury Signature (&gt;₹1,30,000)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">
                Where would you like to invest more?
              </label>
              <select
                value={prefs.budgetFocus}
                onChange={(e) => setPrefs({ ...prefs, budgetFocus: e.target.value as BudgetFocus })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-white text-xs font-semibold text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              >
                <option value="paint_accents">Paints & Feature Accent Walls</option>
                <option value="ambient_lighting">Warm Ambient Lighting & Fixtures</option>
                <option value="furniture_layout">Furniture & Natural Textiles</option>
                <option value="balanced">Balanced Across Everything</option>
              </select>
            </div>
          </div>

          {/* Finish & Reveal Recommendations */}
          <div className="pt-6 flex items-center justify-between border-t border-[#E8DFC5]">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2.5 text-xs font-semibold text-[#6B726B] hover:underline cursor-pointer"
            >
              Back
            </button>

            <button
              onClick={handleFinishWizard}
              className="px-7 py-3.5 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5A83B]" />
              <span>Weave My Recommendations</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
