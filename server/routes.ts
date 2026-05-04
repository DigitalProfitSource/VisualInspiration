import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { AssessmentSubmitSchema } from "@shared/assessment-schema";
import { calculateResults, AssessmentResult } from "@shared/scoring";
import { z } from "zod";
import { generateAssessmentEmailHTML } from "./email-template";
import { generateAssessmentPDF } from "./pdf-generator";
import { scrapeWebsite } from "./scraper";
import { suggestSpecialization, classifyBusiness } from "./ai-specialist";

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
  rawAssessmentData?: Record<string, unknown>;
  leadId?: string | null;
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
      rawAssessmentData: data.rawAssessmentData,
    });

    const pdfBase64 = pdfBuffer.toString("base64");

    const r = data.result;
    const raw = (data as GHLWebhookData & { rawAssessmentData?: Record<string, unknown> }).rawAssessmentData || {};
    const payload: Record<string, string> = {
      // Contact
      first_name: data.contactName.split(" ")[0],
      last_name: data.contactName.split(" ").slice(1).join(" ") || "",
      email: data.contactEmail,
      phone: data.contactPhone || "",
      company_name: data.businessName,
      website: data.websiteUrl || "",
      // Scores
      overall_score: String(r.overallScore),
      capture_score: String(r.captureScore.score),
      convert_score: String(r.convertScore.score),
      compound_score: String(r.compoundScore.score),
      total_monthly_gap: String(r.totalMonthlyGap),
      annualized_gap: String(r.annualizedGap),
      recommended_tier: r.recommendedTier || "",
      // Business profile
      industry: r.industry,
      specialization: r.niche || "",
      team_size: r.teamSize,
      avg_job_value: String(r.avgJobValue),
      monthly_leads: String(r.monthlyLeads),
      monthly_jobs: String(r.monthlySalesVolume),
      ad_spend: String(r.adSpend),
      close_rate: String(Math.round(r.closeRate * 100)),
      // Raw answers (all assessment fields for onboarding matrix & discovery call)
      first_contact_speed: String(raw.first_contact_speed ?? ""),
      lead_unavailability: String(raw.lead_unavailability ?? ""),
      phone_unavailable_handling: String(raw.phone_unavailable_handling ?? ""),
      digital_unavailable_handling: String(raw.digital_unavailable_handling ?? ""),
      no_show_rate: String(raw.no_show_rate ?? ""),
      no_show_recovery: String(raw.no_show_recovery ?? ""),
      quote_followup: String(raw.quote_followup ?? ""),
      dormant_leads: String(raw.dormant_leads ?? ""),
      review_request: String(raw.review_request ?? ""),
      contact_channels: Array.isArray(raw.contact_channels) ? (raw.contact_channels as string[]).join(", ") : "",
      intake_centralization: String(raw.intake_centralization ?? ""),
      pipeline_tracking: String(raw.pipeline_tracking ?? ""),
      manual_hours: String(raw.manual_hours ?? ""),
      staff_repeat_questions: String(raw.staff_repeat_questions ?? ""),
      process_documentation: String(raw.process_documentation ?? ""),
      operational_complexity: String(raw.operational_complexity ?? ""),
      has_automations: String(raw.has_automations ?? ""),
      has_ai_intent: String(raw.has_ai_intent ?? ""),
      ai_search_frequency: String(raw.ai_search_frequency ?? ""),
      ai_readiness: String(raw.ai_readiness ?? ""),
      // Referral vs. paid lead split
      referral_lead_split: String(raw.referral_lead_split ?? ""),
      paid_close_rate: String(raw.paid_close_rate ?? ""),
      referral_leads_per_month: String(r.referralLeadsPerMonth ?? ""),
      paid_leads_per_month: String(r.paidLeadsPerMonth ?? ""),
      paid_close_gap: r.paidCloseGap !== null ? String(r.paidCloseGap) : "",
      revenue_pains: data.revenuePains.join(", "),
      // Report content
      assessment_email_html: emailHtml,
      assessment_pdf_base64: pdfBase64,
      results_url: data.leadId ? `${process.env.APP_BASE_URL || "https://simplesequence.ai"}/results?id=${data.leadId}` : "",
      pdf_url: data.leadId ? `${process.env.APP_BASE_URL || "https://simplesequence.ai"}/api/assessment/${data.leadId}/pdf` : "",
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
    // Step 1: validate schema — hard failure, must return 400 if this fails.
    let data: ReturnType<typeof AssessmentSubmitSchema.parse>;
    try {
      data = AssessmentSubmitSchema.parse(req.body);
    } catch (err) {
      console.error("Assessment schema validation failed:", err);
      return res.status(400).json({ error: "Invalid assessment data" });
    }

    // Step 2: calculate results (pure function, never throws unless data is corrupted)
    const result = calculateResults(data.assessmentData);
    const overallScore = result.overallScore;
    const revenueLeakLow = Math.round(result.totalMonthlyGap * 0.8);
    const revenueLeakHigh = Math.round(result.totalMonthlyGap * 1.2);

    // Step 3: persist to DB — non-fatal. If the DB is down (e.g. local dev without
    // Postgres, or a transient Railway blip) we still return the lead ID so the
    // client can redirect to results. GHL webhook fires in the background regardless.
    let leadId: string | null = null;
    try {
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
      leadId = lead.id;
    } catch (dbErr) {
      // Log the real error (ECONNREFUSED, constraint violation, etc.) but don't
      // surface it as a 400 — the client would interpret that as bad input.
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.error("[assessment/submit] DB save failed (non-fatal):", msg.slice(0, 300));
    }

    // Step 4: fire GHL webhook (always best-effort, never blocks the response)
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
      rawAssessmentData: data.assessmentData as unknown as Record<string, unknown>,
      leadId,
    }).catch(err => console.error("GHL webhook error:", err));

    // Always succeed — the results page is computed client-side so it doesn't
    // need a DB-backed lead ID to render.
    return res.json({ leadId, success: true });
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

  // Direct PDF endpoint — accepts full assessmentData in the body, no DB required.
  // Used by the results page when a leadId is unavailable (e.g. local dev without DB).
  app.post("/api/assessment/pdf-direct", async (req, res) => {
    try {
      const { assessmentData, contactName, contactEmail, contactPhone, websiteUrl } = req.body;
      if (!assessmentData) {
        res.status(400).json({ error: "assessmentData required" });
        return;
      }
      const result = calculateResults(assessmentData);
      const rawData = assessmentData as Record<string, unknown>;
      const revenuePainRaw = rawData.revenue_pain;
      const revenuePains = Array.isArray(revenuePainRaw)
        ? (revenuePainRaw as { value: string }[]).map((p) => p.value)
        : [];
      const pdfBuffer = await generateAssessmentPDF({
        contactName: contactName || result.businessName || "Unknown",
        contactEmail: contactEmail || "",
        contactPhone: contactPhone || undefined,
        websiteUrl: websiteUrl || undefined,
        result,
        submittedAt: new Date(),
        revenuePains,
        rawAssessmentData: rawData,
      });
      const safeName = (result.businessName || "assessment").replace(/[^a-z0-9]/gi, "_").toLowerCase();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${safeName}_friction_analysis.pdf"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating direct PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
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
        rawAssessmentData: rawData,
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

  // Website scraping endpoint — triggered when user enters their URL in the assessment.
  // Always returns 200 with { success: boolean }. Never blocks the assessment flow.
  app.post("/api/scrape", async (req, res) => {
    try {
      const schema = z.object({
        url: z.string().trim().min(4).max(500),
      });
      const { url } = schema.parse(req.body);
      const insights = await scrapeWebsite(url);
      res.json(insights);
    } catch (error) {
      console.error("Scrape endpoint error:", error);
      res.json({
        success: false,
        domain: "",
        industryHints: [],
        serviceHints: [],
        hasSchema: false,
        schemaTypes: [],
        hasBookingWidget: false,
        hasChatWidget: false,
        contactMethods: [],
        error: error instanceof Error ? error.message : "Invalid request",
      });
    }
  });

  // AI Specialization Suggestion endpoint — generates a precise specialization label
  // using Claude. Accepts either scraped website context or manual user input.
  // Always returns 200 with { success, suggestion }. Never blocks assessment flow.
  app.post("/api/suggest-specialization", async (req, res) => {
    try {
      const schema = z.object({
        industry: z.string().min(1).max(120).optional(),
        // Scraped context path
        scraped: z.object({
          domain: z.string().optional(),
          businessName: z.string().optional(),
          description: z.string().optional(),
          serviceHints: z.array(z.string()).default([]),
        }).optional(),
        // Manual fallback path
        manual: z.object({
          specialty: z.string().max(500),
          idealCustomer: z.string().max(500),
        }).optional(),
      });

      const data = schema.parse(req.body);

      // Scraped path: Claude returns NAICS-based industry + code + title + specialization
      if (data.scraped) {
        const classification = await classifyBusiness({
          scraped: {
            kind: "scraped",
            domain: data.scraped.domain,
            businessName: data.scraped.businessName,
            description: data.scraped.description,
            serviceHints: data.scraped.serviceHints ?? [],
          },
        });

        if (classification) {
          return res.json({
            success: true,
            suggestion: classification.specialization,
            industry: classification.industry,
            naicsCode: classification.naicsCode || null,
            naicsTitle: classification.naicsTitle || null,
            businessName: classification.businessName || null,
          });
        }
        return res.json({
          success: false,
          suggestion: null,
          industry: null,
          naicsCode: null,
          naicsTitle: null,
          businessName: null,
        });
      }

      // Manual fallback path: user already picked industry, Claude only generates specialization
      if (data.manual && data.industry) {
        const suggestion = await suggestSpecialization({
          industry: data.industry,
          context: { kind: "manual", ...data.manual },
        });
        return res.json({ success: suggestion !== null, suggestion });
      }

      return res.json({ success: false, suggestion: null });
    } catch (error) {
      console.error("Suggest-specialization endpoint error:", error);
      res.json({ success: false, suggestion: null });
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
