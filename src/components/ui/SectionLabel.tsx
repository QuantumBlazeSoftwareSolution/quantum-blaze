"use client";
import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-xs font-bold uppercase tracking-[0.3em] text-sky-400 ${className}`}
    >
      {children}
    </span>
  );
}
