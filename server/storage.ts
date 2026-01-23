import { db } from "./db";
import { users, leads, assessmentLeads, type User, type InsertUser, type Lead, type InsertLead, type AssessmentLead, type InsertAssessmentLead } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  createAssessmentLead(lead: InsertAssessmentLead): Promise<AssessmentLead>;
  getAssessmentLead(id: string): Promise<AssessmentLead | undefined>;
  updateAssessmentLeadContact(id: string, contact: Partial<Pick<AssessmentLead, 'contactName' | 'contactEmail' | 'contactPhone' | 'contactWebsite' | 'userFeedback'>>): Promise<AssessmentLead | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(insertLead).returning();
    return result[0];
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(leads.createdAt);
  }

  async createAssessmentLead(insertLead: InsertAssessmentLead): Promise<AssessmentLead> {
    const result = await db.insert(assessmentLeads).values(insertLead).returning();
    return result[0];
  }

  async getAssessmentLead(id: string): Promise<AssessmentLead | undefined> {
    const result = await db.select().from(assessmentLeads).where(eq(assessmentLeads.id, id));
    return result[0];
  }

  async updateAssessmentLeadContact(id: string, contact: Partial<Pick<AssessmentLead, 'contactName' | 'contactEmail' | 'contactPhone' | 'contactWebsite' | 'userFeedback'>>): Promise<AssessmentLead | undefined> {
    const result = await db.update(assessmentLeads)
      .set({ ...contact, contactSubmittedAt: new Date() })
      .where(eq(assessmentLeads.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
