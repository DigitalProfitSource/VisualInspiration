export interface Step {
  id: string;
  title: string;
  description: string;
  fields: string[];
  progress: number;
}

export const STEPS: Step[] = [
  {
    id: "initial",
    title: "Project Identity",
    description: "Start by identifying your business. This helps us anchor the analysis to your specific brand.",
    fields: ["business_name", "website_url"],
    progress: 0
  },
  {
    id: "business",
    title: "About Your Business",
    description: "Help us understand your business context so we can calibrate our analysis.",
    fields: ["industry", "niche_specificity", "team_size", "avg_job_value", "monthly_lead_volume"],
    progress: 12
  },
  {
    id: "calibration",
    title: "Calibrate Your Efficiency Analysis",
    description: "Select the scenarios that occur most frequently in your daily operations. This helps the AI isolate your primary friction points.",
    fields: ["revenue_pain"],
    progress: 24
  },
  {
    id: "speed",
    title: "The Speed Gap",
    description: "How quickly do leads get a response, and what happens when you're unavailable?",
    fields: ["first_contact_speed", "lead_unavailability", "phone_unavailable_handling", "digital_unavailable_handling"],
    progress: 36
  },
  {
    id: "silence",
    title: "The Silence Gap",
    description: "What happens after the first conversation — do leads get followed up?",
    fields: ["no_show_recovery", "quote_followup", "dormant_leads", "no_show_rate"],
    progress: 48
  },
  {
    id: "engagement",
    title: "Channels & Engagement",
    description: "How do leads find and reach you? How do you build trust after the job is done?",
    fields: ["contact_channels", "review_request", "close_rate", "ai_search_frequency", "ai_readiness"],
    progress: 60
  },
  {
    id: "intake",
    title: "Intake & Pipeline",
    description: "How do you capture and track leads once they come in?",
    fields: ["intake_centralization", "pipeline_tracking"],
    progress: 72
  },
  {
    id: "chaos",
    title: "The Chaos Gap",
    description: "How much operational overhead is slowing you down?",
    fields: ["manual_hours", "knowledge_bottleneck", "operational_complexity"],
    progress: 84
  },
  {
    id: "contact",
    title: "Get Your Results",
    description: "We'll send your personalized Sequential Revenue™ Friction Analysis to your inbox.",
    fields: ["contact_first_name", "contact_last_name", "contact_email", "contact_phone", "disclaimer_accepted"],
    progress: 95
  }
];

export const REVENUE_PAIN_OPTIONS = [
  { value: "Leads go cold before we respond", subtitle: "Speed problem" },
  { value: "No-shows and cancellations hurt revenue", subtitle: "Follow-up problem" },
  { value: "Quotes sent but never closed", subtitle: "Persistence problem" },
  { value: "Old leads sitting in the database", subtitle: "Reactivation problem" },
  { value: "Too much time on manual admin work", subtitle: "Efficiency problem" },
  { value: "Inconsistent customer experience", subtitle: "Process problem" },
  { value: "Reputation not growing fast enough", subtitle: "Review problem" },
  { value: "Can't answer calls when busy", subtitle: "Availability problem" }
];

export const INDUSTRY_NICHE_MAP: Record<string, string[]> = {
  "HVAC": ["Residential HVAC", "Commercial HVAC", "HVAC Installation", "HVAC Maintenance", "HVAC Repair"],
  "Plumbing": ["Residential Plumbing", "Commercial Plumbing", "Emergency Plumbing", "Drain Cleaning", "Water Heater Services"],
  "Electrical": ["Residential Electrical", "Commercial Electrical", "Emergency Electrical", "EV Charger Installation", "Panel Upgrades"],
  "Roofing": ["Residential Roofing", "Commercial Roofing", "Storm Damage Repair", "Roof Replacement", "Metal Roofing"],
  "Solar": ["Residential Solar", "Commercial Solar", "Battery Storage", "Solar Maintenance"],
  "Remodeling": ["Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Renovation", "Basement Finishing", "Room Additions"],
  "Landscaping": ["Lawn Care", "Landscape Design", "Irrigation", "Tree Services", "Hardscaping"],
  "Windows & Doors": ["Window Replacement", "Door Installation", "Entry Doors", "Patio Doors", "Siding"],
  "Painting": ["Interior Painting", "Exterior Painting", "Commercial Painting", "Cabinet Refinishing"],
  "Cleaning": ["Residential Cleaning", "Commercial Cleaning", "Deep Cleaning", "Move-In/Move-Out", "Carpet Cleaning"],
  "Pest Control": ["Residential Pest Control", "Commercial Pest Control", "Termite Control", "Wildlife Removal"],
  "Legal": ["Family Law", "Personal Injury", "Criminal Defense", "Estate Planning", "Business Law", "Immigration"],
  "Med Spa / Aesthetics": ["Injectables", "Body Contouring", "Laser Treatments", "Skin Care", "IV Therapy"],
  "Real Estate": ["Residential Sales", "Commercial Sales", "Property Management", "Luxury Homes"],
  "Auto Services": ["General Repair", "Collision Repair", "Detailing", "Oil Change", "Tire Services"],
  "Other": ["Professional Services", "Healthcare", "Fitness", "Consulting", "Other"]
};

export const TEAM_SIZE_OPTIONS = ["Solo", "2–5", "6–15", "16–50", "50+"];

export const MONTHLY_LEAD_VOLUME_OPTIONS = [
  "1-10 leads/month",
  "11-25 leads/month",
  "26-50 leads/month",
  "51-100 leads/month",
  "101-200 leads/month",
  "200+ leads/month",
  "I don't know"
];

export const FIRST_CONTACT_SPEED_OPTIONS = [
  "Under 5 minutes (excellent—top 10%)",
  "5-30 minutes (good—top 25%)",
  "30 minutes to 2 hours (average—middle 50%)",
  "2-4 hours (slow—bottom 25%)",
  "4-24 hours (very slow—bottom 10%)",
  "24+ hours (critical problem)",
  "It varies wildly (inconsistent)"
];

export const LEAD_UNAVAILABILITY_OPTIONS = [
  "Rarely (we're almost always available)",
  "Sometimes (evenings/weekends we miss some)",
  "Often (we miss a significant number of calls/messages)",
  "Almost always (we're rarely available when they call)"
];

export const PHONE_UNAVAILABLE_HANDLING_OPTIONS = [
  { value: "Voicemail only", subtitle: "They leave a message, you call back" },
  { value: "Answering service", subtitle: "Live person takes messages" },
  { value: "AI voice assistant", subtitle: "Automated AI handles the call" },
  { value: "Honestly, most calls get missed", subtitle: "No backup system" }
];

export const DIGITAL_UNAVAILABLE_HANDLING_OPTIONS = [
  { value: "Auto-responder", subtitle: "Instant email or text reply" },
  { value: "Self-service booking", subtitle: "They can book without you" },
  { value: "We respond when we can", subtitle: "Manual response only" },
  { value: "Many slip through", subtitle: "No system in place" }
];

export const NO_SHOW_RECOVERY_OPTIONS = [
  "Yes, automatically (system does it for us)",
  "Yes, manually (someone has to remember to do it)",
  "Sometimes (when we're not too busy)",
  "Rarely (we try but it's inconsistent)",
  "No (once they no-show, they're gone)"
];

export const QUOTE_FOLLOWUP_OPTIONS = [
  "Automated follow-up sequence (emails/texts until they respond)",
  "Manual follow-up (we call/text when we remember)",
  "One attempt (we follow up once, then stop)",
  "Nothing (once we quote, we wait for them to decide)"
];

export const DORMANT_LEADS_OPTIONS = [
  "500+ (large reactivation opportunity)",
  "100–499",
  "Under 100",
  "I'm not sure / we don't track this"
];

export const NO_SHOW_RATE_OPTIONS = [
  "0-10% (excellent—very reliable customers)",
  "11-20% (average—some no-shows)",
  "21-35% (high—significant problem)",
  "35%+ (critical—major revenue drain)",
  "I don't track this"
];

export const CONTACT_CHANNEL_OPTIONS = [
  { value: "Phone call", subtitle: "Inbound calls" },
  { value: "Text/SMS", subtitle: "Text messages" },
  { value: "Website form", subtitle: "Contact forms" },
  { value: "Social media messages", subtitle: "FB, IG, etc." },
  { value: "Chat widget", subtitle: "Website chat" },
  { value: "Email", subtitle: "Direct email" },
  { value: "Online booking", subtitle: "Self-service" },
  { value: "Walk-ins only", subtitle: "In-person" }
];

export const AI_SEARCH_FREQUENCY_OPTIONS = [
  "Frequently (we get leads from Google/AI search regularly)",
  "Occasionally (some leads mention finding us online)",
  "Rarely or never",
  "I don't know / we don't ask"
];

export const AI_READINESS_OPTIONS = [
  { value: "We've intentionally optimized for AI search and voice assistants" },
  { value: "We've done some basic SEO but nothing AI-specific" },
  { value: "No real SEO or AI optimization — we rely on referrals/ads" },
  { value: "We don't really have a proper website" }
];

export const INTAKE_CENTRALIZATION_OPTIONS = [
  { value: "In a central CRM or booking system automatically" },
  { value: "In multiple tools (email, spreadsheets, notes)" },
  { value: "Mostly in people's heads / phones — not captured systematically" }
];

export const PIPELINE_TRACKING_OPTIONS = [
  { value: "Yes, consistently in a CRM or job system" },
  { value: "Partially (some data is tracked, some isn't)" },
  { value: "No, we mostly rely on memory and informal tools" }
];

export const REVIEW_REQUEST_OPTIONS = [
  "Yes, automatically (every customer gets a review request)",
  "Yes, manually (we ask when we remember)",
  "Sometimes (only our best customers)",
  "We rely on organic reviews / we don't really ask"
];

export const CLOSE_RATE_OPTIONS = [
  "1-2 out of 10 (10-20%)",
  "3-4 out of 10 (30-40%)",
  "5-6 out of 10 (50-60%)",
  "7-8 out of 10 (70-80%)",
  "9-10 out of 10 (90-100%)",
  "I don't know"
];

export const MANUAL_HOURS_OPTIONS = [
  "0-2 hours/week (minimal—very streamlined)",
  "3-5 hours/week (manageable)",
  "6-10 hours/week (significant—noticeable drag)",
  "11-20 hours/week (major time sink)",
  "20+ hours/week (overwhelming—drowning in admin)",
  "I'm not sure"
];

export const KNOWLEDGE_BOTTLENECK_OPTIONS = [
  "Yes, major bottleneck (constant interruptions for the same questions)",
  "Yes, but manageable (happens occasionally)",
  "No (everything is straightforward or well-documented)"
];

export const OPERATIONAL_COMPLEXITY_OPTIONS = [
  { value: "Single location, focused service (simple)" },
  { value: "Single location, multiple service lines (moderate)" },
  { value: "Multiple locations, same service (moderate)" },
  { value: "Multiple locations, multiple services (complex)" },
  { value: "Enterprise/franchise operations (very complex)" }
];

export const SPEED_GAP_LOSS_RATES: Record<string, { min: number; max: number }> = {
  "Under 5 minutes (excellent—top 10%)": { min: 0, max: 0 },
  "5-30 minutes (good—top 25%)": { min: 0.15, max: 0.20 },
  "30 minutes to 2 hours (average—middle 50%)": { min: 0.25, max: 0.35 },
  "2-4 hours (slow—bottom 25%)": { min: 0.35, max: 0.45 },
  "4-24 hours (very slow—bottom 10%)": { min: 0.50, max: 0.60 },
  "24+ hours (critical problem)": { min: 0.65, max: 0.75 },
  "It varies wildly (inconsistent)": { min: 0.40, max: 0.50 }
};

export const TIER_THRESHOLDS = {
  frontline: {
    maxLeadVolume: 50,
    minSpeedProblems: true,
    minSilenceProblems: false
  },
  specialist: {
    minLeadVolume: 50,
    maxLeadVolume: 150,
    speedProblems: true,
    silenceProblems: true
  },
  command: {
    minLeadVolume: 150,
    minManualHours: 10,
    highComplexity: true
  }
};
