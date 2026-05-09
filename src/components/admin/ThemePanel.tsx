"use client";

import { X, RotateCcw, Palette, Check } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GlowButton } from "@/components/ui/GlowButton";

const THEME_IMAGES = [
  { id: "bg1", url: "/images/themes/bg1.png", name: "Cyber Flow" },
  { id: "bg2", url: "/images/themes/bg2.png", name: "Neon Matrix" },
  // Adding some placeholders to fill the grid as requested
  { id: "bg3", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500", name: "Deep Space" },
  { id: "bg4", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500", name: "Retro Tech" },
  { id: "bg5", url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=500", name: "Minimal Abstract" },
  { id: "bg6", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500", name: "Soft Gradient" },
];

export function ThemePanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setBgImage, setOpacity, resetTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Side Panel */}
      <div className={`fixed right-0 top-0 bottom-0 w-96 bg-[#141b2d] border-l border-white/10 z-[70] shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Theme Customizer</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Background Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Background Image</h4>
              <button 
                onClick={resetTheme}
                className="text-[10px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors group"
              >
                <RotateCcw className="w-3 h-3 group-hover:rotate-[-45deg] transition-transform" />
                Reset to Default
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {THEME_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setBgImage(img.url)}
                  className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    theme.bgImage === img.url ? 'border-sky-500 ring-4 ring-sky-500/20' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${theme.bgImage === img.url ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {theme.bgImage === img.url ? (
                      <Check className="w-6 h-6 text-sky-400" />
                    ) : (
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{img.name}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Opacity Control */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Background Opacity</h4>
              <span className="text-xs font-bold text-sky-400">{Math.round(theme.opacity * 100)}%</span>
            </div>
            
            <div className="relative pt-2">
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.01"
                value={theme.opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between mt-3 text-[10px] text-slate-600 font-bold uppercase tracking-widest px-1">
                <span>Subtle</span>
                <span>Bold</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 bg-white/[0.01]">
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            Changes are saved locally to your browser and will persist across sessions.
          </p>
          <GlowButton variant="solid" onClick={onClose} className="w-full mt-6 justify-center py-4">
            Done Customizing
          </GlowButton>
        </div>
      </div>
    </>
  );
}
