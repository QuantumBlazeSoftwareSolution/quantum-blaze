import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";

export const metadata = {
  title: "Contact Us | Quantum Blaze",
  description:
    "Get in touch with Quantum Blaze. Let's discuss your next enterprise SaaS platform, mobile application, or custom web development project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-sky-500/20 selection:text-sky-400">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
