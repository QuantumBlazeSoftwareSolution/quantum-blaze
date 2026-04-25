"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { team } from "@/lib/data";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Generate initials for avatar placeholder
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-default"
    >
      <div
        className="glass rounded-2xl p-8 text-center transition-all duration-400 relative overflow-hidden"
        style={{
          borderColor: hovered
            ? "rgba(56,189,248,0.35)"
            : "var(--glass-border)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.1)"
            : "none",
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Background gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, rgba(14,165,233,0.05) 0%, transparent 70%)`,
          }}
        />

        {/* Avatar */}
        <div className="relative mx-auto mb-6 w-24 h-24">
          {/* Glow ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              hovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
            style={{
              background: `linear-gradient(135deg, #0ea5e9, #7dd3fc)`,
              filter: "blur(8px)",
            }}
          />
          {/* Avatar container */}
          <div
            className={`relative w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white z-10 bg-gradient-to-br ${member.gradient} overflow-hidden border-2 border-white/10`}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              initials
            )}
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-white font-bold text-lg mb-1 group-hover:text-sky-100 transition-colors duration-200"
          style={{ fontFamily: "var(--font-grotesk)" }}
        >
          {member.name}
        </h3>

        {/* Role — always visible but glows on hover */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4 transition-colors duration-200"
          style={{
            color: hovered ? "var(--accent-blue)" : "var(--text-muted)",
          }}
        >
          {member.role}
        </p>

        {/* Bio — slides in on hover */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{
            maxHeight: hovered ? "100px" : "0",
            opacity: hovered ? 1 : 0,
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {member.bio}
          </p>
        </div>

        {/* Social links */}
        <div
          className={`flex items-center justify-center gap-3 mt-4 transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { label: "LinkedIn", href: member.linkedin, icon: FaLinkedin },
            { label: "GitHub", href: member.github, icon: FaGithub },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-xs text-sky-400 hover:bg-sky-400/10 transition-colors"
              title={s.label}
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(14,165,233,0.04)" }}
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
            <SectionLabel>The Team</SectionLabel>
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
            The Minds <span className="gradient-text">Behind the Tech</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            A small, elite team of engineers, designers, and strategists who are
            obsessed with building exceptional digital products.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Join the team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            We&apos;re always looking for exceptional talent.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            View open positions <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
