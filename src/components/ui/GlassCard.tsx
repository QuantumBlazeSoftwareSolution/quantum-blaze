"use client";
import { useRef, ReactNode } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  tilt = false,
  glowOnHover = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  const handleMouseMove = () => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = mouse.rawX - rect.left;
    const y = mouse.rawY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass rounded-2xl transition-all duration-300 ${
        glowOnHover ? "glass-hover cursor-pointer" : ""
      } ${className}`}
      style={{
        transition:
          "transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
