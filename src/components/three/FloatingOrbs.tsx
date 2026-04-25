"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
  opacity?: number;
}

function Orb({ position, scale, color, speed, distort, opacity = 0.8 }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = { ...position };

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.position.y = (initialPos[1] as number) + Math.sin(t) * 0.3;
    meshRef.current.position.x = (initialPos[0] as number) + Math.cos(t * 0.7) * 0.15;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={2}
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={opacity}
      />
    </Sphere>
  );
}

export function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle global drift
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Main large orb */}
      <Orb
        position={[0, 0, -2]}
        scale={3}
        color="#0ea5e9"
        speed={0.3}
        distort={0.4}
        opacity={0.5}
      />
      {/* Left orb */}
      <Orb
        position={[-5, 1, -4]}
        scale={2}
        color="#38bdf8"
        speed={0.5}
        distort={0.5}
        opacity={0.4}
      />
      {/* Right orb */}
      <Orb
        position={[5, -1, -3]}
        scale={1.5}
        color="#0284c7"
        speed={0.4}
        distort={0.3}
        opacity={0.45}
      />
      {/* Small accent orbs */}
      <Orb
        position={[3, 3, -5]}
        scale={0.8}
        color="#7dd3fc"
        speed={0.8}
        distort={0.6}
        opacity={0.3}
      />
      <Orb
        position={[-3, -2, -4]}
        scale={1}
        color="#0369a1"
        speed={0.6}
        distort={0.4}
        opacity={0.35}
      />
      <Orb
        position={[1, 3, -6]}
        scale={0.6}
        color="#bae6fd"
        speed={1}
        distort={0.7}
        opacity={0.25}
      />

      {/* Lighting */}
      <pointLight position={[0, 0, 2]} intensity={3} color="#38bdf8" distance={10} />
      <pointLight position={[-5, 5, 0]} intensity={2} color="#0ea5e9" distance={15} />
      <pointLight position={[5, -5, 0]} intensity={1.5} color="#7dd3fc" distance={12} />
      <ambientLight intensity={0.1} />
    </group>
  );
}
