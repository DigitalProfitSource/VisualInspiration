import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { 
  Radio, 
  Bot, 
  TrendingUp,
  ChevronDown,
  CheckCircle2,
  Shield,
  ArrowRight,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
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

interface Pillar {
  number: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  oldWay: string;
  newReality: string;
  summaryLine: string;
  microProof: string;
  outcomes: { title: string; desc: string }[];
  underTheHood: string[];
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "The 24/7 AI Front Door",
    tagline: "Never miss a dollar.",
    icon: Radio,
    oldWay: "Leads trickle in through your website, Google, and social. You reply hours later\u2014if at all. By the time you pick up the phone, they've already hired the competitor who answered first. You are literally paying for leads just to hand them to the guy down the street.",
    newReality: "The moment a prospect reaches out \u2014 anywhere, anytime \u2014 our AI qualifies them and books the appointment directly onto your calendar. Under 60 seconds. 24/7. No new hires needed.",
    summaryLine: "You stop losing leads you're already paying for.",
    microProof: "The average service business loses 40\u201360% of inbound leads to slow response times.",
    outcomes: [
      { title: "Always-On Coverage", desc: "24/7 intelligent response without adding headcount" },
      { title: "Every Channel Captured", desc: "Web, Voice, SMS, and Social all funnel into one system" },
      { title: "Sub-60 Second Response", desc: "Leads engaged before they click away to a competitor" },
    ],
    underTheHood: [
      "AI-ready web presence optimization for ChatGPT, Perplexity, and Google AI Overviews",
      "Machine-Readable Schema Injection: Implementing the specific code-layer (JSON-LD) that ChatGPT, Claude, and Gemini use to \u201cread\u201d and recommend local businesses",
      "Omnichannel intake consolidation \u2014 GMB, Web, SMS, Social DMs into one stream",
      "24/7 AI receptionist \u2014 qualifies intent and books appointments instantly",
      "AI voice phone answering \u2014 intelligent routing for after-hours and overflow",
    ],
  },
  {
    number: "02",
    title: "The 24/7 Sales Rep",
    tagline: "Squeeze every dollar from your pipeline.",
    icon: Bot,
    oldWay: "You send a quote, follow up once, and then get busy. No-shows ghost you. Old estimates expire. Your CRM is a graveyard of \u2018almost\u2019 deals that you've already paid to acquire, sitting dormant while your bank account stays the same.",
    newReality: "Automation takes over the moment a lead enters your system. Instant engagement. Persistent follow-up. Quote recovery. No-show chasing. The system runs every sequence until the lead books, buys, or says no \u2014 and knows exactly when to hand off to a human.",
    summaryLine: "You stop doing follow-up manually \u2014 and close more because of it.",
    microProof: "The average business leaves 30\u201340% of revenue on the table from inconsistent follow-up.",
    outcomes: [
      { title: "No Lead Left Behind", desc: "Every opportunity gets persistent, intelligent follow-up" },
      { title: "Recovered Revenue", desc: "Win back no-shows, stale quotes, and dead leads automatically" },
      { title: "Zero Admin Burden", desc: "Follow-up runs whether you're busy, on vacation, or asleep" },
    ],
    underTheHood: [
      "Instant CRM & calendar synchronization",
      "Sub-60s speed-to-lead SMS/voice engagement",
      "Automated nurture sequences for no-shows and canceled appointments",
      "Intelligent quote follow-up until they say yes, no, or not now",
      "Behavior-based re-engagement timing",
      "Expired estimate recovery campaigns",
      "Human vs. AI decision points for smart escalation",
    ],
  },
  {
    number: "03",
    title: "The Compounding Engine",
    tagline: "Turn past customers into future revenue.",
    icon: TrendingUp,
    oldWay: "You do great work, but asking for reviews feels awkward. Timing is off. Meanwhile, your CRM is full of past customers and old leads collecting dust \u2014 people who already know your name but haven't heard from you in months.",
    newReality: "Our system automatically drives 5-star reviews at the perfect post-service moment and intercepts negative feedback before it goes public. Simultaneously, targeted database reactivation campaigns turn dormant contacts into immediate cash \u2014 with zero additional ad spend.",
    summaryLine: "You stop ignoring the most profitable asset you already own \u2014 your existing customers and leads.",
    microProof: "Reactivated leads convert at 3\u20135x the rate of cold prospects and cost a fraction to close.",
    outcomes: [
      { title: "More 5-Star Reviews", desc: "Consistent asks at the right time = consistent results" },
      { title: "Immediate Cash Flow", desc: "Revenue from leads and customers you've already paid to acquire" },
      { title: "Compounding Growth", desc: "Social proof and reactivation feed new leads back into Capture" },
    ],
    underTheHood: [
      "Automated 5-star review collection triggered at optimal post-service moments",
      "Internal sentiment detection \u2014 routes unhappy clients to resolution before public posting",
      "Multi-platform review support (Google, Yelp, Facebook, industry-specific)",
      "Database reactivation campaigns targeting high-value dormant contacts",
      "Dormancy segmentation to identify who's most likely to re-engage",
      "Seasonal and lifecycle-based reactivation offers",
      "Multi-touch outreach: email, SMS, and ringless voicemail sequences",
      "Automated billing and invoice integration tied to pipeline stage",
    ],
  },
];

function UnderTheHood({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors cursor-pointer group"
        data-testid="button-under-the-hood"
      >
        <span>Under the Hood</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 mt-4 pl-1">
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-400 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoopVisual() {
  return (
    <div className="max-w-3xl mx-auto" data-testid="loop-visual">
      <div className="hidden md:block">
        <svg viewBox="0 0 800 220" fill="none" className="w-full">
          <defs>
            <filter id="loopGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="60" y="70" width="180" height="80" rx="16" fill="rgba(110,224,247,0.06)" stroke="rgba(110,224,247,0.5)" strokeWidth="1.5" />
          <text x="150" y="117" textAnchor="middle" fill="white" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">CAPTURE</text>

          <rect x="310" y="70" width="180" height="80" rx="16" fill="rgba(110,224,247,0.06)" stroke="rgba(110,224,247,0.5)" strokeWidth="1.5" />
          <text x="400" y="117" textAnchor="middle" fill="white" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">CONVERT</text>

          <rect x="560" y="70" width="180" height="80" rx="16" fill="rgba(110,224,247,0.06)" stroke="rgba(110,224,247,0.5)" strokeWidth="1.5" />
          <text x="650" y="117" textAnchor="middle" fill="white" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">COMPOUND</text>

          <line x1="240" y1="110" x2="305" y2="110" stroke="rgba(110,224,247,0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <line x1="490" y1="110" x2="555" y2="110" stroke="rgba(110,224,247,0.6)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <path d="M 740 110 Q 780 110 780 70 Q 780 20 400 20 Q 20 20 20 70 Q 20 110 60 110" stroke="rgba(110,224,247,0.35)" strokeWidth="1.5" fill="none" strokeDasharray="6 4" markerEnd="url(#arrowhead)" filter="url(#loopGlow)" />

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(110,224,247,0.7)" />
            </marker>
          </defs>

          <circle r="3" fill="rgba(110,224,247,0.8)">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 240 110 L 305 110 L 490 110 L 555 110 L 740 110 Q 780 110 780 70 Q 780 20 400 20 Q 20 20 20 70 Q 20 110 60 110 L 240 110" />
          </circle>
        </svg>
      </div>

      <div className="md:hidden flex flex-col items-center gap-4 py-6">
        {["CAPTURE", "CONVERT", "COMPOUND"].map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-48 py-4 rounded-xl border border-primary/50 bg-primary/[0.06] flex items-center justify-center">
              <span className="text-white font-display font-semibold text-sm tracking-wide">{label}</span>
            </div>
            {i < 2 && (
              <svg width="20" height="32" viewBox="0 0 20 32" className="my-1">
                <line x1="10" y1="0" x2="10" y2="28" stroke="rgba(110,224,247,0.5)" strokeWidth="1.5" />
                <polygon points="5,24 15,24 10,32" fill="rgba(110,224,247,0.7)" />
              </svg>
            )}
          </div>
        ))}
        <svg width="60" height="40" viewBox="0 0 60 40" className="mt-2">
          <path d="M 30 0 Q 30 20 10 30 Q 0 35 10 40" stroke="rgba(110,224,247,0.35)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <polygon points="6,36 14,36 10,44" fill="rgba(110,224,247,0.5)" />
        </svg>
        <span className="text-[10px] font-mono text-primary/50 uppercase tracking-widest">Loop repeats</span>
      </div>

      <p className="text-center text-slate-500 italic mt-6 text-sm">
        Every customer compounds into new leads. The loop never stops.
      </p>
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;
  const isReversed = index % 2 === 0;

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
        <motion.div
          variants={fadeIn}
          className={`lg:col-span-7 ${isReversed ? '' : 'lg:col-start-6'}`}
        >
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-xl font-mono font-bold text-primary/60">{pillar.number}</span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white">{pillar.title}</h2>
              <div className="group w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-all duration-300">
                <Icon className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
              </div>
            </div>
          </div>
          <p className="text-sm font-mono text-slate-500 mb-8">{pillar.tagline}</p>

          <div className="space-y-6 mb-8">
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-red-400/70 mb-2 block">The Old Way</span>
              <p className="text-slate-500 leading-relaxed text-sm">{pillar.oldWay}</p>
            </div>

            <div className="p-5 rounded-xl border border-primary/20 bg-primary/[0.03]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-primary mb-2 block">The New Reality</span>
              <p className="text-slate-300 leading-relaxed text-sm">{pillar.newReality}</p>
            </div>
          </div>

          <p className="text-lg font-medium text-white mb-3">{pillar.summaryLine}</p>
          <p className="text-xs font-mono text-primary/70 mb-2">{pillar.microProof}</p>

          <UnderTheHood items={pillar.underTheHood} />
        </motion.div>

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

      <div className="mt-24 border-b border-white/5" />
    </motion.div>
  );
}

const compoundTimeline = [
  { month: "Month 1", text: "The system pays for itself. Dead leads reactivate. Your calendar fills." },
  { month: "Month 3", text: "Your review count doubles. Your pipeline runs without you touching it." },
  { month: "Month 6", text: "You're getting inbound leads from AI search your competitors don't even know exists." },
  { month: "Month 12", text: "You've built a revenue engine that compounds every month. Your only regret is not starting sooner." },
];

export default function Solutions() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sequential Revenue\u2122 \u2014 Capture. Convert. Compound.",
    description: "Three interconnected pillars that transform how service businesses capture leads, convert pipeline, and compound revenue through intelligent automation.",
    itemListElement: pillars.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: p.title,
        description: p.tagline
      }
    }))
  };

  return (
    <Layout>
      <SEO
        title="Sequential Revenue\u2122 | SimpleSequence"
        description="Capture. Convert. Compound. The 3-Pillar Revenue Loop for Service Businesses. An AI-powered revenue engine that captures every lead, converts them automatically, and turns existing customers into compounding revenue."
        jsonLd={solutionsSchema}
      />
      {/* SECTION 1: Hero */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.2 } }
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              variants={fadeIn}
              className="text-sm font-mono text-primary mb-6 block uppercase tracking-widest"
            >
              THE SEQUENTIAL REVENUE&trade; SYSTEM
            </motion.span>
            <motion.h1
              variants={fadeIn}
              className="relative inline-block text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight"
            >
              <span className="relative z-10">Capture. </span>
              <span className="relative z-10 text-primary">Convert.</span>
              <span className="relative z-10"> Compound.</span>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-primary/5 blur-2xl rounded-full -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4 max-w-3xl mx-auto"
            >
              The 3-Pillar Revenue Loop for Service Businesses
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              {["Most service businesses don't have a marketing problem \u2014", "they have a flow problem.", "Leads arrive and vanish.", "Follow-ups fall through.", "Revenue leaks from gaps nobody mapped."].map((phrase, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 1 + (i * 0.2), duration: 0.5 }}
                  className={i > 1 ? "block md:inline md:ml-1 text-slate-300 font-medium" : ""}
                >
                  {phrase}{" "}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto overflow-hidden group"
            >
              <BorderBeam size={400} duration={8} delay={0} colorFrom="#93C5FD" colorTo="#67E8F9" />
              <p className="text-slate-300 leading-relaxed relative z-10">
                <span className="text-white font-medium">We install an invisible, AI-powered revenue engine</span> that captures every lead, converts them automatically, and turns your existing customers into compounding revenue &mdash; so your business grows whether you're there or not.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* SECTION 2: Loop Visual */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <LoopVisual />
          </motion.div>
        </div>
      </section>
      {/* SECTION 3: What We Install */}
      <section className="pt-16 pb-8 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="max-w-3xl mb-20"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">What We Install</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Three Pillars. <span className="text-primary">One Intelligent Loop.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              This is not a menu of disconnected services &mdash; it's a single, integrated system. Each pillar feeds the next. Capture fills your pipeline. Convert squeezes every dollar from it. Compound turns results into more results. Together, they create a revenue loop that runs whether you're there or not.
            </p>
          </motion.div>
        </div>
      </section>
      {/* SECTION 4: The 3 Pillars */}
      <section className="pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <GridBeam showCenterBeam={true} gridOpacity={0.08} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-32">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.number} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 5: The Qualifier */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
              Is This For You?
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Sequential Revenue&trade; is specifically built for established service businesses with an active flow of leads and a history of past customers. If you're doing $50K+/month and have a database of past leads gathering dust, this system will pay for itself. If you don't have lead flow yet, we can't fix your flow &mdash; but if you have leads coming in that you're too busy to chase, we're your missing piece.
            </p>
          </motion.div>
        </div>
      </section>
      {/* SECTION 6: The Guarantee */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">Our Guarantee</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
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
                We don't want your money if we haven't found yours first. Within the first 14 days of activation, we run a targeted Database Reactivation campaign on your existing contacts. If the revenue opportunity we surface doesn't cover our setup fee, you don't pay us a dime for the implementation &mdash; and you keep the lead intelligence report we generated.
              </p>
            </div>
            <p className="text-white font-medium text-center mt-4">
              You either get a self-funding system, or you get a free audit of your database. You literally cannot lose.
            </p>
          </motion.div>
        </div>
      </section>
      {/* SECTION 7: The Compound Effect */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white">
              The Compound Effect
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            <div className="space-y-10">
              {compoundTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-6 pl-1"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_15px_rgba(110,224,247,0.2)]">
                      <span className="text-xs font-mono font-bold text-primary">{item.month.split(" ")[1]}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-primary/60 uppercase tracking-widest">{item.month}</span>
                    <p className="text-slate-300 leading-relaxed mt-1">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 8: CTA */}
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
              Ready to stop <span className="text-primary">losing revenue</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Book a free Sequential Revenue&trade; audit. We'll show you exactly where your leads are falling through &mdash; and how much &ldquo;found money&rdquo; is sitting in your database.
            </p>
            <Link
              href="/assessment"
              data-testid="button-solutions-cta"
              className="inline-flex items-center justify-center gap-2 bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
            >
              Book Your Free Audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
