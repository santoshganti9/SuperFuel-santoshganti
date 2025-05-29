import { foreignKey, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";


export const JSSnippet = pgTable("JSSnippet", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  jsSnippet: text().notNull(),
})
