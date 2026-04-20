import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Check, ChevronDown, Zap } from "lucide-react";
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
    name: "Blueprint",
    hook: "Stop the Bleed.",
    descriptor: "24/7 AI Front Door — Capture Essentials",
    buildFee: "$750",
    monthlyFee: "$150/mo",
    expandedBullets: [
      { title: "24/7 Website AI Chatbot", description: "Engages and books visitors directly from your site, around the clock." },
      { title: "AI Voice Backup Receptionist", description: "Answers when your team is busy or after-hours — no more lost calls." },
      { title: "Instant SMS Text-Back", description: "Speed-to-Lead engine ensures every missed call gets a text response in under 60 seconds." }
    ],
    goal: "Ensure every inquiry is answered in <60 seconds, 24/7. Stop leaking leads to competitors while your team sleeps or is on the job.",
    infrastructureFooter: "INCLUDES: 250 AI Voice Minutes/mo • Instant SMS Text-Back • Omnichannel Intake",
    ctaText: "Get Started",
    ctaSource: "blueprint"
  },
  {
    number: "02",
    name: "Growth Architecture",
    hook: "The Invisible Sales Rep.",
    descriptor: "Capture + Convert + Compound",
    buildFee: "$1,250",
    monthlyFee: "$250/mo",
    clarityLine: "Everything in Blueprint, PLUS:",
    expandedBullets: [
      { title: "Proactive Quote / No-Show Recovery", description: "AI automatically follows up on unsent quotes and no-show appointments to rebook them." },
      { title: "Smart Lead Triage", description: "AI filters spam, prioritizes hot leads, and routes them to the right person on your team." },
      { title: "90-Day Lead Nurture", description: "Automated drip sequences that keep your business top-of-mind until the lead is ready to buy." }
    ],
    goal: "Automatically chase and recover stuck revenue hiding in your pipeline. Quotes that went cold, no-shows that never rebooked, leads that went silent.",
    infrastructureFooter: "INCLUDES: 500 AI Voice Minutes/mo • Smart Triage • 90-Day Nurture • Review Automation",
    ctaText: "Get Started",
    ctaSource: "growth-architecture",
    isPopular: true
  },
  {
    number: "03",
    name: "Operating System",
    hook: "Total Revenue Loop.",
    descriptor: "Complete Sequential Revenue™ Transformation",
    buildFee: "$1,750",
    monthlyFee: "$350/mo",
    clarityLine: "Everything in Growth Architecture, PLUS:",
    expandedBullets: [
      { title: "AI Search Visibility", description: "Machine-readable schema injection (JSON-LD) so ChatGPT, Perplexity, and Google AI Overviews recommend your business." },
      { title: "The \"Found Money\" DBR Campaign", description: "Targeted Database Reactivation campaign on your existing contacts — covered by our 30-day guarantee." },
      { title: "Multi-Platform Reputation Engine", description: "Automated 5-star review collection, sentiment routing, and lifecycle reactivation across every platform." }
    ],
    goal: "Complete the Sequential Revenue™ loop. Every lead captured, every dollar maximized, every customer compounding your growth — whether you're there or not.",
    infrastructureFooter: "INCLUDES: 1,000 AI Voice Minutes/mo • AI Search Visibility • DBR Campaign • Full Reputation Engine",
    ctaText: "Get Started",
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
                              <span className="text-white font-medium">{bullet.title}:</span>
                              <span className="text-slate-400 ml-1">{bullet.description}</span>
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

            <Link href="/assessment">
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

              <Link href="/assessment">
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
                
                <Link href="/assessment">
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

function FoundMoneyGuarantee() {
  const [finePrintExpanded, setFinePrintExpanded] = useState(false);
  
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
              <span className="text-sm font-mono text-primary">AI INFRASTRUCTURE TIER</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-white">
              The Found Money Guarantee
            </h3>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Within your first 30 days, we run a targeted Database Reactivation (DBR) campaign on your existing contacts. If we don't generate a meaningful volume of qualified responses or booked appointments from your list, we'll run a second full reactivation campaign at no additional service fee.
            </p>
            
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => setFinePrintExpanded(!finePrintExpanded)}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
                data-testid="toggle-found-money-fine-print"
              >
                <motion.div animate={{ rotate: finePrintExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
                {finePrintExpanded ? "Hide Conditions" : "View Conditions (Fine Print)"}
              </button>
              
              <AnimatePresence>
                {finePrintExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 text-xs text-slate-500 leading-relaxed space-y-3">
                      <ul className="space-y-2 pl-4">
                        <li><span className="text-slate-400">List requirement.</span> Requires a permission-based list of 500+ contacts. Lists must comply with applicable messaging and consent regulations.</li>
                        <li><span className="text-slate-400">Client responsibility.</span> Client is responsible for final lead closing and fulfillment. SimpleSequence generates the conversations — your team closes them.</li>
                        <li><span className="text-slate-400">Availability.</span> The Found Money Guarantee is available exclusively with the Operating System tier.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
  { label: "CAPTURE — 24/7 AI FRONT DOOR (Blueprint)", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "24/7 Website AI Chatbot", brain: "Included", system: "Included", infrastructure: "Included" },
  { label: "AI Voice Backup Receptionist", brain: "Included", system: "Included", infrastructure: "Included" },
  { label: "Instant SMS Text-Back / Speed-to-Lead", brain: "Included", system: "Included", infrastructure: "Included" },
  { label: "Omnichannel Intake Consolidation", brain: "Included", system: "Included", infrastructure: "Included" },

  { label: "CONVERT + COMPOUND — INVISIBLE SALES REP (Growth Architecture)", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Proactive Quote / No-Show Recovery", brain: "\u2014", system: "Included", infrastructure: "Included" },
  { label: "Smart Lead Triage", brain: "\u2014", system: "Included", infrastructure: "Included" },
  { label: "90-Day Lead Nurture Sequences", brain: "\u2014", system: "Included", infrastructure: "Included" },
  { label: "5-Star Review Automation", brain: "\u2014", system: "Included", infrastructure: "Included" },
  { label: "Sentiment-Based Review Routing", brain: "\u2014", system: "Included", infrastructure: "Included" },

  { label: "FULL LOOP — SEQUENTIAL REVENUE™ (Operating System)", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "AI Search Visibility (JSON-LD Schema Injection)", brain: "\u2014", system: "\u2014", infrastructure: "Included" },
  { label: "ChatGPT / Perplexity / Google AI Overviews", brain: "\u2014", system: "\u2014", infrastructure: "Included" },
  { label: "\"Found Money\" DBR Campaign (30-day guarantee)", brain: "\u2014", system: "\u2014", infrastructure: "Included" },
  { label: "Database Segmentation & Lifecycle Reactivation", brain: "\u2014", system: "\u2014", infrastructure: "Included" },
  { label: "Found Money Guarantee", brain: "\u2014", system: "\u2014", infrastructure: "Included" },

  { label: "LIMITS & INVESTMENT", brain: "", system: "", infrastructure: "", isSection: true },
  { label: "Included AI Voice Minutes", brain: "250/mo", system: "500/mo", infrastructure: "1,000/mo" },
  { label: "Setup Fee", brain: "$750", system: "$1,250", infrastructure: "$1,750" },
  { label: "Monthly Retainer", brain: "$150/mo", system: "$250/mo", infrastructure: "$350/mo" },
];

function ComparisonCell({ value, isPopular = false }: { value: string; isPopular?: boolean }) {
  const isEmpty = value === "\u2014" || value === "";
  const isIncluded = value === "Included";
  
  let className = "text-xs md:text-sm ";
  if (isEmpty) {
    className += "text-slate-600";
  } else if (isIncluded && isPopular) {
    className += "text-primary font-medium";
  } else if (isIncluded) {
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
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Blueprint</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-primary bg-primary/[0.03]">Growth Architecture</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white/80">Operating System</th>
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
                      <p className="text-[10px] text-slate-500 mb-1">Blueprint</p>
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

function NotSureSection() {
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
            Not Sure Where to <span className="text-primary">Start</span>?
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Run the free Sequential Revenue&trade; Friction Analysis. In a few minutes, we'll show you exactly where leads are falling through the cracks and how much it's costing you each month. Then you'll know which tier makes sense.
          </p>
          <Link 
            href="/assessment"
            data-testid="button-offers-assessment-cta"
            className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
          >
            Take the Free Assessment &rarr;
          </Link>
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
        description="Three tiers of Sequential Revenue™ implementation: Blueprint ($150/mo), Growth Architecture ($250/mo), and Operating System ($350/mo). Capture, convert, and compound your revenue."
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

      <FoundMoneyGuarantee />

      <ComparePlansSection />

      <NotSureSection />

    </Layout>
  );
}
