"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line by line reveal on scroll
      gsap.fromTo(
        ".reveal-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 40%",
          },
        }
      );

      // Stat counters
      document.querySelectorAll(".stat-counter").forEach((el) => {
        const target = el.getAttribute("data-target") || "0";
        const num = parseFloat(target.replace(/[^0-9.]/g, ""));
        const suffix = target.replace(/[0-9.]/g, "");
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: num,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    "We don't just write code.",
    "We architect digital ecosystems",
    "that redefine industries.",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background elements */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(14,165,233,0.04)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(56,189,248,0.03)" }}
      />

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text reveal */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <SectionLabel>Our Vision</SectionLabel>
            </motion.div>

            <div
              className="space-y-1 mb-8"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                fontFamily: "var(--font-grotesk)",
              }}
            >
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <span
                    className={`reveal-line block ${
                      i === 1 ? "gradient-text" : "text-white"
                    }`}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden">
              <p
                className="reveal-line text-base md:text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                We obsess over every architectural decision, pixel, and
                millisecond. Because your success is our reputation.
              </p>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center group hover:border-sky-400/30 transition-all duration-300"
                style={{
                  borderColor: "var(--glass-border)",
                }}
              >
                <div
                  className="stat-counter text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                  data-target={stat.value}
                  style={{ color: "var(--accent-blue)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core values strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", label: "Innovation-Driven" },
            { icon: "🔒", label: "Quality First" },
            { icon: "🤝", label: "Transparent" },
            { icon: "🚀", label: "Results-Focused" },
          ].map((val) => (
            <div
              key={val.label}
              className="flex items-center gap-3 glass rounded-xl px-5 py-4"
            >
              <span className="text-xl">{val.icon}</span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                {val.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
