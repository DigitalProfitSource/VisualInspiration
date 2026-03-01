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

  recommendedTier: 'Frontline' | 'Specialist' | 'Command';
  tierReason: string;
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
    "Frequently (we get leads from Google/AI search regularly)": 0,
    "Occasionally (some leads mention finding us online)": -4,
    "Rarely or never": -10,
    "I don't know / we don't ask": -7
  };
  score += aiSearchScores[data.ai_search_frequency] || -5;

  const aiReadinessScores: Record<string, number> = {
    "We've intentionally optimized for AI search and voice assistants": 0,
    "We've done some basic SEO but nothing AI-specific": -5,
    "No real SEO or AI optimization — we rely on referrals/ads": -10,
    "We don't really have a proper website": -15
  };
  const readinessPenalty = aiReadinessScores[data.ai_readiness] || -8;
  score += readinessPenalty;
  if (readinessPenalty <= -10) {
    blindspots.push("AI-powered search (ChatGPT, Google AI Overviews) is becoming the new front door — without optimization, you're invisible to these platforms");
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

  if (data.knowledge_bottleneck.includes("major bottleneck")) {
    dragMultiplier -= 0.04;
    dragFindings.push("Knowledge bottlenecks cause constant interruptions");
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

  if (data.knowledge_bottleneck.includes("major bottleneck")) {
    supportingActions.push("Document your top 10 most-asked customer questions into a shared FAQ for your team");
  }

  return { quickWins, supportingActions };
}

function estimateMonthlyGap(data: AssessmentData, monthlyLeads: number, avgJobValue: number, closeRate: number): number {
  let totalGap = 0;

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

  const captureGap = monthlyLeads * unavailRate * speedLoss * avgJobValue * 0.5;
  totalGap += captureGap;

  const noShowRate = parseNoShowRate(data.no_show_rate);
  const noShowMonthly = monthlyLeads * closeRate * (noShowRate / 100) * 0.25 * avgJobValue;

  let quoteRecoveryRate = 0.20;
  if (data.quote_followup.includes("Automated")) quoteRecoveryRate = 0.10;
  else if (data.quote_followup.includes("Manual")) quoteRecoveryRate = 0.15;
  else if (data.quote_followup.includes("Nothing")) quoteRecoveryRate = 0.25;
  const quoteMonthly = monthlyLeads * closeRate * 0.50 * quoteRecoveryRate * avgJobValue;

  totalGap += noShowMonthly + quoteMonthly;

  const dormantCounts: Record<string, number> = {
    "500+": 500,
    "100–499": 250,
    "Under 100": 50,
    "I'm not sure": 100
  };
  let dormantCount = 100;
  for (const [key, count] of Object.entries(dormantCounts)) {
    if (data.dormant_leads.includes(key)) {
      dormantCount = count;
      break;
    }
  }
  totalGap += (dormantCount * 0.08 * avgJobValue) / 12;

  const manualHours = parseManualHours(data.manual_hours);
  totalGap += manualHours * 30 * 4.33;

  return Math.round(totalGap / 50) * 50;
}

function recommendTier(
  captureScore: number,
  convertScore: number,
  compoundScore: number,
  monthlyLeads: number,
  complexity: string
): { tier: 'Frontline' | 'Specialist' | 'Command'; reason: string } {
  const lowestScore = Math.min(captureScore, convertScore, compoundScore);
  let lowestPillar = "Capture";
  if (convertScore === lowestScore) lowestPillar = "Convert";
  else if (compoundScore === lowestScore) lowestPillar = "Compound";

  if (complexity.includes("Enterprise") || monthlyLeads > 150) {
    return {
      tier: 'Command',
      reason: `Your operations require full-system automation. Your ${lowestPillar} score (${lowestScore}/100) indicates the most urgent area for improvement.`
    };
  }

  if (complexity.includes("complex") && lowestScore < 50) {
    return {
      tier: 'Command',
      reason: `Your ${lowestPillar} score (${lowestScore}/100) combined with operational complexity calls for comprehensive automation across all three pillars.`
    };
  }

  if (convertScore <= captureScore && convertScore <= compoundScore) {
    return {
      tier: 'Specialist',
      reason: `Your Convert score (${convertScore}/100) is your weakest pillar. Specialist addresses follow-up, no-show recovery, and pipeline tracking — the systems that turn leads into revenue.`
    };
  }

  if (compoundScore <= captureScore && compoundScore <= convertScore) {
    return {
      tier: 'Specialist',
      reason: `Your Compound score (${compoundScore}/100) shows untapped growth potential. Specialist includes review automation and database reactivation to build compounding revenue.`
    };
  }

  return {
    tier: 'Frontline',
    reason: `Your Capture score (${captureScore}/100) is your biggest opportunity. Frontline provides instant response and AI-powered availability so no lead goes unanswered.`
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
    allBlindspots.push(...adjusted.dragFindings.filter(f => f.includes("drag") || f.includes("complexity")));
  }

  const actionPlan = generateActionPlan(captureScore, convertScore, compoundScore, data);

  const totalMonthlyGap = estimateMonthlyGap(data, monthlyLeads, avgJobValue, closeRate);
  const annualizedGap = totalMonthlyGap * 12;

  const { tier, reason } = recommendTier(
    adjusted.capture,
    adjusted.convert,
    adjusted.compound,
    monthlyLeads,
    data.operational_complexity
  );

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

    recommendedTier: tier,
    tierReason: reason
  };
}
