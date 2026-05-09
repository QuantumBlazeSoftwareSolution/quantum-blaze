import { Inter } from "next/font/google";
import "@/app/globals.css"; // Ensure global styles are available

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
    <div className="admin-root bg-[#020813] text-white min-h-screen antialiased">
      {/* Later, you can add an Admin Sidebar or Navbar here */}
      <main className="w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
