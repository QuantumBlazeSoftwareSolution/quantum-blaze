"use client";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedMap = {
  slow: "40s",
  normal: "25s",
  fast: "15s",
};

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  className = "",
}: MarqueeProps) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className="flex w-max"
        style={{
          animation: `${animName} ${speedMap[speed]} linear infinite`,
          willChange: "transform",
        }}
      >
        {/* Duplicate for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}
