import { getAllProjects } from "@/lib/db/crud/projects/read";
import { ProjectManager } from "@/components/admin/ProjectManager";

export const metadata = {
  title: "Manage Projects | Quantum Blaze Admin",
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="w-full px-8 py-10 space-y-8">
      <ProjectManager initialProjects={projects} />
    </div>
  );
}
