import { RoomType, SpaceCategory } from '../types';

export interface EditableRegion {
  id: 'wall' | 'accent' | 'ceiling' | 'trim' | 'floor' | 'furniture' | 'lighting';
  label: string;
  defaultHex: string;
  category: 'base' | 'accent' | 'ceiling' | 'trim' | 'earth';
}

export interface SpaceConfig {
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  label: string;
  description: string;
  editableRegions: EditableRegion[];
  defaultLightingMood: 'warm_evening' | 'bright_daylight' | 'golden_sunset' | 'soft_twilight';
  defaultFinish: 'Matte' | 'Satin' | 'Eggshell' | 'Velvet';
}

export const SPACE_CONFIGURATIONS: Record<string, SpaceConfig> = {
  // INTERIOR SPACES
  living_room: {
    roomType: 'living_room',
    spaceCategory: 'interior',
    label: 'Living Room',
    description: 'Central family gathering space & social hub',
    defaultLightingMood: 'warm_evening',
    defaultFinish: 'Eggshell',
    editableRegions: [
      { id: 'accent', label: 'Feature Accent Wall', defaultHex: '#A3B899', category: 'accent' },
      { id: 'wall', label: 'Main Walls', defaultHex: '#EDE8DF', category: 'base' },
      { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Baseboard & Door Trim', defaultHex: '#F0EBE1', category: 'trim' },
    ],
  },
  bedroom: {
    roomType: 'bedroom',
    spaceCategory: 'interior',
    label: 'Bedroom',
    description: 'Restful circadian sleep retreat & personal haven',
    defaultLightingMood: 'warm_evening',
    defaultFinish: 'Matte',
    editableRegions: [
      { id: 'accent', label: 'Headboard Accent Wall', defaultHex: '#7E9987', category: 'accent' },
      { id: 'wall', label: 'Main Bedroom Walls', defaultHex: '#FAF7F0', category: 'base' },
      { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Skirting & Trim', defaultHex: '#EDE8DF', category: 'trim' },
    ],
  },
  kitchen: {
    roomType: 'kitchen',
    spaceCategory: 'interior',
    label: 'Kitchen & Dining',
    description: 'Bright, culinary daily hub & cabinetry zone',
    defaultLightingMood: 'bright_daylight',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Kitchen Backsplash & Cabinets', defaultHex: '#2A4D3B', category: 'accent' },
      { id: 'wall', label: 'Main Kitchen Walls', defaultHex: '#F7F4EE', category: 'base' },
      { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Counter & Frame Trim', defaultHex: '#3D3028', category: 'trim' },
    ],
  },
  dining_room: {
    roomType: 'dining_room',
    spaceCategory: 'interior',
    label: 'Dining Room',
    description: 'Intimate dining & evening hospitality zone',
    defaultLightingMood: 'golden_sunset',
    defaultFinish: 'Eggshell',
    editableRegions: [
      { id: 'accent', label: 'Dining Accent Nook', defaultHex: '#B86A4C', category: 'accent' },
      { id: 'wall', label: 'Main Dining Walls', defaultHex: '#E5DDCF', category: 'base' },
      { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Crown Molding & Trim', defaultHex: '#875237', category: 'trim' },
    ],
  },
  bathroom: {
    roomType: 'bathroom',
    spaceCategory: 'interior',
    label: 'Bathroom',
    description: 'Clean, luminous sanctuary & vanity space',
    defaultLightingMood: 'bright_daylight',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Vanity Accent Tiles', defaultHex: '#8FA1A9', category: 'accent' },
      { id: 'wall', label: 'Main Wall Tiles', defaultHex: '#FAF7F0', category: 'base' },
      { id: 'ceiling', label: 'Moisture Ceiling Coat', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Tile Trim & Fixtures', defaultHex: '#C8A870', category: 'trim' },
    ],
  },
  study_room: {
    roomType: 'study_room',
    spaceCategory: 'interior',
    label: 'Study & Work Nook',
    description: 'Deep focus, library shelves & productivity zone',
    defaultLightingMood: 'soft_twilight',
    defaultFinish: 'Matte',
    editableRegions: [
      { id: 'accent', label: 'Bookcase & Desk Accent', defaultHex: '#37414A', category: 'accent' },
      { id: 'wall', label: 'Main Focus Walls', defaultHex: '#E6E8E6', category: 'base' },
      { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Teak Desk Trim', defaultHex: '#3D2D24', category: 'trim' },
    ],
  },
  balcony: {
    roomType: 'balcony',
    spaceCategory: 'interior',
    label: 'Balcony Oasis',
    description: 'Breezy outdoor relaxation deck, railing & planters',
    defaultLightingMood: 'golden_sunset',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Feature Nook Wall', defaultHex: '#C28E58', category: 'accent' },
      { id: 'wall', label: 'Balcony Exterior Wall', defaultHex: '#E5DDCF', category: 'base' },
      { id: 'ceiling', label: 'Overhang Canopy', defaultHex: '#3A2D28', category: 'ceiling' },
      { id: 'trim', label: 'Railing & Louver Trim', defaultHex: '#526658', category: 'trim' },
    ],
  },

  // EXTERIOR SPACES
  front_elevation: {
    roomType: 'front_elevation',
    spaceCategory: 'exterior',
    label: 'Front Elevation',
    description: 'Main facade, entrance architectural curb appeal',
    defaultLightingMood: 'bright_daylight',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Facade Accent Panel', defaultHex: '#2A4D3B', category: 'accent' },
      { id: 'wall', label: 'Main Exterior Masonry', defaultHex: '#E5DDCF', category: 'base' },
      { id: 'ceiling', label: 'Roof Eaves / Ceiling', defaultHex: '#3A2D28', category: 'ceiling' },
      { id: 'trim', label: 'Main Entry Door & Trim', defaultHex: '#6B3E26', category: 'trim' },
    ],
  },
  exterior_wall: {
    roomType: 'exterior_wall',
    spaceCategory: 'exterior',
    label: 'Exterior Boundary Walls',
    description: 'Weather-resilient exterior boundary coats',
    defaultLightingMood: 'bright_daylight',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Accent Boundary Pillars', defaultHex: '#B86A4C', category: 'accent' },
      { id: 'wall', label: 'Main Wall Stucco', defaultHex: '#EDE8DF', category: 'base' },
      { id: 'ceiling', label: 'Parapet Coping', defaultHex: '#37414A', category: 'ceiling' },
      { id: 'trim', label: 'Plinth & Base Trim', defaultHex: '#526658', category: 'trim' },
    ],
  },
  door_window: {
    roomType: 'door_window',
    spaceCategory: 'exterior',
    label: 'Main Door & Windows',
    description: 'Heritage teak entrance & architectural window frames',
    defaultLightingMood: 'golden_sunset',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Main Teak Door', defaultHex: '#875237', category: 'accent' },
      { id: 'wall', label: 'Surrounding Wall', defaultHex: '#F7F4EE', category: 'base' },
      { id: 'ceiling', label: 'Porch Canopy', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Window Framing Trims', defaultHex: '#2A2D2B', category: 'trim' },
    ],
  },
  gate: {
    roomType: 'gate',
    spaceCategory: 'exterior',
    label: 'Main Entrance Gate',
    description: 'Boundary entrance gate & security hardware',
    defaultLightingMood: 'bright_daylight',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Gate Metal Finish', defaultHex: '#2A2D2B', category: 'accent' },
      { id: 'wall', label: 'Gate Pillars', defaultHex: '#E5DDCF', category: 'base' },
      { id: 'ceiling', label: 'Pillar Caps', defaultHex: '#C8A870', category: 'ceiling' },
      { id: 'trim', label: 'Brass Accent Trims', defaultHex: '#C8A870', category: 'trim' },
    ],
  },
  roof: {
    roomType: 'roof',
    spaceCategory: 'exterior',
    label: 'Roof & Terrace',
    description: 'Terrace parapet, tile overhangs & upper eaves',
    defaultLightingMood: 'golden_sunset',
    defaultFinish: 'Satin',
    editableRegions: [
      { id: 'accent', label: 'Terracotta Roof Tiles', defaultHex: '#A85A3F', category: 'accent' },
      { id: 'wall', label: 'Terrace Walls', defaultHex: '#FAF7F0', category: 'base' },
      { id: 'ceiling', label: 'Upper Ceiling Slab', defaultHex: '#FCFAF7', category: 'ceiling' },
      { id: 'trim', label: 'Parapet Coping', defaultHex: '#3D2D24', category: 'trim' },
    ],
  },
};

export function getSpaceConfig(roomType: RoomType, spaceCategory: SpaceCategory): SpaceConfig {
  const key = spaceCategory === 'exterior' ? roomType : roomType;
  return (
    SPACE_CONFIGURATIONS[key] || {
      roomType,
      spaceCategory,
      label: roomType.replace('_', ' ').toUpperCase(),
      description: 'Customizable home space',
      defaultLightingMood: 'warm_evening',
      defaultFinish: 'Eggshell',
      editableRegions: [
        { id: 'accent', label: 'Feature Accent', defaultHex: '#A3B899', category: 'accent' },
        { id: 'wall', label: 'Main Walls', defaultHex: '#EDE8DF', category: 'base' },
        { id: 'ceiling', label: 'Ceiling', defaultHex: '#FCFAF7', category: 'ceiling' },
        { id: 'trim', label: 'Trim', defaultHex: '#F0EBE1', category: 'trim' },
      ],
    }
  );
}
