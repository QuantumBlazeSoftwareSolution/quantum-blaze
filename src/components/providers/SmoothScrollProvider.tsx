"use client";
import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger after mount to fix any position miscalculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
