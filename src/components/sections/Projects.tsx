"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { type Project } from "@/lib/data";

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );
  const isEven = index % 2 === 0;

  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];

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
            ? `radial-gradient(ellipse 60% 60% at 80% 50%, ${project.themeColor}08, transparent)`
            : `radial-gradient(ellipse 60% 60% at 20% 50%, ${project.themeColor}08, transparent)`,
        }}
      />

      <div className="container-wide">
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
            className={`w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}
          >
            {/* Number + label */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-5xl font-bold opacity-20"
                style={{
                  color: project.themeColor,
                  fontFamily: "var(--font-grotesk)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className="h-px flex-grow"
                style={{
                  background: `linear-gradient(90deg, ${project.themeColor}40, transparent)`,
                }}
              />
            </div>

            {/* Mobile-only Mockup Image (below number, above content) */}
            {project.imageUrl && (
              <div className="block lg:hidden w-full mx-auto mb-8 relative">
                <div className="relative w-full max-w-sm mx-auto">
                  <div
                    className="absolute inset-0 blur-3xl rounded-3xl scale-75 opacity-30 pointer-events-none"
                    style={{ background: project.themeColor }}
                  />
                  <div
                    className="relative rounded-2xl overflow-hidden glass"
                    style={{
                      border: `1px solid ${project.themeColor}30`,
                      boxShadow: `0 0 40px ${project.themeColor}15, 0 20px 50px rgba(0,0,0,0.5)`,
                      aspectRatio: project.mockupType === "mobile" ? "9/19" : "16/10",
                      width: project.mockupType === "mobile" ? "55%" : "100%",
                      margin: "0 auto",
                    }}
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>
            )}

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
              {metrics.map((metric: any) => (
                <span
                  key={String(metric)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{
                    background: `${project.themeColor}12`,
                    border: `1px solid ${project.themeColor}30`,
                    color: project.themeColor,
                  }}
                >
                  {String(metric)}
                </span>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech: any) => (
                <span
                  key={String(tech)}
                  className="glass px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(tech)}
                </span>
              ))}
            </div>

            {/* View Case Study Link */}
            <div className="mt-8">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:underline"
                style={{ color: project.themeColor }}
              >
                View Case Study <span className="inline-block transition-transform duration-300 hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Mockup side — real images */}
          <motion.div
            style={{ y }}
            className={`hidden lg:flex relative items-center justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 blur-3xl rounded-3xl scale-75 opacity-30 pointer-events-none"
                style={{ background: project.themeColor }}
              />

              {/* Image Container */}
              <div
                className="relative rounded-[2rem] overflow-hidden glass group transition-all duration-500 hover:border-[var(--glow-border-color)] hover:shadow-[0_0_80px_var(--glow-shadow-color)]"
                style={{
                  border: `1px solid ${project.themeColor}30`,
                  boxShadow: `0 0 60px ${project.themeColor}15, 0 30px 80px rgba(0,0,0,0.5)`,
                  aspectRatio:
                    project.mockupType === "mobile" ? "9/19" : "16/10",
                  width: project.mockupType === "mobile" ? "60%" : "100%",
                  margin: "0 auto",
                  ["--glow-border-color" as any]: `${project.themeColor}80`,
                  ["--glow-shadow-color" as any]: `${project.themeColor}25`,
                }}
              >
                {/* The actual Image */}
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                {/* Optional overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      {index < total - 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.1), transparent)",
          }}
        />
      )}
    </motion.div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Section header */}
      <div className="container-wide pt-20 pb-10 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontFamily: "var(--font-grotesk)",
          }}
        >
          Work That <span className="text-sky-400">Speaks</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          A selection of digital products we&apos;ve engineered for real
          businesses — each one solving a real problem at scale.
        </motion.p>
      </div>

      {/* Projects */}
      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>

      {/* View All Projects CTA */}
      <div className="container-wide pb-24 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/projects" passHref>
            <GlowButton
              variant="outline"
              size="lg"
              className="px-10 py-4 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer group"
            >
              View All Projects <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 ml-2">→</span>
            </GlowButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
