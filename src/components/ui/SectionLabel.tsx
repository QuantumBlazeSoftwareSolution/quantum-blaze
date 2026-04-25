"use client";
import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase ${className}`}
      style={{
        background: "rgba(56, 189, 248, 0.08)",
        border: "1px solid rgba(56, 189, 248, 0.25)",
        color: "var(--accent-blue)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-sky-400"
        style={{ boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
      />
      {children}
    </div>
  );
}
