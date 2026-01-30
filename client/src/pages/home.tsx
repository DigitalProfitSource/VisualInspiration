import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate, ChevronDown, Snail, TriangleAlert, Unplug, FlagOff, CloudOff, Frown, Stethoscope, Map, Target, Blocks, Quote, MessageSquareQuote, Route, RefreshCw, BookOpen, Handshake, Database, TrendingUp, Star, FileText, Globe, Cog, Clock, Skull, CircleOff, ThumbsDown, MousePointerClick, Flame, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { TechTicker } from "@/components/ui/tech-ticker";
import { GridBeam } from "@/components/ui/grid-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { AnimatedMetric } from "@/components/ui/slot-counter";
import { IndustryCarousel } from "@/components/ui/industry-carousel";
import { SEO, organizationSchema, softwareApplicationSchema } from "@/components/seo";
import { Layout } from "@/components/layout";
import founderPhoto from "@assets/Untitled_design_1764887004065.png";
import triageRoutingDiagram from "@assets/generated_images/intelligent_triage_routing_workflow_diagram.png";
import followUpDiagram from "@assets/generated_images/follow-up_automation_sequence_diagram.png";
import educationFaqDiagram from "@assets/generated_images/education_faq_knowledge_base_diagram.png";
import integrationRoiDiagram from "@assets/generated_images/integration_roi_dashboard_diagram.png";

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
    image: educationFaqDiagram,
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
      {/* Desktop: Sticky scroll layout with progressive reveal */}
      <div className={`hidden md:flex items-start gap-12 lg:gap-20 ${isReversed ? 'flex-row-reverse' : ''}`}>
        {/* Text Content Column - scrolls with progressive reveal */}
        <div className="flex-1 space-y-6">
          {/* Stage 1: Header - Always visible first */}
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
          
          {/* Stage 2: Front Description - visible early */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {feature.frontDescription}
          </p>
          
          {/* Stage 3: Impact - visible early */}
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
          
          {/* Stage 4: Back Intro - reveals on scroll */}
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
          
          {/* Stage 5: Bullet List - each bullet reveals progressively */}
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
          
          {/* Stage 6: Outcome - reveals last */}
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
        
        {/* Image Column - sticky */}
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
      
      {/* Mobile: Simple vertical stack - no sticky, all content visible */}
      <div className="md:hidden">
        <div className="w-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Image */}
          <div className="relative mb-5 rounded-xl overflow-hidden border border-white/10">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Icon */}
          <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          
          {/* Title & Front Description */}
          <h3 className="text-lg font-display font-semibold mb-3 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4 relative z-10 text-sm">
            {feature.frontDescription}
          </p>
          
          {/* Impact Metric */}
          <div className="pt-3 border-t border-white/10 relative z-10 mb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
            </div>
            <p className="text-primary font-medium text-sm">{feature.impact}</p>
          </div>
          
          {/* Back Intro */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 relative z-10">
            {feature.backIntro}
          </p>
          
          {/* Bullet Points */}
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
          
          {/* Outcome */}
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

interface JourneyCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  frontDescription: string;
  backIntro: string;
  backBullets: string[];
  backOutcome: string;
  index: number;
  tags?: string[];
}

function JourneyCard({ icon: Icon, title, frontDescription, backIntro, backBullets, backOutcome, index, tags }: JourneyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop: Curtain Reveal */}
      <div className="hidden md:block relative min-h-[280px] rounded-2xl overflow-hidden">
        {/* Back Content (revealed on hover) */}
        <div className="absolute inset-0 p-8 rounded-2xl border border-white/10 bg-zinc-900/95">
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -15 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white">{title}</h4>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground text-sm leading-relaxed mb-4"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -15 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {backIntro}
            </motion.p>
            
            <ul className="space-y-2 mb-4">
              {backBullets.map((bullet, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-2 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.06 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="pt-3 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <p className="text-sm text-primary/90 font-medium leading-relaxed">
                <span className="text-primary font-semibold">Outcome:</span> {backOutcome}
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Front Content (curtain that slides away) */}
        <motion.div 
          className="absolute inset-0 p-8 rounded-2xl border border-white/10 bg-zinc-900/80 overflow-hidden"
          initial={false}
          animate={{ 
            x: isHovered ? "102%" : "0%",
            opacity: isHovered ? 0.95 : 1
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-display font-medium mb-3 text-white">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">{frontDescription}</p>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 text-xs font-medium text-slate-300 border border-white/10 rounded-full bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Mobile: Simple card (no hover, just front content) */}
      <div className="md:hidden p-8 rounded-2xl border border-white/10 bg-zinc-900/80 min-h-[240px]">
        <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-display font-medium mb-3 text-white">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{frontDescription}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-medium text-slate-300 border border-white/10 rounded-full bg-white/5">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
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
          {/* Text Column - scrolls naturally, content always visible */}
          <div className="flex-1 py-8">
            <div className="max-w-xl space-y-6">
              {/* Title */}
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
              
              {/* Front Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {feature.frontDescription}
              </motion.p>
              
              {/* Impact */}
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
              
              {/* Back Intro */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {feature.backIntro}
              </motion.p>
              
              {/* Bullet Points */}
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
              
              {/* Outcome */}
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
          
          {/* Image Column - STICKY: stays fixed while text scrolls */}
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
      {/* Background Effects */}
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
      
      {/* Desktop: Section Header + Sticky Feature Cards */}
      <div className="hidden md:block relative z-10">
        {/* Section Header */}
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
        
        {/* Sticky Feature Cards - Each with its own sticky section */}
        {revenueFeatures.map((feature, index) => (
          <StickyFeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
      
      {/* Mobile: Simple stacked layout without scroll effects */}
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

const consolidatedCardsData = [
  {
    id: "growth-engine",
    theme: "Speed, Acquisition, & Cash Flow",
    headline: "Stop Losing Leads to Speed and Silence",
    subhead: "Your marketing works, but your capture system is leaking. We install an \"Always-On\" sales layer that engages every opportunity instantly.",
    capabilities: [
      {
        title: "Speed-to-Lead Capture",
        description: "Instant SMS/Voice response in <60 seconds. No lead goes cold."
      },
      {
        title: "AI Web Conversion",
        description: "24/7 chat agents that qualify visitors and book appointments while you sleep."
      },
      {
        title: "Database Mining",
        description: "Automatically re-engages past lists to generate immediate cash flow."
      }
    ],
    outcome: "Maximum ROI on every ad dollar and a calendar full of qualified appointments—zero manual effort required.",
    imageWebp: "/images/automated-growth-engine.webp",
    imageJpg: "/images/automated-growth-engine.jpg",
    imageAlt: "Automated growth engine capturing leads and converting opportunities"
  },
  {
    id: "operational-ecosystem",
    theme: "Efficiency, Retention, & Stability",
    headline: "Scale Your Operations, Not Your Headcount",
    subhead: "Eliminate the manual busywork and \"human bottlenecks\" that cause burnout. We build the backend infrastructure that runs your business on autopilot.",
    capabilities: [
      {
        title: "Ops & Workflow Automation",
        description: "Connects your CRM and tools to eliminate data entry and admin chaos."
      },
      {
        title: "The Follow-Up Engine",
        description: "Relentlessly chases no-shows and stale quotes until they convert."
      },
      {
        title: "Reputation Flywheel",
        description: "Automates review requests and intercepts negative feedback to bulletproof your brand."
      }
    ],
    outcome: "A business that runs smoothly whether your team is at full capacity or on vacation. Reclaim your time and sanity.",
    imageWebp: "/images/operational-ecosystem.webp",
    imageJpg: "/images/operational-ecosystem.jpg",
    imageAlt: "Operational ecosystem automating backend processes and workflows"
  }
];

function ConsolidatedCard({ card, index }: { card: typeof consolidatedCardsData[0]; index: number }) {
  const isFirstCard = index === 0;
  
  const textReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" } as const
  };
  
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center py-20 md:py-28`}
      data-testid={`card-consolidated-${card.id}`}
    >
      <div className={`space-y-6 ${isFirstCard ? "md:order-2" : ""}`}>
        <motion.div 
          {...textReveal}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <span className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-3 block">
            {card.theme}
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-[#f8fcfc] mb-4">
            {card.headline}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {card.subhead}
          </p>
        </motion.div>
        
        <motion.div
          {...textReveal}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Core Capabilities</span>
          </div>
        </motion.div>
        
        <div className="space-y-4">
          {card.capabilities.map((capability, capIndex) => (
            <motion.div 
              key={capIndex}
              {...textReveal}
              transition={{ duration: 0.4, delay: 0.2 + capIndex * 0.1 }}
              className="rounded-xl border-l-2 border-l-primary/40 border border-white/10 bg-zinc-800/50 p-4"
            >
              <h4 className="text-primary font-medium mb-1">{capability.title}</h4>
              <p className="text-muted-foreground text-sm">{capability.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          {...textReveal}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="pt-4 border-l-2 border-primary/30 pl-4"
        >
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">The Outcome:</span>
          <p className="text-primary leading-relaxed font-medium">
            {card.outcome}
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        {...textReveal}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`relative ${isFirstCard ? "md:order-1" : ""}`}
      >
        <div className="rounded-2xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/10 bg-zinc-900/50">
          <picture>
            <source srcSet={card.imageWebp} type="image/webp" />
            <img
              src={card.imageJpg}
              alt={card.imageAlt}
              width="960"
              height="1200"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
              data-testid={`image-consolidated-${card.id}`}
            />
          </picture>
        </div>
      </motion.div>
    </div>
  );
}

function PainReliefNarrativeSection() {
  return (
    <section className="relative border-t border-white/5 bg-zinc-950/30">
      <GridBeam showCenterBeam={false} gridOpacity={0.15} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={fadeInUpViewport.initial}
          whileInView={fadeInUpViewport.whileInView}
          viewport={{ once: true }}
          transition={fadeInUpViewport.transition}
          className="text-center max-w-3xl mx-auto pt-20 pb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-[#f8fcfc]">
            What's really costing you time, revenue, and sanity
          </h2>
          <p className="text-muted-foreground text-lg">
            These aren't isolated problems. They're what happens when core operational systems are missing.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto divide-y divide-white/5">
          {consolidatedCardsData.map((card, index) => (
            <ConsolidatedCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainReliefTabs() {
  return <PainReliefNarrativeSection />;
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
        description="Operational AI Advisor helping service businesses adopt AI with clarity, precision, and real-world leverage. AI-powered front desk and follow-up systems."
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema, softwareApplicationSchema]
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start md:items-center pt-24 md:pt-20 overflow-hidden">
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
              Operational AI Advisor™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.1] text-balance">
              Practical AI for <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">Service Businesses</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-primary/80 mb-3 md:mb-4 font-medium">
              Empowering Human Teams with Intelligent Automation
            </motion.p>
            
            {/* Hide on mobile, show on desktop */}
            <motion.p variants={fadeIn} className="hidden md:block text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Seamlessly integrate AI to boost productivity, not replace your people. Experience the future of collaborative work.
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Mobile CTA removed from hero - now appears as floating button after scroll */}

        {/* Desktop CTA - positioned with content */}
        <motion.div 
          style={{ y: contentY }}
          initial="initial"
          animate="animate"
          variants={stagger}
          className="hidden md:block container mx-auto px-6 absolute bottom-32 left-0 right-0 z-10"
        >
          <motion.div variants={fadeIn} className="flex flex-row gap-6 items-center max-w-3xl">
            <div 
              data-chat-widget
              data-widget-id="696fd454572f85432b83c7bf"
              data-location-id="g9gg2U35jlB8ZBalHoO9"
              data-testid="widget-hero-samantha"
            />
            <p className="text-sm text-muted-foreground font-medium">Don't just guess. Hear exactly how we handle your missed calls and capture revenue.</p>
          </motion.div>
        </motion.div>
        
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
      {/* Pain vs Relief Section - Tabbed Layout */}
      <PainReliefTabs />
      {/* Customer Journey Alignment Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          {/* Main Container with all cards */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="rounded-3xl border border-white/10 bg-zinc-900/40 p-10 md:p-16 relative overflow-hidden"
          >
            
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight">
                We Align Your Entire Customer Journey Into One <span className="text-primary">Intelligent Flow.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Instead of scattered tools and manual workarounds, you get a clear map of how people, systems, and AI should work together from first touch to repeat business—therefore your operations run smoother and scale without extra headcount.
              </p>
            </div>

            {/* 4 Core Blocks - 2x2 Grid with Width Stagger */}
            <div className="space-y-6 mb-12 relative z-10">
              {/* Row 1 */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Block 1 - Lead Capture Architecture (narrower) */}
                <div className="md:col-span-5">
                  <JourneyCard 
                    icon={LayoutTemplate}
                    title="Lead Capture Architecture"
                    frontDescription="Stop losing visitors. Turn traffic into captured leads without rebuilding your entire website."
                    backIntro="We map every entry point a lead can take, then design a capture flow that doesn't leak."
                    backBullets={[
                      "Consolidates forms, chats, calls, and DMs into a single intake path",
                      "Standardizes what you collect (contact info, intent, timing, qualification)",
                      "Fixes 'dead ends' where people click but never become leads",
                      "Works on top of your existing site and tools, therefore no risky full redesign"
                    ]}
                    backOutcome="More of your existing traffic becomes trackable leads you can actually follow up with."
                    index={0}
                  />
                </div>

                {/* Block 2 - Operational Backbone Design (wider) */}
                <div className="md:col-span-7">
                  <JourneyCard 
                    icon={Layers}
                    title="Operational Backbone Design"
                    frontDescription="Get a clear blueprint of how your systems should connect — so your team stops being the glue."
                    backIntro="We untangle the mess of tools and manual handoffs so your operation has a real spine."
                    backBullets={[
                      "Maps how leads move from capture → qualification → booking → work done",
                      "Defines which system owns each step (calendar, CRM, ticketing, billing, etc.)",
                      "Removes duplicate tools and redundant steps that slow everyone down",
                      "Documents the new flow so onboarding and training stop living in one person's head"
                    ]}
                    backOutcome="Your business finally runs on a predictable backbone, therefore daily chaos drops and scaling becomes possible."
                    index={1}
                  />
                </div>
              </div>

              {/* Row 2 - Brick pattern: wide left, narrow right */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Block 3 - Follow-Up Clarity Engine (wider - brick offset) */}
                <div className="md:col-span-7">
                  <JourneyCard 
                    icon={Zap}
                    title="Follow-Up Clarity Engine"
                    frontDescription="No more leads going cold because someone forgot. Consistent follow-up that actually happens."
                    backIntro={"We turn 'someone should follow up' into a concrete, automated plan."}
                    backBullets={[
                      "Defines who gets followed up, how often, and on which channels",
                      "Builds sequences for new leads, no-shows, canceled jobs, and inactive clients",
                      "Aligns human touchpoints with automated messages so they work together",
                      "Makes follow-up visible in dashboards, therefore nothing depends on memory"
                    ]}
                    backOutcome="Every qualified lead has a path from first contact to decision, not just a single reply that dies in the inbox."
                    index={2}
                  />
                </div>

                {/* Block 4 - AI-Ready Front Desk Layer (narrower - brick offset) */}
                <div className="md:col-span-5">
                  <JourneyCard 
                    icon={Brain}
                    title="AI-Ready Front Desk Layer"
                    frontDescription="Know exactly where AI can help with calls, routing, and qualification — and where your team still needs to lead."
                    backIntro="We design a front-desk layer that's ready for AI without losing the human touch."
                    backBullets={[
                      "Separates repeatable, scriptable tasks from conversations that need judgment",
                      "Defines rules for triage, routing, scheduling, and escalation",
                      "Shows which parts can be automated now and which stay with humans (for safety, nuance, or sales)",
                      "Sets you up to plug in AI reception and follow-up confidently, therefore you don't 'experiment' on live customers"
                    ]}
                    backOutcome="A front desk that's built for AI from the ground up, not a patchwork of bots bolted onto broken processes."
                    index={3}
                    tags={["Strategic Clarity", "AI Readiness"]}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 my-12" />

            {/* Metrics Row */}
            <div className="relative z-10">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-sm font-mono text-primary mb-10 tracking-wider"
              >
                CLARITY DELIVERED. EFFICIENCY UNLOCKED.
              </motion.h3>
              <div className="grid md:grid-cols-3 gap-8">
                <AnimatedMetric 
                  value="40-90" 
                  suffix="hrs/mo" 
                  description="Time typically regained once lead, follow-up, and front-desk loops are clarified."
                />
                <AnimatedMetric 
                  value="82" 
                  suffix="%" 
                  description="Average perceived reduction in friction across lead handling and ops sequences reported by clients."
                />
                <AnimatedMetric 
                  value="3" 
                  suffix="× faster" 
                  description="How much faster teams gain adoption clarity and make confident system decisions once the new flow is mapped."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Revenue-Focused System Section */}
      <RevenueSystemSection />
      {/* Industry Results Carousel */}
      <IndustryCarousel />
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
                START HERE
              </div>
              <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight">The Revenue Friction Analysis</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Your growth isn't stalling due to lack of effort; it's stalling due to hidden operational drag. Leads go cold in the invisible gaps between manual tasks and handoffs that your CRM isn't tracking. This AI-powered analysis pinpoints exactly where friction is choking your pipeline and uncovers the single biggest operational gap <span className="text-white font-medium">costing you deals right now.</span>
              </p>
              <p className="text-lg text-white font-semibold mb-10">
                Move from guessing to knowing. Stop letting invisible inefficiencies dictate your revenue.
              </p>
              <Link 
                href="/assessment"
                data-testid="button-assessment-cta"
                className="inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] group transition-colors"
              >
                Get My Executive Analysis
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
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">EXECUTIVE AI ANALYSIS</span>
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  
                  {/* Progress bars */}
                  <div className="space-y-2 mb-6">
                    <div className="h-1.5 bg-primary/60 rounded-full w-full" />
                    <div className="h-1.5 bg-primary/40 rounded-full w-4/5" />
                    <div className="h-1.5 bg-primary/20 rounded-full w-3/5" />
                  </div>
                  
                  {/* Friction Point Label */}
                  <div className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">FRICTION POINT IDENTIFICATION</div>
                  
                  {/* Operational Efficiency Score */}
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-white/5 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-xs text-zinc-400">Operational Efficiency Score</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-mono font-bold text-white">76</span>
                      <span className="text-2xl font-mono text-zinc-600">/100</span>
                      <TrendingUp className="w-5 h-5 text-primary ml-auto" />
                    </div>
                  </div>
                  
                  {/* Potential Revenue Impact */}
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs text-zinc-400">Potential Revenue Impact</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">$35,000</div>
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
                  <p className="text-sm font-mono text-primary">OPERATIONAL AI ADVISOR™</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Operational AI Advisor™ with a background in operations, performance, and AI adoption.
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
      {/* Final CTA */}
      <section className="py-16 md:py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-4xl md:text-7xl font-medium mb-8 md:mb-12 tracking-tight"
          >
            Hear it <span className="text-primary">for yourself.</span>
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div 
              data-chat-widget
              data-widget-id="696fd454572f85432b83c7bf"
              data-location-id="g9gg2U35jlB8ZBalHoO9"
              data-testid="widget-bottom-samantha"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
