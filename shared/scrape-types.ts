/**
 * Shared types for the website scraping and AI specialization flow.
 * Consumed by both server (scraper.ts, ai-specialist.ts) and client hooks + UI.
 */

export interface ScrapeInsights {
  success: boolean;
  domain: string;
  businessName?: string;
  description?: string;
  industryHints: string[];
  serviceHints: string[];
  hasSchema: boolean;
  schemaTypes: string[];
  hasBookingWidget: boolean;
  hasChatWidget: boolean;
  contactMethods: string[];
  error?: string;
}

/** Request body for POST /api/suggest-specialization */
export interface SpecializationRequest {
  /** Required for manual path; optional for scraped path (Claude will classify). */
  industry?: string;
  scraped?: {
    domain?: string;
    businessName?: string;
    description?: string;
    serviceHints: string[];
  };
  manual?: {
    specialty: string;
    idealCustomer: string;
  };
}

/** Response from POST /api/suggest-specialization */
export interface SpecializationResponse {
  success: boolean;
  /** The generated specialization label, or null if AI failed */
  suggestion: string | null;
  /** Claude-classified industry label (human-readable, NAICS-aligned when possible). */
  industry?: string | null;
  /** The 6-digit NAICS code, e.g. "238990". */
  naicsCode?: string | null;
  /** Official NAICS title, e.g. "All Other Specialty Trade Contractors". */
  naicsTitle?: string | null;
  /**
   * Claude's best determination of the actual brand/trading name.
   * Overrides the scraper's heuristic extraction when the domain is an SEO/geo name
   * (e.g. landscapingboise.com → "Landscaping Boise" scraper vs "Chamberlain & Sons" Claude).
   */
  businessName?: string | null;
}
