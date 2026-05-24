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
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { getPublishedProjects } from "@/lib/db/crud/projects/read";
import { getAllTeamMembers } from "@/lib/db/crud/team/read";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, members] = await Promise.all([
    getPublishedProjects(),
    getAllTeamMembers()
  ]);

  return (
    <SmoothScrollProvider>
      <main className="relative">
        <Navbar />

        <Hero />
        <About />
        <Services />
        <Industries />
        <Projects projects={projects} />
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
