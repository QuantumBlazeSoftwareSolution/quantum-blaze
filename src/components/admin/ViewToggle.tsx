"use client";

import { LayoutList, LayoutGrid } from "lucide-react";

export type ViewMode = "list" | "grid";

export function ViewToggle({
  view,
  onToggle,
}: {
  view: ViewMode;
  onToggle: (v: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
      <button
        onClick={() => onToggle("list")}
        title="List View"
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === "list"
            ? "bg-sky-500/20 text-sky-400 shadow-inner"
            : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <LayoutList className="w-4 h-4" />
      </button>
      <button
        onClick={() => onToggle("grid")}
        title="Grid View"
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === "grid"
            ? "bg-sky-500/20 text-sky-400 shadow-inner"
            : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
    </div>
  );
}
