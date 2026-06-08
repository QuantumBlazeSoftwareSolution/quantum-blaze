"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/lib/data";
import { Search, Palette, Layers, Code2, Rocket } from "lucide-react";

const IconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6 text-sky-400" />,
  Palette: <Palette className="w-6 h-6 text-sky-400" />,
  Layers: <Layers className="w-6 h-6 text-sky-400" />,
  Code2: <Code2 className="w-6 h-6 text-sky-400" />,
  Rocket: <Rocket className="w-6 h-6 text-sky-400" />,
};

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup ScrollTrigger for each step block in the right column
      const triggers = gsap.utils.toArray(".process-trigger");
      triggers.forEach((trigger: any, idx: number) => {
        ScrollTrigger.create({
          trigger: trigger,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeData = processSteps[activeStep] || processSteps[0];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(56,189,248,0.03)" }}
      />

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <SectionLabel>How We Work</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-grotesk)",
            }}
          >
            Our <span className="gradient-text">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            A battle-tested methodology that delivers exceptional results —
            every single time.
          </motion.p>
        </div>

        {/* Mobile Layout (Vertical Stack of Cards - hidden on desktop) */}
        <div className="lg:hidden space-y-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="glass rounded-2xl p-6 border border-white/5 bg-[#0a1628]/40"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                  {IconMap[step.icon] || step.icon}
                </div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                  {step.duration}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg font-grotesk mb-1">
                {step.number}. {step.title}
              </h3>
              <p className="text-sky-300/60 text-[10px] font-semibold uppercase tracking-wider mb-4">
                {step.subtitle}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Layout (Sticky Split Screen - hidden on mobile) */}
        <div className="process-grid-container hidden lg:grid lg:grid-cols-12 lg:gap-16 relative">
          {/* Left Column: Sticky Detail Card */}
          <div className="process-sticky-col lg:col-span-6 pr-8 relative">
            <div className="sticky top-[140px] h-fit">
              <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass rounded-3xl p-10 border border-sky-500/10 relative overflow-hidden"
                style={{
                  background: "rgba(8, 18, 36, 0.5)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-sky-500/[0.03] blur-[60px] pointer-events-none" />

                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400">
                    {IconMap[activeData.icon] || activeData.icon}
                  </div>
                  <span className="text-7xl font-bold font-quantum text-sky-500/15 leading-none select-none">
                    {activeData.number}
                  </span>
                </div>

                <span className="text-xs font-bold text-sky-400 tracking-[0.2em] uppercase block mb-2">
                  {activeData.duration}
                </span>

                <h3 className="text-white font-bold text-3xl font-grotesk mb-2">
                  {activeData.title}
                </h3>

                <p className="text-sky-300/60 text-xs font-semibold uppercase tracking-wider mb-6">
                  {activeData.subtitle}
                </p>

                <p className="text-slate-400 text-base leading-relaxed">
                  {activeData.description}
                </p>

                {/* Micro detail decoration */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Active Phase
                    </span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Quantum Methodology
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Scroll Triggers */}
          <div className="lg:col-span-6 relative pl-8 border-l border-white/5">
            {/* Scroll indicator line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-sky-600 to-transparent origin-top"
              style={{ transform: "scaleY(1)" }}
            />

            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  className="process-trigger min-h-[45vh] flex flex-col justify-center py-16 first:pt-8 last:pb-32"
                >
                  <div
                    className={`transition-all duration-500 pl-8 relative ${
                      isActive ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    {/* Active dot indicator on the line */}
                    <div
                      className={`absolute left-0 -translate-x-[5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-sky-400 scale-125 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                          : "bg-slate-700 scale-100"
                      }`}
                    />

                    <span className="text-xs font-bold text-sky-400 tracking-wider uppercase block mb-2">
                      {step.duration}
                    </span>
                    <h3 className="text-white font-bold text-2xl font-grotesk mb-4">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
