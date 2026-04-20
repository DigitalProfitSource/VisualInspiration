/**
 * useWebsiteScrape — triggers the server-side Firecrawl scrape when the
 * assessment user enters their website URL.
 *
 * Behavior:
 *   - Debounces input by 600ms (so we don't scrape while they're still typing).
 *   - Only fires when the URL looks valid.
 *   - Caches results in sessionStorage keyed by domain (so back/forward doesn't re-scrape).
 *   - Fails silently — hook returns `insights: null, error` but never throws.
 */

import { useEffect, useRef, useState } from "react";
import type { ScrapeInsights } from "@shared/scrape-types";

export type ScrapeStatus = "idle" | "loading" | "success" | "error";

interface UseWebsiteScrapeResult {
  insights: ScrapeInsights | null;
  status: ScrapeStatus;
  error: string | null;
  /** Manually clear cached insights (e.g. when user rejects them). */
  dismiss: () => void;
}

const CACHE_PREFIX = "scrape:";
const DEBOUNCE_MS = 600;

/**
 * Pull a normalized domain out of whatever the user typed.
 * Returns null if it doesn't look like a URL.
 */
function toDomain(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length < 4) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    const host = url.hostname.replace(/^www\./, "");
    // Require at least one dot (foo.com) — kills junk like "hello"
    if (!host.includes(".") || host.length < 4) return null;
    return host;
  } catch {
    return null;
  }
}

export function useWebsiteScrape(url: string | undefined): UseWebsiteScrapeResult {
  const [insights, setInsights] = useState<ScrapeInsights | null>(null);
  const [status, setStatus] = useState<ScrapeStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const currentDomainRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const domain = url ? toDomain(url) : null;

    if (!domain) {
      currentDomainRef.current = null;
      setInsights(null);
      setStatus("idle");
      setError(null);
      return;
    }

    // Same domain already processed — no-op.
    if (domain === currentDomainRef.current) return;

    // Check session cache
    try {
      const cached = sessionStorage.getItem(CACHE_PREFIX + domain);
      if (cached) {
        const parsed = JSON.parse(cached) as ScrapeInsights;
        currentDomainRef.current = domain;
        setInsights(parsed);
        setStatus(parsed.success ? "success" : "error");
        setError(parsed.error || null);
        return;
      }
    } catch {
      // sessionStorage unavailable (private browsing, SSR, etc.) — fall through to fetch.
    }

    const timer = setTimeout(() => {
      // Abort any in-flight request for a stale domain.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      currentDomainRef.current = domain;
      setStatus("loading");
      setError(null);

      fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })
        .then(res => res.json() as Promise<ScrapeInsights>)
        .then(data => {
          if (controller.signal.aborted) return;
          // Only keep the result if the domain is still the one we care about.
          if (currentDomainRef.current !== domain) return;
          setInsights(data);
          setStatus(data.success ? "success" : "error");
          setError(data.error || null);
          try {
            sessionStorage.setItem(CACHE_PREFIX + domain, JSON.stringify(data));
          } catch {
            /* ignore cache write failures */
          }
        })
        .catch(err => {
          if (controller.signal.aborted) return;
          if (currentDomainRef.current !== domain) return;
          setStatus("error");
          setError(err instanceof Error ? err.message : "Scrape request failed");
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [url]);

  const dismiss = () => {
    setInsights(null);
    setStatus("idle");
    setError(null);
    currentDomainRef.current = null;
  };

  return { insights, status, error, dismiss };
}
