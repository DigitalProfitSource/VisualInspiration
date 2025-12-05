import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Search, 
  Wrench, 
  TrendingUp,
  CheckCircle2,
  Clock,
  FileCheck,
  Microscope,
  Target,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef, useEffect, useState } from "react";

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
  leftColumn: {
    title: string;
    items: string[];
  };
  rightColumn: {
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
    description: "We analyze your operational reality and map the exact sequences, bottlenecks, and AI opportunities before anything is built.",
    leftColumn: {
      title: "What We Analyze",
      items: [
        "Lead flow paths and conversion points",
        "Communication touchpoints and follow-up gaps",
        "Digital presence and authority signals",
        "Operational friction points and manual processes",
        "AI readiness and automation opportunities"
      ]
    },
    rightColumn: {
      title: "What You Receive",
      items: [
        "Operational Clarity Score with bottleneck visualization",
        "Lead leakage assessment and revenue impact",
        "Prioritized improvement roadmap",
        "30-day Quick-Win Action Plan",
        "System architecture blueprint (clarity only; no implementation)"
      ]
    },
    timeline: "5–7 business days from kickoff to full diagnostic report + clarity blueprint."
  },
  {
    number: 2,
    icon: Wrench,
    title: "Build & Deploy",
    description: "For clients who move beyond the Diagnostic, we architect and deploy the foundational operational system outlined in the blueprint.",
    leftColumn: {
      title: "Our Approach",
      items: [
        "Modular implementation in priority order",
        "Integration with existing tools (no forced replacements)",
        "Custom workflow setup aligned to your operations",
        "AI enhancements for qualifying and nurturing",
        "Staff training and clarity documentation"
      ]
    },
    rightColumn: {
      title: "Communication Cadence",
      items: [
        "Weekly progress updates",
        "Milestone reviews and approvals",
        "Direct access to development environment",
        "Testing and feedback loops",
        "Final walkthrough and handoff"
      ]
    },
    timeline: "3–6 weeks depending on package tier and system complexity."
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "We monitor performance, refine workflows, and guide your AI adoption as your business grows.",
    leftColumn: {
      title: "Included Review Cycles",
      items: [
        "Performance tracking and KPI reporting",
        "Bottleneck identification and resolution",
        "Workflow optimization based on real data",
        "Messaging and conversion refinement",
        "Priority recommendations for next improvements"
      ]
    },
    rightColumn: {
      title: "Optional Ongoing Support",
      items: [
        "Monthly performance insights",
        "Continuous A/B testing",
        "New feature and workflow refinement",
        "Strategic operations consulting",
        "Priority support for urgent issues"
      ]
    },
    timeline: "Review cycles at 30, 60, and 90 days post-launch. Ongoing optimization available as a monthly retainer."
  }
];

const principles = [
  {
    icon: Microscope,
    title: "Evidence-Based",
    description: "Every recommendation comes from forensic analysis of your operational reality — not assumptions."
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "We optimize for clarity, decisions, and revenue — not tools or feature count."
  },
  {
    icon: RefreshCw,
    title: "Adaptive",
    description: "Systems evolve with your business. Nothing locks you into rigid workflows."
  }
];

const faqs = [
  {
    question: "How long does a typical project take from start to finish?",
    answer: "The Diagnostic phase takes 5–7 business days from kickoff. Build & Deploy packages typically launch in 3–6 weeks depending on complexity. Review cycles occur at 30, 60, and 90 days post-launch, with optional ongoing support available."
  },
  {
    question: "What do I need to provide to get started?",
    answer: "Just a few essentials: view-only access to your CRM or tools, a short context questionnaire, and a 45-minute clarity session. We handle all diagnostic work, analysis, scoring, and blueprint creation."
  },
  {
    question: "Will my business operations be disrupted during implementation?",
    answer: "No. All work happens in parallel with your current workflow. No leads lost, no downtime, no system outages. We never force tool replacements unless necessary."
  },
  {
    question: "What happens if I need changes after the system is deployed?",
    answer: "We refine your system through built-in review cycles using real performance data. If you want ongoing iteration, the monthly optimization retainer includes workflow updates, messaging refinement, AI adoption guidance, continuous testing, and priority support. Your system grows with your business."
  },
  {
    question: "Do you integrate with tools I already use?",
    answer: "Yes — and it's usually preferred. Our goal is to improve your operational clarity, not force you into new software."
  },
  {
    question: "What's included in the Diagnostic vs. the Build phase?",
    answer: "Diagnostic (Clarity Only): You receive an Operational Clarity Score, lead leakage + revenue impact analysis, bottleneck map, AI-readiness assessment, 30-day Quick-Win Plan, and system architecture blueprint. No implementation happens in this phase. Build & Deploy (Implementation): We install the workflows, sequences, and intake layers defined in the blueprint and train your team."
  },
  {
    question: "How do you measure success?",
    answer: "We measure reduced manual friction, faster response and follow-up times, clearer sequences and handoffs, time saved per month, improved visibility, and conversion-linked behavior improvements. When applicable, we also measure revenue lifts (recovery rates, booking increases, etc.)."
  },
  {
    question: "What if I'm not ready for a full system?",
    answer: "Start with the Operational Diagnostic + AI-Clarity Blueprint. You'll walk away with a clear understanding of what's broken, a prioritized roadmap, your AI fit analysis, and a detailed operational architecture. You can implement internally or return when ready."
  },
  {
    question: "Do you provide training for my team?",
    answer: "Yes. Every Build package includes training, documentation, and a final walkthrough. Ongoing optimization includes continued support as needed."
  },
  {
    question: "What industries do you specialize in?",
    answer: "Service-based businesses where speed matters, follow-up drives revenue, operational clarity is the bottleneck, and AI can meaningfully reduce manual work. Home services, medspas, legal, clinics, real estate, and more."
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
          {/* Left Column */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5">{phase.leftColumn.title}</h4>
            <ul className="space-y-4">
              {phase.leftColumn.items.map((item, i) => (
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

          {/* Right Column */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5">{phase.rightColumn.title}</h4>
            <ul className="space-y-4">
              {phase.rightColumn.items.map((item, i) => (
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
            <a href="/process" className="text-sm text-white">Process</a>
            <a href="/offers" className="text-sm text-muted-foreground hover:text-white transition-colors">Offers</a>
          </nav>
          <ContactFormDialog
            source="process-header"
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
            <span className="text-sm font-mono text-primary mb-6 block">OUR METHODOLOGY</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight">
              How We <span className="text-primary">Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              A three-phase methodology that transforms operational confusion into clarity and strategic AI readiness. Zero guesswork. Maximum insight.
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
              Why This <span className="text-primary">Methodology Works</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Because we don't build generic systems. We architect solutions tailored to your operational reality.
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
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about working with us.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column FAQs */}
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.slice(0, 5).map((faq, i) => (
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
                {faqs.slice(5).map((faq, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`faq-right-${i}`}
                    className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:border-white/20 transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger 
                      className="text-left text-white hover:no-underline py-5 text-sm font-medium"
                      data-testid={`accordion-trigger-faq-${i + 5}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-slate-400 text-sm leading-relaxed pb-5"
                      data-testid={`accordion-content-faq-${i + 5}`}
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
              Ready to See <span className="text-primary">Your Path Forward</span>?
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              Start with a diagnostic to uncover exactly where operational clarity can transform your business.
            </p>
            <ContactFormDialog
              source="process-cta"
              title="Schedule a Discovery Call"
              description="Tell us about your business and we'll help you understand where operational clarity can make the biggest impact."
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

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-sm text-zinc-600 text-center bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 SimpleSequence. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
