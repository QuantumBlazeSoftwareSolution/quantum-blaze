import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const teamTable = pgTable("team", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: integer("order_number").notNull().default(99),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email"),
  bio: text("bio"),
  image: text("image_url"),
  linkedin: text("linkedin"),
  // Stores one of the preset gradient keys, e.g. "sky", "blue", "cyan", etc.
  gradient: text("gradient").notNull().default("sky"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type TeamMember = typeof teamTable.$inferSelect;
export type TeamMemberInsert = typeof teamTable.$inferInsert;
