import { db } from "../../index";
import { projectsTable } from "../../schemas/projects";
import { eq, asc } from "drizzle-orm";

/**
 * Fetch all projects, ordered by their order number.
 */
export async function getAllProjects() {
  try {
    return await db.query.projectsTable.findMany({
      orderBy: [asc(projectsTable.orderNumber)],
    });
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
}

/**
 * Fetch a single project by its unique slug.
 */
export async function getProjectBySlug(slug: string) {
  try {
    return await db.query.projectsTable.findFirst({
      where: eq(projectsTable.slug, slug),
    });
  } catch (error) {
    console.error(`Error fetching project by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Fetch a single project by its UUID.
 */
export async function getProjectById(id: string) {
  try {
    return await db.query.projectsTable.findFirst({
      where: eq(projectsTable.id, id),
    });
  } catch (error) {
    console.error(`Error fetching project by ID (${id}):`, error);
    return null;
  }
}
