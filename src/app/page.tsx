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
import { team as members } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects] = await Promise.all([
    getPublishedProjects(),
  ]);

  return (
    <SmoothScrollProvider>
      <main className="relative">

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
