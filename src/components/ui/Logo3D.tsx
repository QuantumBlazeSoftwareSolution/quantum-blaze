"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// Outer Cube Frame component made of 12 cylinders representing the cube edges
function CubeFrame({ size, thickness, color }: { size: number; thickness: number; color: string }) {
  const half = size / 2;

  // Define the 12 edges of the cube
  // Each edge has a start point, end point, and orientation/rotation
  const edges = useMemo(() => {
    return [
      // 4 parallel to X-axis
      { position: [0, -half, -half], rotation: [0, 0, Math.PI / 2] },
      { position: [0, half, -half], rotation: [0, 0, Math.PI / 2] },
      { position: [0, -half, half], rotation: [0, 0, Math.PI / 2] },
      { position: [0, half, half], rotation: [0, 0, Math.PI / 2] },

      // 4 parallel to Y-axis
      { position: [-half, 0, -half], rotation: [0, 0, 0] },
      { position: [half, 0, -half], rotation: [0, 0, 0] },
      { position: [-half, 0, half], rotation: [0, 0, 0] },
      { position: [half, 0, half], rotation: [0, 0, 0] },

      // 4 parallel to Z-axis
      { position: [-half, -half, 0], rotation: [Math.PI / 2, 0, 0] },
      { position: [half, -half, 0], rotation: [Math.PI / 2, 0, 0] },
      { position: [-half, half, 0], rotation: [Math.PI / 2, 0, 0] },
      { position: [half, half, 0], rotation: [Math.PI / 2, 0, 0] },
    ];
  }, [half]);

  return (
    <group>
      {edges.map((edge, idx) => (
        <mesh 
          key={idx} 
          position={edge.position as [number, number, number]} 
          rotation={edge.rotation as [number, number, number]}
        >
          <cylinderGeometry args={[thickness, thickness, size, 8]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Helper component to render a cylinder between two 3D points
function CylinderBetweenPoints({ 
  start, 
  end, 
  thickness, 
  color 
}: { 
  start: THREE.Vector3; 
  end: THREE.Vector3; 
  thickness: number; 
  color: string; 
}) {
  const direction = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
  const length = useMemo(() => direction.length(), [direction]);
  const position = useMemo(() => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5), [start, end]);
  
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    const dirNorm = direction.clone().normalize();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirNorm);
    return q;
  }, [direction]);
  
  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[thickness, thickness, length, 8]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.15}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// Tesseract component: combines outer frame, inner frame, and 8 corner connector struts
function Tesseract({ 
  outerSize, 
  innerSize, 
  thickness, 
  color 
}: { 
  outerSize: number; 
  innerSize: number; 
  thickness: number; 
  color: string; 
}) {
  // Calculate the 8 corner connectors
  const connectors = useMemo(() => {
    const arr = [];
    const signs = [-1, 1];
    for (const x of signs) {
      for (const y of signs) {
        for (const z of signs) {
          const start = new THREE.Vector3((x * innerSize) / 2, (y * innerSize) / 2, (z * innerSize) / 2);
          const end = new THREE.Vector3((x * outerSize) / 2, (y * outerSize) / 2, (z * outerSize) / 2);
          arr.push({ start, end });
        }
      }
    }
    return arr;
  }, [outerSize, innerSize]);

  return (
    <group>
      {/* Outer Cube Frame */}
      <CubeFrame size={outerSize} thickness={thickness} color={color} />
      
      {/* Inner Cube Frame */}
      <CubeFrame size={innerSize} thickness={thickness * 0.75} color={color} />
      
      {/* 8 Diagonal Corner Connectors */}
      {connectors.map((conn, idx) => (
        <CylinderBetweenPoints 
          key={idx} 
          start={conn.start} 
          end={conn.end} 
          thickness={thickness * 0.6} 
          color={color} 
        />
      ))}
    </group>
  );
}

// Main 3D Logo Scene that manages rotation and orbits
function LogoScene({ color, onReady }: { color: string; onReady?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const hasTriggeredReady = useRef(false);

  // Constants for geometry
  const outerCubeSize = 2.4;
  const innerCubeSize = 1.25;
  const frameThickness = 0.065;
  const torusRadius = 1.95;
  const torusTube = 0.05;
  const orbRadius = 0.22;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Signal that the 3D scene has rendered its first frame (WebGL is ready and drawing)
    if (!hasTriggeredReady.current && onReady) {
      hasTriggeredReady.current = true;
      // Small timeout to ensure context is fully drawn
      setTimeout(onReady, 100);
    }

    // Slowly rotate the entire tesseract system in all axes
    if (groupRef.current) {
      groupRef.current.rotation.x = time * 0.12;
      groupRef.current.rotation.y = time * 0.18;
      groupRef.current.rotation.z = time * 0.08;
    }

    // Animate the orb traveling along the torus ring orbit
    if (orbRef.current) {
      const angle = time * 0.8;
      // Position on the ring (which lies in the X-Y plane of the torus group)
      orbRef.current.position.x = Math.cos(angle) * torusRadius;
      orbRef.current.position.y = Math.sin(angle) * torusRadius;
    }
  });

  return (
    <group>
      {/* Rotating Tesseract (Outer frame + Inner frame + Connecting bars + Inner solid cube) */}
      <group ref={groupRef}>
        <Tesseract 
          outerSize={outerCubeSize} 
          innerSize={innerCubeSize} 
          thickness={frameThickness} 
          color={color} 
        />
        
        {/* Solid Inner Core Cube inside the inner wireframe */}
        <mesh>
          <boxGeometry args={[innerCubeSize * 0.95, innerCubeSize * 0.95, innerCubeSize * 0.95]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.95}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </group>

      {/* Orbiting Ring (Torus) - Tilted around the tesseract */}
      <group rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        {/* The Torus Ring */}
        <mesh>
          <torusGeometry args={[torusRadius, torusTube, 16, 100]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Orbiting Orb/Sphere */}
        <mesh ref={orbRef}>
          <sphereGeometry args={[orbRadius, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>
      </group>
    </group>
  );
}

export function Logo3D({ 
  color = "#38bdf8", 
  height = "400px",
  interactive = true 
}: { 
  color?: string; 
  height?: string;
  interactive?: boolean;
}) {
  const [isReady, setIsReady] = React.useState(false);

  return (
    <div className="w-full h-full relative" style={{ height }}>
      {/* Static placeholder image loaded instantly */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-700 ease-out"
        style={{ opacity: isReady ? 0 : 1 }}
      >
        <img 
          src="/original-logo.png" 
          alt="Quantum Blaze Logo Placeholder"
          className="w-[75%] h-[75%] object-contain max-w-[340px] max-h-[340px] select-none"
          // @ts-ignore
          fetchpriority="high"
        />
      </div>

      {/* The 3D Canvas which will fade in smoothly once first frame is ready */}
      <div 
        className="w-full h-full transition-opacity duration-700 ease-in-out"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          
          {/* Soft studio lights */}
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <spotLight position={[0, 5, 0]} intensity={1.2} angle={Math.PI / 4} penumbra={1} />
          
          <LogoScene color={color} onReady={() => setIsReady(true)} />

          {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />}
          
          {/* Environment map for realistic reflections */}
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}
