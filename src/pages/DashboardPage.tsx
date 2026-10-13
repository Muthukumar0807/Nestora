import React from 'react';
import { motion } from 'motion/react';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { NestoBubble } from '../components/common/NestoBubble';
import { DesignChallenge, ProjectNest, RoomType, SpaceCategory, UserProfile } from '../types';
import { StorageService } from '../services/storageService';
import {
  PlusCircle,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Trophy,
  Layers,
  Compass,
  Home,
  Sun,
  Flame,
} from 'lucide-react';

interface DashboardPageProps {
  userProfile: UserProfile;
  projects: ProjectNest[];
  onStartNewNest: (category: SpaceCategory, room?: RoomType) => void;
  onResumeNest: (projectId: string) => void;
  onOpenInspiration: () => void;
  onOpenChallenges: (challenge?: DesignChallenge) => void;
  onOpenNestoChat: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userProfile,
  projects,
  onStartNewNest,
  onResumeNest,
  onOpenInspiration,
  onOpenChallenges,
  onOpenNestoChat,
}) => {
  // Find active in-progress project for Zeigarnik effect
  const activeNest = projects.find((p) => p.status === 'building') || projects[0];
  const completedNests = projects.filter((p) => p.status === 'completed');

  // Dynamic daily challenge
  const allChallenges = StorageService.getChallenges();
  const dailyChallenge = allChallenges.find((c) => !c.isCompleted) || allChallenges[0];

  const quickRoomStarters: { type: RoomType; label: string; cat: SpaceCategory; desc: string }[] = [
    { type: 'living_room', label: 'Living Room', cat: 'interior', desc: 'Botanical & earthy calm' },
    { type: 'bedroom', label: 'Bedroom', cat: 'interior', desc: 'Restful sleep sanctuaries' },
    { type: 'kitchen', label: 'Kitchen & Dining', cat: 'interior', desc: 'Bright, functional balance' },
    { type: 'front_elevation', label: 'Front Elevation', cat: 'exterior', desc: 'High curb appeal facade' },
    { type: 'balcony', label: 'Balcony Oasis', cat: 'interior', desc: 'Cozy outdoor greenery' },
    { type: 'study_room', label: 'Study & Work Nook', cat: 'interior', desc: 'Deep focus harmonies' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* 1. WELCOME HEADER & NESTO GREETING */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F4EFE6] border border-[#E2D8C7] rounded-3xl p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <NestoAvatar mood="happy" size="lg" />
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold mb-1">
              <span>{userProfile.homeName}</span>
              <span>•</span>
              <span>Rank: {userProfile.weaverRank}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
              Welcome back, {userProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A524A] mt-1">
              "Let's weave your home together. Where shall we bring harmony today?"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => onStartNewNest('interior')}
            className="px-5 py-2.5 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Build a New Nest</span>
          </button>
        </div>
      </div>

      {/* 2. ZEIGARNIK EFFECT: RESUME IN-PROGRESS NEST (High prominence) */}
      {activeNest && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#234B38]/30 rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8F5B34] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#C28E58]" />
                <span>Continue Building Your Nest (Zeigarnik Effect)</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#1E3F30]">
                {activeNest.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#4A524A]">
                Current status: <span className="font-semibold text-[#234B38]">{activeNest.status.replace('_', ' ').toUpperCase()}</span> • Currently configured with {activeNest.currentDesign.style} palette.
              </p>

              {/* Progress bar */}
              <div className="pt-2 max-w-md">
                <div className="flex items-center justify-between text-xs font-bold text-[#6B726B] mb-1">
                  <span>Nest Progress</span>
                  <span className="text-[#234B38]">
                    {activeNest.status === 'completed' ? '100%' : '65% Complete'}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#EDE7DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#234B38] to-[#8F5B34] rounded-full transition-all duration-500"
                    style={{ width: activeNest.status === 'completed' ? '100%' : '65%' }}
                  />
                </div>
              </div>
            </div>

            {/* Resume CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onResumeNest(activeNest.id)}
                className="px-6 py-3 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Resume in Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. QUICK SPACE STARTERS (Hick's Law 6 curated spaces) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1C1E1B]">Start Designing a Space</h3>
            <p className="text-xs text-[#6B726B]">
              Pick any room or exterior surface to begin Nesto's step-by-step guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {quickRoomStarters.map((room) => (
            <motion.button
              key={room.type}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartNewNest(room.cat, room.type)}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E0D7C6] hover:border-[#234B38] hover:bg-white text-left transition-all cursor-pointer shadow-2xs group flex flex-col justify-between h-36"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EBF2EE] text-[#234B38] flex items-center justify-center font-bold group-hover:bg-[#234B38] group-hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C1E1B] group-hover:text-[#234B38] transition-colors">
                  {room.label}
                </div>
                <div className="text-[10px] text-[#6B726B] leading-tight mt-0.5">
                  {room.desc}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 4. RECENT NESTS & DAILY CHALLENGE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Nests (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1C1E1B] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8F5B34]" />
              <span>Your Saved & Recent Nests</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((nest) => (
              <div
                key={nest.id}
                className="bg-white border border-[#E3DACB] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#1E3F30]">{nest.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        nest.status === 'completed'
                          ? 'bg-[#EBF2EE] text-[#234B38]'
                          : 'bg-[#FDF6EC] text-[#8F5B34]'
                      }`}
                    >
                      {nest.status === 'completed' ? 'Completed' : 'Building'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B726B]">
                    {nest.currentDesign.style} • Score {nest.currentDesign.score.overall}/100
                  </p>
                </div>

                {/* Color swatches preview */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-[#EFE8DC]">
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: nest.currentDesign.wallColor }}
                    title="Wall"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: nest.currentDesign.accentColor }}
                    title="Accent"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                    style={{ backgroundColor: nest.currentDesign.ceilingColor }}
                    title="Ceiling"
                  />

                  <button
                    onClick={() => onResumeNest(nest.id)}
                    className="ml-auto text-xs font-bold text-[#234B38] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Challenge Card (1 col) */}
        <div className="bg-[#FAF8F5] border border-[#E2D8C7] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#8F5B34]">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#E5A83B]" />
                <span>Today's Nest Challenge</span>
              </div>
              {dailyChallenge?.isCompleted && (
                <span className="text-[10px] bg-[#EBF2EE] text-[#234B38] px-2 py-0.5 rounded-full font-bold">
                  Completed
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-[#1E3F30]">
              {dailyChallenge?.title || 'The Sunlit Mirage Challenge'}
            </h4>
            <p className="text-xs text-[#4A524A] leading-relaxed line-clamp-2">
              {dailyChallenge?.description || 'Design a north-facing bedroom with high light-reflectance neutrals under ₹40,000.'}
            </p>
          </div>

          <button
            onClick={() => onOpenChallenges(dailyChallenge)}
            className="w-full py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{dailyChallenge?.isCompleted ? 'View Challenge Center' : `Take Challenge (+${dailyChallenge?.xpReward || 150} XP)`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. NESTO'S PEARL OF WISDOM */}
      <NestoBubble
        mood="guiding"
        title="Nesto's Design Tip of the Day"
        message="When choosing accent walls, place the feature color on the wall that receives direct natural light from the side rather than facing the window directly. This prevents harsh glare and enriches pigment depth."
        quickChoices={[
          { label: 'Explore Botanical Greens', action: onOpenInspiration },
          { label: 'Ask Nesto a Question', action: onOpenNestoChat },
        ]}
      />
    </div>
  );
};
