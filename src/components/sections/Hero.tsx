"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Image from "next/image";
import { Rocket, Shield, Users, TrendingUp, Code, ArrowDown, PhoneCall } from "lucide-react";
import { FaLinkedin, FaFacebook } from "react-icons/fa6";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Set up scroll tracking on the Hero section for the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create smooth vertical parallax translations for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]); 
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);  

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020813] p-4 md:p-6 lg:p-8"
    >
      {/* Outer White Frame Wrapper - Luxury Studio Canvas */}
      <div className="relative w-full max-w-7xl mx-auto rounded-[2.5rem] md:rounded-[3.5rem] bg-[#050C18] border-[12px] md:border-[16px] border-white shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between">
        
        {/* Top Header Row with Center Notch */}
        <header className="relative w-full z-30 px-6 md:px-12 py-6 flex items-center justify-between">
          {/* Left Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection("about")} className="hover:text-sky-400 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection("services")} className="hover:text-sky-400 transition-colors cursor-pointer">Services</button>
          </div>

          {/* Center Logo Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-white px-8 pb-4 pt-0 rounded-b-[2rem] shadow-md flex items-center justify-center gap-3 border-t-0 z-40">
            <Image
              src="/original-logo.png"
              alt="Quantum Blaze Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-bold tracking-widest font-quantum text-slate-900 uppercase">
              Quantum <span className="text-sky-600">Blaze</span>
            </span>
          </div>

          {/* Right Nav Links & Actions */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400 ml-auto">
            <button onClick={() => scrollToSection("projects")} className="hover:text-sky-400 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-sky-400 transition-colors cursor-pointer">Contact</button>
            <div className="flex items-center gap-2 text-slate-300 bg-sky-950/40 border border-sky-500/20 px-3.5 py-1.5 rounded-full text-[10px] tracking-wider font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
              +94 78 805 6838
            </div>
          </div>
          
          {/* Mobile Brand Name Fallback (Hidden on Desktop Notch) */}
          <div className="flex lg:hidden items-center gap-2.5">
            <Image
              src="/original-logo.png"
              alt="Quantum Blaze Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs font-bold tracking-widest font-quantum text-white uppercase">
              Quantum <span className="text-sky-400">Blaze</span>
            </span>
          </div>
        </header>

        {/* Hero Body Content Container */}
        <div className="relative flex-1 w-full px-6 md:px-12 py-8 flex flex-col justify-center">
          
          {/* Giant Background Logo Text Layer (Lies Behind the 3D Cube) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <div className="w-full flex justify-between items-center px-4 md:px-12 max-w-6xl">
              <h1 className="text-[12vw] font-black tracking-tighter text-white/[0.03] uppercase leading-none font-sans">
                Quan
              </h1>
              <h1 className="text-[12vw] font-black tracking-tighter text-white/[0.03] uppercase leading-none font-sans">
                tum
              </h1>
            </div>
          </div>

          {/* Radial glow directly behind the center cube */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/[0.03] blur-[100px] pointer-events-none z-0" />

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center z-10 relative">
            
            {/* Left Side: Tagline, Description & Action */}
            <div className="flex flex-col items-start text-left lg:col-span-4 xl:col-span-4 max-w-md">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/10 bg-sky-950/10 backdrop-blur-sm text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Think Beyond <span className="text-sky-400">Limitation</span>
              </div>

              {/* Tagline Heading */}
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4">
                We Build Scalable, High-Performance Software.
              </h2>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-8 max-w-xs font-light">
                We design and engineer bespoke digital solutions that turn bold ideas into market-leading realities.
              </p>

              {/* Primary Call to Action */}
              <GlowButton
                variant="solid"
                size="md"
                onClick={() => scrollToSection("services")}
                className="px-6 py-3.5 text-xs font-bold shadow-lg shadow-sky-500/10 cursor-pointer rounded-full"
              >
                Explore Services <span className="ml-1.5">→</span>
              </GlowButton>
            </div>

            {/* Center: Interactive 3D Cubes (Lies Over the Giant Background Text) */}
            <div className="lg:col-span-4 xl:col-span-4 h-[350px] md:h-[450px] w-full flex items-center justify-center relative my-8 lg:my-0">
              
              {/* Concentric radar circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[240px] h-[240px] rounded-full border border-sky-500/[0.04]" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-sky-500/[0.03]" />
                <div className="absolute w-[480px] h-[480px] rounded-full border border-sky-500/[0.015]" />
              </div>

              {/* The Massive 3D Cube */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] z-10 flex items-center justify-center"
              >
                <Image
                  src="/hero-section-image.png"
                  alt="Quantum Blaze 3D Glass Cubes"
                  width={420}
                  height={420}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(14,165,233,0.18)]"
                />
              </motion.div>
            </div>

            {/* Right Side: Features & Free Consultation Box */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right lg:col-span-4 xl:col-span-4 gap-8">
              
              {/* Feature Tags List */}
              <div className="space-y-4 w-full max-w-[240px] ml-auto">
                {/* Feature 1 */}
                <motion.div
                  style={{ y: y1 }}
                  className="flex items-center gap-3.5 bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-xl border border-white/[0.08] px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-sky-500/20 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/10 flex-shrink-0">
                    <TrendingUp className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-[11px] tracking-tight">SaaS Platforms</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-none">Real-time Analytics</p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  style={{ y: y2 }}
                  className="flex items-center gap-3.5 bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-xl border border-white/[0.08] px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-sky-500/20 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/10 flex-shrink-0">
                    <Shield className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-[11px] tracking-tight">Enterprise Scale</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-none">99.99% Uptime Guarantee</p>
                  </div>
                </motion.div>
              </div>

              {/* Consult Card at the Bottom Right */}
              <div className="bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-xl border border-white/[0.06] p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center gap-4 w-full max-w-[280px] ml-auto text-left relative overflow-hidden group">
                <div className="absolute inset-0 bg-sky-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120"
                    alt="Consultant"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-[11px] tracking-tight">Get a Free Consultation</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">
                    Fill the form & our specialists will contact you.
                  </p>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Request a Call <span className="translate-y-[-0.5px]">→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Row / Bottom Indicators inside frame */}
        <footer className="relative w-full z-30 px-6 md:px-12 py-6 flex items-center justify-between border-t border-white/5 bg-[#050C18]">
          {/* Social Icons */}
          <div className="flex items-center gap-3.5">
            <a
              href="https://www.linkedin.com/company/quantum-blaze-software-solution-pvt-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/18mwK8iVng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors"
            >
              <FaFacebook size={16} />
            </a>
          </div>

          {/* Centered Scroll Indicator Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-white w-14 h-8 rounded-t-[1rem] shadow-sm flex items-center justify-center cursor-pointer border-b-0 hover:bg-slate-50 transition-colors" onClick={() => scrollToSection("about")}>
            <ArrowDown className="w-4 h-4 text-slate-900 animate-bounce" />
          </div>

          {/* Brief stats/year indicator */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            © {new Date().getFullYear()} Quantum Blaze
          </div>
        </footer>

      </div>
    </section>
  );
}
