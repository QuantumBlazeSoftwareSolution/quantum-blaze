import { db } from "./index";
import { teamTable } from "./schemas/team";
import { fullTeam } from "../data";

async function seed() {
  console.log("🌱 Seeding team members...");

  try {
    for (let i = 0; i < fullTeam.length; i++) {
      const member = fullTeam[i];
      
      // Map Tailwind gradient classes to our preset keys
      let gradientKey = "sky";
      if (member.gradient.includes("sky")) gradientKey = "sky";
      else if (member.gradient.includes("blue")) gradientKey = "blue";
      else if (member.gradient.includes("cyan")) gradientKey = "cyan";
      else if (member.gradient.includes("indigo")) gradientKey = "blue";
      else if (member.gradient.includes("violet") || member.gradient.includes("purple")) gradientKey = "violet";
      else if (member.gradient.includes("emerald") || member.gradient.includes("green")) gradientKey = "emerald";
      else if (member.gradient.includes("rose") || member.gradient.includes("pink")) gradientKey = "rose";
      else if (member.gradient.includes("amber") || member.gradient.includes("orange")) gradientKey = "amber";
      else if (member.gradient.includes("slate")) gradientKey = "slate";

      await db.insert(teamTable).values({
        name: member.name,
        role: member.role,
        email: member.email,
        bio: member.bio,
        image: member.image,
        linkedin: member.linkedin,
        gradient: gradientKey,
        orderNumber: i + 1,
      });
      
      console.log(`✅ Inserted team member: ${member.name}`);
    }

    console.log("✨ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();
