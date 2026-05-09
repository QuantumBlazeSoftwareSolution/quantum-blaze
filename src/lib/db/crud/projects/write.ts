import { db } from "../../index";
import { projectsTable, ProjectInsert } from "../../schemas/projects";
import { eq } from "drizzle-orm";

/**
 * Create a new project.
 */
export async function createProject(data: ProjectInsert) {
  try {
    const [result] = await db.insert(projectsTable).values(data).returning();
    return result;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

/**
 * Update an existing project by its ID.
 */
export async function updateProject(id: string, data: Partial<ProjectInsert>) {
  try {
    const [result] = await db
      .update(projectsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error(`Error updating project (${id}):`, error);
    return null;
  }
}

/**
 * Delete a project by its ID.
 */
export async function deleteProject(id: string) {
  try {
    const [result] = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error(`Error deleting project (${id}):`, error);
    return null;
  }
}
