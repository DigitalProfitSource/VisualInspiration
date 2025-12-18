import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check, ChevronDown, Phone, Users, Brain, Shield, Zap, BarChart3, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
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
  descriptor: string;
  buildFee: string;
  monthlyFee: string;
  ifYouWant: string;
  clarityLine?: string;
  focusBullets: string[];
  expandedBullets: { title: string; description: string }[];
  outcome: string;
  ctaText: string;
  ctaSource: string;
  isPopular?: boolean;
  isApplication?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    number: "01",
    name: "Frontline",
    descriptor: "The \"Human-First\" Safety Net",
    buildFee: "$600",
    monthlyFee: "$297/mo",
    ifYouWant: "Your front desk is now fail-safe. Stop leaking leads to competitors and ensure every caller gets a professional response—even when your team is busy or the office is closed.",
    focusBullets: [],
    expandedBullets: [
      { title: "AI Voice Backup Receptionist", description: "Answers only when your team is busy or the office is closed." },
      { title: "24/7 Website AI Chatbot", description: "Engages and books visitors directly from your landing page." },
      { title: "Instant SMS Text-Back", description: "A digital safety net that keeps the conversation alive via text if a call is missed." },
      { title: "Speed-to-Lead Engine", description: "Ensures new inquiries get a response in under 60 seconds." },
      { title: "Single Intake Pipeline", description: "One unified view for all phone, text, and form leads." }
    ],
    outcome: "Your front desk is now fail-safe. Stop leaking leads to competitors and ensure every caller gets a professional response—even when your team is busy or the office is closed.",
    ctaText: "Start Frontline",
    ctaSource: "frontline"
  },
  {
    number: "02",
    name: "Specialist",
    descriptor: "The \"Revenue & Reputation\" Accelerator",
    buildFee: "$1,000",
    monthlyFee: "$497/mo",
    ifYouWant: "Turn your lead list into a revenue engine. You don't just capture data—you drive behavior by dominating every social channel, ranking higher on Google, and winning back 'lost' revenue on autopilot.",
    clarityLine: "Everything in Frontline, PLUS:",
    focusBullets: [],
    expandedBullets: [
      { title: "Omni-Channel AI", description: "Unified messaging for Instagram, Facebook, and WhatsApp." },
      { title: "Smart Lead Triage", description: "AI-powered spam filtering and priority lead scoring." },
      { title: "The Database Reactivator", description: "Automated campaigns to win back old or cold leads." },
      { title: "Auto-Reputation Engine", description: "Captures 5-star reviews and routes negative feedback internally." },
      { title: "Show-Rate Maximizer", description: "Precision sequences to ensure booked appointments show up." }
    ],
    outcome: "Turn your lead list into a revenue engine. You don't just capture data—you drive behavior by dominating every social channel, ranking higher on Google, and winning back 'lost' revenue on autopilot.",
    ctaText: "Start Specialist",
    ctaSource: "specialist",
    isPopular: true
  },
  {
    number: "03",
    name: "Command",
    descriptor: "The AI-Powered \"COO\" & Ops Brain",
    buildFee: "$2,000",
    monthlyFee: "$997/mo",
    ifYouWant: "Step out of the day-to-day 'weeds' and into the CEO role. Transform your institutional knowledge into a self-governing AI operating system that manages your team, your data, and your growth.",
    clarityLine: "Everything in Specialist, PLUS:",
    focusBullets: [],
    expandedBullets: [
      { title: "The Company Brain", description: "A searchable AI knowledge base of your specific SOPs and playbooks." },
      { title: "Cross-Platform Automation", description: "Deep integration via N8N/Make to bridge your entire software stack." },
      { title: "Next-Best-Action Dashboard", description: "A daily prioritized list of high-value tasks for your team." },
      { title: "Staff Training Engine", description: "AI-guided onboarding to get new hires up to speed faster." },
      { title: "Institutional Memory Vault", description: "Protects your company intelligence from staff turnover." }
    ],
    outcome: "Step out of the day-to-day 'weeds' and into the CEO role. Transform your institutional knowledge into a self-governing AI operating system that manages your team, your data, and your growth.",
    ctaText: "Apply for Command",
    ctaSource: "command",
    isApplication: true
  }
];

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`group relative p-8 rounded-2xl border transition-all duration-300 ${
        tier.isPopular 
          ? 'border-primary/40 bg-gradient-to-b from-zinc-800/80 to-zinc-950 shadow-2xl' 
          : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent hover:border-primary/30'
      }`}
      data-testid={`card-offers-${tier.ctaSource}`}
    >
      {tier.isPopular && (
        <>
          <BorderBeam size={300} duration={12} delay={0} colorFrom="var(--color-primary)" colorTo="transparent" />
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider">
            MOST POPULAR
          </div>
        </>
      )}
      
      {tier.isApplication && (
        <div className="absolute top-0 right-0 bg-white/10 text-slate-300 text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider border-l border-b border-white/10">
          BY APPLICATION
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-primary">{tier.number}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-white">
          {tier.name}
        </h3>
        
        <p className="text-sm text-slate-400 mb-4">
          {tier.descriptor}
        </p>
        
        {/* Outcome Box - Now above features */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
          <p className="text-slate-300 text-sm leading-relaxed">
            {tier.outcome}
          </p>
        </div>
        
        {/* Pricing - Monthly largest, Launch Build below */}
        <div className="mb-6">
          <div className="text-3xl font-display font-bold text-white mb-1">{tier.monthlyFee}</div>
          <div className="text-sm text-slate-500">One-time setup: {tier.buildFee}</div>
        </div>
        
        {/* Core Capabilities */}
        <div className="mb-6">
          {tier.clarityLine && (
            <p className="text-sm text-primary font-semibold mb-4">{tier.clarityLine}</p>
          )}
          <h4 className="text-xs font-mono text-slate-400 mb-3">CORE CAPABILITIES</h4>
          <ul className="space-y-3">
            {tier.expandedBullets.map((bullet, i) => (
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
        
        <ContactFormDialog
          source={tier.ctaSource}
          title={tier.ctaText}
          description={`Tell us about your business and we'll help you get started with ${tier.name}.`}
          trigger={
            <Button 
              data-testid={`button-offers-${tier.ctaSource}`}
              className={`w-full h-12 rounded-lg font-medium transition-all ${
                tier.isPopular
                  ? 'bg-primary text-primary-foreground hover:bg-cyan-300 shadow-[0_0_20px_-5px_var(--color-primary)]'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30'
              }`}
            >
              {tier.ctaText} <span className="ml-2">→</span>
            </Button>
          }
        />
      </div>
    </motion.div>
  );
}

function AssuranceBox() {
  const [finePrintExpanded, setFinePrintExpanded] = useState(false);
  
  return (
    <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
      <h3 className="text-xl font-display font-semibold mb-4 text-primary flex items-center gap-3">
        <Zap className="w-5 h-5" />
        90-Day Optimization Assurance
      </h3>
      <p className="text-slate-300 leading-relaxed mb-6">
        The first 90 days after go-live are your optimization window. We're in this with you, not just turning on a bot and hoping for the best.
      </p>
      <p className="text-slate-300 leading-relaxed mb-6">
        If, after that period, we're still not seeing the movement we both expected in key metrics like responsiveness and show-rate — and your team has actually been using the system, routing leads through it, and implementing the agreed changes — we will:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-6 pl-2">
        <li>Extend your subscription by 30 days at no additional subscription cost while we adjust it together, and</li>
        <li>If you're still not satisfied after that extension, refund 100% of the subscription fees you paid during that period. Your Launch Build fee is not refundable.</li>
      </ol>
      <p className="text-slate-400 text-sm mb-4">
        This assurance applies to Frontline, Specialist, and Command plans. It does not apply to fully custom builds.
      </p>
      <p className="text-sm text-slate-500 italic mb-6">
        If you're only looking to "test a bot for a couple weeks," SimpleSequence is probably not the right fit.
      </p>
      
      {/* Collapsible Fine Print */}
      <div className="border-t border-white/10 pt-4">
        <button
          onClick={() => setFinePrintExpanded(!finePrintExpanded)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
          data-testid="toggle-fine-print"
        >
          <motion.div animate={{ rotate: finePrintExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-3 h-3" />
          </motion.div>
          {finePrintExpanded ? "Hide Guarantee Conditions" : "View Guarantee Conditions (Fine Print)"}
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
                <p>To qualify for the 90-Day Optimization Assurance and subscription refund:</p>
                <ul className="space-y-2 pl-4">
                  <li><span className="text-slate-400">Coverage period.</span> The assurance covers subscription fees paid in the first 90 days after go-live, plus the 30-day optimization extension we add if results are not on track. It does not cover the Launch Build fee, usage-based fees, or any third-party tool costs.</li>
                  <li><span className="text-slate-400">Plans included.</span> The assurance applies to Frontline, Specialist, and Command plans only. It does not apply to fully custom builds or one-off custom projects where scope is jointly designed outside the standard offers.</li>
                  <li><span className="text-slate-400">Go-live definition.</span> "Go-live" means SimpleSequence is actively handling inbound calls/messages for at least one primary phone number or channel, and you've approved the initial flows/scripts in writing (email is sufficient).</li>
                  <li><span className="text-slate-400">Minimum usage.</span> During the 90-day window, you agree to route at least 75% of relevant inbound leads/calls/messages through SimpleSequence on the agreed channels, and maintain a minimum inbound lead volume that makes evaluation meaningful (at least 30 new leads per month across all channels).</li>
                  <li><span className="text-slate-400">Participation.</span> You or a delegated team member must complete onboarding tasks within the agreed timelines, attend at least 2 out of 3 scheduled optimization calls (or reschedule in good faith), and implement reasonable changes we agree on (routing changes, script updates, or offer tweaks).</li>
                  <li><span className="text-slate-400">Request process.</span> To invoke the assurance, you must request it in writing within 120 days of go-live, allow us to review the metrics and usage together, and participate in the 30-day optimization extension where we attempt fixes.</li>
                  <li><span className="text-slate-400">Refund scope.</span> If, after the 30-day extension, we mutually agree that there has not been meaningful improvement in the agreed metrics, we will refund 100% of subscription fees paid during the 90-day window (and the extension if applicable). The Launch Build fee remains non-refundable.</li>
                  <li><span className="text-slate-400">One-time use.</span> This assurance may be used once per client organization.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PricingGridSection() {
  const [entryCardsHovered, setEntryCardsHovered] = useState(false);

  const frontline = pricingTiers[0];
  const specialist = pricingTiers[1];
  const command = pricingTiers[2];

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
          <span className="text-sm font-mono text-primary mb-4 block">SELECT YOUR PLAN</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium">Find Your Fit</h2>
        </motion.div>

        {/* Row 1: Frontline & Specialist side by side with dual-hover */}
        <motion.div 
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="grid md:grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto"
          onMouseEnter={() => setEntryCardsHovered(true)}
          onMouseLeave={() => setEntryCardsHovered(false)}
        >
          {/* Frontline Card */}
          <div 
            className={`group p-8 rounded-2xl border bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ${
              entryCardsHovered ? 'border-primary/30' : 'border-white/10 hover:border-primary/30'
            }`}
            data-testid="card-offers-frontline"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-primary">{frontline.number}</span>
            </div>
            
            <h3 className="text-2xl font-display font-medium mb-2 text-white">
              {frontline.name}
            </h3>
            <p className="text-sm text-slate-400 mb-4">{frontline.descriptor}</p>
            
            {/* Outcome Box - Above features */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
              <p className="text-slate-300 text-sm">
                {frontline.outcome}
              </p>
            </div>
            
            {/* Pricing - Monthly largest */}
            <div className="mb-6">
              <div className="text-3xl font-display font-bold text-white mb-1">{frontline.monthlyFee}</div>
              <div className="text-sm text-slate-500">One-time setup: {frontline.buildFee}</div>
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
                    <h4 className="text-xs font-mono text-slate-400 mb-3">CORE CAPABILITIES</h4>
                    <ul className="space-y-3">
                      {frontline.expandedBullets.map((bullet, i) => (
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
                </motion.div>
              )}
            </AnimatePresence>

            <ContactFormDialog
              source="frontline"
              title="Start Frontline"
              description="Tell us about your business and we'll help you get started with Frontline."
              trigger={
                <Button 
                  data-testid="button-offers-frontline"
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all group-hover:border-primary/30"
                >
                  {frontline.ctaText} <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </Button>
              }
            />
          </div>

          {/* Specialist Card (Most Popular) */}
          <div 
            className={`group p-8 rounded-2xl border bg-gradient-to-b from-zinc-800/80 to-zinc-950 relative shadow-xl transition-all duration-300 overflow-hidden ${
              entryCardsHovered ? 'border-primary/40' : 'border-primary/30 hover:border-primary/40'
            }`}
            data-testid="card-offers-specialist"
          >
            <BorderBeam size={300} duration={12} delay={0} colorFrom="var(--color-primary)" colorTo="transparent" />
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider">
              MOST POPULAR
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-primary">{specialist.number}</span>
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-2 text-white">
                {specialist.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{specialist.descriptor}</p>
              
              {/* Outcome Box - Above features */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                <p className="text-slate-300 text-sm">
                  {specialist.outcome}
                </p>
              </div>
              
              {/* Pricing - Monthly largest */}
              <div className="mb-6">
                <div className="text-3xl font-display font-bold text-white mb-1">{specialist.monthlyFee}</div>
                <div className="text-sm text-slate-500">One-time setup: {specialist.buildFee}</div>
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
                      {specialist.clarityLine && (
                        <p className="text-sm text-primary font-semibold mb-4">{specialist.clarityLine}</p>
                      )}
                      <h4 className="text-xs font-mono text-slate-400 mb-3">CORE CAPABILITIES</h4>
                      <ul className="space-y-3">
                        {specialist.expandedBullets.map((bullet, i) => (
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
                  </motion.div>
                )}
              </AnimatePresence>

              <ContactFormDialog
                source="specialist"
                title="Start Specialist"
                description="Tell us about your business and we'll help you get started with Specialist."
                trigger={
                  <Button 
                    data-testid="button-offers-specialist"
                    className="w-full bg-primary text-primary-foreground hover:bg-cyan-300 h-12 rounded-lg font-medium shadow-[0_0_20px_-5px_var(--color-primary)] transition-all"
                  >
                    {specialist.ctaText} <span className="ml-2">→</span>
                  </Button>
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Row 2: Command - Full Width Featured */}
        <motion.div 
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={{ once: true }}
          transition={fadeInUpViewport.transition}
          className="max-w-5xl mx-auto"
        >
          <div className="p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-transparent relative overflow-hidden hover:border-primary/20 transition-all">
            <div className="absolute top-0 right-0 bg-white/10 text-slate-300 text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider border-l border-b border-white/10">
              BY APPLICATION
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-primary/70">{command.number}</span>
                </div>
                <h3 className="text-3xl font-display font-semibold mb-2 text-white">{command.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{command.descriptor}</p>
                
                {/* Outcome Box - Above features */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                  <p className="text-slate-300 text-sm">
                    {command.outcome}
                  </p>
                </div>
                
                {/* Pricing - Monthly largest */}
                <div className="mb-6">
                  <div className="text-3xl font-display font-bold text-white mb-1">{command.monthlyFee}</div>
                  <div className="text-sm text-slate-500">One-time setup: {command.buildFee}</div>
                </div>
                
                <ContactFormDialog
                  source="command"
                  title="Apply for Command"
                  description="Tell us about your business and we'll help you get started with Command."
                  trigger={
                    <Button 
                      data-testid="button-offers-command"
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-14 px-8 rounded-lg font-medium text-base transition-all"
                    >
                      {command.ctaText} <span className="ml-2 opacity-50 group-hover:opacity-100">→</span>
                    </Button>
                  }
                />
              </div>
              
              <div className="space-y-6">
                {command.clarityLine && (
                  <p className="text-sm text-primary font-semibold">{command.clarityLine}</p>
                )}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 mb-3">CORE CAPABILITIES</h4>
                  <ul className="space-y-3 text-sm">
                    {command.expandedBullets.map((bullet, i) => (
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ComparisonRow {
  label: string;
  frontline: string;
  specialist: string;
  command: string;
  isCategory?: boolean;
}

const comparisonRows: ComparisonRow[] = [
  { label: "AI Voice Backup Receptionist", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "24/7 Website AI Chatbot", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "Instant SMS Text-Back + Speed-to-Lead", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "Omni-Channel AI (Instagram, FB, WhatsApp)", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Smart Lead Triage + Database Reactivator", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Auto-Reputation & Review Engine + Show-Rate Maximizer", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Company Brain + Cross-Platform Automation", frontline: "—", specialist: "—", command: "Included" },
  { label: "Staff Training + Strategic Partnership", frontline: "—", specialist: "—", command: "White-Glove" },
];

function ComparisonCell({ value, isSpecialist = false }: { value: string; isSpecialist?: boolean }) {
  const isEmpty = value === "—" || value === "";
  const isAvailable = value === "Available";
  const isByApplication = value.includes("by application") || value === "By application";
  const isIncluded = value === "Included" || value.startsWith("Included");
  
  let className = "text-xs md:text-sm ";
  if (isEmpty) {
    className += "text-slate-600";
  } else if (isAvailable) {
    className += "text-primary/80 font-medium";
  } else if (isByApplication) {
    className += "text-white/70 italic";
  } else if (isIncluded && isSpecialist) {
    className += "text-primary font-medium";
  } else if (isIncluded) {
    className += "text-slate-300 font-medium";
  } else if (isSpecialist) {
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
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Compare Plans</h2>
          <p className="text-slate-400">Clear tiers without overpromising. Final scope confirmed during Launch Build.</p>
        </motion.div>

        <motion.div
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={fadeInUpViewport.viewport}
          transition={fadeInUpViewport.transition}
          className="max-w-5xl mx-auto"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-xs font-mono text-slate-500 uppercase tracking-wider w-1/3"></th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Frontline</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-primary bg-primary/[0.03]">Specialist</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white/80">Command</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 text-sm text-slate-300 text-left">{row.label}</td>
                    <td className="py-4 px-4 text-center"><ComparisonCell value={row.frontline} /></td>
                    <td className="py-4 px-4 text-center bg-primary/[0.03]"><ComparisonCell value={row.specialist} isSpecialist /></td>
                    <td className="py-4 px-4 text-center"><ComparisonCell value={row.command} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-slate-300 font-medium mb-4 text-left">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1">Frontline</p>
                    <ComparisonCell value={row.frontline} />
                  </div>
                  <div className="bg-primary/[0.03] rounded-lg py-1 px-1">
                    <p className="text-[10px] text-primary mb-1">Specialist</p>
                    <ComparisonCell value={row.specialist} isSpecialist />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1">Command</p>
                    <ComparisonCell value={row.command} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend + Note */}
          <div className="mt-8 text-left space-y-2">
            <p className="text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Legend:</span> Available = enabled when appropriate based on your workflows + permissions. Confirmed during Launch Build.
            </p>
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Note:</span> We do not claim compliance certification.
            </p>
          </div>

          {/* Custom / Enterprise Card */}
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={{ ...fadeInUpViewport.transition, delay: 0.2 }}
            className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent max-w-md mx-auto text-center"
            data-testid="card-offers-custom-enterprise"
          >
            <h3 className="text-2xl font-display font-medium mb-3 text-white">Custom / Enterprise</h3>
            <p className="text-slate-400 mb-6">
              Multi-location, unusual workflows, strict compliance, or non-standard tools.
            </p>
            <ContactFormDialog
              source="custom-enterprise"
              title="Talk to Us"
              description="Tell us about your unique requirements and we'll map out what's possible."
              trigger={
                <Button 
                  data-testid="button-offers-custom-enterprise"
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-12 rounded-lg font-medium transition-all"
                >
                  Talk to Us <span className="ml-2">→</span>
                </Button>
              }
            />
            <p className="text-xs text-slate-500 mt-4">
              We'll map your stack, risks, and required audit trail before quoting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Offers() {
  const offerSchemas = pricingTiers.map(tier => createOfferSchema({
    name: tier.name,
    description: tier.descriptor,
    price: tier.monthlyFee.replace(/[^0-9]/g, ''),
    buildFee: tier.buildFee
  }));

  return (
    <Layout>
      <SEO 
        title="Pricing & Offers | SimpleSequence"
        description="Three tiers: Frontline ($297/mo), Specialist ($497/mo), and Command (from $997/mo). AI front desk, follow-up automation, and operational systems."
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

      {/* Hero Section */}
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
              Choose Your <span className="text-primary">Path Forward</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              From AI front desk and follow-up to a full AI operations partner — select the level that matches where you are today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid - Find Your Fit */}
      <PricingGridSection />

      {/* Compare Plans Section */}
      <ComparePlansSection />

      {/* Not Sure Where to Start? + AI Clarity Assessment */}
      <section id="ai-clarity-assessment" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium">
              Not Sure Where to <span className="text-primary">Start</span>?
            </h2>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
            <motion.div 
              initial={fadeInUpViewport.initial}
              whileInView={fadeInUpViewport.whileInView}
              viewport={fadeInUpViewport.viewport}
              transition={fadeInUpViewport.transition}
              className="max-w-2xl"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-wide">
                START HERE IF YOU'RE UNSURE
              </div>
              <h3 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">The AI Clarity Assessment™</h3>
              <p className="text-lg text-primary/80 mb-8">
                See how much revenue your front desk is leaking before you choose a plan.
              </p>
              <div className="space-y-4 text-lg text-muted-foreground mb-8 leading-relaxed">
                <p>
                  Before you pick a plan, run the free AI Clarity Assessment™. In a few minutes, we'll map how leads actually move through your phones, forms, and inboxes — where response time breaks, where follow-up stalls, and where your team is carrying work that AI and systems should handle.
                </p>
                <p>
                  You'll receive an Operational Clarity Score (0–100), a concise breakdown of where you're losing revenue, and a clear recommendation on whether Frontline, Specialist, or Command will create the fastest lift for your business. Therefore you can decide with real data instead of guessing.
                </p>
              </div>
              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>How many leads are slipping through the cracks today</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Which parts of your front desk and follow-up can be automated safely</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>What your next 90-day focus should be with SimpleSequence</span>
                </li>
              </ul>
              <ContactFormDialog
                source="assessment-offers"
                title="Take the Free Assessment"
                description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
                trigger={
                  <Button 
                    size="lg" 
                    data-testid="button-offers-assessment-cta"
                    className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  >
                    Take the Free Assessment
                  </Button>
                }
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md relative"
            >
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg opacity-50" />
               <div className="relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#403e3e80]" />
                      <div className="w-3 h-3 rounded-full bg-[#7f7e7d80]" />
                      <div className="w-3 h-3 rounded-full bg-[#b9bdba80]" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500">ASSESSMENT_RESULTS.PDF</div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-2 bg-white/10 rounded w-3/4" />
                      <div className="h-2 bg-white/10 rounded w-full" />
                      <div className="h-2 bg-white/5 rounded w-5/6" />
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary">OPERATIONAL SCORE</span>
                      </div>
                      <div className="text-3xl font-mono font-bold text-white">72<span className="text-zinc-600">/100</span></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                        <div className="space-y-1.5">
                          <div className="h-2 bg-white/10 rounded w-24" />
                          <div className="h-2 bg-white/5 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Launch Build Band */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
          >
            <h3 className="text-3xl font-display font-medium mb-3 text-white text-center">
              What the Launch Build Includes
            </h3>
            <p className="text-lg text-primary/80 text-center mb-6">
              From kickoff to go-live in days, not months.
            </p>
            <p className="text-slate-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              A focused rollout where we design, wire, and test your AI front desk and follow-up system inside the tools you already use.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-xs font-mono text-primary mb-3">PHASE 1</div>
                <h4 className="text-lg font-semibold text-white mb-2">Clarity & Mapping</h4>
                <p className="text-xs text-slate-500 mb-3">Days 1–2</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We run the AI Clarity Diagnostic, map where we can make the biggest difference, and define the key scripts, routing rules, and follow-up flows you actually need.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-xs font-mono text-primary mb-3">PHASE 2</div>
                <h4 className="text-lg font-semibold text-white mb-2">Build & Test</h4>
                <p className="text-xs text-slate-500 mb-3">Days 3–7</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We configure where AI fits best — front desk, pipelines, and sequences — connect phones/forms/calendars/CRM where supported, and test everything with your team.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-xs font-mono text-primary mb-3">PHASE 3</div>
                <h4 className="text-lg font-semibold text-white mb-2">Go-Live & Fine-Tune</h4>
                <p className="text-xs text-slate-500 mb-3">Days 7–14</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We switch the system on, smooth out rough edges from real conversations, and make sure your team is confident using it.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 text-center mb-8 italic">
              Most Frontline and Specialist builds go live inside a week; more complex Command builds may take a bit longer, and we'll agree on that up front.
            </p>
            
            <p className="text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
              After go-live, we're no longer "building" — we're tuning, focusing the next 60–90 days on data-driven optimization so results compound instead of stalling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 90-Day Expectations + Assurance Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.05),transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm font-mono text-primary">REALISTIC EXPECTATIONS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
              When You'll Actually Feel the Impact
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              You don't need to wait 30 or 90 days to feel a difference. Most clients notice fewer missed calls and cleaner follow-up in the first few days after go-live. What can take 60–90 days is building stable, trustworthy numbers on response time, show-rates, and reactivation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="text-lg font-semibold text-white mb-1">Days 1–7</h4>
                <p className="text-sm text-primary mb-4">Immediate Relief</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>New leads stop disappearing into voicemail or inbox chaos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Your team spends less time chasing "who called about what?".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>We quickly fix any obvious script or routing issues.</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="text-lg font-semibold text-white mb-1">Days 8–30</h4>
                <p className="text-sm text-primary mb-4">Visible Movement</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Faster responses and more booked appointments show up in your calendar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Early patterns in show-rates and reactivations start to emerge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>We tweak timing and messaging based on real conversations.</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="text-lg font-semibold text-white mb-1">Days 31–90</h4>
                <p className="text-sm text-primary mb-4">Reliable Baseline</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Trends in show-rates, reactivation, and reviews become clear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Hand-offs between AI and your team feel natural instead of experimental.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>You get a baseline that shows exactly what SimpleSequence is doing for your revenue and workload.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-slate-400 text-center mb-16 leading-relaxed max-w-3xl mx-auto">
              Therefore, we treat the first 90 days after go-live as your optimization runway — the period where quick wins harden into reliable, repeatable performance.
            </p>
            
            {/* 90-Day Optimization Assurance Box with Collapsible Fine Print */}
            <AssuranceBox />
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
