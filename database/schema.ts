import { foreignKey, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const ASINs = pgTable("ASINs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  asin: varchar({ length: 20 }).notNull().unique(),
  category: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: varchar({ length: 255 }).notNull().default(new Date().toISOString()),
});

export const sales = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  asin: varchar({ length: 20 }).notNull(),
  date: varchar({ length: 255 }).notNull(),
  sales_count: integer().notNull(),
});
