import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { 
  Radio, 
  Bot, 
  TrendingUp,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Route,
  RefreshCw,
  Globe,
  Handshake,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { GridBeam } from "@/components/ui/grid-beam";
import aiReadyWebConversion from "@assets/Ai-Ready-Web-Conversion_1771370273472.webp";
import triageRoutingDiagram from "@assets/generated_images/intelligent_triage_routing_workflow_diagram.png";
import followUpDiagram from "@assets/generated_images/follow-up_automation_sequence_diagram.png";
import integrationRoiDiagram from "@assets/generated_images/integration_roi_dashboard_diagram.png";

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
    title: "The 24/7 AI-Presence",
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

const revenueFeatures = [
  {
    icon: Route,
    title: "Intelligent Triage & Routing",
    image: triageRoutingDiagram,
    frontDescription: "Automatically classifies every inbound touchpoint—from phone calls and texts to web forms, funnels, and social DMs—and routes urgency so humans only handle high-value conversations.",
    impact: "Every lead and call triaged before it hits your team",
    backIntro: "Simple Sequence listens first, then decides what should happen next. Every call, message, or form fill is classified and routed through rules tuned to your business.",
    backBullets: [
      "Intake from phone, SMS, web chat, GHL funnels/forms, and social DMs",
      "Detects new leads vs existing clients vs junk in real time",
      "Flags urgent issues (same-day requests, emergencies, escalations)",
      "Sends routine questions to AI and only escalates what truly needs a human",
      "Logs every interaction back into your CRM/EMR or GoHighLevel so nothing slips through"
    ],
    backOutcome: "Fewer interruptions, faster response times, therefore a calmer front desk that still captures every opportunity across all channels."
  },
  {
    icon: RefreshCw,
    title: "Follow-Up & Rebooking Engine",
    image: followUpDiagram,
    frontDescription: "Your team means well—but follow-up depends on memory and mood. No-shows vanish. Estimates expire. Old leads rot.",
    impact: "Every no-show, stale quote, and missed opportunity re-engaged automatically",
    backIntro: "Simple Sequence keeps chasing—politely, automatically, and on your behalf—until they book or say no.",
    backBullets: [
      "Multi-step SMS and email sequences for every lead stage",
      "Win-back campaigns for 'never booked' and no-show leads",
      "Automatic estimate follow-up before they go cold",
      "Personalized timing based on behavior and engagement",
      "Logs every interaction back into your CRM"
    ],
    backOutcome: "Predictable cash flow, silent churn eliminated, and revenue recovered without adding headcount."
  },
  {
    icon: Globe,
    title: "AI-Ready Web Conversion Layer",
    image: aiReadyWebConversion,
    frontDescription: "Your site looks fine—but it doesn't respond, qualify, or convert. Visitors leave without ever raising their hand.",
    impact: "Your website becomes a 24/7 sales assistant",
    backIntro: "Simple Sequence turns passive traffic into active conversations and booked appointments—even when you're offline.",
    backBullets: [
      "AI chat that qualifies and books appointments instantly",
      "Captures intent from visitors who would otherwise bounce",
      "Answers common questions without human involvement",
      "Routes complex inquiries to the right team member",
      "Works after hours when competitors are offline"
    ],
    backOutcome: "More conversions from existing traffic, paid ad ROI that actually compounds, and zero missed after-hours opportunities."
  },
  {
    icon: Handshake,
    title: "White-Glove Integration & ROI",
    image: integrationRoiDiagram,
    frontDescription: "We handle the plumbing—phones, calendars, CRM/EMR, and automation—so critical workflows run in the background, held together by your people, not duct tape.",
    impact: "Critical workflows running consistently with human oversight maintained",
    backIntro: "You don't need another disconnected tool. You need a system that reduces manual load while keeping human judgment where it matters most.",
    backBullets: [
      "Done-for-you setup across phone systems, chat widgets, GHL pipelines, calendars, and EMR/CRMs",
      "Critical workflows running consistently in the background with zero intervention",
      "Reduced manual load so your team focuses on judgment calls, not data entry",
      "Dashboards that track calls handled, leads captured, show-rate, and projected revenue",
      "System oversight preserved—humans stay in control of what matters"
    ],
    backOutcome: "A front desk you can actually measure and improve, with workflows that don't break when you step away—and real-time visibility into what's working."
  }
];

function RevenueFeatureRow({ feature, index }: { feature: typeof revenueFeatures[0]; index: number }) {
  const isReversed = index % 2 === 1;
  
  return (
    <section 
      className="w-full relative"
      data-testid={`feature-section-${index}`}
    >
      <div className={`hidden md:flex items-start gap-12 lg:gap-20 ${isReversed ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(103,232,249,0.2)",
                  "0 0 35px rgba(103,232,249,0.4)",
                  "0 0 20px rgba(103,232,249,0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <feature.icon className="w-7 h-7 text-primary" />
            </motion.div>
            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-white">
              {feature.title}
            </h3>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {feature.frontDescription}
          </p>
          
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-primary"
                animate={{ 
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 5px rgba(103,232,249,0.5)",
                    "0 0 15px rgba(103,232,249,1)",
                    "0 0 5px rgba(103,232,249,0.5)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
            </div>
            <p className="text-primary font-medium text-lg">{feature.impact}</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.backIntro}
            </p>
          </motion.div>
          
          <motion.ul 
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {feature.backBullets.map((bullet, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-2 text-sm text-slate-300"
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1, duration: 0.4 }
                  }
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div 
            className="pt-3 border-t border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm text-primary/90 font-medium leading-relaxed">
              <span className="text-primary font-semibold">Outcome:</span> {feature.backOutcome}
            </p>
          </motion.div>
        </div>
        
        <div className="flex-1 relative">
          <div className="sticky top-24">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50">
              <motion.div 
                className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.05, 0.9]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <img 
                src={feature.image} 
                alt={feature.title}
                className="relative z-10 w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="w-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative mb-5 rounded-xl overflow-hidden border border-white/10">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-auto"
            />
          </div>
          
          <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="text-lg font-display font-semibold mb-3 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4 relative z-10 text-sm">
            {feature.frontDescription}
          </p>
          
          <div className="pt-3 border-t border-white/10 relative z-10 mb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
            </div>
            <p className="text-primary font-medium text-sm">{feature.impact}</p>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 relative z-10">
            {feature.backIntro}
          </p>
          
          <ul className="space-y-2 mb-4 relative z-10">
            {feature.backBullets.map((bullet, i) => (
              <li 
                key={i} 
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          
          <div className="pt-3 border-t border-primary/20 relative z-10">
            <p className="text-sm text-primary/90 font-medium leading-relaxed">
              <span className="text-primary font-semibold">Outcome:</span> {feature.backOutcome}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function StickyFeatureCard({ feature, index }: { feature: typeof revenueFeatures[0]; index: number }) {
  const isReversed = index % 2 === 1;
  
  return (
    <div 
      className="relative py-16 lg:py-24"
      data-testid={`sticky-feature-${index}`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex gap-8 lg:gap-16 items-start ${isReversed ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 py-8">
            <div className="max-w-xl space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(103,232,249,0.2)",
                      "0 0 35px rgba(103,232,249,0.4)",
                      "0 0 20px rgba(103,232,249,0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-display font-semibold text-white">
                  {feature.title}
                </h3>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {feature.frontDescription}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="pt-4 border-t border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(103,232,249,0.5)",
                        "0 0 15px rgba(103,232,249,1)",
                        "0 0 5px rgba(103,232,249,0.5)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
                </div>
                <p className="text-primary font-medium text-lg">{feature.impact}</p>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {feature.backIntro}
              </motion.p>
              
              <ul className="space-y-2">
                {feature.backBullets.map((bullet, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-2 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-3 border-t border-primary/20"
              >
                <p className="text-sm text-primary/90 font-medium leading-relaxed">
                  <span className="text-primary font-semibold">Outcome:</span> {feature.backOutcome}
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="sticky top-32 pt-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="relative z-10 w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.4)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.04),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="w-full h-full bg-primary/[0.03] blur-[150px] rounded-full" />
        </div>
        <CircuitBeams className="opacity-20" />
      </div>
      
      <div className="hidden md:block relative z-10">
        <div className="py-20 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className="text-center max-w-5xl mx-auto px-6"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-10"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(103,232,249,0.2)",
                  "0 0 40px rgba(103,232,249,0.4)",
                  "0 0 20px rgba(103,232,249,0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Beyond Basic Automation
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight mb-8 leading-[1.05]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Not Just an AI Receptionist.
              </motion.span>
              <br />
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-[length:200%_auto]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                style={{ backgroundSize: "200% auto" }}
              >
                A Revenue-Focused System.
              </motion.span>
            </h2>
            
            <motion.p 
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Most tools just "pick up." Simple Sequence decides what to do with every interaction—whether it starts as a call, text, web form, chat, or DM—therefore maximizing booking value and protecting your front-desk time.
            </motion.p>
            
            <motion.div 
              className="mt-12 flex items-center justify-center gap-2 text-sm text-primary/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
              <span>Scroll to explore our four core capabilities</span>
            </motion.div>
          </motion.div>
        </div>
        
        {revenueFeatures.map((feature, index) => (
          <StickyFeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
      
      <div className="md:hidden py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Beyond Basic Automation
          </div>
          
          <h2 className="text-3xl font-display font-semibold tracking-tight mb-4 leading-tight">
            Not Just an AI Receptionist.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300">
              A Revenue-Focused System.
            </span>
          </h2>
          
          <p className="text-base text-muted-foreground leading-relaxed">
            Simple Sequence decides what to do with every interaction—maximizing booking value and protecting your front-desk time.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {revenueFeatures.map((feature, index) => (
            <RevenueFeatureRow key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
      {/* SECTION 6: Beyond Basic Automation */}
      <RevenueSystemSection />
      {/* SECTION 7: CTA */}
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
