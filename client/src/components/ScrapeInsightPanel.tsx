/**
 * ScrapeInsightPanel — renders beneath the website URL field once the
 * Firecrawl scrape completes. Shows detected signals with inline "Apply"
 * actions so the user can accept or ignore each suggestion.
 *
 * Design principles:
 *   - Compact. Never dominates the form. Users can keep typing at any time.
 *   - Deferential. Every suggestion is opt-in. No silent pre-filling.
 *   - Premium feel. Matches the glass aesthetic of the rest of the assessment.
 *   - Silent failure. If scrape fails, panel stays hidden — no error badges
 *     that make the product look broken.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Check, X, Globe, AlertCircle } from "lucide-react";
import type { ScrapeInsights } from "@shared/scrape-types";
import type { ScrapeStatus } from "@/hooks/use-website-scrape";

interface ScrapeInsightPanelProps {
  status: ScrapeStatus;
  insights: ScrapeInsights | null;
  /** Called when the user clicks "Apply" on a detected business name. */
  onApplyBusinessName?: (name: string) => void;
  /** Called when the user clicks "Apply" on a detected industry. */
  onApplyIndustry?: (industry: string) => void;
  /** Called when the user clicks "Apply" on the AI-suggested specialization. */
  onApplySpecialization?: (spec: string) => void;
  /** Current form values — used to hide "Apply" if already applied. */
  currentBusinessName?: string;
  currentIndustry?: string;
  currentSpecialization?: string;
  /** AI-generated specialization suggestion from Claude */
  specSuggestion?: string | null;
  /** AI-classified industry (NAICS-aligned label) from Claude */
  suggestedIndustry?: string | null;
  /** 6-digit NAICS code — shown beneath the industry row for credibility */
  suggestedNaicsCode?: string | null;
  /** Official NAICS 2022 title — shown as a tooltip on the code badge */
  suggestedNaicsTitle?: string | null;
  specStatus?: string;
  onDismiss?: () => void;
}

export function ScrapeInsightPanel({
  status,
  insights,
  onApplyBusinessName,
  onApplyIndustry,
  onApplySpecialization,
  currentBusinessName,
  currentIndustry,
  currentSpecialization,
  specSuggestion,
  suggestedIndustry,
  suggestedNaicsCode,
  suggestedNaicsTitle,
  specStatus,
  onDismiss,
}: ScrapeInsightPanelProps) {
  // Don't render anything in idle state — panel only appears after the user types a URL.
  if (status === "idle") return null;

  return (
    <AnimatePresence mode="wait">
      {status === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-2 flex items-center gap-2 text-xs text-slate-400"
          data-testid="scrape-loading"
        >
          <Loader2 size={12} className="animate-spin text-cyan-400" />
          <span>Reading your site for context…</span>
        </motion.div>
      )}

      {status === "error" && insights === null && (
        // Hidden: silent failure. Panel never shows an error to the user.
        null
      )}

      {status === "success" && insights && insights.success && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-4 overflow-hidden"
          data-testid="scrape-panel"
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-[11px] font-bold tracking-[0.15em] text-cyan-400 uppercase">
                Signals from {insights.domain}
              </span>
            </div>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Dismiss suggestions"
                data-testid="scrape-dismiss"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="space-y-2.5 text-[13px]">
            {/* Business name — show "Use this" if not yet applied, "Applied" if it was */}
            {insights.businessName && (
              insights.businessName === currentBusinessName ? (
                <AutoAppliedRow label="Business name" value={insights.businessName} />
              ) : onApplyBusinessName ? (
                <InsightRow
                  label="Business name"
                  value={insights.businessName}
                  onApply={() => onApplyBusinessName(insights.businessName!)}
                />
              ) : null
            )}

            {/* Industry — Claude's NAICS-based classification.
                While Claude is still thinking, show a loading row.
                NAICS code appears as a small badge for credibility. */}
            {specStatus === "loading" && !suggestedIndustry && (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] tracking-wide uppercase shrink-0 w-20">
                  Industry
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
                  <Loader2 size={11} className="animate-spin text-cyan-400" />
                  Classifying…
                </span>
              </div>
            )}
            {suggestedIndustry && (
              <div className="space-y-0.5">
                {suggestedIndustry === currentIndustry ? (
                  <AutoAppliedRow label="Industry" value={suggestedIndustry} />
                ) : onApplyIndustry ? (
                  <InsightRow
                    label="Industry"
                    value={suggestedIndustry}
                    onApply={() => onApplyIndustry(suggestedIndustry)}
                  />
                ) : null}
                {/* NAICS code footnote — shows precision behind the label */}
                {suggestedNaicsCode && (
                  <div className="pl-[88px]">
                    <span
                      className="inline-block font-mono text-[10px] text-slate-500 tracking-wide"
                      title={suggestedNaicsTitle ?? undefined}
                      data-testid="panel-naics-badge"
                    >
                      NAICS {suggestedNaicsCode}
                      {suggestedNaicsTitle ? ` · ${suggestedNaicsTitle}` : ""}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Specialization — shown once Claude generates a suggestion */}
            {specStatus === "loading" && (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] tracking-wide uppercase shrink-0 w-20">
                  Specialty
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
                  <Loader2 size={11} className="animate-spin text-cyan-400" />
                  Generating…
                </span>
              </div>
            )}
            {specSuggestion && specStatus === "suggested" && (
              specSuggestion === currentSpecialization ? (
                <AutoAppliedRow label="Specialty" value={specSuggestion} />
              ) : onApplySpecialization ? (
                <InsightRow
                  label="Specialty"
                  value={specSuggestion}
                  onApply={() => onApplySpecialization(specSuggestion)}
                />
              ) : null
            )}

            {/* AI Search Visibility — the killer finding, always show */}
            {!insights.hasSchema ? (
              <div className="mt-2 pt-2.5 border-t border-slate-800/60 flex items-start gap-2">
                <AlertCircle size={12} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-200/80 leading-relaxed">
                  <span className="font-semibold text-amber-300">No AI-readable schema detected.</span>{" "}
                  ChatGPT and Google AI can&apos;t cleanly index your services. We&apos;ll flag this in your report.
                </p>
              </div>
            ) : insights.schemaTypes.length > 0 ? (
              <div className="mt-2 pt-2.5 border-t border-slate-800/60 flex items-start gap-2">
                <Globe size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  AI-readable schema found ({insights.schemaTypes.slice(0, 3).join(", ")}). Good baseline for AI search.
                </p>
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A row showing a value that was already auto-applied.
 */
function AutoAppliedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-2 min-w-0 flex-1">
        <span className="text-slate-500 text-[11px] tracking-wide uppercase mt-0.5 shrink-0 w-20">
          {label}
        </span>
        <span className="text-white text-[13px] font-medium truncate">{value}</span>
      </div>
      <span className="flex items-center gap-1 px-2 py-1 text-emerald-400 text-[11px] font-medium shrink-0">
        <Check size={11} />
        Applied
      </span>
    </div>
  );
}

/**
 * A single apply-able insight row.
 */
function InsightRow({
  label,
  value,
  onApply,
}: {
  label: string;
  value: string;
  onApply: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-2 min-w-0 flex-1">
        <span className="text-slate-500 text-[11px] tracking-wide uppercase mt-0.5 shrink-0 w-20">
          {label}
        </span>
        <span className="text-white text-[13px] font-medium truncate">{value}</span>
      </div>
      <button
        type="button"
        onClick={onApply}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium transition-colors shrink-0"
        data-testid={`scrape-apply-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <Check size={11} />
        Use this
      </button>
    </div>
  );
}
