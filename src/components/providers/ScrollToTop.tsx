"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset standard window scroll
    window.scrollTo(0, 0);

    // Temp disable smooth scroll behavior to prevent scroll jump animations
    const html = document.documentElement;
    const body = document.body;
    if (html) html.style.scrollBehavior = "auto";
    if (body) body.style.scrollBehavior = "auto";
    
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
