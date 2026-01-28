import { z } from "zod";

export const RevenuePainItemSchema = z.object({
  value: z.string(),
  severity: z.number().min(1).max(5)
});

export const RevenuePainSchema = z.array(RevenuePainItemSchema).min(1).max(3);

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

export const UnavailabilityPctSchema = z.enum([
  "0-10% (Rare—we're almost always available)",
  "11-25% (Occasional—some evenings/weekends)",
  "26-50% (Frequent—about half the time)",
  "51-75% (Most of the time—we miss more than we catch)",
  "76-100% (Nearly constant—we're rarely available when they call)",
  "I don't know (we don't track this)"
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
  "Yes, hundreds or thousands (significant untapped opportunity)",
  "Yes, 50-200 leads (moderate database)",
  "Yes, under 50 (small list)",
  "No, we actively work our database (stay on top of it)",
  "I don't know / We don't track leads in a database"
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

export const SocialMediaActivitySchema = z.enum([
  "Yes, very active (post 3+ times/week, respond to comments/DMs)",
  "Somewhat active (have pages, post occasionally)",
  "Barely active (pages exist but rarely use them)",
  "No (don't use social media for business)"
]);

export const ReviewRequestSchema = z.enum([
  "Yes, automatically (every customer gets a review request)",
  "Yes, manually (we ask when we remember)",
  "Sometimes (only our best customers)",
  "No (we rely on organic reviews)"
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

export const AssessmentDataSchema = z.object({
  revenue_pain: RevenuePainSchema,
  business_name: z.string().min(1),
  industry: IndustrySchema,
  niche_specificity: z.string().min(1),
  team_size: TeamSizeSchema,
  avg_job_value: z.string().min(1),
  monthly_lead_volume: MonthlyLeadVolumeSchema,
  first_contact_speed: FirstContactSpeedSchema,
  unavailability_pct: UnavailabilityPctSchema,
  phone_unavailable_handling: PhoneUnavailableHandlingSchema,
  digital_unavailable_handling: DigitalUnavailableHandlingSchema,
  no_show_recovery: NoShowRecoverySchema,
  quote_followup: QuoteFollowUpSchema,
  dormant_leads: DormantLeadsSchema,
  no_show_rate: NoShowRateSchema,
  contact_channels: z.array(ContactChannelSchema).min(1),
  social_media_activity: SocialMediaActivitySchema,
  review_request: ReviewRequestSchema,
  close_rate: CloseRateSchema,
  manual_hours: ManualHoursSchema,
  knowledge_bottleneck: KnowledgeBottleneckSchema,
  operational_complexity: OperationalComplexitySchema,
  contact_name: z.string().min(1),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  disclaimer_accepted: z.boolean(),
});

export type AssessmentData = z.infer<typeof AssessmentDataSchema>;

export const AssessmentSubmitSchema = z.object({
  assessmentData: AssessmentDataSchema,
  speedGapScore: z.number(),
  speedGapEstimate: z.number(),
  speedGapFindings: z.array(z.string()),
  silenceGapScore: z.number(),
  silenceGapEstimate: z.number(),
  silenceGapFindings: z.array(z.string()),
  chaosGapScore: z.number(),
  chaosGapEstimate: z.number(),
  chaosGapFindings: z.array(z.string()),
  totalMonthlyGap: z.number(),
  annualizedGap: z.number(),
  recommendedTier: z.string(),
  tierReason: z.string(),
  totalMonthlyImpactLow: z.number().optional(),
  totalMonthlyImpactHigh: z.number().optional(),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
});
