import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CustomizedDesign,
  DesignRecommendation,
  FinishType,
  LightingMood,
  ProjectNest,
  UserPreferences,
} from '../types';
import { RoomVisualizer } from '../components/visualizer/RoomVisualizer';
import { RoomVisualizer3D, Scene3DObject } from '../components/visualizer/RoomVisualizer3D';
import { ColorSwatches } from '../components/visualizer/ColorSwatches';
import { ScoreCard } from '../components/common/ScoreCard';
import { NestoAvatar } from '../components/common/NestoAvatar';
import { NestoBubble } from '../components/common/NestoBubble';
import { calculateNestScore } from '../services/recommendationEngine';
import {
  RotateCcw,
  Save,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
  Users,
  Undo2,
  Box,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react';

interface VisualizerPageProps {
  project: ProjectNest;
  recommendations: DesignRecommendation[];
  preferences: UserPreferences;
  onSaveDesign: (design: CustomizedDesign) => void;
  onCompareWithOther: (current: CustomizedDesign) => void;
  onCompleteNest: (design: CustomizedDesign) => void;
  onOpenFamilyVoting: () => void;
}

export const VisualizerPage: React.FC<VisualizerPageProps> = ({
  project,
  recommendations,
  preferences,
  onSaveDesign,
  onCompareWithOther,
  onCompleteNest,
  onOpenFamilyVoting,
}) => {
  const [selectedSurface, setSelectedSurface] = useState<'wall' | 'accent' | 'ceiling' | 'trim'>('accent');

  // 3D WebGL Engine & Mode State
  const [renderMode, setRenderMode] = useState<'3d' | '2d'>('3d');
  const [viewMode3D, setViewMode3D] = useState<'designer' | 'experience'>('designer');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  // Initial 3D Scene Furniture Objects
  const [sceneObjects, setSceneObjects] = useState<Scene3DObject[]>([
    { id: 'obj-sofa', name: 'Linen 3-Seater Sofa', type: 'sofa', position: [0, 0, 0.5], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#FAF7F2' },
    { id: 'obj-table', name: 'Teak Coffee Table', type: 'coffee_table', position: [0, 0, 1.8], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#875237' },
    { id: 'obj-tv', name: 'Wall TV Unit', type: 'tv_unit', position: [0, 0, -4.6], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#3D3028' },
    { id: 'obj-plant', name: 'Fiddle Leaf Fig Plant', type: 'plant', position: [-3.5, 0, -4.0], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#234B38' },
    { id: 'obj-lamp', name: 'Arc Floor Lamp', type: 'lamp', position: [3.2, 0, -3.8], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#C8A870' },
    { id: 'obj-rug', name: 'Woven Linen Rug', type: 'rug', position: [0, 0, 1.2], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#EFE7DA' },
  ]);

  const [wallColor, setWallColor] = useState<string>(project.currentDesign.wallColor);
  const [accentColor, setAccentColor] = useState<string>(project.currentDesign.accentColor);
  const [ceilingColor, setCeilingColor] = useState<string>(project.currentDesign.ceilingColor);
  const [trimColor, setTrimColor] = useState<string>(project.currentDesign.trimColor);
  const [lightingMood, setLightingMood] = useState<LightingMood>(project.currentDesign.lightingMood || 'warm_evening');
  const [finish, setFinish] = useState<FinishType>(project.currentDesign.finish || 'Matte');

  // History stack for Undo
  const [history, setHistory] = useState<{ wall: string; accent: string; ceiling: string }[]>([]);
  const [saveToast, setSaveToast] = useState(false);

  // Recalculate live Nest Score dynamically
  const liveScore = calculateNestScore(
    project.currentDesign.palette,
    preferences,
    wallColor,
    accentColor
  );

  const handleAddObject = (type: Scene3DObject['type'], name: string) => {
    const newObj: Scene3DObject = {
      id: `obj-${Date.now()}`,
      name,
      type,
      position: [(Math.random() - 0.5) * 4, 0, (Math.random() - 0.5) * 4],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#A3B899',
    };
    setSceneObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newObj.id);
  };

  const handleRemoveSelectedObject = () => {
    if (!selectedObjectId) return;
    setSceneObjects((prev) => prev.filter((o) => o.id !== selectedObjectId));
    setSelectedObjectId(null);
  };

  const getCurrentSurfaceColor = () => {
    switch (selectedSurface) {
      case 'wall':
        return wallColor;
      case 'ceiling':
        return ceilingColor;
      case 'trim':
        return trimColor;
      case 'accent':
      default:
        return accentColor;
    }
  };

  const handleColorChange = (hex: string) => {
    setHistory((prev) => [...prev.slice(-10), { wall: wallColor, accent: accentColor, ceiling: ceilingColor }]);

    if (selectedSurface === 'accent') {
      setAccentColor(hex);
    } else if (selectedSurface === 'wall') {
      setWallColor(hex);
    } else if (selectedSurface === 'ceiling') {
      setCeilingColor(hex);
    } else if (selectedSurface === 'trim') {
      setTrimColor(hex);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setWallColor(last.wall);
    setAccentColor(last.accent);
    setCeilingColor(last.ceiling);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleResetOriginal = () => {
    setWallColor(project.currentDesign.palette.primaryWall.hex);
    setAccentColor(project.currentDesign.palette.accentWall.hex);
    setCeilingColor(project.currentDesign.palette.ceiling.hex);
    setTrimColor(project.currentDesign.palette.trim.hex);
  };

  const getCurrentCustomizedDesign = (): CustomizedDesign => {
    return {
      ...project.currentDesign,
      wallColor,
      accentColor,
      ceilingColor,
      trimColor,
      lightingMood,
      finish,
      score: liveScore,
      updatedAt: new Date().toISOString(),
      version: project.currentDesign.version + 1,
    };
  };

  const handleQuickSave = () => {
    const updated = getCurrentCustomizedDesign();
    onSaveDesign(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8DFC5]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B] font-['Plus_Jakarta_Sans']">
              {project.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#173C35] text-white text-xs font-bold">
              3D Real-Time Studio
            </span>
          </div>
          <p className="text-xs text-[#6B726B] mt-0.5">
            Space: {project.roomType.replace('_', ' ').toUpperCase()} • Style: {project.currentDesign.style}
          </p>
        </div>

        {/* View Mode Switcher: Designer Mode vs Experience Mode */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#D5CABB] rounded-2xl">
          <button
            onClick={() => { setRenderMode('3d'); setViewMode3D('designer'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              renderMode === '3d' && viewMode3D === 'designer'
                ? 'bg-[#173C35] text-white shadow-xs'
                : 'text-[#4A524A] hover:bg-[#EFE8DC]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Designer 3D View</span>
          </button>

          <button
            onClick={() => { setRenderMode('3d'); setViewMode3D('experience'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              renderMode === '3d' && viewMode3D === 'experience'
                ? 'bg-[#E5A83B] text-[#1C1E1B] shadow-xs'
                : 'text-[#4A524A] hover:bg-[#EFE8DC]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>First-Person Walkthrough</span>
          </button>

          <button
            onClick={() => setRenderMode('2d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              renderMode === '2d'
                ? 'bg-[#795548] text-white shadow-xs'
                : 'text-[#4A524A] hover:bg-[#EFE8DC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D Schematic</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Family Feedback button */}
          <button
            onClick={onOpenFamilyVoting}
            className="px-3 py-2 rounded-xl bg-white border border-[#D5CABB] hover:border-[#795548] text-xs font-bold text-[#795548] hover:bg-[#FAF8F5] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Family Poll ({project.familyVotes?.length || 0})</span>
          </button>

          {/* Quick Save button */}
          <button
            onClick={handleQuickSave}
            className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CABB] hover:border-[#173C35] text-xs font-bold text-[#173C35] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          {/* Complete Final Nest button */}
          <button
            onClick={() => onCompleteNest(getCurrentCustomizedDesign())}
            className="px-5 py-2 rounded-xl bg-[#173C35] hover:bg-[#0E2823] text-white text-xs font-bold shadow-xs hover:shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Complete My Nest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Save confirmation toast */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-[#173C35] text-white text-xs font-bold rounded-xl text-center shadow-lg"
        >
          Draft successfully saved to My Nest!
        </motion.div>
      )}

      {/* 3-COLUMN STUDIO LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CONTROLS & COLOR SWATCHES (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <ColorSwatches
            currentColor={getCurrentSurfaceColor()}
            onSelectColor={(hex) => handleColorChange(hex)}
            surfaceLabel={
              selectedSurface === 'accent'
                ? 'Feature Accent Wall'
                : selectedSurface === 'wall'
                ? 'Main Perimeter Walls'
                : selectedSurface === 'ceiling'
                ? 'Ceiling'
                : 'Trim'
            }
            currentFinish={finish}
            onChangeFinish={(f) => setFinish(f)}
          />

          {/* 3D OBJECT ADD & MANAGEMENT TOOLBAR */}
          <div className="p-4 bg-white rounded-2xl border border-[#795548]/20 space-y-3 shadow-2xs">
            <h3 className="text-xs font-bold text-[#173C35] uppercase tracking-wider flex items-center justify-between">
              <span>+ Add 3D Objects & Furnishings</span>
              {selectedObjectId && (
                <button
                  onClick={handleRemoveSelectedObject}
                  className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove Selected</span>
                </button>
              )}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleAddObject('sofa', 'Linen Sofa')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Sofa</span>
              </button>
              <button
                onClick={() => handleAddObject('coffee_table', 'Teak Coffee Table')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Coffee Table</span>
              </button>
              <button
                onClick={() => handleAddObject('plant', 'Fiddle Leaf Plant')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Indoor Plant</span>
              </button>
              <button
                onClick={() => handleAddObject('lamp', 'Arc Floor Lamp')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Floor Lamp</span>
              </button>
              <button
                onClick={() => handleAddObject('desk', 'Executive Desk')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Study Desk</span>
              </button>
              <button
                onClick={() => handleAddObject('bed', 'Upholstered Bed')}
                className="p-2 rounded-xl bg-[#F5EBDD] hover:bg-[#EADBCE] text-[11px] font-semibold text-[#173C35] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Bed</span>
              </button>
            </div>
          </div>

          {/* Quick Undo & Reset controls */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#795548]/20 text-xs">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 text-[#24312D] hover:text-[#173C35] disabled:opacity-40 font-semibold cursor-pointer"
            >
              <Undo2 className="w-4 h-4" />
              <span>Undo Last Color ({history.length})</span>
            </button>

            <button
              onClick={handleResetOriginal}
              className="flex items-center gap-1.5 text-[#795548] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Original</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: REALISTIC 3D VIEWPORT / 2D SCHEMATIC FALLBACK (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {renderMode === '3d' ? (
            <div className="h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border-2 border-[#173C35]/30 shadow-lg relative">
              <RoomVisualizer3D
                viewMode={viewMode3D}
                roomType={project.roomType}
                spaceCategory={project.spaceCategory}
                wallColor={wallColor}
                accentColor={accentColor}
                ceilingColor={ceilingColor}
                trimColor={trimColor}
                lightingMood={lightingMood}
                finish={finish}
                selectedSurface={selectedSurface}
                onSelectSurface={(s) => setSelectedSurface(s)}
                selectedObjectId={selectedObjectId}
                onSelectObject={(id) => setSelectedObjectId(id)}
                objects={sceneObjects}
                onUpdateObject={(updated) =>
                  setSceneObjects((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
                }
              />
            </div>
          ) : (
            <RoomVisualizer
              roomType={project.roomType}
              spaceCategory={project.spaceCategory}
              wallColor={wallColor}
              accentColor={accentColor}
              ceilingColor={ceilingColor}
              trimColor={trimColor}
              lightingMood={lightingMood}
              finish={finish}
              selectedSurface={selectedSurface}
              onSelectSurface={(s) => setSelectedSurface(s)}
              onLightingChange={(m) => setLightingMood(m)}
              originalColors={{
                wall: project.currentDesign.palette.primaryWall.hex,
                accent: project.currentDesign.palette.accentWall.hex,
              }}
            />
          )}

          {/* Interactive tips under visualizer */}
          <div className="p-3 bg-[#F5EBDD] rounded-2xl border border-[#795548]/20 text-xs text-[#24312D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5A83B]" />
              <span>
                {renderMode === '3d'
                  ? '3D Studio: Orbit camera to inspect. Click objects to select. Switch to First-Person Walkthrough anytime.'
                  : '2D Vector Mode: Click directly on room surfaces.'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NEST SCORE & LIVE NESTO ADVICE (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <ScoreCard score={liveScore} />

          {/* Live Contextual Commentary */}
          <div className="bg-[#F5EBDD] border border-[#795548]/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#795548]">
              <NestoAvatar mood="explaining" size="sm" />
              <span>Nesto's Live Spatial Analysis</span>
            </div>
            <p className="text-xs text-[#24312D] leading-relaxed">
              "Your 3D Living Room layout has great clearance! Your current wall reflectance handles {lightingMood.replace('_', ' ')} lighting beautifully."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
