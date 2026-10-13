import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignChallenge, UserProfile } from '../../types';
import { NestoAvatar } from '../common/NestoAvatar';
import { StorageService } from '../../services/storageService';
import {
  X,
  Trophy,
  Sparkles,
  CheckCircle2,
  Award,
  ArrowRight,
  Target,
  Coins,
  Compass,
  Check,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChallengeModalProps {
  challenge?: DesignChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChallenge: (challenge: DesignChallenge) => void;
  onChallengeCompleted?: (updatedProfile: UserProfile) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge: initialChallenge,
  isOpen,
  onClose,
  onStartChallenge,
  onChallengeCompleted,
}) => {
  const [challenges, setChallenges] = useState<DesignChallenge[]>(() =>
    StorageService.getChallenges()
  );
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    initialChallenge?.id || challenges[0]?.id || 'chal_low_light_bedroom'
  );
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [claimedJustNow, setClaimedJustNow] = useState<string | null>(null);

  // Sync state whenever modal opens or initialChallenge changes
  useEffect(() => {
    if (isOpen) {
      const freshChallenges = StorageService.getChallenges();
      setChallenges(freshChallenges);
      if (initialChallenge) {
        setSelectedChallengeId(initialChallenge.id);
      } else if (!freshChallenges.find((c) => c.id === selectedChallengeId)) {
        setSelectedChallengeId(freshChallenges[0]?.id || 'chal_low_light_bedroom');
      }
      setClaimedJustNow(null);
    }
  }, [isOpen, initialChallenge]);

  if (!isOpen) return null;

  const currentChallenge =
    challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const handleCompleteNow = (challengeToComplete: DesignChallenge) => {
    const result = StorageService.completeChallenge(challengeToComplete.id);
    if (result) {
      setChallenges(StorageService.getChallenges());
      setClaimedJustNow(challengeToComplete.id);

      if (onChallengeCompleted) {
        onChallengeCompleted(result.updatedProfile);
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#234B38', '#C28E58', '#E5A83B', '#B86A4C', '#A3B899'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const filteredChallenges = challenges.filter((c) => {
    if (filter === 'active') return !c.isCompleted;
    if (filter === 'completed') return c.isCompleted;
    return true;
  });

  const completedCount = challenges.filter((c) => c.isCompleted).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1D15]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border border-[#E0D7C6] shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#234B38] via-[#2C5741] to-[#1E3F30] p-5 sm:p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#E5A83B] shadow-inner">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#E5A83B] bg-white/10 px-2 py-0.5 rounded-full">
                      Baya Weaver Mastery
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      {completedCount}/{challenges.length} Solved
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                    Nest Design Challenges
                  </h2>
                </div>
              </div>

              {/* Progress pill */}
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                <Flame className="w-4 h-4 text-[#E5A83B]" />
                <span className="text-xs font-semibold text-[#EDE7DC]">
                  Solve constraints to unlock Master Weaver badges
                </span>
              </div>
            </div>
          </div>

          {/* Modal Content with Challenge Selector & Details */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E8DFC5] pb-3">
              <div className="flex items-center gap-2">
                {(['all', 'active', 'completed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      filter === f
                        ? 'bg-[#234B38] text-white shadow-xs'
                        : 'bg-[#F2ECE1] text-[#556157] hover:bg-[#EAE2D4]'
                    }`}
                  >
                    {f} {f === 'completed' ? `(${completedCount})` : ''}
                  </button>
                ))}
              </div>
              <span className="text-xs text-[#6B726B] font-medium hidden sm:inline">
                Click any challenge card to inspect objectives
              </span>
            </div>

            {/* Challenge List Cards (Carousel / Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {filteredChallenges.map((c) => {
                const isSelected = c.id === selectedChallengeId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedChallengeId(c.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative flex flex-col justify-between h-36 ${
                      isSelected
                        ? 'bg-white border-[#234B38] shadow-md ring-2 ring-[#234B38]/20'
                        : 'bg-[#F9F6F0] border-[#E5DEC3] hover:border-[#234B38]/50 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-[#8F5B34] uppercase tracking-wider">
                          {c.roomType.replace('_', ' ')}
                        </span>
                        {c.isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#234B38] bg-[#EBF2EE] px-1.5 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#C28E58] bg-[#FAF2E6] px-1.5 py-0.5 rounded-md">
                            +{c.xpReward} XP
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#1C1E1B] line-clamp-2 leading-tight">
                        {c.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#6B726B] pt-2 border-t border-[#EFE8DC]">
                      <span className="font-medium text-[#234B38]">{c.budgetLimit}</span>
                      <span className="text-[10px] font-semibold text-[#8F5B34] truncate max-w-[80px]">
                        {c.rewardBadge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Challenge In-Depth Breakdown */}
            {currentChallenge && (
              <motion.div
                key={currentChallenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[#E0D7C6] p-5 space-y-4 shadow-xs"
              >
                {/* Challenge Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EFE8DC]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#234B38] text-[11px] font-bold">
                        {currentChallenge.roomType.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2E6] text-[#8F5B34] text-[11px] font-bold">
                        Target Style: {currentChallenge.recommendedStyle}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
                      {currentChallenge.title}
                    </h3>
                    <p className="text-xs text-[#526658] mt-0.5">{currentChallenge.tagline}</p>
                  </div>

                  {currentChallenge.isCompleted && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF2EE] text-[#234B38] border border-[#234B38]/20 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-[#234B38]" />
                      <span className="text-xs font-bold">Challenge Completed</span>
                    </div>
                  )}
                </div>

                {/* Nesto Advice Box */}
                <div className="p-4 bg-[#F4EFE6] rounded-2xl border border-[#E2D8C6] flex items-start gap-3.5">
                  <NestoAvatar
                    mood={
                      currentChallenge.isCompleted || claimedJustNow === currentChallenge.id
                        ? 'celebrating'
                        : 'guiding'
                    }
                    size="md"
                  />
                  <div className="text-xs text-[#2C332D] space-y-1">
                    <div className="font-bold text-[#8F5B34] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Nesto's Challenge Brief:</span>
                    </div>
                    <p className="leading-relaxed">{currentChallenge.description}</p>
                  </div>
                </div>

                {/* Constraints & Color Swatches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DEC3] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8F5B34] uppercase">
                      <Target className="w-3.5 h-3.5" />
                      <span>Specific Constraint</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1C1E1B]">
                      {currentChallenge.constraint}
                    </p>
                    <div className="text-[11px] text-[#6B726B] font-medium">
                      Budget Cap: <span className="text-[#234B38] font-bold">{currentChallenge.budgetLimit}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DEC3] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#8F5B34] uppercase">
                        Recommended Initial Palette
                      </span>
                      <span className="text-[10px] font-semibold text-[#234B38]">
                        {currentChallenge.initialPalette.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        <div
                          className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs"
                          style={{ backgroundColor: currentChallenge.initialPalette.wallBase.hex }}
                          title={`Wall: ${currentChallenge.initialPalette.wallBase.name} (${currentChallenge.initialPalette.wallBase.hex})`}
                        />
                        <div
                          className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs"
                          style={{ backgroundColor: currentChallenge.initialPalette.accent.hex }}
                          title={`Accent: ${currentChallenge.initialPalette.accent.name} (${currentChallenge.initialPalette.accent.hex})`}
                        />
                        <div
                          className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs"
                          style={{ backgroundColor: currentChallenge.initialPalette.ceiling.hex }}
                          title={`Ceiling: ${currentChallenge.initialPalette.ceiling.name} (${currentChallenge.initialPalette.ceiling.hex})`}
                        />
                        <div
                          className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs"
                          style={{ backgroundColor: currentChallenge.initialPalette.trim.hex }}
                          title={`Trim: ${currentChallenge.initialPalette.trim.name} (${currentChallenge.initialPalette.trim.hex})`}
                        />
                      </div>
                      <span className="text-[11px] text-[#556157] font-medium">
                        {currentChallenge.initialPalette.wallBase.lrv}% LRV Base
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reward Callout */}
                <div className="p-3.5 rounded-xl bg-[#EBF2EE] border border-[#234B38]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-lg shadow-2xs">
                      🏆
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E3F30]">
                        Unlock Badge: <span className="text-[#8F5B34]">{currentChallenge.rewardBadge}</span>
                      </div>
                      <div className="text-[11px] text-[#4A524A]">
                        Awarded upon designing or verifying constraint harmony
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-3 py-1 rounded-full bg-[#234B38] text-white text-xs font-bold">
                      +{currentChallenge.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E8DFC5]">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6B726B] hover:bg-[#EFE9DF] transition-colors cursor-pointer text-center"
                  >
                    Close
                  </button>

                  {!currentChallenge.isCompleted ? (
                    <button
                      onClick={() => handleCompleteNow(currentChallenge)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#8F5B34] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#E2D8C6] transition-all cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Claim +{currentChallenge.xpReward} XP & Badge</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-bold text-[#234B38] px-3 py-2">
                      <Check className="w-4 h-4" />
                      <span>Badge Claimed</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onStartChallenge(currentChallenge);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Start Designing in Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
