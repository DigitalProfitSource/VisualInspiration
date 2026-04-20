/**
 * Lightweight website scraper powered by Firecrawl.
 *
 * Scrapes a single URL (the user's homepage) and extracts signals that help
 * personalize the Sequential Revenue™ assessment:
 *   - Business name / description
 *   - Industry + service hints
 *   - Schema.org / JSON-LD presence (critical for AI Search Visibility finding)
 *   - Booking / chat widget presence (informs Capture friction analysis)
 *   - Visible contact methods
 *
 * Design notes:
 *   - Fails silently. If Firecrawl errors or times out, we return a minimal
 *     payload and the assessment proceeds exactly as before. The scrape is
 *     never a blocker.
 *   - No crawling. One URL, one call, one response. Keeps Firecrawl cost low
 *     and response time fast.
 *   - No PII captured. We only read publicly published marketing copy.
 */

import type { ScrapeInsights } from "@shared/scrape-types";

export type { ScrapeInsights };

const FIRECRAWL_ENDPOINT = "https://api.firecrawl.dev/v1/scrape";
const FIRECRAWL_TIMEOUT_MS = 15_000;

interface FirecrawlMetadata {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  sourceURL?: string;
}

interface FirecrawlResponse {
  success: boolean;
  data?: {
    markdown?: string;
    html?: string;
    metadata?: FirecrawlMetadata;
  };
  error?: string;
}

/**
 * Normalize a URL to a clean domain string (no protocol, no path, no trailing slash).
 */
function normalizeDomain(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Ensure URL has a protocol. Firecrawl requires it.
 */
function ensureProtocol(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Extract business name from metadata.
 *
 * Priority:
 *   1. og:site_name — always the pure business name
 *   2. Title split by separator, with separator-specific conventions:
 *        - ":"        → brand is LEFT  ("Sawtooth Gutter Solutions: Seamless gutters...")
 *        - "|", "»"   → brand is RIGHT ("Colon Hydrotherapy | Living Waters Wellness Center")
 *        - "-","—","–" → ambiguous; pick the segment whose tokens best match the domain
 *   3. Generic-word filter (home / welcome / services / etc.)
 */
function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length >= 3);
}

function domainTokens(domain: string): string[] {
  // "sawtoothguttersolutions.com" → strip TLD, split camelcase-ish by splitting every
  // contiguous alpha run. Since hostnames are lowercase, we fall back to substring match.
  const host = domain.replace(/\.[a-z.]+$/, "");
  return [host];
}

function scoreSegmentAgainstDomain(segment: string, domain: string): number {
  const hostTokens = domainTokens(domain);
  const segTokens = tokenize(segment);
  if (segTokens.length === 0) return 0;
  // Simple heuristic: how many segment tokens appear as substrings in the host.
  let hits = 0;
  for (const tok of segTokens) {
    for (const host of hostTokens) {
      if (host.includes(tok)) { hits++; break; }
    }
  }
  return hits / segTokens.length;
}

function extractBusinessName(
  metadata: FirecrawlMetadata | undefined,
  domain: string,
): string | undefined {
  if (!metadata) return undefined;

  const generic = /^(home|welcome|homepage|index|about|contact|services)$/i;

  // og:site_name is usually the brand — but some sites set it to a tagline.
  // Trust it only if it looks related to the domain.
  const ogName = metadata.ogSiteName?.trim();
  if (ogName && !generic.test(ogName)) {
    const score = scoreSegmentAgainstDomain(ogName, domain);
    if (score >= 0.5) return ogName;
    // Low score — keep going, the title likely has a better candidate.
  }

  const raw = metadata.ogTitle || metadata.title;
  if (!raw) return undefined;
  const cleanSegments = (sep: RegExp) =>
    raw.split(sep).map(s => s.trim()).filter(Boolean).filter(s => !generic.test(s));

  // 1. Colon convention — brand on LEFT
  if (/:/.test(raw)) {
    const segs = cleanSegments(/\s*:\s*/);
    if (segs.length >= 1) return segs[0];
  }

  // 2. Pipe / chevron convention — brand on RIGHT
  if (/[|»·]/.test(raw)) {
    const segs = cleanSegments(/\s*[|»·]\s*/);
    if (segs.length >= 1) return segs[segs.length - 1];
  }

  // 3. Dash separators are ambiguous — use domain-matching tiebreaker
  if (/[—–\-]/.test(raw)) {
    const segs = cleanSegments(/\s*[—–\-]\s*/);
    if (segs.length === 1) return segs[0];
    if (segs.length > 1) {
      let best = segs[0];
      let bestScore = scoreSegmentAgainstDomain(segs[0], domain);
      for (let i = 1; i < segs.length; i++) {
        const s = scoreSegmentAgainstDomain(segs[i], domain);
        if (s > bestScore) { bestScore = s; best = segs[i]; }
      }
      // If no segment matches the domain at all, fall back to last segment (pipe-like convention).
      if (bestScore === 0) return segs[segs.length - 1];
      return best;
    }
  }

  // 4. No separator found
  return generic.test(raw.trim()) ? undefined : raw.trim();
}

/**
 * Industry keyword map → fires a hint if any keyword appears in the copy.
 * Keys match the form's INDUSTRY_NICHE_MAP exactly so client-side matching is trivial.
 * These hints are suggestions; the user still confirms the industry.
 */
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  "HVAC": ["hvac", "heating and cooling", "heating & cooling", "air conditioning", "furnace", "heat pump", "ac repair", "cooling system"],
  "Plumbing": ["plumbing", "plumber", "drain cleaning", "water heater", "sewer line", "leak repair"],
  "Electrical": ["electrical", "electrician", "panel upgrade", "ev charger", "wiring", "generator install"],
  "Roofing": ["roofing", "roof repair", "roof replacement", "shingle", "metal roof", "storm damage", "gutter", "seamless gutter", "gutter guard", "gutter cleaning", "gutter repair"],
  "Solar": ["solar", "solar panel", "battery storage", "photovoltaic"],
  "Remodeling": ["remodel", "renovation", "kitchen remodel", "bathroom remodel", "home addition", "basement finish"],
  "Landscaping": ["landscaping", "lawn care", "tree service", "hardscape", "irrigation", "landscape design"],
  "Windows & Doors": ["window replacement", "door installation", "entry door", "patio door", "siding"],
  "Painting": ["painting", "painter", "interior paint", "exterior paint", "cabinet refinish"],
  "Cleaning": ["house cleaning", "maid service", "commercial cleaning", "carpet cleaning", "janitorial"],
  "Fitness / Wellness": ["wellness", "holistic", "colon hydrotherapy", "hydrotherapy", "detox", "colonic", "naturopathic", "massage therapy", "acupuncture", "meditation", "yoga", "pilates", "crossfit", "gym", "personal training", "chiropractic wellness", "integrative health", "functional medicine"],
  "Pest Control": ["pest control", "exterminator", "termite", "wildlife removal", "rodent"],
  "Legal": ["attorney", "lawyer", "law firm", "legal services", "family law", "personal injury", "estate planning", "criminal defense"],
  "Med Spa / Aesthetics": ["med spa", "medspa", "botox", "dermal filler", "coolsculpting", "injectable", "laser treatment", "microneedling", "lip filler"],
  "Real Estate": ["real estate", "realtor", "homes for sale", "listing", "brokerage", "property management"],
  "Auto Services": ["auto repair", "mechanic", "oil change", "tire service", "collision repair", "detailing", "car wash"],
  "Pool & Spa": ["pool installation", "pool service", "pool maintenance", "pool repair", "spa service"],
  "Flooring": ["flooring", "hardwood floor", "tile install", "lvp", "laminate floor", "epoxy floor"],
  "Insulation": ["insulation", "spray foam", "attic insulation", "blown-in insulation"],
  "Garage Doors": ["garage door", "garage opener"],
  "Security Systems": ["security system", "home security", "cctv", "surveillance", "alarm system"],
  "Moving Services": ["moving company", "movers", "relocation", "long-distance moving"],
  "Chiropractic": ["chiropractic", "chiropractor", "spinal"],
  "Dental": ["dentist", "dental", "orthodontic", "implants", "cosmetic dentistry"],
  "Financial Services": ["financial planning", "tax services", "bookkeeping", "payroll", "cpa"],
  "Insurance": ["insurance agent", "insurance broker", "auto insurance", "home insurance", "life insurance"],
};

/**
 * Detect industry hints from text content.
 */
function detectIndustryHints(text: string): string[] {
  const lower = text.toLowerCase();
  const hits: string[] = [];
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      hits.push(industry);
    }
  }
  return hits;
}

/**
 * Extract service-like headings from markdown.
 * Looks for h2/h3 that sound like services (short phrases, not CTAs).
 */
function extractServiceHints(markdown: string): string[] {
  const lines = markdown.split("\n");
  const headings: string[] = [];
  const ctaPatterns = /^(contact|about|home|reviews?|testimonials?|blog|faq|pricing|get started|book now|schedule|call|menu|gallery|careers?|privacy|terms)/i;

  for (const line of lines) {
    const match = line.match(/^#{2,3}\s+(.+)$/);
    if (!match) continue;
    const heading = match[1].trim().replace(/[*_`]/g, "");
    if (heading.length < 3 || heading.length > 60) continue;
    if (ctaPatterns.test(heading)) continue;
    if (!headings.includes(heading)) headings.push(heading);
    if (headings.length >= 8) break;
  }
  return headings;
}

/**
 * Detect JSON-LD schema presence and types.
 * Critical signal for the AI Search Visibility finding in results.
 */
function detectSchema(html: string): { hasSchema: boolean; schemaTypes: string[] } {
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types = new Set<string>();
  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    try {
      const json = JSON.parse(match[1].trim());
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        const type = item["@type"];
        if (typeof type === "string") types.add(type);
        else if (Array.isArray(type)) type.forEach(t => typeof t === "string" && types.add(t));
      }
    } catch {
      // Malformed JSON-LD — still counts as a schema attempt
    }
  }

  return { hasSchema: count > 0, schemaTypes: Array.from(types) };
}

/**
 * Detect common booking widget signals.
 */
function detectBookingWidget(html: string, markdown: string): boolean {
  const signals = [
    "calendly.com",
    "acuityscheduling.com",
    "squareup.com/appointments",
    "setmore.com",
    "book now",
    "schedule online",
    "book appointment",
    "book your",
    "schedule a consultation",
  ];
  const combined = (html + " " + markdown).toLowerCase();
  return signals.some(s => combined.includes(s));
}

/**
 * Detect common chat widget signals.
 */
function detectChatWidget(html: string): boolean {
  const signals = [
    "intercom.io",
    "drift.com",
    "tawk.to",
    "livechat",
    "zendesk.com/embed",
    "hubspot.com/conversations",
    "widget.leadconnector",
    "chatwoot",
    "crisp.chat",
  ];
  const lower = html.toLowerCase();
  return signals.some(s => lower.includes(s));
}

/**
 * Detect visible contact methods from the copy.
 */
function detectContactMethods(html: string, markdown: string): string[] {
  const methods = new Set<string>();
  const combined = (html + " " + markdown).toLowerCase();

  if (/tel:|\(\d{3}\)\s*\d{3}-?\d{4}|\d{3}-\d{3}-\d{4}/.test(combined)) methods.add("Phone");
  if (/mailto:|@[\w.-]+\.(com|net|org|io|co)/i.test(combined)) methods.add("Email");
  if (/<form|contact form|get a quote|request.+quote|get in touch/i.test(combined)) methods.add("Web Form");
  if (/text us|sms|text \(?\d/i.test(combined)) methods.add("SMS");
  if (/chat now|live chat|chat with us/i.test(combined)) methods.add("Chat");

  return Array.from(methods);
}

/**
 * Main scraper entry point.
 * Returns insights on success; returns { success: false } on any failure.
 */
export async function scrapeWebsite(inputUrl: string): Promise<ScrapeInsights> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  const domain = normalizeDomain(inputUrl);

  const emptyResult: ScrapeInsights = {
    success: false,
    domain,
    industryHints: [],
    serviceHints: [],
    hasSchema: false,
    schemaTypes: [],
    hasBookingWidget: false,
    hasChatWidget: false,
    contactMethods: [],
  };

  if (!apiKey) {
    return { ...emptyResult, error: "Firecrawl not configured" };
  }

  const url = ensureProtocol(inputUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FIRECRAWL_TIMEOUT_MS);

  try {
    const response = await fetch(FIRECRAWL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
        onlyMainContent: false,
        timeout: 12_000,
        blockAds: true,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { ...emptyResult, error: `Firecrawl ${response.status}` };
    }

    const payload = (await response.json()) as FirecrawlResponse;
    if (!payload.success || !payload.data) {
      return { ...emptyResult, error: payload.error || "Scrape failed" };
    }

    const { markdown = "", html = "", metadata } = payload.data;
    const businessName = extractBusinessName(metadata, domain);
    console.log(
      `[scraper] ${domain} → title="${metadata?.title ?? ""}" ogSiteName="${metadata?.ogSiteName ?? ""}" → businessName="${businessName ?? ""}"`
    );
    const description = metadata?.description || metadata?.ogDescription;

    // Scan title + description first — far more reliable than full markdown.
    // Full-page markdown picks up competitor mentions, blog content, footer links,
    // etc. which causes false-positive industry hits.
    // Only fall back to full markdown scan if title/description returns nothing.
    const titleDescText = `${metadata?.title || ""} ${description || ""}`;
    const titleDescHints = detectIndustryHints(titleDescText);
    const industryHints = titleDescHints.length > 0
      ? titleDescHints
      : detectIndustryHints(`${titleDescText} ${markdown}`);
    const serviceHints = extractServiceHints(markdown);
    const { hasSchema, schemaTypes } = detectSchema(html);
    const hasBookingWidget = detectBookingWidget(html, markdown);
    const hasChatWidget = detectChatWidget(html);
    const contactMethods = detectContactMethods(html, markdown);

    return {
      success: true,
      domain,
      businessName,
      description,
      industryHints,
      serviceHints,
      hasSchema,
      schemaTypes,
      hasBookingWidget,
      hasChatWidget,
      contactMethods,
    };
  } catch (err) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : "Unknown scrape error";
    return { ...emptyResult, error: message };
  }
}
