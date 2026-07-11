"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats } from "@/lib/data";
import { Zap, ShieldCheck, Eye, Target } from "lucide-react";

// 3D Tilt Card wrapper with cursor glow updates
function TiltCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className: string; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    
    // Tilt calculations (max 5 degrees)
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const rotateX = -(deltaY / (height / 2)) * 5;
    const rotateY = (deltaX / (width / 2)) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--mouse-x", `-999px`);
    card.style.setProperty("--mouse-y", `-999px`);
  };
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-all duration-300 ease-out`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line by line reveal on scroll
      gsap.fromTo(
        ".reveal-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 40%",
          },
        }
      );

      // Stat counters
      document.querySelectorAll(".stat-counter").forEach((el) => {
        const target = el.getAttribute("data-target") || "0";
        const num = parseFloat(target.replace(/[^0-9.]/g, ""));
        const suffix = target.replace(/[0-9.]/g, "");
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: num,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val) + suffix;
          },
        });
      });
    }, sectionRef);

    // Call ScrollTrigger refresh after a short delay to ensure layout sizes are fully loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Precision background glows */}
      <div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-50"
        style={{ background: "rgba(14,165,233,0.05)" }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-40"
        style={{ background: "rgba(56,189,248,0.03)" }}
      />

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">
          {/* Left: Narrative Side & Vision/Mission */}
          <div className="w-full lg:w-[50%] flex flex-col gap-8" ref={textRef}>
            <div>
              <div
                className="mb-8"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  fontFamily: "var(--font-grotesk)",
                }}
              >
                <div className="overflow-hidden pb-2">
                  <span className="reveal-line block text-white">
                    About <span className="text-sky-400">Us</span>
                  </span>
                </div>
              </div>

              <div className="overflow-hidden border-l border-slate-800/60 pl-6 ml-2 mb-8">
                <p className="reveal-line text-lg leading-relaxed max-w-xl text-slate-400 font-light">
                  We believe that exceptional software isn&apos;t just about lines of
                  code; it&apos;s about the architecture of innovation. Our team
                  deep-dives into every technical detail, from system scalability
                  to micro-interactions, ensuring your digital ecosystem is
                  robust, performant, and future-proof.
                </p>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-5 w-full">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <TiltCard className="relative p-6 md:p-8 min-h-[160px] rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-sm group overflow-hidden flex flex-col justify-center">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.08), transparent)`,
                    }}
                  />
                  <div 
                    className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(120px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.25), transparent)`,
                      zIndex: 0,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="mb-2">
                      <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-400">Our Vision</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                      To be the premier architect of digital innovation, creating software ecosystems that empower businesses to scale globally and lead their industries.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1"
              >
                <TiltCard className="relative p-6 md:p-8 min-h-[160px] rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-sm group overflow-hidden flex flex-col justify-center">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.08), transparent)`,
                    }}
                  />
                  <div 
                    className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(120px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.25), transparent)`,
                      zIndex: 0,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="mb-2">
                      <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-400">Our Mission</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                      To engineer high-performance, robust, and beautifully designed digital solutions through rigorous technical excellence, transparent collaboration, and a results-focused execution.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>

          {/* Right: Bento Stats (Always Visible, static column) */}
          <div className="w-full lg:w-[42%] lg:ml-auto flex flex-col justify-center">
            <div className="about-stats-layer w-full grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Large Feature Stat */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2"
              >
                <TiltCard className="relative p-4 md:p-5 rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-sm group overflow-hidden h-full">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.08), transparent)`,
                    }}
                  />
                  <div 
                    className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(150px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.25), transparent)`,
                      zIndex: 0,
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="stat-counter text-3xl md:text-4xl font-bold mb-1 tracking-tighter"
                      data-target={stats[0].value}
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stats[0].value}
                    </div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-400">
                      {stats[0].label}
                    </div>
                  </div>

                  {/* Micro-detail line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50 z-10" />
                </TiltCard>
              </motion.div>

              {/* Smaller Stats */}
              {stats.slice(1).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                  className={`${i === 2 ? "md:col-span-2" : ""}`}
                >
                  <TiltCard className="relative p-4 rounded-2xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-sm group hover:bg-slate-900/30 transition-colors duration-500 h-full overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(250px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.08), transparent)`,
                      }}
                    />
                    <div 
                      className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(120px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.25), transparent)`,
                        zIndex: 0,
                      }}
                    />
                    <div className="relative z-10">
                      <div
                        className="stat-counter text-2xl md:text-3xl font-bold mb-0.5 tracking-tight"
                        data-target={stat.value}
                        style={{ color: "var(--text-primary)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-500 group-hover:text-sky-400/80 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Refined Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 pt-10 border-t border-slate-800/50"
        >
          <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
            {[
              {
                icon: <Zap className="w-4 h-4 text-sky-400" />,
                label: "Innovation-Driven",
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-sky-400" />,
                label: "Quality First",
              },
              {
                icon: <Eye className="w-4 h-4 text-sky-400" />,
                label: "Transparent",
              },
              {
                icon: <Target className="w-4 h-4 text-sky-400" />,
                label: "Results-Focused",
              },
            ].map((val) => (
              <div key={val.label} className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center group-hover:border-sky-500/50 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300">
                  {val.icon}
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                  {val.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
