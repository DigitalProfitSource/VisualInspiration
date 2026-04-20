/**
 * AI Business Classifier — uses Claude to generate both the industry
 * classification and the custom specialization label for any service business.
 *
 * Design notes:
 *   - Single AI call returns BOTH industry + specialization as JSON
 *   - Industry is picked from a whitelist (+ "Other" as fallback)
 *   - Fast: uses Claude Haiku 4.5 for low latency (< 1s typical)
 *   - Fails silently: any error returns null, assessment proceeds normally
 *   - Never a blocker: the assessment works perfectly without this
 */

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001"; // Claude Haiku 4.5 — confirmed available
const AI_TIMEOUT_MS = 12_000;

interface ScrapedContext {
  kind: "scraped";
  domain?: string;
  businessName?: string;
  description?: string;
  serviceHints: string[];
}

interface ManualContext {
  kind: "manual";
  specialty: string;
  idealCustomer: string;
}

export interface SpecializationContext {
  industry: string;
  context: ScrapedContext | ManualContext;
}

export interface ClassificationContext {
  scraped: ScrapedContext;
}

export interface BusinessClassification {
  /** Human-readable industry label, NAICS-aligned (e.g. "Specialty Trade Contractor"). */
  industry: string;
  /** 6-digit NAICS code (e.g. "238990"). */
  naicsCode: string;
  /** Official NAICS title (e.g. "All Other Specialty Trade Contractors"). */
  naicsTitle: string;
  /** Precise 2–6 word specialization label. */
  specialization: string;
}

// --------------------------------------------------------------------------
// Prompt builders
// --------------------------------------------------------------------------

function buildSpecializationPrompt(input: SpecializationContext): string {
  const { industry, context } = input;
  const contextLines: string[] = [];

  if (context.kind === "scraped") {
    if (context.description) contextLines.push(`Meta description (most reliable): ${context.description.slice(0, 400)}`);
    if (context.businessName) contextLines.push(`Business name: ${context.businessName}`);
    if (context.domain) contextLines.push(`Domain: ${context.domain}`);
    if (context.serviceHints.length > 0) {
      contextLines.push(`Page headings (secondary, may include navigation): ${context.serviceHints.slice(0, 6).join(", ")}`);
    }
  } else {
    if (context.specialty) contextLines.push(`What they do: ${context.specialty}`);
    if (context.idealCustomer) contextLines.push(`Ideal customer: ${context.idealCustomer}`);
  }

  return `You are a business specialization classifier for a revenue-optimization assessment tool.

Given a service business's context, return ONLY a 2–6 word specialization label that precisely describes what they do within their industry. Nothing else — no explanation, no period, no quotes, no formatting.

Good examples: Colon Hydrotherapy, Residential HVAC Repair, Personal Injury Law, Botox & Dermal Fillers, Seamless Gutter Installation, Commercial Electrical Contracting, IV Therapy & Infusions, Pediatric Dentistry

Industry: ${industry}
${contextLines.join("\n")}

Specialization:`;
}

function buildClassificationPrompt(input: ClassificationContext): string {
  const { scraped } = input;
  const contextLines: string[] = [];
  if (scraped.description) contextLines.push(`Meta description (most reliable): ${scraped.description.slice(0, 400)}`);
  if (scraped.businessName) contextLines.push(`Business name: ${scraped.businessName}`);
  if (scraped.domain) contextLines.push(`Domain: ${scraped.domain}`);
  if (scraped.serviceHints.length > 0) {
    contextLines.push(`Page headings (secondary): ${scraped.serviceHints.slice(0, 6).join(", ")}`);
  }

  return `You are a NAICS-based business classifier for a revenue-optimization assessment tool.

Your job: analyze the scraped website context below and return a precise industry classification using U.S. NAICS 2022 standards, plus a specialization label.

Return ONLY a minified JSON object with these four keys (no prose, no markdown, no code fences):
  - "industry": a short, human-readable industry label (2–5 words) suitable for display in a form. NAICS-aligned. Examples: "Specialty Trade Contractor", "Offices of Dentists", "Law Firm", "Med Spa", "Pest Control Services", "Landscaping Services", "Auto Repair Shop", "Residential HVAC Contractor", "Management Consulting", "Commercial Printing".
  - "naicsCode": the 6-digit NAICS code as a string (e.g. "238990").
  - "naicsTitle": the official NAICS 2022 title (e.g. "All Other Specialty Trade Contractors").
  - "specialization": a 2–6 word label that describes precisely what THIS business does within their industry. More specific than "industry" — captures the actual service mix.

Rules:
  - Classify based on their PRIMARY service. If a company does gutters, not roofs, classify as specialty trade contractor (238990), not roofing contractor (238160).
  - Be precise. A med spa is NAICS 812199 (Other Personal Care Services), not 621399 (medical).
  - If multiple NAICS codes apply, pick the one that best matches their primary revenue source.
  - Specialization must be specific and useful (e.g. "Seamless Gutter Installation" not "Gutter Services"; "Personal Injury Law" not "Legal Services").

NAICS reference examples:
  - Gutter installer → 238990, "All Other Specialty Trade Contractors", industry "Specialty Trade Contractor"
  - Dental practice → 621210, "Offices of Dentists", industry "Offices of Dentists"
  - Law firm → 541110, "Offices of Lawyers", industry "Law Firm"
  - Med spa → 812199, "Other Personal Care Services", industry "Med Spa"
  - Pest control → 561710, "Exterminating and Pest Control Services", industry "Pest Control Services"
  - Residential HVAC contractor → 238220, "Plumbing, Heating, and Air-Conditioning Contractors", industry "HVAC Contractor"
  - Roofing contractor → 238160, "Roofing Contractors", industry "Roofing Contractor"
  - Landscaper → 561730, "Landscaping Services", industry "Landscaping Services"
  - Auto repair → 811111, "General Automotive Repair", industry "Auto Repair Shop"
  - Management consultant → 541611, "Administrative Management and General Management Consulting Services", industry "Management Consulting"

Example output (gutter company):
{"industry":"Specialty Trade Contractor","naicsCode":"238990","naicsTitle":"All Other Specialty Trade Contractors","specialization":"Seamless Gutter Installation & Repair"}

Business context:
${contextLines.join("\n")}

JSON:`;
}

// --------------------------------------------------------------------------
// Shared Claude call
// --------------------------------------------------------------------------

interface AnthropicResponse {
  content?: Array<{ type: string; text?: string }>;
  error?: { message: string };
}

async function callClaude(prompt: string, maxTokens: number): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[ai-specialist] ANTHROPIC_API_KEY not configured — skipping");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "(unreadable)");
      console.error(
        `[ai-specialist] Claude API error ${response.status} (model: ${MODEL}):`,
        errorBody.slice(0, 500)
      );
      return null;
    }

    const data = (await response.json()) as AnthropicResponse;
    return data.content?.[0]?.text?.trim() ?? null;
  } catch (err) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : "unknown";
    if (msg !== "This operation was aborted") {
      console.error(`[ai-specialist] Error: ${msg}`);
    }
    return null;
  }
}

// --------------------------------------------------------------------------
// Public API
// --------------------------------------------------------------------------

/**
 * Classifies a business from scraped context. Returns BOTH industry + specialization
 * so the caller can auto-apply both without keyword-matching guesswork.
 */
export async function classifyBusiness(
  input: ClassificationContext
): Promise<BusinessClassification | null> {
  const raw = await callClaude(buildClassificationPrompt(input), 150);
  if (!raw) return null;

  // Strip code fences if Claude added them despite instructions
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  try {
    const parsed = JSON.parse(cleaned) as {
      industry?: unknown;
      naicsCode?: unknown;
      naicsTitle?: unknown;
      specialization?: unknown;
    };
    const industry = typeof parsed.industry === "string"
      ? parsed.industry.replace(/^["'`]|["'`]$/g, "").trim().slice(0, 120)
      : "";
    const naicsCode = typeof parsed.naicsCode === "string"
      ? parsed.naicsCode.replace(/\D/g, "").slice(0, 6)
      : "";
    const naicsTitle = typeof parsed.naicsTitle === "string"
      ? parsed.naicsTitle.replace(/^["'`]|["'`]$/g, "").trim().slice(0, 160)
      : "";
    const specialization = typeof parsed.specialization === "string"
      ? parsed.specialization.replace(/^["'`]|["'`]$/g, "").replace(/\.$/, "").trim().slice(0, 80)
      : "";

    // Industry + specialization are required; NAICS fields are nice-to-have
    // (we don't hard-fail the assessment if Claude omits them — but in practice
    // the prompt is explicit enough that all four come back together).
    if (!industry || !specialization) return null;

    return {
      industry,
      naicsCode: /^\d{6}$/.test(naicsCode) ? naicsCode : "",
      naicsTitle,
      specialization,
    };
  } catch (err) {
    console.error("[ai-specialist] JSON parse failed:", cleaned.slice(0, 200));
    return null;
  }
}

/**
 * Legacy: generates ONLY a specialization label. Used for the manual fallback
 * path where the user has already picked an industry.
 */
export async function suggestSpecialization(
  input: SpecializationContext
): Promise<string | null> {
  const text = await callClaude(buildSpecializationPrompt(input), 64);
  if (!text) return null;
  return text
    .replace(/^["'`]|["'`]$/g, "")
    .replace(/\.$/, "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 80) || null;
}
