"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fullTeam } from "@/lib/data";
import { useLenis } from "@/hooks/useLenis";
import { FaLinkedin, FaEnvelope } from "react-icons/fa6";

function MinimalTeamCard({ member, index }: { member: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-900/50">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Minimal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out p-8 flex flex-col justify-end">
          <p className="text-sm text-slate-300 leading-relaxed mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            {member.bio}
          </p>
          <div className="flex items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
            <a href={member.linkedin} className="text-sky-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href={`mailto:${member.email}`} className="text-sky-400 hover:text-white transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Info Below Image */}
      <div className="mt-6 space-y-1">
        <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400/80">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="relative min-h-screen"
      style={{ background: "#050B14" }}
    >
      <Navbar />

      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Subtle background element */}
        <div
          className="absolute top-0 left-0 w-full h-[800px] pointer-events-none opacity-20"
          style={{ 
            background: "radial-gradient(circle at 50% -20%, #0ea5e9 0%, transparent 70%)",
            filter: "blur(120px)"
          }}
        />

        <div className="container-wide relative z-10">
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <SectionLabel>Our Architecture</SectionLabel>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-white font-bold leading-[1.1]"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontFamily: "var(--font-grotesk)",
                }}
              >
                The Architects <br />
                Of <span className="gradient-text">Innovation.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl max-w-xl pb-2"
                style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
              >
                A collective of specialized engineers and designers united by a 
                rigorous engineering culture and a relentless pursuit of digital excellence.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {fullTeam.map((member, i) => (
              <MinimalTeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
