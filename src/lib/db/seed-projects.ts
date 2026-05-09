import { db } from "./index";
import { projectsTable } from "./schemas/projects";
import { projects } from "../data";

async function seed() {
  console.log("🌱 Seeding projects...");

  try {
    for (const project of projects) {
      await db.insert(projectsTable).values({
        slug: project.id,
        orderNumber: project.number,
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        techStack: project.tech,
        metrics: project.metrics,
        themeColor: project.color,
        mockupType: project.mockupType as "desktop" | "mobile",
        imageUrl: project.image,
      }).onConflictDoNothing();
      
      console.log(`✅ Inserted project: ${project.title}`);
    }

    console.log("✨ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();
