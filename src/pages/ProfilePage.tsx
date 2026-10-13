import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { NestoAvatar } from '../components/common/NestoAvatar';
import {
  Trophy,
  Award,
  Home,
  User,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ProfilePageProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  onUpdateProfile,
  onResetData,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [homeName, setHomeName] = useState(userProfile.homeName);
  const [homeType, setHomeType] = useState(userProfile.homeType);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      homeName,
      homeType,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const ranks = [
    { title: 'Apprentice Builder', minXP: 0, desc: 'Started weaving first room palettes.' },
    { title: 'Baya Weaver', minXP: 200, desc: 'Completed 2+ spaces with balanced LRV lighting.' },
    { title: 'Master Weaver', minXP: 500, desc: 'Crafted multi-room harmonies with family consensus.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#F4EFE6] border border-[#E2D8C6] rounded-3xl p-6 shadow-xs">
        <NestoAvatar mood="happy" size="xl" />
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#234B38]">
            Weaver Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            {userProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A524A]">
            Current Home: <span className="font-bold text-[#1E3F30]">{userProfile.homeName}</span> ({userProfile.homeType})
          </p>
        </div>
      </div>

      {/* Ranks & Gamified Progress */}
      <div className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#E5A83B]" />
            <h3 className="text-lg font-bold text-[#1E3F30]">Weaver Mastery & Progression</h3>
          </div>
          <span className="text-xs font-bold text-[#8F5B34] bg-[#F7EFE6] px-3 py-1 rounded-full">
            {userProfile.xp} XP Earned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {ranks.map((r, i) => {
            const isAchieved = userProfile.xp >= r.minXP;
            return (
              <div
                key={i}
                className={`p-4 rounded-2xl border ${
                  isAchieved
                    ? 'bg-[#EBF2EE]/50 border-[#234B38]/30'
                    : 'bg-[#FAF8F5] border-[#EAE2D2] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1E3F30]">{r.title}</span>
                  {isAchieved && <CheckCircle2 className="w-4 h-4 text-[#234B38]" />}
                </div>
                <p className="text-[11px] text-[#526658] leading-tight">{r.desc}</p>
                <span className="text-[10px] font-mono text-[#8F5B34] font-semibold mt-2 block">
                  {r.minXP} XP Required
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#8F5B34]" />
          <h3 className="text-lg font-bold text-[#1E3F30]">Earned Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {userProfile.badges.map((b) => (
            <div key={b.id} className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC5] text-center space-y-1">
              <span className="text-2xl">{b.icon}</span>
              <div className="text-xs font-bold text-[#1C1E1B]">{b.name}</div>
              <div className="text-[10px] text-[#6B726B] leading-tight">{b.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E0D7C6] p-6 space-y-4 shadow-xs">
        <h3 className="text-lg font-bold text-[#1E3F30]">Home & Profile Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] text-xs font-medium focus:ring-1 focus:ring-[#234B38] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">Home / Project Name</label>
            <input
              type="text"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] text-xs font-medium focus:ring-1 focus:ring-[#234B38] outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-[#8F5B34] uppercase tracking-wider block">Dwelling Type</label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] text-xs font-medium focus:ring-1 focus:ring-[#234B38] outline-none bg-white"
            >
              <option value="Modern Apartment">Modern Apartment</option>
              <option value="Independent Villa">Independent Villa</option>
              <option value="Row House">Row House</option>
              <option value="Studio Apartment">Studio Apartment</option>
              <option value="Heritage Bunglow">Heritage Bungalow</option>
            </select>
          </div>
        </div>

        {savedToast && (
          <div className="p-2.5 bg-[#EBF2EE] text-[#234B38] text-xs font-bold rounded-xl text-center">
            Profile saved successfully!
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all demo data and start fresh?')) {
                onResetData();
              }
            }}
            className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
