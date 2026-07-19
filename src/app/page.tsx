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
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { team as members, projects } from "@/lib/data";

export default function Home() {
  const latestProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <SmoothScrollProvider>
      <main className="relative">

        <Hero />
        <About />
        <Services />
        <Industries />
        <Projects projects={latestProjects} />
        <Process />
        <TechStack />
        {process.env.NEXT_PUBLIC_TEAM_SECTION === "true" && (
          <Team members={members} />
        )}
        <Contact />

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
