import jsPDF from 'jspdf';
import { AssessmentResult } from './scoring';

export function generateAssessmentPDF(result: AssessmentResult): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = 20;

  const colors = {
    primary: [0, 217, 255] as [number, number, number],
    dark: [24, 24, 27] as [number, number, number],
    text: [60, 60, 60] as [number, number, number],
    lightText: [120, 120, 120] as [number, number, number],
    accent: [20, 184, 166] as [number, number, number],
  };

  doc.setFillColor(...colors.dark);
  doc.rect(0, 0, pageWidth, 50, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SimpleSequence', margin, 25);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.primary);
  doc.text('AI Clarity Assessment Report', margin, 35);

  y = 65;

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.text);
  doc.text(result.businessName, margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.lightText);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
  y += 15;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  doc.setFillColor(240, 253, 250);
  doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');

  doc.setFontSize(10);
  doc.setTextColor(...colors.lightText);
  const colWidth = contentWidth / 5;
  const labels = ['Industry', 'Specialization', 'Monthly Leads', 'Team Size', 'Avg Job Value'];
  const values: string[] = [
    result.industry,
    result.niche.length > 15 ? result.niche.substring(0, 15) + '...' : result.niche,
    String(result.monthlyLeads),
    result.teamSize,
    `$${result.avgJobValue.toLocaleString()}`
  ];

  labels.forEach((label, i) => {
    const x = margin + 5 + (i * colWidth);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.lightText);
    doc.text(label, x, y + 12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text);
    doc.text(values[i], x, y + 22);
  });

  y += 50;

  doc.setFillColor(...colors.dark);
  doc.roundedRect(margin, y, contentWidth, 55, 3, 3, 'F');

  doc.setTextColor(...colors.primary);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL IMPACT SUMMARY', margin + 10, y + 15);

  doc.setFontSize(28);
  doc.text(`$${result.totalMonthlyGap.toLocaleString()}/mo`, pageWidth / 2, y + 32, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text(`Annualized: $${result.annualizedGap.toLocaleString()}`, pageWidth / 2, y + 45, { align: 'center' });

  y += 65;

  const gapColWidth = (contentWidth - 10) / 3;
  const gaps = [
    { name: 'Speed Gap', value: result.speedGap.estimate },
    { name: 'Silence Gap', value: result.silenceGap.estimate },
    { name: 'Chaos Gap', value: result.chaosGap.estimate }
  ];

  gaps.forEach((gap, i) => {
    const x = margin + (i * (gapColWidth + 5));
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y, gapColWidth, 25, 2, 2, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.lightText);
    doc.text(gap.name, x + 10, y + 10);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.accent);
    doc.text(`$${gap.value.toLocaleString()}`, x + 10, y + 20);
  });

  y += 35;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.text);
  doc.text('Gap Analysis', margin, y);
  y += 10;

  const renderGapSection = (title: string, gap: typeof result.speedGap, yPos: number): number => {
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, yPos, contentWidth, 45, 2, 2, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text);
    doc.text(title, margin + 5, yPos + 10);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.accent);
    doc.text(`$${gap.estimate.toLocaleString()}/mo`, pageWidth - margin - 5, yPos + 10, { align: 'right' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.lightText);

    let findingsY = yPos + 18;
    gap.findings.slice(0, 2).forEach((finding) => {
      const truncated = finding.length > 80 ? finding.substring(0, 80) + '...' : finding;
      doc.text(`• ${truncated}`, margin + 5, findingsY);
      findingsY += 8;
    });

    return yPos + 50;
  };

  y = renderGapSection('Speed Gap', result.speedGap, y);
  y = renderGapSection('Silence Gap', result.silenceGap, y);
  y = renderGapSection('Chaos Gap', result.chaosGap, y);

  doc.addPage();
  y = 20;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.text);
  doc.text('Recommended Solution', margin, y);
  y += 10;

  doc.setFillColor(...colors.primary);
  doc.roundedRect(margin, y, contentWidth, 40, 3, 3, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(`${result.recommendedTier} Tier`, margin + 10, y + 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const reasonLines = doc.splitTextToSize(result.tierReason, contentWidth - 20);
  doc.text(reasonLines.slice(0, 2), margin + 10, y + 28);

  y += 55;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.text);
  doc.text('Your DIY Action Plan', margin, y);
  y += 10;

  const diyFixes = [
    {
      title: 'Speed Gap Fixes',
      items: [
        'Set up auto-responders for after-hours leads',
        'Connect Zapier to Twilio for instant SMS text-back',
        'Train team on sub-5-minute response protocol'
      ]
    },
    {
      title: 'Silence Gap Fixes',
      items: [
        'Create no-show recovery scripts',
        'Set calendar reminders for quote follow-ups',
        'Send database reactivation campaigns'
      ]
    },
    {
      title: 'Chaos Gap Fixes',
      items: [
        'Document top 10 repetitive admin tasks',
        'Use Zapier/Make.com free tiers for automation',
        'Create a Google Docs Wiki for FAQs'
      ]
    }
  ];

  diyFixes.forEach((section) => {
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, y, contentWidth, 35, 2, 2, 'F');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text);
    doc.text(section.title, margin + 5, y + 10);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.lightText);

    let itemY = y + 18;
    section.items.forEach((item) => {
      doc.text(`• ${item}`, margin + 5, itemY);
      itemY += 6;
    });

    y += 40;
  });

  y += 10;

  doc.setFillColor(255, 251, 235);
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('The Reality of DIY Implementation', margin + 5, y + 10);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('15-30 hours setup | Advanced API knowledge required | Ongoing maintenance overhead', margin + 5, y + 22);

  y += 45;

  doc.setFillColor(...colors.dark);
  doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Ready to close your revenue gaps?', margin + 10, y + 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.primary);
  doc.text('Visit simplesequence.ai to get started', margin + 10, y + 26);

  const fileName = `${result.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Assessment_Report.pdf`;
  doc.save(fileName);
}
