import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const TASK_STATUS = ["Not Started", "In Progress", "Completed"] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).default("Not Started").notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  text: true,
  description: true,
  status: true,
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type CreateTaskRequest = InsertTask;
export type UpdateTaskRequest = Partial<InsertTask>;
