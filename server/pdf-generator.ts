import PDFDocument from "pdfkit";
import { AssessmentResult } from "@shared/scoring";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PDFChunk = any;

interface PDFGeneratorData {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  websiteUrl?: string;
  result: AssessmentResult;
  submittedAt: Date;
  revenuePains: string[];
}

const PAGE_BOTTOM = 720;
const LEFT = 50;
const FULL_WIDTH = 512;

function checkY(doc: InstanceType<typeof PDFDocument>, y: number, needed = 30): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return 50;
  }
  return y;
}

function sectionHeading(
  doc: InstanceType<typeof PDFDocument>,
  y: number,
  text: string,
  color: string,
  size = 16
): number {
  y = checkY(doc, y, size + 20);
  doc.fontSize(size).fillColor(color).text(text, LEFT, y);
  return y + size + 10;
}

export async function generateAssessmentPDF(data: PDFGeneratorData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margin: LEFT,
      bufferPages: true,
      info: {
        Title: `Sequential Revenue Friction Analysis - ${data.result.businessName}`,
        Author: "SimpleSequence",
        Subject: "Sequential Revenue Friction Analysis Report",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: PDFChunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const colors = {
      primary: "#0891b2",
      cyan: "#22d3ee",
      teal: "#14b8a6",
      amber: "#f59e0b",
      dark: "#18181b",
      slate: "#64748b",
      white: "#ffffff",
      lightTeal: "#f0fdfa",
    };

    // ── Header bar (page 1 only) ──────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(colors.dark);
    doc.fontSize(22).fillColor(colors.white).text("SimpleSequence", LEFT, 28);
    doc.fontSize(10).fillColor(colors.cyan).text("Sequential Revenue Friction Analysis", LEFT, 55);
    doc.fontSize(9).fillColor(colors.slate).text(
      `Generated: ${data.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      400, 55, { align: "right" }
    );

    let y = 108;

    // ── Business Profile ──────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Business Profile", colors.dark);

    const profileData: [string, string][] = [
      ["Company",        data.result.businessName || "—"],
      ["Contact",        data.contactName],
      ["Email",          data.contactEmail],
      ["Phone",          data.contactPhone || "Not provided"],
      ["Website",        data.websiteUrl   || "Not provided"],
      ["Industry",       data.result.industry],
      ["Specialization", data.result.niche],
      ["Team Size",      data.result.teamSize],
      ["Avg Job Value",  `$${data.result.avgJobValue.toLocaleString()}`],
      ["Monthly Leads",  String(data.result.monthlyLeads)],
      ["Close Rate",     `${Math.round(data.result.closeRate * 100)}%`],
    ];

    doc.fontSize(10);
    for (const [label, value] of profileData) {
      y = checkY(doc, y, 18);
      doc.fillColor(colors.slate).text(label + ":", LEFT, y, { continued: true, width: 120 });
      doc.fillColor(colors.dark).text("  " + value, { width: 390 });
      y += 16;
    }

    y += 12;

    // ── Primary Friction Points ───────────────────────────────────────────────
    if (data.revenuePains.length > 0) {
      y = sectionHeading(doc, y, "Primary Friction Points", colors.dark);
      doc.fontSize(10).fillColor(colors.slate);
      for (const pain of data.revenuePains) {
        y = checkY(doc, y, 18);
        doc.text("  " + pain, LEFT + 10, y);
        y += 16;
      }
      y += 10;
    }

    // ── Score box ─────────────────────────────────────────────────────────────
    y = checkY(doc, y, 110);
    doc.rect(LEFT, y, FULL_WIDTH, 95).fillAndStroke(colors.lightTeal, colors.teal);
    doc.fontSize(11).fillColor(colors.teal)
       .text("SEQUENTIAL REVENUE SCORE", LEFT + 10, y + 10, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(34).fillColor(colors.primary)
       .text(`${data.result.overallScore}/100`, LEFT + 10, y + 27, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(10).fillColor(colors.slate)
       .text(
         `Capture: ${data.result.captureScore.score}   |   Convert: ${data.result.convertScore.score}   |   Compound: ${data.result.compoundScore.score}`,
         LEFT + 10, y + 65, { align: "center", width: FULL_WIDTH - 20 }
       );
    doc.fontSize(9).fillColor(colors.slate)
       .text(
         `Estimated monthly revenue gap: $${data.result.totalMonthlyGap.toLocaleString()}/mo  ($${data.result.annualizedGap.toLocaleString()}/yr)`,
         LEFT + 10, y + 80, { align: "center", width: FULL_WIDTH - 20 }
       );
    y += 108;

    // ── Pillar Breakdown ──────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Pillar Breakdown", colors.dark);

    const pillars = [
      { name: "Capture",  color: colors.teal,    pillar: data.result.captureScore  },
      { name: "Convert",  color: colors.amber,   pillar: data.result.convertScore  },
      { name: "Compound", color: colors.primary,  pillar: data.result.compoundScore },
    ];

    for (const { name, color, pillar } of pillars) {
      // Header bar: 22px + findings (up to 3 × 15) + gap 10 ≈ 80 min
      y = checkY(doc, y, 80);

      doc.rect(LEFT, y, FULL_WIDTH, 22).fill(color + "22");
      doc.rect(LEFT, y, FULL_WIDTH, 22).stroke(color);
      doc.fontSize(11).fillColor(color).text(name, LEFT + 8, y + 5);
      doc.fontSize(11).fillColor(color).text(`${pillar.score}/100`, LEFT + 8, y + 5, { align: "right", width: FULL_WIDTH - 16 });
      y += 26;

      doc.fontSize(9).fillColor(colors.slate);
      for (const finding of pillar.findings.slice(0, 4)) {
        y = checkY(doc, y, 16);
        doc.text("  " + finding, LEFT + 12, y, { width: FULL_WIDTH - 20 });
        y += 15;
      }
      y += 8;
    }

    // ── Blindspots ────────────────────────────────────────────────────────────
    if (data.result.blindspots.length > 0) {
      y = sectionHeading(doc, y, "Blindspots", colors.dark);
      doc.fontSize(9).fillColor(colors.slate);
      for (const blindspot of data.result.blindspots.slice(0, 6)) {
        y = checkY(doc, y, 28);
        doc.text("[!] " + blindspot, LEFT + 10, y, { width: FULL_WIDTH - 20 });
        y += 24;
      }
    }

    // ── Action Plan ───────────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Your 30-Day Action Plan", colors.dark);

    y = checkY(doc, y, 30);
    doc.fontSize(12).fillColor(colors.teal).text("Quick Wins  (first 7-14 days)", LEFT, y);
    y += 20;

    doc.fontSize(9).fillColor(colors.slate);
    for (const action of data.result.actionPlan.quickWins) {
      y = checkY(doc, y, 28);
      doc.text("(+) " + action, LEFT + 10, y, { width: FULL_WIDTH - 20 });
      y += 22;
    }

    y += 8;
    y = checkY(doc, y, 30);
    doc.fontSize(12).fillColor(colors.amber).text("Supporting Actions  (rest of 30 days)", LEFT, y);
    y += 20;

    doc.fontSize(9).fillColor(colors.slate);
    for (const action of data.result.actionPlan.supportingActions) {
      y = checkY(doc, y, 28);
      doc.text("->  " + action, LEFT + 10, y, { width: FULL_WIDTH - 20 });
      y += 22;
    }

    // ── Recommended Tier ──────────────────────────────────────────────────────
    y = checkY(doc, y, 120);
    y += 10;
    doc.rect(LEFT, y, FULL_WIDTH, 105).fill(colors.primary + "18");
    doc.rect(LEFT, y, FULL_WIDTH, 105).stroke(colors.primary);
    doc.fontSize(10).fillColor(colors.primary)
       .text("RECOMMENDED SOLUTION", LEFT + 10, y + 12, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(22).fillColor(colors.dark)
       .text(`${data.result.recommendedTier} Tier`, LEFT + 10, y + 30, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(9).fillColor(colors.slate)
       .text(data.result.tierReason, LEFT + 20, y + 62, { align: "center", width: FULL_WIDTH - 40 });
    y += 118;

    // ── Tier Comparison ───────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Tier Comparison", colors.dark);

    const tiers = [
      {
        name:     "The AI Brain",
        focus:    "Capture pillar — $150/mo",
        ideal:    "Lead capture and response speed are your primary friction point",
        includes: ["24/7 Website AI Chatbot", "AI Voice Backup Receptionist"],
      },
      {
        name:     "The AI System",
        focus:    "Capture + Convert pillars — $250/mo",
        ideal:    "Follow-up, no-show recovery, and pipeline drag are costing you",
        includes: ["Everything in The AI Brain", "Proactive Quote / No-Show Recovery"],
      },
      {
        name:     "The AI Infrastructure",
        focus:    "Full Loop — all three pillars — $350/mo",
        ideal:    "Complex operations or high volume requiring full-system automation",
        includes: ["Everything in The AI System", "Full ASO + DBR Campaign"],
      },
    ];

    for (const tier of tiers) {
      y = checkY(doc, y, 100);
      const isRecommended = tier.name === data.result.recommendedTier;

      if (isRecommended) {
        doc.rect(LEFT, y, FULL_WIDTH, 90).fill(colors.cyan + "18");
      }
      doc.rect(LEFT, y, FULL_WIDTH, 90).stroke(isRecommended ? colors.primary : colors.slate);

      doc.fontSize(12)
         .fillColor(isRecommended ? colors.primary : colors.dark)
         .text(tier.name + (isRecommended ? "  [Recommended]" : ""), LEFT + 10, y + 10);

      doc.fontSize(9).fillColor(colors.slate).text(`Focus: ${tier.focus}`, LEFT + 10, y + 28);
      doc.text(`Ideal when: ${tier.ideal}`, LEFT + 10, y + 42, { width: FULL_WIDTH - 20 });

      let ix = y + 58;
      for (const item of tier.includes.slice(0, 2)) {
        doc.fontSize(8).text("  " + item, LEFT + 14, ix);
        ix += 12;
      }

      y += 98;
    }

    // ── CTA ───────────────────────────────────────────────────────────────────
    y += 12;
    y = checkY(doc, y, 60);
    doc.fontSize(13).fillColor(colors.primary)
       .text("Ready to Fix Your Revenue Friction?", LEFT, y, { align: "center", width: FULL_WIDTH });
    y += 20;
    doc.fontSize(10).fillColor(colors.slate)
       .text(
         "Book a discovery call to discuss implementing these fixes with AI-powered automation.",
         LEFT, y, { align: "center", width: FULL_WIDTH }
       );
    y += 22;
    doc.fontSize(10).fillColor(colors.primary)
       .text(
         "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi",
         LEFT, y,
         { align: "center", width: FULL_WIDTH, link: "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi", underline: true }
       );

    doc.end();
  });
}
