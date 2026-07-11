import { projects } from "@/lib/data";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "Projects | Quantum Blaze",
  description: "A curated selection of our digital products and case studies.",
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />;
}
