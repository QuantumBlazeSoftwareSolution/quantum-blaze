"use client";

import { useActionState, useEffect } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { loginAdmin } from "@/lib/actions/auth";

const initialState = { error: undefined, success: undefined };

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = "/"; // Redirects to admin.quantumblaze.lk/
    }
  }, [state.success]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-wide font-quantum uppercase">
            Quantum <span className="text-sky-400">Admin</span>
          </h1>
          <p className="text-slate-400 text-sm">Sign in to access the secure control panel</p>
        </div>

        <form action={formAction} className="space-y-4">
          {state.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
              {state.error}
            </div>
          )}
          
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
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
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>

          <div className="pt-4">
            <GlowButton variant="solid" className="w-full justify-center" disabled={isPending}>
              {isPending ? "Verifying Identity..." : "Sign In Securely"}
            </GlowButton>
          </div>
        </form>
      </div>
    </div>
  );
}
