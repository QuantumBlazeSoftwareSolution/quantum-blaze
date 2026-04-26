"use client";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";
import { useLenis } from "@/hooks/useLenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger after mount to fix any position miscalculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <Navbar />

      <Hero />
      <About />
      <Services />
      <Industries />
      <Projects />
      <Process />
      <TechStack />
      <Team />
      <Contact />

      <Footer />
    </main>
  );
}
