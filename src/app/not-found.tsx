"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b14] relative overflow-hidden">
      {/* Background glow effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(14, 165, 233, 0.05)" }}
      />

      <div className="container-wide relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Subtle logo or graphic */}
          <div className="w-16 h-16 mb-8 opacity-50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-8xl md:text-9xl font-bold font-quantum text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 tracking-tighter">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4 font-grotesk">
            Page Not Found
          </h2>

          <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed font-light">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back to the main console.
          </p>

          <GlowButton
            variant="solid"
            onClick={() => (window.location.href = "/")}
          >
            Back to Homepage
          </GlowButton>
        </motion.div>
      </div>
    </div>
  );
}
