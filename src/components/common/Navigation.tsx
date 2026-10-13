import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, UserProfile } from '../../types';
import { Logo } from './Logo';
import { NestoAvatar } from './NestoAvatar';
import {
  Home,
  PlusCircle,
  Layers,
  Sparkles,
  Trophy,
  BookOpen,
  Layout,
  Palette,
  User,
  Menu,
  X,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  userProfile: UserProfile;
  activeNestsCount: number;
  onOpenNestoChat: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  userProfile,
  activeNestsCount,
  onOpenNestoChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'wizard', label: 'Build a Nest', icon: PlusCircle, highlight: true },
    { id: 'my_nest', label: 'My Nest', icon: Layers, badge: activeNestsCount },
    { id: 'inspiration', label: 'Inspiration', icon: Sparkles },
    { id: 'wireframes', label: 'Wireframes', icon: Layout },
    { id: 'design_system', label: 'Design System', icon: Palette },
    { id: 'ux_study', label: 'UX Rationale', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E0D2] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Logo
            onClick={() => onNavigate(currentView === 'landing' ? 'landing' : 'dashboard')}
            size="md"
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;

              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id as AppView)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#234B38] bg-[#EBF2EE]'
                      : link.highlight
                      ? 'text-[#8F5B34] bg-[#F7EFE6] hover:bg-[#EFE5D8]'
                      : 'text-[#4A524A] hover:text-[#1C1E1B] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>

                  {/* Active Indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#234B38]"
                    />
                  )}

                  {/* Badge */}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#234B38] text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Nesto Chat & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Ask Nesto Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenNestoChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E0D5C3] text-xs font-bold text-[#8F5B34] hover:border-[#8F5B34] transition-all cursor-pointer shadow-2xs"
            >
              <NestoAvatar mood="happy" size="sm" />
              <span>Ask Nesto</span>
            </motion.button>

            {/* User Profile */}
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2.5 p-1.5 pl-2.5 rounded-2xl border transition-all cursor-pointer ${
                currentView === 'profile'
                  ? 'border-[#234B38] bg-[#EBF2EE]'
                  : 'border-[#E2D7C5] bg-[#FAF8F5] hover:bg-[#F3EDE2]'
              }`}
            >
              <div className="text-right">
                <div className="text-xs font-bold text-[#1C1E1B] leading-tight truncate max-w-[100px]">
                  {userProfile.name}
                </div>
                <div className="text-[10px] text-[#8F5B34] font-medium">
                  {userProfile.weaverRank}
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#234B38] text-white flex items-center justify-center font-bold text-xs">
                {userProfile.name.charAt(0)}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenNestoChat}
              className="p-1.5 rounded-xl bg-[#F4EFE6] border border-[#E0D5C3] text-[#8F5B34]"
              aria-label="Ask Nesto"
            >
              <NestoAvatar mood="happy" size="sm" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2C332D] hover:bg-[#EFE9DF] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8E0D2] bg-[#FAF8F5] px-4 pt-2 pb-5 space-y-1 shadow-lg"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id as AppView);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-[#234B38] text-white'
                      : 'text-[#2C332D] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#8F5B34] text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#E8E0D2] mt-2">
              <button
                onClick={() => {
                  onNavigate('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#2C332D] hover:bg-[#F2EDE4]"
              >
                <User className="w-4 h-4 text-[#8F5B34]" />
                <span>My Profile ({userProfile.weaverRank})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
