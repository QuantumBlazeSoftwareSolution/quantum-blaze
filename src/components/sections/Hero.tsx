"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Image from "next/image";
import { Rocket, Shield, Users, TrendingUp, Code, ArrowDown, PhoneCall, ChevronDown } from "lucide-react";
import { FaLinkedin, FaFacebook } from "react-icons/fa6";
import { Logo3D } from "@/components/ui/Logo3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const notchTopRef = useRef<HTMLDivElement>(null);
  const notchBottomRef = useRef<HTMLDivElement>(null);
  const headerLinksRef = useRef<HTMLDivElement>(null);
  const footerIconsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const container = containerRef.current;
    const card = cardRef.current;

    // Only apply scroll-driven zoom/pin animation on desktop viewports (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%", // Pins the section for 120% of the viewport height of scroll
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate scale, border-radius, border-width of the inner frame
      tl.to(
        card,
        {
          scale: 1.0,
          borderRadius: "0px",
          borderWidth: "0px",
          duration: 1,
          ease: "none",
        },
        0
      );

      // Animate outer padding of the container wrapper
      if (card.parentElement) {
        tl.to(
          card.parentElement,
          {
            padding: "0px",
            duration: 1,
            ease: "none",
          },
          0
        );
      }

      // Slide out and fade the top notch
      if (notchTopRef.current) {
        tl.to(
          notchTopRef.current,
          {
            y: -120,
            opacity: 0,
            duration: 0.95,
            ease: "none",
          },
          0
        );
        tl.set(notchTopRef.current, { visibility: "hidden" }, 0.95);
      }

      // Slide out and fade the bottom scroll indicator notch
      if (notchBottomRef.current) {
        tl.to(
          notchBottomRef.current,
          {
            y: 120,
            opacity: 0,
            duration: 0.95,
            ease: "none",
          },
          0
        );
        tl.set(notchBottomRef.current, { visibility: "hidden" }, 0.95);
      }

      // Fade out Left & Right header elements
      if (headerLinksRef.current) {
        tl.to(
          headerLinksRef.current,
          {
            opacity: 0,
            duration: 0.95,
            ease: "none",
          },
          0
        );
        tl.set(headerLinksRef.current, { visibility: "hidden" }, 0.95);
      }

      // Fade out footer elements
      if (footerIconsRef.current) {
        tl.to(
          footerIconsRef.current,
          {
            opacity: 0,
            duration: 0.95,
            ease: "none",
          },
          0
        );
        tl.set(footerIconsRef.current, { visibility: "hidden" }, 0.95);
      }

      if (copyrightRef.current) {
        tl.to(
          copyrightRef.current,
          {
            opacity: 0,
            duration: 0.95,
            ease: "none",
          },
          0
        );
        tl.set(copyrightRef.current, { visibility: "hidden" }, 0.95);
      }

      // Synchronized parallax movements for floating cards & center image
      tl.to(
        ".floating-card-1",
        {
          y: -120,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        ".floating-card-2",
        {
          y: 130,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        ".floating-card-3",
        {
          y: -85,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        ".hero-center-image",
        {
          scale: 1.08,
          duration: 1,
          ease: "none",
        },
        0
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

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
      className="relative w-full min-h-screen lg:h-screen bg-[#020813] overflow-y-auto lg:overflow-hidden"
    >
      {/* Container wrapper for padding animation */}
      <div 
        className="w-full min-h-screen lg:h-full flex items-center justify-center overflow-hidden z-20 p-0 lg:p-8"
      >
        
        {/* Animated App Shell Frame */}
        <div
          ref={cardRef}
          className="relative w-full min-h-screen lg:h-full bg-[#050C18] border-solid border-0 lg:border-[16px] border-[#0b192e] rounded-none lg:rounded-[40px] scale-100 lg:scale-[0.93] flex flex-col justify-between overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)]"
        >
          
          {/* Center Logo Notch (Slides Up on Scroll) */}
          <div 
            ref={notchTopRef}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -top-4 bg-[#0b192e] px-8 pb-4 pt-5 rounded-b-[2rem] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 border-t-0 z-40"
          >
            <Image
              src="/original-logo.png"
              alt="Quantum Blaze Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-black tracking-tight font-inter text-white uppercase">
              Quantum <span className="text-sky-400">Blaze</span>
            </span>
          </div>

          {/* Top Header Row with Center Notch */}
          <header className="relative w-full z-30 px-6 md:px-12 py-6 flex items-center justify-between">
            {/* Left/Right Header Links (Fade on Scroll) */}
            <div 
              ref={headerLinksRef}
              className="w-full flex items-center justify-between"
            >
              {/* Left Nav Links */}
              <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <button onClick={() => scrollToSection("about")} className="hover:text-sky-400 transition-colors cursor-pointer">About</button>
                <button onClick={() => scrollToSection("services")} className="hover:text-sky-400 transition-colors cursor-pointer">Services</button>
                
                {/* Resources Hover Dropdown */}
                <div className="relative group flex items-center h-full py-2">
                  <button className="hover:text-sky-400 transition-colors cursor-pointer flex items-center gap-1">
                    Resources <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-[80%] left-0 mt-1 w-32 bg-slate-950/95 border border-slate-900 rounded-xl py-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <a href="/blog" className="block px-4 py-2 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors lowercase tracking-wider text-[11px] font-semibold">
                      Blog
                    </a>
                    <button onClick={() => scrollToSection("faq")} className="w-full text-left block px-4 py-2 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors lowercase tracking-wider text-[11px] font-semibold cursor-pointer">
                      FAQ
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Nav Links & Actions */}
              <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400 ml-auto">
                <button onClick={() => scrollToSection("projects")} className="hover:text-sky-400 transition-colors cursor-pointer">Projects</button>
                <button onClick={() => scrollToSection("contact")} className="hover:text-sky-400 transition-colors cursor-pointer">Contact</button>
                <a href="tel:+94788056838" className="flex items-center gap-2 text-slate-300 bg-sky-950/40 hover:bg-sky-950/60 border border-sky-500/20 hover:border-sky-500/40 px-3.5 py-1.5 rounded-full text-[10px] tracking-wider font-bold transition-all hover:text-white cursor-pointer">
                  <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                  +94 78 805 6838
                </a>
              </div>
              
              {/* Mobile Brand Name Fallback */}
              <div className="flex lg:hidden items-center gap-2.5">
                <Image
                  src="/original-logo.png"
                  alt="Quantum Blaze Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="text-xs font-black tracking-tight font-inter text-white uppercase">
                  Quantum <span className="text-sky-400">Blaze</span>
                </span>
              </div>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer z-50 ml-auto"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-sky-400 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-sky-400 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-sky-400 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 top-[70px] mx-6 z-40 bg-[#050C18]/95 backdrop-blur-xl border border-sky-500/10 p-6 flex flex-col gap-4 shadow-2xl rounded-2xl lg:hidden"
                >
                  <button
                    onClick={() => { scrollToSection("about"); setMobileOpen(false); }}
                    className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    About
                  </button>
                  <button
                    onClick={() => { scrollToSection("services"); setMobileOpen(false); }}
                    className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                  <a
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors block"
                  >
                    Blog
                  </a>
                  <button
                    onClick={() => { scrollToSection("faq"); setMobileOpen(false); }}
                    className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => { scrollToSection("projects"); setMobileOpen(false); }}
                    className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    Projects
                  </button>
                  {process.env.NEXT_PUBLIC_TEAM_SECTION === "true" && (
                    <button
                      onClick={() => { scrollToSection("team"); setMobileOpen(false); }}
                      className="text-left py-2 border-b border-sky-500/5 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                    >
                      Team
                    </button>
                  )}
                  <button
                    onClick={() => { scrollToSection("contact"); setMobileOpen(false); }}
                    className="text-left py-2 text-sm font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                  <a href="tel:+94788056838" className="flex items-center justify-center gap-2 text-slate-300 bg-sky-950/40 border border-sky-500/20 py-2.5 rounded-xl text-xs font-bold transition-all hover:text-white mt-2">
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                    +94 78 805 6838
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* Hero Body Content Container */}
          <div className="relative flex-1 w-full px-6 md:px-12 py-8 lg:py-2 flex flex-col justify-center">
            
            {/* Giant Background Logo Text Layer */}
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
              <div className="flex flex-col items-start text-left lg:col-span-4 xl:col-span-4 max-w-md order-2 lg:order-1 mt-4 lg:mt-0">
                
                {/* Tagline Text */}
                <div className="text-[12px] md:text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">
                  Think Beyond <span className="text-sky-400">Limitation</span>
                </div>

                {/* Tagline Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-white leading-[1.12] mb-5">
                  We Build Scalable, High-Performance Software.
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-400/90 leading-relaxed mb-9 max-w-sm font-light">
                  We design and engineer bespoke digital solutions that turn bold ideas into market-leading realities.
                </p>

                {/* Primary Call to Action */}
                <div className="flex flex-wrap items-center gap-5">
                  <GlowButton
                    variant="solid"
                    size="lg"
                    onClick={() => scrollToSection("services")}
                    className="px-8 py-4 text-xs font-bold cursor-pointer rounded-full"
                  >
                    Explore Services <span className="ml-1.5">→</span>
                  </GlowButton>
                  <a
                    href="/blog"
                    className="text-xs font-bold tracking-wider text-slate-400 hover:text-white uppercase transition-colors px-2 py-1.5 cursor-pointer"
                  >
                    Read Our Blog
                  </a>
                </div>
              </div>

              {/* Center: Interactive 3D Cubes */}
              <div className="lg:col-span-4 xl:col-span-4 h-[260px] sm:h-[340px] md:h-[460px] w-full flex items-center justify-center relative my-4 lg:my-0 order-1 lg:order-2">
                
                {/* Concentric radar circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-sky-500/[0.04]" />
                  <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-sky-500/[0.03]" />
                  <div className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full border border-sky-500/[0.015]" />
                </div>

                {/* The Massive 3D Cube */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px] z-10 flex items-center justify-center"
                >
                  <div className="hero-center-image w-full h-full flex items-center justify-center">
                    <Logo3D color="#0ea5e9" height="100%" interactive={true} />
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Features & Free Consultation Box */}
              <div className="hidden lg:flex flex-col items-start lg:items-end text-left lg:text-right lg:col-span-4 xl:col-span-4 gap-8 lg:order-3">
                
                {/* Feature Tags List */}
                <div className="space-y-4 w-full max-w-[240px] ml-auto">
                  {/* Feature 1 */}
                  <div
                    className="floating-card-1 flex items-center gap-3.5 bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-xl border border-white/[0.08] px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-sky-500/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/10 flex-shrink-0">
                      <TrendingUp className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-[11px] tracking-tight">SaaS Platforms</h3>
                      <p className="text-[9px] text-slate-400 mt-0.5 leading-none">Real-time Analytics</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div
                    className="floating-card-2 flex items-center gap-3.5 bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-xl border border-white/[0.08] px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-sky-500/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/10 flex-shrink-0">
                      <Shield className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-[11px] tracking-tight">Enterprise Scale</h3>
                      <p className="text-[9px] text-slate-400 mt-0.5 leading-none">99.99% Uptime Guarantee</p>
                    </div>
                  </div>
                </div>

                {/* Consult Card at the Bottom Right */}
                <a
                  href="tel:+94788056838"
                  className="floating-card-3 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-xl border border-white/[0.06] p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center gap-4 w-full max-w-[280px] ml-auto text-left relative overflow-hidden group hover:border-sky-500/30 transition-all duration-300 cursor-pointer block"
                >
                  <div className="absolute inset-0 bg-sky-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Call Icon Container */}
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400 flex-shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-[11px] tracking-tight">Get a Free Consultation</h4>
                    <p className="text-[9px] text-slate-400 mt-1 leading-relaxed font-light">
                      Call us directly to speak with our specialists.
                    </p>
                    <div
                      className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-sky-400 group-hover:text-sky-300 transition-colors uppercase tracking-wider"
                    >
                      Call Now <span className="translate-y-[-0.5px]">→</span>
                    </div>
                  </div>
                </a>

              </div>

            </div>
          </div>

          {/* Footer Row / Bottom Indicators inside frame */}
          <footer className="relative w-full z-30 px-6 md:px-12 py-6 flex items-center justify-between border-t border-white/5 bg-[#050C18]">
            {/* Social Icons */}
            <div 
              ref={footerIconsRef}
              className="flex items-center gap-3.5"
            >
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

            {/* Brief stats/year indicator */}
            <div 
              ref={copyrightRef}
              className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
            >
              © {new Date().getFullYear()} Quantum Blaze
            </div>
          </footer>

          {/* Centered Scroll Indicator Notch (Slides Down on Scroll) */}
          <div 
            ref={notchBottomRef}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-4 bg-[#0b192e] w-14 pt-2 pb-5 rounded-t-[1rem] shadow-sm flex items-center justify-center cursor-pointer border-b-0 hover:bg-[#132742] transition-colors z-40"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="w-4 h-4 text-sky-400 animate-bounce" />
          </div>

        </div>
      </div>
    </section>
  );
}
