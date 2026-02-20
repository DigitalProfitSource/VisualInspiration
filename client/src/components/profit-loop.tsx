import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Radio, Zap, Cog, RefreshCw, Star, Database, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const profitNodes = [
  {
    id: "01",
    title: "Universal Capture Hub",
    shortDescription: "Deploy a 24/7 intelligent intake layer across all storefronts.",
    icon: Radio,
    details: [
      "AI-Ready SEO for search engines",
      "AI Receptionists for website and Google Profile (GMB)",
      "24/7 AI Phone Answering",
      "Social Media / DM automation"
    ]
  },
  {
    id: "02",
    title: "Instant Greeting",
    shortDescription: "Trigger automated SMS/Voice response in under 60 seconds for every new prospect.",
    icon: Zap,
    details: [
      "Instant SMS acknowledgment on form fills",
      "AI voice callback within 60 seconds",
      "Personalized greeting based on lead source",
      "Warm handoff to human when needed"
    ]
  },
  {
    id: "03",
    title: "Operational Hub Sync",
    shortDescription: "Connect CRM, calendars, and billing to eliminate manual data entry and \"admin glue\".",
    icon: Cog,
    details: [
      "CRM auto-population from every touchpoint",
      "Calendar sync across team members",
      "Billing and invoice automation",
      "Zero duplicate data entry"
    ]
  },
  {
    id: "04",
    title: "Persistent Follow-Up",
    shortDescription: "Automate intelligent nurture sequences for no-shows and stale quotes until they book or buy.",
    icon: RefreshCw,
    details: [
      "Multi-step SMS and email sequences",
      "Win-back campaigns for no-shows",
      "Stale quote re-engagement",
      "Behavior-based timing optimization"
    ]
  },
  {
    id: "05",
    title: "Authority Guard",
    shortDescription: "Automate 5-star review collection and privately intercept negative feedback.",
    icon: Star,
    details: [
      "Automated post-service review requests",
      "Smart routing: happy → public, unhappy → private",
      "Review response templates",
      "Reputation dashboard and alerts"
    ]
  },
  {
    id: "06",
    title: "Revenue Injection",
    shortDescription: "Re-engage your existing database to trigger immediate cash flow with zero additional ad spend.",
    icon: Database,
    details: [
      "Dormant contact reactivation campaigns",
      "Past-client re-engagement sequences",
      "Seasonal and lifecycle-based offers",
      "Revenue tracking per reactivation cohort"
    ]
  }
];

function DesktopProfitLoop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const mapped = Math.floor(value * 8) - 1;
    setActiveIndex(Math.min(Math.max(mapped, -1), 5));
  });

  return (
    <div ref={sectionRef} className="hidden md:block" data-testid="profit-loop-desktop">
      <div className="relative max-w-6xl mx-auto">
        <svg
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-0"
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: "160px" }}
        >
          <path
            d="M 50 100 C 50 40, 150 40, 200 100 C 250 160, 350 160, 400 100 C 450 40, 550 40, 600 100 C 650 160, 750 160, 800 100 C 850 40, 950 40, 1000 100 C 1050 160, 1150 160, 1150 100"
            stroke="rgba(103,232,249,0.15)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <motion.path
            d="M 50 100 C 50 40, 150 40, 200 100 C 250 160, 350 160, 400 100 C 450 40, 550 40, 600 100 C 650 160, 750 160, 800 100 C 850 40, 950 40, 1000 100 C 1050 160, 1150 160, 1150 100"
            stroke="url(#energyGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(scrollYProgress, [0.1, 0.85], [0, 1]),
              filter: "drop-shadow(0 0 8px rgba(103,232,249,0.6))"
            }}
          />
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="50%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-6 gap-4 relative z-10">
          {profitNodes.map((node, index) => (
            <DesktopNode
              key={node.id}
              node={node}
              index={index}
              isActive={index <= activeIndex}
            />
          ))}
        </div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8 text-sm text-primary/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-mono text-xs tracking-wider">LOOP REPEATS → COMPOUNDS REVENUE</span>
        </motion.div>
      </div>
    </div>
  );
}

function DesktopNode({ node, index, isActive }: { node: typeof profitNodes[0]; index: number; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = node.icon;

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`profit-node-${node.id}`}
    >
      <motion.div
        className="relative rounded-2xl border p-5 transition-all duration-500 cursor-pointer overflow-hidden"
        animate={{
          borderColor: isActive ? "rgba(103,232,249,0.4)" : "rgba(255,255,255,0.08)",
          backgroundColor: isActive ? "rgba(103,232,249,0.05)" : "rgba(24,24,27,0.6)",
        }}
        whileHover={{ scale: 1.04, y: -4 }}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              boxShadow: "inset 0 0 30px rgba(103,232,249,0.08), 0 0 20px rgba(103,232,249,0.1)",
            }}
          />
        )}

        <div className="relative z-10">
          <span className="text-[10px] font-mono text-primary/50 tracking-widest block mb-2">
            NODE {node.id}
          </span>
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border"
            animate={{
              backgroundColor: isActive ? "rgba(103,232,249,0.15)" : "rgba(103,232,249,0.05)",
              borderColor: isActive ? "rgba(103,232,249,0.3)" : "rgba(103,232,249,0.1)",
              boxShadow: isActive
                ? "0 0 15px rgba(103,232,249,0.3)"
                : "none",
            }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
          <h4 className="text-sm font-display font-semibold text-white mb-1.5 leading-tight">
            {node.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {node.shortDescription}
          </p>
        </div>

        <motion.div
          className="relative z-10 mt-3 pt-3 border-t border-white/5 space-y-1.5"
          initial={false}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 12 : 0,
            paddingTop: isHovered ? 12 : 0,
          }}
          style={{ overflow: "hidden" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {node.details.map((detail, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-1.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
              transition={{ delay: i * 0.05 + 0.1 }}
            >
              <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span className="text-[11px] text-slate-400 leading-tight">{detail}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileProfitLoop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={sectionRef} className="md:hidden relative" data-testid="profit-loop-mobile">
      <div className="absolute left-6 top-0 bottom-0 w-px">
        <div className="absolute inset-0 bg-white/5" />
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            scaleY: useTransform(scrollYProgress, [0.05, 0.9], [0, 1]),
            background: "linear-gradient(to bottom, #67E8F9, #93C5FD, #67E8F9)",
            filter: "drop-shadow(0 0 6px rgba(103,232,249,0.5))",
            height: "100%",
          }}
        />
      </div>

      <Accordion type="single" collapsible className="space-y-4 pl-12 pr-2">
        {profitNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="absolute left-[18px] w-4 h-4 rounded-full border-2 border-primary/40 bg-zinc-900 z-10" style={{ marginTop: "18px" }} />

              <AccordionItem
                value={`node-${node.id}`}
                className="border border-white/10 rounded-xl bg-zinc-900/60 backdrop-blur-xl overflow-hidden data-[state=open]:border-primary/30"
                data-testid={`profit-node-mobile-${node.id}`}
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-primary/50 tracking-widest block">NODE {node.id}</span>
                      <h4 className="text-sm font-display font-semibold text-white">{node.title}</h4>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {node.shortDescription}
                  </p>
                  <ul className="space-y-2">
                    {node.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </div>
  );
}

export function ProfitLoopSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" data-testid="section-profit-loop">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.4)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="w-full h-full bg-primary/[0.03] blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The Profit Loop
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight text-white">
            You're getting leads. You just don't have a system to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300">
              maximize your marketing ROI.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We align your entire customer journey into one intelligent flow.
          </p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-sm text-primary/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span className="font-mono text-xs tracking-wider hidden md:inline">SCROLL TO ACTIVATE THE LOOP</span>
            <span className="font-mono text-xs tracking-wider md:hidden">TAP EACH NODE TO EXPLORE</span>
          </motion.div>
        </motion.div>

        <DesktopProfitLoop />
        <MobileProfitLoop />
      </div>
    </section>
  );
}
