/**
 * Interactive Globe Component
 *
 * Totally developed and implemented by Rafael Soares
 * Interactive 3D component with animations and visual effects
 *
 * @author Rafael Soares (https://github.com/rsoaresdev)
 */

"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Sphere, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  Book,
  Pencil,
  GraduationCap,
  Languages,
  Globe as GlobeIcon,
  Flag,
  Star,
  Map,
  FileText,
  PenTool,
  BookOpen,
  Award,
  MessageCircle,
  Headphones,
  Mic,
  Coffee,
  HeartHandshake,
  Users,
  LightbulbIcon,
  Rocket,
} from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTranslations } from "next-intl";

// Helper to check if two positions are too close
const arePositionsClose = (
  pos1: Record<string, string>,
  pos2: Record<string, string>,
  minDistance: number
) => {
  // Extract the percentage values from the positions
  const pos1Values = {
    top: typeof pos1.top === "string" ? parseInt(pos1.top) : null,
    bottom: typeof pos1.bottom === "string" ? parseInt(pos1.bottom) : null,
    left: typeof pos1.left === "string" ? parseInt(pos1.left) : null,
    right: typeof pos1.right === "string" ? parseInt(pos1.right) : null,
  };

  const pos2Values = {
    top: typeof pos2.top === "string" ? parseInt(pos2.top) : null,
    bottom: typeof pos2.bottom === "string" ? parseInt(pos2.bottom) : null,
    left: typeof pos2.left === "string" ? parseInt(pos2.left) : null,
    right: typeof pos2.right === "string" ? parseInt(pos2.right) : null,
  };

  // Convert positions to normalized points (0-100%)
  const point1 = { x: 0, y: 0 };
  const point2 = { x: 0, y: 0 };

  // Calculate X coordinate
  if (pos1Values.left !== null) {
    point1.x = pos1Values.left;
  } else if (pos1Values.right !== null) {
    point1.x = 100 - pos1Values.right;
  }

  if (pos2Values.left !== null) {
    point2.x = pos2Values.left;
  } else if (pos2Values.right !== null) {
    point2.x = 100 - pos2Values.right;
  }

  // Calculate Y coordinate
  if (pos1Values.top !== null) {
    point1.y = pos1Values.top;
  } else if (pos1Values.bottom !== null) {
    point1.y = 100 - pos1Values.bottom;
  }

  if (pos2Values.top !== null) {
    point2.y = pos2Values.top;
  } else if (pos2Values.bottom !== null) {
    point2.y = 100 - pos2Values.bottom;
  }

  // Calculate Euclidean distance
  const distance = Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );

  return distance < minDistance;
};

// Helper to generate random positions, but not too close to the center
const generateRandomPosition = () => {
  // Decide in which quadrant to place the icon
  const quadrant = Math.floor(Math.random() * 4); // 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right

  let posObj = {};
  const minEdgeDistance = 10; // Minimum distance from the edge
  const maxEdgeDistance = 30; // Maximum distance from the edge

  // Generate position based on the quadrant, but keep a distance from the center
  switch (quadrant) {
    case 0: // top-left
      posObj = {
        top: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
        left: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
      };
      break;
    case 1: // top-right
      posObj = {
        top: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
        right: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
      };
      break;
    case 2: // bottom-left
      posObj = {
        bottom: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
        left: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
      };
      break;
    case 3: // bottom-right
      posObj = {
        bottom: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
        right: `${
          minEdgeDistance + Math.random() * (maxEdgeDistance - minEdgeDistance)
        }%`,
      };
      break;
  }

  return posObj;
};

// Optimized and interactive globe component with entry animation
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = 0.0005;
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(0);

  const [momentum, setMomentum] = useState({ x: 0, y: 0 });
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Load textures with useMemo for caching
  const earthTexture = useTexture("/images/earth-texture.webp", (texture) => {
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 1;
  });

  // Entry animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setScale(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const sphereArgs = useMemo(() => [1, 32, 32] as [number, number, number], []);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += rotationSpeed;

    if (dragging) {
      const deltaX = state.mouse.x - previousMousePosition.current.x;
      const deltaY = state.mouse.y - previousMousePosition.current.y;

      const distanceFromClick = Math.sqrt(
        Math.pow(state.mouse.x - initialClickPosition.current.x, 2) +
          Math.pow(state.mouse.y - initialClickPosition.current.y, 2)
      );

      if (distanceFromClick > 0.01) {
        hasMovedRef.current = true;
        meshRef.current.rotation.y += deltaX * 0.5;
        meshRef.current.rotation.x += deltaY * 0.5;
        setMomentum({ x: deltaX * 0.5, y: deltaY * 0.5 });
      }

      previousMousePosition.current = { x: state.mouse.x, y: state.mouse.y };
    } else {
      if (hasMovedRef.current) {
        meshRef.current.rotation.y += momentum.x;
        meshRef.current.rotation.x += momentum.y;
        setMomentum((prev) => ({
          x: prev.x * 0.95,
          y: prev.y * 0.95,
        }));
      }

      if (meshRef.current.scale.x < scale) {
        const newScale = THREE.MathUtils.lerp(
          meshRef.current.scale.x,
          scale,
          0.05
        );
        meshRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    // Check if the click was actually on the globe
    if (event.object === meshRef.current) {
      setDragging(true);
      hasMovedRef.current = false;

      if (event.nativeEvent) {
        const { clientX, clientY } = event.nativeEvent;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;
        initialClickPosition.current = { x, y };
        previousMousePosition.current = { x, y };
      }
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (!hasMovedRef.current) {
      setMomentum({ x: 0, y: 0 });
    }
  };

  return (
    <Sphere
      args={sphereArgs}
      ref={meshRef}
      scale={0.2}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      userData={{ draggable: true }}
    >
      <meshBasicMaterial
        map={earthTexture}
        transparent
        opacity={0.85}
        color="#ffffff"
      />
    </Sphere>
  );
}

// Interface for the icons
interface IconType {
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  size: number;
  position?: Record<string, string>;
  id?: number;
}

// The available icons in an array for random selection - updated with the new color palette
const availableIcons: IconType[] = [
  { Icon: GlobeIcon, color: "#4A98DC", size: 28, id: 1 },
  { Icon: Book, color: "#A05C2E", size: 32, id: 2 },
  { Icon: Pencil, color: "#FFCC00", size: 30, id: 3 },
  { Icon: GraduationCap, color: "#6C5CE7", size: 34, id: 4 },
  { Icon: Star, color: "#FFD700", size: 26, id: 5 },
  { Icon: Languages, color: "#00B894", size: 32, id: 6 },
  { Icon: Flag, color: "#FF3A30", size: 28, id: 7 },
  { Icon: Map, color: "#20B2AA", size: 30, id: 8 },
  { Icon: FileText, color: "#F8F8F8", size: 30, id: 9 },
  { Icon: PenTool, color: "#4A98DC", size: 28, id: 10 },
  { Icon: BookOpen, color: "#8E44AD", size: 30, id: 11 },
  { Icon: Award, color: "#F39C12", size: 30, id: 12 },
  { Icon: MessageCircle, color: "#FF6B6B", size: 30, id: 13 },
  { Icon: Headphones, color: "#9B59B6", size: 28, id: 14 },
  { Icon: Mic, color: "#E74C3C", size: 26, id: 15 },
  { Icon: Coffee, color: "#795548", size: 24, id: 16 },
  { Icon: HeartHandshake, color: "#FF5252", size: 28, id: 17 },
  { Icon: Users, color: "#3498DB", size: 30, id: 18 },
  { Icon: LightbulbIcon, color: "#F1C40F", size: 28, id: 19 },
  { Icon: Rocket, color: "#E84393", size: 30, id: 20 },
];

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array: IconType[]): IconType[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Component for the decorative icons
export function DecorativeIcons() {
  // State to control if we are on the client or server
  const isClient = useIsMounted();

  // Ensure the selected icons are unique
  const uniqueIcons = useMemo(() => {
    if (!isClient) return [];
    return shuffleArray(availableIcons).slice(0, 12);
  }, [isClient]);

  // Generate icons with random positions on each loading
  const decorativeIcons = useMemo(() => {
    if (!isClient) return [];

    const iconsArray: IconType[] = [];
    const minDistanceBetweenIcons = 15; // Minimum distance between icons in percentage

    let attempts = 0;
    const maxAttempts = 1; // Limit attempts to avoid infinite loop

    for (const icon of uniqueIcons) {
      attempts = 0;
      while (attempts < maxAttempts) {
        attempts++;

        const randomPosition = generateRandomPosition();

        // Check if this position is too close to any existing icon
        let isTooClose = false;
        for (const existingIcon of iconsArray) {
          if (
            existingIcon.position &&
            arePositionsClose(
              existingIcon.position,
              randomPosition,
              minDistanceBetweenIcons
            )
          ) {
            isTooClose = true;
            break;
          }
        }

        // If it's not too close to any existing icon, add it
        if (!isTooClose) {
          // Add a little variation in size
          const sizeVariation = Math.floor(Math.random() * 8) - 3; // -3 to +5

          iconsArray.push({
            ...icon,
            size: icon.size + sizeVariation,
            position: randomPosition,
          });
          break; // Exit the while loop after finding a valid position
        }
      }
    }

    return iconsArray;
  }, [uniqueIcons, isClient]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isClient &&
        decorativeIcons.map((item, index) => (
          <motion.div
            key={item.id || index}
            className="absolute"
            style={{
              ...item.position,
              zIndex: 25, // Increase z-index to be above the globe
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.85, 1, 0.85],
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: index * 0.2, // Shorter delay to distribute animations better
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Brightness effect behind the icon */}
              <div
                className="absolute inset-0 blur-md rounded-full"
                style={{
                  backgroundColor: item.color,
                  opacity: 0.3,
                  transform: "scale(1.2)",
                }}
              ></div>

              {/* Icon */}
              <div className="relative">
                <item.Icon
                  size={item.size}
                  color={item.color}
                  strokeWidth={2}
                  className="drop-shadow-lg"
                  style={{ filter: `drop-shadow(0 0 3px ${item.color})` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

// Interface for the light spots
interface LightSpot {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  blur: number;
  opacity: number;
  animationDuration: number;
}

// Component to create diffuse light spots in the background
function ModernLightBackground() {
  // State to control if we are on the client or server
  const isClient = useIsMounted();

  // Generate random light spots only on the client
  const lightSpots = useMemo(() => {
    // Return empty array if we are not on the client
    if (!isClient) return [];

    const spots: LightSpot[] = [];
    const colors = [
      "rgba(0, 123, 234, 0.4)", // Main blue (#007bea) more transparent
      "rgba(43, 8, 92, 0.3)", // Dark purple (#2b085c) more transparent
      "rgba(0, 123, 234, 0.3)", // Main blue even more transparent
      "rgba(43, 8, 92, 0.2)", // Dark purple even more transparent
      "rgba(255, 255, 255, 0.2)", // White even more transparent
    ];

    const totalSpots = 8; // Reduced from 12 to 8 light spots

    for (let i = 0; i < totalSpots; i++) {
      spots.push({
        id: i,
        x: `${5 + Math.random() * 90}%`,
        y: `${5 + Math.random() * 90}%`,
        size: 150 + Math.random() * 300, // Varied size
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: 70 + Math.random() * 100, // Varied blur
        opacity: 0.3 + Math.random() * 0.2, // Reduced opacity
        animationDuration: 8 + Math.random() * 15, // Varied duration
      });
    }

    return spots;
  }, [isClient]); // Dependency on the isClient state

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-indigo-50/30 to-white/80">
      {/* Smooth lighter gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8faff] to-white/95"></div>

      {/* Light spots - rendered only on the client */}
      {isClient &&
        lightSpots.map((spot) => (
          <motion.div
            key={spot.id}
            className="absolute rounded-full"
            style={{
              left: spot.x,
              top: spot.y,
              width: `${spot.size}px`,
              height: `${spot.size}px`,
              background: `radial-gradient(circle, ${spot.color} 0%, rgba(255,255,255,0) 70%)`,
              filter: `blur(${spot.blur}px)`,
              opacity: spot.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [spot.opacity, spot.opacity * 0.7, spot.opacity],
            }}
            transition={{
              duration: spot.animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Modern grid with thin lines */}
      {/* Modern grid with thin lines with fading effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(43, 8, 92, 0.03) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(43, 8, 92, 0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
    </div>
  );
}

export default function InteractiveGlobe() {
  // Get translations for accessibility texts
  const t = useTranslations("HomePage.accessibility.globe");

  // State to detect if we are on the client
  const isMounted = useIsMounted();
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Add effect to check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Render only a placeholder during SSR
  if (!isMounted) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 to-white/70"
        aria-hidden="true"
      >
        {/* Static placeholder for SSR */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-50 to-blue-100 opacity-30 blur-xl" />
        </div>
      </div>
    );
  }

  // Render only on the client
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
      aria-label={t("ariaLabel")}
      role="img"
      aria-hidden="true" // We mark this as hidden because it's decorative and not essential for understanding the page
      tabIndex={-1} // Ensure it's not focusable by keyboard
      className="focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {/* Skip link for keyboard users */}
      <div className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-50 focus-visible:bg-white focus-visible:p-4 focus-visible:text-black focus-visible:rounded-lg focus-visible:shadow-lg">
        {t("skip")}
      </div>

      {/* Modern background with light spots */}
      <ModernLightBackground />

      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 55 }}
          dpr={1}
          frameloop="always"
          gl={{
            antialias: false,
            powerPreference: "low-power",
            depth: true,
            stencil: false,
            alpha: true,
          }}
          performance={{ min: 0.5 }}
          className="pointer-events-none"
        >
          <ambientLight intensity={1.0} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            color="#ffffff"
          />
          <group>
            <Globe />
          </group>
          <OrbitControls
            enabled={false}
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
      <DecorativeIcons />
    </motion.div>
  );
}
