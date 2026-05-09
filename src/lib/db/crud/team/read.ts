import { db } from "../../index";
import { teamTable } from "../../schemas/team";
import { asc } from "drizzle-orm";

/**
 * Fetch all team members, ordered by their order number.
 */
export async function getAllTeamMembers() {
  try {
    return await db.query.teamTable.findMany({
      orderBy: [asc(teamTable.orderNumber)],
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}
