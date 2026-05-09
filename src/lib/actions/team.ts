"use server";

import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/db/crud/team/write";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { sendMonitorAlert } from "@/lib/monitor";

export async function createTeamMemberAction(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;
    const linkedin = formData.get("linkedin") as string;
    const gradient = formData.get("gradient") as string;
    const orderNumber = parseInt(formData.get("orderNumber") as string) || 99;

    if (!name || !role) {
      return { error: "Name and role are required." };
    }

    const result = await createTeamMember({ name, role, email, bio, image, linkedin, gradient: gradient || "sky", orderNumber });

    if (!result) {
      return { error: "Failed to create team member." };
    }

    await sendMonitorAlert("ANALYTICS", `👥 *Team Member Added*\n\nAdmin: ${session?.email || "Unknown"}\nName: ${name}\nRole: ${role}`);

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    console.error("Create Team Member Error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateTeamMemberAction(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;
    const linkedin = formData.get("linkedin") as string;
    const gradient = formData.get("gradient") as string;
    const orderNumber = parseInt(formData.get("orderNumber") as string) || 99;

    if (!id || !name || !role) {
      return { error: "Missing required fields." };
    }

    const result = await updateTeamMember(id, { name, role, email, bio, image, linkedin, gradient, orderNumber });

    if (!result) {
      return { error: "Failed to update team member." };
    }

    await sendMonitorAlert("ANALYTICS", `✏️ *Team Member Updated*\n\nAdmin: ${session?.email || "Unknown"}\nName: ${name}\nRole: ${role}`);

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    console.error("Update Team Member Error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteTeamMemberAction(id: string) {
  try {
    const session = await getServerSession();
    const result = await deleteTeamMember(id);
    if (result) {
      await sendMonitorAlert("ANALYTICS", `🗑️ *Team Member Deleted*\n\nAdmin: ${session?.email || "Unknown"}\nMember ID: ${id}`);
      revalidatePath("/team");
      revalidatePath("/admin/team");
      return { success: true };
    }
    return { error: "Failed to delete team member." };
  } catch (error) {
    console.error("Delete Team Member Error:", error);
    return { error: "An unexpected error occurred." };
  }
}
