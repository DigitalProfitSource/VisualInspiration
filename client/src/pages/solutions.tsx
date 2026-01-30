import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Zap, 
  Bot, 
  Database, 
  Cog, 
  MessageSquare, 
  Star,
  CheckCircle2,
  TrendingUp,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
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

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  delivers: string[];
  outcomes: { title: string; desc: string }[];
}

const growthEnginePillars: Pillar[] = [
  {
    number: "01",
    title: "Speed-to-Lead Capture",
    subtitle: "Every minute you wait costs you money. We install instant response systems that engage leads in under 60 seconds via SMS, voice, or chat — before they move on to your competitor.",
    icon: Zap,
    delivers: [
      "Instant SMS/voice response triggered the moment a lead comes in",
      "After-hours coverage so no inquiry goes cold overnight",
      "Multi-channel routing: phone, text, web forms, social DMs",
      "Escalation rules when AI can't handle it alone",
      "Response time tracking and accountability dashboards"
    ],
    outcomes: [
      { title: "Sub-60 Second Response", desc: "Leads engaged before they can click away" },
      { title: "24/7 Lead Coverage", desc: "No more missed opportunities after hours" },
      { title: "Higher Contact Rates", desc: "Reach leads when intent is highest" }
    ]
  },
  {
    number: "02",
    title: "AI Web Conversion",
    subtitle: "Your website generates traffic, but visitors disappear without a trace. We deploy AI assistants that qualify visitors, answer questions, and book appointments — while you sleep.",
    icon: Bot,
    delivers: [
      "AI chat agents trained on your services and FAQs",
      "Smart qualification flows that capture intent and urgency",
      "Appointment booking integrated with your calendar",
      "Lead enrichment with context before handoff to humans",
      "Guardrails so AI knows when to escalate to your team"
    ],
    outcomes: [
      { title: "Always-On Sales Layer", desc: "Convert visitors 24/7 without adding headcount" },
      { title: "Pre-Qualified Appointments", desc: "Your calendar fills with ready-to-buy leads" },
      { title: "Reduced Bounce Rate", desc: "Visitors get answers instead of leaving" }
    ]
  },
  {
    number: "03",
    title: "Database Reactivation",
    subtitle: "Your CRM is full of leads you've already paid for — sitting dormant. We mine your existing database to generate immediate cash flow from people who already know your name.",
    icon: Database,
    delivers: [
      "Dormancy segmentation to identify high-value reactivation targets",
      "Re-engagement sequences tailored to time since last contact",
      "Seasonal and event-triggered campaigns that feel natural",
      "Multi-touch outreach: email, SMS, and ringless voicemail",
      "Win-back offers and messaging frameworks that convert"
    ],
    outcomes: [
      { title: "Immediate Cash Flow", desc: "Revenue from leads you already own" },
      { title: "Lower CAC", desc: "Reactivated leads cost less than new acquisition" },
      { title: "Database Hygiene", desc: "Clean, organized, and actionable contact lists" }
    ]
  }
];

const operationalPillars: Pillar[] = [
  {
    number: "04",
    title: "Ops & Workflow Automation",
    subtitle: "Your team is drowning in manual tasks: data entry, status updates, appointment reminders. We connect your tools and eliminate the busywork so your team can focus on revenue.",
    icon: Cog,
    delivers: [
      "CRM automation that updates records without manual entry",
      "Appointment reminders and confirmation sequences",
      "Task creation and assignment based on pipeline stage",
      "Cross-tool integrations: CRM, calendar, invoicing, comms",
      "Process visibility so you can see where work gets stuck"
    ],
    outcomes: [
      { title: "Hours Saved Weekly", desc: "Eliminate repetitive admin tasks" },
      { title: "Fewer Errors", desc: "Automation doesn't forget or mistype" },
      { title: "Team Focus", desc: "Your people do what only humans can do" }
    ]
  },
  {
    number: "05",
    title: "Follow-Up Engine",
    subtitle: "Leads go cold because follow-up is inconsistent. We build relentless, intelligent follow-up sequences that chase no-shows, nurture maybes, and convert stale quotes — without annoying anyone.",
    icon: MessageSquare,
    delivers: [
      "Stage-based follow-up sequences triggered automatically",
      "No-show and cancellation recovery campaigns",
      "Quote follow-up until they say yes, no, or not now",
      "Human vs AI decision points so escalation happens at the right time",
      "Cadence optimization to avoid spam while staying persistent"
    ],
    outcomes: [
      { title: "No Lead Left Behind", desc: "Every opportunity gets proper follow-up" },
      { title: "Recovered Revenue", desc: "Win back no-shows and stale quotes" },
      { title: "Consistent Execution", desc: "Follow-up happens whether you're busy or not" }
    ]
  },
  {
    number: "06",
    title: "Reputation Flywheel",
    subtitle: "Reviews drive decisions, but asking feels awkward and timing is everything. We automate review requests at the perfect moment and route negative feedback internally before it goes public.",
    icon: Star,
    delivers: [
      "Review requests triggered at optimal moments (post-service, post-payment)",
      "Multi-platform support: Google, Yelp, Facebook, industry-specific",
      "Sentiment detection that routes unhappy clients to resolution first",
      "Response templates for both positive and negative reviews",
      "Review velocity tracking and reputation scorecards"
    ],
    outcomes: [
      { title: "More 5-Star Reviews", desc: "Consistent asks = consistent results" },
      { title: "Damage Control", desc: "Intercept problems before they go public" },
      { title: "Trust Building", desc: "Social proof that drives new business" }
    ]
  }
];

function PillarCard({ pillar, index, isReversed }: { pillar: Pillar; index: number; isReversed: boolean }) {
  const Icon = pillar.icon;
  
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="relative"
      data-testid={`card-pillar-${pillar.number}`}
    >
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isReversed ? '' : 'lg:flex-row-reverse'}`}>
        {/* Main Content */}
        <motion.div 
          variants={fadeIn}
          className={`lg:col-span-7 ${isReversed ? '' : 'lg:col-start-6'}`}
        >
          {/* Icon Box */}
          <div className="group w-14 h-14 mb-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
          </div>

          {/* Title & Subtitle */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono text-primary/60">{pillar.number}</span>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-white">{pillar.title}</h2>
          </div>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            {pillar.subtitle}
          </p>

          {/* What We Deliver */}
          <div className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4">WHAT WE DELIVER</h3>
            <ul className="space-y-3">
              {pillar.delivers.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Outcomes Card */}
        <motion.div 
          variants={fadeIn}
          className={`lg:col-span-5 ${isReversed ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        >
          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            <h3 className="text-sm font-mono text-primary mb-6">YOUR OUTCOMES</h3>
            <div className="space-y-6">
              {pillar.outcomes.map((outcome, i) => (
                <div key={i}>
                  <h4 className="font-medium text-white mb-1">{outcome.title}</h4>
                  <p className="text-sm text-slate-500">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-24 border-b border-white/5" />
    </motion.div>
  );
}

export default function Solutions() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SimpleSequence Six Pillars",
    description: "Six interconnected systems that transform how service businesses capture, convert, and retain customers",
    itemListElement: [...growthEnginePillars, ...operationalPillars].map((pillar, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: pillar.title,
        description: pillar.subtitle
      }
    }))
  };

  return (
    <Layout>
      <SEO 
        title="The Six Pillars | SimpleSequence"
        description="Six operational systems for service businesses: Speed-to-Lead, AI Web Conversion, Database Reactivation, Ops Automation, Follow-Up Engine, and Reputation Flywheel."
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
            <span className="text-sm font-mono text-primary mb-6 block">WHAT WE DEPLOY</span>
            <h1 className="text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight">
              The <span className="text-primary">Six Pillars</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Six interconnected systems that transform how you capture, convert, and retain customers — so you stop guessing and start scaling with confidence.
            </p>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-white font-medium">This is not a menu — it's a system.</span><br />
                Each pillar reinforces the others. Speed-to-Lead feeds your pipeline. Follow-Up converts it. Reputation compounds the results. Together, they create an operational engine that runs whether you're there or not.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growth Engine Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <GridBeam showCenterBeam={true} gridOpacity={0.08} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="max-w-3xl mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">The Growth Engine</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Stop Losing Leads to <span className="text-primary">Speed and Silence</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Your marketing works, but your capture system is leaking. These three pillars install an "Always-On" sales layer that engages every opportunity instantly — maximum ROI on every ad dollar and a calendar full of qualified appointments.
            </p>
          </motion.div>

          {/* Growth Engine Pillars */}
          <div className="space-y-32">
            {growthEnginePillars.map((pillar, index) => (
              <PillarCard 
                key={pillar.number} 
                pillar={pillar} 
                index={index}
                isReversed={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Operational Ecosystem Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <GridBeam showCenterBeam={false} gridOpacity={0.06} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="max-w-3xl mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">The Operational Ecosystem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Scale Your Operations, <span className="text-primary">Not Your Headcount</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Eliminate the manual busywork and "human bottlenecks" that cause burnout. These three pillars build the backend infrastructure that runs your business on autopilot — reclaim your time and sanity.
            </p>
          </motion.div>

          {/* Operational Pillars */}
          <div className="space-y-32">
            {operationalPillars.map((pillar, index) => (
              <PillarCard 
                key={pillar.number} 
                pillar={pillar} 
                index={index}
                isReversed={index % 2 === 0}
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
                    {/* Mobile: Stacked layout */}
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
                    
                    {/* Desktop: 3-column grid with center timeline */}
                    <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-center md:gap-4">
                      {/* Left Column */}
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
                      
                      {/* Center Column - Timeline with Step Indicator */}
                      <div className="order-2 flex flex-col items-center justify-center relative">
                        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10" />
                        <div className="relative z-10 w-14 h-14 rounded-full bg-zinc-900 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_25px_rgba(103,232,249,0.4)]">
                          <span className="text-base font-bold text-primary">{item.step}</span>
                        </div>
                      </div>
                      
                      {/* Right Column */}
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
              Ready to Install <span className="text-primary">Your Six Pillars</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Start with a free diagnostic to see which pillars need attention first — and what to fix to stop the leaks in your revenue and operations.
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
