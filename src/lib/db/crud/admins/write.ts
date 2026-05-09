import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { adminUsersTable, AdminUserInsert, AdminUser } from "../../schemas";

export async function createAdminUser(
  data: AdminUserInsert,
): Promise<AdminUser | null> {
  try {
    const result = await db.insert(adminUsersTable).values(data).returning();
    return result[0] || null;
  } catch (error) {
    console.error("Error creating admin user:", error);
    return null;
  }
}

export async function updateAdminUser(
  id: string,
  data: Partial<AdminUserInsert>,
): Promise<AdminUser | null> {
  try {
    const result = await db
      .update(adminUsersTable)
      .set(data)
      .where(eq(adminUsersTable.id, id))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error("Error updating admin user:", error);
    return null;
  }
}
