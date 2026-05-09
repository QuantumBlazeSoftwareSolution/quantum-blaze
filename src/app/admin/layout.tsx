import { Inter } from "next/font/google";
import "@/app/globals.css"; // Ensure global styles are available
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/admin/ThemeContext";
import { AdminClientLayout } from "@/components/admin/AdminClientLayout";

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

  // If there's no session, we just render the children (e.g. the Login page)
  // without the sidebar and navigation. The middleware handles the redirect to /login.
  if (!session) {
    return (
      <div className={`min-h-screen bg-[#020813] text-white ${inter.className}`}>
        {children}
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AdminClientLayout session={session} interClassName={inter.className}>
        {children}
      </AdminClientLayout>
    </ThemeProvider>
  );
}
