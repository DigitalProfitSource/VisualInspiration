import { AssessmentData } from "@shared/assessment-schema";

export interface PillarScore {
  score: number;
  findings: string[];
  blindspots: string[];
}

export interface ActionPlan {
  quickWins: string[];
  supportingActions: string[];
}

export interface GapBreakdown {
  captureGap: number;
  convertGap: number;
  compoundGap: number;
  total: number;
  captureCalc: string;
  convertCalc: string;
  compoundCalc: string;
}

export interface FinancialNarrative {
  currentMonthlyRevenue: number;
  totalMonthlyGap: number;
  captureGap: number;
  conversionGap: number;
  compoundingGap: number;
  conservativeMonthlyRecovery: number;
  fullMonthlyRecovery: number;
  conservativeAnnualGain: number;
  fullAnnualGain: number;
  currentAnnualRevenue: number;
  potentialAnnualRevenue: number;
  dailyCostOfInaction: number;
  sixMonthInactionCost: number;
  twelveMonthInactionCost: number;
  threeYearInactionCost: number;
  cumulativeGainByMonth: number[];
  yearOneGain: number;
  yearThreeGain: number;
  yearFiveGain: number;
  foundMoneyPotential: number;
}

export interface IndustryBenchmark {
  industryLabel: string;
  captureStats: string;
  conversionStats: string;
  compoundStats: string;
}

export interface AssessmentResult {
  businessName: string;
  industry: string;
  niche: string;
  teamSize: string;
  monthlyLeads: number;
  avgJobValue: number;
  closeRate: number;

  captureScore: PillarScore;
  convertScore: PillarScore;
  compoundScore: PillarScore;
  overallScore: number;

  blindspots: string[];
  actionPlan: ActionPlan;

  totalMonthlyGap: number;
  annualizedGap: number;
  gapBreakdown: GapBreakdown;

  recommendedTier: 'The AI Brain' | 'The AI System' | 'The AI Infrastructure';
  tierReason: string;
  adSpend: number;
  monthlySalesVolume: number;

  financialNarrative: FinancialNarrative;
  industryBenchmark: IndustryBenchmark;
}

function parseMonthlyLeads(value: string): number {
  if (value.includes("I don't know")) return 50;
  if (value.includes("200+")) return 250;
  if (value.includes("101-200")) return 150;
  if (value.includes("51-100")) return 75;
  if (value.includes("26-50")) return 38;
  if (value.includes("11-25")) return 18;
  if (value.includes("1-10")) return 5;
  return 50;
}

function parseJobValue(value: string): number {
  const cleaned = value.replace(/[$,]/g, '');
  return parseInt(cleaned) || 2500;
}

function parseCloseRate(value: string): number {
  if (value.includes("I don't know")) return 0.30;
  if (value.includes("9-10")) return 0.95;
  if (value.includes("7-8")) return 0.75;
  if (value.includes("5-6")) return 0.55;
  if (value.includes("3-4")) return 0.35;
  if (value.includes("1-2")) return 0.15;
  return 0.30;
}

function parseNoShowRate(value: string): number {
  if (value.includes("I don't track")) return 15;
  if (value.includes("35%+")) return 40;
  if (value.includes("21-35%")) return 28;
  if (value.includes("11-20%")) return 15;
  if (value.includes("0-10%")) return 5;
  return 15;
}

function parseManualHours(value: string): number {
  if (value.includes("I'm not sure")) return 8;
  if (value.includes("20+")) return 25;
  if (value.includes("11-20")) return 15;
  if (value.includes("6-10")) return 8;
  if (value.includes("3-5")) return 4;
  if (value.includes("0-2")) return 1;
  return 8;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function calculateCaptureScore(data: AssessmentData): PillarScore {
  let score = 100;
  const findings: string[] = [];
  const blindspots: string[] = [];

  const speedScores: Record<string, number> = {
    "Under 5 minutes (excellent—top 10%)": 0,
    "5-30 minutes (good—top 25%)": -8,
    "30 minutes to 2 hours (average—middle 50%)": -18,
    "2-4 hours (slow—bottom 25%)": -28,
    "4-24 hours (very slow—bottom 10%)": -38,
    "24+ hours (critical problem)": -48,
    "It varies wildly (inconsistent)": -30
  };

  const speedPenalty = speedScores[data.first_contact_speed] || -18;
  score += speedPenalty;
  const responseLabel = data.first_contact_speed.split('(')[0].trim();
  findings.push(`Response time: ${responseLabel}`);
  if (speedPenalty <= -28) {
    blindspots.push("Slow response time is your single biggest Capture friction point — 78% of customers go with whoever responds first");
  }

  const unavailabilityScores: Record<string, number> = {
    "Rarely (we're almost always available)": 0,
    "Sometimes (evenings/weekends we miss some)": -8,
    "Often (we miss a significant number of calls/messages)": -18,
    "Almost always (we're rarely available when they call)": -28
  };
  const unavailPenalty = unavailabilityScores[data.lead_unavailability] || -12;
  score += unavailPenalty;
  if (unavailPenalty <= -18) {
    findings.push("Frequently unavailable when leads try to reach you");
    blindspots.push("Leads arriving when you're unavailable are going to competitors with always-on systems");
  }

  const phoneScores: Record<string, number> = {
    "Voicemail only": -8,
    "Answering service": -4,
    "AI voice assistant": 0,
    "Honestly, most calls get missed": -15
  };
  score += phoneScores[data.phone_unavailable_handling] || -8;
  findings.push(`Phone backup: ${data.phone_unavailable_handling}`);

  const digitalScores: Record<string, number> = {
    "Auto-responder": -3,
    "Self-service booking": 0,
    "We respond when we can": -8,
    "Many slip through": -14
  };
  score += digitalScores[data.digital_unavailable_handling] || -6;
  findings.push(`Digital backup: ${data.digital_unavailable_handling}`);

  const aiSearchScores: Record<string, number> = {
    "Yes — we show up regularly": 0,
    "Sometimes — we've seen it happen": -4,
    "No — we don't show up": -10,
    "Not sure — haven't checked": -7
  };
  score += aiSearchScores[data.ai_search_frequency] || -5;

  const aiReadinessScores: Record<string, number> = {
    "Yes — we've optimized for AI discovery": 0,
    "We've done basic SEO but nothing AI-specific": -5,
    "No — we haven't thought about it": -10,
    "We don't have much of an online presence": -15
  };
  const readinessPenalty = aiReadinessScores[data.ai_readiness] || -8;
  score += readinessPenalty;
  if (readinessPenalty <= -10) {
    blindspots.push("AI-powered search (ChatGPT, Google AI Overviews) is becoming the new front door — without optimization, you're invisible to these platforms");
  }

  const aiIntentScores: Record<string, number> = {
    "Yes — we use AI to route, qualify, or respond to leads": 0,
    "We've experimented with AI tools but nothing formal": -4,
    "No — we've looked into it but haven't implemented anything": -6,
    "No — we haven't explored AI tools yet": -8
  };
  const aiIntentPenalty = aiIntentScores[data.has_ai_intent] || -6;
  score += aiIntentPenalty;
  if (aiIntentPenalty <= -6) {
    blindspots.push("AI-powered intent routing and lead qualification can dramatically cut your response time and qualify leads before they ever reach a human — you're missing this layer");
  }

  const intakeScores: Record<string, number> = {
    "In a central CRM or booking system automatically": 0,
    "In multiple tools (email, spreadsheets, notes)": -6,
    "Mostly in people's heads / phones — not captured systematically": -14
  };
  const intakePenalty = intakeScores[data.intake_centralization] || -8;
  score += intakePenalty;
  if (intakePenalty <= -6) {
    findings.push("Lead intake is fragmented across multiple systems");
    if (intakePenalty <= -14) {
      blindspots.push("Without centralized intake, leads fall through the cracks before anyone even knows they exist");
    }
  }

  const channelCount = data.contact_channels?.length || 1;
  if (channelCount <= 2) {
    score -= 5;
    findings.push(`Only ${channelCount} contact channel(s) — limited ways for leads to reach you`);
  } else if (channelCount >= 5) {
    findings.push(`${channelCount} contact channels active`);
  }

  return {
    score: clampScore(score),
    findings,
    blindspots
  };
}

function calculateConvertScore(data: AssessmentData): PillarScore {
  let score = 100;
  const findings: string[] = [];
  const blindspots: string[] = [];

  const followUpScores: Record<string, number> = {
    "Automated follow-up sequence (emails/texts until they respond)": 0,
    "Manual follow-up (we call/text when we remember)": -12,
    "One attempt (we follow up once, then stop)": -22,
    "Nothing (once we quote, we wait for them to decide)": -30
  };
  const followUpPenalty = followUpScores[data.quote_followup] || -15;
  score += followUpPenalty;
  findings.push(`Quote follow-up: ${data.quote_followup.split('(')[0].trim()}`);
  if (followUpPenalty <= -22) {
    blindspots.push("Quotes without persistent follow-up close at less than half the rate of automated sequences — this is likely your biggest conversion gap");
  }

  const noShowRecoveryScores: Record<string, number> = {
    "Yes, automatically (system does it for us)": 0,
    "Yes, manually (someone has to remember to do it)": -8,
    "Sometimes (when we're not too busy)": -15,
    "Rarely (we try but it's inconsistent)": -22,
    "No (once they no-show, they're gone)": -28
  };
  const noShowRecoveryPenalty = noShowRecoveryScores[data.no_show_recovery] || -12;
  score += noShowRecoveryPenalty;
  findings.push(`No-show recovery: ${data.no_show_recovery.split('(')[0].trim()}`);
  if (noShowRecoveryPenalty <= -15) {
    blindspots.push("No-shows represent recoverable revenue — automated rebooking recaptures 20-35% of lost appointments");
  }

  const noShowRateScores: Record<string, number> = {
    "0-10% (excellent—very reliable customers)": 0,
    "11-20% (average—some no-shows)": -8,
    "21-35% (high—significant problem)": -16,
    "35%+ (critical—major revenue drain)": -24,
    "I don't track this": -12
  };
  score += noShowRateScores[data.no_show_rate] || -10;

  const pipelineScores: Record<string, number> = {
    "Yes, consistently in a CRM or job system": 0,
    "Partially (some data is tracked, some isn't)": -10,
    "No, we mostly rely on memory and informal tools": -20
  };
  const pipelinePenalty = pipelineScores[data.pipeline_tracking] || -10;
  score += pipelinePenalty;
  if (pipelinePenalty <= -10) {
    findings.push("Pipeline tracking is incomplete or informal");
    if (pipelinePenalty <= -20) {
      blindspots.push("Without pipeline visibility, you can't measure where deals stall — what you can't see, you can't fix");
    }
  }

  const closeRateScores: Record<string, number> = {
    "1-2 out of 10 (10-20%)": -15,
    "3-4 out of 10 (30-40%)": -8,
    "5-6 out of 10 (50-60%)": 0,
    "7-8 out of 10 (70-80%)": 0,
    "9-10 out of 10 (90-100%)": 0,
    "I don't know": -10
  };
  score += closeRateScores[data.close_rate] || -8;

  const automationScores: Record<string, number> = {
    "Yes — we have workflows set up (CRM sequences, auto-texts, etc.)": 0,
    "We have some basic automations but not a full system": -8,
    "No — everything is done manually": -18
  };
  const automationValue = data.has_automations || "";
  const automationPenalty = automationScores[automationValue] ?? -10;
  score += automationPenalty;
  if (automationValue) findings.push(`Automation: ${automationValue.split('(')[0].split('—')[0].trim()}`);
  if (automationPenalty <= -8) {
    blindspots.push("Businesses with full CRM automation close 30-50% more deals than manual operations — every step that requires a human to remember is a step where leads go cold");
  }

  return {
    score: clampScore(score),
    findings,
    blindspots
  };
}

function calculateCompoundScore(data: AssessmentData): PillarScore {
  let score = 100;
  const findings: string[] = [];
  const blindspots: string[] = [];

  const dormantScores: Record<string, number> = {
    "500+ (large reactivation opportunity)": -30,
    "100–499": -18,
    "Under 100": -8,
    "I'm not sure / we don't track this": -20
  };
  const dormantPenalty = dormantScores[data.dormant_leads] || -15;
  score += dormantPenalty;
  findings.push(`Dormant lead database: ${data.dormant_leads.split('(')[0].trim()}`);
  if (dormantPenalty <= -18) {
    blindspots.push("Your dormant database is an untapped asset — reactivation campaigns typically recover 5-12% of old leads at near-zero acquisition cost");
  }

  const reviewScores: Record<string, number> = {
    "Yes, automatically (every customer gets a review request)": 0,
    "Yes, manually (we ask when we remember)": -15,
    "Sometimes (only our best customers)": -25,
    "We rely on organic reviews / we don't really ask": -35
  };
  const reviewPenalty = reviewScores[data.review_request] || -20;
  score += reviewPenalty;
  findings.push(`Review generation: ${data.review_request.split('(')[0].trim()}`);
  if (reviewPenalty <= -25) {
    blindspots.push("Reviews are your compounding engine — every 5-star review generates future leads passively, and you're leaving this on the table");
  }

  return {
    score: clampScore(score),
    findings,
    blindspots
  };
}

function applyOperationalDrag(captureScore: number, convertScore: number, compoundScore: number, data: AssessmentData): { capture: number; convert: number; compound: number; dragFindings: string[] } {
  const manualHours = parseManualHours(data.manual_hours);
  const dragFindings: string[] = [];
  let dragMultiplier = 1.0;

  if (manualHours >= 20) {
    dragMultiplier = 0.88;
    dragFindings.push(`${manualHours}+ hours/week on manual admin — significant operational drag across all pillars`);
  } else if (manualHours >= 11) {
    dragMultiplier = 0.92;
    dragFindings.push(`${manualHours} hours/week on manual coordination creates noticeable drag`);
  } else if (manualHours >= 6) {
    dragMultiplier = 0.96;
    dragFindings.push(`${manualHours} hours/week on manual processes`);
  }

  const staffRepeat = data.staff_repeat_questions || "";
  if (staffRepeat.includes("Constantly")) {
    dragMultiplier -= 0.04;
    dragFindings.push("Staff constantly interrupted by repeat questions — a shared knowledge base or AI assistant could eliminate this");
  } else if (staffRepeat.includes("Sometimes")) {
    dragMultiplier -= 0.02;
  }

  const processDoc = data.process_documentation || "";
  if (processDoc.includes("Nothing documented")) {
    dragMultiplier -= 0.03;
    dragFindings.push("No process documentation means every task depends on institutional memory — one departure can break your operations");
  } else if (processDoc.includes("Mostly in people's heads")) {
    dragMultiplier -= 0.02;
    dragFindings.push("Critical processes undocumented — creates fragility and inconsistency across your team");
  }

  if (data.operational_complexity.includes("complex") || data.operational_complexity.includes("Enterprise")) {
    dragMultiplier -= 0.03;
    dragFindings.push("High operational complexity amplifies friction across all systems");
  }

  return {
    capture: clampScore(Math.round(captureScore * dragMultiplier)),
    convert: clampScore(Math.round(convertScore * dragMultiplier)),
    compound: clampScore(Math.round(compoundScore * dragMultiplier)),
    dragFindings
  };
}

function generateActionPlan(captureScore: PillarScore, convertScore: PillarScore, compoundScore: PillarScore, data: AssessmentData): ActionPlan {
  const scores = [
    { name: 'capture', score: captureScore.score },
    { name: 'convert', score: convertScore.score },
    { name: 'compound', score: compoundScore.score }
  ].sort((a, b) => a.score - b.score);

  const lowestPillar = scores[0].name;
  const quickWins: string[] = [];
  const supportingActions: string[] = [];

  if (lowestPillar === 'capture') {
    quickWins.push("Set up auto-responders for after-hours leads on your website and phone system");
    quickWins.push("Enable instant SMS text-back for every missed call (tools like Twilio + Zapier, ~$30/mo)");
    quickWins.push("Train your team on a strict sub-5-minute response protocol for all new inquiries");
    supportingActions.push("Audit your Google Business Profile and website for AI search visibility");
    supportingActions.push("Centralize all lead intake into one system (CRM or booking tool)");
    supportingActions.push("Add at least one more contact channel (e.g., website chat or online booking)");
  } else if (lowestPillar === 'convert') {
    quickWins.push("Create a 3-touch quote follow-up sequence: Day 1 (thanks), Day 3 (check-in), Day 7 (final nudge)");
    quickWins.push("Write a no-show recovery script and set calendar reminders to send it within 15 minutes of a missed appointment");
    quickWins.push("Set up pipeline stages in your CRM (or a simple spreadsheet) to track where every deal stands");
    supportingActions.push("Build a quote template with a clear expiration date and next-step CTA");
    supportingActions.push("Implement appointment reminders (text + email) 24 hours and 1 hour before each booking");
    supportingActions.push("Review your close rate monthly and identify the stage where most deals stall");
  } else {
    quickWins.push("Export your dormant lead list and send a 'checking in' email with a seasonal offer or helpful tip");
    quickWins.push("Set up automated review requests after every completed job (Google review link via text/email)");
    quickWins.push("Create a simple referral program: offer a discount or gift card for every referred customer");
    supportingActions.push("Build a monthly reactivation campaign for leads older than 90 days");
    supportingActions.push("Respond to every review (positive and negative) within 48 hours");
    supportingActions.push("Track your review velocity — aim for at least 2-4 new reviews per month");
  }

  if ((data.staff_repeat_questions || "").includes("Constantly")) {
    supportingActions.push("Document your top 10 most-asked customer questions into a shared FAQ or internal knowledge base for your team");
  }

  if ((data.process_documentation || "").includes("Nothing documented") || (data.process_documentation || "").includes("Mostly in people's heads")) {
    supportingActions.push("Start documenting your core processes — even a Google Doc SOP for your top 3 workflows can reduce training time and errors by 40%");
  }

  if ((data.has_automations || "").includes("No — everything is done manually")) {
    supportingActions.push("Identify your top 3 manual tasks and map them to automation candidates — most CRMs can handle follow-up, reminders, and intake automatically");
  }

  return { quickWins, supportingActions };
}

function estimateMonthlyGapBreakdown(data: AssessmentData, monthlyLeads: number, avgJobValue: number, closeRate: number): GapBreakdown {
  const unavailabilityLoss: Record<string, number> = {
    "Rarely (we're almost always available)": 0.05,
    "Sometimes (evenings/weekends we miss some)": 0.15,
    "Often (we miss a significant number of calls/messages)": 0.35,
    "Almost always (we're rarely available when they call)": 0.60
  };
  const unavailRate = unavailabilityLoss[data.lead_unavailability] || 0.20;

  const speedLossRates: Record<string, number> = {
    "Under 5 minutes (excellent—top 10%)": 0.05,
    "5-30 minutes (good—top 25%)": 0.18,
    "30 minutes to 2 hours (average—middle 50%)": 0.30,
    "2-4 hours (slow—bottom 25%)": 0.40,
    "4-24 hours (very slow—bottom 10%)": 0.55,
    "24+ hours (critical problem)": 0.70,
    "It varies wildly (inconsistent)": 0.45
  };
  const speedLoss = speedLossRates[data.first_contact_speed] || 0.30;

  const rawCaptureGap = monthlyLeads * unavailRate * speedLoss * avgJobValue * 0.5;
  const captureGap = Math.round(rawCaptureGap / 50) * 50;
  const captureCalc = `${monthlyLeads} leads × ${Math.round(unavailRate * 100)}% unavail × ${Math.round(speedLoss * 100)}% speed loss × $${avgJobValue.toLocaleString()}`;

  const noShowRate = parseNoShowRate(data.no_show_rate);
  const noShowMonthly = monthlyLeads * closeRate * (noShowRate / 100) * 0.25 * avgJobValue;
  let quoteRecoveryRate = 0.20;
  if (data.quote_followup.includes("Automated")) quoteRecoveryRate = 0.10;
  else if (data.quote_followup.includes("Manual")) quoteRecoveryRate = 0.15;
  else if (data.quote_followup.includes("Nothing")) quoteRecoveryRate = 0.25;
  const quoteMonthly = monthlyLeads * closeRate * 0.50 * quoteRecoveryRate * avgJobValue;
  const rawConvertGap = noShowMonthly + quoteMonthly;
  const convertGap = Math.round(rawConvertGap / 50) * 50;
  const convertCalc = `($${Math.round(noShowMonthly).toLocaleString()} no-show recovery) + ($${Math.round(quoteMonthly).toLocaleString()} quote follow-up)`;

  // Compounding gap is now based on review/reputation compound — genuinely monthly and recurring
  const reviewPenaltyRates: Record<string, number> = {
    "Yes, automatically (every customer gets a review request)": 0.02,
    "Yes, manually (we ask when we remember)": 0.07,
    "Sometimes (only our best customers)": 0.10,
    "We rely on organic reviews / we don't really ask": 0.13
  };
  const reviewPenaltyRate = reviewPenaltyRates[data.review_request] || 0.07;
  const rawCompoundGap = monthlyLeads * reviewPenaltyRate * avgJobValue * closeRate;
  const compoundGap = Math.round(rawCompoundGap / 50) * 50;
  const compoundCalc = `${monthlyLeads} leads × ${Math.round(reviewPenaltyRate * 100)}% review impact × $${avgJobValue.toLocaleString()} avg job × ${Math.round(closeRate * 100)}% close rate`;

  const total = captureGap + convertGap + compoundGap;

  return { captureGap, convertGap, compoundGap, total, captureCalc, convertCalc, compoundCalc };
}

function recommendTier(
  captureScore: number,
  convertScore: number,
  compoundScore: number,
  monthlyLeads: number,
  complexity: string,
  adSpend: number
): { tier: 'The AI Brain' | 'The AI System' | 'The AI Infrastructure'; reason: string } {
  const lowestScore = Math.min(captureScore, convertScore, compoundScore);
  const overallScore = Math.round((captureScore + convertScore + compoundScore) / 3);
  let lowestPillar = "Capture";
  if (convertScore === lowestScore) lowestPillar = "Convert";
  else if (compoundScore === lowestScore) lowestPillar = "Compound";

  if (complexity.includes("Enterprise") || monthlyLeads > 150) {
    return {
      tier: 'The AI Infrastructure',
      reason: `Your operations require full-system automation. Your ${lowestPillar} score (${lowestScore}/100) indicates the most urgent area for improvement.`
    };
  }

  if (adSpend >= 5000 && overallScore < 65) {
    return {
      tier: 'The AI Infrastructure',
      reason: `You're spending $${adSpend.toLocaleString()}/mo on ads but your overall system score is ${overallScore}/100 — meaning significant ad spend is leaking into an under-optimized funnel. The full Revenue Loop maximizes every dollar you put in at the top.`
    };
  }

  if (adSpend >= 2500 && lowestScore < 50) {
    return {
      tier: 'The AI Infrastructure',
      reason: `With $${adSpend.toLocaleString()}/mo in ad spend flowing into a ${lowestPillar} score of ${lowestScore}/100, you're paying to fill a leaky bucket. The full Revenue Loop closes the gaps that are costing you your ad ROI.`
    };
  }

  if (complexity.includes("complex") && lowestScore < 50) {
    return {
      tier: 'The AI Infrastructure',
      reason: `Your ${lowestPillar} score (${lowestScore}/100) combined with operational complexity calls for comprehensive automation across all three pillars.`
    };
  }

  if (convertScore <= captureScore && convertScore <= compoundScore) {
    return {
      tier: 'The AI System',
      reason: `Your Convert score (${convertScore}/100) is your weakest pillar. The AI System addresses follow-up, no-show recovery, and pipeline tracking — the systems that turn leads into revenue.`
    };
  }

  if (compoundScore <= captureScore && compoundScore <= convertScore) {
    return {
      tier: 'The AI System',
      reason: `Your Compound score (${compoundScore}/100) shows untapped growth potential. The AI System includes review automation and database reactivation to build compounding revenue.`
    };
  }

  return {
    tier: 'The AI Brain',
    reason: `Your Capture score (${captureScore}/100) is your biggest opportunity. The AI Brain provides instant response and AI-powered availability so no lead goes unanswered.`
  };
}

function getIndustryBenchmark(industry: string): IndustryBenchmark {
  const benchmarks: Record<string, IndustryBenchmark> = {
    "HVAC": {
      industryLabel: "HVAC companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Response time reduced from 12+ hours to under 5 minutes, driving repeat referrals",
    },
    "Plumbing": {
      industryLabel: "plumbing companies",
      captureStats: "Response time reduced from 12+ hours to under 5 minutes",
      conversionStats: "Estimate bookings increased 47% with automated follow-up",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Electrical": {
      industryLabel: "electrical contractors",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth and referral momentum",
    },
    "Roofing": {
      industryLabel: "roofing companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Solar": {
      industryLabel: "solar companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Remodeling": {
      industryLabel: "remodeling companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth and referral momentum",
    },
    "Landscaping": {
      industryLabel: "landscaping companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up",
      compoundStats: "Automated review requests and database reactivation drove seasonal revenue recovery",
    },
    "Windows & Doors": {
      industryLabel: "windows and doors companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Painting": {
      industryLabel: "painting companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Cleaning": {
      industryLabel: "cleaning services",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Pest Control": {
      industryLabel: "pest control companies",
      captureStats: "Missed call rate reduced from 35% to under 2%",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth month over month",
    },
    "Legal": {
      industryLabel: "law firms",
      captureStats: "Consultation availability expanded to 24/7, qualified case intakes up 67%",
      conversionStats: "Qualified case intakes increased 67% with faster intake and follow-up",
      compoundStats: "4.5x ROI in 6 months driven in part by review-based referral growth",
    },
    "Med Spa / Aesthetics": {
      industryLabel: "med spas",
      captureStats: "Consultation bookings increased 127% after closing the speed-to-lead gap",
      conversionStats: "No-show rate reduced 64%, treatment packages sold increased 203%",
      compoundStats: "Automated review requests at post-service satisfaction peaks drove consistent 5-star growth",
    },
    "Real Estate": {
      industryLabel: "real estate teams",
      captureStats: "Speed-to-lead improved from 1-2 hours to under 1 minute",
      conversionStats: "Portal lead conversion improved from 2% to 8% (+300%)",
      compoundStats: "Automated follow-up and reactivation turned cold leads into closed deals",
    },
    "Auto Services": {
      industryLabel: "auto repair shops",
      captureStats: "Missed call rate reduced from 35% to under 2%",
      conversionStats: "Recall scheduling reached 45% automation rate",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat business",
    },
    "Pool & Spa": {
      industryLabel: "pool and spa companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Flooring": {
      industryLabel: "flooring companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Insulation": {
      industryLabel: "insulation contractors",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Estimate bookings increased 47% with automated follow-up sequences",
      compoundStats: "Automated review collection drove consistent 5-star growth month over month",
    },
    "Garage Doors": {
      industryLabel: "garage door companies",
      captureStats: "Missed call rate reduced from 35% to under 2%",
      conversionStats: "Lead follow-up rate improved from 31% to 89%",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Security Systems": {
      industryLabel: "security system companies",
      captureStats: "Response time reduced from 12+ hours to under 5 minutes",
      conversionStats: "Lead follow-up rate improved from 31% to 89%",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Moving Services": {
      industryLabel: "moving companies",
      captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
      conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Chiropractic": {
      industryLabel: "chiropractic practices",
      captureStats: "Consultation bookings increased 127% after closing the speed-to-lead gap",
      conversionStats: "No-show rate reduced 64% with automated rebooking sequences",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
    "Dental": {
      industryLabel: "dental practices",
      captureStats: "Missed call rate reduced from 35% to under 2%",
      conversionStats: "Recall scheduling reached 45% automation rate, show rates improved significantly",
      compoundStats: "New patient intake available 24/7, review automation drove consistent reputation growth",
    },
    "Financial Services": {
      industryLabel: "financial service firms",
      captureStats: "Document collection time reduced from 3-5 days to under 4 hours",
      conversionStats: "Appointment show rate improved 22% with automated reminders",
      compoundStats: "Automated client follow-up and review requests drove consistent referral growth",
    },
    "Insurance": {
      industryLabel: "insurance agencies",
      captureStats: "Response time reduced from 12+ hours to under 5 minutes",
      conversionStats: "Lead follow-up rate improved from 31% to 89%",
      compoundStats: "Automated review requests and reactivation campaigns drove renewal revenue",
    },
    "Fitness / Wellness": {
      industryLabel: "fitness and wellness businesses",
      captureStats: "Consultation bookings increased 127% after closing the speed-to-lead gap",
      conversionStats: "No-show rate reduced 64% with automated rebooking sequences",
      compoundStats: "Automated review requests at post-service satisfaction peaks drove consistent 5-star growth",
    },
    "Staffing / HR": {
      industryLabel: "staffing and HR firms",
      captureStats: "Response time reduced from 12+ hours to under 5 minutes",
      conversionStats: "Lead follow-up rate improved from 31% to 89%",
      compoundStats: "Automated review requests drove consistent 5-star growth and repeat referrals",
    },
  };

  return benchmarks[industry] ?? {
    industryLabel: "service businesses",
    captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
    conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
    compoundStats: "Automated review requests drove consistent 5-star growth month over month",
  };
}

function calculateFinancialNarrative(
  avgJobValue: number,
  monthlySalesVolume: number,
  monthlyLeads: number,
  closeRate: number,
  totalMonthlyGap: number,
  captureGap: number,
  conversionGap: number,
  compoundingGap: number,
  dormantLeads: string
): FinancialNarrative {
  const estimatedJobs = monthlySalesVolume > 0
    ? monthlySalesVolume
    : Math.round(monthlyLeads * closeRate);
  const currentMonthlyRevenue = avgJobValue * Math.max(estimatedJobs, 1);
  const currentAnnualRevenue = currentMonthlyRevenue * 12;

  const conservativeMonthlyRecovery = Math.round(totalMonthlyGap * 0.50);
  const fullMonthlyRecovery = totalMonthlyGap;
  const conservativeAnnualGain = conservativeMonthlyRecovery * 12;
  const fullAnnualGain = fullMonthlyRecovery * 12;
  const potentialAnnualRevenue = currentAnnualRevenue + conservativeAnnualGain;

  const dailyCostOfInaction = Math.round(totalMonthlyGap / 30);
  const sixMonthInactionCost = totalMonthlyGap * 6;
  const twelveMonthInactionCost = totalMonthlyGap * 12;
  const threeYearInactionCost = totalMonthlyGap * 36;

  const cumulativeGainByMonth = Array.from({ length: 12 }, (_, i) => conservativeMonthlyRecovery * (i + 1));

  const yearOneGain = conservativeAnnualGain;
  const yearThreeGain = yearOneGain + (fullAnnualGain * 2);
  const yearFiveGain = yearOneGain + (fullAnnualGain * 4);

  // Found Money Potential — one-time DBR campaign, kept separate from monthly gap
  const dormantMidpoints: Record<string, number> = {
    "500+": 600,
    "100–499": 250,
    "Under 100": 50,
    "I'm not sure": 100
  };
  let dormantLeadMidpoint = 100;
  for (const [key, midpoint] of Object.entries(dormantMidpoints)) {
    if (dormantLeads.includes(key)) {
      dormantLeadMidpoint = midpoint;
      break;
    }
  }
  const foundMoneyPotential = Math.round(dormantLeadMidpoint * 0.08 * avgJobValue);

  return {
    currentMonthlyRevenue,
    totalMonthlyGap,
    captureGap,
    conversionGap,
    compoundingGap,
    conservativeMonthlyRecovery,
    fullMonthlyRecovery,
    conservativeAnnualGain,
    fullAnnualGain,
    currentAnnualRevenue,
    potentialAnnualRevenue,
    dailyCostOfInaction,
    sixMonthInactionCost,
    twelveMonthInactionCost,
    threeYearInactionCost,
    cumulativeGainByMonth,
    yearOneGain,
    yearThreeGain,
    yearFiveGain,
    foundMoneyPotential,
  };
}

export function calculateResults(data: AssessmentData): AssessmentResult {
  const monthlyLeads = parseMonthlyLeads(data.monthly_lead_volume);
  const avgJobValue = parseJobValue(data.avg_job_value);
  const closeRate = parseCloseRate(data.close_rate);

  const rawCapture = calculateCaptureScore(data);
  const rawConvert = calculateConvertScore(data);
  const rawCompound = calculateCompoundScore(data);

  const adjusted = applyOperationalDrag(rawCapture.score, rawConvert.score, rawCompound.score, data);

  const captureScore: PillarScore = {
    score: adjusted.capture,
    findings: [...rawCapture.findings, ...adjusted.dragFindings.length > 0 ? ["Operational drag applied to all scores"] : []],
    blindspots: rawCapture.blindspots
  };

  const convertScore: PillarScore = {
    score: adjusted.convert,
    findings: rawConvert.findings,
    blindspots: rawConvert.blindspots
  };

  const compoundScore: PillarScore = {
    score: adjusted.compound,
    findings: rawCompound.findings,
    blindspots: rawCompound.blindspots
  };

  const overallScore = clampScore(Math.round(
    (adjusted.capture * 0.40) + (adjusted.convert * 0.35) + (adjusted.compound * 0.25)
  ));

  const allBlindspots = [
    ...captureScore.blindspots,
    ...convertScore.blindspots,
    ...compoundScore.blindspots
  ];

  if (adjusted.dragFindings.length > 0) {
    allBlindspots.push(...adjusted.dragFindings.filter(f => f.includes("drag") || f.includes("complexity") || f.includes("documented") || f.includes("interrupted")));
  }

  const actionPlan = generateActionPlan(captureScore, convertScore, compoundScore, data);

  const gapBreakdown = estimateMonthlyGapBreakdown(data, monthlyLeads, avgJobValue, closeRate);
  const totalMonthlyGap = gapBreakdown.total;
  const annualizedGap = totalMonthlyGap * 12;

  const adSpend = parseInt(data.ad_spend || "0") || 0;
  const monthlySalesVolume = parseInt(data.monthly_sales_volume || "0") || 0;

  const { tier, reason } = recommendTier(
    adjusted.capture,
    adjusted.convert,
    adjusted.compound,
    monthlyLeads,
    data.operational_complexity,
    adSpend
  );

  const financialNarrative = calculateFinancialNarrative(
    avgJobValue,
    monthlySalesVolume,
    monthlyLeads,
    closeRate,
    totalMonthlyGap,
    gapBreakdown.captureGap,
    gapBreakdown.convertGap,
    gapBreakdown.compoundGap,
    data.dormant_leads
  );

  const industryBenchmark = getIndustryBenchmark(data.industry);

  return {
    businessName: data.business_name || "Your Business",
    industry: data.industry,
    niche: data.niche_specificity,
    teamSize: data.team_size,
    monthlyLeads,
    avgJobValue,
    closeRate,

    captureScore,
    convertScore,
    compoundScore,
    overallScore,

    blindspots: allBlindspots,
    actionPlan,

    totalMonthlyGap,
    annualizedGap,
    gapBreakdown,

    recommendedTier: tier,
    tierReason: reason,
    adSpend,
    monthlySalesVolume,

    financialNarrative,
    industryBenchmark,
  };
}
