"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user already dismissed in this session
    const dismissed = sessionStorage.getItem("hero-banner-dismissed");
    if (dismissed) return;

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hero-banner-dismissed", "true");
    }, 300);
  };

  // Don't render anything on server or before mount
  if (!mounted || !isVisible) return null;

  // Use portal to render outside Next.js component tree — avoids DOM insertion errors
  return createPortal(
    <div id="hero-banner-root">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4"
        }`}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Beacon / Radar Pulse Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-full h-full rounded-2xl border-2 border-amber-500/60 animate-beacon-pulse-1" />
            <div className="absolute w-full h-full rounded-2xl border-2 border-amber-400/40 animate-beacon-pulse-2" />
            <div className="absolute w-full h-full rounded-2xl border border-amber-300/20 animate-beacon-pulse-3" />
          </div>

          {/* Image Container */}
          <a
            href="https://saloon-management-app.vercel.app/pre-order"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative block cursor-pointer group rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/30 hover:shadow-amber-500/40 transition-shadow duration-500"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image */}
            <div className="relative">
              <Image
                src="/fade-master-banner.jpg"
                alt="Fade Master - Smart Saloon Management App | Pre-Order Early Access"
                width={420}
                height={520}
                className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none">
                <span className="text-white text-sm font-semibold tracking-wide px-4 py-2 rounded-full bg-amber-500/80 backdrop-blur-sm">
                  Click to Pre-Order →
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
