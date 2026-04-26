"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries } from "@/lib/data";
import { HeartPulse, GraduationCap, Wallet, ShoppingCart, Truck } from "lucide-react";

const IconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Wallet: <Wallet className="w-8 h-8" />,
  ShoppingCart: <ShoppingCart className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
};

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, var(--accent-blue-dim), transparent 70%)" }}
      />

      <div className="container-wide relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <SectionLabel>Our Expertise</SectionLabel>
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
            Industries We <span className="gradient-text">Transform</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            We don't just build software; we engineer specialized solutions that solve complex challenges across diverse sectors.
          </motion.p>
        </div>

        {/* Clean, Minimalist Grid */}
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((ind, i) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative glass rounded-2xl p-8 flex flex-col h-full hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
              style={{
                background: "rgba(10, 18, 32, 0.5)",
                border: "1px solid rgba(56, 189, 248, 0.08)",
                borderTop: `2px solid ${ind.color}80`,
              }}
            >
              {/* Watermark Icon */}
              <div 
                className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none scale-[2.5] rotate-12"
                style={{ color: ind.color }}
              >
                {IconMap[ind.icon]}
              </div>

              {/* Subtle background glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-2xl pointer-events-none"
                style={{ background: ind.color }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: `${ind.color}10`,
                      color: ind.color,
                      border: `1px solid ${ind.color}20`
                    }}
                  >
                    {IconMap[ind.icon]}
                  </div>
                  <h3 
                    className="text-xl font-bold text-white tracking-wide leading-tight"
                    style={{ fontFamily: "var(--font-grotesk)" }}
                  >
                    {ind.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="text-sm leading-relaxed mb-10 flex-grow"
                  style={{ color: "var(--text-muted)", opacity: 0.8 }}
                >
                  {ind.description}
                </p>

                {/* Metric Footer */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span 
                        className="text-xs uppercase tracking-[0.2em] font-bold mb-1"
                        style={{ color: "var(--text-muted)", fontSize: '10px' }}
                      >
                        {ind.metricLabel}
                      </span>
                      <span 
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: ind.color, fontFamily: "var(--font-grotesk)" }}
                      >
                        {ind.metric}
                      </span>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                    >
                      <span className="text-white text-xs">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
