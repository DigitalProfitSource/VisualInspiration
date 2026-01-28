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

export async function generateAssessmentPDF(data: PDFGeneratorData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margin: 50,
      info: {
        Title: `AI Clarity Assessment - ${data.result.businessName}`,
        Author: "SimpleSequence",
        Subject: "Operational AI Assessment Report",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: PDFChunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const colors = {
      primary: "#0891b2",
      cyan: "#67E8F9",
      teal: "#14b8a6",
      amber: "#f59e0b",
      red: "#ef4444",
      dark: "#18181b",
      slate: "#64748b",
      white: "#ffffff",
    };

    doc.rect(0, 0, doc.page.width, 100).fill(colors.dark);

    doc
      .fontSize(24)
      .fillColor(colors.white)
      .text("SimpleSequence", 50, 35);

    doc
      .fontSize(10)
      .fillColor(colors.cyan)
      .text("AI Clarity Assessment Report", 50, 65);

    doc
      .fontSize(9)
      .fillColor(colors.slate)
      .text(`Generated: ${data.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 400, 65, { align: "right" });

    let y = 120;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Business Profile", 50, y);

    y += 30;

    const profileData = [
      ["Company", data.result.businessName],
      ["Contact", data.contactName],
      ["Email", data.contactEmail],
      ["Phone", data.contactPhone || "Not provided"],
      ["Website", data.websiteUrl || "Not provided"],
      ["Industry", data.result.industry],
      ["Specialization", data.result.niche],
      ["Team Size", data.result.teamSize],
      ["Avg Job Value", `$${data.result.avgJobValue.toLocaleString()}`],
      ["Monthly Leads", String(data.result.monthlyLeads)],
      ["Close Rate", `${Math.round(data.result.closeRate * 100)}%`],
    ];

    doc.fontSize(10);
    for (const [label, value] of profileData) {
      doc.fillColor(colors.slate).text(label + ":", 50, y, { continued: true, width: 120 });
      doc.fillColor(colors.dark).text(" " + value, { width: 400 });
      y += 16;
    }

    y += 20;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Primary Friction Points", 50, y);

    y += 25;

    doc.fontSize(10).fillColor(colors.slate);
    for (const pain of data.revenuePains) {
      doc.text("• " + pain, 60, y);
      y += 16;
    }

    y += 20;

    doc.rect(50, y, 512, 80).fillAndStroke("#f0fdfa", colors.teal);

    doc
      .fontSize(11)
      .fillColor(colors.teal)
      .text("TOTAL MONTHLY REVENUE GAP", 60, y + 12, { align: "center", width: 492 });

    doc
      .fontSize(32)
      .fillColor(colors.primary)
      .text(`$${data.result.totalMonthlyGap.toLocaleString()}/mo`, 60, y + 30, { align: "center", width: 492 });

    doc
      .fontSize(10)
      .fillColor(colors.slate)
      .text(`Annualized: $${data.result.annualizedGap.toLocaleString()}`, 60, y + 65, { align: "center", width: 492 });

    y += 100;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Gap Breakdown", 50, y);

    y += 30;

    const gaps = [
      { name: "Speed Gap", color: colors.teal, gap: data.result.speedGap },
      { name: "Silence Gap", color: colors.amber, gap: data.result.silenceGap },
      { name: "Chaos Gap", color: colors.red, gap: data.result.chaosGap },
    ];

    for (const { name, color, gap } of gaps) {
      doc.rect(50, y, 512, 20).fill(color + "15");
      doc.rect(50, y, 512, 20).stroke(color);

      doc
        .fontSize(11)
        .fillColor(color)
        .text(name, 60, y + 5);

      doc.text(`$${gap.estimate.toLocaleString()}/mo`, 450, y + 5, { align: "right", width: 100 });

      y += 28;

      doc.fontSize(9).fillColor(colors.slate);
      for (const finding of gap.findings.slice(0, 3)) {
        doc.text("• " + finding, 60, y);
        y += 14;
      }

      y += 10;
    }

    doc.addPage();

    y = 50;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Scoring Methodology", 50, y);

    y += 30;

    for (const { name, color, gap } of gaps) {
      doc
        .fontSize(12)
        .fillColor(color)
        .text(name + " Calculation", 50, y);

      y += 18;

      doc.fontSize(9).fillColor(colors.slate);
      doc.text(gap.calculationDetails.description, 60, y);
      y += 14;
      doc.text(`Formula: ${gap.calculationDetails.formula}`, 60, y);
      y += 20;

      doc.fontSize(8).fillColor(colors.dark);
      for (const [key, value] of Object.entries(gap.calculationDetails.inputs)) {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
        doc.text(`${label}: ${value}`, 70, y);
        y += 12;
      }

      y += 15;
    }

    y += 20;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Root Causes Analysis", 50, y);

    y += 30;

    for (const { name, color, gap } of gaps) {
      if (gap.causes.length === 0) continue;

      doc
        .fontSize(11)
        .fillColor(color)
        .text(name, 50, y);

      y += 18;

      doc.fontSize(9).fillColor(colors.slate);
      for (const cause of gap.causes) {
        doc.text("• " + cause, 60, y, { width: 480 });
        y += 16;
      }

      y += 10;
    }

    doc.addPage();

    y = 50;

    doc.rect(50, y, 512, 100).fillAndStroke(colors.primary + "15", colors.primary);

    doc
      .fontSize(11)
      .fillColor(colors.primary)
      .text("RECOMMENDED SOLUTION", 60, y + 15, { align: "center", width: 492 });

    doc
      .fontSize(24)
      .fillColor(colors.dark)
      .text(`${data.result.recommendedTier} Tier`, 60, y + 35, { align: "center", width: 492 });

    doc
      .fontSize(10)
      .fillColor(colors.slate)
      .text(data.result.tierReason, 70, y + 65, { align: "center", width: 472 });

    y += 130;

    doc
      .fontSize(18)
      .fillColor(colors.dark)
      .text("Tier Comparison", 50, y);

    y += 30;

    const tiers = [
      {
        name: "Frontline",
        focus: "Speed Gap Only",
        ideal: "Speed is your primary issue",
        includes: ["AI voice answering", "Instant lead capture", "After-hours coverage"],
      },
      {
        name: "Specialist",
        focus: "Speed + Silence Gaps",
        ideal: "Follow-up and no-shows also hurt revenue",
        includes: [
          "Everything in Frontline",
          "No-show recovery automation",
          "Quote follow-up sequences",
          "Database reactivation",
        ],
      },
      {
        name: "Command",
        focus: "All Three Gaps",
        ideal: "Complex operations or high volume",
        includes: [
          "Everything in Specialist",
          "Full ops automation",
          "Custom workflow integration",
          "Enterprise-grade systems",
        ],
      },
    ];

    for (const tier of tiers) {
      const isRecommended = tier.name === data.result.recommendedTier;

      if (isRecommended) {
        doc.rect(50, y, 512, 90).fillAndStroke(colors.cyan + "20", colors.primary);
      } else {
        doc.rect(50, y, 512, 90).stroke(colors.slate);
      }

      doc
        .fontSize(12)
        .fillColor(isRecommended ? colors.primary : colors.dark)
        .text(tier.name + (isRecommended ? " ✓ Recommended" : ""), 60, y + 10);

      doc
        .fontSize(9)
        .fillColor(colors.slate)
        .text(`Focus: ${tier.focus}`, 60, y + 26);

      doc.text(`Ideal when: ${tier.ideal}`, 60, y + 40);

      doc.fontSize(8);
      let includeY = y + 55;
      for (const item of tier.includes.slice(0, 2)) {
        doc.text("• " + item, 70, includeY);
        includeY += 10;
      }

      y += 100;
    }

    y += 20;

    doc
      .fontSize(14)
      .fillColor(colors.primary)
      .text("Ready to Close Your Revenue Gaps?", 50, y, { align: "center", width: 512 });

    y += 20;

    doc
      .fontSize(10)
      .fillColor(colors.slate)
      .text(
        "Book a discovery call to discuss implementing these fixes with AI-powered automation.",
        50,
        y,
        { align: "center", width: 512 }
      );

    y += 30;

    doc
      .fontSize(11)
      .fillColor(colors.primary)
      .text("https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi", 50, y, {
        align: "center",
        width: 512,
        link: "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi",
        underline: true,
      });

    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc
        .fontSize(8)
        .fillColor(colors.slate)
        .text(
          `SimpleSequence AI Clarity Assessment • Page ${i + 1} of ${pageCount}`,
          50,
          doc.page.height - 30,
          { align: "center", width: 512 }
        );
    }

    doc.end();
  });
}
