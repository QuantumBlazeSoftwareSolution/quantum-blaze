"use client";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import ShinyText from "@/components/ShinyText";
import BorderGlow from "@/components/BorderGlow";

const SERVICES = ["Cloud Architecture", "AI/ML Solutions", "SaaS Platforms", "FinTech", "HealthTech"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Subtle top-left radial gradient (Liveroom style) */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.15] pointer-events-none blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-32 pb-24">
        
        {/* Left Column: Content */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="font-bold leading-[1.1] tracking-tight mb-6"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 5rem)",
                fontFamily: "var(--font-grotesk)",
              }}
            >
              <ShinyText 
                text="Architecting" 
                disabled={false} 
                speed={5} 
                className="block text-sky-400" 
                shineColor="#ffffff"
                color="var(--accent-blue)"
              />
              <span className="block text-white mt-1">Next-Gen Software</span>
              <span className="block text-slate-400/80 text-[clamp(1.75rem,3vw,2.5rem)] mt-2 font-medium tracking-normal">
                For Forward-Thinking Brands
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300/90 leading-relaxed font-light mb-12 max-w-xl"
          >
            From immersive enterprise platforms to cutting-edge mobile applications, we transform visionary concepts into revolutionary digital products that define the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-6 mb-16"
          >
            <GlowButton
              size="lg"
              variant="solid"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 text-base rounded-full tracking-wide shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]"
            >
              Start a Project
            </GlowButton>
          </motion.div>

          {/* Services Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-semibold tracking-widest text-slate-500 mr-2 uppercase">Expertise:</span>
            {SERVICES.map((service, i) => (
              <div 
                key={service}
                className="px-4 py-2 rounded-full text-sm border border-slate-700/50 bg-slate-800/30 text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-500/30 hover:bg-sky-900/10 cursor-default"
              >
                {service}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Floating Cards Constellation */}
        <div className="relative h-[600px] hidden lg:block w-full pointer-events-none">
          {/* Main Center Card (Large Icon/Logo representation) */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 z-20 pointer-events-auto"
          >
            <div className="w-full h-full rounded-full bg-slate-800/40 backdrop-blur-xl border border-white/5 flex items-center justify-center shadow-2xl shadow-black/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <svg className="w-24 h-24 text-slate-300 opacity-90 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
          </motion.div>

          {/* SaaS Platform Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[25%] left-[5%] w-64 z-10 pointer-events-auto"
          >
            <BorderGlow
              glowColor="200 80 40"
              colors={['#0284c7', '#0ea5e9', '#38bdf8']}
              backgroundColor="#0a1220"
              className="p-5 rounded-2xl border border-white/5 shadow-xl"
              animated={true}
              glowIntensity={0.3}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">SaaS Platform</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Real-time Analytics</p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Enterprise Scale Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[15%] right-[0%] w-64 z-10 pointer-events-auto"
          >
            <BorderGlow
              glowColor="200 80 40"
              colors={['#0284c7', '#0ea5e9', '#38bdf8']}
              backgroundColor="#0a1220"
              className="p-5 rounded-2xl border border-white/5 shadow-xl"
              animated={true}
              glowIntensity={0.3}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Enterprise Scale</h3>
                  <p className="text-slate-400 text-xs mt-0.5">99.99% Uptime</p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Seamless API Card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[20%] right-[10%] w-64 z-30 pointer-events-auto"
          >
             <BorderGlow
              glowColor="200 80 40"
              colors={['#0284c7', '#0ea5e9', '#38bdf8']}
              backgroundColor="#0a1220"
              className="p-5 rounded-2xl border border-white/5 shadow-xl"
              animated={true}
              glowIntensity={0.3}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Seamless API</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Robust Architecture</p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Small Decorative Elements */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[30%] left-[20%] w-16 h-16 rounded-2xl bg-slate-800/40 backdrop-blur-md border border-white/5 flex items-center justify-center shadow-lg z-0"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
