"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingOrbs } from "./FloatingOrbs";
import { ParticleField } from "./ParticleField";
import { useMousePosition } from "@/hooks/useMousePosition";

function SceneContent() {
  const mouse = useMousePosition();

  return (
    <>
      <ParticleField count={1200} />
      <FloatingOrbs />
      {/* Camera rig that follows mouse */}
      <group rotation={[mouse.y * 0.08, mouse.x * 0.08, 0]}>
        <ambientLight intensity={0.05} />
      </group>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
