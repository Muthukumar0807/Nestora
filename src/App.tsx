import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AppView,
  CustomizedDesign,
  DesignChallenge,
  DesignRecommendation,
  InspirationItem,
  ProjectNest,
  RoomType,
  SpaceCategory,
  UserPreferences,
  UserProfile,
} from './types';
import { StorageService } from './services/storageService';
import { generateRecommendations } from './services/recommendationEngine';
import { Navigation } from './components/common/Navigation';
import { NestoAvatar } from './components/common/NestoAvatar';
import { NestoChatDrawer } from './components/nesto/NestoChatDrawer';
import { ChallengeModal } from './components/challenges/ChallengeModal';
import { FamilyVotingModal } from './components/family/FamilyVotingModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { WizardPage } from './pages/WizardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { ComparePage } from './pages/ComparePage';
import { CompletionPage } from './pages/CompletionPage';
import { MyNestPage } from './pages/MyNestPage';
import { InspirationPage } from './pages/InspirationPage';
import { UXCaseStudyPage } from './pages/UXCaseStudyPage';
import { ProfilePage } from './pages/ProfilePage';
import { WireframesPage } from './pages/WireframesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { MessageSquare, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<AppView>('landing');

  // Domain & Persistence State
  const [userProfile, setUserProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [projects, setProjects] = useState<ProjectNest[]>(StorageService.getProjects());
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'proj-1');

  // Preferences & Recommendations in wizard flow
  const [preferences, setPreferences] = useState<UserPreferences>(StorageService.getUserPreferences());
  const [recommendations, setRecommendations] = useState<DesignRecommendation[]>(() =>
    generateRecommendations(StorageService.getUserPreferences())
  );

  // Comparison State
  const [comparePair, setComparePair] = useState<{
    a: CustomizedDesign | DesignRecommendation;
    b: CustomizedDesign | DesignRecommendation;
  } | null>(null);

  // Modals & Drawers
  const [isNestoChatOpen, setIsNestoChatOpen] = useState<boolean>(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState<boolean>(false);
  const [selectedChallenge, setSelectedChallenge] = useState<DesignChallenge | null>(null);
  const [isFamilyVotingModalOpen, setIsFamilyVotingModalOpen] = useState<boolean>(false);
  const [selectedVotingProject, setSelectedVotingProject] = useState<ProjectNest | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    StorageService.saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    StorageService.saveUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    StorageService.saveUserPreferences(preferences);
  }, [preferences]);

  // Active Project Reference
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Handlers
  const handleStartNewNest = (category: SpaceCategory, room?: RoomType) => {
    const updatedPrefs: UserPreferences = {
      ...preferences,
      spaceCategory: category,
      roomType: room || (category === 'interior' ? 'living_room' : 'front_elevation'),
    };
    setPreferences(updatedPrefs);
    setActivePage('wizard');
  };

  const handleCompleteWizard = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    const recs = generateRecommendations(newPrefs);
    setRecommendations(recs);
    setActivePage('recommendations');
  };

  const handleSelectRecommendation = (rec: DesignRecommendation) => {
    // Create new or update project with this chosen recommendation
    const newDesign: CustomizedDesign = {
      id: `des-${Date.now()}`,
      name: rec.name,
      style: rec.style,
      spaceCategory: preferences.spaceCategory,
      roomType: preferences.roomType,
      palette: rec.palette,
      wallColor: rec.palette.primaryWall.hex,
      accentColor: rec.palette.accentWall.hex,
      ceilingColor: rec.palette.ceiling.hex,
      trimColor: rec.palette.trim.hex,
      lightingMood: 'warm_evening',
      finish: rec.palette.primaryWall.finish,
      score: rec.score,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newProject: ProjectNest = {
      id: `proj-${Date.now()}`,
      title: `${preferences.roomType.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Nest`,
      spaceCategory: preferences.spaceCategory,
      roomType: preferences.roomType,
      status: 'building',
      stepIndex: 3,
      preferences: preferences,
      selectedRecommendationId: rec.id,
      currentDesign: newDesign,
      versions: [newDesign],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      familyVotes: [],
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    setActiveProjectId(newProject.id);
    setActivePage('visualizer');
  };

  const handleResumeProject = (projectId: string) => {
    setActiveProjectId(projectId);
    const proj = projects.find((p) => p.id === projectId);
    if (proj?.status === 'completed') {
      setActivePage('completion');
    } else {
      setActivePage('visualizer');
    }
  };

  const handleSaveDesign = (updatedDesign: CustomizedDesign) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          currentDesign: updatedDesign,
          versions: [...(p.versions || []), updatedDesign],
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleCompleteNest = (finalDesign: CustomizedDesign) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          currentDesign: finalDesign,
          status: 'completed' as const,
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    setProjects(updatedProjects);

    // Award XP
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + 100,
      weaverRank: prev.xp + 100 > 200 ? 'Baya Weaver' : 'Apprentice Builder',
    }));

    setActivePage('completion');
  };

  const handleCompareDesigns = (
    recA: CustomizedDesign | DesignRecommendation,
    recB: CustomizedDesign | DesignRecommendation
  ) => {
    setComparePair({ a: recA, b: recB });
    setActivePage('compare');
  };

  const handleSelectCompareWinner = (chosen: any) => {
    if ('palette' in chosen && !('wallColor' in chosen)) {
      // It was a DesignRecommendation
      handleSelectRecommendation(chosen);
    } else {
      // It was a CustomizedDesign
      handleSaveDesign(chosen);
      setActivePage('visualizer');
    }
  };

  const handleDeleteProject = (id: string) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (activeProjectId === id && filtered.length > 0) {
      setActiveProjectId(filtered[0].id);
    }
  };

  const handleApplyInspirationStyle = (item: InspirationItem) => {
    const newPrefs: UserPreferences = {
      ...preferences,
      roomType: item.roomType,
      spaceCategory: item.roomType.includes('elevation') ? 'exterior' : 'interior',
      preferredStyle: item.palette.styleMatch,
    };
    setPreferences(newPrefs);
    const recs = generateRecommendations(newPrefs);
    setRecommendations(recs);
    setActivePage('recommendations');
  };

  const handleAddFamilyVote = (vote: any) => {
    const targetId = selectedVotingProject?.id || activeProjectId;
    const updatedProjects = projects.map((p) => {
      if (p.id === targetId) {
        return {
          ...p,
          familyVotes: [...(p.familyVotes || []), vote],
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleStartChallenge = (challenge: DesignChallenge) => {
    const chalDesign: CustomizedDesign = {
      id: `des-chal-${Date.now()}`,
      name: `${challenge.title} Concept`,
      style: challenge.recommendedStyle,
      spaceCategory: challenge.roomType === 'front_elevation' ? 'exterior' : 'interior',
      roomType: challenge.roomType,
      palette: challenge.initialPalette,
      wallColor: challenge.initialPalette.primaryWall.hex,
      accentColor: challenge.initialPalette.accentWall.hex,
      ceilingColor: challenge.initialPalette.ceiling.hex,
      trimColor: challenge.initialPalette.trim.hex,
      lightingMood: 'warm_evening',
      finish: challenge.initialPalette.primaryWall.finish,
      score: {
        overall: 93,
        colorHarmony: 96,
        lightingCompatibility: 91,
        styleConsistency: 94,
        budgetFit: 95,
        practicality: 90,
        nestoExplanation: `Custom tailored for "${challenge.constraint}".`,
        improvementTip: 'Balanced surface reflectivity to meet challenge targets.',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    const newProject: ProjectNest = {
      id: `proj-chal-${Date.now()}`,
      title: `${challenge.title} Nest`,
      spaceCategory: challenge.roomType === 'front_elevation' ? 'exterior' : 'interior',
      roomType: challenge.roomType,
      status: 'building',
      stepIndex: 3,
      preferences: {
        ...preferences,
        spaceCategory: challenge.roomType === 'front_elevation' ? 'exterior' : 'interior',
        roomType: challenge.roomType,
        preferredStyle: challenge.recommendedStyle,
      },
      currentDesign: chalDesign,
      versions: [chalDesign],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      familyVotes: [],
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
    setIsChallengeModalOpen(false);
    setSelectedChallenge(null);
    setActivePage('visualizer');
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    setUserProfile(StorageService.getUserProfile());
    setProjects(StorageService.getProjects());
    setPreferences(StorageService.getUserPreferences());
    setActivePage('dashboard');
  };

  const handleNavigate = (view: AppView) => {
    if (view === 'challenges') {
      setIsChallengeModalOpen(true);
      return;
    }
    if (view === 'family_voting') {
      setSelectedVotingProject(activeProject);
      setIsFamilyVotingModalOpen(true);
      return;
    }
    setActivePage(view);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1E1B] font-['Plus_Jakarta_Sans'] antialiased">
      {/* 1. GLOBAL NAVIGATION */}
      <Navigation
        currentView={activePage}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        activeNestsCount={projects.filter((p) => p.status === 'building').length}
        onOpenNestoChat={() => setIsNestoChatOpen(true)}
      />

      {/* 2. MAIN VIEW CONTAINER */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {activePage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LandingPage
                onStartDesigning={() => setActivePage('wizard')}
                onExploreInspiration={() => setActivePage('inspiration')}
                onViewUXStudy={() => setActivePage('ux_study')}
              />
            </motion.div>
          )}

          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardPage
                userProfile={userProfile}
                projects={projects}
                onStartNewNest={handleStartNewNest}
                onResumeNest={handleResumeProject}
                onOpenInspiration={() => setActivePage('inspiration')}
                onOpenChallenges={(chal) => {
                  if (chal) setSelectedChallenge(chal);
                  setIsChallengeModalOpen(true);
                }}
                onOpenNestoChat={() => setIsNestoChatOpen(true)}
              />
            </motion.div>
          )}

          {activePage === 'wizard' && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WizardPage
                initialPrefs={preferences}
                onCompleteWizard={handleCompleteWizard}
                onCancel={() => setActivePage('dashboard')}
              />
            </motion.div>
          )}

          {activePage === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RecommendationsPage
                recommendations={recommendations}
                preferences={preferences}
                onSelectDesign={handleSelectRecommendation}
                onCompareDesigns={handleCompareDesigns}
                onOpenWizard={() => setActivePage('wizard')}
              />
            </motion.div>
          )}

          {activePage === 'visualizer' && activeProject && (
            <motion.div
              key="visualizer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VisualizerPage
                project={activeProject}
                recommendations={recommendations}
                preferences={preferences}
                onSaveDesign={handleSaveDesign}
                onCompareWithOther={(current) => {
                  const other = recommendations.find((r) => r.name !== current.name) || recommendations[0];
                  handleCompareDesigns(current, other);
                }}
                onCompleteNest={handleCompleteNest}
                onOpenFamilyVoting={() => {
                  setSelectedVotingProject(activeProject);
                  setIsFamilyVotingModalOpen(true);
                }}
              />
            </motion.div>
          )}

          {activePage === 'compare' && comparePair && (
            <motion.div
              key="compare"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ComparePage
                designA={comparePair.a}
                designB={comparePair.b}
                preferences={preferences}
                onSelectWinner={handleSelectCompareWinner}
                onBackToStudio={() => setActivePage('visualizer')}
              />
            </motion.div>
          )}

          {activePage === 'completion' && activeProject && (
            <motion.div
              key="completion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CompletionPage
                design={activeProject.currentDesign}
                project={activeProject}
                onSaveToMyNest={() => setActivePage('my_nest')}
                onStartAnotherRoom={() => handleStartNewNest('interior')}
                onViewMyNest={() => setActivePage('my_nest')}
              />
            </motion.div>
          )}

          {(activePage === 'my_nest' || (activePage as string) === 'mynest') && (
            <motion.div
              key="my_nest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MyNestPage
                projects={projects}
                onResumeProject={handleResumeProject}
                onStartNewNest={handleStartNewNest}
                onDeleteProject={handleDeleteProject}
                onOpenFamilyVoting={(proj) => {
                  setSelectedVotingProject(proj);
                  setIsFamilyVotingModalOpen(true);
                }}
              />
            </motion.div>
          )}

          {activePage === 'inspiration' && (
            <motion.div
              key="inspiration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <InspirationPage onApplyStyle={handleApplyInspirationStyle} />
            </motion.div>
          )}

          {(activePage === 'ux_study' || (activePage as string) === 'ux-case-study') && (
            <motion.div
              key="ux_study"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <UXCaseStudyPage />
            </motion.div>
          )}

          {(activePage === 'wireframes' || (activePage as string) === 'wireframe') && (
            <motion.div
              key="wireframes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WireframesPage />
            </motion.div>
          )}

          {(activePage === 'design_system' || (activePage as string) === 'design-system') && (
            <motion.div
              key="design_system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DesignSystemPage />
            </motion.div>
          )}

          {activePage === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProfilePage
                userProfile={userProfile}
                onUpdateProfile={(up) => setUserProfile(up)}
                onResetData={handleResetData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. FLOATING NESTO COMPANION LAUNCHER (Fitts's Law Accessible Target) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNestoChatOpen(true)}
          className="px-4 py-3 rounded-full bg-[#234B38] text-white shadow-xl hover:bg-[#1E3F30] border-2 border-[#FAF8F5] flex items-center gap-2.5 cursor-pointer group"
          aria-label="Open Nesto AI Companion"
        >
          <NestoAvatar mood="happy" size="sm" />
          <span className="text-xs font-bold pr-1 hidden sm:inline group-hover:inline">
            Ask Nesto
          </span>
          <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
        </motion.button>
      </div>

      {/* 4. DRAWERS & MODALS */}
      <NestoChatDrawer
        isOpen={isNestoChatOpen}
        onClose={() => setIsNestoChatOpen(false)}
        currentRoom={preferences.roomType}
        currentColors={{
          wall: activeProject?.currentDesign.wallColor || '#EDE8DF',
          accent: activeProject?.currentDesign.accentColor || '#A3B899',
          ceiling: activeProject?.currentDesign.ceilingColor || '#FCFAF7',
        }}
        lightingMood={activeProject?.currentDesign.lightingMood || 'warm_evening'}
        onApplyAdvice={(accent, wall) => {
          if (activeProject) {
            handleSaveDesign({
              ...activeProject.currentDesign,
              accentColor: accent,
              wallColor: wall,
              updatedAt: new Date().toISOString(),
              version: activeProject.currentDesign.version + 1,
            });
          }
        }}
      />

      <ChallengeModal
        challenge={selectedChallenge}
        isOpen={isChallengeModalOpen}
        onClose={() => {
          setIsChallengeModalOpen(false);
          setSelectedChallenge(null);
        }}
        onStartChallenge={handleStartChallenge}
        onChallengeCompleted={(up) => setUserProfile(up)}
      />

      <FamilyVotingModal
        isOpen={isFamilyVotingModalOpen}
        onClose={() => setIsFamilyVotingModalOpen(false)}
        projectTitle={selectedVotingProject?.title || activeProject?.title || 'Living Room Nest'}
        existingVotes={selectedVotingProject?.familyVotes || activeProject?.familyVotes || []}
        onAddVote={handleAddFamilyVote}
      />

      {/* 5. FOOTER */}
      <footer className="border-t border-[#E8DFC5] bg-[#F4EFE6] py-10 text-xs text-[#526658]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-bold text-[#1E3F30] text-sm">
              Nestora • Intelligent Home Design Companion
            </div>
            <p className="text-[11px] text-[#6B726B]">
              Weave your dream home with Nesto the Baya Weaver companion. Intelligent, jargon-free interior and exterior guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <button
              onClick={() => setActivePage('ux_study')}
              className="text-[#234B38] hover:underline cursor-pointer"
            >
              Academic UX Psychology & Laws
            </button>
            <button
              onClick={() => setActivePage('inspiration')}
              className="text-[#234B38] hover:underline cursor-pointer"
            >
              Inspiration Harmonies
            </button>
            <button
              onClick={() => setActivePage('dashboard')}
              className="text-[#234B38] hover:underline cursor-pointer"
            >
              My Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

