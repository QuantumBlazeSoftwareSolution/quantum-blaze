"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FaLinkedin, FaEnvelope } from "react-icons/fa6";
import BorderGlow from "@/components/BorderGlow";
import Image from "next/image";
import { getTeamGradient } from "@/lib/utils/team";
import { type TeamMember } from "@/lib/data";

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
      className="group relative flex-shrink-0 w-[80%] sm:w-[48%] md:w-[31%] lg:w-auto snap-start flex flex-col"
    >
      {/* Outer Card Frame */}
      <div className="relative aspect-[4/4] lg:aspect-[4/4.2] rounded-2xl overflow-hidden glass border border-white/5 bg-[#0a1628]/20 transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_20px_50px_rgba(56,189,248,0.12)]">
        {/* Member Portrait Image */}
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover lg:group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          /* Fallback gradient if no image */
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-60`}
          />
        )}

        {/* Ambient radial glow behind card on hover */}
        <div className="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)]" />

        {/* Bottom Permanent Info & Hover Content Overlay (Desktop only) */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/85 to-transparent pt-16 pb-4 px-4 flex flex-col justify-end min-h-[55%]">
          {/* Header Info */}
          <div className="transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
            <h3 className="text-white font-bold text-base tracking-tight mb-0.5 font-grotesk">
              {member.name}
            </h3>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-sky-400">
              {member.role}
            </p>
          </div>

          {/* Social Icons (Desktop only) */}
          <div className="flex gap-2.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-1">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-slate-800 bg-[#070f1a]/80 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all cursor-pointer"
                title="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="w-7 h-7 rounded-full border border-slate-800 bg-[#070f1a]/80 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all cursor-pointer"
                title="Email"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile static details block below the image */}
      <div className="lg:hidden mt-3 px-1 flex flex-col items-start">
        <h3 className="text-white font-bold text-sm tracking-tight font-grotesk">
          {member.name}
        </h3>
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-sky-400 mt-0.5">
          {member.role}
        </p>
        <div className="flex gap-2 mt-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full border border-slate-800 bg-[#070f1a]/80 flex items-center justify-center text-slate-400"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-7 h-7 rounded-full border border-slate-800 bg-[#070f1a]/80 flex items-center justify-center text-slate-400"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Team({ members }: { members: TeamMember[] }) {
  const visibleMembers = members.filter((m) => m.visibility !== false);
  // Sort members by orderNumber / priority asc
  const sortedMembers = [...visibleMembers].sort(
    (a, b) => a.orderNumber - b.orderNumber
  );

  // Find the CEO member (Vihanga Heshan)
  const ceoMember = sortedMembers.find(
    (m) =>
      m.role.toLowerCase().includes("ceo") ||
      m.name.toLowerCase().includes("vihanga")
  );

  // Show all 5 other members by priority order below the CEO
  const otherMembers = sortedMembers.filter((m) => m.id !== ceoMember?.id);

  if (!members.length) return null;

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
            Our <span className="text-sky-400">Team</span>
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

        {/* CEO Highlight Layout */}
        {ceoMember && (
          <div className="w-full mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="group relative rounded-[2rem] overflow-hidden glass border border-white/5 bg-[#0a1628]/10 backdrop-blur-md transition-all duration-500 hover:border-sky-500/20 hover:shadow-[0_20px_50px_rgba(56,189,248,0.08)]"
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* CEO Image - Left Side */}
                <div className="relative w-full md:w-[280px] shrink-0 aspect-[4/4.5] md:aspect-auto overflow-hidden">
                  {ceoMember.image ? (
                    <Image
                      src={ceoMember.image}
                      alt={ceoMember.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover object-top md:object-center group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getTeamGradient(ceoMember.gradient)} opacity-60`}
                    />
                  )}
                  {/* Subtle overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050b14]/40 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/40 to-transparent md:hidden" />
                </div>

                {/* CEO Details & Vision - Right Side */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative">
                  {/* Background gradient blur */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[100px] bg-sky-500/5 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-[2px] bg-sky-500 rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400">
                        Our Vision
                      </span>
                    </div>

                    <blockquote className="relative pt-2 pl-4 border-l border-sky-500/30">
                      <p className="text-base md:text-lg font-light text-slate-100 leading-relaxed font-grotesk italic">
                        &ldquo;We don&rsquo;t just write code; we architect the
                        future of digital innovation. Our mission is to empower
                        global brands by engineering high-performance, robust,
                        and beautifully designed tech ecosystems.&rdquo;
                      </p>
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 relative z-10 flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-lg tracking-tight mb-0.5 font-grotesk">
                        {ceoMember.name}
                      </h3>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-400">
                        {ceoMember.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pb-1">
                      {ceoMember.linkedin && (
                        <a
                          href={ceoMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-400 hover:text-white bg-sky-500/10 border border-sky-500/20 hover:border-sky-400/50 transition-colors"
                          title="LinkedIn"
                        >
                          <FaLinkedin size={14} />
                        </a>
                      )}
                      {ceoMember.email && (
                        <a
                          href={`mailto:${ceoMember.email}`}
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
            </motion.div>
          </div>
        )}

        {/* Leadership & Engineering Grid */}
        {otherMembers.length > 0 && (
          <div className="mb-8 w-full">
            <div className="flex lg:grid lg:grid-cols-5 overflow-x-auto overflow-y-hidden lg:overflow-x-visible lg:overflow-y-visible snap-x snap-mandatory lg:snap-none scrollbar-none pb-4 lg:pb-0 gap-6">
              {otherMembers.map((member, i) => (
                <TeamCard key={member.id} member={member} index={i + 1} />
              ))}
            </div>
          </div>
        )}

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
