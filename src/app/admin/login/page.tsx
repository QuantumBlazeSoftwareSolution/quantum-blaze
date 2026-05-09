"use client";

import { GlowButton } from "@/components/ui/GlowButton";

export default function AdminLogin() {
  const handleSimulatedLogin = () => {
    // In a real app, this would be an API call or Server Action that verifies credentials
    // and securely sets an HTTP-only cookie.
    document.cookie = "admin-token=simulated-token; path=/";
    window.location.href = "/"; // Redirects to admin.quantumblaze.lk/ (which goes to /admin)
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-wide font-quantum uppercase">
            Quantum <span className="text-sky-400">Admin</span>
          </h1>
          <p className="text-slate-400 text-sm">Sign in to access the control panel</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@quantumblaze.lk"
              className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>

          <div className="pt-4">
            <GlowButton variant="solid" className="w-full justify-center" onClick={handleSimulatedLogin}>
              Sign In (Simulated)
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
