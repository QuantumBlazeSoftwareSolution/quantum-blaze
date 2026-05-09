import { getAllProjects } from "@/lib/db/crud/projects/read";
import { ProjectManager } from "@/components/admin/ProjectManager";

export const metadata = {
  title: "Manage Projects | Quantum Blaze Admin",
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-6xl mx-auto p-8 pt-12 space-y-8">
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
