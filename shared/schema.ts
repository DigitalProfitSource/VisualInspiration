import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message"),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const assessmentLeads = pgTable("assessment_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assessmentData: jsonb("assessment_data").notNull(),
  clarityScore: integer("clarity_score").notNull(),
  revenueLeakLow: integer("revenue_leak_low").notNull(),
  revenueLeakHigh: integer("revenue_leak_high").notNull(),
  timeWastedMinutes: integer("time_wasted_minutes").notNull(),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactWebsite: text("contact_website"),
  userFeedback: text("user_feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  contactSubmittedAt: timestamp("contact_submitted_at"),
});

export const insertAssessmentLeadSchema = createInsertSchema(assessmentLeads).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessmentLead = z.infer<typeof insertAssessmentLeadSchema>;
export type AssessmentLead = typeof assessmentLeads.$inferSelect;
