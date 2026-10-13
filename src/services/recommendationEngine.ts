import {
  COLOR_PALETTES,
  SWATCH_PRESETS,
  SAMPLE_RECOMMENDATIONS,
} from '../data/mockData';
import {
  ColorPalette,
  CustomizedDesign,
  DesignRecommendation,
  NestScoreBreakdown,
  RoomType,
  SpaceCategory,
  UserPreferences,
} from '../types';

export function calculateNestScore(
  palette: ColorPalette,
  preferences: Partial<UserPreferences>,
  customWall?: string,
  customAccent?: string
): NestScoreBreakdown {
  // Determine lighting compatibility
  const light = preferences.lighting || 'medium';
  let lightingComp = 88;
  if (light === 'low') {
    // Low light needs high reflectance base (e.g., >80)
    lightingComp = palette.primaryWall.lightReflectance >= 80 ? 94 : 76;
  } else if (light === 'high') {
    lightingComp = 92;
  } else {
    lightingComp = 90;
  }

  // Determine color harmony
  let colorHarmony = 91;
  if (palette.styleMatch === preferences.preferredStyle) {
    colorHarmony += 4;
  }

  // Determine style consistency
  let styleConsistency = 89;
  if (preferences.desiredGoal === 'calm_peaceful' && (palette.name.includes('Sage') || palette.name.includes('Scandi') || palette.name.includes('Japandi'))) {
    styleConsistency = 95;
  } else if (preferences.desiredGoal === 'warm_cozy' && (palette.name.includes('Terracotta') || palette.name.includes('Earth') || palette.name.includes('Amber'))) {
    styleConsistency = 94;
  } else if (preferences.desiredGoal === 'modern_minimal' && (palette.name.includes('Modern') || palette.name.includes('Charcoal') || palette.name.includes('Scandi'))) {
    styleConsistency = 93;
  }

  // Budget fit
  let budgetFit = 87;
  if (preferences.budgetTier === 'budget_friendly') {
    budgetFit = 92;
  } else if (preferences.budgetTier === 'luxury') {
    budgetFit = 90;
  }

  // Practicality
  let practicality = 90;
  if (palette.primaryWall.finish === 'Eggshell' || palette.primaryWall.finish === 'Satin') {
    practicality += 3; // Easy wipe down
  }

  const overall = Math.round(
    colorHarmony * 0.25 +
    lightingComp * 0.25 +
    styleConsistency * 0.2 +
    budgetFit * 0.15 +
    practicality * 0.15
  );

  let nestoExplanation = 'Balanced and harmonious palette tailored to your room layout.';
  let improvementTip = 'Consider warm ambient side lights (2700K) to enrich the accent wall depth.';

  if (lightingComp < 85) {
    nestoExplanation = 'The base wall color could be lightened by 5-10% to better amplify daylight.';
    improvementTip = 'Switch the main wall to Warm Chalk or Bone Linen to elevate light reflectance.';
  } else if (overall >= 92) {
    nestoExplanation = 'Exceptional harmony between wall undertones, floor texture, and light exposure.';
    improvementTip = 'Pair with natural woven textiles like jute or unbleached cotton to complete the nest.';
  }

  return {
    overall,
    colorHarmony,
    lightingCompatibility: lightingComp,
    styleConsistency,
    budgetFit,
    practicality,
    nestoExplanation,
    improvementTip,
  };
}

export function generateRecommendations(
  prefs: UserPreferences
): DesignRecommendation[] {
  const roomSvgType = getRoomSvgType(prefs.roomType, prefs.spaceCategory);

  // Filter or prioritize palettes based on preferences
  const rankedPalettes = [...COLOR_PALETTES].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.styleMatch === prefs.preferredStyle) scoreA += 10;
    if (b.styleMatch === prefs.preferredStyle) scoreB += 10;

    if (prefs.desiredGoal === 'calm_peaceful' && (a.id.includes('sage') || a.id.includes('japandi') || a.id.includes('scandi'))) scoreA += 8;
    if (prefs.desiredGoal === 'calm_peaceful' && (b.id.includes('sage') || b.id.includes('japandi') || b.id.includes('scandi'))) scoreB += 8;

    if (prefs.desiredGoal === 'warm_cozy' && (a.id.includes('terracotta') || a.id.includes('baya'))) scoreA += 8;
    if (prefs.desiredGoal === 'warm_cozy' && (b.id.includes('terracotta') || b.id.includes('baya'))) scoreB += 8;

    if (prefs.lighting === 'low' && a.primaryWall.lightReflectance > 85) scoreA += 6;
    if (prefs.lighting === 'low' && b.primaryWall.lightReflectance > 85) scoreB += 6;

    return scoreB - scoreA;
  });

  // Pick top 3-4 distinct designs
  const selectedPalettes = rankedPalettes.slice(0, 4);

  return selectedPalettes.map((palette, idx) => {
    const score = calculateNestScore(palette, prefs);

    let why = '';
    if (idx === 0) {
      why = `Highest match for your ${prefs.roomType.replace('_', ' ')}. Matches your desire for a ${prefs.desiredGoal.replace('_', ' ')} atmosphere while harmonizing with ${prefs.flooring.replace(/_/g, ' ')}.`;
    } else if (idx === 1) {
      why = `A warm, character-rich alternative that balances your ${prefs.lighting} natural light with inviting accent contrast.`;
    } else if (idx === 2) {
      why = `Clean and spacious composition designed to maximize visual openness and effortless daily maintenance.`;
    } else {
      why = `Sophisticated timeless pairing offering subtle warmth and durable, low-glare finishes.`;
    }

    const recId = `rec_${palette.id}_${prefs.roomType}`;

    return {
      id: recId,
      name: palette.name,
      tagline: palette.description,
      style: palette.styleMatch,
      palette,
      whyRecommended: why,
      lightingFit: `${prefs.lighting.toUpperCase()} light: ${palette.primaryWall.name} reflects ${palette.primaryWall.lightReflectance}% of ambient light.`,
      floorFit: `Complements ${prefs.flooring.replace(/_/g, ' ')} with balanced undertones.`,
      maintenanceNote: `${palette.primaryWall.finish} finish is wipeable and family-friendly.`,
      estimatedBudgetCategory:
        prefs.budgetTier === 'budget_friendly'
          ? 'Budget-Friendly (₹35,000 – ₹48,000)'
          : prefs.budgetTier === 'luxury'
          ? 'Luxury Signature (₹85,000 – ₹1,20,000)'
          : 'Moderate (₹50,000 – ₹72,000)',
      roomType: prefs.roomType,
      spaceCategory: prefs.spaceCategory,
      score,
      roomSvgType,
      isFavorite: idx === 0,
    };
  });
}

export function getRoomSvgType(
  roomType: RoomType,
  spaceCategory: SpaceCategory
): 'living' | 'bedroom' | 'kitchen' | 'dining' | 'bathroom' | 'study' | 'balcony' | 'elevation' {
  if (spaceCategory === 'exterior') {
    return 'elevation';
  }
  switch (roomType) {
    case 'bedroom':
      return 'bedroom';
    case 'kitchen':
      return 'kitchen';
    case 'dining_room':
      return 'dining';
    case 'bathroom':
      return 'bathroom';
    case 'study_room':
      return 'study';
    case 'balcony':
      return 'balcony';
    case 'living_room':
    default:
      return 'living';
  }
}

export async function fetchNestoAiAdvice(
  query: string,
  context: any
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery: query, context }),
    });
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.reply;
  } catch (e) {
    // Deterministic fallback
    return 'I recommend focusing on soft natural lighting, gentle earth-toned wall coats, and natural wooden textures to maintain a soothing, spacious balance.';
  }
}
