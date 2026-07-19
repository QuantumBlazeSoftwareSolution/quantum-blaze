import { projects } from "@/lib/data";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "Projects | Quantum Blaze",
  description: "A curated selection of our digital products and case studies.",
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  return <ProjectsClient projects={sortedProjects} />;
}
