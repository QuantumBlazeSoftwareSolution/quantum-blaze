"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/data";

export function Services() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Cursor glow follower */}
      {hoveredCard && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 400,
            height: 400,
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            transition: "left 0.1s ease, top 0.1s ease",
          }}
        />
      )}

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex justify-center"
          >
            <SectionLabel>What We Do</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-grotesk)",
            }}
          >
            Our <span className="gradient-text">Core Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            End-to-end digital product development with a relentless focus on
            quality, performance, and scale.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <GlassCard
                tilt
                className="p-8 h-full flex flex-col group relative overflow-hidden"
              >
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ background: service.accent }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 flex-shrink-0"
                  style={{
                    background: `${service.accent}15`,
                    border: `1px solid ${service.accent}30`,
                  }}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-grotesk)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6 flex-grow"
                  style={{ color: "var(--text-muted)" }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mt-auto">
                  {service.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: service.accent }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
