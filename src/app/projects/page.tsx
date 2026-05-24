import { getPublishedProjects } from "@/lib/db/crud/projects/read";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "Projects | Quantum Blaze",
  description: "A curated selection of our digital products and case studies.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return <ProjectsClient projects={projects} />;
}
