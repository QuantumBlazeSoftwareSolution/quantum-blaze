import { projects } from "@/lib/data";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "Projects | Quantum Blaze",
  description: "A curated selection of our digital products and case studies.",
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const activeProjects = sortedProjects.filter((project) => project.active);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Quantum Blaze Case Studies",
    "description": "A curated selection of our digital products and case studies.",
    "numberOfItems": activeProjects.length,
    "itemListElement": activeProjects.map((project, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://quantumblaze.lk/projects/${project.slug}`,
      "name": project.title
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient projects={activeProjects} />
    </>
  );
}
