import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check, ChevronDown, Phone, Users, Brain, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { Footer } from "@/components/footer";
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
    descriptor: "AI front desk & follow-up foundation",
    buildFee: "$600 Launch Build",
    monthlyFee: "$297/mo",
    ifYouWant: "If you want the phones, texts, and forms handled automatically without hiring another front-desk person.",
    focusBullets: [
      "Always-on front desk coverage",
      "Faster responses to new leads",
      "Basic, consistent follow-up that actually happens"
    ],
    expandedBullets: [
      { title: "24/7 AI front desk across key channels", description: "Answers phone, SMS, website chat, and lead forms so fewer people hit voicemail or get ignored." },
      { title: "Smart triage & routing", description: "Detects new leads vs existing clients/patients vs vendors vs spam, and flags urgent issues so real emergencies get priority." },
      { title: "Core follow-up flows", description: "New lead → consult / call / estimate booking, plus confirmations, reminders, simple reschedule flows, and a short \"win-back\" touch for recent no-shows or cancellations." },
      { title: "Single intake & simple stages", description: "One consistent way leads come in instead of scattered forms and sticky notes, with standard stages like: New → Qualified → Scheduled → Completed → Follow-up." },
      { title: "Daily visibility for your team", description: "A central list or view of new leads and today's appointments so your staff sees what's on deck without hunting across tools; therefore your team spends more time doing and less time searching." },
      { title: "Monthly optimization", description: "One focused review each month to tune scripts, routing, and timing based on what's actually happening in your business." }
    ],
    outcome: "Your front desk stops leaking obvious money. New leads are captured, responded to, and moved forward consistently, therefore taking basic front-desk chaos off your plate without another hire.",
    ctaText: "Start Frontline",
    ctaSource: "frontline"
  },
  {
    number: "02",
    name: "Specialist",
    descriptor: "Show-rate, reactivation, and reputation engine",
    buildFee: "$1,000 Launch Build",
    monthlyFee: "$497/mo",
    ifYouWant: "If you want more people showing up, old leads coming back, and reviews growing without burning out your team.",
    focusBullets: [
      "Increasing show-rates to booked appointments",
      "Winning back leads who went cold",
      "Systematic review generation and complaint routing"
    ],
    expandedBullets: [
      { title: "Industry-shaped pipelines", description: "We model the real stages of your world (Med-spa: New lead → Consult booked → Show/no-show → Procedure → Post-op → Review | Law: New inquiry → Conflict check → Consult → Retainer signed → Active case | Home services: New request → Visit → Quote sent → Job scheduled → Completion → Warranty follow-up)" },
      { title: "Show-Rate Engine", description: "Multi-step reminder and nudge sequences tuned to high-value appointments; different messaging for consults vs low-stakes visits; smart reschedule prompts instead of \"sorry we missed you\" and silence." },
      { title: "Reactivation campaigns", description: "Flows for never-booked inquiries who went quiet, no-shows and last-minute cancellations, and past clients/patients who haven't booked in a while." },
      { title: "Reputation & review flows", description: "Asks happy clients/patients for reviews at the right moment; routes unhappy ones into an internal resolution path; prioritizes platforms that matter most for your niche, therefore protecting your reputation while you grow it." },
      { title: "Targeted education & FAQs", description: "Pre-visit and post-visit instructions sent automatically, plus \"what to expect\" flows for key services or procedures, using your approved content so the system never gives legal/medical advice or goes off-script." },
      { title: "Stronger ongoing tuning", description: "A deeper monthly performance review focused on show-rate, reactivation, and review trends, with clear next-step recommendations so the system keeps getting sharper instead of going stale." }
    ],
    outcome: "You don't just respond — you drive revenue behavior. More people show up, more old leads return, and more happy clients talk about you publicly, therefore lifting the ROI of your marketing and front-desk time without adding more staff.",
    ctaText: "Start Specialist",
    ctaSource: "specialist",
    isPopular: true
  },
  {
    number: "03",
    name: "Command",
    descriptor: "AI ops brain & strategic partner",
    buildFee: "From $2,000 Launch Build",
    monthlyFee: "From $997/mo",
    ifYouWant: "If you want an AI-driven operations layer that helps your team know what to do next across leads, cases, jobs, and locations.",
    focusBullets: [
      "Turning your SOPs and policies into an AI-aware \"ops brain\"",
      "Giving your team clear next-best-actions each day",
      "Coordinating more complex, multi-location or multi-service operations"
    ],
    expandedBullets: [
      { title: "AI over your playbooks (within your rules)", description: "We load your SOPs, policies, consent forms, pricing guides, and key checklists so the system can follow your rules, not invent its own; both the AI front desk and your staff can lean on the same source of truth." },
      { title: "Ops co-pilot for your staff", description: "Team members can ask operational questions like: \"What's our process if a patient calls with concerns 10 days after treatment?\" \"What do we do if a tenant reports a leak after hours?\" The co-pilot responds with steps based on your playbooks and can create tasks or tickets in your existing tools where supported." },
      { title: "Daily next-best-actions", description: "A prioritized list of who should be contacted today — hot leads, stalled cases, aging quotes, at-risk clients — so your team focuses on the handful of actions that matter most instead of staring at an overwhelming list." },
      { title: "Advanced visibility & patterns", description: "Trends across response times, show-rates, conversion, reactivation, and reviews; breakdowns by channel (phone, SMS, web, DMs) and by source where the data exists, therefore giving leadership real operational insight instead of just call counts." },
      { title: "Strategic partnership layer", description: "Dedicated point of contact, quarterly strategy and roadmap sessions, and joint experiments (new flows, campaigns, or offers) with clear success criteria." },
      { title: "Designed for complexity", description: "Support for multi-location routing, rules, and reporting where needed, plus more complex service menus or case types without everything becoming a one-off project." }
    ],
    outcome: "Command turns SimpleSequence into your AI operations partner — a system that knows your rules, organizes daily actions, and helps your team coordinate complex, high-value work, therefore justifying premium, ROI-first pricing and long-term collaboration.",
    ctaText: "Apply for Command",
    ctaSource: "command",
    isApplication: true
  }
];

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-sm text-slate-500">{tier.buildFee}</span>
          <span className="text-slate-600">•</span>
          <span className="text-2xl font-display font-bold text-white">{tier.monthlyFee}</span>
          <span className="text-sm text-slate-500">(month-to-month)</span>
        </div>
        
        <p className="text-primary text-sm font-medium mb-6">
          {tier.ifYouWant}
        </p>
        
        <div className="mb-6">
          <h4 className="text-xs font-mono text-slate-400 mb-3">THIS PLAN FOCUSES ON:</h4>
          <ul className="space-y-2">
            {tier.focusBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mb-6 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                <ul className="space-y-4">
                  {tier.expandedBullets.map((bullet, i) => (
                    <li key={i} className="text-sm">
                      <div className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium">{bullet.title}</span>
                          <p className="text-slate-400 mt-1">{bullet.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
          <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {tier.outcome}
          </p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 text-sm text-slate-400 hover:text-primary transition-colors"
          data-testid={`toggle-expand-${tier.ctaSource}`}
        >
          {isExpanded ? "Show Less" : "See Full Details"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        
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

function PricingGridSection() {
  const [entryCardsHovered, setEntryCardsHovered] = useState(false);
  const [frontlineExpanded, setFrontlineExpanded] = useState(false);
  const [specialistExpanded, setSpecialistExpanded] = useState(false);
  const [commandExpanded, setCommandExpanded] = useState(false);

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
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-primary">{frontline.number}</span>
              <div className="text-right">
                <span className="text-sm text-slate-500 block">{frontline.buildFee}</span>
                <span className="text-2xl font-display font-bold text-white">{frontline.monthlyFee}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-medium mb-2 text-white">
              {frontline.name}
            </h3>
            <p className="text-sm text-slate-400 mb-4">{frontline.descriptor}</p>
            
            <p className="text-primary text-sm font-medium mb-4">
              {frontline.ifYouWant}
            </p>

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
                    <h4 className="text-xs font-mono text-slate-400 mb-3">THIS PLAN FOCUSES ON:</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {frontline.focusBullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <AnimatePresence>
                    {frontlineExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 pt-4 border-t border-white/10">
                          <h4 className="text-xs font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                          <ul className="space-y-3">
                            {frontline.expandedBullets.map((bullet, i) => (
                              <li key={i} className="text-sm">
                                <div className="flex items-start gap-3">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-white font-medium">{bullet.title}</span>
                                    <p className="text-slate-400 mt-1 text-xs">{bullet.description}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                    <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
                    <p className="text-slate-300 text-sm">
                      {frontline.outcome}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setFrontlineExpanded(!frontlineExpanded)}
                    className="w-full flex items-center justify-center gap-2 py-2 mb-4 text-sm text-slate-400 hover:text-primary transition-colors"
                    data-testid="toggle-expand-frontline"
                  >
                    {frontlineExpanded ? "Show Less" : "See Full Details"}
                    <motion.div animate={{ rotate: frontlineExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
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
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary">{specialist.number}</span>
                <div className="text-right">
                  <span className="text-sm text-slate-500 block">{specialist.buildFee}</span>
                  <span className="text-2xl font-display font-bold text-white">{specialist.monthlyFee}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-2 text-white">
                {specialist.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{specialist.descriptor}</p>
              
              <p className="text-primary text-sm font-medium mb-4">
                {specialist.ifYouWant}
              </p>

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
                      <h4 className="text-xs font-mono text-slate-400 mb-3">THIS PLAN FOCUSES ON:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        {specialist.focusBullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <AnimatePresence>
                      {specialistExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mb-6 pt-4 border-t border-white/10">
                            <h4 className="text-xs font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                            <ul className="space-y-3">
                              {specialist.expandedBullets.map((bullet, i) => (
                                <li key={i} className="text-sm">
                                  <div className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="text-white font-medium">{bullet.title}</span>
                                      <p className="text-slate-400 mt-1 text-xs">{bullet.description}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                      <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
                      <p className="text-slate-300 text-sm">
                        {specialist.outcome}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setSpecialistExpanded(!specialistExpanded)}
                      className="w-full flex items-center justify-center gap-2 py-2 mb-4 text-sm text-slate-400 hover:text-primary transition-colors"
                      data-testid="toggle-expand-specialist"
                    >
                      {specialistExpanded ? "Show Less" : "See Full Details"}
                      <motion.div animate={{ rotate: specialistExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
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
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-primary/70">{command.number}</span>
                  <div>
                    <span className="text-sm text-slate-500 mr-2">{command.buildFee}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-2xl font-display font-bold text-white ml-2">{command.monthlyFee}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-display font-semibold mb-2 text-white">{command.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{command.descriptor}</p>
                <p className="text-primary/80 text-base mb-4 font-medium">{command.ifYouWant}</p>
                
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-slate-400 mb-3">THIS PLAN FOCUSES ON:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {command.focusBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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
                <AnimatePresence>
                  {commandExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div>
                        <h4 className="text-xs font-mono text-primary/70 mb-4">WHAT YOU REALLY GET</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                          {command.expandedBullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-white font-medium">{bullet.title}</span>
                                <p className="text-slate-400 mt-1 text-xs">{bullet.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <div>
                      <h4 className="text-xs font-mono text-primary/70 mb-4">WHAT YOU REALLY GET</h4>
                      <ul className="space-y-2 text-sm text-slate-400">
                        {command.expandedBullets.slice(0, 3).map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                            <span className="text-white font-medium">{bullet.title}</span>
                          </li>
                        ))}
                        <li className="text-slate-500 text-sm pl-6">+ {command.expandedBullets.length - 3} more...</li>
                      </ul>
                    </div>
                  )}
                </AnimatePresence>
                
                <button
                  onClick={() => setCommandExpanded(!commandExpanded)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
                  data-testid="toggle-expand-command"
                >
                  {commandExpanded ? "Show Less" : "See Full Details"}
                  <motion.div animate={{ rotate: commandExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-xs font-mono text-slate-500 mb-2">OUTCOME</h4>
                  <p className="text-slate-400 text-sm">{command.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Offers() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-display font-semibold tracking-tight text-white hover:text-primary transition-colors">
            SimpleSequence
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Home</a>
            <a href="/solutions" className="text-sm text-muted-foreground hover:text-white transition-colors">Solutions</a>
            <a href="/industries" className="text-sm text-muted-foreground hover:text-white transition-colors">Industries</a>
            <a href="/process" className="text-sm text-muted-foreground hover:text-white transition-colors">Process</a>
            <a href="/offers" className="text-sm text-white">Offers</a>
          </nav>
          <ContactFormDialog
            source="offers-header"
            title="Get Started"
            description="Tell us about your business and we'll help you find the right solution."
            trigger={
              <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5 hover:text-white text-xs font-medium rounded-full px-6 transition-all duration-300 hover:border-primary/50">
                Get Started
              </Button>
            }
          />
        </div>
      </header>

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
    

      {/* Launch Build Band */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
          >
            <h3 className="text-2xl font-display font-medium mb-6 text-white text-center">
              What the Launch Build Includes
            </h3>
            <div className="space-y-4 text-slate-400 text-center max-w-3xl mx-auto">
              <p className="leading-relaxed">
                Every plan starts with the <span className="text-white">SimpleSequence Launch Build</span> — a focused project that maps where leads leak, where follow-up breaks, and how your tools currently fit together.
              </p>
              <p className="leading-relaxed">
                You receive an <span className="text-primary">AI Clarity Diagnostic</span> with an Operational Clarity Score (0–100) and a prioritized fix list, then we implement according to the plan you chose. Ongoing optimization is included in every tier so your system keeps improving instead of decaying.
              </p>
            </div>
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
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm font-mono text-primary">REALISTIC EXPECTATIONS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
              Why We Design Around a 90-Day Launch Window
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              We're not installing a widget. We're changing how your front desk, intake, and follow-up behave every day. In most serious service businesses, it takes about 60–90 days to route most calls, texts, and forms through the new system, tune messaging to your services and tone, and see stable numbers on response time, bookings, no-shows, and reactivations. Therefore, every Launch Build is scoped for a 90-day window: install → stabilize → then optimize based on real data — not guesswork.
            </p>
            
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
              <h3 className="text-xl font-display font-semibold mb-4 text-primary flex items-center gap-3">
                <Zap className="w-5 h-5" />
                90-Day Performance Assurance
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Billing is month-to-month from day one, but we treat the first 90 days as the Launch Window. If, after 90 days live, we're not seeing the movement we both expected in key metrics like responsiveness and show-rate — and your team has actually been using the system and showing up to optimization calls — we'll extend your subscription by 30 days at no additional subscription cost while we adjust it together. We'd rather prove our value than argue about it.
              </p>
              <p className="text-sm text-slate-500 italic">
                If you're only looking to "test a bot for a couple weeks," SimpleSequence is probably not the right fit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Clarity Assessment - Lead Magnet */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
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
              <h2 className="text-4xl md:text-5xl font-medium mb-8 tracking-tight">The AI Clarity Assessment™</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                If you're not sure which plan fits, take the free AI Clarity Assessment™. In a few minutes, we'll map where lead flow breaks, where follow-up slows down, and where operations rely too heavily on manual effort. You'll receive an Operational Clarity Score (0–100), a simple breakdown of where you're losing revenue, and a recommendation for which SimpleSequence plan will give you the fastest win.
              </p>
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

      {/* Bottom CTA */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium mb-10">
              Not Sure Where to <span className="text-primary">Start</span>?
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              Start with the free AI Clarity Assessment and we'll help you identify where you're leaking revenue and which plan will create the fastest lift.
            </p>
            <ContactFormDialog
              source="offers-bottom-cta"
              title="Take the Free Assessment"
              description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]"
                  data-testid="button-offers-bottom-cta"
                >
                  Take the Free Assessment
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
