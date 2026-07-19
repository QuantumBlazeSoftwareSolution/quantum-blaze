"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { type Screenshot } from "@/lib/projects";

interface ScreenshotSliderProps {
  screenshots: Screenshot[];
  themeColor: string;
}

export function ScreenshotSlider({ screenshots, themeColor }: ScreenshotSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const selectSlide = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeScreenshot = screenshots[activeIndex];

  return (
    <section className="border-t border-slate-800/80 pt-16 mb-16 relative overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-8">
        Application Interface Showcase
      </h2>

      {/* Main Container */}
      <div className="relative min-h-[500px] lg:min-h-[550px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/40 border border-slate-900 rounded-3xl p-6 lg:p-10 overflow-hidden">
        
        {/* Dynamic Circular Mask Reveal Container (Main View Background / Left Column) */}
        <div className="lg:col-span-8 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl z-10">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeScreenshot.url}
                alt={activeScreenshot.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Pane & Staged Cards (Right Column) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[380px] z-20">
          {/* Slide Content details */}
          <div className="flex-grow flex flex-col justify-center pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
                }}
              >
                {/* Subtitle */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block"
                >
                  {activeScreenshot.subtitle}
                </motion.span>

                {/* Title */}
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                  }}
                  className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight"
                >
                  {activeScreenshot.title}
                </motion.h3>

                {/* Features List */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                  }}
                  className="space-y-2 mt-4"
                >
                  {activeScreenshot.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.25 } }
                      }}
                      className="flex items-start gap-2 text-xs md:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Staged Cards Row / Navigation Controls */}
          <div className="mt-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none mb-4">
              {screenshots.map((ss, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => selectSlide(idx)}
                    className={`relative w-20 h-12 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border-2 transition-all duration-300 ${
                      isActive ? "border-emerald-400 scale-105 shadow-lg shadow-emerald-500/10" : "border-slate-800 hover:border-slate-700 opacity-60"
                    }`}
                  >
                    <Image
                      src={ss.url}
                      alt={ss.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {String(activeIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
