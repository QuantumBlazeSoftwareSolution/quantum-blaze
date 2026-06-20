"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FaLinkedin, FaEnvelope } from "react-icons/fa6";
import BorderGlow from "@/components/BorderGlow";
import Image from "next/image";
import { getTeamGradient } from "@/lib/utils/team";
import type { TeamMember } from "@/lib/db/schemas/team";

export function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const gradientClass = getTeamGradient(member.gradient);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9],
      }}
      className="group relative"
    >
      {/* Outer Card Frame */}
      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden glass border border-white/5 bg-[#0a1628]/20 transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_20px_50px_rgba(56,189,248,0.12)]">
        {/* Member Portrait Image */}
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover grayscale brightness-[0.85] contrast-[1.05] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          /* Fallback gradient if no image */
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-60`} />
        )}

        {/* Ambient radial glow behind card on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)]" />

        {/* Bottom Permanent Info & Hover Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/85 to-transparent pt-24 pb-6 px-6 flex flex-col justify-end min-h-[55%]">
          {/* Header Info */}
          <div className="transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
            <h3 className="text-white font-bold text-xl tracking-tight mb-1 font-grotesk">
              {member.name}
            </h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-400">
              {member.role}
            </p>
          </div>

          {/* Collapsible Info Drawer (slides up on hover) */}
          <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <div className="overflow-hidden">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <p className="text-xs text-slate-400 leading-relaxed mb-4 mt-3">
                  {member.bio}
                </p>
                <div className="flex items-center gap-3 pb-1">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-400 hover:text-white bg-sky-500/10 border border-sky-500/20 hover:border-sky-400/50 transition-colors"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-400 hover:text-white bg-sky-500/10 border border-sky-500/20 hover:border-sky-400/50 transition-colors"
                      title="Email"
                    >
                      <FaEnvelope size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Team({ members }: { members: TeamMember[] }) {
  // Only show the first 4 members on the landing page for a clean grid
  const displayMembers = members.slice(0, 4);
  
  if (!displayMembers.length) return null;

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
          {displayMembers.map((member, i) => (
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
            Ready to bring your vision to life with our expertise?
          </p>
          <a
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            Connect with our team <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
