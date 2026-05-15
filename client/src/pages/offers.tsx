import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Check, Zap, CheckCircle, FileText, Activity, TrendingUp, Sparkles, Star, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { SEO, createOfferSchema } from "@/components/seo";
import { Layout } from "@/components/layout";
import { useState } from "react";

const fadeInUpViewport = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

interface PricingTier {
  number: string;
  name: string;
  hook: string;
  descriptor: string;
  buildFee: string;
  monthlyFee: string;
  clarityLine?: string;
  expandedBullets: { title: string; description: string }[];
  goal: string;
  infrastructureFooter: string;
  ctaText: string;
  ctaSource: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    number: "01",
    name: "Foundation",
    hook: "Stop the Bleed.",
    descriptor: "24/7 AI Front Door — Capture Essentials",
    buildFee: "$997",
    monthlyFee: "$297/mo",
    expandedBullets: [
      { title: "Stop losing jobs to slow response", description: "every inbound lead gets an immediate reply before they dial your competitor" },
      { title: "You get your time back", description: "the system handles intake, booking, and follow-up while you're on the job" },
      { title: "New contacts stay in your pipeline for 30 days without you lifting a finger", description: "" },
      { title: "Google reviews build consistently", description: "no awkward asks, no chasing happy customers" },
      { title: "A working system from week one", description: "operating reliably under normal platform conditions" },
    ],
    goal: "Ensure every inquiry is answered in <60 seconds, 24/7. Stop leaking leads to competitors while your team sleeps or is on the job.",
    infrastructureFooter: "INCLUDES: 250 AI Voice Minutes/mo • Instant SMS Text-Back • Omnichannel Intake",
    ctaText: "Discuss Fit & Investment",
    ctaSource: "foundation"
  },
  {
    number: "02",
    name: "Growth Architecture",
    hook: "The Invisible Sales Rep.",
    descriptor: "Capture + Convert + Compound",
    buildFee: "$1,997",
    monthlyFee: "$597/mo",
    clarityLine: "Everything in Foundation, PLUS:",
    expandedBullets: [
      { title: "Proactive Quote / No-Show Recovery", description: "AI automatically follows up on unsent quotes and no-show appointments to rebook them." },
      { title: "Smart Lead Triage", description: "AI filters spam, prioritizes hot leads, and routes them to the right person on your team." },
      { title: "90-Day Lead Nurture", description: "Automated drip sequences that keep your business top-of-mind until the lead is ready to buy." }
    ],
    goal: "Automatically chase and recover stuck revenue hiding in your pipeline. Quotes that went cold, no-shows that never rebooked, leads that went silent.",
    infrastructureFooter: "INCLUDES: 500 AI Voice Minutes/mo • Smart Triage • 90-Day Nurture • Review Automation",
    ctaText: "Discuss Fit & Investment",
    ctaSource: "growth-architecture",
    isPopular: true
  },
  {
    number: "03",
    name: "Operating System",
    hook: "Total Revenue Loop.",
    descriptor: "Complete Sequential Revenue™ Transformation",
    buildFee: "$3,997",
    monthlyFee: "$1,197/mo",
    clarityLine: "Everything in Growth Architecture, PLUS:",
    expandedBullets: [
      { title: "AI Search Visibility", description: "Machine-readable schema injection (JSON-LD) so ChatGPT, Perplexity, and Google AI Overviews recommend your business." },
      { title: "The \"Found Money\" DBR Campaign", description: "Targeted Database Reactivation campaign on your existing contacts." },
      { title: "Multi-Platform Reputation Engine", description: "Automated 5-star review collection, sentiment routing, and lifecycle reactivation across every platform." }
    ],
    goal: "Complete the Sequential Revenue™ loop. Every lead captured, every dollar maximized, every customer compounding your growth — whether you're there or not.",
    infrastructureFooter: "INCLUDES: 750 AI Voice Minutes/mo • AI Search Visibility • DBR Campaign • Full Reputation Engine",
    ctaText: "Discuss Fit & Investment",
    ctaSource: "operating-system"
  }
];

function PricingGridSection() {
  const [entryCardsHovered, setEntryCardsHovered] = useState(false);

  const brain = pricingTiers[0];
  const system = pricingTiers[1];
  const infra = pricingTiers[2];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary mb-4 block">SELECT YOUR TIER</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium">Find Your Fit</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto mt-4">
            Every tier installs the same three-pillar foundation: capture, convert, and reputation. What changes is depth and the number of service types your system is built to handle. Start where you are. Scale into the full engine.
          </p>
        </motion.div>

        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="grid md:grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto"
          onMouseEnter={() => setEntryCardsHovered(true)}
          onMouseLeave={() => setEntryCardsHovered(false)}
        >
          <div
            className={`group p-8 rounded-2xl border bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ${
              entryCardsHovered ? 'border-primary/30' : 'border-white/10 hover:border-primary/30'
            }`}
            data-testid="card-offers-ai-brain"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-primary">{brain.number}</span>
            </div>

            <h3 className="text-2xl font-display font-medium mb-1 text-white">
              {brain.name}
            </h3>
            <p className="text-sm text-primary font-semibold mb-1">{brain.hook}</p>
            <p className="text-sm text-slate-400 mb-4">{brain.descriptor}</p>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
              <p className="text-slate-300 text-sm">{brain.goal}</p>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-display font-bold text-white mb-1">{brain.monthlyFee}</div>
              <div className="text-sm text-slate-500">One-time setup: {brain.buildFee}</div>
            </div>

            <AnimatePresence>
              {entryCardsHovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-slate-400 mb-3">WHAT'S INSIDE</h4>
                    <ul className="space-y-3">
                      {brain.expandedBullets.map((bullet, i) => (
                        <li key={i} className="text-sm">
                          <div className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-white font-medium">{bullet.title}</span>
                              {bullet.description && (
                                <span className="text-slate-400 ml-1">— {bullet.description}</span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-500 font-mono">{brain.infrastructureFooter}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link href="/book?tier=foundation">
              <Button
                data-testid="button-offers-ai-brain"
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all group-hover:border-primary/30"
              >
                {brain.ctaText} <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">&rarr;</span>
              </Button>
            </Link>
          </div>

          <div
            className={`group p-8 rounded-2xl border bg-gradient-to-b from-zinc-800/80 to-zinc-950 relative shadow-xl transition-all duration-300 overflow-hidden ${
              entryCardsHovered ? 'border-primary/40' : 'border-primary/30 hover:border-primary/40'
            }`}
            data-testid="card-offers-ai-system"
          >
            <BorderBeam size={300} duration={12} delay={0} colorFrom="var(--color-primary)" colorTo="transparent" />
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider">
              MOST POPULAR
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-primary">{system.number}</span>
              </div>

              <h3 className="text-2xl font-display font-medium mb-1 text-white">
                {system.name}
              </h3>
              <p className="text-sm text-primary font-semibold mb-1">{system.hook}</p>
              <p className="text-sm text-slate-400 mb-4">{system.descriptor}</p>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                <p className="text-slate-300 text-sm">{system.goal}</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-display font-bold text-white mb-1">{system.monthlyFee}</div>
                <div className="text-sm text-slate-500">One-time setup: {system.buildFee}</div>
              </div>

              <AnimatePresence>
                {entryCardsHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6">
                      {system.clarityLine && (
                        <p className="text-sm text-primary font-semibold mb-4">{system.clarityLine}</p>
                      )}
                      <h4 className="text-xs font-mono text-slate-400 mb-3">WHAT'S INSIDE</h4>
                      <ul className="space-y-3">
                        {system.expandedBullets.map((bullet, i) => (
                          <li key={i} className="text-sm">
                            <div className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-white font-medium">{bullet.title}:</span>
                                <span className="text-slate-400 ml-1">{bullet.description}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-slate-500 font-mono">{system.infrastructureFooter}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/book?tier=growth-architecture">
                <Button
                  data-testid="button-offers-ai-system"
                  className="w-full bg-primary text-primary-foreground hover:bg-cyan-300 h-12 rounded-lg font-medium shadow-[0_0_20px_-5px_var(--color-primary)] transition-all"
                >
                  {system.ctaText} <span className="ml-2">&rarr;</span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={{ once: true }}
          transition={fadeInUpViewport.transition}
          className="max-w-5xl mx-auto"
        >
          <div className="p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-transparent relative overflow-hidden hover:border-primary/20 transition-all">
            <div className="absolute top-0 right-0 bg-white/10 text-slate-300 text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider border-l border-b border-white/10">
              FULL LOOP
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-primary/70">{infra.number}</span>
                </div>
                <h3 className="text-3xl font-display font-semibold mb-1 text-white">{infra.name}</h3>
                <p className="text-sm text-primary font-semibold mb-1">{infra.hook}</p>
                <p className="text-sm text-slate-400 mb-4">{infra.descriptor}</p>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                  <p className="text-slate-300 text-sm">{infra.goal}</p>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-display font-bold text-white mb-1">{infra.monthlyFee}</div>
                  <div className="text-sm text-slate-500">One-time setup: {infra.buildFee}</div>
                </div>

                <Link href="/book?tier=operating-system">
                  <Button
                    data-testid="button-offers-ai-infrastructure"
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-14 px-8 rounded-lg font-medium text-base transition-all"
                  >
                    {infra.ctaText} <span className="ml-2 opacity-50 group-hover:opacity-100">&rarr;</span>
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                {infra.clarityLine && (
                  <p className="text-sm text-primary font-semibold">{infra.clarityLine}</p>
                )}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 mb-3">WHAT'S INSIDE</h4>
                  <ul className="space-y-3 text-sm">
                    {infra.expandedBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium">{bullet.title}:</span>
                          <span className="text-slate-400 ml-1">{bullet.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-slate-500 font-mono">{infra.infrastructureFooter}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DBROptimizationPromise() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
        >
          <div className="p-8 md:p-12 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-sm font-mono text-primary">GROWTH ARCHITECTURE + OPERATING SYSTEM</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-white">
              DBR Optimization Promise
            </h3>

            <p className="text-lg text-slate-300 leading-relaxed">
              Growth Architecture and Operating System each include one Database Reactivation campaign for a qualified, permission-based contact list of 750 or more contacts. If the first campaign does not generate meaningful engagement from a qualifying list, SimpleSequence will review the campaign data, adjust the messaging, and run one additional optimization pass at no additional service fee. Client is responsible for contact list compliance, offer approval, timely sales follow-up, pricing, close rate, and fulfillment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ComparisonRow {
  label: string;
  brain: string;
  system: string;
  infrastructure: string;
  isSection?: boolean;
}

const comparisonRows: ComparisonRow[] = [
  { label: "One-Time Setup", brain: "$997", system: "$1,997", infrastructure: "$3,997" },

  { label: "CAPTURE", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "24/7 AI Website Chat Agent", brain: "✅ 1 Service Type", system: "✅ Multi-Service", infrastructure: "✅ Advanced + Multi-Service Trained" },
  { label: "AI Voice Receptionist (Inbound Only)", brain: "✅ Basic", system: "✅ Full", infrastructure: "✅ Multi-Service Routing" },
  { label: "Instant SMS Text-Back (<60 sec)", brain: "✅", system: "✅", infrastructure: "✅" },
  { label: "Intake Channels", brain: "Web + 1 Source", system: "Omnichannel (All Channels)", infrastructure: "Omnichannel + Advanced Routing" },
  { label: "GoHighLevel CRM (Included)", brain: "✅", system: "✅", infrastructure: "✅" },
  { label: "Custom Pipelines", brain: "1", system: "2–3", infrastructure: "Per Service Type" },
  { label: "Calendars", brain: "1", system: "1–2", infrastructure: "Multiple (per service / team member)" },
  { label: "Intake Funnels", brain: "1", system: "2–3", infrastructure: "Per Service / Modality" },
  { label: "Existing CRM Integration", brain: "Ask us", system: "✅", infrastructure: "✅" },

  { label: "CONVERT", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Speed-to-Lead SMS", brain: "✅ Basic", system: "✅ Full", infrastructure: "✅ Full + Multi-Channel" },
  { label: "Lead Triage", brain: "Basic", system: "✅ Smart Triage", infrastructure: "✅ Advanced + Service-Specific" },
  { label: "Lead Nurture Sequences", brain: "5-Step / 30 Days", system: "90-Day SMS + Email", infrastructure: "90-Day Per Service Type" },
  { label: "Appointment Confirmations + Reminders", brain: "✅", system: "✅", infrastructure: "✅" },
  { label: "Quote / Estimate Recovery", brain: "—", system: "✅", infrastructure: "✅ Per Service Type" },
  { label: "No-Show & Cancellation Recovery", brain: "—", system: "✅", infrastructure: "✅" },
  { label: "Behavior-Based Re-Engagement", brain: "—", system: "✅", infrastructure: "✅ Advanced Segmentation" },
  { label: "Human vs. AI Escalation Logic", brain: "—", system: "✅", infrastructure: "✅ Complex Workflows" },
  { label: "Expired Estimate Recovery", brain: "—", system: "✅", infrastructure: "✅" },
  { label: "Service-Specific Nurture Sequences", brain: "—", system: "—", infrastructure: "✅" },

  { label: "DATABASE REACTIVATION", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "DBR Campaign Included", brain: "—", system: "✅ First Campaign Included", infrastructure: "✅ Included + Lifecycle Sequences" },
  { label: "Dormancy Segmentation", brain: "—", system: "✅", infrastructure: "✅ Per Service Type" },
  { label: "DBR Optimization Promise", brain: "—", system: "✅", infrastructure: "✅" },
  { label: "Ongoing Lifecycle Reactivation", brain: "—", system: "—", infrastructure: "✅" },

  { label: "REPUTATION", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Automated Review Requests", brain: "Google Only", system: "Google + 2 Platforms", infrastructure: "All Platforms" },
  { label: "Internal Feedback Alerts", brain: "—", system: "✅", infrastructure: "✅" },
  { label: "Review Velocity Tracking", brain: "—", system: "✅", infrastructure: "✅" },
  { label: "LTV Tracking", brain: "—", system: "—", infrastructure: "✅" },

  { label: "AI SEARCH READINESS", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "JSON-LD Schema Implementation", brain: "—", system: "—", infrastructure: "✅ Included" },
  { label: "Local Content Alignment", brain: "—", system: "—", infrastructure: "✅ Included" },

  { label: "REPORTING", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Reporting Dashboard", brain: "Basic GHL", system: "Standard GHL", infrastructure: "Full Config (per service type)" },
  { label: "Quarterly Business Review", brain: "—", system: "—", infrastructure: "✅" },

  { label: "SUPPORT", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Monthly Strategy Calls", brain: "—", system: "1x / month", infrastructure: "2x / month" },
  { label: "Support Level", brain: "Email 48hr", system: "Email + Chat 24hr", infrastructure: "Priority Same-Day" },

  { label: "MONTHLY USAGE", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "AI Voice Minutes (Inbound Only)", brain: "250/mo", system: "500/mo", infrastructure: "750/mo" },
  { label: "SMS Included", brain: "500/mo", system: "1,500/mo", infrastructure: "3,000/mo" },
  { label: "Voice Overage", brain: "$0.25/min", system: "$0.25/min", infrastructure: "$0.25/min" },
];

function ComparisonCell({ value, isPopular = false }: { value: string; isPopular?: boolean }) {
  const isEmpty = value === "—" || value === "";
  const hasCheckmark = value.startsWith("✅");

  if (isEmpty) return <span className="text-slate-600 text-xs md:text-sm">{"—"}</span>;

  let className = "text-xs md:text-sm ";
  if (hasCheckmark && isPopular) {
    className += "text-primary font-medium";
  } else if (hasCheckmark) {
    className += "text-slate-300 font-medium";
  } else if (isPopular) {
    className += "text-primary/90";
  } else {
    className += "text-slate-300";
  }

  return <span className={className}>{value}</span>;
}

function ComparePlansSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Compare Tiers</h2>
          <p className="text-slate-400">See exactly what's included at each level.</p>
        </motion.div>

        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="max-w-5xl mx-auto"
        >
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-xs font-mono text-slate-500 uppercase tracking-wider w-1/3"></th>
                  <th className="py-4 px-4 text-center w-1/5">
                    <div className="text-sm font-semibold text-white">Foundation</div>
                    <div className="text-xs text-slate-400 font-normal mt-0.5">$297/mo</div>
                  </th>
                  <th className="py-4 px-4 text-center bg-primary/[0.03] w-1/5">
                    <div className="text-sm font-semibold text-primary">Growth Architecture</div>
                    <div className="text-xs text-primary/70 font-normal mt-0.5">$597/mo</div>
                  </th>
                  <th className="py-4 px-4 text-center w-1/5">
                    <div className="text-sm font-semibold text-white/80">Operating System</div>
                    <div className="text-xs text-slate-400 font-normal mt-0.5">$1,197/mo</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => {
                  if (row.isSection) {
                    return (
                      <tr key={i} className="border-t border-white/10 bg-white/[0.02]">
                        <td colSpan={4} className="py-3 pr-6 text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold text-left">
                          {row.label}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-6 text-sm text-slate-300 text-left">{row.label}</td>
                      <td className="py-4 px-4 text-center"><ComparisonCell value={row.brain} /></td>
                      <td className="py-4 px-4 text-center bg-primary/[0.03]"><ComparisonCell value={row.system} isPopular /></td>
                      <td className="py-4 px-4 text-center"><ComparisonCell value={row.infrastructure} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, i) => {
              if (row.isSection) {
                return (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mt-6">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold text-left">{row.label}</p>
                  </div>
                );
              }
              return (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p className="text-sm text-slate-300 font-medium mb-4 text-left">{row.label}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">Foundation</p>
                      <ComparisonCell value={row.brain} />
                    </div>
                    <div className="bg-primary/[0.03] rounded-lg py-1 px-1">
                      <p className="text-[10px] text-primary mb-1">Growth Arch.</p>
                      <ComparisonCell value={row.system} isPopular />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">Op. System</p>
                      <ComparisonCell value={row.infrastructure} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SetupTimelineSection() {
  const rows = [
    { day: "Day 1–3", event: "Kickoff session, intake questionnaire, access granted" },
    { day: "Day 4–7", event: "Workflow mapping, AI configuration, pipeline build begins" },
    { day: "Day 8–14", event: "Automations built, sequences configured, integrations connected" },
    { day: "Day 15–18", event: "Internal testing and QA across all channels" },
    { day: "Day 19–21", event: "Launch walkthrough with your team" },
  ];

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
        >
          <div className="text-center mb-12">
            <span className="text-sm font-mono text-primary mb-4 block">WHAT TO EXPECT</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Your Setup Timeline</h2>
            <p className="text-slate-400">Every tier includes a structured 14–21 business day setup window:</p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-8 text-xs font-mono text-slate-500 uppercase tracking-wider w-32">Day</th>
                  <th className="text-left py-3 text-xs font-mono text-slate-500 uppercase tracking-wider">What Happens</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-8 text-sm text-primary font-mono font-medium whitespace-nowrap">{row.day}</td>
                    <td className="py-4 text-sm text-slate-300">{row.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            AI voice and chat systems operate under normal platform conditions. Performance may vary based on carrier delivery, network availability, and contact list quality. SimpleSequence will communicate any known platform limitations during onboarding.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FrictionAnalysisSection() {
  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-medium">
            Not Sure Which Tier Is Right For You?
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left column — copy */}
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-wide">
              CHECK YOUR BLINDSPOTS
            </div>
            <h3 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight">
              Find the <span className="text-primary">Friction</span> Slowing Your Growth
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover exactly where revenue friction is limiting your business growth — and which fix delivers the fastest recovery.
            </p>

            {/* Social proof block */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Most businesses identify</p>
                  <p className="text-2xl font-bold text-white leading-tight">5–15%</p>
                  <p className="text-xs text-slate-400">growth inefficiency.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l border-white/10 pl-4">
                <div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">Trusted by hundreds of business owners nationwide.</p>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Your personalized <span className="text-white font-medium">Business Health Score</span> (out of 100)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Your exact <span className="text-white font-medium">monthly revenue gap</span> (with conservative projections)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Which <span className="text-white font-medium">pillar</span> — Capture, Convert, or Compound — is costing you the most</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>A clear recommendation on your <span className="text-white font-medium">best starting point</span> (<span className="text-white font-medium">Foundation</span>, <span className="text-white font-medium">Growth Architecture</span>, or <span className="text-white font-medium">Operating System</span>)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Your custom <span className="text-white font-medium">30-day action plan</span> + Found Money DBR potential</span>
              </li>
            </ul>

            <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span><span className="text-white font-medium">Over 340 business owners</span> have run this analysis in the last 30 days.</span>
            </p>

            <Link
              href="/assessment"
              data-testid="button-offers-friction-analysis-cta"
              className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
            >
              Run My Free Analysis →
            </Link>
            <p className="text-sm text-slate-500 mt-3 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              Free • No obligation • Takes 90 seconds
            </p>
          </motion.div>

          {/* Right column — mockup card placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg relative"
          >
            {/* Outer diffuse backlight */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/25 to-cyan-500/15 rounded-3xl blur-3xl opacity-40" />
            {/* Inner rim glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-cyan-500/40 rounded-2xl blur-md opacity-60" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source src="/videos/ReportAnalysisVid-optimized.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
            Ready to install your <span className="text-primary">revenue engine</span>?
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            The call is 15 minutes. We'll look at how leads are entering your business, where follow-up is breaking down, and tell you honestly which tier fits where you are right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/book"
              data-testid="button-offers-assessment-cta"
              className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-8 h-14 text-base font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
            >
              Book Your Free 15-Minute Revenue Flow Call &rarr;
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 rounded-full px-8 h-14 text-base font-semibold transition-colors"
            >
              Not Sure Yet? Take Our Free Assessment &rarr;
            </Link>
          </div>
          <p className="text-sm text-slate-500 italic">
            Clients who start now are locking in these rates before a planned price increase.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Offers() {
  const offerSchemas = pricingTiers.map(tier => createOfferSchema({
    name: tier.name,
    description: `${tier.hook} ${tier.descriptor}`,
    price: tier.monthlyFee.replace(/[^0-9]/g, ''),
    buildFee: tier.buildFee
  }));

  return (
    <Layout>
      <SEO
        title="Pricing & Offers | SimpleSequence"
        description="Three tiers of Sequential Revenue™ implementation: Foundation ($297/mo), Growth Architecture ($597/mo), and Operating System ($1,197/mo). Capture, convert, and compound your revenue."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: offerSchemas.map((schema, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: schema
          }))
        }}
      />

      <section className="pt-44 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-40" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm font-mono text-primary mb-6 block">SERVICES & PRICING</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight">
              Future-Proof Your <span className="text-primary">Revenue</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Select the level of AI-Native Infrastructure your business needs to thrive in the era of Generative Search.
            </p>
          </motion.div>
        </div>
      </section>

      <PricingGridSection />

      <DBROptimizationPromise />

      <ComparePlansSection />

      <SetupTimelineSection />

      <FrictionAnalysisSection />

      <FinalCTASection />

    </Layout>
  );
}
