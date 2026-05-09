"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  MonitorPlay,
  Code2,
  Paintbrush,
  Database,
  Mail,
  User,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-[#050b14]/80">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={() => setOpen(false)} />

      <Command
        className="relative w-full max-w-2xl bg-[#0a192f] rounded-xl border border-sky-500/20 shadow-2xl shadow-sky-900/20 overflow-hidden"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-sky-500/10 px-4">
          <Search className="w-5 h-5 text-sky-400 mr-3" />
          <Command.Input
            autoFocus
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 py-4 text-lg"
            placeholder="Type a command or search..."
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-sky-500/20">
          <Command.Empty className="py-6 text-center text-slate-500 text-sm">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Services"
            className="px-2 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            <Command.Item
              onSelect={() => {
                router.push("/#services");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 mt-1 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <MonitorPlay className="w-4 h-4 mr-3" />
              Enterprise SaaS
            </Command.Item>
            <Command.Item
              onSelect={() => {
                router.push("/#services");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <Code2 className="w-4 h-4 mr-3" />
              Mobile Applications
            </Command.Item>
            <Command.Item
              onSelect={() => {
                router.push("/#services");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <Paintbrush className="w-4 h-4 mr-3" />
              UI/UX Engineering
            </Command.Item>
            <Command.Item
              onSelect={() => {
                router.push("/#services");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <Database className="w-4 h-4 mr-3" />
              Cloud Architecture
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Company"
            className="px-2 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider border-t border-sky-500/10"
          >
            <Command.Item
              onSelect={() => {
                router.push("/#contact");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 mt-1 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <Mail className="w-4 h-4 mr-3" />
              Contact Us
            </Command.Item>
            <Command.Item
              onSelect={() => {
                router.push("/#team");
                setOpen(false);
              }}
              className="flex items-center px-3 py-3 rounded-md text-sm text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 cursor-pointer transition-colors"
            >
              <User className="w-4 h-4 mr-3" />
              Meet the Team
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="bg-[#050b14] px-4 py-3 border-t border-sky-500/10 flex justify-between items-center text-xs text-slate-500">
          <div>
            <kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
              ↑↓
            </kbd>{" "}
            to navigate
          </div>
          <div>
            <kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
              esc
            </kbd>{" "}
            to close
          </div>
        </div>
      </Command>
    </div>
  );
}
