/**
 * useSpecialization — manages the AI-powered business classification flow
 * (NAICS industry + code + title + specialization) and the manual fallback
 * when no URL is given.
 *
 * Flow:
 *   1. When scrape succeeds → call Claude API with scraped context. Claude
 *      returns industry label (NAICS-aligned), 6-digit NAICS code, official
 *      NAICS title, and a 2–6 word specialization label.
 *   2. When scrape fails/idle + industry is already set → show fallback
 *      manual inputs so the user can describe their business in their own words.
 *   3. User fills manual inputs + clicks "Suggest" → call Claude API
 *      (specialization only, since industry is already known).
 *   4. If Claude fails → silent fail, user types their own value.
 *
 * The hook never throws. The assessment always proceeds.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScrapeInsights, SpecializationRequest, SpecializationResponse } from "@shared/scrape-types";
import type { ScrapeStatus } from "@/hooks/use-website-scrape";

export type SpecializationStatus =
  | "idle"
  | "loading"
  | "suggested"
  | "failed"
  | "manual-ready"
  | "dismissed";

export interface UseSpecializationResult {
  /** The AI-generated specialization string, or null */
  suggestion: string | null;
  /** The AI-classified industry (NAICS-aligned label), or null */
  suggestedIndustry: string | null;
  /** 6-digit NAICS code, or null */
  suggestedNaicsCode: string | null;
  /** Official NAICS 2022 title, or null */
  suggestedNaicsTitle: string | null;
  /**
   * Claude's corrected business name — overrides the scraper's domain-derived extraction
   * when the domain is a geo/SEO name rather than the actual brand.
   */
  suggestedBusinessName: string | null;
  status: SpecializationStatus;
  showFallback: boolean;
  generateFromManual: (specialty: string, idealCustomer: string) => void;
  dismiss: () => void;
}

const CACHE_PREFIX = "spec:";
// Bump this when the classifier payload shape changes so cached responses from
// an older shape don't poison the new flow.
// v2: NAICS rebuild (industry enum → free-text)
// v3: businessName field added; scraper domain-match heuristic inverted
const CACHE_VERSION = "v3";

function makeCacheKey(scope: string, suffix: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}:${scope}:${suffix}`;
}

function hasUrl(url: string | undefined): boolean {
  if (!url?.trim()) return false;
  return url.trim().length >= 4 && url.includes(".");
}

export function useSpecialization(
  industry: string | undefined,
  scrapeInsights: ScrapeInsights | null,
  scrapeStatus: ScrapeStatus,
  websiteUrl: string | undefined
): UseSpecializationResult {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [suggestedIndustry, setSuggestedIndustry] = useState<string | null>(null);
  const [suggestedNaicsCode, setSuggestedNaicsCode] = useState<string | null>(null);
  const [suggestedNaicsTitle, setSuggestedNaicsTitle] = useState<string | null>(null);
  const [suggestedBusinessName, setSuggestedBusinessName] = useState<string | null>(null);
  const [status, setStatus] = useState<SpecializationStatus>("idle");
  const inflightRef = useRef<AbortController | null>(null);
  const lastKeyRef = useRef<string | null>(null);

  // Fallback UI shows when user hasn't entered a URL (and thus no scrape happened)
  // but has picked an industry manually.
  const showFallback =
    !!industry &&
    (
      (scrapeStatus === "idle" && !hasUrl(websiteUrl)) ||
      scrapeStatus === "error"
    );

  const callSuggestAPI = useCallback(
    async (body: SpecializationRequest, cacheKey: string) => {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as SpecializationResponse;
          if (parsed.success && parsed.suggestion) {
            setSuggestion(parsed.suggestion);
            setSuggestedIndustry(parsed.industry ?? null);
            setSuggestedNaicsCode(parsed.naicsCode ?? null);
            setSuggestedNaicsTitle(parsed.naicsTitle ?? null);
            setSuggestedBusinessName(parsed.businessName ?? null);
            setStatus("suggested");
            return;
          }
        }
      } catch {
        // ignore cache errors
      }

      inflightRef.current?.abort();
      const controller = new AbortController();
      inflightRef.current = controller;
      lastKeyRef.current = cacheKey;

      setStatus("loading");

      try {
        const res = await fetch("/api/suggest-specialization", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const data = (await res.json()) as SpecializationResponse;

        if (controller.signal.aborted) return;
        if (lastKeyRef.current !== cacheKey) return;

        if (data.success && data.suggestion) {
          setSuggestion(data.suggestion);
          setSuggestedIndustry(data.industry ?? null);
          setSuggestedNaicsCode(data.naicsCode ?? null);
          setSuggestedNaicsTitle(data.naicsTitle ?? null);
          setSuggestedBusinessName(data.businessName ?? null);
          setStatus("suggested");
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
          } catch {
            // ignore
          }
        } else {
          setStatus("failed");
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        if (lastKeyRef.current !== cacheKey) return;
        setStatus("failed");
      }
    },
    []
  );

  // Auto-trigger Claude classification when scrape succeeds.
  // Does NOT require industry to be set — Claude will classify from scraped context.
  useEffect(() => {
    if (scrapeStatus !== "success" || !scrapeInsights?.success) return;
    if (status === "suggested" || status === "loading") return;

    const cacheKey = makeCacheKey("classify", scrapeInsights.domain || "unknown");

    callSuggestAPI(
      {
        scraped: {
          domain: scrapeInsights.domain,
          businessName: scrapeInsights.businessName,
          description: scrapeInsights.description,
          serviceHints: scrapeInsights.serviceHints,
        },
      },
      cacheKey
    );
    // intentionally NOT depending on industry — this is the scrape path
  }, [scrapeStatus, scrapeInsights]);

  // When industry changes AND we're on the manual path (no successful scrape),
  // reset so we can re-suggest.
  const prevIndustryRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (scrapeStatus === "success") return; // scrape path handles its own state
    if (prevIndustryRef.current && prevIndustryRef.current !== industry) {
      inflightRef.current?.abort();
      setSuggestion(null);
      setSuggestedIndustry(null);
      setSuggestedNaicsCode(null);
      setSuggestedNaicsTitle(null);
      setSuggestedBusinessName(null);
      setStatus("idle");
      lastKeyRef.current = null;
    }
    prevIndustryRef.current = industry;
  }, [industry, scrapeStatus]);

  const generateFromManual = useCallback(
    (specialty: string, idealCustomer: string) => {
      if (!industry || (!specialty.trim() && !idealCustomer.trim())) return;

      const cacheKey = makeCacheKey(
        `manual:${industry}`,
        `${specialty.trim().slice(0, 30)}:${idealCustomer.trim().slice(0, 30)}`
      );

      callSuggestAPI(
        {
          industry,
          manual: { specialty: specialty.trim(), idealCustomer: idealCustomer.trim() },
        },
        cacheKey
      );
    },
    [industry, callSuggestAPI]
  );

  const dismiss = useCallback(() => {
    setSuggestion(null);
    setSuggestedIndustry(null);
    setSuggestedNaicsCode(null);
    setSuggestedNaicsTitle(null);
    setSuggestedBusinessName(null);
    setStatus("dismissed");
    inflightRef.current?.abort();
    lastKeyRef.current = null;
  }, []);

  return {
    suggestion,
    suggestedIndustry,
    suggestedNaicsCode,
    suggestedNaicsTitle,
    suggestedBusinessName,
    status,
    showFallback: showFallback as boolean,
    generateFromManual,
    dismiss,
  };
}
