"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeState = {
  bgImage: string | null;
  opacity: number;
};

type ThemeContextType = {
  theme: ThemeState;
  setBgImage: (url: string | null) => void;
  setOpacity: (value: number) => void;
  resetTheme: () => void;
};

const DEFAULT_THEME: ThemeState = {
  bgImage: null,
  opacity: 0.2,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved) {
      try {
        setTheme(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved theme", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("admin-theme", JSON.stringify(theme));
    }
  }, [theme, isLoaded]);

  const setBgImage = (url: string | null) => setTheme(prev => ({ ...prev, bgImage: url }));
  const setOpacity = (value: number) => setTheme(prev => ({ ...prev, opacity: value }));
  const resetTheme = () => setTheme(DEFAULT_THEME);

  return (
    <ThemeContext.Provider value={{ theme, setBgImage, setOpacity, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
