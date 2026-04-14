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

function sectionLabel(
  doc: InstanceType<typeof PDFDocument>,
  y: number,
  text: string,
): number {
  y = checkY(doc, y, 30);
  doc.fontSize(8).fillColor("#0891b2")
     .text(text.toUpperCase(), LEFT, y, { characterSpacing: 1.5 });
  return y + 16;
}

function sectionHeading(
  doc: InstanceType<typeof PDFDocument>,
  y: number,
  text: string,
  color: string,
  size = 14,
): number {
  y = checkY(doc, y, size + 20);
  doc.fontSize(size).fillColor(color).text(text, LEFT, y);
  return y + size + 8;
}

function drawBar(
  doc: InstanceType<typeof PDFDocument>,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void {
  doc.rect(x, y, w, h).fill(color);
}

function dividerLine(doc: InstanceType<typeof PDFDocument>, y: number): number {
  doc.moveTo(LEFT, y).lineTo(LEFT + FULL_WIDTH, y).strokeColor("#1a2332").lineWidth(0.5).stroke();
  return y + 10;
}

export async function generateAssessmentPDF(data: PDFGeneratorData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margin: LEFT,
      bufferPages: true,
      info: {
        Title: `Sequential Revenue Friction Analysis — ${data.result.businessName}`,
        Author: "SimpleSequence",
        Subject: "Sequential Revenue Friction Analysis Report",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: PDFChunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const C = {
      primary: "#0891b2",
      cyan: "#22d3ee",
      teal: "#14b8a6",
      dark: "#18181b",
      slate: "#64748b",
      white: "#ffffff",
      lightTeal: "#f0fdfa",
      coral: "#c0504d",
      lightCoral: "#fdf0ef",
      bg: "#f8fafc",
    };

    const fn = data.result.financialNarrative;
    const bm = data.result.industryBenchmark ?? {
      industryLabel: "service businesses",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth month over month",
    };

    const pillarScores = [
      { name: "Capture", score: data.result.captureScore.score },
      { name: "Convert", score: data.result.convertScore.score },
      { name: "Compound", score: data.result.compoundScore.score },
    ];
    const weakest = [...pillarScores].sort((a, b) => a.score - b.score)[0];
    const weakestByGap = [
      { name: "Capture", gap: data.result.gapBreakdown.captureGap },
      { name: "Convert", gap: data.result.gapBreakdown.convertGap },
      { name: "Compound", gap: data.result.gapBreakdown.compoundGap },
    ].sort((a, b) => b.gap - a.gap)[0];

    // ── Header bar ────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(C.dark);
    doc.fontSize(22).fillColor(C.white).text("SimpleSequence", LEFT, 22);
    doc.fontSize(11).fillColor(C.cyan).text("Sequential Revenue™ Friction Analysis", LEFT, 50);
    doc.fontSize(9).fillColor(C.slate).text(
      `Generated: ${data.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      LEFT + FULL_WIDTH - 100, 50,
    );

    let y = 108;

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 1 — EXECUTIVE SUMMARY
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 1 — Executive Summary");

    const gapRangeSuffix =
      data.result.gapBreakdown.totalLow > 0 && data.result.gapBreakdown.totalHigh > 0
        ? ` (range: $${data.result.gapBreakdown.totalLow.toLocaleString()}–$${data.result.gapBreakdown.totalHigh.toLocaleString()}, ±${Math.round((data.result.gapBreakdown.confidenceBand ?? 0.25) * 100)}% confidence)`
        : "";

    const summaryText =
      `This analysis maps friction across your three revenue pillars — Capture, Convert, and Compound — ` +
      `based on the operational data provided by ${data.contactName}. We identified a total monthly ` +
      `revenue gap of $${data.result.totalMonthlyGap.toLocaleString()}${gapRangeSuffix}, translating to ` +
      `$${data.result.annualizedGap.toLocaleString()} in annual revenue currently slipping through ` +
      `operational gaps. Your biggest drag is in ${weakest.name} (score: ${weakest.score}/100). ` +
      `Below is the full breakdown — what's leaking, what it costs, and what closing even half the gap looks like.`;

    doc.fontSize(10).fillColor(C.dark).text(summaryText, LEFT, y, { width: FULL_WIDTH });
    y += doc.heightOfString(summaryText, { width: FULL_WIDTH }) + 12;

    // User pain echo — quotes their top revenue pain directly
    if (data.result.userPainPoints?.topPain) {
      const painBoxH = 42;
      y = checkY(doc, y, painBoxH + 10);
      doc.rect(LEFT, y, FULL_WIDTH, painBoxH).fill(C.lightTeal);
      doc.fontSize(8).fillColor(C.teal)
         .text("WHAT YOU TOLD US", LEFT + 10, y + 8, { characterSpacing: 1.5 });
      const painText = `You flagged "${data.result.userPainPoints.topPain.value}" as your most painful friction point (severity ${data.result.userPainPoints.topPain.severity}/5). The analysis below is ordered to address that pillar first.`;
      doc.fontSize(9).fillColor(C.dark)
         .text(painText, LEFT + 10, y + 20, { width: FULL_WIDTH - 20 });
      y += painBoxH + 8;
    }

    // Data coherence warning — when user's inputs contradict each other
    if (data.result.inputCoherence && !data.result.inputCoherence.consistent && data.result.inputCoherence.warning) {
      const warnH = doc.heightOfString(data.result.inputCoherence.warning, { width: FULL_WIDTH - 20 }) + 30;
      y = checkY(doc, y, warnH + 10);
      doc.rect(LEFT, y, FULL_WIDTH, warnH).fill(C.lightCoral);
      doc.rect(LEFT, y, 3, warnH).fill(C.coral);
      doc.fontSize(8).fillColor(C.coral)
         .text("DATA COHERENCE CHECK", LEFT + 10, y + 8, { characterSpacing: 1.5 });
      doc.fontSize(9).fillColor(C.dark)
         .text(data.result.inputCoherence.warning, LEFT + 10, y + 20, { width: FULL_WIDTH - 20 });
      y += warnH + 8;
    }

    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 2 — BUSINESS AT A GLANCE
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 2 — Business At A Glance");

    const glanceItems: [string, string][] = [
      ["Company",        data.result.businessName || "—"],
      ["Contact",        `${data.contactName}  |  ${data.contactEmail}`],
      ["Industry",       data.result.industry],
      ["Specialization", data.result.niche || "General"],
      ["Team Size",      data.result.teamSize],
      ["Monthly Leads",  String(data.result.monthlyLeads)],
      ["Avg Job Value",  `$${data.result.avgJobValue.toLocaleString()}`],
      ["Close Rate",     `${Math.round(data.result.closeRate * 100)}%`],
      ...(data.result.adSpend > 0 ? [["Monthly Ad Spend", `$${data.result.adSpend.toLocaleString()}/mo`] as [string, string]] : []),
      ...(data.result.monthlySalesVolume > 0 ? [["Monthly Job Volume", `${data.result.monthlySalesVolume} jobs/mo`] as [string, string]] : []),
      ...(data.websiteUrl ? [["Website", data.websiteUrl] as [string, string]] : []),
    ];

    const halfW = FULL_WIDTH / 2 - 8;
    let col = 0;
    let rowY = y;
    for (const [label, value] of glanceItems) {
      const x = col === 0 ? LEFT : LEFT + FULL_WIDTH / 2 + 8;
      rowY = checkY(doc, rowY, 18);
      doc.fontSize(8).fillColor(C.slate).text(label + ":", x, rowY, { width: halfW });
      doc.fontSize(9).fillColor(C.dark).text(value, x + 90, rowY, { width: halfW - 90 });
      if (col === 1) { rowY += 16; col = 0; } else col = 1;
    }
    if (col === 1) rowY += 16;
    y = rowY + 12;
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 3 — TOTAL IMPACT
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 3 — Total Impact");

    y = checkY(doc, y, 90);
    doc.rect(LEFT, y, FULL_WIDTH, 80).fill(C.lightTeal);
    doc.fontSize(10).fillColor(C.teal)
       .text("SEQUENTIAL REVENUE SCORE", LEFT + 10, y + 10, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(30).fillColor(C.primary)
       .text(`${data.result.overallScore}/100`, LEFT + 10, y + 24, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(9).fillColor(C.slate)
       .text(
         `Capture: ${data.result.captureScore.score}   |   Convert: ${data.result.convertScore.score}   |   Compound: ${data.result.compoundScore.score}`,
         LEFT + 10, y + 58, { align: "center", width: FULL_WIDTH - 20 },
       );
    y += 90;

    // Gap breakdown below score box
    const gb = data.result.gapBreakdown;
    const totalRangeSub =
      gb.totalLow > 0 && gb.totalHigh > 0
        ? `$${gb.totalLow.toLocaleString()}–$${gb.totalHigh.toLocaleString()}`
        : "";
    const gapCols = [
      { label: "Total Monthly Gap", val: `$${data.result.totalMonthlyGap.toLocaleString()}`, sub: totalRangeSub },
      { label: "Annualized", val: `$${data.result.annualizedGap.toLocaleString()}`, sub: "" },
      { label: "Biggest Pillar Gap", val: `${weakestByGap.name} ($${weakestByGap.gap.toLocaleString()}/mo)`, sub: "" },
    ];
    const gcW = FULL_WIDTH / 3;
    y = checkY(doc, y, 48);
    gapCols.forEach((g, i) => {
      doc.fontSize(8).fillColor(C.slate).text(g.label, LEFT + i * gcW, y, { width: gcW });
      doc.fontSize(11).fillColor(C.primary).text(g.val, LEFT + i * gcW, y + 14, { width: gcW });
      if (g.sub) {
        doc.fontSize(7).fillColor(C.slate).text(g.sub, LEFT + i * gcW, y + 30, { width: gcW });
      }
    });
    y += 48;
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 4 — REVENUE SNAPSHOT
    // ────────────────────────────────────────────────────────────────────────
    if (fn && fn.currentAnnualRevenue > 0) {
      y = sectionLabel(doc, y, "Section 4 — Revenue Snapshot: Current vs. Potential");
      doc.fontSize(9).fillColor(C.slate)
         .text("Conservative projection: capturing 50% of identified monthly gap.", LEFT, y);
      y += 14;

      const maxVal = Math.max(fn.currentAnnualRevenue, fn.potentialAnnualRevenue, 1);
      const chartMaxH = 55;
      const barW = (FULL_WIDTH / 2) - 20;
      const currentH = Math.max(4, Math.round((fn.currentAnnualRevenue / maxVal) * chartMaxH));
      const potentialH = Math.max(4, Math.round((fn.potentialAnnualRevenue / maxVal) * chartMaxH));
      const chartBaseY = y + chartMaxH + 8;

      y = checkY(doc, y, chartMaxH + 50);
      drawBar(doc, LEFT, chartBaseY - currentH, barW, currentH, "#334155");
      drawBar(doc, LEFT + barW + 20, chartBaseY - potentialH, barW, potentialH, C.cyan);

      doc.fontSize(9).fillColor(C.slate).text("Current Annual Revenue", LEFT, chartBaseY + 4, { width: barW, align: "center" });
      doc.fontSize(9).fillColor(C.slate).text("Potential w/ System (Conservative)", LEFT + barW + 20, chartBaseY + 4, { width: barW, align: "center" });
      doc.fontSize(10).fillColor(C.dark).text(`$${fn.currentAnnualRevenue.toLocaleString()}`, LEFT, chartBaseY + 16, { width: barW, align: "center" });
      doc.fontSize(10).fillColor(C.primary).text(`$${fn.potentialAnnualRevenue.toLocaleString()}`, LEFT + barW + 20, chartBaseY + 16, { width: barW, align: "center" });
      doc.fontSize(9).fillColor(C.primary)
         .text(`Conservative annual gain: +$${fn.conservativeAnnualGain.toLocaleString()}`, LEFT, chartBaseY + 30, { align: "center", width: FULL_WIDTH });
      y = chartBaseY + 46;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 5 — GAP ANALYSIS (PILLAR BREAKDOWN)
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 5 — Gap Analysis");

    const pillarDefs = [
      {
        name: "Capture",
        color: C.teal,
        pillar: data.result.captureScore,
        gap: data.result.gapBreakdown.captureGap,
        gapLow: data.result.gapBreakdown.captureGapLow,
        gapHigh: data.result.gapBreakdown.captureGapHigh,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.captureStats}.`,
      },
      {
        name: "Convert",
        color: C.coral,
        pillar: data.result.convertScore,
        gap: data.result.gapBreakdown.convertGap,
        gapLow: data.result.gapBreakdown.convertGapLow,
        gapHigh: data.result.gapBreakdown.convertGapHigh,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.conversionStats}.`,
      },
      {
        name: "Compound",
        color: C.primary,
        pillar: data.result.compoundScore,
        gap: data.result.gapBreakdown.compoundGap,
        gapLow: data.result.gapBreakdown.compoundGapLow,
        gapHigh: data.result.gapBreakdown.compoundGapHigh,
        benchmarkNote: `Among ${bm.industryLabel}: ${bm.compoundStats}.`,
      },
    ];

    for (const { name, color, pillar, gap, gapLow, gapHigh, benchmarkNote } of pillarDefs) {
      y = checkY(doc, y, 100);

      // Pillar header bar
      doc.rect(LEFT, y, FULL_WIDTH, 20).fill(color + "22");
      doc.fontSize(11).fillColor(color).text(name + `  (score: ${pillar.score}/100)`, LEFT + 8, y + 4);
      doc.fontSize(10).fillColor(color).text(`~$${gap.toLocaleString()}/mo gap`, LEFT + 8, y + 4, { align: "right", width: FULL_WIDTH - 16 });
      y += 24;

      // Per-pillar confidence range
      if (gapLow > 0 && gapHigh > 0) {
        doc.fontSize(8).fillColor(C.slate)
           .text(`Range: $${gapLow.toLocaleString()}–$${gapHigh.toLocaleString()}/mo`, LEFT + 10, y, { width: FULL_WIDTH - 20 });
        y += 12;
      }

      // Findings
      doc.fontSize(9).fillColor(C.slate);
      for (const finding of pillar.findings.slice(0, 3)) {
        y = checkY(doc, y, 16);
        doc.text("  " + finding, LEFT + 10, y, { width: FULL_WIDTH - 20 });
        y += 14;
      }

      // Found Money callout — Compounding pillar only
      if (name === "Compound" && fn && fn.foundMoneyPotential > 0) {
        y = checkY(doc, y, 36);
        doc.rect(LEFT + 10, y, FULL_WIDTH - 20, 30).fill(C.cyan + "15");
        doc.fontSize(8).fillColor(C.primary)
           .text("FOUND MONEY POTENTIAL (one-time DBR campaign)", LEFT + 16, y + 5, { width: FULL_WIDTH - 32 });
        doc.fontSize(9).fillColor(C.dark)
           .text(`~$${fn.foundMoneyPotential.toLocaleString()} — one-time campaign value on your existing database. Not a monthly figure.`, LEFT + 16, y + 17, { width: FULL_WIDTH - 32 });
        y += 38;
      }

      // Benchmark callout
      y = checkY(doc, y, 20);
      doc.fontSize(8).fillColor("#0891b2")
         .text("[Industry benchmark] " + benchmarkNote, LEFT + 10, y, { width: FULL_WIDTH - 20 });
      y += doc.heightOfString("[Industry benchmark] " + benchmarkNote, { width: FULL_WIDTH - 20 }) + 12;
    }
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 6 — SCENARIO ANALYSIS
    // ────────────────────────────────────────────────────────────────────────
    if (fn) {
      y = sectionLabel(doc, y, "Section 6 — Scenario Analysis");
      doc.fontSize(9).fillColor(C.slate).text("Conservative = 50% gap recovery. Full = 100%.", LEFT, y);
      y += 14;

      const colW = FULL_WIDTH / 4;
      const headers = ["Metric", "Current State", "Conservative (50%)", "Full Recovery (100%)"];
      const rows = [
        ["Monthly Revenue", `$${fn.currentMonthlyRevenue.toLocaleString()}`, `$${(fn.currentMonthlyRevenue + fn.conservativeMonthlyRecovery).toLocaleString()}`, `$${(fn.currentMonthlyRevenue + fn.fullMonthlyRecovery).toLocaleString()}`],
        ["Additional Monthly", "—", `+$${fn.conservativeMonthlyRecovery.toLocaleString()}`, `+$${fn.fullMonthlyRecovery.toLocaleString()}`],
        ["Additional Annual", "—", `+$${fn.conservativeAnnualGain.toLocaleString()}`, `+$${fn.fullAnnualGain.toLocaleString()}`],
      ];

      y = checkY(doc, y, 18);
      doc.rect(LEFT, y, FULL_WIDTH, 16).fill(C.lightTeal);
      headers.forEach((h, i) => {
        doc.fontSize(8).fillColor(C.teal).text(h, LEFT + i * colW, y + 3, { width: colW - 4 });
      });
      y += 18;

      for (const row of rows) {
        y = checkY(doc, y, 16);
        row.forEach((cell, i) => {
          doc.fontSize(9).fillColor(i === 0 ? C.slate : i === 1 ? C.dark : C.primary)
             .text(cell, LEFT + i * colW, y + 2, { width: colW - 4 });
        });
        y += 14;
      }
      y += 8;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 7 — 12-MONTH CUMULATIVE GAIN
    // ────────────────────────────────────────────────────────────────────────
    if (fn && fn.cumulativeGainByMonth.length === 12 && fn.conservativeMonthlyRecovery > 0) {
      y = sectionLabel(doc, y, "Section 7 — 12-Month Projected Cumulative Gain (Conservative)");

      const chartH = 55;
      const maxCumulative = fn.cumulativeGainByMonth[11] || 1;
      const barW12 = Math.floor((FULL_WIDTH - 12) / 12);
      const chartBaseY = y + chartH;

      y = checkY(doc, y, chartH + 30);
      fn.cumulativeGainByMonth.forEach((v, i) => {
        const h = Math.max(2, Math.round((v / maxCumulative) * chartH));
        drawBar(doc, LEFT + i * barW12 + 1, chartBaseY - h, barW12 - 2, h, C.cyan);
      });

      doc.fontSize(8).fillColor(C.slate).text("Month 1", LEFT, chartBaseY + 4);
      doc.fontSize(8).fillColor(C.slate).text("Month 12", LEFT + FULL_WIDTH - 40, chartBaseY + 4);
      doc.fontSize(9).fillColor(C.primary)
         .text(`12-month total: $${fn.conservativeAnnualGain.toLocaleString()}`, LEFT, chartBaseY + 4, { align: "right", width: FULL_WIDTH });
      y = chartBaseY + 22;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 8 — COST OF INACTION
    // ────────────────────────────────────────────────────────────────────────
    if (fn) {
      y = sectionLabel(doc, y, "Section 8 — Cost of Inaction");

      y = checkY(doc, y, 50);
      doc.rect(LEFT, y, FULL_WIDTH, 42).fill(C.coral + "15");
      doc.fontSize(10).fillColor(C.slate).text("Every day this gap stays open costs:", LEFT + 10, y + 8);
      doc.fontSize(18).fillColor(C.coral).text(`$${fn.dailyCostOfInaction.toLocaleString()}/day`, LEFT + 10, y + 22);
      doc.fontSize(9).fillColor(C.slate)
         .text(`($${fn.totalMonthlyGap.toLocaleString()}/month)`, LEFT + 200, y + 26);
      y += 52;

      const inactionW = FULL_WIDTH / 3;
      const inactionItems = [
        { label: "6 Months", value: `$${fn.sixMonthInactionCost.toLocaleString()}` },
        { label: "12 Months", value: `$${fn.twelveMonthInactionCost.toLocaleString()}` },
        { label: "3 Years",  value: `$${fn.threeYearInactionCost.toLocaleString()}` },
      ];
      y = checkY(doc, y, 40);
      inactionItems.forEach(({ label, value }, i) => {
        doc.rect(LEFT + i * inactionW, y, inactionW - 4, 34).fill(C.coral + "10");
        doc.fontSize(8).fillColor(C.slate).text(label, LEFT + i * inactionW + 6, y + 5);
        doc.fontSize(12).fillColor(C.coral).text(value, LEFT + i * inactionW + 6, y + 17);
      });
      y += 44;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 9 — LONG-TERM PROJECTIONS
    // ────────────────────────────────────────────────────────────────────────
    if (fn) {
      y = sectionLabel(doc, y, "Section 9 — Long-Term Compounding Returns");
      doc.fontSize(9).fillColor(C.slate)
         .text("Year 1 at conservative (50% gap); Years 2+ at full gap recovery as systems optimize.", LEFT, y);
      y += 14;

      const pColW = [80, 140, FULL_WIDTH - 80 - 140];
      y = checkY(doc, y, 16);
      doc.rect(LEFT, y, FULL_WIDTH, 16).fill(C.lightTeal);
      ["Timeframe", "Projected Gain", "Scenario Basis"].forEach((h, i) => {
        const xPos = LEFT + (i === 0 ? 0 : i === 1 ? pColW[0] : pColW[0] + pColW[1]);
        doc.fontSize(8).fillColor(C.teal).text(h, xPos, y + 3, { width: pColW[i] });
      });
      y += 18;

      for (const [timeframe, gain, basis] of [
        ["Year 1", `$${fn.yearOneGain.toLocaleString()}`,   "Conservative (50% gap)"],
        ["Year 3", `$${fn.yearThreeGain.toLocaleString()}`, "Yr 1 conservative, then full"],
        ["Year 5", `$${fn.yearFiveGain.toLocaleString()}`,  "Yr 1 conservative, then full"],
      ]) {
        y = checkY(doc, y, 16);
        doc.fontSize(10).fillColor(C.dark).text(timeframe, LEFT, y + 2, { width: pColW[0] });
        doc.fontSize(10).fillColor(C.primary).text(gain, LEFT + pColW[0], y + 2, { width: pColW[1] });
        doc.fontSize(8).fillColor(C.slate).text(basis, LEFT + pColW[0] + pColW[1], y + 3, { width: pColW[2] });
        y += 14;
      }
      y += 4;
      y = checkY(doc, y, 16);
      doc.fontSize(8).fillColor(C.slate)
         .text("Year 3+ projections assume the system matures to full gap recovery as AI is optimized and the review flywheel compounds.", LEFT, y, { width: FULL_WIDTH });
      y += doc.heightOfString("Year 3+ projections assume the system matures to full gap recovery as AI is optimized and the review flywheel compounds.", { width: FULL_WIDTH }) + 10;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 10 — BLINDSPOTS
    // ────────────────────────────────────────────────────────────────────────
    if (data.result.blindspots.length > 0) {
      y = sectionLabel(doc, y, "Section 10 — Your Blindspots");
      doc.fontSize(9).fillColor(C.slate);
      for (const blindspot of data.result.blindspots.slice(0, 6)) {
        y = checkY(doc, y, 24);
        doc.text("[!] " + blindspot, LEFT + 10, y, { width: FULL_WIDTH - 20 });
        y += 20;
      }
      y += 6;
      y = dividerLine(doc, y);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 11 — 30-DAY ACTION PLAN
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 11 — Your 30-Day Action Plan");
    doc.fontSize(11).fillColor(C.teal).text("Quick Wins  (first 7–14 days)", LEFT, y);
    y += 16;
    doc.fontSize(9).fillColor(C.slate);
    for (const action of data.result.actionPlan.quickWins) {
      y = checkY(doc, y, 24);
      doc.text("[+] " + action, LEFT + 10, y, { width: FULL_WIDTH - 20 });
      y += 20;
    }

    y += 6;
    doc.fontSize(11).fillColor(C.coral).text("Supporting Actions  (rest of 30 days)", LEFT, y);
    y += 16;
    doc.fontSize(9).fillColor(C.slate);
    for (const action of data.result.actionPlan.supportingActions) {
      y = checkY(doc, y, 24);
      doc.text([">"] + "  " + action, LEFT + 10, y, { width: FULL_WIDTH - 20 });
      y += 20;
    }
    y += 8;
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 12 — DIY REALITY CHECK
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 12 — The Reality of DIY Implementation");
    doc.fontSize(9).fillColor(C.slate)
       .text("Most businesses intend to implement these fixes but rarely finish them on their own.", LEFT, y, { width: FULL_WIDTH });
    y += 16;

    const diyItems = [
      { title: "Time Investment", detail: "15–30 hrs of setup, testing, and troubleshooting" },
      { title: "Technical Complexity", detail: "API integrations, webhook logic, and ongoing maintenance required" },
      { title: "Ongoing Overhead", detail: "Systems break; monitoring and updates never stop" },
    ];
    const diyW = FULL_WIDTH / 3;
    y = checkY(doc, y, 52);
    diyItems.forEach(({ title, detail }, i) => {
      doc.rect(LEFT + i * diyW, y, diyW - 6, 48).fill("#f0fdfa");
      doc.fontSize(9).fillColor(C.dark).text(title, LEFT + i * diyW + 6, y + 6, { width: diyW - 12 });
      doc.fontSize(8).fillColor(C.slate).text(detail, LEFT + i * diyW + 6, y + 22, { width: diyW - 12 });
    });
    y += 56;
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 13 — TIER RECOMMENDATION
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 13 — Recommended Solution");

    y = checkY(doc, y, 100);
    doc.rect(LEFT, y, FULL_WIDTH, 80).fill(C.primary + "18");
    doc.fontSize(9).fillColor(C.primary)
       .text("RECOMMENDED BASED ON YOUR ANALYSIS", LEFT + 10, y + 10, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(20).fillColor(C.dark)
       .text(data.result.recommendedTier, LEFT + 10, y + 26, { align: "center", width: FULL_WIDTH - 20 });
    doc.fontSize(9).fillColor(C.slate)
       .text(data.result.tierReason, LEFT + 20, y + 52, { align: "center", width: FULL_WIDTH - 40 });
    y += 90;

    const tiers = [
      {
        name: "The AI Brain",
        focus: "Capture pillar — speed-to-lead and 24/7 AI availability",
        ideal: "Lead capture and response speed are your primary friction point",
      },
      {
        name: "The AI System",
        focus: "Capture + Convert pillars",
        ideal: "Follow-up, no-show recovery, and pipeline drag are costing you",
      },
      {
        name: "The AI Infrastructure",
        focus: "Full Loop — all three pillars",
        ideal: "Complex operations or high volume requiring full-system automation",
      },
    ];

    for (const tier of tiers) {
      y = checkY(doc, y, 80);
      const isRec = tier.name === data.result.recommendedTier;
      if (isRec) doc.rect(LEFT, y, FULL_WIDTH, 72).fill(C.cyan + "18");
      doc.rect(LEFT, y, FULL_WIDTH, 72).stroke(isRec ? C.primary : C.slate);

      doc.fontSize(12).fillColor(isRec ? C.primary : C.dark)
         .text(tier.name + (isRec ? "  [Recommended]" : ""), LEFT + 10, y + 10);
      doc.fontSize(9).fillColor(C.slate).text(`Focus: ${tier.focus}`, LEFT + 10, y + 28, { width: FULL_WIDTH - 20 });
      doc.text(`Best for: ${tier.ideal}`, LEFT + 10, y + 42, { width: FULL_WIDTH - 20 });
      doc.fontSize(8).fillColor(C.primary)
         .text("Discuss fit & investment: simplesequence.ai/book", LEFT + 10, y + 58, { width: FULL_WIDTH - 20 });
      y += 80;
    }
    y = dividerLine(doc, y);

    // ────────────────────────────────────────────────────────────────────────
    // SECTION 14 — FINAL CTA
    // ────────────────────────────────────────────────────────────────────────
    y = sectionLabel(doc, y, "Section 14 — Next Steps");
    y = checkY(doc, y, 70);
    doc.fontSize(14).fillColor(C.primary)
       .text("Book Your 15-Minute Strategy Call", LEFT, y, { align: "center", width: FULL_WIDTH });
    y += 22;
    doc.fontSize(10).fillColor(C.slate)
       .text(
         "In 15 minutes, we'll confirm the gaps identified in this report, walk through which tier fits your situation, and give you a clear implementation roadmap — no obligation.",
         LEFT, y, { align: "center", width: FULL_WIDTH },
       );
    y += doc.heightOfString(
      "In 15 minutes, we'll confirm the gaps identified in this report, walk through which tier fits your situation, and give you a clear implementation roadmap — no obligation.",
      { width: FULL_WIDTH },
    ) + 10;
    doc.fontSize(11).fillColor(C.primary)
       .text("simplesequence.ai/book", LEFT, y, {
         align: "center", width: FULL_WIDTH,
         link: "https://simplesequence.ai/book", underline: true,
       });
    y += 20;
    doc.fontSize(9).fillColor(C.slate)
       .text("Or download your analysis and share it with your team at: simplesequence.ai/assessment", LEFT, y, {
         align: "center", width: FULL_WIDTH,
       });

    doc.end();
  });
}
