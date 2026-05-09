import { db } from "../../index";
import { teamTable, TeamMemberInsert } from "../../schemas/team";
import { eq } from "drizzle-orm";

export async function createTeamMember(data: TeamMemberInsert) {
  try {
    const [result] = await db.insert(teamTable).values(data).returning();
    return result;
  } catch (error) {
    console.error("Error creating team member:", error);
    return null;
  }
}

export async function updateTeamMember(id: string, data: Partial<TeamMemberInsert>) {
  try {
    const [result] = await db
      .update(teamTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(teamTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error(`Error updating team member (${id}):`, error);
    return null;
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const [result] = await db
      .delete(teamTable)
      .where(eq(teamTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error(`Error deleting team member (${id}):`, error);
    return null;
  }
}
