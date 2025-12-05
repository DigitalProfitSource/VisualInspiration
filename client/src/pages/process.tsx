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
import { Footer } from "@/components/footer";
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
    description: "Before we fix anything, we find out what's actually broken. We map your workflows, identify where leads slip away, and uncover the friction your team feels every day.",
    leftColumn: {
      title: "What We Analyze",
      items: [
        "Where leads come in and where they disappear",
        "Follow-up gaps that cost you business",
        "Manual processes draining your team's time",
        "Friction points you feel but can't quite name",
        "Where AI could help — and where it can't"
      ]
    },
    rightColumn: {
      title: "What You Receive",
      items: [
        "Operational Clarity Score showing exactly where you're stuck",
        "Lead leakage report with real revenue impact",
        "Prioritized roadmap of what to fix first",
        "30-day Quick-Win Action Plan to see fast results",
        "System architecture blueprint for long-term clarity"
      ]
    },
    timeline: "5–7 business days from kickoff to final diagnostic report + clarity blueprint."
  },
  {
    number: 2,
    icon: Wrench,
    title: "Build & Deploy",
    description: "Once you have clarity, we build. We deploy the systems you need — integrated with what you already use — so your team can finally stop firefighting and start executing.",
    leftColumn: {
      title: "Our Approach",
      items: [
        "We build in priority order — quick wins first",
        "Works with your existing tools (no forced replacements)",
        "Custom workflows that match how you actually operate",
        "AI that qualifies and nurtures for you",
        "Training so your team feels confident, not confused"
      ]
    },
    rightColumn: {
      title: "Communication Cadence",
      items: [
        "Weekly updates so you always know what's happening",
        "Milestone reviews for your input and approval",
        "Direct access so you can see progress in real time",
        "Testing loops to catch issues before go-live",
        "Full walkthrough and handoff when we're done"
      ]
    },
    timeline: "3–6 weeks depending on package tier and system complexity."
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "Your business evolves — your systems should too. We monitor what's working, fix what isn't, and help you scale without adding more chaos.",
    leftColumn: {
      title: "Included Review Cycles",
      items: [
        "Performance tracking so you see what's improving",
        "Bottleneck fixes as new friction points emerge",
        "Workflow tuning based on real usage data",
        "Conversion improvements as you learn more",
        "Recommendations for what to tackle next"
      ]
    },
    rightColumn: {
      title: "Optional Ongoing Support",
      items: [
        "Monthly insights so you stay ahead",
        "A/B testing to continuously improve",
        "New workflows as your business grows",
        "Strategic consulting when you need guidance",
        "Priority support when something breaks"
      ]
    },
    timeline: "Review cycles at 30, 60, and 90 days post-launch. Ongoing optimization available as a monthly retainer."
  }
];

const principles = [
  {
    icon: Microscope,
    title: "Evidence-Based",
    description: "We don't guess — we diagnose. Every recommendation comes from looking at your actual data and workflows."
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "We're not here to sell you tools. We're here to help you make decisions that move the needle."
  },
  {
    icon: RefreshCw,
    title: "Adaptive",
    description: "Your business changes. Your systems should too. Nothing we build locks you into rigid workflows."
  }
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Diagnostic: 5–7 business days to get your clarity report. Build: 3–6 weeks to deploy. Many clients see quick wins within the first 30 days."
  },
  {
    question: "What do I need to provide to get started?",
    answer: "Just a short questionnaire, view-only access to your tools, and one clarity session. We handle the rest."
  },
  {
    question: "Will this disrupt my day-to-day operations?",
    answer: "No. Everything happens alongside your current workflow. No downtime, no chaos."
  },
  {
    question: "What if I need changes after the system is live?",
    answer: "That's expected. You get built-in review cycles at 30, 60, and 90 days — plus optional ongoing support."
  },
  {
    question: "Do I have to replace the tools I'm already using?",
    answer: "Almost never. We work with what you have — unless something truly can't support the architecture."
  },
  {
    question: "What's the difference between Diagnostic and Build?",
    answer: "Diagnostic gives you clarity on what's broken and what to do. Build actually deploys the fix."
  },
  {
    question: "How do you measure success?",
    answer: "Less friction, faster response times, smoother handoffs, and measurable improvements in conversion and follow-up."
  },
  {
    question: "What if I'm not ready for a full build?",
    answer: "Start with just the Diagnostic + Blueprint. You can implement it yourself or come back when you're ready."
  },
  {
    question: "Will my team be trained on the new systems?",
    answer: "Yes. Every Build engagement includes training and documentation so your team feels confident."
  },
  {
    question: "What kinds of businesses do you work with?",
    answer: "Any service business where speed, follow-up, and operational clarity make the difference between winning and losing."
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
              You're tired of guessing. We're here to give you the clarity you need — a structured process that shows exactly where your operations break down and how to fix them.
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
              Because we focus on what matters: understanding your reality, fixing what's broken, and building systems that grow with you.
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
              Honest answers to the questions business owners ask before getting started.
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
      <Footer />
    </div>
  );
}
