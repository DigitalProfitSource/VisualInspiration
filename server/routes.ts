import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { AssessmentSubmitSchema } from "@shared/assessment-schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to submit lead" 
      });
    }
  });

  // Get all leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json({ success: true, leads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch leads" 
      });
    }
  });

  // Assessment submission endpoint
  app.post("/api/assessment/submit", async (req, res) => {
    try {
      const data = AssessmentSubmitSchema.parse(req.body);

      const lead = await storage.createAssessmentLead({
        assessmentData: data.assessmentData,
        clarityScore: Math.round((100 - (data.speedGapScore + data.silenceGapScore + data.chaosGapScore) / 3)),
        revenueLeakLow: Math.round(data.totalMonthlyImpactLow || 0),
        revenueLeakHigh: Math.round(data.totalMonthlyImpactHigh || 0),
        timeWastedMinutes: 0,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || null,
        contactWebsite: null,
        contactSubmittedAt: new Date(),
      });

      res.json({ leadId: lead.id });
    } catch (error) {
      console.error("Error submitting assessment:", error);
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  // Update assessment contact info
  app.post("/api/assessment/:leadId/contact", async (req, res) => {
    try {
      const { leadId } = req.params;
      
      const schema = z.object({
        contactName: z.string().min(1),
        contactEmail: z.string().email(),
        contactPhone: z.string().optional(),
        contactWebsite: z.string().optional(),
        userFeedback: z.string().optional(),
      });

      const contactInfo = schema.parse(req.body);

      const updated = await storage.updateAssessmentLeadContact(leadId, contactInfo);

      if (!updated) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error submitting contact:", error);
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Get assessment by ID
  app.get("/api/assessment/:leadId", async (req, res) => {
    try {
      const { leadId } = req.params;
      const lead = await storage.getAssessmentLead(leadId);

      if (!lead) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }

      res.json(lead);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Feedback endpoint
  app.post("/api/feedback", async (req, res) => {
    try {
      const schema = z.object({
        leadId: z.string().optional(),
        feedback: z.string().min(1),
      });

      const data = schema.parse(req.body);
      
      if (data.leadId) {
        await storage.updateAssessmentLeadContact(data.leadId, { userFeedback: data.feedback });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(400).json({ error: "Invalid feedback data" });
    }
  });

  return httpServer;
}
