import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FinishType, LightingMood, RoomType, SpaceCategory } from '../../types';

export interface WindowCurtainState {
  hasCurtain: boolean;
  curtainType: 'sheer' | 'light' | 'blackout' | 'panel';
  curtainColor: string;
  isOpen: boolean; // true = open, false = closed
}

export type WallAttachment = 'north' | 'south' | 'east' | 'west';

export interface Scene3DObject {
  id: string;
  name: string;
  type:
    | 'sofa'
    | 'coffee_table'
    | 'tv_unit'
    | 'plant'
    | 'lamp'
    | 'rug'
    | 'chair'
    | 'desk'
    | 'bed'
    | 'wardrobe'
    | 'window';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  wall?: WallAttachment;
  windowState?: WindowCurtainState;
}

interface RoomVisualizer3DProps {
  viewMode: 'designer' | 'experience';
  roomType: RoomType;
  spaceCategory: SpaceCategory;
  wallColor: string;
  accentColor: string;
  ceilingColor: string;
  trimColor: string;
  lightingMood: LightingMood;
  finish: FinishType;
  selectedSurface: 'wall' | 'accent' | 'ceiling' | 'trim';
  onSelectSurface: (surface: 'wall' | 'accent' | 'ceiling' | 'trim') => void;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  objects: Scene3DObject[];
  onUpdateObject: (updated: Scene3DObject) => void;
  onNestoSpatialEvent?: (eventMsg: string) => void;
}

// ----------------------------------------------------
// CAMERA-RELATIVE FIRST PERSON CONTROLLER (LOOK & WALK)
// ----------------------------------------------------
function FirstPersonController({ isExperienceMode }: { isExperienceMode: boolean }) {
  const { camera, gl } = useThree();
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });

  // Camera Pitch & Yaw angles
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);

  useEffect(() => {
    if (!isExperienceMode) return;

    // Reset camera position & euler look angles upon entering Experience View
    camera.position.set(0, 1.65, 2.5);
    euler.current.set(0, 0, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler.current);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') moveState.current.forward = true;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') moveState.current.backward = true;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') moveState.current.left = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') moveState.current.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') moveState.current.forward = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') moveState.current.backward = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') moveState.current.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') moveState.current.right = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked.current) return;

      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;

      // Update Yaw (Y axis) and Pitch (X axis)
      euler.current.y -= movementX * 0.0022;
      euler.current.x -= movementY * 0.0022;

      // Clamp vertical pitch so camera cannot flip upside down (-85 deg to +85 deg)
      euler.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    };

    const domElement = gl.domElement;
    const handleCanvasClick = () => {
      if (isExperienceMode && !isPointerLocked.current) {
        domElement.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === domElement;
    };

    domElement.addEventListener('click', handleCanvasClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      domElement.removeEventListener('click', handleCanvasClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.pointerLockElement === domElement) {
        document.exitPointerLock();
      }
    };
  }, [isExperienceMode, camera, gl]);

  useFrame((_, delta) => {
    if (!isExperienceMode) return;

    const speed = 3.8 * delta;

    // Calculate camera-relative forward and strafe directions
    const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    forwardVec.y = 0; // Keep movement locked on horizontal floor plane
    forwardVec.normalize();

    const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    rightVec.y = 0;
    rightVec.normalize();

    if (moveState.current.forward) camera.position.addScaledVector(forwardVec, speed);
    if (moveState.current.backward) camera.position.addScaledVector(forwardVec, -speed);
    if (moveState.current.left) camera.position.addScaledVector(rightVec, -speed);
    if (moveState.current.right) camera.position.addScaledVector(rightVec, speed);

    // Keep camera within room boundaries (-4.4m to 4.4m)
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.3, 4.3);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -4.3, 4.3);
    camera.position.y = 1.65; // Eye height
  });

  return null;
}

// ----------------------------------------------------
// DESIGNER MODE WASD OBJECT TRANSLATION CONTROLLER
// ----------------------------------------------------
function DesignerObjectController({
  isExperienceMode,
  selectedObjectId,
  objects,
  onUpdateObject,
}: {
  isExperienceMode: boolean;
  selectedObjectId: string | null;
  objects: Scene3DObject[];
  onUpdateObject: (updated: Scene3DObject) => void;
}) {
  const moveKeys = useRef({ north: false, south: false, west: false, east: false });
  const selectedObjRef = useRef<Scene3DObject | null>(null);

  useEffect(() => {
    selectedObjRef.current = objects.find((o) => o.id === selectedObjectId) || null;
  }, [objects, selectedObjectId]);

  useEffect(() => {
    if (isExperienceMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedObjRef.current) return;
      if (['w', 'W', 's', 'S', 'a', 'A', 'd', 'D', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      }

      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') moveKeys.current.north = true;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') moveKeys.current.south = true;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') moveKeys.current.west = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') moveKeys.current.east = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') moveKeys.current.north = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') moveKeys.current.south = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') moveKeys.current.west = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') moveKeys.current.east = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isExperienceMode]);

  useFrame((_, delta) => {
    if (isExperienceMode || !selectedObjRef.current) return;
    const activeObj = selectedObjRef.current;

    const { north, south, west, east } = moveKeys.current;
    if (!north && !south && !west && !east) return;

    const speed = 2.5 * delta;
    let newX = activeObj.position[0];
    let newZ = activeObj.position[2];

    if (north) newZ -= speed; // W = North / Forward (-Z)
    if (south) newZ += speed; // S = South / Backward (+Z)
    if (west) newX -= speed;  // A = West / Left (-X)
    if (east) newX += speed;  // D = East / Right (+X)

    newX = THREE.MathUtils.clamp(newX, -4.2, 4.2);
    newZ = THREE.MathUtils.clamp(newZ, -4.2, 4.2);

    if (newX !== activeObj.position[0] || newZ !== activeObj.position[2]) {
      onUpdateObject({
        ...activeObj,
        position: [newX, activeObj.position[1], newZ],
      });
    }
  });

  return null;
}

// ----------------------------------------------------
// PROCEDURAL 3D MODELS WITH ATTACHED CURTAINS & SUNLIGHT
// ----------------------------------------------------
function Render3DObject({
  obj,
  isSelected,
  onSelect,
}: {
  obj: Scene3DObject;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);

  // Calculate sunlight intensity contribution if window
  const windowState = obj.windowState || {
    hasCurtain: true,
    curtainType: 'sheer',
    curtainColor: '#F5EBDD',
    isOpen: true,
  };

  const sunlightFactor = !windowState.isOpen
    ? windowState.curtainType === 'blackout'
      ? 0.15
      : 0.4
    : 1.0;

  return (
    <group
      ref={meshRef}
      position={obj.position}
      rotation={obj.rotation}
      scale={obj.scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* 1. SOFA MODEL */}
      {obj.type === 'sofa' && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.4, 0.9]} />
            <meshStandardMaterial color={obj.color} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.9, -0.38]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.6, 0.25]} />
            <meshStandardMaterial color={obj.color} roughness={0.75} />
          </mesh>
          <mesh position={[-1.25, 0.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.6, 1.0]} />
            <meshStandardMaterial color="#4A3425" roughness={0.5} />
          </mesh>
          <mesh position={[1.25, 0.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.6, 1.0]} />
            <meshStandardMaterial color="#4A3425" roughness={0.5} />
          </mesh>
          {[-1.1, 1.1].map((x) =>
            [-0.4, 0.4].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.125, z]} castShadow>
                <cylinderGeometry args={[0.04, 0.03, 0.25, 12]} />
                <meshStandardMaterial color="#3A2314" roughness={0.4} />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* 2. COFFEE TABLE MODEL */}
      {obj.type === 'coffee_table' && (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.65, 0.65, 0.06, 32]} />
            <meshStandardMaterial color={obj.color} roughness={0.3} metalness={0.1} />
          </mesh>
          {[0, 2.09, 4.18].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.sin(angle) * 0.45, 0.2, Math.cos(angle) * 0.45]}
              rotation={[0.15 * Math.cos(angle), 0, -0.15 * Math.sin(angle)]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.02, 0.4, 12]} />
              <meshStandardMaterial color="#C8A870" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* 3. TV & CREDENZA UNIT */}
      {obj.type === 'tv_unit' && (
        <group>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.5, 0.5]} />
            <meshStandardMaterial color={obj.color} roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.35, 0]} castShadow>
            <boxGeometry args={[1.8, 1.0, 0.06]} />
            <meshStandardMaterial color="#1C1E1B" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* 4. INDOOR FIDDLE LEAF PLANT */}
      {obj.type === 'plant' && (
        <group>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.18, 0.45, 24]} />
            <meshStandardMaterial color="#B86A4C" roughness={0.8} />
          </mesh>
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, idx) => (
            <mesh
              key={idx}
              position={[Math.sin(rot) * 0.1, 0.75 + idx * 0.12, Math.cos(rot) * 0.1]}
              rotation={[0.3, rot, 0.2]}
              castShadow
            >
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#234B38' : '#3D6852'} roughness={0.6} />
            </mesh>
          ))}
        </group>
      )}

      {/* 5. MODERN FLOOR ARC LAMP */}
      {obj.type === 'lamp' && (
        <group>
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
            <meshStandardMaterial color="#2A2D2B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 2.1, 12]} />
            <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 2.1, 0]} rotation={[Math.PI, 0, 0]} castShadow>
            <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#C8A870" metalness={0.8} roughness={0.2} />
          </mesh>
          <pointLight position={[0, 1.9, 0]} intensity={1.5} distance={5} color="#FFA726" />
        </group>
      )}

      {/* 6. FLOOR AREA RUG */}
      {obj.type === 'rug' && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.8, 2.0]} />
          <meshStandardMaterial color={obj.color} roughness={0.9} />
        </mesh>
      )}

      {/* 7. EXECUTIVE DESK */}
      {obj.type === 'desk' && (
        <group>
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.06, 0.8]} />
            <meshStandardMaterial color={obj.color} roughness={0.4} />
          </mesh>
          {[-0.7, 0.7].map((x) => (
            <mesh key={x} position={[x, 0.35, 0]} castShadow>
              <boxGeometry args={[0.06, 0.7, 0.75]} />
              <meshStandardMaterial color="#37414A" metalness={0.5} />
            </mesh>
          ))}
        </group>
      )}

      {/* 8. BED & HEADBOARD */}
      {obj.type === 'bed' && (
        <group>
          <mesh position={[0, 0.8, -0.95]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 1.1, 0.15]} />
            <meshStandardMaterial color={obj.color} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.35, 0.0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.35, 1.9]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* 9. EDITABLE ARCHITECTURAL WINDOW WITH SUNLIGHT & PARENTED CURTAINS */}
      {obj.type === 'window' && (
        <group>
          {/* Outer Wooden/Metal Frame */}
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.8, 0.12]} />
            <meshStandardMaterial color={obj.color} roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Glass Pane */}
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[2.0, 1.6, 0.02]} />
            <meshStandardMaterial color="#EBF3F5" opacity={0.6} transparent roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Glass Frame Mullions */}
          <mesh position={[0, 1.6, 0.02]}>
            <boxGeometry args={[0.04, 1.6, 0.02]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>
          <mesh position={[0, 1.6, 0.02]}>
            <boxGeometry args={[2.0, 0.04, 0.02]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>

          {/* WINDOW SUNLIGHT SOURCE (Directional & Floor Illumination) */}
          <directionalLight
            position={[0, 2.0, 0.8]}
            target-position={[0, 0, 3]}
            intensity={1.8 * sunlightFactor}
            color="#FFF4D2"
            castShadow
          />
          <mesh position={[0, 0.02, 1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2.4, 2.5]} />
            <meshBasicMaterial color="#FFF4D2" opacity={0.18 * sunlightFactor} transparent />
          </mesh>

          {/* PARENTED CURTAIN SYSTEM */}
          {windowState.hasCurtain && (
            <group position={[0, 2.45, 0.1]}>
              {/* Brass Curtain Rod */}
              <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.025, 0.025, 2.5, 16]} />
                <meshStandardMaterial color="#C8A870" metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Left & Right Curtain Fabric Panels */}
              {windowState.isOpen ? (
                /* Open Curtains (Draped at sides) */
                <>
                  <mesh position={[-1.0, -0.9, 0]} castShadow>
                    <boxGeometry args={[0.35, 1.85, 0.06]} />
                    <meshStandardMaterial
                      color={windowState.curtainColor}
                      roughness={0.8}
                      opacity={windowState.curtainType === 'sheer' ? 0.65 : 0.95}
                      transparent={windowState.curtainType === 'sheer'}
                    />
                  </mesh>
                  <mesh position={[1.0, -0.9, 0]} castShadow>
                    <boxGeometry args={[0.35, 1.85, 0.06]} />
                    <meshStandardMaterial
                      color={windowState.curtainColor}
                      roughness={0.8}
                      opacity={windowState.curtainType === 'sheer' ? 0.65 : 0.95}
                      transparent={windowState.curtainType === 'sheer'}
                    />
                  </mesh>
                </>
              ) : (
                /* Closed Curtains (Covering window) */
                <mesh position={[0, -0.9, 0]} castShadow>
                  <boxGeometry args={[2.3, 1.85, 0.06]} />
                  <meshStandardMaterial
                    color={windowState.curtainColor}
                    roughness={0.8}
                    opacity={windowState.curtainType === 'sheer' ? 0.7 : 0.98}
                    transparent={windowState.curtainType === 'sheer'}
                  />
                </mesh>
              )}
            </group>
          )}
        </group>
      )}

      {/* SELECTION HIGHLIGHT RING & TOOLBAR */}
      {isSelected && (
        <group position={[0, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.25, 32]} />
            <meshBasicMaterial color="#E5A83B" side={THREE.DoubleSide} />
          </mesh>
          <Html position={[0, 1.5, 0]} center>
            <div className="bg-[#173C35] text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#E5A83B] shadow-md whitespace-nowrap flex items-center gap-2">
              <span>{obj.name}</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// ----------------------------------------------------
// 3D ROOM ARCHITECTURE & ENVIRONMENT CANVAS
// ----------------------------------------------------
export const RoomVisualizer3D: React.FC<RoomVisualizer3DProps> = ({
  viewMode,
  roomType,
  spaceCategory,
  wallColor,
  accentColor,
  ceilingColor,
  trimColor,
  lightingMood,
  finish,
  selectedSurface,
  onSelectSurface,
  selectedObjectId,
  onSelectObject,
  objects,
  onUpdateObject,
  onNestoSpatialEvent,
}) => {
  const isExperienceMode = viewMode === 'experience';

  const getLightingSetup = () => {
    switch (lightingMood) {
      case 'warm_evening':
        return { ambient: 0.4, sunColor: '#FFB74D', sunIntensity: 1.2, skyColor: '#FFE0B2' };
      case 'golden_sunset':
        return { ambient: 0.5, sunColor: '#FF9800', sunIntensity: 1.8, skyColor: '#FFCC80' };
      case 'soft_twilight':
        return { ambient: 0.3, sunColor: '#90CAF9', sunIntensity: 0.8, skyColor: '#B0BEC5' };
      case 'bright_daylight':
      default:
        return { ambient: 0.7, sunColor: '#FFF8E1', sunIntensity: 2.2, skyColor: '#E3F2FD' };
    }
  };

  const lights = getLightingSetup();

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] rounded-2xl overflow-hidden bg-[#121816] select-none">
      {/* Mode Status Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#173C35]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F5EBDD]/20 text-xs font-bold text-white shadow-md">
        <span className={`w-2.5 h-2.5 rounded-full ${isExperienceMode ? 'bg-[#E5A83B] animate-ping' : 'bg-[#386641]'}`} />
        <span>{isExperienceMode ? 'First-Person Mode (Click Canvas & WASD + Mouse to Look)' : 'Designer 3D Studio (Orbit Camera)'}</span>
      </div>

      <Canvas
        shadows
        camera={
          isExperienceMode
            ? { position: [0, 1.65, 2.5], fov: 65 }
            : { position: [5.5, 4.5, 6.5], fov: 45 }
        }
      >
        <ambientLight intensity={lights.ambient} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={lights.sunIntensity}
          color={lights.sunColor}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-4, 5, -3]} intensity={0.4} color="#FFFFFF" />

        {/* First Person Movement & Mouse Look Controller */}
        <FirstPersonController isExperienceMode={isExperienceMode} />

        {/* Designer Mode WASD Object Movement Controller */}
        <DesignerObjectController
          isExperienceMode={isExperienceMode}
          selectedObjectId={selectedObjectId}
          objects={objects}
          onUpdateObject={onUpdateObject}
        />

        {/* Designer Orbit Camera Controls */}
        {!isExperienceMode && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.02}
            minDistance={2.5}
            maxDistance={12}
            target={[0, 1.2, 0]}
          />
        )}

        {/* 3D ROOM ARCHITECTURAL STRUCTURE */}
        <group onClick={() => onSelectObject(null)}>
          {/* FLOOR */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              onSelectSurface('trim');
            }}
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#6B442A" roughness={0.4} metalness={0.1} />
          </mesh>

          {/* BACK ACCENT FEATURE WALL */}
          <mesh
            position={[0, 2.5, -5]}
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              onSelectSurface('accent');
            }}
          >
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial
              color={accentColor}
              roughness={finish === 'Satin' ? 0.3 : finish === 'Eggshell' ? 0.6 : 0.85}
            />
          </mesh>

          {/* LEFT MAIN WALL */}
          <mesh
            position={[-5, 2.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              onSelectSurface('wall');
            }}
          >
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial color={wallColor} roughness={0.7} />
          </mesh>

          {/* RIGHT MAIN WALL */}
          <mesh
            position={[5, 2.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              onSelectSurface('wall');
            }}
          >
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial color={wallColor} roughness={0.7} />
          </mesh>

          {/* CEILING */}
          <mesh
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSurface('ceiling');
            }}
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color={ceilingColor} roughness={0.9} />
          </mesh>

          {/* SKIRTING TRIM BASEBOARDS */}
          <mesh position={[0, 0.08, -4.95]}>
            <boxGeometry args={[10, 0.16, 0.04]} />
            <meshStandardMaterial color={trimColor} />
          </mesh>
        </group>

        {/* INTERACTIVE 3D OBJECTS SCENE */}
        {objects.map((obj) => (
          <React.Fragment key={obj.id}>
            <Render3DObject
              obj={obj}
              isSelected={selectedObjectId === obj.id}
              onSelect={() => onSelectObject(obj.id)}
            />
          </React.Fragment>
        ))}

        <ContactShadows position={[0, 0.01, 0]} opacity={0.65} scale={10} blur={1.5} far={4} />
      </Canvas>

      {/* Experience Mode Walking Instructions HUD Overlay */}
      {isExperienceMode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#173C35]/90 backdrop-blur-md px-5 py-2 rounded-full border border-[#F5EBDD]/30 text-xs font-semibold text-white shadow-xl flex items-center gap-4">
          <div className="flex items-center gap-1 font-mono text-[#E5A83B]">
            <span className="px-1.5 py-0.5 rounded bg-white/20">W</span>
            <span className="px-1.5 py-0.5 rounded bg-white/20">A</span>
            <span className="px-1.5 py-0.5 rounded bg-white/20">S</span>
            <span className="px-1.5 py-0.5 rounded bg-white/20">D</span>
          </div>
          <span>Click Canvas to Lock Mouse Look & Walk Around • Press ESC to release</span>
        </div>
      )}
    </div>
  );
};
