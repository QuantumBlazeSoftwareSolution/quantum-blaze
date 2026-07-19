"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { techStack } from "@/lib/data";

// Clean individual hover Tech Badge
function TechBadge({ tech }: { tech: { name: string; category: string } }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-xl mx-3 flex-shrink-0 group border border-sky-500/10 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 cursor-default"
      style={{
        background: "rgba(10, 22, 40, 0.6)",
      }}
    >
      <span
        className="text-xs font-semibold tracking-wide text-sky-100/70 group-hover:text-sky-300 transition-colors duration-200"
      >
        {tech.name}
      </span>
      <span
        className="text-[10px] px-1.5 py-0.5 rounded text-sky-400 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(56, 189, 248, 0.08)" }}
      >
        {tech.category}
      </span>
    </div>
  );
}

export function TechStack() {
  const firstRow = techStack.slice(0, 10);
  const secondRow = techStack.slice(10);

  return (
    <section
      id="techstack"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Drifting ambient glows */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px] pointer-events-none opacity-40"
        style={{ background: "rgba(14, 165, 233, 0.04)" }}
      />
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 25, -25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[250px] rounded-full blur-[130px] pointer-events-none opacity-30"
        style={{ background: "rgba(56, 189, 248, 0.03)" }}
      />

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--bg-primary), transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--bg-primary), transparent)",
        }}
      />

      <div className="container-wide text-center mb-14">

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
          The Power Under <span className="text-sky-400">the Hood</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          We master the tools that define modern software — from frontend
          frameworks to cloud infrastructure.
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4 relative z-20">
        <Marquee direction="left" speed="slow">
          {firstRow.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
        </Marquee>

        <Marquee direction="right" speed="slow">
          {secondRow.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
        </Marquee>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container-wide mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-20"
      >
        {[
          { label: "Technologies", value: "20+" },
          { label: "Frameworks", value: "10+" },
          { label: "Cloud Platforms", value: "4+" },
          { label: "DB Systems", value: "6+" },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl p-5 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--accent-blue)" }}
            >
              {item.value}
            </div>
            <div
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
