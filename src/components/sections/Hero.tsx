"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GlowButton } from "@/components/ui/GlowButton";
import gsap from "gsap";

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance
      gsap.fromTo(
        ".hero-word",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const words = "Empowering Digital Futures".split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(2,12,27,0.9) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-wide text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
            color: "var(--accent-blue)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"
            style={{ boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
          />
          Premium Software Agency · Est. 2019
        </motion.div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: "clamp(3rem, 9vw, 8rem)",
            fontFamily: "var(--font-grotesk)",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.2em]"
            >
              <span
                className={`hero-word inline-block ${
                  i === 1 ? "gradient-text" : "text-white"
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          We architect and engineer{" "}
          <span className="text-sky-300 font-medium">scalable, high-end digital products</span>{" "}
          — from enterprise SaaS platforms to pixel-perfect mobile applications.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton
            size="lg"
            variant="solid"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start a Project
            <span>→</span>
          </GlowButton>
          <GlowButton
            size="lg"
            variant="outline"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Our Work
          </GlowButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { num: "50+", label: "Projects" },
            { num: "40+", label: "Clients" },
            { num: "5+", label: "Years" },
            { num: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--accent-blue)" }}
              >
                {stat.num}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(56,189,248,0.3)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--accent-blue)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
