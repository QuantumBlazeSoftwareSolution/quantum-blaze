"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  RotateCw, 
  Settings, 
  User, 
  Home, 
  LayoutGrid,
  ExternalLink,
  Copy,
  Info
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  separator?: boolean;
  danger?: boolean;
}

export function CustomContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleContextMenu = useCallback((e: MouseEvent) => {
    // Only enable for admin routes
    if (!window.location.pathname.startsWith('/admin')) return;
    
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  const handleClick = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, [handleContextMenu, handleClick]);

  if (!visible) return null;

  const menuItems: MenuItem[] = [
    { label: 'Back', icon: <ArrowLeft className="w-4 h-4" />, action: () => router.back() },
    { label: 'Reload', icon: <RotateCw className="w-4 h-4" />, action: () => window.location.reload() },
    { label: 'Dashboard', icon: <Home className="w-4 h-4" />, action: () => router.push('/admin'), separator: true },
    { label: 'Projects', icon: <LayoutGrid className="w-4 h-4" />, action: () => router.push('/admin/projects') },
    { label: 'My Profile', icon: <User className="w-4 h-4" />, action: () => {} },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, action: () => router.push('/admin/settings'), separator: true },
    { label: 'Copy Page URL', icon: <Copy className="w-4 h-4" />, action: () => navigator.clipboard.writeText(window.location.href) },
    { label: 'View Site', icon: <ExternalLink className="w-4 h-4" />, action: () => window.open('/', '_blank') },
  ];

  return (
    <>
      {/* SVG Filter for Liquid Effect */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed z-[9999] pointer-events-none"
        style={{ 
          left: position.x, 
          top: position.y,
          filter: 'url(#liquid-goo)'
        }}
      >
        <div 
          className="bg-[#1a2235]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 w-64 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto animate-in fade-in zoom-in duration-200 origin-top-left"
          style={{
            transform: 'translate(0, 0)', // Positioned by parent
          }}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  setVisible(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  item.danger 
                    ? 'text-red-400 hover:bg-red-500/10' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`transition-transform duration-300 group-hover:scale-110 ${item.danger ? 'text-red-400' : 'text-slate-400 group-hover:text-sky-400'}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
              {item.separator && <div className="my-1.5 h-px bg-white/5 mx-2" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes liquid-pop {
          0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-liquid {
          animation: liquid-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
}
