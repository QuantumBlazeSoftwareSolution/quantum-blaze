"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "./actions";
import { Rocket, ShieldAlert } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

function SecureLoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const predefinedKey = "Qb2024@";

  const redirectUrl =
    searchParams.get("redirect") || "/cms/blogs?key=" + predefinedKey;

  // If session is already active, redirect immediately
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("qb_secure_session");
      if (session === "active") {
        router.push(redirectUrl);
      }
    }
  }, [router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const result = await loginAction(formData);

      if (result.success) {
        // Save in browser session
        sessionStorage.setItem("qb_secure_session", "active");
        router.push(redirectUrl);
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
      <Navbar />

      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Login Card */}
      <div className="max-w-md w-full bg-slate-950/40 border border-slate-900 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl relative z-10 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-grotesk">
            Secure Console
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Enter credentials to unlock content creator portals.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter secure username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter secure password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            {loading ? "Verifying Console..." : "Unlock Portals"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SecureLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050b14] text-white flex items-center justify-center font-grotesk text-sm tracking-wider uppercase">
          Loading Secure Login...
        </div>
      }
    >
      <SecureLoginPageContent />
    </Suspense>
  );
}
