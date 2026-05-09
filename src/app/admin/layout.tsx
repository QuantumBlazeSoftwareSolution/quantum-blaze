import { Inter } from "next/font/google";
import "@/app/globals.css"; // Ensure global styles are available
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel | Quantum Blaze",
  description: "Secure administration area for Quantum Blaze.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root flex bg-[#1a2235] text-white min-h-screen antialiased">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <AdminTopNav />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
