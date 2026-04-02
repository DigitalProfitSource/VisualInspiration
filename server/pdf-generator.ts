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

function drawBar(
  doc: InstanceType<typeof PDFDocument>,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void {
  doc.rect(x, y, w, h).fill(color);
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
      coral: "#c0504d",
    };

    // ── Header bar ────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(colors.dark);
    doc.fontSize(22).fillColor(colors.white).text("SimpleSequence", LEFT, 28);
    doc.fontSize(10).fillColor(colors.cyan).text("Sequential Revenue Friction Analysis", LEFT, 55);
    doc.fontSize(9).fillColor(colors.slate).text(
      `Generated: ${data.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      400, 55, { align: "right" }
    );

    let y = 108;

    // ── Executive Summary ─────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Executive Summary", colors.dark);
    const fn = data.result.financialNarrative;
    const bm = data.result.industryBenchmark ?? {
      industryLabel: "service businesses",
      captureNote: "Response time reduced from 12+ hours to under 5 minutes",
      convertNote: "Lead follow-up rate improved from 31% to 89% (+187%)",
      compoundNote: "Dormant lead reactivation recovered 8-12% of old contacts at near-zero cost",
    };

    const pillarScores = [
      { name: "Capture", score: data.result.captureScore.score },
      { name: "Convert", score: data.result.convertScore.score },
      { name: "Compound", score: data.result.compoundScore.score },
    ];
    const weakest = [...pillarScores].sort((a, b) => a.score - b.score)[0];

    const summaryText =
      `This analysis maps friction across your three revenue pillars -- Capture, Convert, and Compound -- ` +
      `based on the operational data you provided. We identified a total monthly revenue gap of ` +
      `$${data.result.totalMonthlyGap.toLocaleString()}, which translates to $${data.result.annualizedGap.toLocaleString()} ` +
      `in annual revenue currently slipping through operational gaps. Your biggest drag is in ` +
      `${weakest.name} (score: ${weakest.score}/100). Below is the full breakdown -- what's leaking, ` +
      `what it costs, and a 30-day plan to close the gap.`;

    y = checkY(doc, y, 60);
    doc.fontSize(10).fillColor(colors.dark).text(summaryText, LEFT, y, { width: FULL_WIDTH });
    y += doc.heightOfString(summaryText, { width: FULL_WIDTH }) + 16;

    // ── Business Profile ───────────────────────────────────────────────────────
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

    // ── Primary Friction Points ────────────────────────────────────────────────
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

    // ── Revenue Snapshot (bar chart as colored rectangles) ────────────────────
    if (fn && fn.currentAnnualRevenue > 0) {
      y = checkY(doc, y, 120);
      y = sectionHeading(doc, y, "Revenue Snapshot: Current vs. Potential", colors.dark);

      doc.fontSize(9).fillColor(colors.slate)
         .text("Conservative projection: capturing 50% of identified monthly gap.", LEFT, y);
      y += 14;

      const maxVal = Math.max(fn.currentAnnualRevenue, fn.potentialAnnualRevenue, 1);
      const chartMaxH = 60;
      const barW = (FULL_WIDTH / 2) - 20;

      const currentH = Math.round((fn.currentAnnualRevenue / maxVal) * chartMaxH);
      const potentialH = Math.round((fn.potentialAnnualRevenue / maxVal) * chartMaxH);
      const chartBaseY = y + chartMaxH + 10;

      drawBar(doc, LEFT, chartBaseY - currentH, barW, currentH, "#334155");
      drawBar(doc, LEFT + barW + 20, chartBaseY - potentialH, barW, potentialH, colors.cyan);

      y = chartBaseY + 4;
      doc.fontSize(9).fillColor(colors.slate).text("Current Annual Revenue", LEFT, y, { width: barW, align: "center" });
      doc.fontSize(9).fillColor(colors.slate).text("Potential w/ System (Conservative)", LEFT + barW + 20, y, { width: barW, align: "center" });
      y += 12;
      doc.fontSize(10).fillColor(colors.dark)
         .text(`$${fn.currentAnnualRevenue.toLocaleString()}`, LEFT, y, { width: barW, align: "center" });
      doc.fontSize(10).fillColor(colors.primary)
         .text(`$${fn.potentialAnnualRevenue.toLocaleString()}`, LEFT + barW + 20, y, { width: barW, align: "center" });
      y += 18;
      doc.fontSize(9).fillColor(colors.primary)
         .text(`Conservative annual gain: +$${fn.conservativeAnnualGain.toLocaleString()}`, LEFT, y, { align: "center", width: FULL_WIDTH });
      y += 18;
    }

    // ── Pillar Breakdown ──────────────────────────────────────────────────────
    y = sectionHeading(doc, y, "Pillar Breakdown", colors.dark);

    const pillarDefs = [
      {
        name: "Capture",
        color: colors.teal,
        pillar: data.result.captureScore,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.captureNote}.`,
      },
      {
        name: "Convert",
        color: colors.amber,
        pillar: data.result.convertScore,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.convertNote}.`,
      },
      {
        name: "Compound",
        color: colors.primary,
        pillar: data.result.compoundScore,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.compoundNote}.`,
      },
    ];

    for (const { name, color, pillar, benchmarkNote } of pillarDefs) {
      y = checkY(doc, y, 100);

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

      y = checkY(doc, y, 16);
      doc.fontSize(8).fillColor(colors.slate)
         .text("[i] " + benchmarkNote, LEFT + 12, y, { width: FULL_WIDTH - 20 });
      y += doc.heightOfString("[i] " + benchmarkNote, { width: FULL_WIDTH - 20 }) + 10;
    }

    // ── Scenario Analysis ─────────────────────────────────────────────────────
    if (fn) {
      y = checkY(doc, y, 130);
      y = sectionHeading(doc, y, "What Closing the Gap Looks Like", colors.dark);

      doc.fontSize(9).fillColor(colors.slate)
         .text("Conservative scenario = 50% gap recovery. Full = 100%.", LEFT, y);
      y += 14;

      const colW = FULL_WIDTH / 4;
      const headers = ["Metric", "Current State", "Conservative (50%)", "Full Recovery (100%)"];
      const rows = [
        ["Monthly Revenue", `$${fn.currentMonthlyRevenue.toLocaleString()}`, `$${(fn.currentMonthlyRevenue + fn.conservativeMonthlyRecovery).toLocaleString()}`, `$${(fn.currentMonthlyRevenue + fn.fullMonthlyRecovery).toLocaleString()}`],
        ["Additional Monthly", "—", `+$${fn.conservativeMonthlyRecovery.toLocaleString()}`, `+$${fn.fullMonthlyRecovery.toLocaleString()}`],
        ["Additional Annual", "—", `+$${fn.conservativeAnnualGain.toLocaleString()}`, `+$${fn.fullAnnualGain.toLocaleString()}`],
      ];

      y = checkY(doc, y, 18);
      doc.rect(LEFT, y, FULL_WIDTH, 18).fill("#f0fdfa");
      headers.forEach((h, i) => {
        doc.fontSize(8).fillColor(colors.teal).text(h, LEFT + i * colW, y + 4, { width: colW - 4 });
      });
      y += 20;

      for (const row of rows) {
        y = checkY(doc, y, 18);
        row.forEach((cell, i) => {
          doc.fontSize(9).fillColor(i === 0 ? colors.slate : i === 1 ? colors.dark : colors.primary)
             .text(cell, LEFT + i * colW, y + 3, { width: colW - 4 });
        });
        y += 16;
      }
      y += 10;
    }

    // ── 12-Month Cumulative Gain Chart ────────────────────────────────────────
    if (fn && fn.cumulativeGainByMonth.length === 12 && fn.conservativeMonthlyRecovery > 0) {
      y = checkY(doc, y, 110);
      y = sectionHeading(doc, y, "12-Month Projected Cumulative Gain (Conservative)", colors.dark);

      const chartH = 60;
      const maxCumulative = fn.cumulativeGainByMonth[11] || 1;
      const barW12 = Math.floor((FULL_WIDTH - 12) / 12);
      const chartBaseY = y + chartH;

      fn.cumulativeGainByMonth.forEach((v, i) => {
        const h = Math.max(2, Math.round((v / maxCumulative) * chartH));
        drawBar(doc, LEFT + i * barW12 + 1, chartBaseY - h, barW12 - 2, h, colors.cyan);
      });

      doc.fontSize(8).fillColor(colors.slate)
         .text("M1", LEFT, chartBaseY + 4)
         .text("M12", LEFT + FULL_WIDTH - 20, chartBaseY + 4);
      doc.fontSize(9).fillColor(colors.primary)
         .text(`Total: $${fn.conservativeAnnualGain.toLocaleString()}`, LEFT, chartBaseY + 4, { align: "right", width: FULL_WIDTH });
      y = chartBaseY + 20;
    }

    // ── Cost of Inaction ──────────────────────────────────────────────────────
    if (fn) {
      y = checkY(doc, y, 140);
      y = sectionHeading(doc, y, "The Cost of Inaction", colors.dark);

      doc.rect(LEFT, y, FULL_WIDTH, 48).fill(colors.coral + "15");
      doc.rect(LEFT, y, FULL_WIDTH, 48).stroke(colors.coral);
      doc.fontSize(10).fillColor(colors.slate).text("Every day this gap stays open costs", LEFT + 10, y + 8);
      doc.fontSize(20).fillColor(colors.coral)
         .text(`$${fn.dailyCostOfInaction.toLocaleString()}`, LEFT + 10, y + 22);
      y += 58;

      doc.fontSize(9).fillColor(colors.slate)
         .text("Cumulative revenue left on the table if nothing changes:", LEFT, y);
      y += 14;

      const inactionCols = [
        ["6 Months", `$${fn.sixMonthInactionCost.toLocaleString()}`],
        ["12 Months", `$${fn.twelveMonthInactionCost.toLocaleString()}`],
        ["3 Years", `$${fn.threeYearInactionCost.toLocaleString()}`],
      ];
      const inactionW = FULL_WIDTH / 3;
      y = checkY(doc, y, 40);
      inactionCols.forEach(([label, value], i) => {
        doc.rect(LEFT + i * inactionW, y, inactionW - 4, 36).fill(colors.coral + "10");
        doc.fontSize(8).fillColor(colors.slate).text(label, LEFT + i * inactionW + 6, y + 5);
        doc.fontSize(12).fillColor(colors.coral).text(value, LEFT + i * inactionW + 6, y + 17);
      });
      y += 46;
    }

    // ── Long-Term Compounding Returns ─────────────────────────────────────────
    if (fn) {
      y = checkY(doc, y, 100);
      y = sectionHeading(doc, y, "Long-Term Compounding Returns", colors.dark);

      doc.fontSize(9).fillColor(colors.slate)
         .text("Year 1 at conservative (50% gap), Years 2+ at full gap recovery.", LEFT, y);
      y += 14;

      const projRows = [
        ["Year 1", `$${fn.yearOneGain.toLocaleString()}`, "Conservative (50% gap)"],
        ["Year 3", `$${fn.yearThreeGain.toLocaleString()}`, "Yr 1 conservative, then full"],
        ["Year 5", `$${fn.yearFiveGain.toLocaleString()}`, "Yr 1 conservative, then full"],
      ];

      const pColW = [80, 130, FULL_WIDTH - 80 - 130];
      y = checkY(doc, y, 18);
      doc.rect(LEFT, y, FULL_WIDTH, 18).fill("#f0fdfa");
      ["Timeframe", "Projected Gain", "Scenario Basis"].forEach((h, i) => {
        doc.fontSize(8).fillColor(colors.teal)
           .text(h, LEFT + (i === 0 ? 0 : i === 1 ? pColW[0] : pColW[0] + pColW[1]), y + 4, { width: pColW[i] });
      });
      y += 20;

      for (const [timeframe, gain, basis] of projRows) {
        y = checkY(doc, y, 18);
        doc.fontSize(10).fillColor(colors.dark).text(timeframe, LEFT, y + 2, { width: pColW[0] });
        doc.fontSize(10).fillColor(colors.primary).text(gain, LEFT + pColW[0], y + 2, { width: pColW[1] });
        doc.fontSize(8).fillColor(colors.slate).text(basis, LEFT + pColW[0] + pColW[1], y + 3, { width: pColW[2] });
        y += 16;
      }
      y += 10;
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
       .text(`${data.result.recommendedTier}`, LEFT + 10, y + 30, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(9).fillColor(colors.slate)
       .text(data.result.tierReason, LEFT + 20, y + 62, { align: "center", width: FULL_WIDTH - 40 });
    y += 118;

    // ── Tier Comparison (no pricing) ──────────────────────────────────────────
    y = sectionHeading(doc, y, "Tier Comparison", colors.dark);

    const tiers = [
      {
        name:     "The AI Brain",
        focus:    "Capture pillar — speed-to-lead and 24/7 AI availability",
        ideal:    "Lead capture and response speed are your primary friction point",
        includes: ["24/7 Website AI Chatbot", "AI Voice Backup Receptionist"],
      },
      {
        name:     "The AI System",
        focus:    "Capture + Convert pillars",
        ideal:    "Follow-up, no-show recovery, and pipeline drag are costing you",
        includes: ["Everything in The AI Brain", "Proactive Quote / No-Show Recovery"],
      },
      {
        name:     "The AI Infrastructure",
        focus:    "Full Loop -- all three pillars",
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
      doc.fontSize(8).fillColor(colors.primary)
         .text("Discuss fit & investment: simplesequence.ai/book", LEFT + 10, y + 60, { width: FULL_WIDTH - 20 });

      let ix = y + 72;
      for (const item of tier.includes.slice(0, 1)) {
        doc.fontSize(8).fillColor(colors.slate).text("  " + item, LEFT + 14, ix);
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
         "Book your 15-minute strategy call to discuss implementing these fixes with AI-powered automation.",
         LEFT, y, { align: "center", width: FULL_WIDTH }
       );
    y += 22;
    doc.fontSize(10).fillColor(colors.primary)
       .text(
         "simplesequence.ai/book",
         LEFT, y,
         { align: "center", width: FULL_WIDTH, link: "https://simplesequence.ai/book", underline: true }
       );

    doc.end();
  });
}
