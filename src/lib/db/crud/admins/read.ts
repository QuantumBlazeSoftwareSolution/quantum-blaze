import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { adminUsersTable, AdminUser } from "../../schemas";

export async function getAdminUserByEmail(
  email: string,
): Promise<AdminUser | null> {
  try {
    const result = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.email, email))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching admin user by email:", error);
    return null;
  }
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  try {
    const result = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching admin user by ID:", error);
    return null;
  }
}

export async function getAllAdmins(): Promise<Omit<AdminUser, 'password'>[]> {
  try {
    const result = await db
      .select({
        id: adminUsersTable.id,
        email: adminUsersTable.email,
        name: adminUsersTable.name,
        role: adminUsersTable.role,
        status: adminUsersTable.status,
        recoveryCode: adminUsersTable.recoveryCode,
        createdAt: adminUsersTable.createdAt,
        updatedAt: adminUsersTable.updatedAt,
      })
      .from(adminUsersTable);
    return result;
  } catch (error) {
    console.error("Error fetching all admins:", error);
    return [];
  }
}
