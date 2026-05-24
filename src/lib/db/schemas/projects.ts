import { pgTable, text, timestamp, uuid, jsonb, pgEnum } from "drizzle-orm/pg-core";

export const mockupTypeEnum = pgEnum("mockup_type", ["desktop", "mobile"]);
export const projectStatusEnum = pgEnum("project_status", ["draft", "published"]);

export const projectsTable = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // e.g. 'lms', 'roadservice'
  orderNumber: text("order_number").notNull(), // e.g. '01', '02'
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  techStack: jsonb("tech_stack").notNull().default([]), // Array of strings
  metrics: jsonb("metrics").notNull().default([]), // Array of strings
  themeColor: text("theme_color").notNull().default("#38bdf8"),
  mockupType: mockupTypeEnum("mockup_type").notNull().default("desktop"),
  imageUrl: text("image_url").notNull(),
  status: projectStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Project = typeof projectsTable.$inferSelect;
export type ProjectInsert = typeof projectsTable.$inferInsert;
