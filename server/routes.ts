import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { AssessmentSubmitSchema } from "@shared/assessment-schema";
import { calculateResults, AssessmentResult } from "@shared/scoring";
import { z } from "zod";
import { generateAssessmentEmailHTML } from "./email-template";
import { generateAssessmentPDF } from "./pdf-generator";

interface GHLWebhookData {
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  websiteUrl?: string;
  businessName: string;
  industry: string;
  overallScore: number;
  result: AssessmentResult;
  revenuePains: string[];
  submittedAt: Date;
}

async function sendToGHL(data: GHLWebhookData) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("GHL_WEBHOOK_URL not configured - skipping webhook");
    return;
  }

  try {
    const emailHtml = generateAssessmentEmailHTML({
      contactName: data.contactName,
      businessName: data.businessName,
      industry: data.industry,
      niche: data.result.niche,
      teamSize: data.result.teamSize,
      avgJobValue: `$${data.result.avgJobValue.toLocaleString()}`,
      monthlyLeadVolume: String(data.result.monthlyLeads),
      overallScore: data.result.overallScore,
      captureScore: data.result.captureScore.score,
      captureFindings: data.result.captureScore.findings,
      convertScore: data.result.convertScore.score,
      convertFindings: data.result.convertScore.findings,
      compoundScore: data.result.compoundScore.score,
      compoundFindings: data.result.compoundScore.findings,
      blindspots: data.result.blindspots,
      quickWins: data.result.actionPlan.quickWins,
      supportingActions: data.result.actionPlan.supportingActions,
      totalMonthlyGap: data.result.totalMonthlyGap,
      annualizedGap: data.result.annualizedGap,
      recommendedTier: data.result.recommendedTier,
      tierReason: data.result.tierReason,
    });

    const pdfBuffer = await generateAssessmentPDF({
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone || undefined,
      websiteUrl: data.websiteUrl,
      result: data.result,
      submittedAt: data.submittedAt,
      revenuePains: data.revenuePains,
    });

    const pdfBase64 = pdfBuffer.toString("base64");

    const payload: Record<string, string> = {
      first_name: data.contactName.split(" ")[0],
      last_name: data.contactName.split(" ").slice(1).join(" ") || "",
      email: data.contactEmail,
      phone: data.contactPhone || "",
      company_name: data.businessName,
      website: data.websiteUrl || "",
      assessment_email_html: emailHtml,
      assessment_pdf_base64: pdfBase64,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("GHL webhook failed:", response.status, await response.text());
    } else {
      console.log("Lead sent to GHL successfully with email HTML and PDF");
    }
  } catch (error) {
    console.error("Error sending to GHL:", error);
  }
}

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

      // Calculate results server-side for data integrity
      const result = calculateResults(data.assessmentData);

      const overallScore = result.overallScore;
      const revenueLeakLow = Math.round(result.totalMonthlyGap * 0.8);
      const revenueLeakHigh = Math.round(result.totalMonthlyGap * 1.2);

      const lead = await storage.createAssessmentLead({
        assessmentData: data.assessmentData,
        clarityScore: overallScore,
        revenueLeakLow,
        revenueLeakHigh,
        timeWastedMinutes: 0,
        contactName: `${data.contactFirstName} ${data.contactLastName}`,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || null,
        contactWebsite: null,
        contactSubmittedAt: new Date(),
      });

      sendToGHL({
        contactName: `${data.contactFirstName} ${data.contactLastName}`,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        websiteUrl: data.assessmentData.website_url || undefined,
        businessName: result.businessName,
        industry: result.industry,
        overallScore,
        result,
        revenuePains: data.assessmentData.revenue_pain.map(p => p.value),
        submittedAt: new Date(),
      }).catch(err => console.error("GHL webhook error:", err));

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

  // PDF download endpoint
  app.get("/api/assessment/:leadId/pdf", async (req, res) => {
    try {
      const { leadId } = req.params;
      const lead = await storage.getAssessmentLead(leadId);

      if (!lead) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }

      const assessmentData = lead.assessmentData as Parameters<typeof calculateResults>[0];
      const result = calculateResults(assessmentData);

      const rawData = assessmentData as unknown as Record<string, unknown>;
      const websiteUrl = typeof rawData.website_url === "string" ? rawData.website_url : undefined;
      const revenuePainRaw = rawData.revenue_pain;
      const revenuePains = Array.isArray(revenuePainRaw)
        ? (revenuePainRaw as { value: string }[]).map((p) => p.value)
        : [];

      const pdfBuffer = await generateAssessmentPDF({
        contactName: lead.contactName || "Unknown",
        contactEmail: lead.contactEmail || "",
        contactPhone: lead.contactPhone || undefined,
        websiteUrl: websiteUrl || undefined,
        result,
        submittedAt: lead.contactSubmittedAt || new Date(),
        revenuePains,
      });

      const safeName = (result.businessName || "assessment").replace(/[^a-z0-9]/gi, "_").toLowerCase();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${safeName}_friction_analysis.pdf"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
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
