"use client";

import { useTheme } from "@/components/admin/ThemeContext";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";

export function AdminClientLayout({ 
  children, 
  session, 
  interClassName 
}: { 
  children: React.ReactNode; 
  session: any;
  interClassName: string;
}) {
  return (
    <div className={`admin-root flex bg-[#1a2235] text-white min-h-screen antialiased relative ${interClassName}`}>
      <AdminBackground />
      <Sidebar userRole={session.role} />
      <div className="flex-1 ml-80 flex flex-col min-h-screen relative z-10">
        <AdminTopNav />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminBackground() {
  const { theme } = useTheme();
  
  if (!theme.bgImage) return null;
  
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out"
      style={{ 
        backgroundImage: `url(${theme.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: theme.opacity
      }}
    />
  );
}
