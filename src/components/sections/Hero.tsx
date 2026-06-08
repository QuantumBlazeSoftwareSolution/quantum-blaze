"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Image from "next/image";
import { Rocket, Shield, Users, TrendingUp, Code, ArrowDown, PhoneCall } from "lucide-react";
import { FaLinkedin, FaFacebook } from "react-icons/fa6";
import { Logo3D } from "@/components/ui/Logo3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
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
      className="relative w-full h-screen bg-[#020813] overflow-hidden"
    >
      {/* Container wrapper for padding animation */}
      <div 
        className="w-full h-full flex items-center justify-center overflow-hidden z-20 p-0 lg:p-8"
      >
        
        {/* Animated App Shell Frame */}
        <div
          ref={cardRef}
          className="relative w-full h-full bg-[#050C18] border-solid border-0 lg:border-[16px] border-[#e0f2fe] rounded-none lg:rounded-[40px] scale-100 lg:scale-[0.93] flex flex-col justify-between overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)]"
        >
          
          {/* Center Logo Notch (Slides Up on Scroll) */}
          <div 
            ref={notchTopRef}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -top-4 bg-[#e0f2fe] px-8 pb-4 pt-5 rounded-b-[2rem] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 border-t-0 z-40"
          >
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
              
              {/* Mobile Brand Name Fallback */}
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
            </div>
          </header>

          {/* Hero Body Content Container */}
          <div className="relative flex-1 w-full px-6 md:px-12 py-2 flex flex-col justify-center">
            
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
              <div className="flex flex-col items-start text-left lg:col-span-4 xl:col-span-4 max-w-md">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/10 bg-sky-950/10 backdrop-blur-sm text-[12px] md:text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
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
                <GlowButton
                  variant="solid"
                  size="lg"
                  onClick={() => scrollToSection("services")}
                  className="px-8 py-4 text-xs font-bold shadow-lg shadow-sky-500/10 cursor-pointer rounded-full"
                >
                  Explore Services <span className="ml-1.5">→</span>
                </GlowButton>
              </div>

              {/* Center: Interactive 3D Cubes */}
              <div className="lg:col-span-4 xl:col-span-4 h-[340px] md:h-[460px] w-full flex items-center justify-center relative my-4 lg:my-0">
                
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
                  className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px] z-10 flex items-center justify-center"
                >
                  <div className="hero-center-image w-full h-full flex items-center justify-center">
                    <Logo3D color="#0ea5e9" height="100%" interactive={true} />
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Features & Free Consultation Box */}
              <div className="hidden lg:flex flex-col items-start lg:items-end text-left lg:text-right lg:col-span-4 xl:col-span-4 gap-8">
                
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
                <div className="floating-card-3 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-xl border border-white/[0.06] p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center gap-4 w-full max-w-[280px] ml-auto text-left relative overflow-hidden group">
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
                    <p className="text-[9px] text-slate-400 mt-1 leading-relaxed font-light">
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
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-4 bg-[#e0f2fe] w-14 pt-2 pb-5 rounded-t-[1rem] shadow-sm flex items-center justify-center cursor-pointer border-b-0 hover:bg-sky-200/50 transition-colors z-40"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="w-4 h-4 text-slate-900 animate-bounce" />
          </div>

        </div>
      </div>
    </section>
  );
}
