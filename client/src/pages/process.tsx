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
  Brain,
  Cpu,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    description: "Before we build anything, we find out what's actually costing you money. We run our Sequential Revenue\u2122 Friction Analysis across Capture, Conversion, and Compounding to pinpoint where leads are slipping away.",
    whatHappens: {
      title: "What Happens",
      items: [
        "You complete the Sequential Revenue\u2122 Friction Analysis",
        "We map your lead flow across the Capture \u2192 Convert \u2192 Compound loop",
        "One 60-minute clarity session with you and/or your team",
        "We analyze response times, follow-up gaps, and pipeline leaks",
        "We identify which tier (AI Brain, AI System, or AI Infrastructure) fits your situation"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Minimal disruption \u2014 about 2 hours of your time total",
        "No judgment \u2014 we\u2019re here to help, not criticize",
        "Clear communication throughout the process",
        "A friction report showing exactly where revenue is leaking",
        "A recommendation for which tier addresses your biggest gaps"
      ]
    },
    timeline: "3\u20135 business days from kickoff to diagnostic report."
  },
  {
    number: 2,
    icon: Wrench,
    title: "Build & Deploy",
    description: "Once we know where the gaps are, we build your AI infrastructure. Whether it\u2019s an AI Brain for speed-to-lead, an AI System for pipeline recovery, or the full AI Infrastructure \u2014 we set it up, connect it to your tools, and get it live.",
    whatHappens: {
      title: "What Happens",
      items: [
        "We build the tier you selected \u2014 AI Brain, AI System, or AI Infrastructure",
        "Your existing tools stay in place (no forced platform swaps)",
        "We configure chatbot, voice, SMS, nurture sequences, and/or ASO based on your tier",
        "Custom workflows that match how your team actually operates",
        "Training sessions so your team feels confident, not confused"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Regular updates \u2014 you always know what\u2019s happening",
        "Milestone reviews where you provide input and approval",
        "Direct access to progress (nothing feels like a black box)",
        "Testing before go-live so we catch issues early",
        "Full walkthrough with recordings and documentation at handoff"
      ]
    },
    timeline: "Most setups go live within 1\u20132 weeks."
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "Your business evolves \u2014 your AI systems should too. After launch, we monitor what\u2019s working, tune what isn\u2019t, and help you scale the results without adding chaos or headcount.",
    whatHappens: {
      title: "What Happens",
      items: [
        "Built-in review cycles at 30, 60, and 90 days post-launch",
        "Performance tracking: speed-to-lead, recovery rate, AI visibility \u2014 based on your tier",
        "Bottleneck fixes as new friction points emerge",
        "Workflow tuning based on real usage data",
        "Recommendations for when it makes sense to upgrade to the next tier"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Confidence that someone is watching the metrics for you",
        "Quick responses when something needs adjustment",
        "Clear reports showing what\u2019s improved (and what\u2019s next)",
        "Ongoing support included with your retainer",
        "No surprises \u2014 proactive communication about any issues"
      ]
    },
    timeline: "Review cycles included with every tier. Optimization is continuous, not a one-time event."
  }
];

const tierCards = [
  { icon: Brain, name: "Blueprint", tier: "Capture — 24/7 AI Front Door", desc: "Chatbot, Voice, SMS — every lead answered in <60s" },
  { icon: Cpu, name: "Growth Architecture", tier: "Capture + Convert + Compound", desc: "Recovery, Triage, 90-Day Nurture, Reviews — pipeline on autopilot" },
  { icon: Globe, name: "Operating System", tier: "Complete Sequential Revenue™ Loop", desc: "AI Search Visibility, DBR Campaign, Full Reputation Engine" },
];

const principles = [
  {
    icon: Microscope,
    title: "Evidence-Based",
    description: "We don\u2019t guess \u2014 we diagnose. Every recommendation comes from your actual data, conversations, and workflows. You\u2019re not betting your operations on theory."
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "We\u2019re not here to sell you tools. We\u2019re here to deliver results: more appointments, faster response times, and fewer leaks in your revenue loop."
  },
  {
    icon: RefreshCw,
    title: "Adaptive",
    description: "Your business changes. Your systems should too. Nothing we build locks you into rigid workflows \u2014 we design for iteration so you can evolve without starting over."
  }
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Setup takes 1\u20132 weeks depending on your tier. Most clients see impact within the first 30 days \u2014 fewer missed calls, faster responses, and leads that stop falling through the cracks."
  },
  {
    question: "What do I need to provide to get started?",
    answer: "Complete the Sequential Revenue\u2122 Friction Analysis, give us view-only access to your tools, and join one 60-minute clarity session. We handle everything else."
  },
  {
    question: "Will this disrupt my day-to-day operations?",
    answer: "No. Everything happens alongside your current workflow. No downtime, no chaos. About 2 hours of your time for the diagnostic phase."
  },
  {
    question: "What if I need changes after the system is live?",
    answer: "That\u2019s expected. You get built-in review cycles at 30, 60, and 90 days \u2014 and ongoing optimization is included with your retainer."
  },
  {
    question: "Do I have to replace the tools I\u2019m already using?",
    answer: "Almost never. We work with what you have \u2014 unless something truly can\u2019t support the systems we\u2019re building."
  },
  {
    question: "What if I\u2019m not ready for a full build?",
    answer: "Start with Blueprint at $150/mo — it covers the capture essentials (chatbot, voice, SMS). You can upgrade to Growth Architecture or Operating System anytime."
  },
  {
    question: "How do you measure success?",
    answer: "Faster response times, higher contact rates, better follow-up consistency, and measurable improvements in conversions and revenue."
  },
  {
    question: "Will my team be trained on the new systems?",
    answer: "Yes. Every setup includes training sessions, documentation, and recordings so your team feels confident."
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

        <div className="grid md:grid-cols-2 gap-10 mb-10">
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
        description="Three-phase client journey: Diagnostic & Audit, Build & Deploy, and Optimize & Scale. From friction analysis to live AI infrastructure in 1-2 weeks."
        jsonLd={faqSchema}
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
            <span className="text-sm font-mono text-primary mb-6 block">YOUR JOURNEY</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight">
              How We <span className="text-primary">Work With You</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              A structured process designed around your experience &mdash; not ours. Clear phases, honest timelines, and no surprises along the way.
            </p>
          </motion.div>
        </div>
      </section>

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

      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center mb-12"
          >
            <span className="text-sm font-mono text-primary mb-4 block">WHAT WE BUILD</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              Three Tiers of <span className="text-primary">AI Infrastructure</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              During the Build phase, we deploy the tier that matches your biggest revenue gaps. Each tier builds on the one before it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {tierCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{card.name}</h4>
                  <p className="text-xs font-mono text-primary mb-2">{card.tier}</p>
                  <p className="text-sm text-slate-400">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/offers">
              <Button 
                variant="outline" 
                className="rounded-full border-white/20 hover:border-primary/50 hover:bg-primary/5"
                data-testid="link-view-offers"
              >
                See Pricing & Tiers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
              Run the free Sequential Revenue&trade; Friction Analysis and see exactly where your leads are falling through the cracks.
            </p>
            <Link href="/assessment">
              <Button 
                size="lg"
                className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]"
                data-testid="button-process-cta"
              >
                Take the Free Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
