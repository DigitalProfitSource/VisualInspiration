import { motion } from "framer-motion";
import { 
  Globe, 
  Database, 
  Bot, 
  Zap, 
  RefreshCw, 
  Star, 
  Route, 
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";

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

const solutions = [
  {
    number: "01",
    title: "Customer-Ready Website Architecture",
    subtitle: "Your website is no longer a brochure — it's a behavioral intake layer that shapes how leads flow into your system.",
    icon: Globe,
    clarifies: [
      "How your site should capture intent at different stages",
      "What information to collect (and when)",
      "How to reduce friction for each traffic source",
      "Where AI assistive layers can enhance the journey (without replacing humans)"
    ],
    insights: [
      { title: "Visitor Intent Patterns", desc: "Understanding what visitors need at each touchpoint" },
      { title: "Intake Sequence Mapping", desc: "Logical flow from first touch to qualification" },
      { title: "SEO/ESO Alignment", desc: "Optimized for AI discoverability" },
      { title: "Website-to-CRM Handoff", desc: "Clear rules for seamless data transfer" }
    ]
  },
  {
    number: "02",
    title: "CRM Pipeline Architecture",
    subtitle: "A blueprint showing how every opportunity should be tracked, organized, and advanced — before any automation exists.",
    icon: Database,
    clarifies: [
      "Ideal pipeline stages for the business",
      "Qualification logic",
      "Follow-up timing",
      "Status definitions your team actually understands",
      "Where AI can support routing, prioritization, and pattern detection"
    ],
    insights: [
      { title: "Industry-Aligned Pipeline", desc: "Model tailored to your business type" },
      { title: "Stage-by-Stage Logic", desc: "Clear decision points at each stage" },
      { title: "Accountability Structure", desc: "Who owns what and when" },
      { title: "Reporting Clarity", desc: "Metrics that matter" }
    ]
  },
  {
    number: "03",
    title: "AI-Assisted Intake Opportunities",
    subtitle: "Where natural-language AI can safely support (not replace) your front-desk workflows.",
    icon: Bot,
    clarifies: [
      "When AI should answer",
      "When humans must answer",
      "What types of calls/messages AI can intelligently route",
      "Where AI reduces friction without harming trust"
    ],
    insights: [
      { title: "Intake Logic Tree", desc: "Decision framework for routing" },
      { title: "AI vs Human Boundaries", desc: "Clear delineation of responsibilities" },
      { title: "Scripts & Guardrails", desc: "Recommended frameworks for safety" },
      { title: "Risk Analysis", desc: "Avoid harmful AI deployments" }
    ]
  },
  {
    number: "04",
    title: "Follow-Up Clarity Protocols",
    subtitle: "Before automation exists, you need the rules for consistent follow-up.",
    icon: Zap,
    clarifies: [
      "Follow-up timing standards",
      "Which messages matter most",
      "When human outreach is essential",
      "What triggers follow-up behavior",
      "Where AI can support without replacing humans"
    ],
    insights: [
      { title: "Sequence-by-Sequence Clarity", desc: "Logical progression of touches" },
      { title: "Intent Segments", desc: "Messaging hierarchy by lead type" },
      { title: "Human vs AI Decision Points", desc: "When to escalate" },
      { title: "Engagement Timing Rules", desc: "Optimal cadence patterns" }
    ]
  },
  {
    number: "05",
    title: "Lead Reactivation Framework",
    subtitle: "Your database contains hidden revenue — if you know how to activate it.",
    icon: RefreshCw,
    clarifies: [
      "Which cold leads are worth re-engaging",
      "What message type works for each dormancy stage",
      "How not to sound spammy or desperate",
      "When to use humans, automation, or AI"
    ],
    insights: [
      { title: "Dormancy Segmentation", desc: "Categorizing leads by inactivity" },
      { title: "Re-engagement Logic", desc: "Strategic approach per segment" },
      { title: "Seasonal Triggers", desc: "Industry-timed reactivation" },
      { title: "Message Pathways", desc: "Guardrails for outreach" }
    ]
  },
  {
    number: "06",
    title: "Reputation & Review Flow",
    subtitle: "A strategic timing sequence that builds consistent reviews where trust is highest.",
    icon: Star,
    clarifies: [
      "Optimal moments to request reviews",
      "Which platforms matter most",
      "How to direct unhappy clients away from public channels",
      "How to incorporate sentiment into operational loops"
    ],
    insights: [
      { title: "Review Timing Logic", desc: "When to ask for maximum response" },
      { title: "Sentiment-Routing Pathways", desc: "Handling negative feedback internally" },
      { title: "Platform Prioritization", desc: "Where reviews matter most" },
      { title: "Internal Escalation", desc: "Structure for issue resolution" }
    ]
  },
  {
    number: "07",
    title: "Industry-Aligned Conversion Paths",
    subtitle: "Decision-support pathways tailored to industry behavior and customer intent.",
    icon: Route,
    clarifies: [
      "What customers need to move forward",
      "What slows decisions",
      "What accelerates them",
      "Where AI can support triage or qualification"
    ],
    insights: [
      { title: "Quote/Estimate Pathways", desc: "Consultation flow optimization" },
      { title: "Form Progression Logic", desc: "Step-by-step intake design" },
      { title: "Conversion Dropoff Analysis", desc: "Identifying friction points" },
      { title: "Messaging Clarity Map", desc: "What to say and when" }
    ]
  },
  {
    number: "08",
    title: "Operational Rhythm & Visibility",
    subtitle: "Your internal cadence for consistent execution and reduced friction.",
    icon: Clock,
    clarifies: [
      "Team handoffs",
      "Daily, weekly, monthly operational rhythms",
      "Communication loops",
      "AI readiness signals across operations"
    ],
    insights: [
      { title: "Process Visibility Map", desc: "See where work gets stuck" },
      { title: "Accountability Roles", desc: "Clear ownership at each stage" },
      { title: "Workflow Enhancements", desc: "Opportunities for improvement" },
      { title: "Operational Cadence Model", desc: "Rhythm that works" }
    ]
  }
];

export default function Solutions() {
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
            <a href="/solutions" className="text-sm text-white">Solutions</a>
            <a href="/industries" className="text-sm text-muted-foreground hover:text-white transition-colors">Industries</a>
            <a href="/process" className="text-sm text-muted-foreground hover:text-white transition-colors">Process</a>
            <a href="/offers" className="text-sm text-muted-foreground hover:text-white transition-colors">Offers</a>
          </nav>
          <ContactFormDialog
            source="solutions-header"
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
            <span className="text-sm font-mono text-primary mb-6 block">THE OPERATIONAL STACK</span>
            <h1 className="text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight">
              The SimpleSequence <span className="text-primary">Operational Stack</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Eight interconnected clarity frameworks that show you exactly how your business should run — across lead capture, follow-up, operations, and AI adoption.
            </p>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-white font-medium">This is not software.</span><br />
                This is the architecture that makes your software, team, and future AI tools actually work together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 relative overflow-hidden">
        {/* Grid and beam background for workflow effect */}
        <div className="absolute inset-0">
          <GridBeam showCenterBeam={true} gridOpacity={0.08} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-32">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={solution.number}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={stagger}
                  className="relative"
                >
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Main Content */}
                    <motion.div 
                      variants={fadeIn}
                      className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}
                    >
                      {/* Icon Box */}
                      <div className="group w-14 h-14 mb-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                      </div>

                      {/* Title & Subtitle */}
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-xs font-mono text-primary/60">{solution.number}</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-white">{solution.title}</h2>
                      </div>
                      <p className="text-lg text-slate-400 leading-relaxed mb-8">
                        {solution.subtitle}
                      </p>

                      {/* What This Clarifies */}
                      <div className="mb-8">
                        <h3 className="text-sm font-mono text-primary mb-4">WHAT THIS CLARIFIES</h3>
                        <ul className="space-y-3">
                          {solution.clarifies.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Key Insights Card */}
                    <motion.div 
                      variants={fadeIn}
                      className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
                    >
                      <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
                        <h3 className="text-sm font-mono text-primary mb-6">KEY INSIGHTS DELIVERED</h3>
                        <div className="space-y-6">
                          {solution.insights.map((insight, i) => (
                            <div key={i}>
                              <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                              <p className="text-sm text-slate-500">{insight.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  {index < solutions.length - 1 && (
                    <div className="mt-24 border-b border-white/5" />
                  )}
                </motion.div>
              );
            })}
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
              Ready for <span className="text-primary">operational clarity</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Start with a free assessment to see where your business stands across these eight critical frameworks.
            </p>
            <ContactFormDialog
              source="solutions-cta"
              title="Get Your Operational Assessment"
              description="Tell us about your business and we'll provide a comprehensive operational clarity analysis."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  data-testid="button-solutions-cta"
                >
                  Get Your Free Assessment
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-sm bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-medium mb-1">Practical AI for Service Businesses</p>
              <p className="text-zinc-500">Operationally grounded. Revenue-relevant. No hype.</p>
            </div>
            <div className="flex gap-6 text-zinc-600">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-zinc-600">
            <p>&copy; 2025 SimpleSequence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
