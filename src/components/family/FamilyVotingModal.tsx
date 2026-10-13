import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FamilyVote, ProjectNest } from '../../types';
import { NestoAvatar } from '../common/NestoAvatar';
import { StorageService } from '../../services/storageService';
import { X, Users, Heart, Plus, MessageCircle, Check, ThumbsUp } from 'lucide-react';

interface FamilyVotingModalProps {
  project: ProjectNest | null;
  isOpen: boolean;
  onClose: () => void;
  onVoteAdded?: () => void;
}

export const FamilyVotingModal: React.FC<FamilyVotingModalProps> = ({
  project,
  isOpen,
  onClose,
  onVoteAdded,
}) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [newRole, setNewRole] = useState('Family Member');
  const [selectedDesignName, setSelectedDesignName] = useState(
    project?.currentDesign.name || 'Warm Sage Retreat'
  );
  const [comment, setComment] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen || !project) return null;

  const votes: FamilyVote[] = project.familyVotes || [];

  const handleAddVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const colors = ['bg-emerald-600', 'bg-amber-700', 'bg-teal-700', 'bg-stone-700'];
    const randomBg = colors[votes.length % colors.length];

    const newVote: FamilyVote = {
      id: `vote_${Date.now()}`,
      memberName: newMemberName.trim(),
      role: newRole,
      avatarBg: randomBg,
      preferredDesignId: project.selectedRecommendationId || 'custom_des_01',
      preferredDesignName: selectedDesignName,
      comment: comment.trim() || 'Looks cozy and peaceful!',
      votedAt: 'Just now',
    };

    StorageService.addFamilyVote(project.id, newVote);
    setNewMemberName('');
    setComment('');
    setIsAdding(false);
    onVoteAdded?.();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border border-[#E0D7C6] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#234B38] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-white/10 text-[#E5A83B]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Family Nest Harmony Poll</h3>
                <p className="text-xs text-[#DCD3C2]">{project.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Nesto Consensus Banner */}
            <div className="p-3.5 bg-[#F4EFE6] rounded-2xl border border-[#E2D8C6] flex items-start gap-3">
              <NestoAvatar mood="happy" size="sm" />
              <div className="text-xs text-[#2C332D]">
                <div className="font-bold text-[#8F5B34] mb-0.5">Family Consensus:</div>
                <p className="leading-relaxed">
                  {votes.length > 0
                    ? `"${votes[0]?.preferredDesignName}" is currently the family favorite with strong agreement on botanical calm.`
                    : 'Invite your family members to share their preferences to make a confident collective choice!'}
                </p>
              </div>
            </div>

            {/* List of existing votes */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#8F5B34] px-1">
                <span>Family Members ({votes.length})</span>
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="text-[#234B38] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member Vote</span>
                  </button>
                )}
              </div>

              {votes.map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#E3DACB] flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${v.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {v.memberName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1C1E1B]">{v.memberName}</span>
                        <span className="text-[10px] text-[#8F5B34] bg-[#F4EFE6] px-1.5 py-0.5 rounded-md font-medium">
                          {v.role}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#234B38] mt-0.5">
                        Prefers: {v.preferredDesignName}
                      </div>
                      <p className="text-xs text-[#4A524A] mt-1 italic">
                        "{v.comment}"
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8F5B34] shrink-0">{v.votedAt}</span>
                </div>
              ))}
            </div>

            {/* Add new vote form */}
            {isAdding && (
              <form
                onSubmit={handleAddVote}
                className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#234B38]/20 space-y-3"
              >
                <div className="text-xs font-bold text-[#1E3F30]">Add Family Feedback</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Name (e.g. Rahul, Sneha)"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#D5CABB] bg-white text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
                  />
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#D5CABB] bg-white text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
                  >
                    <option value="Self">Self</option>
                    <option value="Partner">Partner / Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Friend">Friend / Architect</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Design Option (e.g. Warm Sage Retreat)"
                  value={selectedDesignName}
                  onChange={(e) => setSelectedDesignName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CABB] bg-white text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
                />

                <textarea
                  placeholder="What do they like or suggest about this space?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CABB] bg-white text-[#1C1E1B] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
                />

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-1.5 text-xs text-[#6B726B] hover:underline cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#234B38] text-white text-xs font-bold shadow-xs hover:bg-[#1E3F30] cursor-pointer"
                  >
                    Save Vote
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="p-4 border-t border-[#E8DFC5] bg-[#F4EFE6] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#234B38] text-white text-xs font-bold hover:bg-[#1E3F30] cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
