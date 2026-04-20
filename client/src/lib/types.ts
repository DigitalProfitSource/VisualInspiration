import { z } from "zod";

export const RevenuePainItemSchema = z.object({
  value: z.string(),
  severity: z.number().min(1).max(5)
});

export const RevenuePainSchema = z.array(RevenuePainItemSchema).min(1, "Select at least one area that feels familiar");

export type RevenuePainItem = z.infer<typeof RevenuePainItemSchema>;

// Industry is a free-text label (NAICS-aligned when possible, e.g. "Specialty
// Trade Contractor", "Offices of Dentists", "Other Personal Care Services").
// Claude populates this automatically from the scraped website, but users can
// override it manually. Scoring benchmarks fall back gracefully for any value
// that doesn't match a known category — there's no hard whitelist.
export const IndustrySchema = z.string().min(1, "Industry is required").max(120);

export const TeamSizeSchema = z.enum([
  "Solo",
  "2–5",
  "6–15",
  "16–50",
  "50+"
]);

export const MonthlyLeadVolumeSchema = z.enum([
  "1-10 leads/month",
  "11-25 leads/month",
  "26-50 leads/month",
  "51-100 leads/month",
  "101-200 leads/month",
  "200+ leads/month",
  "I don't know"
]);

export const FirstContactSpeedSchema = z.enum([
  "Under 5 minutes (excellent—top 10%)",
  "5-30 minutes (good—top 25%)",
  "30 minutes to 2 hours (average—middle 50%)",
  "2-4 hours (slow—bottom 25%)",
  "4-24 hours (very slow—bottom 10%)",
  "24+ hours (critical problem)",
  "It varies wildly (inconsistent)"
]);

export const LeadUnavailabilitySchema = z.enum([
  "Rarely (we're almost always available)",
  "Sometimes (evenings/weekends we miss some)",
  "Often (we miss a significant number of calls/messages)",
  "Almost always (we're rarely available when they call)"
]);

export const PhoneUnavailableHandlingSchema = z.enum([
  "Voicemail only",
  "Answering service",
  "AI voice assistant",
  "Honestly, most calls get missed"
]);

export const DigitalUnavailableHandlingSchema = z.enum([
  "Auto-responder",
  "Self-service booking",
  "We respond when we can",
  "Many slip through"
]);

export const NoShowRecoverySchema = z.enum([
  "Yes, automatically (system does it for us)",
  "Yes, manually (someone has to remember to do it)",
  "Sometimes (when we're not too busy)",
  "Rarely (we try but it's inconsistent)",
  "No (once they no-show, they're gone)"
]);

export const QuoteFollowUpSchema = z.enum([
  "Automated follow-up sequence (emails/texts until they respond)",
  "Manual follow-up (we call/text when we remember)",
  "One attempt (we follow up once, then stop)",
  "Nothing (once we quote, we wait for them to decide)"
]);

export const DormantLeadsSchema = z.enum([
  "500+ (large reactivation opportunity)",
  "100–499",
  "Under 100",
  "I'm not sure / we don't track this"
]);

export const NoShowRateSchema = z.enum([
  "0-10% (excellent—very reliable customers)",
  "11-20% (average—some no-shows)",
  "21-35% (high—significant problem)",
  "35%+ (critical—major revenue drain)",
  "I don't track this"
]);

export const ContactChannelSchema = z.enum([
  "Phone call",
  "Text/SMS",
  "Website form",
  "Social media messages",
  "Chat widget",
  "Email",
  "Online booking",
  "Google Business Profile",
  "Walk-ins only"
]);
export type ContactChannel = z.infer<typeof ContactChannelSchema>;

export const AISearchFrequencySchema = z.enum([
  "Yes — we show up regularly",
  "Sometimes — we've seen it happen",
  "No — we don't show up",
  "Not sure — haven't checked"
]);

export const AIReadinessSchema = z.enum([
  "Yes — we've optimized for AI discovery",
  "We've done basic SEO but nothing AI-specific",
  "No — we haven't thought about it",
  "We don't have much of an online presence"
]);

export const IntakeCentralizationSchema = z.enum([
  "In a central CRM or booking system automatically",
  "In multiple tools (email, spreadsheets, notes)",
  "Mostly in people's heads / phones — not captured systematically"
]);

export const PipelineTrackingSchema = z.enum([
  "Yes, consistently in a CRM or job system",
  "Partially (some data is tracked, some isn't)",
  "No, we mostly rely on memory and informal tools"
]);

export const ReviewRequestSchema = z.enum([
  "Yes, automatically (every customer gets a review request)",
  "Yes, manually (we ask when we remember)",
  "Sometimes (only our best customers)",
  "We rely on organic reviews / we don't really ask"
]);

export const CloseRateSchema = z.enum([
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
]);

export const ManualHoursSchema = z.enum([
  "0-2 hours/week (minimal—very streamlined)",
  "3-5 hours/week (manageable)",
  "6-10 hours/week (significant—noticeable drag)",
  "11-20 hours/week (major time sink)",
  "20+ hours/week (overwhelming—drowning in admin)",
  "I'm not sure"
]);

export const HasAutomationsSchema = z.enum([
  "Yes — we have workflows set up (CRM sequences, auto-texts, etc.)",
  "We have some basic automations but not a full system",
  "No — everything is done manually"
]);

export const HasAIIntentSchema = z.enum([
  "Yes — we use AI to route, qualify, or respond to leads",
  "We've experimented with AI tools but nothing formal",
  "No — we've looked into it but haven't implemented anything",
  "No — we haven't explored AI tools yet"
]);

export const StaffRepeatQuestionsSchema = z.enum([
  "Constantly — the same questions come up daily",
  "Sometimes — a few recurring questions per week",
  "Rarely — our team handles most things independently"
]);

export const ProcessDocumentationSchema = z.enum([
  "Fully documented SOPs for all major processes",
  "Some documentation, but gaps exist",
  "Mostly in people's heads — little to nothing written down",
  "Nothing documented at all"
]);

export const OperationalComplexitySchema = z.enum([
  "Single location, focused service (simple)",
  "Single location, multiple service lines (moderate)",
  "Multiple locations, same service (moderate)",
  "Multiple locations, multiple services (complex)",
  "Enterprise/franchise operations (very complex)"
]);

export const AssessmentSchema = z.object({
  revenue_pain: RevenuePainSchema,
  business_name: z.string().min(1, "Company name is required"),
  website_url: z.string().min(1, "Website URL is required").regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, "Please enter a valid URL"),
  industry: IndustrySchema,
  niche_specificity: z.string().min(1, "Select your specialization"),
  team_size: TeamSizeSchema,
  avg_job_value: z.string().min(1, "Required"),
  monthly_sales_volume: z.string().min(1, "Required"),
  ad_spend: z.string().min(1, "Required"),
  monthly_lead_volume: MonthlyLeadVolumeSchema,
  first_contact_speed: FirstContactSpeedSchema,
  lead_unavailability: LeadUnavailabilitySchema,
  phone_unavailable_handling: PhoneUnavailableHandlingSchema,
  digital_unavailable_handling: DigitalUnavailableHandlingSchema,
  no_show_recovery: NoShowRecoverySchema,
  quote_followup: QuoteFollowUpSchema,
  dormant_leads: DormantLeadsSchema,
  no_show_rate: NoShowRateSchema,
  contact_channels: z.array(ContactChannelSchema).min(1, "Select at least one contact channel"),
  ai_search_frequency: AISearchFrequencySchema,
  ai_readiness: AIReadinessSchema,
  has_automations: HasAutomationsSchema,
  has_ai_intent: HasAIIntentSchema,
  review_request: ReviewRequestSchema,
  close_rate: CloseRateSchema,
  intake_centralization: IntakeCentralizationSchema,
  pipeline_tracking: PipelineTrackingSchema,
  manual_hours: ManualHoursSchema,
  staff_repeat_questions: StaffRepeatQuestionsSchema,
  process_documentation: ProcessDocumentationSchema,
  operational_complexity: OperationalComplexitySchema,
  contact_first_name: z.string().min(1, "First name is required"),
  contact_last_name: z.string().min(1, "Last name is required"),
  contact_email: z.string().email("Valid email is required"),
  contact_phone: z.string().optional(),
  disclaimer_accepted: z.boolean().refine(val => val === true, { message: "You must accept the disclaimer" }),
});

export type AssessmentData = z.infer<typeof AssessmentSchema>;
