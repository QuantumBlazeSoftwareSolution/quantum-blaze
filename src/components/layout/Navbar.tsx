"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  ...(process.env.NEXT_PUBLIC_TEAM_SECTION === "true"
    ? [{ label: "Team", href: "#team" }]
    : []),
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
      setMobileOpen(false);
      return;
    }
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };


  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "bg-[#050b14]/80 backdrop-blur-xl border-white/5 py-3 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-[#050B14] via-[#050B14]/90 to-transparent border-transparent py-5"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/original-logo.png"
              alt="Quantum Blaze Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span
              className="text-lg font-black tracking-tight font-inter uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Quantum <span style={{ color: "var(--accent-blue)" }}>Blaze</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.05 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium transition-colors duration-200 hover:text-sky-400 cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Resources Dropdown */}
            <div className="relative group flex items-center h-full py-1">
              <button 
                className="text-sm font-medium transition-colors duration-200 hover:text-sky-400 cursor-pointer flex items-center gap-1"
                style={{ color: "var(--text-muted)" }}
              >
                Resources <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-[80%] left-0 mt-1 w-32 bg-slate-950/95 border border-slate-900 rounded-xl py-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="/blog" className="block px-4 py-2 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors lowercase tracking-wider text-[11px] font-semibold">
                  Blog
                </a>
                <button onClick={() => scrollTo("#faq")} className="w-full text-left block px-4 py-2 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors lowercase tracking-wider text-[11px] font-semibold cursor-pointer">
                  FAQ
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <GlowButton
              size="sm"
              variant="outline"
              onClick={() => scrollTo("#contact")}
            >
              Get in Touch
              <span className="text-sky-400">→</span>
            </GlowButton>
          </motion.div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 glass border-b border-sky-500/10 p-8 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left py-2 border-b border-sky-500/10 text-base font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-left py-2 border-b border-sky-500/10 text-base font-medium text-sky-100 hover:text-sky-400 transition-colors block"
            >
              Blog
            </a>
            <button
              onClick={() => scrollTo("#faq")}
              className="text-left py-2 border-b border-sky-500/10 text-base font-medium text-sky-100 hover:text-sky-400 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <GlowButton variant="outline" onClick={() => scrollTo("#contact")}>
              Get in Touch
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
