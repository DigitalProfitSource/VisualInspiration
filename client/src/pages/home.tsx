import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Activity, Layers, Zap, Brain, ShieldCheck, Shield, LayoutTemplate, ChevronDown, Quote, RefreshCw, TrendingUp, FileText, Globe, ChevronRight, ArrowUpRight, Sparkles, Star, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TechTicker } from "@/components/ui/tech-ticker";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";

import { IndustryCarousel } from "@/components/ui/industry-carousel";
import { SEO, organizationSchema, softwareApplicationSchema } from "@/components/seo";
import { Layout } from "@/components/layout";
import aiPresenceImg from "@assets/AI-Conversion-Presence_1772546750658.webp";
import aiSalesRepImg from "@assets/24-7__AI-Sales_Rep__1772550595021.webp";
import compoundingEngineImg from "@assets/Compounding_Engine_1772552424946.webp";
import founderPhoto from "@assets/Untitled_design_1764887004065.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUpViewport = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

const compoundTimeline = [
  { month: "Month 1", text: "Database reactivation generates qualified responses. Past customers re-engage. Your calendar starts filling — helping offset your setup costs from day one." },
  { month: "Month 3", text: "Your review count climbs. Your pipeline runs without you touching it. Early maintenance costs are being offset by reactivated revenue." },
  { month: "Month 6", text: "You're getting inbound leads from AI search your competitors don't even know exists. The system compounds." },
  { month: "Month 12", text: "You've built a revenue engine that compounds every month. Your only regret is not starting sooner." },
];

const bentoCards = [
  {
    icon: Globe,
    title: "Lead Capture Architecture",
    short: "Turn every visitor, caller, and message into a captured lead — automatically, 24/7.",
    bullets: [
      "AI-Ready Web Presence optimized for ChatGPT, Perplexity & AI Overviews",
      "Omnichannel intake: web forms, GMB, SMS, social DMs — one pipeline",
      "24/7 AI receptionist with instant qualification & booking",
      "AI Voice answering for after-hours & overflow calls",
    ],
    outcome: "Every lead that touches your business gets captured and qualified — no more leads slipping through the cracks.",
  },
  {
    icon: Zap,
    title: "Automated Sales Pipeline",
    short: "Turn captured leads into booked jobs with zero manual chasing.",
    bullets: [
      "Sub-60-second speed-to-lead engagement via SMS & voice",
      "Automated quote follow-ups until they book or buy",
      "CRM & calendar sync — zero manual data entry",
      "Intelligent triage routes each lead to the right person instantly",
    ],
    outcome: "Your pipeline runs itself — leads get followed up, quotes get chased, and jobs get booked without your team lifting a finger.",
  },
  {
    icon: RefreshCw,
    title: "Persistent Follow-Up Engine",
    short: "No more leads going cold because someone forgot. Consistent follow-up that actually happens.",
    bullets: [
      "Automated nurture for no-shows, canceled jobs & stale quotes",
      "Behavior-based re-engagement timing across SMS, email & voice",
      "Database reactivation campaigns to surface dormant revenue",
      "Human + automation touchpoints aligned so nothing feels robotic",
    ],
    outcome: "Every qualified lead has a path from first contact to decision — not just a single reply that dies in someone's inbox.",
  },
  {
    icon: Star,
    title: "Reputation & Compounding Engine",
    short: "Turn completed jobs into 5-star reviews, referrals, and repeat revenue — automatically.",
    tags: ["Review Automation", "Revenue Compounding"],
    bullets: [
      "Automated 5-star review collection with negative sentiment interception",
      "Seasonal & lifecycle-based re-engagement offers",
      "Win-back campaigns for dormant customers",
      "Reputation velocity tracking that feeds back into lead capture",
    ],
    outcome: "Your best customers become your best marketing channel — compounding your results month over month.",
  },
];

const bentoMetrics = [
  {
    value: 90,
    prefix: "40–",
    suffix: "hrs/mo",
    description: "Time typically regained once lead, follow-up, and front-desk loops are clarified.",
  },
  {
    value: 82,
    suffix: "%",
    prefix: "",
    description: "Average perceived reduction in friction across lead handling and ops sequences reported by clients.",
  },
  {
    value: 3,
    suffix: "× faster",
    prefix: "",
    description: "How much faster teams gain adoption clarity and make confident system decisions once the new flow is mapped.",
  },
];

function useCountUp(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return count;
}

function BentoCard({ card, index }: { card: typeof bentoCards[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      className="relative h-full rounded-xl border border-white/[0.08] bg-zinc-900/80 overflow-hidden cursor-pointer transition-colors duration-300 hover:border-white/[0.15] shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      data-testid={`bento-card-${index}`}
    >
      <div className="relative z-10 p-7 md:p-8">
        <div className="w-10 h-10 rounded-lg border border-primary/20 bg-primary/[0.06] flex items-center justify-center mb-6">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        <h3 className="text-base md:text-lg font-display font-bold text-white mb-2" data-testid={`bento-title-${index}`}>
          {card.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          {card.short}
        </p>

        {(card as any).tags && !expanded && (
          <div className="flex flex-wrap gap-2 mt-5">
            {(card as any).tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <ul className="space-y-2.5">
              {card.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: expanded ? i * 0.08 : 0, duration: 0.3 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-medium">
              <span className="text-primary">Outcome:</span>{" "}
              <span className="text-slate-300">{card.outcome}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BentoGridSection() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  const count0 = useCountUp(bentoMetrics[0].value, 2, metricsInView);
  const count1 = useCountUp(bentoMetrics[1].value, 2.2, metricsInView);
  const count2 = useCountUp(bentoMetrics[2].value, 1.5, metricsInView);
  const counts = [count0, count1, count2];

  return (
    <section className="py-24 md:py-32 relative" data-testid="bento-grid-section">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-12 lg:p-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white leading-tight mb-6" data-testid="text-bento-headline">
              We Automate Your Entire Customer Journey Into One{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
                Flow.
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Instead of scattered tools and manual workarounds, you get a clear map of how people, systems, and AI should work together from first touch to repeat business—therefore your operations run smoother and scale without extra headcount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="md:col-span-3">
              <BentoCard card={bentoCards[0]} index={0} />
            </div>
            <div className="md:col-span-5">
              <BentoCard card={bentoCards[1]} index={1} />
            </div>
            <div className="md:col-span-5">
              <BentoCard card={bentoCards[2]} index={2} />
            </div>
            <div className="md:col-span-3">
              <BentoCard card={bentoCards[3]} index={3} />
            </div>
          </div>

          <div ref={metricsRef} className="mt-10 pt-10 border-t border-white/[0.06]">
            <div className="text-center mb-10">
              <motion.span
                className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary opacity-90"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Clarity Delivered. Efficiency Unlocked.
              </motion.span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bentoMetrics.map((metric, i) => (
                <motion.div
                  key={i}
                  className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 text-center transition-all duration-500 overflow-hidden hover:border-white/[0.12]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-testid={`bento-metric-${i}`}
                >
                  <div className="relative z-10">
                    <div className="mb-2 flex items-baseline justify-center gap-1">
                      <span className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                        {metric.prefix}{counts[i]}
                      </span>
                      <span className="text-sm md:text-base font-display font-medium text-primary">
                        {metric.suffix}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(110,224,247,0.03) 0%, transparent 70%)" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroBgY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroBgScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const circuitY = useTransform(scrollY, [0, 600], [0, 80]);
  const contentY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <Layout>
      <SEO 
        title="SimpleSequence | Practical AI for Service Businesses"
        description="AI Implementation Advisor helping service businesses adopt AI with clarity, precision, and real-world leverage. AI-powered front desk and follow-up systems."
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema, softwareApplicationSchema]
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start md:items-end pt-24 md:pt-20 md:pb-24 overflow-hidden">
        {/* Art-directed Background with Mobile/Desktop Images */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
          <motion.picture
            style={{ y: heroBgY, scale: heroBgScale }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Desktop images (768px and up) */}
            <source media="(min-width: 768px)" srcSet="/images/hero-ai-assistant.webp" type="image/webp" />
            <source media="(min-width: 768px)" srcSet="/images/hero-ai-assistant.jpg" type="image/jpeg" />
            {/* Mobile images (below 768px) */}
            <source srcSet="/images/hero-mobile.webp" type="image/webp" />
            <img 
              src="/images/hero-mobile.jpg"
              alt="AI-powered assistant connecting voice, chatbot, and scheduling" 
              className="absolute inset-0 w-full h-full object-cover object-top md:object-[70%_center]" 
              data-testid="image-hero-background"
            />
          </motion.picture>
          {/* Desktop gradient overlay - left side for text readability */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          {/* Mobile gradient overlay - top area for text readability */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
          {/* Bottom fade to background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          <motion.div style={{ y: circuitY }} className="absolute inset-0 hidden md:block">
            <CircuitBeams className="opacity-30" />
          </motion.div>
        </motion.div>

        <motion.div style={{ y: contentY }} className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-2xl mx-auto md:mx-0 text-center md:text-left"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-primary mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              Sequential Revenue™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.1] text-balance">
              Stop Losing Leads.<br />Start Compounding{" "}<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-primary/50">Revenue.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-primary/80 mb-3 md:mb-4 font-medium text-balance">AI Implementation Advisor™ — Capture. Convert. Compound.</motion.p>
            
            {/* Hide on mobile, show on desktop */}
            <motion.p variants={fadeIn} className="hidden md:block text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">We install an AI-powered system that captures every lead in under 60 seconds, closes your follow-up gaps automatically, and turns past customers into new deals — with zero additional ad spend.</motion.p>

            <motion.div variants={fadeIn} className="hidden md:flex flex-row gap-8 items-center max-w-3xl mt-20">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <Link href="/book">
                  <button 
                    data-testid="button-hero-cta"
                    className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full py-3.5 px-8 relative shadow-2xl backdrop-blur-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <p className="group-hover:text-white transition-colors duration-300 text-base font-bold text-white font-sans drop-shadow-sm whitespace-nowrap">Book Your Discovery Call</p>
                      <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
                          <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Free diagnostic. No sales pitch. Just clarity on where AI fits in your business.</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Mobile CTA removed from hero - now appears as floating button after scroll */}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>
      {/* Tech Stack Ticker */}
      <TechTicker />
      {/* Section A: Sequential Revenue Intro */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.08} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-6 block">
              THE SEQUENTIAL REVENUE™ SYSTEM
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 tracking-tight" data-testid="text-sequential-revenue-heading">
              You're getting leads. You just don't have a system to{" "}
              <span className="text-primary">make them compound.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Three pillars. One intelligent loop. Every lead captured, every dollar maximized, every customer compounding your growth.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Section B: Pillar 1 — CAPTURE */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.08} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block text-center">PILLAR 01 · CAPTURE</span>
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-cyan-400/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                  <img 
                    src={aiPresenceImg} 
                    alt="AI-Powered Capture vs Manual Process" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white font-mono text-xs tracking-widest uppercase">Pillar 01: Capture Engine</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2" data-testid="text-pillar-capture">The 24/7 AI-Presence</h3>
              <p className="text-primary font-medium mb-4">Never miss a dollar.</p>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
                Your marketing works, but your capture system is leaking. Leads reach out through your website, Google, text, and social — and get silence. By the time you reply, they've hired your competitor. We install an always-on AI layer that responds in under 60 seconds, qualifies intent, and books the appointment — 24/7, without adding staff.
              </p>

              <div className="space-y-4 mb-8">
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Instant Response</h4>
                  <p className="text-slate-500 text-sm">Every lead — web, phone, text, social — answered in under 60 seconds, automatically.</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">AI Qualification</h4>
                  <p className="text-slate-500 text-sm">24/7 chat and voice agents that qualify intent and book real appointments, not tire-kickers.</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">AI Search Visibility</h4>
                  <p className="text-slate-500 text-sm">Your business optimized for ChatGPT, Perplexity, and Google AI Overviews — not just traditional SEO.</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600">THE OUTCOME:</span>
                <p className="text-primary text-sm font-medium mt-1">A leakproof front door that captures every lead you're paying for — while you sleep.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Section C: Pillar 2 — CONVERT */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.08} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2" data-testid="text-pillar-convert">The 24/7 AI-Sales Rep</h3>
              <p className="text-primary font-medium mb-4">Squeeze every dollar from your pipeline.</p>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
                You send a quote, follow up once, and forget about it. No-shows ghost you. Old estimates expire. Thousands of dollars rot in your CRM — leads you already paid to acquire. We deploy relentless, intelligent automation that chases every opportunity until it closes, declines, or books — and knows exactly when to hand off to your team.
              </p>

              <div className="space-y-4 mb-8">
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Persistent Follow-Up</h4>
                  <p className="text-slate-500 text-sm">Automated sequences chase no-shows, recover stale quotes, and revive dead leads — without annoying anyone.</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Speed-to-Close</h4>
                  <p className="text-slate-500 text-sm">Sub-60-second engagement the moment a lead enters your system. No more "I'll get to it tomorrow."</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Smart Escalation</h4>
                  <p className="text-slate-500 text-sm">AI handles the repetitive follow-up. Humans step in at exactly the right moment to close.</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600">THE OUTCOME:</span>
                <p className="text-primary text-sm font-medium mt-1">A pipeline that works itself — converting leads you're currently ignoring into booked revenue.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block text-center">PILLAR 02 · CONVERT</span>
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-cyan-400/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                  <img 
                    src={aiSalesRepImg} 
                    alt="AI-Powered Sales Rep vs Manual Follow-Up" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white font-mono text-xs tracking-widest uppercase">Pillar 02: Sales Engine</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Section D: Pillar 3 — COMPOUND */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.08} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block text-center">PILLAR 03 · COMPOUND</span>
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-cyan-400/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                  <img 
                    src={compoundingEngineImg} 
                    alt="AI Compounding Engine vs Manual Process" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white font-mono text-xs tracking-widest uppercase">Pillar 03: Compounding Engine</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2" data-testid="text-pillar-compound">The Compounding Engine</h3>
              <p className="text-primary font-medium mb-4">Turn past customers into future revenue.</p>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
                You do great work, but you're ignoring the most profitable asset you already own — your existing customers and past leads. We install automated review collection that drives 5-star ratings at the perfect moment, intercept negative feedback before it goes public, and run database reactivation campaigns that turn dormant contacts into immediate cash — with zero additional ad spend.
              </p>

              <div className="space-y-4 mb-8">
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Automated Reviews</h4>
                  <p className="text-slate-500 text-sm">5-star review requests triggered at the perfect post-service moment. Negative sentiment intercepted before it goes public.</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">Database Reactivation</h4>
                  <p className="text-slate-500 text-sm">Targeted campaigns that mine your existing contacts for immediate cash flow — from leads you already paid for.</p>
                </div>
                <div className="border-l-2 border-primary/60 pl-4 py-2 bg-white/[0.02] rounded-r-lg">
                  <h4 className="text-white font-medium text-sm mb-1">The Loop Closes</h4>
                  <p className="text-slate-500 text-sm">Reviews attract new leads. Reactivated customers refer new business. Compound feeds back into Capture.</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600">THE OUTCOME:</span>
                <p className="text-primary text-sm font-medium mt-1">A compounding engine that makes your existing customer base and reputation work as hard as your ad budget.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Bento Grid — "We Align Your Entire Customer Journey" */}
      <BentoGridSection />
      {/* Industry Results Carousel */}
      <IndustryCarousel />
      {/* "Found Money" Guarantee */}
      <section className="py-32 relative border-y border-white/5">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-8 md:p-12 lg:p-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">Our Guarantee</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white" data-testid="text-found-money-guarantee">
              The &ldquo;Found Money&rdquo; Guarantee
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative p-8 rounded-2xl border border-primary/20 bg-primary/[0.02] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <p className="text-slate-300 leading-relaxed">
                Within your first 30 days on SimpleSequence, we run a targeted Database Reactivation campaign on your existing contacts. If we don&rsquo;t uncover enough revenue opportunities to meaningfully offset your setup and first month&rsquo;s fees, we&rsquo;ll run a second full reactivation campaign at no additional service cost.
              </p>
            </div>
            <p className="text-white font-medium text-center mt-4">
              You get a system designed to turn past customers into new cash flow &mdash; without increasing your ad spend.
            </p>
            <p className="text-xs text-slate-500 text-center mt-3">
              Guarantee applies to qualified lists and basic follow&#8209;up from your team. See how it works below.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-it-works" className="border-white/[0.06]">
                <AccordionTrigger className="text-sm font-mono text-slate-400 hover:text-white py-4">
                  How it works
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-400 leading-relaxed space-y-4 pb-6">
                  <p><span className="text-white font-medium">Your list:</span> You provide a permission&#8209;based list with a minimum of 1,000 contacts and valid email and/or mobile numbers.</p>
                  <p><span className="text-white font-medium">Our goal:</span> Use database reactivation to generate qualified responses and booked appointments that help offset your implementation and early maintenance costs.</p>
                  <p><span className="text-white font-medium">Your part:</span> You approve the offer and messaging, and your team responds to interested leads in a timely manner so opportunities can turn into revenue.</p>
                  <p><span className="text-white font-medium">If we fall short:</span> If the initial campaign does not generate a meaningful volume of qualified responses or bookings from your list, we will run a second full reactivation campaign at no additional service fee.</p>
                  <p><span className="text-white font-medium">Where our responsibility ends:</span> We create conversations and opportunities from the customers and leads you already paid to acquire. You own pricing, close rate, show rate, and fulfillment.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
          </motion.div>
        </div>
      </section>
      {/* The Compound Effect Timeline + Loop CTA */}
      <section className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.06} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.03),transparent_60%)]" />
        <style>{`
          @keyframes timeline-glow-sweep {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.8); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}</style>

        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white" data-testid="text-compound-effect">
              The Compound Effect
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-primary/5 overflow-hidden">
              <div
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/80 to-transparent"
                style={{ animation: "timeline-glow-sweep 3s ease-in-out infinite" }}
              />
            </div>

            <div className="space-y-12">
              {compoundTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30, scale: 0.9, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
                  className="flex items-start gap-6 pl-1 group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-primary/30" style={{ animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite ${i * 0.3}s` }} />
                    <motion.div
                      className="relative w-12 h-12 rounded-full bg-zinc-900 border-2 border-primary/50 flex items-center justify-center"
                      whileInView={{
                        boxShadow: [
                          "0 0 10px rgba(103,232,249,0.2)",
                          "0 0 25px rgba(103,232,249,0.5)",
                          "0 0 10px rgba(103,232,249,0.2)"
                        ]
                      }}
                      viewport={{ once: false }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <span className="text-xs font-mono font-bold text-primary">{item.month.split(" ")[1]}</span>
                    </motion.div>
                  </div>
                  <motion.div
                    className="pt-2 flex-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                  >
                    <span className="text-xs font-mono text-primary/60 uppercase tracking-widest">{item.month}</span>
                    <p className="text-slate-300 leading-relaxed mt-1 group-hover:text-white transition-colors duration-300">{item.text}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mt-16"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ animation: "shimmer 4s linear infinite" }}
              data-testid="text-loop-cta"
            >
              The loop never stops.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
              Capture fills your pipeline. Convert squeezes every dollar from it. Compound turns results into more results — and feeds new leads back into Capture. This is Sequential Revenue™.
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500" />
              <Link
                href="/book"
                data-testid="button-loop-cta"
                className="relative inline-flex items-center justify-center gap-2 bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
              >
                Book Your Discovery Call →
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">See where your revenue is leaking — in 15 minutes.</p>
          </motion.div>
        </div>
      </section>
      {/* Revenue Friction Analysis */}
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
                CHECK YOUR BLINDSPOTS
              </div>
              <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight">The Sequential Revenue™ Friction Analysis</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Revenue doesn't stall because you're not working hard enough — it stalls because of invisible flow problems. Leads go cold before you respond. Quotes disappear into silence. Past customers never come back. This analysis maps friction across your three revenue pillars — <span className="text-white font-medium">Capture, Convert, and Compound</span> — and shows you exactly where the drag is.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Your Sequential Revenue™ Score across all three pillars</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Prioritized blindspots showing where deals are slowing down</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>A next-30-day action plan you can start implementing today</span>
                </li>
              </ul>
              <Link 
                href="/assessment"
                data-testid="button-assessment-cta"
                className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] group transition-colors"
              >
                Get My 30-Day Plan
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md relative"
            >
               {/* Mockup Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-lg opacity-50" />
               <div className="relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">SEQUENTIAL REVENUE™ ANALYSIS</span>
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  
                  {/* Pillar scores */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Capture</span>
                      <span className="text-xs font-mono text-white">72/100</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-400/70 rounded-full" style={{width: '72%'}} /></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Convert</span>
                      <span className="text-xs font-mono text-white">58/100</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-400/50 rounded-full" style={{width: '58%'}} /></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Compound</span>
                      <span className="text-xs font-mono text-white">41/100</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-400/30 rounded-full" style={{width: '41%'}} /></div>
                  </div>
                  
                  {/* Sequential Revenue Score */}
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-white/5 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-xs text-zinc-400">Sequential Revenue™ Score</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-mono font-bold text-white">59</span>
                      <span className="text-2xl font-mono text-zinc-600">/100</span>
                      <TrendingUp className="w-5 h-5 text-primary ml-auto" />
                    </div>
                  </div>
                  
                  {/* Blindspots count */}
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs text-zinc-400">Blindspots Identified</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">4</div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-primary mb-4 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">Common Questions</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-1">
                  What does SimpleSequence actually do?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4">SimpleSequence helps you understand exactly how your business should operate across lead flow, follow-up, internal communication, and customer workflows — and where AI can create real leverage without adding complexity.</p>
                  <p className="mb-4">You get a clear operational map, tailored to your business, showing which processes should stay human, which can be streamlined, and which are strong candidates for AI support.</p>
                  <p className="text-primary/80 font-medium">No software pitches. No implementation traps. Just clarity.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-2">
                  How is this different from hiring a web agency?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-white">Agencies build things.</span> SimpleSequence clarifies what should be built in the first place — and why.</p>
                  <p className="mb-4">A web agency will redesign your site. An automation shop will install tools. But neither will diagnose the root operational friction or the AI opportunities unique to your workflow.</p>
                  <p>I help you avoid unnecessary spending, avoid shiny-object traps, and avoid building systems that don't align with how your business truly works.</p>
                  <p className="text-primary/80 font-medium mt-4">This is strategic architecture — not execution.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-3">
                  Do I need to replace my current tools?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-primary font-medium">Usually, no.</span></p>
                  <p className="mb-4">Most businesses don't need more tools — they need a clearer understanding of how the tools they already have should work together.</p>
                  <p className="mb-2">Part of the diagnostic includes:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Identifying where your tools are creating friction</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Uncovering gaps in handoffs or follow-up</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Showing where AI could support the workflow without replacing your systems</li>
                  </ul>
                  <p>If a replacement is genuinely necessary, you'll get a clear rationale — not a sales pitch.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-4">
                  How long until I see results?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-white">Most clients experience clarity within the first session.</span></p>
                  <p className="mb-2">The Operational Diagnostic typically reveals:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Where time is being lost</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Which workflows are causing drag</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Which AI opportunities will produce immediate leverage</li>
                  </ul>
                  <p className="mb-4">From there, businesses often see faster decisions, smoother coordination, and better follow-up rhythm within 30 days — even before implementing larger changes.</p>
                  <p className="text-primary/80 font-medium">Clarity is an accelerant.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-5">
                  What's the best way to get started?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4">Start with the free <span className="text-primary font-medium">Operational Clarity Score™</span>.</p>
                  <p className="mb-2">It gives you:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> A high-level look at your lead flow, follow-up, operations, and AI readiness</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Estimated time lost each month</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Early friction patterns</li>
                  </ul>
                  <p>If the diagnostic uncovers deeper issues, the next step is the <span className="text-white">Operational Diagnostic + AI-Clarity Blueprint</span>, which maps your architecture and identifies the highest-leverage improvements.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-32 bg-zinc-950/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-primary mb-4 block">RESULTS</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">What Business Owners Say</h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "We stopped losing leads. The system captures every inquiry, responds instantly, and the automated follow-up means nothing falls through the cracks anymore.",
                name: "Jake Martinez",
                role: "Roofing Company Owner",
                initials: "JM"
              },
              {
                quote: "Our operations finally work together. Everything is connected — website, CRM, follow-up. We're converting more with less effort.",
                name: "Sarah Chen",
                role: "MedSpa Director",
                initials: "SC"
              },
              {
                quote: "The optimization work is ongoing and measurable. Every month we see improvements in how leads are qualified and moved through our intake process.",
                name: "David Walsh",
                role: "Managing Partner, Law Firm",
                initials: "DW"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-primary" />
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 italic relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Why SimpleSequence + Founder - Combined */}
      <section id="about" className="py-32 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Why Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
                Why SimpleSequence?
              </h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  In a world full of AI hype, tool-chasing, and unrealistic promises, we offer something different: <span className="text-white">operational intelligence grounded in real-world constraints</span>.
                </p>
                <p>
                  We understand service businesses from the inside. We don't just "add AI" — we fix the <span className="text-primary">operational behavior</span> that makes AI effective.
                </p>
              </div>
            </div>

            {/* Right - Founder Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0 shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]">
                  <img 
                    src={founderPhoto} 
                    alt="The Founder" 
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">The Founder</h3>
                  <p className="text-sm font-mono text-primary uppercase tracking-widest">AI Implementation Advisor™</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                AI Implementation Advisor™ with a background in operations, performance, and AI adoption.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Calm
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Analytical
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Systems-Driven
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
