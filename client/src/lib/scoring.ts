import { AssessmentData } from "./types";

export interface GapScore {
  estimate: number;
  findings: string[];
  causes: string[];
  calculationDetails: {
    description: string;
    formula: string;
    inputs: Record<string, string | number>;
  };
}

export interface AssessmentResult {
  businessName: string;
  industry: string;
  niche: string;
  teamSize: string;
  monthlyLeads: number;
  avgJobValue: number;
  closeRate: number;

  speedGap: GapScore;
  silenceGap: GapScore;
  chaosGap: GapScore;

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

function parseUnavailablePercent(value: string): number {
  if (value.includes("0-10%")) return 0;
  if (value.includes("11-25%")) return 18;
  if (value.includes("26-50%")) return 38;
  if (value.includes("51-75%")) return 63;
  if (value.includes("76-100%")) return 88;
  if (value.includes("I don't know")) return 30;
  return 30;
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

function roundToFifty(value: number): number {
  return Math.round(value / 50) * 50;
}

function conservativeEstimate(low: number, high: number): number {
  return roundToFifty((low * 0.6) + (high * 0.4));
}

function calculateSpeedGap(data: AssessmentData, monthlyLeads: number, avgJobValue: number): GapScore {
  const findings: string[] = [];
  const causes: string[] = [];

  const unavailablePercent = parseUnavailablePercent(data.unavailability_pct);
  
  if (unavailablePercent === 0) {
    return {
      estimate: 0,
      findings: ["You're available nearly 100% of the time - excellent speed coverage"],
      causes: [],
      calculationDetails: {
        description: "No speed gap - you are always available",
        formula: "0% unavailable = $0 speed gap",
        inputs: { unavailablePercent: 0 }
      }
    };
  }

  const speedLossRates: Record<string, number> = {
    "Under 5 minutes (excellent—top 10%)": 0.05,
    "5-30 minutes (good—top 25%)": 0.18,
    "30 minutes to 2 hours (average—middle 50%)": 0.30,
    "2-4 hours (slow—bottom 25%)": 0.40,
    "4-24 hours (very slow—bottom 10%)": 0.55,
    "24+ hours (critical problem)": 0.70,
    "It varies wildly (inconsistent)": 0.45
  };

  const responseTime = data.first_contact_speed;
  const speedLossRate = speedLossRates[responseTime] || 0.30;
  
  const unavailableLeads = monthlyLeads * (unavailablePercent / 100);
  
  const phoneWeight = 0.7;
  const digitalWeight = 0.3;

  const phoneLossMultipliers: Record<string, number> = {
    "Voicemail only": 0.8,
    "Answering service": 0.5,
    "AI voice assistant": 0.1,
    "Honestly, most calls get missed": 0.95,
    "I'm not sure": 0.7
  };

  const digitalLossMultipliers: Record<string, number> = {
    "Auto-responder": 0.3,
    "Self-service booking": 0.1,
    "We respond when we can": 0.6,
    "Many slip through": 0.85,
    "I'm not sure": 0.5
  };

  const phoneMultiplier = phoneLossMultipliers[data.phone_unavailable_handling] || 0.7;
  const digitalMultiplier = digitalLossMultipliers[data.digital_unavailable_handling] || 0.5;

  const leadsLost = unavailableLeads * ((phoneMultiplier * phoneWeight) + (digitalMultiplier * digitalWeight)) * speedLossRate;

  const lowEstimate = leadsLost * avgJobValue * 0.50;
  const highEstimate = leadsLost * avgJobValue * 0.70;
  const estimate = conservativeEstimate(lowEstimate, highEstimate);

  const responseLabel = responseTime.split('(')[0].trim();
  findings.push(`Average response time: ${responseLabel}`);
  findings.push(`${unavailablePercent}% of leads arrive when you're unavailable`);
  findings.push(`Phone handling: ${data.phone_unavailable_handling}`);
  findings.push(`Digital handling: ${data.digital_unavailable_handling}`);

  causes.push(`${unavailablePercent}% of your leads arrive when you're unavailable`);
  causes.push(`Phone calls go to: ${data.phone_unavailable_handling}`);
  causes.push(`Digital leads handled via: ${data.digital_unavailable_handling}`);
  causes.push(`You respond in ${responseLabel} when available, but miss this ${unavailablePercent}% entirely`);
  causes.push("Competitors with AI answering capture these leads in under 60 seconds");

  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Speed Gap = Unavailable leads x Loss rate x Avg job value",
      formula: `${monthlyLeads} x ${unavailablePercent}% x ${Math.round(speedLossRate * 100)}% x $${avgJobValue}`,
      inputs: {
        monthlyLeads,
        unavailablePercent: `${unavailablePercent}%`,
        lossRate: `${Math.round(speedLossRate * 100)}%`,
        avgJobValue: `$${avgJobValue}`,
        leadsLost: Math.round(leadsLost),
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}

function calculateSilenceGap(data: AssessmentData, monthlyLeads: number, avgJobValue: number, closeRate: number): GapScore {
  const findings: string[] = [];
  const causes: string[] = [];

  const noShowRate = parseNoShowRate(data.no_show_rate);
  const noShowAppointments = monthlyLeads * closeRate * (noShowRate / 100);
  const noShowRecoveryRate = 0.25;
  const noShowMonthly = noShowAppointments * noShowRecoveryRate * avgJobValue;

  const quotesGiven = monthlyLeads * closeRate;
  const staleQuotes = quotesGiven * 0.50;
  
  const quoteRecoveryRates: Record<string, number> = {
    "Automated follow-up sequence": 0.10,
    "Manual follow-up": 0.15,
    "One attempt": 0.20,
    "Nothing": 0.25
  };
  
  let quoteRecoveryRate = 0.20;
  for (const [key, rate] of Object.entries(quoteRecoveryRates)) {
    if (data.quote_followup.includes(key)) {
      quoteRecoveryRate = rate;
      break;
    }
  }
  const quoteMonthly = staleQuotes * quoteRecoveryRate * avgJobValue;

  const dormantCounts: Record<string, number> = {
    "hundreds or thousands": 500,
    "50-200": 125,
    "under 50": 25,
    "No, we actively": 0,
    "I don't know": 100
  };
  
  let dormantCount = 100;
  for (const [key, count] of Object.entries(dormantCounts)) {
    if (data.dormant_leads.includes(key)) {
      dormantCount = count;
      break;
    }
  }
  
  const reactivationRate = 0.08;
  const dormantOneTime = dormantCount * reactivationRate * avgJobValue;
  const dormantMonthly = dormantOneTime / 12;

  const totalLow = (noShowMonthly + quoteMonthly + dormantMonthly) * 0.8;
  const totalHigh = (noShowMonthly + quoteMonthly + dormantMonthly) * 1.2;
  const estimate = conservativeEstimate(totalLow, totalHigh);

  findings.push(`No-show recovery: ${data.no_show_recovery.split('(')[0].trim()}`);
  findings.push(`Quote follow-up: ${data.quote_followup.split('(')[0].trim()}`);
  findings.push(`Dormant database: ${data.dormant_leads.split('(')[0].trim()}`);

  if (!data.no_show_recovery.includes("automatically")) {
    causes.push("No-shows represent lost revenue with inconsistent recovery effort");
  }
  if (data.quote_followup.includes("Nothing") || data.quote_followup.includes("One attempt")) {
    causes.push("Quotes sent without persistent follow-up have significantly lower close rates");
  }
  if (dormantCount > 0) {
    causes.push(`~${dormantCount} dormant leads represent untapped revenue (8% reactivation typical)`);
  }

  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Silence Gap = No-show recovery + Quote follow-up + Dormant reactivation",
      formula: `($${Math.round(noShowMonthly)}) + ($${Math.round(quoteMonthly)}) + ($${Math.round(dormantMonthly)}/mo from ${dormantCount} dormant leads)`,
      inputs: {
        noShowRate: `${noShowRate}%`,
        noShowMonthly: `~$${Math.round(noShowMonthly).toLocaleString()}/mo`,
        staleQuotes: Math.round(staleQuotes),
        quoteMonthly: `~$${Math.round(quoteMonthly).toLocaleString()}/mo`,
        dormantCount,
        dormantMonthly: `~$${Math.round(dormantMonthly).toLocaleString()}/mo (amortized over 12 months)`,
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}

function calculateChaosGap(data: AssessmentData): GapScore {
  const findings: string[] = [];
  const causes: string[] = [];

  const manualHours = parseManualHours(data.manual_hours);
  const hourlyRate = 30;
  const weeksPerMonth = 4.33;
  const monthlyHours = manualHours * weeksPerMonth;
  
  const lowEstimate = monthlyHours * hourlyRate * 0.8;
  const highEstimate = monthlyHours * hourlyRate * 1.2;
  const estimate = conservativeEstimate(lowEstimate, highEstimate);

  findings.push(`${manualHours} hours/week on manual coordination`);
  findings.push(`Knowledge bottleneck: ${data.knowledge_bottleneck.split('(')[0].trim()}`);
  findings.push(`Operational complexity: ${data.operational_complexity.split('(')[0].trim()}`);

  if (manualHours >= 20) {
    causes.push("Team is drowning in administrative tasks");
  } else if (manualHours >= 11) {
    causes.push("Significant time lost to manual data entry and coordination");
  } else if (manualHours >= 6) {
    causes.push("Noticeable drag from manual processes");
  }

  if (data.knowledge_bottleneck.includes("major bottleneck")) {
    causes.push("Constant interruptions for repeated questions");
  }

  if (data.operational_complexity.includes("complex") || data.operational_complexity.includes("Enterprise")) {
    causes.push("High complexity amplifies operational inefficiencies");
  }

  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Chaos Gap = Weekly manual hours x $30/hr x 4.33 weeks",
      formula: `${manualHours} hours x $30 x 4.33 weeks = ~$${estimate.toLocaleString()}/mo`,
      inputs: {
        manualHoursPerWeek: manualHours,
        hourlyRate: "$30",
        monthlyHours: Math.round(monthlyHours),
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}

function recommendTier(
  speedGap: number,
  silenceGap: number,
  chaosGap: number,
  monthlyLeads: number,
  complexity: string
): { tier: 'Frontline' | 'Specialist' | 'Command'; reason: string } {
  const isComplex = complexity.includes("complex") || complexity.includes("Enterprise");
  const maxGap = Math.max(speedGap, silenceGap, chaosGap);
  
  let dominantGapName = "Speed";
  let dominantGapValue = speedGap;
  if (silenceGap === maxGap) {
    dominantGapName = "Silence";
    dominantGapValue = silenceGap;
  } else if (chaosGap === maxGap) {
    dominantGapName = "Chaos";
    dominantGapValue = chaosGap;
  }

  if (complexity.includes("Enterprise")) {
    return {
      tier: 'Command',
      reason: `Your enterprise-level operations require full automation. Your ${dominantGapName} Gap is ~$${dominantGapValue.toLocaleString()}/mo.`
    };
  }

  if (monthlyLeads > 150) {
    return {
      tier: 'Command',
      reason: `With ${monthlyLeads} leads/month, you need enterprise-grade automation. Your ${dominantGapName} Gap is ~$${dominantGapValue.toLocaleString()}/mo.`
    };
  }

  if (chaosGap === maxGap && isComplex) {
    return {
      tier: 'Command',
      reason: `Your Chaos Gap (~$${chaosGap.toLocaleString()}/mo) combined with operational complexity requires full automation.`
    };
  }

  if (chaosGap === maxGap) {
    return {
      tier: 'Specialist',
      reason: `Your biggest cost is the Chaos Gap (~$${chaosGap.toLocaleString()}/mo). Specialist includes automation that eliminates manual coordination and admin work.`
    };
  }
  
  if (silenceGap === maxGap || silenceGap > speedGap * 1.5) {
    return {
      tier: 'Specialist',
      reason: `Your biggest cost is the Silence Gap (~$${silenceGap.toLocaleString()}/mo). Frontline only fixes Speed—it won't address no-shows, stale quotes, or dormant leads. Specialist addresses both.`
    };
  }

  return {
    tier: 'Frontline',
    reason: `Your primary gap is Speed (~$${speedGap.toLocaleString()}/mo). Frontline provides instant response when you're unavailable.`
  };
}

export function calculateResults(data: AssessmentData): AssessmentResult {
  const monthlyLeads = parseMonthlyLeads(data.monthly_lead_volume);
  const avgJobValue = parseJobValue(data.avg_job_value);
  const closeRate = parseCloseRate(data.close_rate);

  const speedGap = calculateSpeedGap(data, monthlyLeads, avgJobValue);
  const silenceGap = calculateSilenceGap(data, monthlyLeads, avgJobValue, closeRate);
  const chaosGap = calculateChaosGap(data);

  const totalMonthlyGap = speedGap.estimate + silenceGap.estimate + chaosGap.estimate;
  const annualizedGap = totalMonthlyGap * 12;

  const { tier, reason } = recommendTier(
    speedGap.estimate,
    silenceGap.estimate,
    chaosGap.estimate,
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

    speedGap,
    silenceGap,
    chaosGap,

    totalMonthlyGap,
    annualizedGap,

    recommendedTier: tier,
    tierReason: reason
  };
}
