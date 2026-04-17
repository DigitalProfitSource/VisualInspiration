export interface Step {
  id: string;
  title: string;
  description: string;
  fields: string[];
  progress: number;
}

export const STEPS: Step[] = [
  {
    id: "identity",
    title: "Let's start with your business",
    description: "Two quick inputs so we can anchor the analysis to you.",
    fields: ["business_name", "website_url", "industry"],
    progress: 0
  },
  {
    id: "volume",
    title: "Your numbers",
    description: "The four numbers that drive every calculation in your report. Estimates are fine.",
    fields: ["team_size", "monthly_lead_volume", "avg_job_value", "close_rate"],
    progress: 16
  },
  {
    id: "pain",
    title: "What's hurting most right now?",
    description: "Pick the friction points you feel on a regular basis. We'll lead your report with whatever you flag here.",
    fields: ["revenue_pain"],
    progress: 32
  },
  {
    id: "speed",
    title: "Speed to first response",
    description: "Most deals are won or lost in the first 5 minutes. Two questions on how you handle inbound.",
    fields: ["first_contact_speed", "phone_unavailable_handling"],
    progress: 48
  },
  {
    id: "followthrough",
    title: "Follow-through & reactivation",
    description: "What happens to quotes, no-shows, dormant leads, and past customers.",
    fields: ["quote_followup", "no_show_recovery", "dormant_leads", "review_request"],
    progress: 64
  },
  {
    id: "systems",
    title: "Your current systems",
    description: "Just enough to tell us what's automated today and how much manual lift your team is carrying.",
    fields: ["has_automations", "manual_hours"],
    progress: 80
  },
  {
    id: "contact",
    title: "Where should we send it?",
    description: "Your full Sequential Revenue™ report, including the PDF, goes straight to your inbox.",
    fields: ["contact_first_name", "contact_last_name", "contact_email", "disclaimer_accepted"],
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
  "Pool & Spa": ["Pool Installation", "Pool Maintenance", "Pool Repair", "Spa Services", "Pool Remodeling"],
  "Flooring": ["Hardwood", "Tile & Stone", "LVP / Laminate", "Carpet", "Epoxy & Concrete"],
  "Insulation": ["Attic Insulation", "Spray Foam", "Blown-In Insulation", "Commercial Insulation"],
  "Garage Doors": ["Residential Garage Doors", "Commercial Garage Doors", "Garage Door Repair", "Garage Door Openers"],
  "Security Systems": ["Home Security", "Commercial Security", "CCTV / Cameras", "Access Control", "Smart Home"],
  "Moving Services": ["Local Moving", "Long-Distance Moving", "Commercial Moving", "Packing Services", "Storage"],
  "Chiropractic": ["General Chiropractic", "Sports Chiropractic", "Pediatric Chiropractic", "Spinal Decompression"],
  "Dental": ["General Dentistry", "Cosmetic Dentistry", "Orthodontics", "Implants", "Emergency Dental"],
  "Financial Services": ["Financial Planning", "Tax Services", "Bookkeeping", "Payroll", "Business Consulting"],
  "Insurance": ["Auto Insurance", "Home Insurance", "Business Insurance", "Life Insurance", "Health Insurance"],
  "Fitness / Wellness": ["Personal Training", "Group Fitness", "Yoga / Pilates", "Nutrition Coaching", "Physical Therapy"],
  "Staffing / HR": ["Temporary Staffing", "Direct Hire", "HR Consulting", "Payroll Services", "Executive Search"],
  "Other": ["Professional Services", "Healthcare", "Retail", "Consulting", "Other"]
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
  { value: "Google Business Profile", subtitle: "GMB / Maps" }
];

export const AI_SEARCH_FREQUENCY_OPTIONS = [
  "Yes — we show up regularly",
  "Sometimes — we've seen it happen",
  "No — we don't show up",
  "Not sure — haven't checked"
];

export const AI_READINESS_OPTIONS = [
  { value: "Yes — we've optimized for AI discovery" },
  { value: "We've done basic SEO but nothing AI-specific" },
  { value: "No — we haven't thought about it" },
  { value: "We don't have much of an online presence" }
];

export const HAS_AUTOMATIONS_OPTIONS = [
  { value: "Yes — we have workflows set up (CRM sequences, auto-texts, etc.)", subtitle: "Full automation in place" },
  { value: "We have some basic automations but not a full system", subtitle: "Partial — gaps exist" },
  { value: "No — everything is done manually", subtitle: "No automation yet" }
];

export const HAS_AI_INTENT_OPTIONS = [
  { value: "Yes — we use AI to route, qualify, or respond to leads", subtitle: "AI-powered lead handling" },
  { value: "We've experimented with AI tools but nothing formal", subtitle: "Tested but not deployed" },
  { value: "No — we've looked into it but haven't implemented anything", subtitle: "Aware, not acting" },
  { value: "No — we haven't explored AI tools yet", subtitle: "Haven't started" }
];

export const STAFF_REPEAT_QUESTIONS_OPTIONS = [
  "Constantly — the same questions come up daily",
  "Sometimes — a few recurring questions per week",
  "Rarely — our team handles most things independently"
];

export const PROCESS_DOCUMENTATION_OPTIONS = [
  "Fully documented SOPs for all major processes",
  "Some documentation, but gaps exist",
  "Mostly in people's heads — little to nothing written down",
  "Nothing documented at all"
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
  "2-3 out of 10 (20-30%)",
  "3-4 out of 10 (30-40%)",
  "4-5 out of 10 (40-50%)",
  "5-6 out of 10 (50-60%)",
  "6-7 out of 10 (60-70%)",
  "7-8 out of 10 (70-80%)",
  "8-9 out of 10 (80-90%)",
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
