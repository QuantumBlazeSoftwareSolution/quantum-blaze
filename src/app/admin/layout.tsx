import { Inter } from "next/font/google";
import "@/app/globals.css"; // Ensure global styles are available
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel | Quantum Blaze",
  description: "Secure administration area for Quantum Blaze.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // If there's no session, redirect to login. This adds an extra layer of protection
  // although middleware already handles it.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={`admin-root flex bg-[#1a2235] text-white min-h-screen antialiased ${inter.className}`}>
      <Sidebar userRole={session.role} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <AdminTopNav />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
