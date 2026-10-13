import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectNest, SpaceCategory, RoomType } from '../types';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRight,
  Trash2,
  Copy,
  History,
  Users,
  Eye,
  Sparkles,
} from 'lucide-react';

interface MyNestPageProps {
  projects: ProjectNest[];
  onResumeProject: (id: string) => void;
  onStartNewNest: (cat: SpaceCategory, room?: RoomType) => void;
  onDeleteProject: (id: string) => void;
  onOpenFamilyVoting: (project: ProjectNest) => void;
}

export const MyNestPage: React.FC<MyNestPageProps> = ({
  projects,
  onResumeProject,
  onStartNewNest,
  onDeleteProject,
  onOpenFamilyVoting,
}) => {
  const [filter, setFilter] = useState<'all' | 'building' | 'completed'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'building') return p.status === 'building';
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  const activeCount = projects.filter((p) => p.status === 'building').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#234B38] text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>My Nest Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
            Your Weaved Spaces & Blueprints
          </h1>
          <p className="text-xs sm:text-sm text-[#6B726B] mt-0.5">
            Manage your in-progress room builds, view completed specs, and maintain version histories.
          </p>
        </div>

        <button
          onClick={() => onStartNewNest('interior')}
          className="px-5 py-2.5 rounded-2xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Build a New Nest</span>
        </button>
      </div>

      {/* Full Home Master Memory Dashboard */}
      <div className="bg-[#FAF8F5] border border-[#E3DACB] rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NestoAvatar mood="happy" size="md" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1C1E1B]">Full Home Master Blueprint</h2>
              <p className="text-xs text-[#6B726B]">
                {completedCount} of 13 spaces completed ({Math.round((completedCount / 13) * 100)}% Whole Home Progress)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { type: 'living_room', label: 'Living' },
              { type: 'bedroom', label: 'Bedroom' },
              { type: 'kitchen', label: 'Kitchen' },
              { type: 'dining_room', label: 'Dining' },
              { type: 'bathroom', label: 'Bathroom' },
              { type: 'study_room', label: 'Study' },
              { type: 'balcony', label: 'Balcony' },
              { type: 'front_elevation', label: 'Elevation' },
            ].map((sp) => {
              const p = projects.find((proj) => proj.roomType === sp.type);
              const isDone = p?.status === 'completed';
              const isBuilding = p?.status === 'building';
              return (
                <button
                  key={sp.type}
                  onClick={() => p ? onResumeProject(p.id) : onStartNewNest(sp.type.includes('elevation') ? 'exterior' : 'interior', sp.type as RoomType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-[#EBF2EE] text-[#234B38] border border-[#234B38]/30 font-bold'
                      : isBuilding
                      ? 'bg-[#FDF6EC] text-[#8F5B34] border border-[#C28E58]/30'
                      : 'bg-white text-[#6B726B] border border-[#E0D7C6] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-[#234B38]' : isBuilding ? 'bg-[#C28E58]' : 'bg-gray-300'}`} />
                  <span>{sp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#F0EAE0] rounded-2xl w-fit text-xs font-bold">
        {[
          { key: 'all', label: `All Nests (${projects.length})` },
          { key: 'building', label: `In Progress (${activeCount})` },
          { key: 'completed', label: `Completed (${completedCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-[#234B38] text-white shadow-xs'
                : 'text-[#4A524A] hover:bg-[#E5DEC3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isCompleted = project.status === 'completed';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-[#E0D7C6] p-5 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Status & Room Type Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-[#EBF2EE] text-[#234B38]'
                          : 'bg-[#FDF6EC] text-[#8F5B34]'
                      }`}
                    >
                      {isCompleted ? 'Completed Nest' : 'Building (In Progress)'}
                    </span>

                    <span className="text-xs font-bold text-[#6B726B]">
                      Score: {project.currentDesign.score.overall}/100
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1E3F30]">{project.title}</h3>

                  <p className="text-xs text-[#526658]">
                    {project.currentDesign.style} • {project.currentDesign.finish} Sheen
                  </p>

                  {/* Visualizer Snapshot */}
                  <div className="rounded-xl overflow-hidden border border-[#E3DACB] aspect-[16/10]">
                    <RoomVisualizer
                      roomType={project.roomType}
                      spaceCategory={project.spaceCategory}
                      wallColor={project.currentDesign.wallColor}
                      accentColor={project.currentDesign.accentColor}
                      ceilingColor={project.currentDesign.ceilingColor}
                      trimColor={project.currentDesign.trimColor}
                      lightingMood={project.currentDesign.lightingMood}
                      finish={project.currentDesign.finish}
                      interactive={false}
                    />
                  </div>

                  {/* Swatches preview */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div
                      className="w-5 h-5 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: project.currentDesign.wallColor }}
                      title="Main Wall"
                    />
                    <div
                      className="w-5 h-5 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: project.currentDesign.accentColor }}
                      title="Feature Accent"
                    />
                    <div
                      className="w-5 h-5 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: project.currentDesign.ceilingColor }}
                      title="Ceiling"
                    />
                    <span className="text-[10px] text-[#8F5B34] font-mono ml-auto">
                      v{project.currentDesign.version}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#EFE8DC] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenFamilyVoting(project)}
                      className="text-xs font-bold text-[#8F5B34] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Family Poll ({project.familyVotes?.length || 0})</span>
                    </button>

                    {deleteConfirmId === project.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-red-600 font-bold">Delete?</span>
                        <button
                          onClick={() => {
                            onDeleteProject(project.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-md"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-[10px] text-[#6B726B] hover:underline"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(project.id)}
                        className="text-xs text-[#6B726B] hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Delete Nest"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onResumeProject(project.id)}
                    className="w-full py-2.5 rounded-xl bg-[#234B38] hover:bg-[#1E3F30] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>{isCompleted ? 'View Blueprint & Specs' : 'Resume Designing in Studio'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E0D7C6] p-8 space-y-4">
          <NestoAvatar mood="curious" size="lg" className="mx-auto" />
          <h3 className="text-lg font-bold text-[#1E3F30]">Your Nest is waiting to be built</h3>
          <p className="text-xs text-[#6B726B] max-w-sm mx-auto">
            You don't have any nests in this category yet. Let's create your first room design!
          </p>
          <button
            onClick={() => onStartNewNest('interior')}
            className="px-6 py-2.5 rounded-2xl bg-[#234B38] text-white text-xs font-bold shadow-xs hover:bg-[#1E3F30] cursor-pointer"
          >
            Start Building
          </button>
        </div>
      )}
    </div>
  );
};
