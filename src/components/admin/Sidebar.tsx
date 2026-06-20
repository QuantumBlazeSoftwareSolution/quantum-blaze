"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Palette,
  LayoutTemplate,
  Globe,
  Users as UsersIcon
} from "lucide-react";
import { logoutAdmin } from "@/lib/actions/auth";

type NavItem = {
  name: string;
  href: string;
  icon: any;
  roles?: string[];
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

const navItems: NavGroup[] = [
  { group: "Menu", items: [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: Briefcase },
  ]},
  { group: "Access", items: [
    { name: "Users", href: "/users", icon: Users, roles: ["super_admin"] },
  ]},
  { group: "System", items: [
    { name: "Settings", href: "/settings", icon: Settings },
  ]}
];

type ContentItem = {
  name: string;
  href: string;
  icon: any;
};

const contentItems: ContentItem[] = [
  { name: "Pages", href: "#", icon: LayoutTemplate },
  { name: "Gallery", href: "#", icon: Palette },
  { name: "Blog", href: "#", icon: Globe },
  { name: "Team Members", href: "/team", icon: UsersIcon },
];

export function Sidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();
  const [isContentOpen, setIsContentOpen] = useState(false);

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-72 bg-[#141b2d]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col z-40 shadow-2xl transition-all duration-300">
      {/* User Profile Area */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-[#0a192f] flex items-center justify-center overflow-hidden border-2 border-[#141b2d]">
                <img src="/original-logo.png" alt="User" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#141b2d] rounded-full" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Good Day ✨</p>
            <h2 className="text-sm font-bold text-white tracking-tight">Quantum Admin</h2>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        {navItems.map((group) => {
          const visibleItems = group.items.filter(
            item => !item.roles || (userRole && item.roles.includes(userRole))
          );
          
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.group} className="mb-6">
              <p className="px-4 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-3">{group.group}</p>
              <nav className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-200 group relative ${
                        isActive
                          ? "bg-white/5 text-white shadow-lg"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 h-6 w-1.5 bg-sky-400 rounded-r-full shadow-[0_0_15px_rgba(56,189,248,0.6)]" />
                      )}
                      
                      <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                      <span className="font-semibold text-sm tracking-tight">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          );
        })}

        {/* Site Content Sub-menu */}
        <div className="mb-6">
          <p className="px-4 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-3">Content</p>
          <button
            onClick={() => setIsContentOpen(!isContentOpen)}
            className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-200 group relative ${
              isContentOpen ? "bg-white/5 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`}
          >
            <FileText className={`w-5 h-5 mr-3 transition-colors ${isContentOpen ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"}`} />
            <span className="font-semibold text-sm tracking-tight">Site Content</span>
            {isContentOpen ? (
              <ChevronUp className="w-4 h-4 ml-auto text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto text-slate-500" />
            )}
          </button>
          
          {isContentOpen && (
            <div className="mt-2 ml-4 p-2 bg-white/[0.03] border border-white/5 rounded-2xl space-y-1">
              {contentItems.map((subItem) => {
                const isSubActive = pathname === subItem.href;
                return subItem.href === "#" ? (
                  <button
                    key={subItem.name}
                    className="flex items-center w-full px-4 py-2.5 rounded-xl text-slate-500 cursor-not-allowed transition-all group opacity-50"
                  >
                    <subItem.icon className="w-4 h-4 mr-3 text-slate-600" />
                    <span className="text-xs font-bold tracking-wide">{subItem.name}</span>
                    <span className="ml-auto text-[9px] text-slate-600 font-bold uppercase tracking-wider">Soon</span>
                  </button>
                ) : (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-all group relative ${
                      isSubActive
                        ? "bg-white/5 text-sky-400"
                        : "text-slate-400 hover:text-sky-400 hover:bg-white/5"
                    }`}
                  >
                    <subItem.icon className={`w-4 h-4 mr-3 transition-colors ${isSubActive ? "text-sky-400" : "text-slate-500 group-hover:text-sky-400"}`} />
                    <span className="text-xs font-bold tracking-wide">{subItem.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area (Logout) */}
      <div className="p-6">
        <button
          onClick={async () => {
            await logoutAdmin();
            window.location.href = "/login";
          }}
          className="flex items-center w-full px-6 py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400/80 hover:text-red-400 rounded-3xl transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 mr-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-bold text-sm tracking-tight">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
