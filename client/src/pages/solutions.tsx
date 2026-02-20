import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Radio, 
  Zap, 
  RefreshCw, 
  Star, 
  Database,
  CheckCircle2,
} from "lucide-react";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";
import { ArchitectFlowDiagram } from "@/components/ui/architect-flow-diagram";
import { DiagnoseFrictionDiagram } from "@/components/ui/diagnose-friction-diagram";
import { MapSequencesDiagram } from "@/components/ui/map-sequences-diagram";
import { LocateLeverageDiagram } from "@/components/ui/locate-leverage-diagram";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

interface Module {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  delivers: string[];
  outcomes: { title: string; desc: string }[];
}

const modules: Module[] = [
  {
    number: "01",
    title: "Universal Capture Hub",
    subtitle: "Your front door is leaking. Leads hit your website, call after hours, or message on social — and disappear because nobody's there. We install a 24/7 intelligent intake layer across every channel so nothing slips through.",
    icon: Radio,
    delivers: [
      "AI-Ready Web Optimization — re-architect your web presence for next-gen AI search engines (ChatGPT, Perplexity, Google AI Overviews) so you're found before competitors",
      "Omnichannel Intake across web forms, Google Business, social DMs, and SMS — every channel funnels into one system",
      "24/7 AI Receptionist that qualifies visitors, answers FAQs, and books appointments while you sleep",
      "AI Voice Phone Answering for after-hours and overflow calls with intelligent routing",
      "Lead enrichment with context and intent scoring before handoff to your team"
    ],
    outcomes: [
      { title: "Stop Losing Leads", desc: "Every inquiry gets captured and responded to — no more silent drop-offs" },
      { title: "Always-On Coverage", desc: "24/7 intelligent response without adding headcount" },
      { title: "AI-Visible Presence", desc: "Your business surfaces in AI-powered search results, not just traditional Google" }
    ]
  },
  {
    number: "02",
    title: "Automation & Implementation",
    subtitle: "Your team is drowning in manual tasks: data entry, appointment scheduling, status updates. We connect your tools into a zero-friction architecture so leads move through your pipeline in under 60 seconds — with zero manual effort.",
    icon: Zap,
    delivers: [
      "Instant CRM & Calendar Synchronization — leads, appointments, and updates flow automatically",
      "Sub-60s \"Speed-to-Lead\" SMS/Voice Engagement triggered the moment a lead comes in",
      "Automated Billing & Invoice Integration tied to pipeline stage",
      "Zero-Manual Data Entry Architecture across your entire tech stack",
      "Cross-tool integrations: CRM, calendar, invoicing, comms — all wired together"
    ],
    outcomes: [
      { title: "Sub-60 Second Response", desc: "Leads engaged before they can click away to a competitor" },
      { title: "Hours Saved Weekly", desc: "Eliminate repetitive admin tasks your team hates" },
      { title: "Fewer Errors", desc: "Automation doesn't forget, mistype, or take sick days" }
    ]
  },
  {
    number: "03",
    title: "Persistent Follow-Up",
    subtitle: "Leads go cold because follow-up is inconsistent. We build relentless, intelligent nurture sequences that chase no-shows, recover stale quotes, and convert maybes — without annoying anyone or burning out your team.",
    icon: RefreshCw,
    delivers: [
      "Automated Nurture for No-Shows and Canceled Appointments",
      "Intelligent Quote Follow-Up Sequences until they say yes, no, or not now",
      "Behavior-Based Re-engagement Timing that adapts to prospect activity",
      "Expired Estimate Recovery campaigns that reactivate dormant opportunities",
      "Human vs AI decision points so escalation happens at exactly the right moment"
    ],
    outcomes: [
      { title: "No Lead Left Behind", desc: "Every opportunity gets proper, persistent follow-up" },
      { title: "Recovered Revenue", desc: "Win back no-shows and stale quotes automatically" },
      { title: "Consistent Execution", desc: "Follow-up happens whether you're busy, on vacation, or asleep" }
    ]
  },
  {
    number: "04",
    title: "Reputation Flywheel",
    subtitle: "Reviews drive buying decisions, but asking feels awkward and timing is everything. We automate 5-star review collection at the perfect moment and route negative feedback internally — before it ever goes public.",
    icon: Star,
    delivers: [
      "Automated 5-Star Review Collection triggered at optimal moments (post-service, post-payment)",
      "Internal Sentiment Detection that routes unhappy clients to resolution before they post publicly",
      "Multi-platform support: Google, Yelp, Facebook, and industry-specific sites",
      "Reputation Velocity Tracking and scorecards so you see momentum building",
      "Automated Response Templates for both positive and negative reviews"
    ],
    outcomes: [
      { title: "More 5-Star Reviews", desc: "Consistent asks at the right time = consistent results" },
      { title: "Damage Control", desc: "Intercept problems before they become public reputation hits" },
      { title: "Trust Building", desc: "Social proof compounds and drives new business on autopilot" }
    ]
  },
  {
    number: "05",
    title: "Revenue Injection",
    subtitle: "Your CRM is full of leads you've already paid for — sitting dormant. We mine your existing database to generate immediate cash flow from people who already know your name, with zero additional ad spend.",
    icon: Database,
    delivers: [
      "Database Reactivation Campaigns targeting high-value dormant contacts (Win-Backs)",
      "Dormancy segmentation to identify who's most likely to re-engage",
      "Seasonal & Lifecycle-Based Offers that feel natural and timely",
      "Multi-touch outreach: email, SMS, and ringless voicemail sequences",
      "Immediate Cash Flow Generation from assets you already own"
    ],
    outcomes: [
      { title: "Immediate Cash Flow", desc: "Revenue from leads you've already paid to acquire" },
      { title: "Lower CAC", desc: "Reactivated leads cost a fraction of new acquisition" },
      { title: "Database Hygiene", desc: "Clean, organized, and actionable contact lists" }
    ]
  }
];

function ModuleCard({ module, index }: { module: Module; index: number }) {
  const Icon = module.icon;
  const isReversed = index % 2 === 1;
  
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="relative"
      data-testid={`card-module-${module.number}`}
    >
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isReversed ? '' : 'lg:flex-row-reverse'}`}>
        <motion.div 
          variants={fadeIn}
          className={`lg:col-span-7 ${isReversed ? '' : 'lg:col-start-6'}`}
        >
          <div className="group w-14 h-14 mb-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
          </div>

          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono text-primary/60">{module.number}</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-white">{module.title}</h2>
          </div>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            {module.subtitle}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4">WHAT WE DELIVER</h3>
            <ul className="space-y-3">
              {module.delivers.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className={`lg:col-span-5 ${isReversed ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        >
          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            <h3 className="text-sm font-mono text-primary mb-6">YOUR OUTCOMES</h3>
            <div className="space-y-6">
              {module.outcomes.map((outcome, i) => (
                <div key={i}>
                  <h4 className="font-medium text-white mb-1">{outcome.title}</h4>
                  <p className="text-sm text-slate-500">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24 border-b border-white/5" />
    </motion.div>
  );
}

export default function Solutions() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sequential Revenue™ — 5-Module Profit Loop",
    description: "Five interconnected modules that transform how service businesses capture, convert, and retain customers through intelligent automation.",
    itemListElement: modules.map((mod, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: mod.title,
        description: mod.subtitle
      }
    }))
  };

  return (
    <Layout>
      <SEO 
        title="Sequential Revenue™ | SimpleSequence"
        description="The 5-Module Profit Loop for Service Businesses. Universal Capture Hub, Automation & Implementation, Persistent Follow-Up, Reputation Flywheel, and Revenue Injection."
        jsonLd={solutionsSchema}
      />

      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm font-mono text-primary mb-6 block">THE 5-MODULE PROFIT LOOP</span>
            <h1 className="text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight">
              Sequential <span className="text-primary">Revenue</span>™
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4 max-w-3xl mx-auto">
              The 5-Module Profit Loop for Service Businesses
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Most service businesses don't have a marketing problem — they have a flow problem. Leads arrive and vanish. Follow-ups fall through. Revenue leaks from gaps nobody mapped.
            </p>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-white font-medium">Sequential Revenue™ is the architecture that fixes it.</span><br />
                Five interconnected modules that eliminate the hidden drag on your operations and replace it with an intelligent flow — where every lead is captured, every follow-up fires, and every dollar of ad spend compounds instead of evaporating.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <GridBeam showCenterBeam={true} gridOpacity={0.08} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="max-w-3xl mb-20"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">What We Deploy</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Five Modules. <span className="text-primary">One Intelligent System.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              This is not a menu of disconnected services — it's an engineered system. Each module reinforces the others. Capture feeds Automation. Follow-Up converts what Capture caught. Reputation compounds the results. Revenue Injection mines what's already yours. Together, they create an operational engine that runs whether you're there or not.
            </p>
          </motion.div>

          <div className="space-y-32">
            {modules.map((mod, index) => (
              <ModuleCard 
                key={mod.number} 
                module={mod} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Deploy - The SimpleSequence Method */}
      <section id="method" className="py-24 relative overflow-hidden border-t border-white/5">
        <GridBeam />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center max-w-2xl mx-auto mb-24"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">How We Deploy</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">The SimpleSequence Method</h2>
            <p className="text-slate-400 text-lg">A clear, structured process that moves you from confusion to a predictable, AI-ready flow — in weeks, not months.</p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="space-y-16 md:space-y-20 relative z-10">
              {[
                { step: "01", title: "Diagnose Friction", desc: "We find exactly where things break down — the hidden drag you've been feeling but couldn't name.", component: DiagnoseFrictionDiagram },
                { step: "02", title: "Map Sequences", desc: "We document the workflows that actually drive revenue and expose what's unclear or broken.", component: MapSequencesDiagram },
                { step: "03", title: "Locate Leverage", desc: "We identify where AI creates real lift — triage, routing, and follow-up — and where your team's judgment still matters most, not shiny distractions.", component: LocateLeverageDiagram },
                { step: "04", title: "Architect the Flow", desc: "We don't just stack tools; we engineer a unified operating system. We take fragmented channels and forge them into a single, intelligent core that processes every interaction with precision.", component: ArchitectFlowDiagram }
              ].map((item, i) => {
                const VisualComponent = item.component;
                const isReversed = i % 2 === 1;
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="group"
                  >
                    <div className="md:hidden">
                      <div className="inline-flex items-center gap-2 text-primary/50 font-mono mb-3">
                        <span>STEP</span>
                        <span className="text-xl font-bold text-primary">{item.step}</span>
                      </div>
                      <h3 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-slate-400 text-base leading-relaxed mb-6">{item.desc}</p>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" />
                        <div className="relative w-full max-w-sm" data-testid={`component-step-${item.step}`}>
                          <VisualComponent />
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-center md:gap-4">
                      <div className={isReversed ? 'order-3' : 'order-1'}>
                        {!isReversed ? (
                          <div className="text-right pr-6">
                            <h3 className="text-2xl lg:text-3xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-slate-400 text-base lg:text-lg leading-relaxed">{item.desc}</p>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative flex justify-end"
                          >
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" />
                            <div className="relative w-full max-w-md" data-testid={`component-step-${item.step}`}>
                              <VisualComponent />
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="order-2 flex flex-col items-center justify-center relative">
                        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10" />
                        <div className="relative z-10 w-14 h-14 rounded-full bg-zinc-900 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_25px_rgba(103,232,249,0.4)]">
                          <span className="text-base font-bold text-primary">{item.step}</span>
                        </div>
                      </div>
                      
                      <div className={isReversed ? 'order-1' : 'order-3'}>
                        {isReversed ? (
                          <div className="text-left pl-6">
                            <h3 className="text-2xl lg:text-3xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-slate-400 text-base lg:text-lg leading-relaxed">{item.desc}</p>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                          >
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" />
                            <div className="relative w-full max-w-md" data-testid={`component-step-${item.step}`}>
                              <VisualComponent />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-8">
              Ready to Install <span className="text-primary">Sequential Revenue</span>™?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Start with a free diagnostic to see which modules need attention first — and what to fix to stop the leaks in your revenue and operations.
            </p>
            <Link 
              href="/assessment"
              data-testid="button-solutions-cta"
              className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
            >
              Get Your Free Diagnostic
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
