"use client";

import { Bell, Search, Filter, ChevronDown, Palette } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemePanel } from "./ThemePanel";

const ROUTE_MAP: Record<string, { title: string; subtitle: string }> = {
  "/": { 
    title: "Admin Dashboard", 
    subtitle: "Welcome to the secure Quantum Blaze administration panel." 
  },
  "/projects": { 
    title: "Project Management", 
    subtitle: "View and manage all active and archived projects." 
  },
  "/users": { 
    title: "User Management", 
    subtitle: "Manage administrator accounts and roles." 
  },
  "/settings": { 
    title: "General Settings", 
    subtitle: "Configure your system preferences and security." 
  },
};

export function AdminTopNav() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const pathname = usePathname();

  const currentRoute = ROUTE_MAP[pathname] || { title: "Admin Panel", subtitle: "Quantum Blaze Management" };

  return (
    <header className="h-24 bg-transparent px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Dynamic Title & Subtitle */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">
          {currentRoute.title}
        </h1>
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest opacity-80">
          {currentRoute.subtitle}
        </p>
      </div>

      {/* Right side profile & icons */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsThemeOpen(true)}
            className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            title="Theme Customizer"
          >
            <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <button className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all relative group">
            <Bell className="w-5 h-5 group-hover:shake transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a2235]" />
          </button>
        </div>

        <div className="h-8 w-px bg-white/10" /> {/* Divider */}

        <button className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-xl transition-colors">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-700 border border-white/10 shadow-lg">
             <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256"
                alt="Admin Profile"
                fill
                className="object-cover"
             />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-slate-200">System Admin</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Super Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Theme Customizer Sidebar */}
      <ThemePanel isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
    </header>
  );
}
