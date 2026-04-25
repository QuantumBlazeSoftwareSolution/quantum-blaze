"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter, FaDribbble } from "react-icons/fa6";

const footerLinks = {
  Company: ["About Us", "Services", "Projects", "Team"],
  Services: ["Enterprise SaaS", "Mobile Apps", "Web Apps", "UI/UX Design", "Cloud & DevOps"],
  Contact: ["hello@quantumblaze.io", "+94 77 000 0000", "Colombo, Sri Lanka"],
};

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "X", href: "#", icon: FaXTwitter },
  { label: "Dribbble", href: "#", icon: FaDribbble },
];

export function Footer() {
  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ borderColor: "rgba(56,189,248,0.08)", background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(14,165,233,0.04)" }}
      />

      <div className="container-wide py-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img 
                src="/QB LOGO TRANSPARENT.png" 
                alt="Quantum Blaze Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-bold tracking-wider font-quantum text-white uppercase">
                Quantum <span className="text-sky-400">Blaze</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Engineering scalable, high-end digital solutions that define the future.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-xs text-sky-400 hover:border-sky-400/40 transition-all duration-200 hover:text-white"
                  title={s.label}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-sky-400"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(56,189,248,0.08)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 Quantum Blaze. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs hover:text-sky-400 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
