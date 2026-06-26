"use client";

import { useActionState, useEffect } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { loginAdmin } from "@/lib/actions/auth";

const initialState: any = { error: undefined, success: undefined };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = "/"; // Redirects to admin.quantumblaze.lk/
    }
  }, [state.success]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020813] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md p-10 bg-[#141b2d]/50 border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-sky-500/10 rounded-2xl mb-6">
            <div className="flex flex-col items-center gap-4">
              <img src="/original-logo.png" alt="Quantum Blaze Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-3xl font-bold text-white tracking-tighter font-grotesk uppercase">
                Quantum <span className="text-sky-400">Admin</span>
              </h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-tight">Sign in to access the secure control panel</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state.error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl text-center">
              {state.error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@quantumblaze.lk"
              className="w-full px-5 py-4 bg-[#0a192f]/50 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a192f] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-[#0a192f]/50 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-[#0a192f] transition-all"
            />
          </div>

          <div className="pt-4">
            <GlowButton variant="solid" className="w-full justify-center py-4 text-base font-bold shadow-lg shadow-sky-500/10" disabled={isPending}>
              {isPending ? "Verifying..." : "Sign In Securely"}
            </GlowButton>
          </div>
        </form>
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Quantum Blaze. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
