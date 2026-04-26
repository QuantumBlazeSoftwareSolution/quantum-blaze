"use client";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      style={{ perspective: "1000px" }}
    >
      {/* Card wrapper — flips on hover */}
      <div
        className="relative w-full transition-transform duration-700 cursor-default"
        style={{
          transformStyle: "preserve-3d",
          height: "300px",
          transform: "rotateY(0deg)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            "rotateY(180deg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg)";
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Subtle hover gradient */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(14,165,233,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Avatar */}
          <div className="relative mb-5 w-24 h-24">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #7dd3fc)",
                filter: "blur(10px)",
                opacity: 0.5,
              }}
            />
            <div
              className={`relative w-24 h-24 rounded-full overflow-hidden border-2 border-sky-400/30 z-10 bg-gradient-to-br ${member.gradient}`}
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {member.role}
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 glass rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(5, 11, 20, 0.97)",
            borderColor: "rgba(56,189,248,0.25)",
          }}
        >
          {/* Top row: small circular avatar + name/role */}
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400/40 flex-shrink-0 bg-gradient-to-br ${member.gradient}`}
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                {member.name}
              </p>
              <p
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: "var(--accent-blue)" }}
              >
                {member.role}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px my-4"
            style={{ background: "rgba(56,189,248,0.15)" }}
          />

          {/* Bio */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {member.bio}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-5">
            {[
              { label: "LinkedIn", href: member.linkedin, icon: FaLinkedin },
              { label: "GitHub", href: member.github, icon: FaGithub },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sky-400 hover:text-white hover:bg-sky-500/20 transition-all duration-200 border border-sky-500/20 hover:border-sky-400/50"
                title={s.label}
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
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
            Ready to bring your vision to life with our expertise?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            Connect with our team <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
