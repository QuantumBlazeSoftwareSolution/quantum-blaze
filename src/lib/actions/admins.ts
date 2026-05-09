"use server";

import { createAdminUser, updateAdminUser } from "@/lib/db/crud/admins/write";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Helper to verify Super Admin permission
async function verifySuperAdmin() {
  const session = await getServerSession();
  if (!session || session.role !== "super_admin") {
    throw new Error("Unauthorized: Super Admin access required.");
  }
}

export async function createAdminAction(prevState: any, formData: FormData) {
  try {
    await verifySuperAdmin();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "admin" | "super_admin";

    if (!email || !name || !password) {
      return { error: "Name, email, and password are required." };
    }

    // Hash the password securely
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createAdminUser({
      email,
      name,
      password: hashedPassword,
      role: role || "admin",
      status: "active",
    });

    if (!result) {
      return { error: "Failed to create admin. Email might already exist." };
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Create Admin Action Error:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function updateAdminStatusAction(id: string, newStatus: "active" | "disabled" | "suspended") {
  try {
    await verifySuperAdmin();

    const result = await updateAdminUser(id, { status: newStatus });

    if (!result) {
      return { error: "Failed to update status." };
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Update Admin Status Error:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
