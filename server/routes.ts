import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { AssessmentSubmitSchema } from "@shared/assessment-schema";
import { calculateResults } from "@shared/scoring";
import { z } from "zod";
import { generateAssessmentEmailHTML } from "./email-template";

interface GHLWebhookData {
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  businessName: string;
  industry: string;
  niche: string;
  clarityScore: number;
  revenueLeakLow: number;
  revenueLeakHigh: number;
  totalMonthlyGap: number;
  annualizedGap: number;
  speedGapScore: number;
  speedGapEstimate: number;
  speedGapFindings: string[];
  silenceGapScore: number;
  silenceGapEstimate: number;
  silenceGapFindings: string[];
  chaosGapScore: number;
  chaosGapEstimate: number;
  chaosGapFindings: string[];
  recommendedTier: string;
  tierReason: string;
  topPainPoints: string[];
  teamSize: string;
  avgJobValue: string;
  monthlyLeadVolume: string;
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
      niche: data.niche,
      teamSize: data.teamSize,
      avgJobValue: data.avgJobValue,
      monthlyLeadVolume: data.monthlyLeadVolume,
      clarityScore: data.clarityScore,
      totalMonthlyGap: data.totalMonthlyGap,
      annualizedGap: data.annualizedGap,
      speedGapEstimate: data.speedGapEstimate,
      speedGapFindings: data.speedGapFindings,
      silenceGapEstimate: data.silenceGapEstimate,
      silenceGapFindings: data.silenceGapFindings,
      chaosGapEstimate: data.chaosGapEstimate,
      chaosGapFindings: data.chaosGapFindings,
      recommendedTier: data.recommendedTier,
      tierReason: data.tierReason,
    });

    const payload = {
      first_name: data.contactName.split(" ")[0],
      last_name: data.contactName.split(" ").slice(1).join(" ") || "",
      email: data.contactEmail,
      phone: data.contactPhone || "",
      company_name: data.businessName,
      industry: data.industry,
      clarity_score: data.clarityScore,
      revenue_leak_low: data.revenueLeakLow,
      revenue_leak_high: data.revenueLeakHigh,
      total_monthly_gap: data.totalMonthlyGap,
      annualized_gap: data.annualizedGap,
      speed_gap_score: data.speedGapScore,
      speed_gap_estimate: data.speedGapEstimate,
      silence_gap_score: data.silenceGapScore,
      silence_gap_estimate: data.silenceGapEstimate,
      chaos_gap_score: data.chaosGapScore,
      chaos_gap_estimate: data.chaosGapEstimate,
      recommended_tier: data.recommendedTier,
      tier_reason: data.tierReason,
      top_pain_points: data.topPainPoints.join(", "),
      team_size: data.teamSize,
      avg_job_value: data.avgJobValue,
      monthly_lead_volume: data.monthlyLeadVolume,
      source: "SimpleSequence Assessment",
      submitted_at: new Date().toISOString(),
      assessment_email_html: emailHtml,
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
      console.log("Lead sent to GHL successfully with email HTML");
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

      const clarityScore = Math.round((100 - (result.speedGap.estimate + result.silenceGap.estimate + result.chaosGap.estimate) / 300) * 100);
      const revenueLeakLow = Math.round(result.totalMonthlyGap * 0.8);
      const revenueLeakHigh = Math.round(result.totalMonthlyGap * 1.2);

      const lead = await storage.createAssessmentLead({
        assessmentData: data.assessmentData,
        clarityScore,
        revenueLeakLow,
        revenueLeakHigh,
        timeWastedMinutes: 0,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || null,
        contactWebsite: null,
        contactSubmittedAt: new Date(),
      });

      // Send to GHL webhook (non-blocking)
      sendToGHL({
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        businessName: result.businessName,
        industry: result.industry,
        niche: result.niche,
        clarityScore,
        revenueLeakLow,
        revenueLeakHigh,
        totalMonthlyGap: result.totalMonthlyGap,
        annualizedGap: result.annualizedGap,
        speedGapScore: result.speedGap.estimate,
        speedGapEstimate: result.speedGap.estimate,
        speedGapFindings: result.speedGap.findings,
        silenceGapScore: result.silenceGap.estimate,
        silenceGapEstimate: result.silenceGap.estimate,
        silenceGapFindings: result.silenceGap.findings,
        chaosGapScore: result.chaosGap.estimate,
        chaosGapEstimate: result.chaosGap.estimate,
        chaosGapFindings: result.chaosGap.findings,
        recommendedTier: result.recommendedTier,
        tierReason: result.tierReason,
        topPainPoints: data.assessmentData.revenue_pain.map(p => p.value),
        teamSize: result.teamSize,
        avgJobValue: `$${result.avgJobValue.toLocaleString()}`,
        monthlyLeadVolume: String(result.monthlyLeads),
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
