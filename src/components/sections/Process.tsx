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
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
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
            A battle-tested methodology that delivers exceptional results —
            every single time.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-px top-6 bottom-6"
            style={{
              width: "2px",
              background:
                "linear-gradient(to bottom, #38bdf8cc, #0ea5e9aa, #38bdf833)",
              transformOrigin: "top",
              transform: "scaleY(0)",
            }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`process-step relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
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
                        background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
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
