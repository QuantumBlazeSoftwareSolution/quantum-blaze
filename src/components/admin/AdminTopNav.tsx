"use client";

import { Bell, Search, Filter, ChevronDown } from "lucide-react";
import Image from "next/image";

export function AdminTopNav() {
  return (
    <header className="h-20 bg-[#1a2235] border-b border-[#1e293b]/50 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left side tabs (Mimicking the reference design) */}
      <div className="flex items-center gap-8 h-full">
        <nav className="flex h-full">
          {["Overview", "Management", "Analytics", "Finance"].map((tab, idx) => (
            <button
              key={tab}
              className={`relative px-4 h-full flex items-center text-sm font-medium transition-colors ${
                idx === 1 
                  ? "text-sky-400" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
              {idx === 1 && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 shadow-[0_-2px_10px_rgba(56,189,248,0.5)]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side profile & icons */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute 0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a2235]" />
        </button>

        <div className="h-8 w-px bg-[#1e293b]" /> {/* Divider */}

        <button className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-lg transition-colors">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700">
             <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256"
                alt="Admin Profile"
                fill
                className="object-cover"
             />
          </div>
          <span className="text-sm font-medium text-slate-200">System Admin</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
