"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical connecting line
      if (lineRef.current) {
        const totalLength = 800;
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: totalLength },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // Animate step items
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(56,189,248,0.03)" }}
      />

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
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
            A battle-tested methodology that delivers exceptional results — every
            single time.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated SVG line */}
          <div className="absolute left-[40px] md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-px overflow-hidden hidden md:block">
            <svg
              width="2"
              height="100%"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="800"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset="800"
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`process-step relative flex items-start gap-6 md:gap-0 ${
                    isEven
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step content */}
                  <div
                    className={`w-full md:w-[calc(50%-40px)] ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="glass rounded-2xl p-6 group hover:border-sky-400/30 transition-all duration-300">
                      {/* Duration */}
                      <div
                        className="text-xs font-semibold tracking-widest uppercase mb-3"
                        style={{ color: "var(--accent-blue)" }}
                      >
                        {step.duration}
                      </div>

                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <h3
                            className="text-white font-bold text-lg"
                            style={{ fontFamily: "var(--font-grotesk)" }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-xs font-medium"
                            style={{ color: "var(--accent-blue)" }}
                          >
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {step.description}
                      </p>

                      {/* Bottom glow line */}
                      <div
                        className="h-0.5 w-0 group-hover:w-full mt-4 transition-all duration-500 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--accent-blue), transparent)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-[60px] items-center justify-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, #0ea5e9, #0369a1)",
                        boxShadow:
                          "0 0 20px rgba(14,165,233,0.5), 0 0 40px rgba(14,165,233,0.2)",
                        color: "white",
                        fontFamily: "var(--font-grotesk)",
                      }}
                    >
                      {step.number}
                    </div>
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
