"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { logoutAdmin } from "@/lib/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Users", href: "/users", icon: Users, roles: ["super_admin"] },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  // Filter items based on role
  const visibleItems = navItems.filter(
    item => !item.roles || (userRole && item.roles.includes(userRole))
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#141b2d] border-r border-[#1e293b] flex flex-col z-40 transition-all duration-300">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-[#1e293b]/50">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Quantum <span className="text-sky-400">Admin</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-8 py-3.5 mx-2 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#1e293b] text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/50"
                }`}
              >
                {/* Active Indicator Line (Left) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-sky-400 rounded-r-md shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                )}
                
                <item.icon className={`w-5 h-5 mr-4 transition-colors ${isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                <span className="font-medium text-sm">{item.name}</span>
                
                {/* Optional Chevron for submenus (hardcoded logic for now) */}
                {item.name === "Projects" && isActive && (
                   <ChevronRight className="w-4 h-4 ml-auto text-slate-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area (Logout) */}
      <div className="p-4 border-t border-[#1e293b]/50">
        <button
          onClick={async () => {
            await logoutAdmin();
            window.location.href = "/login";
          }}
          className="flex items-center w-full px-6 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
        >
          <LogOut className="w-5 h-5 mr-4 text-slate-500 group-hover:text-red-400 transition-colors" />
          <span className="font-medium text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
}
