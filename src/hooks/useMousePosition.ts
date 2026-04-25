"use client";
import { useState, useEffect } from "react";

export interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
  rawX: number; // 0 to window.innerWidth
  rawY: number; // 0 to window.innerHeight
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
        rawX: e.clientX,
        rawY: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
