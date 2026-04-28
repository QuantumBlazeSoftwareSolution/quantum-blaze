"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TeamCard } from "@/components/sections/Team";
import { fullTeam } from "@/lib/data";
import { useLenis } from "@/hooks/useLenis";

export default function TeamPage() {
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="relative min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      <Navbar />

      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Glow orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: "rgba(14,165,233,0.06)" }}
        />

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6"
            >
              <SectionLabel>Our People</SectionLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontFamily: "var(--font-grotesk)",
                lineHeight: 1.1,
              }}
            >
              Meet the <span className="gradient-text">Quantum Blaze</span> Team
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              We are a collective of engineers, designers, and innovators united
              by a single purpose: building software that sets new industry
              standards.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fullTeam.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
