import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate, ChevronDown, ChevronUp, Snail, TriangleAlert, Unplug, FlagOff, CloudOff, Frown, Stethoscope, Map, Target, Blocks, Quote, MessageSquareQuote, Route, RefreshCw, BookOpen, Handshake, Sparkles } from "lucide-react";
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
import { Footer } from "@/components/footer";
import heroBg from "@assets/generated_images/subtle_abstract_dark_technical_flow_background.png";
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

const revenueFeatures = [
  {
    icon: Route,
    title: "Intelligent Triage & Routing",
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
    title: "Follow-Up & Show-Rate Engine",
    frontDescription: "Runs multi-step SMS and email sequences on leads from any channel—calls, chats, forms, or DMs—with win-back campaigns for \"never booked\" and no-show leads tuned to your workflow.",
    impact: "Built to increase show rates and reduce no-shows",
    backIntro: "Most systems stop after one reply. Simple Sequence keeps going—politely, automatically, and on your behalf.",
    backBullets: [
      "New lead flows kick in no matter where the lead came from",
      "Reminder & reschedule logic that adapts to time zones and timing",
      "No-show / canceled win-backs that reopen lost opportunities",
      "Branching logic for consults, intakes, or estimates depending on your industry",
      "Tracks responses and status in your CRM so your team always knows what's next"
    ],
    backOutcome: "More people actually show up, therefore your marketing and ad spend become booked revenue instead of missed chances."
  },
  {
    icon: BookOpen,
    title: "Education & FAQ Flows",
    frontDescription: "Uses your own content and policies to answer routine questions before they reach your team—sending explainers, pricing ranges, and pre-visit prep automatically across SMS, email, and chat.",
    impact: "Designed to cut routine FAQs by up to 80%",
    backIntro: "Your team repeats the same explanations all day. Simple Sequence says it for them—consistently, accurately, and on-brand.",
    backBullets: [
      "RAG-style knowledge base built from your FAQs, docs, pricing ranges, and policies",
      "Service / procedure explainers that answer \"What do I get?\" and \"Is this right for me?\"",
      "Pre-visit prep and post-visit instructions sent automatically after booking",
      "Triggered from forms, chats, DMs, and pipeline stages so answers show up exactly when needed",
      "Guardrails so the AI never steps into regulated advice—it sticks to your approved information"
    ],
    backOutcome: "Fewer low-value calls and emails, therefore more time for high-value conversations and better-educated clients who are ready to say yes."
  },
  {
    icon: Handshake,
    title: "White-Glove Integration & ROI",
    frontDescription: "We handle the plumbing—phones, calendars, CRM/EMR, inboxes, and GHL automation—then review performance monthly to tune scripts and flows around what actually drives revenue.",
    impact: "Real-time visibility into calls, leads, and booked revenue",
    backIntro: "You don't need another disconnected tool. You need a front-desk system wired into how your business already runs.",
    backBullets: [
      "Done-for-you setup across phone systems, chat widgets, GHL pipelines, calendars, and EMR/CRMs",
      "Uses GoHighLevel's automation strength while Simple Sequence becomes the brain deciding what to trigger and when",
      "Centralized logging so sales, ops, and owners all see the same picture",
      "Dashboards that track calls handled, leads captured, show-rate, and projected revenue",
      "Monthly optimization sessions to refine messaging, routing, and campaigns based on real data"
    ],
    backOutcome: "A front desk you can actually measure and improve, therefore no more guessing whether your phones and follow-ups are working—or what they're really worth."
  }
];

function FlipCard({ feature, index }: { feature: typeof revenueFeatures[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="group relative"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========== PULSING BORDER BEAMS - Desktop (desynchronized per card) ========== */}
      <div className="hidden md:block absolute -inset-[1px] rounded-2xl overflow-hidden z-0">
        {/* Base border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10" />
        
        {/* Traveling beam - Top edge */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.8), rgba(103,232,249,1), rgba(103,232,249,0.8), transparent)",
            boxShadow: "0 0 20px rgba(103,232,249,0.6), 0 0 40px rgba(103,232,249,0.4)"
          }}
          animate={{
            x: ["-100%", "calc(100vw)"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 2.8 + index * 0.3, repeat: Infinity, ease: "linear", repeatDelay: 1.2 + index * 0.4, delay: index * 0.7 }}
        />
        
        {/* Traveling beam - Right edge */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] h-24 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(103,232,249,0.8), rgba(103,232,249,1), rgba(103,232,249,0.8), transparent)",
            boxShadow: "0 0 20px rgba(103,232,249,0.6), 0 0 40px rgba(103,232,249,0.4)"
          }}
          animate={{
            y: ["-100%", "500%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 2.3 + index * 0.25, repeat: Infinity, ease: "linear", repeatDelay: 1.8 + index * 0.3, delay: 0.5 + index * 0.9 }}
        />
        
        {/* Traveling beam - Bottom edge */}
        <motion.div
          className="absolute bottom-0 right-0 h-[2px] w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.8), rgba(103,232,249,1), rgba(103,232,249,0.8), transparent)",
            boxShadow: "0 0 20px rgba(103,232,249,0.6), 0 0 40px rgba(103,232,249,0.4)"
          }}
          animate={{
            x: ["100%", "-500%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3.2 + index * 0.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 + index * 0.5, delay: 1.2 + index * 0.6 }}
        />
        
        {/* Traveling beam - Left edge */}
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] h-24 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(103,232,249,0.8), rgba(103,232,249,1), rgba(103,232,249,0.8), transparent)",
            boxShadow: "0 0 20px rgba(103,232,249,0.6), 0 0 40px rgba(103,232,249,0.4)"
          }}
          animate={{
            y: ["100%", "-500%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 2.6 + index * 0.35, repeat: Infinity, ease: "linear", repeatDelay: 1.4 + index * 0.45, delay: 1.8 + index * 0.8 }}
        />
        
        {/* Corner glows */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 rounded-tl-2xl"
          style={{ background: "radial-gradient(circle at top left, rgba(103,232,249,0.15), transparent 70%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.2 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16 rounded-br-2xl"
          style={{ background: "radial-gradient(circle at bottom right, rgba(103,232,249,0.15), transparent 70%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.8 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 + index * 0.6 }}
        />
      </div>
      
      {/* ========== DESKTOP: Curtain Reveal Card ========== */}
      <div className="hidden md:block relative w-full min-h-[420px] rounded-2xl overflow-hidden">
        {/* Back Content Layer (Always visible, revealed by curtain) */}
        <div className="absolute inset-0 w-full h-full p-8 lg:p-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950">
          {/* Subtle Corner Glow (reduced) */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Back Content with Staggered Fade-in */}
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(103,232,249,0.3)]">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-primary">{feature.title}</h4>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground text-sm leading-relaxed mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {feature.backIntro}
            </motion.p>
            
            <ul className="space-y-2 mb-4">
              {feature.backBullets.map((bullet, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-2 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -15 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="pt-3 border-t border-primary/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p className="text-sm text-primary/90 font-medium leading-relaxed">
                <span className="text-primary font-semibold">Outcome:</span> {feature.backOutcome}
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Front Content Layer (Curtain that slides away) */}
        <motion.div 
          className="absolute inset-0 w-full h-full p-8 lg:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/98 via-zinc-900/95 to-zinc-950/98 overflow-hidden"
          initial={false}
          animate={{ 
            x: isHovered ? "102%" : "0%",
            opacity: isHovered ? 0.95 : 1
          }}
          transition={{ 
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* Glowing Edge (right side of curtain) */}
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent, rgba(103,232,249,0.1) 30%, rgba(103,232,249,0.3) 70%, rgba(103,232,249,0.5) 90%, rgba(103,232,249,0.7))"
            }}
            animate={{
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Animated Corner Sparkles */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-primary/40" />
          </motion.div>
          
          {/* Subtle Corner Glow (reduced) */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.04] blur-[60px] rounded-full pointer-events-none" />
          
          {/* Icon with Floating Animation */}
          <motion.div 
            className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 relative z-10"
            animate={{ 
              y: [-2, 2, -2],
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
          
          {/* Content */}
          <h3 className="text-xl lg:text-2xl font-display font-semibold mb-4 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6 relative z-10 text-sm lg:text-base">
            {feature.frontDescription}
          </p>
          
          {/* Impact Metric */}
          <div className="pt-4 border-t border-white/10 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
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
            <p className="text-primary font-medium text-sm lg:text-base">{feature.impact}</p>
          </div>
          
          {/* Desktop Hover Hint */}
          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground/60">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hover to explore
            </motion.span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* ========== MOBILE: Expandable Card ========== */}
      <div className="md:hidden">
        <div className="w-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Icon */}
          <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          
          {/* Content */}
          <h3 className="text-lg font-display font-semibold mb-3 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4 relative z-10 text-sm">
            {feature.frontDescription}
          </p>
          
          {/* Impact Metric */}
          <div className="pt-3 border-t border-white/10 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
            </div>
            <p className="text-primary font-medium text-sm">{feature.impact}</p>
          </div>
          
          {/* Learn More Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 active:scale-[0.98] transition-all"
            data-testid={`learn-more-${index}`}
          >
            {isExpanded ? "Show Less" : "Learn More"}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
        
        {/* Mobile Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 -mt-2 pt-6 rounded-b-2xl border border-t-0 border-white/10 bg-zinc-900/70">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.backIntro}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {feature.backBullets.map((bullet, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-3 border-t border-primary/20">
                  <p className="text-sm text-primary/90 font-medium leading-relaxed">
                    <span className="text-primary font-semibold">Outcome:</span> {feature.backOutcome}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
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

function RevenueSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const circuitY = useTransform(scrollYProgress, [0, 1], ["-30%", "60%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1.5, 1.5, 0.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  
  return (
    <section ref={sectionRef} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Section Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.4)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Subtle Parallax Background Layers (dimmed) */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.02),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(103,232,249,0.02),transparent_50%)]" />
      </motion.div>
      
      {/* Subtle Central Glow (significantly dimmed) */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
      >
        <div className="w-full h-full bg-primary/[0.03] blur-[150px] rounded-full" />
      </motion.div>
      
      {/* Secondary Floating Orbs (dimmed) */}
      <motion.div
        style={{ y: circuitY }}
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.02] blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]) }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/[0.02] blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Circuit Beams with Enhanced Parallax */}
      <motion.div
        style={{ y: circuitY }}
        className="absolute inset-0 pointer-events-none"
      >
        <CircuitBeams className="opacity-20" />
      </motion.div>
      
      {/* Animated Border Lines */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div 
        style={{ rotateX }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Header with Dramatic Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          className="text-center max-w-5xl mx-auto mb-24"
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
        </motion.div>

        {/* 4-Feature Flip Card Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {revenueFeatures.map((feature, index) => (
            <FlipCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" />
            SimpleSequence
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium text-muted-foreground">
            <a href="/solutions" className="hover:text-primary transition-colors duration-300">Solutions</a>
            <a href="/industries" className="hover:text-primary transition-colors duration-300">Industries</a>
            <a href="/process" className="hover:text-primary transition-colors duration-300">Process</a>
            <a href="/offers" className="hover:text-primary transition-colors duration-300">Offers</a>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40" />
          <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
          <CircuitBeams className="opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              Operational AI Advisor™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-6 leading-[1.1] text-balance max-w-5xl mx-auto">
              Practical AI for <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">Service Businesses</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg text-primary/80 mb-6 font-medium">
              Operationally grounded. Revenue-relevant. No hype — just clarity and real-world leverage.
            </motion.p>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              If you're tired of leads slipping, follow-up failing, and guessing where AI actually fits — we bring the clarity you need to fix what's broken and grow without chaos.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <ContactFormDialog
                source="clarity-session"
                title="Get Your AI Clarity Session"
                description="Tell us about your business and we'll help you identify the best AI opportunities for operational efficiency."
                trigger={
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                    <button 
                      data-testid="button-hero-cta"
                      className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-3.5 pr-6 pb-3.5 pl-7 relative shadow-2xl backdrop-blur-xl w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-left">
                          <p className="group-hover:text-white transition-colors duration-300 text-base font-bold text-white font-sans drop-shadow-sm">Get Your AI Clarity Session</p>
                        </div>
                        <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
                            <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                }
              />
              <p className="text-sm text-muted-foreground/80">
                Stop losing leads. Stop guessing. Start with clarity.
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>
      {/* Tech Stack Ticker */}
      <TechTicker />
      {/* What We Solve - Friction Grid */}
      <section className="py-32 border-t border-white/5 bg-zinc-950/30 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.2} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-medium mb-6 text-[#f8fcfc]">Why things keep falling through the cracks.</h2>
            <p className="text-muted-foreground text-lg">These are the operational patterns that drain your energy and kill your margins — usually invisible until you map them.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Slow Lead Response", desc: "By the time you call back, the lead is already talking to someone else.", icon: Snail },
              { title: "Follow-Up That Forgets", desc: "Your team means well, but things slip. Leads go cold. Revenue disappears.", icon: TriangleAlert },
              { title: "Systems That Don't Talk", desc: "Your tools are scattered. Your team fills the gaps manually. It's exhausting.", icon: Unplug },
              { title: "Too Dependent on People", desc: "When key staff get busy or leave, the whole operation grinds down.", icon: FlagOff },
              { title: "AI in the Wrong Places", desc: "You've tried tools — but nothing sticks because it wasn't built for your workflow.", icon: CloudOff },
              { title: "Invisible Daily Drag", desc: "Small friction points compound into big problems: stress, churn, and shrinking margins.", icon: Frown }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.12] hover:to-white/[0.02] transition-all relative overflow-hidden shadow-lg"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-10 h-10 mb-6 bg-white/5 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/20">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium mb-3 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-zinc-300 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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

              {/* Row 2 */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Block 3 - Follow-Up Clarity Engine (narrower) */}
                <div className="md:col-span-5">
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

                {/* Block 4 - AI-Ready Front Desk Layer (wider) */}
                <div className="md:col-span-7">
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
      {/* The SimpleSequence Method */}
      <section id="method" className="py-40 relative overflow-hidden bg-background">
        <GridBeam />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center max-w-2xl mx-auto mb-24"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">How We Deploy</span>
            <h2 className="text-4xl md:text-5xl font-medium mb-6">The SimpleSequence Method</h2>
            <p className="text-muted-foreground text-lg">A clear, structured process that moves you from confusion to a predictable, AI-ready flow — in weeks, not months.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            <div className="space-y-32 relative z-10">
              {[
                { step: "01", title: "Diagnose Friction", desc: "We find exactly where things break down — the hidden drag you've been feeling but couldn't name.", icon: Stethoscope },
                { step: "02", title: "Map Sequences", desc: "We document the workflows that actually drive revenue and expose what's unclear or broken.", icon: Map },
                { step: "03", title: "Locate Leverage", desc: "We identify where AI creates real lift — triage, routing, and follow-up — and where your team's judgment still matters most, not shiny distractions.", icon: Target },
                { step: "04", title: "Architect the Flow", desc: "We document the real workflows from first contact to repeat business, therefore exposing what actually drives revenue and what's unclear or broken.", icon: Blocks }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} relative group`}
                >
                  {/* Text Content */}
                  <div className="flex-1 pl-20 md:pl-0 md:text-right">
                    {i % 2 === 0 && (
                      <div className="md:text-right">
                        <div className="inline-flex items-center gap-2 text-primary/50 font-mono mb-2">
                           <span>STEP</span>
                           <span className="text-xl font-bold text-primary">{item.step}</span>
                        </div>
                        <h3 className="text-3xl font-medium mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-background border border-primary/30 flex items-center justify-center relative z-10 shrink-0 shadow-[0_0_30px_-10px_var(--color-primary)] group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-20" />
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Text Content (Right side for odd items) */}
                  <div className="flex-1 pl-20 md:pl-0 md:text-left">
                    {i % 2 === 1 && (
                      <div className="md:text-left">
                        <div className="inline-flex items-center gap-2 text-primary/50 font-mono mb-2">
                           <span>STEP</span>
                           <span className="text-xl font-bold text-primary">{item.step}</span>
                        </div>
                        <h3 className="text-3xl font-medium mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* AI Clarity Assessment */}
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
              <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight">The AI Clarity Assessment™</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A quick assessment that reveals where you're losing leads, where follow-up breaks down, and where your team is stuck doing work that should be automated. Delivered with an Executive AI Analysis.
              </p>
              <p className="text-lg text-primary/80 font-medium mb-10">
                No fluff. No hype. Just practical insight.
              </p>
              <ContactFormDialog
                source="assessment"
                title="Take the Free Assessment"
                description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
                trigger={
                  <Button 
                    size="lg" 
                    data-testid="button-assessment-cta"
                    className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  >
                    Take the Free Assessment
                  </Button>
                }
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md relative"
            >
               {/* Mockup Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg opacity-50" />
               <div className="relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#403e3e80]" />
                      <div className="w-3 h-3 rounded-full bg-[#7f7e7d80]" />
                      <div className="w-3 h-3 rounded-full bg-[#b9bdba80]" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500">ASSESSMENT_RESULTS.PDF</div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-2 bg-white/10 rounded w-3/4" />
                      <div className="h-2 bg-white/10 rounded w-full" />
                      <div className="h-2 bg-white/5 rounded w-5/6" />
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary">OPERATIONAL SCORE</span>
                      </div>
                      <div className="text-3xl font-mono font-bold text-white">72<span className="text-zinc-600">/100</span></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                        <div className="space-y-1.5">
                          <div className="h-2 bg-white/10 rounded w-24" />
                          <div className="h-2 bg-white/5 rounded w-16" />
                        </div>
                      </div>
                    </div>
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
      <section className="py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-5xl md:text-7xl font-medium mb-12 tracking-tight"
          >
            Start with <span className="text-primary">clarity.</span>
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-4 pr-8 pb-4 pl-9 relative shadow-2xl backdrop-blur-xl inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <div className="text-left">
                  <p className="group-hover:text-white transition-colors duration-300 text-xl font-bold text-white font-sans drop-shadow-sm">Get your AI Clarity Session</p>
                </div>
                <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
