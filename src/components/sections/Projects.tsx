"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="relative min-h-[70vh] flex items-center py-20 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isEven
            ? `radial-gradient(ellipse 60% 60% at 80% 50%, ${project.color}08, transparent)`
            : `radial-gradient(ellipse 60% 60% at 20% 50%, ${project.color}08, transparent)`,
        }}
      />

      <div className="container-wide w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={isEven ? "lg:order-1" : "lg:order-2"}
          >
            {/* Number + label */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-5xl font-bold opacity-20"
                style={{ color: project.color, fontFamily: "var(--font-grotesk)" }}
              >
                {project.number}
              </span>
              <div
                className="h-px flex-grow"
                style={{ background: `linear-gradient(90deg, ${project.color}40, transparent)` }}
              />
            </div>

            <div className="mb-3">
              <SectionLabel>{project.subtitle}</SectionLabel>
            </div>

            <h3
              className="text-white font-bold mb-4 leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                fontFamily: "var(--font-grotesk)",
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              {project.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.metrics.map((metric) => (
                <span
                  key={metric}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {metric}
                </span>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="glass px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mockup side — floating 3D-ish device */}
          <motion.div
            style={{ y }}
            className={`relative flex items-center justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 blur-3xl rounded-3xl scale-75 opacity-30"
                style={{ background: project.color }}
              />

              {/* Device frame */}
              {project.mockupType === "mobile" ? (
                /* Phone mockup */
                <div
                  className="relative w-52 h-96 rounded-[2.5rem] mx-auto glass"
                  style={{
                    border: `2px solid ${project.color}30`,
                    boxShadow: `0 0 60px ${project.color}20, 0 30px 80px rgba(0,0,0,0.5)`,
                    transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)",
                  }}
                >
                  {/* Screen */}
                  <div
                    className="absolute inset-2 rounded-[2rem] overflow-hidden flex items-center justify-center"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    <div className="text-center px-4">
                      <div
                        className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl"
                        style={{ background: `${project.color}20` }}
                      >
                        📱
                      </div>
                      <div className="w-full h-2 rounded mb-2" style={{ background: `${project.color}30` }} />
                      <div className="w-3/4 h-2 rounded mb-2" style={{ background: `${project.color}20` }} />
                      <div className="w-5/6 h-2 rounded" style={{ background: `${project.color}15` }} />
                    </div>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black/60" />
                </div>
              ) : (
                /* Desktop/laptop mockup */
                <div
                  className="relative w-80 h-52 rounded-xl mx-auto glass"
                  style={{
                    border: `2px solid ${project.color}30`,
                    boxShadow: `0 0 60px ${project.color}20, 0 30px 80px rgba(0,0,0,0.5)`,
                    transform: "perspective(1200px) rotateY(-8deg) rotateX(6deg)",
                  }}
                >
                  {/* Screen content */}
                  <div
                    className="absolute inset-2 rounded-lg overflow-hidden"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    {/* Window chrome */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div
                          key={c}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    {/* Content lines */}
                    <div className="p-4 space-y-2">
                      {[1, 0.7, 0.85, 0.6, 0.75].map((w, i) => (
                        <div
                          key={i}
                          className="h-2 rounded"
                          style={{
                            width: `${w * 100}%`,
                            background: `${project.color}${i === 0 ? "40" : "20"}`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stand (for desktop) */}
              {project.mockupType === "desktop" && (
                <div
                  className="w-16 h-6 rounded-b-xl mx-auto"
                  style={{
                    background: `linear-gradient(to bottom, ${project.color}20, transparent)`,
                    border: `1px solid ${project.color}20`,
                    borderTop: "none",
                    width: "40px",
                    marginTop: "-1px",
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      {index < projects.length - 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.1), transparent)" }}
        />
      )}
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Section header */}
      <div className="container-wide pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <SectionLabel>Case Studies</SectionLabel>
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
          Work That <span className="gradient-text">Speaks</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          A selection of digital products we&apos;ve engineered for real businesses — each one solving a real problem at scale.
        </motion.p>
      </div>

      {/* Projects */}
      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
