import { motion, useInView } from "framer-motion";
import { 
  Search, 
  Wrench, 
  TrendingUp,
  CheckCircle2,
  Clock,
  Microscope,
  Target,
  RefreshCw,
  ArrowRight,
  Zap,
  Bot,
  Database,
  Cog,
  MessageSquare,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";
import { SEO, createFAQSchema } from "@/components/seo";
import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef } from "react";
import { Link } from "wouter";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

interface Phase {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  whatHappens: {
    title: string;
    items: string[];
  };
  whatYouExperience: {
    title: string;
    items: string[];
  };
  timeline: string;
}

const phases: Phase[] = [
  {
    number: 1,
    icon: Search,
    title: "Diagnostic & Audit",
    description: "Before we fix anything, we find out what's actually broken. We map how leads move through your business today, identify where they slip away, and uncover the friction your team feels but can't quite name.",
    whatHappens: {
      title: "What Happens",
      items: [
        "You complete a short questionnaire about your current systems",
        "We get view-only access to your tools (CRM, forms, calendar)",
        "One 60-minute clarity session with you and/or your team",
        "We analyze your lead flow, response times, and follow-up patterns",
        "We identify which of the Six Pillars need attention first"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Minimal disruption — about 2 hours of your time total",
        "No judgment — we're here to help, not criticize",
        "Clear communication throughout the process",
        "A diagnostic report you can actually understand",
        "A prioritized roadmap with quick wins identified"
      ]
    },
    timeline: "5–7 business days from kickoff to final diagnostic report."
  },
  {
    number: 2,
    icon: Wrench,
    title: "Build & Deploy",
    description: "Once you have clarity, we build. We turn the diagnostic findings into working systems — installing the Six Pillars that matter most for your business, integrated with what you already use.",
    whatHappens: {
      title: "What Happens",
      items: [
        "We build in priority order — quick wins first, then bigger systems",
        "Your existing tools stay in place (no forced platform swaps)",
        "We configure and connect your Six Pillar systems",
        "Custom workflows that match how your team actually operates",
        "Training sessions so your team feels confident, not confused"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Weekly updates — you always know what's happening",
        "Milestone reviews where you provide input and approval",
        "Direct access to progress (nothing feels like a black box)",
        "Testing before go-live so we catch issues early",
        "Full walkthrough with recordings and documentation at handoff"
      ]
    },
    timeline: "3–6 weeks depending on which pillars you're implementing."
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "Your business evolves — your systems should too. After launch, we monitor what's working, tune what isn't, and help you scale the results without adding chaos or headcount.",
    whatHappens: {
      title: "What Happens",
      items: [
        "Built-in review cycles at 30, 60, and 90 days post-launch",
        "Performance tracking against your baseline metrics",
        "Bottleneck fixes as new friction points emerge",
        "Workflow tuning based on real usage data",
        "Recommendations for what to tackle next, in order of impact"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Confidence that someone is watching the metrics for you",
        "Quick responses when something needs adjustment",
        "Clear reports showing what's improved (and what's next)",
        "Optional ongoing support if you want a long-term partner",
        "No surprises — proactive communication about any issues"
      ]
    },
    timeline: "Review cycles included. Ongoing optimization available as a monthly retainer."
  }
];

const sixPillars = [
  { icon: Zap, name: "Speed-to-Lead", desc: "Instant response systems" },
  { icon: Bot, name: "AI Web Conversion", desc: "24/7 chat qualification" },
  { icon: Database, name: "Database Reactivation", desc: "Mine dormant leads" },
  { icon: Cog, name: "Ops Automation", desc: "Eliminate manual busywork" },
  { icon: MessageSquare, name: "Follow-Up Engine", desc: "Relentless nurture sequences" },
  { icon: Star, name: "Reputation Flywheel", desc: "Automated review generation" },
];

const principles = [
  {
    icon: Microscope,
    title: "Evidence-Based",
    description: "We don't guess — we diagnose. Every recommendation comes from your actual data, conversations, and workflows. You're not betting your operations on theory."
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "We're not here to sell you tools. We're here to deliver results: more appointments, faster response times, and fewer leaks in your revenue paths."
  },
  {
    icon: RefreshCw,
    title: "Adaptive",
    description: "Your business changes. Your systems should too. Nothing we build locks you into rigid workflows — we design for iteration so you can evolve without starting over."
  }
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Diagnostic: 5–7 business days. Build: 3–6 weeks. Many clients see quick wins within the first 30 days of implementation."
  },
  {
    question: "What do I need to provide to get started?",
    answer: "A short questionnaire, view-only access to your tools, and one 60-minute clarity session. We handle everything else."
  },
  {
    question: "Will this disrupt my day-to-day operations?",
    answer: "No. Everything happens alongside your current workflow. No downtime, no chaos. About 2 hours of your time for the diagnostic phase."
  },
  {
    question: "What if I need changes after the system is live?",
    answer: "That's expected. You get built-in review cycles at 30, 60, and 90 days — plus optional ongoing support."
  },
  {
    question: "Do I have to replace the tools I'm already using?",
    answer: "Almost never. We work with what you have — unless something truly can't support the systems we're building."
  },
  {
    question: "What if I'm not ready for a full build?",
    answer: "Start with just the Diagnostic. You'll get a clear roadmap you can implement yourself or bring us back when you're ready."
  },
  {
    question: "How do you measure success?",
    answer: "Faster response times, higher contact rates, better follow-up consistency, and measurable improvements in conversions and revenue."
  },
  {
    question: "Will my team be trained on the new systems?",
    answer: "Yes. Every Build engagement includes training sessions, documentation, and recordings so your team feels confident."
  }
];

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative"
      data-testid={`card-phase-${phase.number}`}
    >
      <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm">
        {/* Phase Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 hover:scale-105 hover:border-primary/50 transition-all duration-300">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20 mb-3">
              Phase {phase.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
              {phase.title}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {phase.description}
            </p>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Left Column - What Happens */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5">{phase.whatHappens.title}</h4>
            <ul className="space-y-4">
              {phase.whatHappens.items.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Column - What You Experience */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5">{phase.whatYouExperience.title}</h4>
            <ul className="space-y-4">
              {phase.whatYouExperience.items.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
          data-testid={`timeline-phase-${phase.number}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-white">Timeline</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{phase.timeline}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const faqSchema = createFAQSchema(faqs);

  return (
    <Layout>
      <SEO 
        title="Our Process - How We Work With You | SimpleSequence"
        description="Three-phase client journey: Diagnostic & Audit, Build & Deploy, and Optimize & Scale. Clear timelines, transparent communication, and no surprises."
        jsonLd={faqSchema}
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
            <span className="text-sm font-mono text-primary mb-6 block">YOUR JOURNEY</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight">
              How We <span className="text-primary">Work With You</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              A structured process designed around your experience — not ours. Clear phases, honest timelines, and no surprises along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase Cards */}
      <section className="py-16 relative">
        <GridBeam showCenterBeam={false} gridOpacity={0.15} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-12 max-w-5xl mx-auto">
            {phases.map((phase, index) => (
              <PhaseCard key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Six Pillars Reference */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center mb-12"
          >
            <span className="text-sm font-mono text-primary mb-4 block">WHAT WE INSTALL</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              The <span className="text-primary">Six Pillars</span> We Deploy
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              During the Build phase, we install the systems that matter most for your business. Each pillar is designed to work together as a unified operating engine.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10">
            {sixPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{pillar.name}</h4>
                  <p className="text-xs text-slate-500">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/solutions">
              <Button 
                variant="outline" 
                className="rounded-full border-white/20 hover:border-primary/50 hover:bg-primary/5"
                data-testid="link-view-solutions"
              >
                Explore the Six Pillars in Detail
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Methodology Works */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">
              Why Clients <span className="text-primary">Trust This Process</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Because we focus on what actually matters: understanding your reality, fixing what's broken, and building systems that grow with you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {principles.map((principle, i) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{principle.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">
              Common <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Honest answers about what to expect when you work with us.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column FAQs */}
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.slice(0, 4).map((faq, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`faq-left-${i}`}
                    className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:border-white/20 transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger 
                      className="text-left text-white hover:no-underline py-5 text-sm font-medium"
                      data-testid={`accordion-trigger-faq-${i}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-slate-400 text-sm leading-relaxed pb-5"
                      data-testid={`accordion-content-faq-${i}`}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Right Column FAQs */}
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.slice(4).map((faq, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`faq-right-${i}`}
                    className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:border-white/20 transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger 
                      className="text-left text-white hover:no-underline py-5 text-sm font-medium"
                      data-testid={`accordion-trigger-faq-${i + 4}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-slate-400 text-sm leading-relaxed pb-5"
                      data-testid={`accordion-content-faq-${i + 4}`}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium mb-10">
              Ready to <span className="text-primary">Get Started</span>?
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              It starts with a conversation. Tell us about your business and we'll show you what's possible.
            </p>
            <ContactFormDialog
              source="process-cta"
              title="Start Your Journey"
              description="Tell us about your business and we'll help you understand where to begin."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]"
                  data-testid="button-process-cta"
                >
                  Schedule a Discovery Call
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
