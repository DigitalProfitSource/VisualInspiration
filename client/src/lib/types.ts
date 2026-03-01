import { z } from "zod";

export const RevenuePainItemSchema = z.object({
  value: z.string(),
  severity: z.number().min(1).max(5)
});

export const RevenuePainSchema = z.array(RevenuePainItemSchema).min(1, "Select at least one area that feels familiar").max(3, "Select up to 3 areas");

export type RevenuePainItem = z.infer<typeof RevenuePainItemSchema>;

export const IndustrySchema = z.enum([
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Solar",
  "Remodeling",
  "Landscaping",
  "Windows & Doors",
  "Painting",
  "Cleaning",
  "Pest Control",
  "Legal",
  "Med Spa / Aesthetics",
  "Real Estate",
  "Auto Services",
  "Other"
]);

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
  "Walk-ins only"
]);
export type ContactChannel = z.infer<typeof ContactChannelSchema>;

export const AISearchFrequencySchema = z.enum([
  "Frequently (we get leads from Google/AI search regularly)",
  "Occasionally (some leads mention finding us online)",
  "Rarely or never",
  "I don't know / we don't ask"
]);

export const AIReadinessSchema = z.enum([
  "We've intentionally optimized for AI search and voice assistants",
  "We've done some basic SEO but nothing AI-specific",
  "No real SEO or AI optimization — we rely on referrals/ads",
  "We don't really have a proper website"
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
  "3-4 out of 10 (30-40%)",
  "5-6 out of 10 (50-60%)",
  "7-8 out of 10 (70-80%)",
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

export const KnowledgeBottleneckSchema = z.enum([
  "Yes, major bottleneck (constant interruptions for the same questions)",
  "Yes, but manageable (happens occasionally)",
  "No (everything is straightforward or well-documented)"
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
  website_url: z.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, "Please enter a valid URL").or(z.literal("")),
  industry: IndustrySchema,
  niche_specificity: z.string().min(1, "Select your specialization"),
  team_size: TeamSizeSchema,
  avg_job_value: z.string().min(1, "Required"),
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
  review_request: ReviewRequestSchema,
  close_rate: CloseRateSchema,
  intake_centralization: IntakeCentralizationSchema,
  pipeline_tracking: PipelineTrackingSchema,
  manual_hours: ManualHoursSchema,
  knowledge_bottleneck: KnowledgeBottleneckSchema,
  operational_complexity: OperationalComplexitySchema,
  contact_first_name: z.string().min(1, "First name is required"),
  contact_last_name: z.string().min(1, "Last name is required"),
  contact_email: z.string().email("Valid email is required"),
  contact_phone: z.string().optional(),
  disclaimer_accepted: z.boolean().refine(val => val === true, { message: "You must accept the disclaimer" }),
});

export type AssessmentData = z.infer<typeof AssessmentSchema>;
