export type AppView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'wizard'
  | 'recommendations'
  | 'visualizer'
  | 'compare'
  | 'completion'
  | 'my_nest'
  | 'inspiration'
  | 'challenges'
  | 'family_voting'
  | 'profile'
  | 'ux_study'
  | 'wireframes'
  | 'design_system';

export type SpaceCategory = 'interior' | 'exterior';

export type RoomType =
  | 'living_room'
  | 'bedroom'
  | 'kitchen'
  | 'dining_room'
  | 'bathroom'
  | 'study_room'
  | 'balcony'
  | 'front_elevation'
  | 'exterior_wall'
  | 'door_window'
  | 'gate'
  | 'roof';

export type LightCondition = 'low' | 'medium' | 'high';

export type FlooringType =
  | 'light_oak_wood'
  | 'dark_walnut_wood'
  | 'warm_beige_tile'
  | 'cool_grey_marble'
  | 'terracotta'
  | 'natural_stone';

export type RoomSize = 'compact' | 'medium' | 'spacious';

export type DesignGoal =
  | 'calm_peaceful'
  | 'spacious_airy'
  | 'warm_cozy'
  | 'timeless_luxury'
  | 'modern_minimal'
  | 'natural_earthy';

export type DesignStyle =
  | 'Modern Minimal'
  | 'Warm Earth'
  | 'Calm Scandinavian'
  | 'Contemporary Indian'
  | 'Soft Luxury'
  | 'Japandi Serenity';

export type BudgetTier = 'budget_friendly' | 'moderate' | 'premium' | 'luxury';

export type BudgetFocus =
  | 'paint_accents'
  | 'furniture_layout'
  | 'ambient_lighting'
  | 'flooring'
  | 'balanced';

export type MaintenancePreference = 'low_effort' | 'moderate' | 'high_detail';

export type LightingMood =
  | 'warm_evening'
  | 'bright_daylight'
  | 'golden_sunset'
  | 'soft_twilight';

export type FinishType = 'Matte' | 'Satin' | 'Eggshell' | 'Velvet';

export interface ColorSwatch {
  name: string;
  hex: string;
  category: 'base' | 'accent' | 'ceiling' | 'trim' | 'earth';
  finish: FinishType;
  lightReflectance: number; // 0 to 100 LRV
}

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  primaryWall: ColorSwatch;
  accentWall: ColorSwatch;
  ceiling: ColorSwatch;
  trim: ColorSwatch;
  accentDetails: ColorSwatch;
  styleMatch: DesignStyle;
}

export interface NestScoreBreakdown {
  overall: number; // 0-100
  colorHarmony: number;
  lightingCompatibility: number;
  styleConsistency: number;
  budgetFit: number;
  practicality: number;
  nestoExplanation: string;
  improvementTip: string;
}

export interface DesignRecommendation {
  id: string;
  name: string;
  tagline: string;
  style: DesignStyle;
  palette: ColorPalette;
  whyRecommended: string;
  lightingFit: string;
  floorFit: string;
  maintenanceNote: string;
  estimatedBudgetCategory: string;
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  score: NestScoreBreakdown;
  roomSvgType: 'living' | 'bedroom' | 'kitchen' | 'dining' | 'bathroom' | 'study' | 'balcony' | 'elevation';
  isFavorite?: boolean;
}

export interface CustomizedDesign {
  id: string;
  baseRecommendationId?: string;
  name: string;
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  style: DesignStyle;
  palette: ColorPalette;
  wallColor: string;
  accentColor: string;
  ceilingColor: string;
  trimColor: string;
  lightingMood: LightingMood;
  finish: FinishType;
  score: NestScoreBreakdown;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ProjectNest {
  id: string;
  title: string;
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  status: 'building' | 'ready_to_compare' | 'completed';
  stepIndex: number;
  preferences: UserPreferences;
  selectedRecommendationId?: string;
  currentDesign: CustomizedDesign;
  versions: CustomizedDesign[];
  comparedDesignIds?: string[];
  familyVotes?: FamilyVote[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  homeType: 'apartment' | 'independent_house' | 'villa' | 'studio' | 'duplex';
  spaceCategory: SpaceCategory;
  roomType: RoomType;
  roomSize: RoomSize;
  lighting: LightCondition;
  flooring: FlooringType;
  desiredGoal: DesignGoal;
  preferredStyle: DesignStyle;
  favoriteColorFamilies: string[];
  dislikedColors: string[];
  budgetTier: BudgetTier;
  budgetFocus: BudgetFocus;
  maintenance: MaintenancePreference;
  userPriority?: 'budget' | 'appearance' | 'comfort' | 'maintenance' | 'family';
  notes?: string;
}

export interface FamilyVote {
  id: string;
  memberName: string;
  role: string;
  avatarBg: string;
  preferredDesignId: string;
  preferredDesignName: string;
  comment: string;
  votedAt: string;
}

export interface DesignChallenge {
  id: string;
  title: string;
  tagline: string;
  description: string;
  budgetLimit: string;
  roomType: RoomType;
  constraint: string;
  rewardBadge: string;
  xpReward: number;
  initialPalette: ColorPalette;
  recommendedStyle: DesignStyle;
  isCompleted?: boolean;
}

export interface InspirationItem {
  id: string;
  title: string;
  category: 'Modern' | 'Minimal' | 'Natural' | 'Luxury' | 'Scandinavian' | 'Indian Contemporary' | 'Small Space';
  style: DesignStyle;
  roomType: RoomType;
  palette: ColorPalette;
  description: string;
  keyFeature: string;
  lightingMood: LightingMood;
  isTrending?: boolean;
}

export interface UserProfile {
  name: string;
  homeName: string;
  homeType?: string;
  designExperience: 'beginner' | 'intermediate' | 'enthusiast';
  weaverRank: 'Nestling' | 'Builder' | 'Weaver' | 'Master Weaver' | string;
  completedNestsCount: number;
  activeNestsCount: number;
  xp: number;
  badges: any[];
  joinedDate: string;
}

export type NestoMood =
  | 'happy'
  | 'thinking'
  | 'explaining'
  | 'curious'
  | 'celebrating'
  | 'neutral'
  | 'guiding'
  | 'observing'
  | 'impressed'
  | 'concerned';
