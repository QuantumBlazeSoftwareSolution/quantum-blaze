"use server";

import { createProject, updateProject, deleteProject } from "@/lib/db/crud/projects/write";
import { revalidatePath } from "next/cache";
import { getDriveImageUrl } from "@/lib/drive-image";

export async function createProjectAction(prevState: any, formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const orderNumber = formData.get("orderNumber") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const themeColor = formData.get("themeColor") as string;
    const mockupType = formData.get("mockupType") as "desktop" | "mobile";
    const rawImageUrl = formData.get("imageUrl") as string;

    // Parse JSON arrays
    const techStackStr = formData.get("techStack") as string;
    const metricsStr = formData.get("metrics") as string;
    
    const techStack = techStackStr ? techStackStr.split(",").map(s => s.trim()) : [];
    const metrics = metricsStr ? metricsStr.split(",").map(s => s.trim()) : [];

    if (!slug || !title || !description || !rawImageUrl) {
      return { error: "Missing required fields." };
    }

    // Clean Google Drive URL if provided
    const imageUrl = rawImageUrl.includes("drive.google.com") 
      ? getDriveImageUrl(rawImageUrl) 
      : rawImageUrl;

    const result = await createProject({
      slug,
      orderNumber: orderNumber || "00",
      title,
      subtitle,
      description,
      techStack,
      metrics,
      themeColor: themeColor || "#38bdf8",
      mockupType,
      imageUrl,
    });

    if (!result) {
      return { error: "Failed to create project. Slug might already exist." };
    }

    // Revalidate public pages so changes appear instantly
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects", "page");

    return { success: true };
  } catch (error) {
    console.error("Create Project Action Error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const result = await deleteProject(id);
    if (result) {
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/admin/projects", "page");
      return { success: true };
    }
    return { error: "Failed to delete project." };
  } catch (error) {
    console.error("Delete Project Action Error:", error);
    return { error: "An unexpected error occurred." };
  }
}
