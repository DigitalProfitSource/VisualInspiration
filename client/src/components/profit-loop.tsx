import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Radio, Zap, Cog, RefreshCw, Star, Database, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const profitNodes = [
  {
    id: "01",
    title: "Universal Capture Hub",
    subtitle: "The Trigger",
    context: "Replaces the passive front desk with a 24/7 intelligent intake layer.",
    icon: Radio,
    specs: [
      "AI Receptionists for Website & Google Profile (GMB)",
      "24/7 AI Phone Answering",
      "AI-Ready SEO for search engines",
      "Automated Social Media / DM intake"
    ],
    color: "#67E8F9"
  },
  {
    id: "02",
    title: "Instant Greeting",
    subtitle: "Sub-60 Second Engagement",
    context: "Every new prospect gets immediate, personalized contact — no lead goes cold.",
    icon: Zap,
    specs: [
      "Automated SMS/Voice response triggered on lead entry",
      "Personalized greeting based on lead source",
      "AI voice callback within 60 seconds",
      "Warm handoff to human when needed"
    ],
    color: "#93C5FD"
  },
  {
    id: "03",
    title: "Operational Hub Sync",
    subtitle: "Eliminating Human-Glue Tasks",
    context: "Your CRM, calendars, and billing talk to each other — zero manual data entry.",
    icon: Cog,
    specs: [
      "Instant CRM synchronization from every touchpoint",
      "Team calendar auto-coordination",
      "Billing and invoice automation",
      "Zero duplicate data entry or admin overhead"
    ],
    color: "#A78BFA"
  },
  {
    id: "04",
    title: "Persistent Follow-Up",
    subtitle: "Recovering Lost Revenue",
    context: "Automated nurture sequences that chase no-shows and stale quotes until they book or buy.",
    icon: RefreshCw,
    specs: [
      "Multi-step SMS and email nurture sequences",
      "Win-back campaigns for no-shows",
      "Stale quote re-engagement automation",
      "Behavior-based timing optimization"
    ],
    color: "#F472B6"
  },
  {
    id: "05",
    title: "Authority Guard",
    subtitle: "Bulletproofing Your Reputation",
    context: "Automated 5-star review collection with private interception of negative feedback.",
    icon: Star,
    specs: [
      "Automated post-service review requests",
      "Smart routing: happy → public, unhappy → private",
      "Review response templates and alerts",
      "Reputation dashboard with real-time monitoring"
    ],
    color: "#FBBF24"
  },
  {
    id: "06",
    title: "Revenue Injection",
    subtitle: "Immediate Cash Flow",
    context: "Re-engage your existing database to trigger revenue with zero additional ad spend.",
    icon: Database,
    specs: [
      "Dormant contact reactivation campaigns",
      "Past-client re-engagement sequences",
      "Seasonal and lifecycle-based offers",
      "Revenue tracking per reactivation cohort"
    ],
    color: "#34D399"
  }
];

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function DesktopCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(prev => wrap(0, 6, prev + newDirection));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => navigate(1), 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { navigate(-1); setIsAutoPlaying(false); }
      if (e.key === "ArrowRight") { navigate(1); setIsAutoPlaying(false); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const getCardProps = (index: number) => {
    let offset = index - activeIndex;
    if (offset > 3) offset -= 6;
    if (offset < -3) offset += 6;

    const isCenter = offset === 0;
    const isAdj = Math.abs(offset) === 1;
    const isFar = Math.abs(offset) === 2;
    const isHidden = Math.abs(offset) > 2;

    return {
      x: offset * 320,
      scale: isCenter ? 1.15 : isAdj ? 0.88 : isFar ? 0.72 : 0.6,
      opacity: isCenter ? 1 : isAdj ? 0.7 : isFar ? 0.35 : 0,
      zIndex: isCenter ? 50 : isAdj ? 30 : isFar ? 10 : 0,
      filter: isCenter ? "blur(0px)" : isAdj ? "blur(1px)" : "blur(3px)",
      pointerEvents: (isHidden ? "none" : "auto") as "none" | "auto",
      isCenter,
    };
  };

  const energyProgress = useMotionValue(0);
  const smoothProgress = useSpring(energyProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    energyProgress.set((activeIndex + 1) / 6);
  }, [activeIndex, energyProgress]);

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      data-testid="profit-loop-desktop"
    >
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] pointer-events-none z-[5]"
        viewBox="0 0 1000 60"
        fill="none"
        style={{ height: "60px" }}
      >
        <path
          d="M 0 30 Q 83 5, 166 30 Q 250 55, 333 30 Q 416 5, 500 30 Q 583 55, 666 30 Q 750 5, 833 30 Q 916 55, 1000 30"
          stroke="rgba(103,232,249,0.08)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <motion.path
          d="M 0 30 Q 83 5, 166 30 Q 250 55, 333 30 Q 416 5, 500 30 Q 583 55, 666 30 Q 750 5, 833 30 Q 916 55, 1000 30"
          stroke="url(#desktopEnergyGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            pathLength: smoothProgress,
            filter: "drop-shadow(0 0 10px rgba(103,232,249,0.7))"
          }}
        />
        <defs>
          <linearGradient id="desktopEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative h-[520px] mt-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {profitNodes.map((node, index) => {
            const props = getCardProps(index);
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                className="absolute w-[280px] cursor-pointer"
                animate={{
                  x: props.x,
                  scale: props.scale,
                  opacity: props.opacity,
                  zIndex: props.zIndex,
                  filter: props.filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{ pointerEvents: props.pointerEvents }}
                onClick={() => {
                  if (!props.isCenter) {
                    let offset = index - activeIndex;
                    if (offset > 3) offset -= 6;
                    if (offset < -3) offset += 6;
                    setDirection(offset > 0 ? 1 : -1);
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }
                }}
                data-testid={`profit-node-${node.id}`}
              >
                <motion.div
                  className="rounded-2xl border overflow-hidden relative"
                  animate={{
                    borderColor: props.isCenter ? "rgba(103,232,249,0.5)" : "rgba(255,255,255,0.08)",
                    backgroundColor: props.isCenter ? "rgba(103,232,249,0.06)" : "rgba(24,24,27,0.7)",
                  }}
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  {props.isCenter && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          boxShadow: "inset 0 0 60px rgba(103,232,249,0.08), 0 0 40px rgba(103,232,249,0.15), 0 0 80px rgba(103,232,249,0.05)",
                        }}
                      />
                      <motion.div
                        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          background: "linear-gradient(135deg, rgba(103,232,249,0.2), transparent, rgba(147,197,253,0.2))",
                        }}
                      />
                    </>
                  )}

                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-primary/50 tracking-[0.2em] uppercase">
                        Node {node.id}
                      </span>
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        animate={{
                          backgroundColor: props.isCenter ? node.color : "rgba(103,232,249,0.2)",
                          boxShadow: props.isCenter ? `0 0 12px ${node.color}` : "none",
                        }}
                      />
                    </div>

                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                      animate={{
                        backgroundColor: props.isCenter ? "rgba(103,232,249,0.15)" : "rgba(103,232,249,0.05)",
                        borderColor: props.isCenter ? "rgba(103,232,249,0.4)" : "rgba(103,232,249,0.1)",
                        boxShadow: props.isCenter ? "0 0 20px rgba(103,232,249,0.3)" : "none",
                      }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>

                    <h4 className="text-base font-display font-semibold text-white mb-1 leading-tight">
                      {node.title}
                    </h4>
                    <span className="text-xs font-mono text-primary/60 block mb-3">
                      {node.subtitle}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {node.context}
                    </p>

                    <AnimatePresence>
                      {props.isCenter && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-[10px] font-mono text-primary/70 tracking-[0.15em] uppercase block mb-3">
                              Specifications
                            </span>
                            <ul className="space-y-2.5">
                              {node.specs.map((spec, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-start gap-2"
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15 + i * 0.07 }}
                                >
                                  <motion.div
                                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                    style={{ backgroundColor: node.color }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                  />
                                  <span className="text-xs text-slate-300 leading-relaxed">{spec}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <motion.button
          className="w-10 h-10 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { navigate(-1); setIsAutoPlaying(false); }}
          aria-label="Previous node"
          data-testid="carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2">
          {profitNodes.map((_, index) => (
            <motion.button
              key={index}
              className="relative w-8 h-1 rounded-full overflow-hidden cursor-pointer"
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              whileHover={{ scale: 1.3 }}
              aria-label={`Go to node ${index + 1}`}
            >
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scaleX: index === activeIndex ? 1 : 0,
                  backgroundColor: index === activeIndex ? "#67E8F9" : "rgba(255,255,255,0.1)",
                }}
                style={{
                  originX: 0,
                  boxShadow: index === activeIndex ? "0 0 8px rgba(103,232,249,0.6)" : "none",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          className="w-10 h-10 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { navigate(1); setIsAutoPlaying(false); }}
          aria-label="Next node"
          data-testid="carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <motion.div
        className="flex items-center justify-center gap-2 mt-6 text-sm text-primary/50"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <RefreshCw className="w-4 h-4" />
        <span className="font-mono text-xs tracking-[0.15em]">
          LOOP REPEATS · COMPOUNDS REVENUE
        </span>
      </motion.div>
    </div>
  );
}

function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setActiveIndex(prev => wrap(0, 6, prev + 1));
      setExpandedNode(null);
    } else if (info.offset.x > threshold) {
      setActiveIndex(prev => wrap(0, 6, prev - 1));
      setExpandedNode(null);
    }
    setIsDragging(false);
  };

  const energyProgress = useMotionValue(0);
  const smoothEnergy = useSpring(energyProgress, { stiffness: 80, damping: 20 });

  useEffect(() => {
    energyProgress.set((activeIndex + 1) / 6);
  }, [activeIndex, energyProgress]);

  const node = profitNodes[activeIndex];
  const Icon = node.icon;

  return (
    <div className="md:hidden relative" data-testid="profit-loop-mobile">
      <div className="absolute left-4 top-0 bottom-0 w-[3px] rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-white/5" />
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full origin-top"
          style={{
            scaleY: smoothEnergy,
            background: "linear-gradient(to bottom, #67E8F9, #93C5FD, #A78BFA, #F472B6, #FBBF24, #34D399)",
            filter: "drop-shadow(0 0 8px rgba(103,232,249,0.6))",
            height: "100%",
          }}
        />
        {profitNodes.map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10"
            style={{ top: `${(i / 5) * 100}%` }}
            animate={{
              borderColor: i <= activeIndex ? "#67E8F9" : "rgba(255,255,255,0.15)",
              backgroundColor: i <= activeIndex ? "#67E8F9" : "rgba(24,24,27,1)",
              boxShadow: i === activeIndex ? "0 0 12px rgba(103,232,249,0.6)" : "none",
              scale: i === activeIndex ? 1.3 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>

      <div className="pl-10 pr-4 min-h-[420px] relative">
        <AnimatePresence mode="wait" custom={activeIndex}>
          <motion.div
            key={activeIndex}
            custom={activeIndex}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              className="rounded-2xl border border-primary/30 overflow-hidden relative"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                backgroundColor: "rgba(24,24,27,0.8)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  boxShadow: `inset 0 0 40px rgba(103,232,249,0.06), 0 0 30px rgba(103,232,249,0.1)`,
                }}
              />

              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-primary/50 tracking-[0.2em] uppercase">
                    Node {node.id} of 06
                  </span>
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                    animate={{ boxShadow: [`0 0 6px ${node.color}`, `0 0 16px ${node.color}`, `0 0 6px ${node.color}`] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-primary/30"
                  style={{
                    backgroundColor: "rgba(103,232,249,0.12)",
                    boxShadow: "0 0 24px rgba(103,232,249,0.2)",
                  }}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </motion.div>

                <h4 className="text-xl font-display font-semibold text-white mb-1">
                  {node.title}
                </h4>
                <span className="text-xs font-mono text-primary/60 block mb-3">
                  {node.subtitle}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {node.context}
                </p>

                <motion.button
                  className="flex items-center gap-2 text-xs font-mono text-primary/70 tracking-wider uppercase"
                  onClick={() => {
                    if (!isDragging) {
                      setExpandedNode(expandedNode === activeIndex ? null : activeIndex);
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`profit-node-mobile-expand-${node.id}`}
                >
                  <span>View Specifications</span>
                  <motion.div
                    animate={{ rotate: expandedNode === activeIndex ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedNode === activeIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <ul className="space-y-3">
                          {node.specs.map((spec, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.06 }}
                            >
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: node.color }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              />
                              <span className="text-sm text-slate-300 leading-relaxed">{spec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-6">
          {profitNodes.map((_, index) => (
            <motion.button
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: index === activeIndex ? "#67E8F9" : "rgba(255,255,255,0.15)",
                scale: index === activeIndex ? 1.5 : 1,
                boxShadow: index === activeIndex ? "0 0 8px rgba(103,232,249,0.5)" : "none",
              }}
              onClick={() => {
                setActiveIndex(index);
                setExpandedNode(null);
              }}
              aria-label={`Go to node ${index + 1}`}
              data-testid={`profit-node-mobile-${profitNodes[index].id}`}
            />
          ))}
        </div>

        <motion.p
          className="text-center text-xs text-primary/40 font-mono tracking-wider mt-4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          SWIPE TO NAVIGATE · TAP TO EXPAND
        </motion.p>
      </div>
    </div>
  );
}

export function ProfitLoopSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="section-profit-loop"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: gridOpacity }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.4)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              background: [
                "radial-gradient(circle, rgba(103,232,249,0.04) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(147,197,253,0.06) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(103,232,249,0.04) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(80px)" }}
          />
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.2), transparent)",
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.2), transparent)",
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono text-primary mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                boxShadow: ["0 0 4px #67E8F9", "0 0 12px #67E8F9", "0 0 4px #67E8F9"],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            The SimpleSequence™ Profit Loop
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight text-white">
            You're getting leads. You just don't have a system to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 animate-gradient-x">
              maximize your marketing ROI.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We align your entire customer journey into one intelligent flow.
          </p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-primary/50"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="font-mono text-xs tracking-[0.15em] hidden md:inline">USE ARROWS OR CLICK TO NAVIGATE</span>
            <span className="font-mono text-xs tracking-[0.15em] md:hidden">SWIPE TO EXPLORE THE LOOP</span>
          </motion.div>
        </motion.div>

        <DesktopCarousel />
        <MobileCarousel />
      </div>
    </section>
  );
}
