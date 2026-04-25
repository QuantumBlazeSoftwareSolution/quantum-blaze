"use client";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GlowButton({
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        ${variant === "solid" ? "glow-btn-solid" : "glow-btn"}
        ${sizeClasses[size]}
        font-grotesk font-semibold rounded-xl
        inline-flex items-center gap-2
        transition-all duration-300
        cursor-pointer select-none
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
