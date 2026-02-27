import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate, ChevronDown, Quote, Route, RefreshCw, Handshake, TrendingUp, FileText, Globe, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TechTicker } from "@/components/ui/tech-ticker";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { IndustryCarousel } from "@/components/ui/industry-carousel";
import { SEO, organizationSchema, softwareApplicationSchema } from "@/components/seo";
import { Layout } from "@/components/layout";
import founderPhoto from "@assets/Untitled_design_1764887004065.png";
import aiReadyWebConversion from "@assets/Ai-Ready-Web-Conversion_1771370273472.webp";
import triageRoutingDiagram from "@assets/generated_images/intelligent_triage_routing_workflow_diagram.png";
import followUpDiagram from "@assets/generated_images/follow-up_automation_sequence_diagram.png";
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
              Sequential Revenue™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.1] text-balance">
              Turn Your Disconnected Tools Into a Single Profit <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-primary/50">Engine</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-primary/80 mb-3 md:mb-4 font-medium">Capture. Convert. Compound. — On Autopilot.</motion.p>
            
            {/* Hide on mobile, show on desktop */}
            <motion.p variants={fadeIn} className="hidden md:block text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">We connect your lead capture, follow-up, and customer base into one automated loop — so every dollar you spend on marketing compounds instead of evaporating.</motion.p>
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
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <Link href="/assessment">
                <button 
                  data-testid="button-hero-cta"
                  className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full py-3.5 px-8 relative shadow-2xl backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <p className="group-hover:text-white transition-colors duration-300 text-base font-bold text-white font-sans drop-shadow-sm whitespace-nowrap">Get Your AI Clarity Score</p>
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
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              {/* FOUNDER HOLOGRAM IMAGE: CAPTURE PILLAR - Replace src with custom image */}
              <div className="w-full aspect-[4/3] max-w-[600px] mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent flex items-center justify-center" data-testid="image-placeholder-capture">
                <span className="text-primary/30 font-mono text-sm">CAPTURE HOLOGRAM</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-3 block">PILLAR 01 · CAPTURE</span>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2" data-testid="text-pillar-capture">The 24/7 AI Front Door</h3>
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
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-3 block">PILLAR 02 · CONVERT</span>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2" data-testid="text-pillar-convert">The 24/7 Sales Rep</h3>
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
              {/* FOUNDER HOLOGRAM IMAGE: CONVERT PILLAR - Replace src with custom image */}
              <div className="w-full aspect-[4/3] max-w-[600px] mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent flex items-center justify-center" data-testid="image-placeholder-convert">
                <span className="text-primary/30 font-mono text-sm">CONVERT HOLOGRAM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Section D: Pillar 3 — COMPOUND */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              {/* FOUNDER HOLOGRAM IMAGE: COMPOUND PILLAR - Replace src with custom image */}
              <div className="w-full aspect-[4/3] max-w-[600px] mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent flex items-center justify-center" data-testid="image-placeholder-compound">
                <span className="text-primary/30 font-mono text-sm">COMPOUND HOLOGRAM</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="text-sm font-mono text-primary uppercase tracking-widest mb-3 block">PILLAR 03 · COMPOUND</span>
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
      {/* Section E: Loop CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.06),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 text-white" data-testid="text-loop-cta">
              The loop never stops.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
              Capture fills your pipeline. Convert squeezes every dollar from it. Compound turns results into more results — and feeds new leads back into Capture. This is Sequential Revenue™.
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500" />
              <Link
                href="/solutions"
                data-testid="button-loop-cta"
                className="relative inline-flex items-center justify-center gap-2 bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors"
              >
                See How It Works →
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Full breakdown of all three pillars and our "Found Money" Guarantee.</p>
          </motion.div>
        </div>
      </section>
      {/* Industry Results Carousel */}
      <IndustryCarousel />
      {/* Revenue-Focused System Section */}
      <RevenueSystemSection />
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
                  <p className="text-sm font-mono text-primary">AI IMPLEMENTATION ADVISOR™</p>
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
