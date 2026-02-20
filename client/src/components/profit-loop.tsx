import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Radio, Zap, Cog, RefreshCw, Star, Database, ChevronDown } from "lucide-react";

const TEAL = "#00F2FF";
const TEAL_DIM = "rgba(0,242,255,0.15)";
const TEAL_GLOW = "rgba(0,242,255,0.6)";
const OBSIDIAN = "#0A0A0A";

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
  }
];

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function Port({ side, isActive }: { side: "in" | "out"; isActive: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-20"
      style={{
        [side === "in" ? "left" : "right"]: "-7px",
      }}
      animate={{
        borderColor: isActive ? TEAL : "rgba(0,242,255,0.25)",
        backgroundColor: isActive ? TEAL : "rgba(0,242,255,0.05)",
        boxShadow: isActive
          ? `0 0 12px ${TEAL_GLOW}, 0 0 24px rgba(0,242,255,0.3)`
          : "none",
      }}
      transition={{ duration: 0.4 }}
    />
  );
}

function SwipeHint({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.7, 0] }}
        transition={{ duration: 3.5, times: [0, 0.15, 0.75, 1] }}
      >
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 2, repeat: 1, ease: "easeInOut" }}
        >
          <path
            d="M24 4C20 4 17 7 17 11V22L14 19C12.5 17.5 10 17.5 8.5 19C7 20.5 7 23 8.5 24.5L19 35C20 36 21.5 37 23.5 37H32C36.4 37 40 33.4 40 29V20C40 18 38.5 16.5 36.5 16.5C35.5 16.5 34.7 16.9 34 17.5V15.5C34 13.5 32.5 12 30.5 12C29.5 12 28.7 12.4 28 13V11C28 9 26.5 7.5 24.5 7.5C24.3 7.5 24.2 7.5 24 7.6V11"
            stroke={TEAL}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </motion.svg>
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
          Swipe to navigate
        </span>
      </motion.div>
    </motion.div>
  );
}

function ConnectorLines({ activeIndex, containerRef }: { activeIndex: number; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const NODE_BASE = 300;

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setDims({ w: rect.width, h: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef]);

  if (dims.w === 0) return null;

  const centerX = dims.w / 2;
  const centerY = dims.h / 2;

  const getNodeCenter = (offset: number) => {
    const isCenter = offset === 0;
    const isAdj = Math.abs(offset) === 1;
    const isBackAdj = Math.abs(offset) === 2;

    let x: number, y: number, scale: number;
    if (isCenter) {
      x = 0; y = -60; scale = 1.15;
    } else if (isAdj) {
      x = offset * 340; y = -60; scale = 0.82;
    } else if (isBackAdj) {
      x = (offset > 0 ? 1 : -1) * 220; y = 180; scale = 0.45;
    } else {
      x = 0; y = 220; scale = 0.38;
    }
    return { cx: centerX + x, cy: centerY + y, scale };
  };

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > 3) offset -= 6;
    if (offset < -3) offset += 6;
    return offset;
  };

  const segments: { fromIdx: number; toIdx: number; fromOffset: number; toOffset: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const nextI = (i + 1) % 6;
    segments.push({
      fromIdx: i,
      toIdx: nextI,
      fromOffset: getOffset(i),
      toOffset: getOffset(nextI),
    });
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      viewBox={`0 0 ${dims.w} ${dims.h}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="connectorGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {segments.map(({ fromIdx, toIdx, fromOffset, toOffset }) => {
        const from = getNodeCenter(fromOffset);
        const to = getNodeCenter(toOffset);

        const fromW = (NODE_BASE * from.scale) / 2;
        const toW = (NODE_BASE * to.scale) / 2;
        const fromH = (NODE_BASE * from.scale) / 2;
        const toH = (NODE_BASE * to.scale) / 2;

        let startX: number, startY: number, endX: number, endY: number;
        let cp1x: number, cp1y: number, cp2x: number, cp2y: number;

        const fromFront = Math.abs(fromOffset) <= 1;
        const toFront = Math.abs(toOffset) <= 1;

        if (fromFront && toFront) {
          startX = from.cx + fromW + 7;
          startY = from.cy;
          endX = to.cx - toW - 7;
          endY = to.cy;
          const gap = endX - startX;
          const curveH = Math.min(Math.abs(gap) * 0.35, 40);
          cp1x = startX + gap * 0.3;
          cp1y = startY - curveH;
          cp2x = endX - gap * 0.3;
          cp2y = endY - curveH;
        } else if (fromFront && !toFront) {
          startX = from.cx + (fromOffset >= 0 ? fromW + 7 : 0);
          startY = from.cy + fromH;
          endX = to.cx + (toOffset > 0 ? toW + 5 : toOffset < 0 ? -toW - 5 : 0);
          endY = to.cy - toH;
          if (fromOffset >= 0) {
            startX = from.cx + fromW * 0.7;
            startY = from.cy + fromH;
          }
          cp1x = startX + (endX - startX) * 0.1;
          cp1y = startY + (endY - startY) * 0.5;
          cp2x = endX - (endX - startX) * 0.1;
          cp2y = endY - (endY - startY) * 0.3;
        } else if (!fromFront && !toFront) {
          if (fromOffset > 0 && toOffset <= 0) {
            startX = from.cx - fromW - 5;
            startY = from.cy + fromH * 0.3;
            endX = to.cx + toW + 5;
            endY = to.cy + toH * 0.3;
          } else if (fromOffset <= 0 && toOffset < 0) {
            startX = from.cx - fromW - 5;
            startY = from.cy;
            endX = to.cx + toW + 5;
            endY = to.cy;
          } else {
            startX = from.cx + fromW + 5;
            startY = from.cy;
            endX = to.cx - toW - 5;
            endY = to.cy;
          }
          const midX = (startX + endX) / 2;
          const midY = Math.max(startY, endY) + 30;
          cp1x = midX;
          cp1y = midY;
          cp2x = midX;
          cp2y = midY;
        } else {
          startX = from.cx - fromW * 0.7;
          startY = from.cy - fromH;
          endX = to.cx - toW - 7;
          endY = to.cy + toH * 0.5;
          cp1x = startX - (startX - endX) * 0.1;
          cp1y = startY - (startY - endY) * 0.5;
          cp2x = endX + (startX - endX) * 0.1;
          cp2y = endY + (startY - endY) * 0.3;
        }

        const isActive = fromIdx === activeIndex || toIdx === activeIndex;
        const opacityVal = isActive ? 0.6 : 0.12;

        const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

        return (
          <g key={`${fromIdx}-${toIdx}`}>
            <motion.path
              d={pathD}
              fill="none"
              stroke={TEAL}
              strokeWidth={isActive ? 1.5 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: opacityVal }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                filter: isActive ? "url(#connectorGlow)" : "none",
              }}
            />
            <motion.circle
              cx={startX}
              cy={startY}
              r={isActive ? 4 : 2.5}
              fill={TEAL}
              initial={{ opacity: 0 }}
              animate={{ opacity: opacityVal }}
              style={{
                filter: isActive ? "url(#connectorGlow)" : "none",
              }}
            />
            <motion.circle
              cx={endX}
              cy={endY}
              r={isActive ? 4 : 2.5}
              fill={TEAL}
              initial={{ opacity: 0 }}
              animate={{ opacity: opacityVal }}
              style={{
                filter: isActive ? "url(#connectorGlow)" : "none",
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function DesktopCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselAreaRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((newDirection: number) => {
    setActiveIndex(prev => wrap(0, 6, prev + newDirection));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => navigate(1), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { navigate(-1); setIsAutoPlaying(false); setShowHint(false); }
      if (e.key === "ArrowRight") { navigate(1); setIsAutoPlaying(false); setShowHint(false); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) { navigate(1); setIsAutoPlaying(false); setShowHint(false); }
    else if (info.offset.x > threshold) { navigate(-1); setIsAutoPlaying(false); setShowHint(false); }
  };

  const getNodeProps = (index: number) => {
    let offset = index - activeIndex;
    if (offset > 3) offset -= 6;
    if (offset < -3) offset += 6;

    const isCenter = offset === 0;
    const isAdj = Math.abs(offset) === 1;
    const isBackAdj = Math.abs(offset) === 2;
    const isBackCenter = Math.abs(offset) === 3;

    const isFrontRow = isCenter || isAdj;
    const isBackRow = isBackAdj || isBackCenter;

    let x: number, y: number, scale: number, opacity: number, zIndex: number, blur: number;

    if (isCenter) {
      x = 0; y = -60; scale = 1.15; opacity = 1; zIndex = 50; blur = 0;
    } else if (isAdj) {
      x = offset * 340; y = -60; scale = 0.82; opacity = 0.8; zIndex = 30; blur = 0.5;
    } else if (isBackAdj) {
      x = (offset > 0 ? 1 : -1) * 220; y = 180; scale = 0.45; opacity = 0.4; zIndex = 10; blur = 2;
    } else {
      x = 0; y = 220; scale = 0.38; opacity = 0.3; zIndex = 5; blur = 3;
    }

    return {
      x, y, scale, opacity, zIndex, blur,
      pointerEvents: "auto" as "none" | "auto",
      isCenter,
      isFrontRow,
      isBackRow,
      offset,
    };
  };

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      data-testid="profit-loop-desktop"
    >
      <div ref={carouselAreaRef} className="relative h-[700px] overflow-hidden">
        <ConnectorLines activeIndex={activeIndex} containerRef={carouselAreaRef} />

        <AnimatePresence>
          {showHint && (
            <SwipeHint onComplete={() => setShowHint(false)} />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {profitNodes.map((node, index) => {
            const props = getNodeProps(index);
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  width: "300px",
                  height: "300px",
                  pointerEvents: props.pointerEvents,
                  filter: `blur(${props.blur}px)`,
                }}
                animate={{
                  x: props.x,
                  y: props.y,
                  scale: props.scale,
                  opacity: props.opacity,
                  zIndex: props.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 26,
                  mass: 0.9,
                }}
                onClick={() => {
                  if (!props.isCenter) {
                    let o = index - activeIndex;
                    if (o > 3) o -= 6;
                    if (o < -3) o += 6;
                    navigate(o);
                    setIsAutoPlaying(false);
                    setShowHint(false);
                  }
                }}
                data-testid={`profit-node-${node.id}`}
              >
                <div className="relative w-full h-full">
                  <Port side="in" isActive={props.isCenter} />
                  <Port side="out" isActive={props.isCenter} />

                  <motion.div
                    className="w-full h-full rounded-xl border overflow-hidden relative"
                    animate={{
                      borderColor: props.isCenter ? "rgba(0,242,255,0.5)" : "rgba(0,242,255,0.08)",
                    }}
                    style={{
                      backgroundColor: OBSIDIAN,
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                    }}
                  >
                    {props.isCenter && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            boxShadow: `inset 0 0 50px rgba(0,242,255,0.06), 0 0 40px rgba(0,242,255,0.12), 0 0 80px rgba(0,242,255,0.04)`,
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          animate={{ opacity: [0.15, 0.35, 0.15] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            background: `linear-gradient(135deg, rgba(0,242,255,0.1), transparent 50%, rgba(0,242,255,0.08))`,
                          }}
                        />
                      </>
                    )}

                    <div className="relative z-10 p-5 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500"
                        >
                          Node {node.id}
                        </span>
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          animate={{
                            backgroundColor: props.isCenter ? TEAL : TEAL_DIM,
                            boxShadow: props.isCenter ? `0 0 10px ${TEAL_GLOW}` : "none",
                          }}
                        />
                      </div>

                      <motion.div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 border"
                        animate={{
                          backgroundColor: props.isCenter ? "rgba(0,242,255,0.12)" : "rgba(0,242,255,0.04)",
                          borderColor: props.isCenter ? "rgba(0,242,255,0.4)" : "rgba(0,242,255,0.1)",
                          boxShadow: props.isCenter ? `0 0 16px rgba(0,242,255,0.25)` : "none",
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: TEAL }} />
                      </motion.div>

                      <h4 className="text-sm font-display font-semibold mb-0.5 leading-tight text-white">
                        {node.title}
                      </h4>
                      <span
                        className="text-[10px] font-mono block mb-2 text-slate-400"
                      >
                        {node.subtitle}
                      </span>
                      <p className="text-xs leading-relaxed flex-shrink-0 text-slate-400">
                        {node.context}
                      </p>

                      <AnimatePresence>
                        {props.isCenter && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden mt-auto"
                          >
                            <div className="pt-3 border-t" style={{ borderColor: "rgba(0,242,255,0.1)" }}>
                              <span
                                className="text-[9px] font-mono tracking-[0.2em] uppercase block mb-2 text-zinc-500"
                              >
                                Specifications
                              </span>
                              <ul className="space-y-1.5">
                                {node.specs.map((spec, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-1.5"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                  >
                                    <motion.div
                                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                                      style={{ backgroundColor: TEAL }}
                                      animate={{ opacity: [0.4, 1, 0.4] }}
                                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                                    />
                                    <span className="text-[11px] leading-relaxed text-slate-300">{spec}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="flex items-center justify-center gap-2 mt-4"
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <RefreshCw className="w-3.5 h-3.5" style={{ color: TEAL }} />
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-zinc-500"
        >
          LOOP REPEATS · COMPOUNDS REVENUE
        </span>
      </motion.div>
    </div>
  );
}

function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);

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
    setShowHint(false);
  };

  const node = profitNodes[activeIndex];
  const Icon = node.icon;

  return (
    <div className="md:hidden relative" data-testid="profit-loop-mobile">
      <div
        className="absolute left-0 right-0 h-[2px] pointer-events-none z-[4]"
        style={{
          top: "calc(50% - 40px)",
          backgroundColor: "rgba(0,242,255,0.06)",
        }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full"
          animate={{ width: `${((activeIndex + 1) / 6) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          style={{
            background: `linear-gradient(90deg, ${TEAL}, ${TEAL})`,
            boxShadow: `0 0 10px ${TEAL_GLOW}`,
          }}
        />
      </div>

      <div className="relative px-4">
        <div className="relative z-10 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              className="w-full max-w-[320px]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <div className="relative w-full h-full">
                <Port side="in" isActive={true} />
                <Port side="out" isActive={true} />

                <div
                  className="w-full h-full rounded-xl border overflow-hidden relative"
                  style={{
                    borderColor: "rgba(0,242,255,0.4)",
                    backgroundColor: OBSIDIAN,
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{ opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                      boxShadow: `inset 0 0 40px rgba(0,242,255,0.05), 0 0 30px rgba(0,242,255,0.08)`,
                    }}
                  />

                  <div className="relative z-10 p-5 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500"
                      >
                        Node {node.id} / 06
                      </span>
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: TEAL }}
                        animate={{ boxShadow: [`0 0 6px ${TEAL_GLOW}`, `0 0 14px ${TEAL_GLOW}`, `0 0 6px ${TEAL_GLOW}`] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>

                    <motion.div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 border"
                      style={{
                        backgroundColor: "rgba(0,242,255,0.1)",
                        borderColor: "rgba(0,242,255,0.3)",
                        boxShadow: `0 0 20px rgba(0,242,255,0.15)`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: TEAL }} />
                    </motion.div>

                    <h4 className="text-base font-display font-semibold mb-0.5 text-white">
                      {node.title}
                    </h4>
                    <span
                      className="text-[10px] font-mono block mb-2 text-slate-400"
                    >
                      {node.subtitle}
                    </span>
                    <p className="text-xs leading-relaxed mb-3 text-slate-400">
                      {node.context}
                    </p>

                    <motion.button
                      className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase mt-auto text-zinc-400"
                      onClick={() => {
                        if (!isDragging) {
                          setExpandedNode(expandedNode === activeIndex ? null : activeIndex);
                        }
                      }}
                      whileTap={{ scale: 0.97 }}
                      data-testid={`profit-node-mobile-expand-${node.id}`}
                    >
                      <span>Specifications</span>
                      <motion.div
                        animate={{ rotate: expandedNode === activeIndex ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showHint && (
              <SwipeHint onComplete={() => setShowHint(false)} />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {expandedNode !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden max-w-[320px] mx-auto mt-3"
            >
              <div
                className="rounded-lg border p-4"
                style={{
                  borderColor: "rgba(0,242,255,0.15)",
                  backgroundColor: "rgba(10,10,10,0.95)",
                }}
              >
                <ul className="space-y-2.5">
                  {profitNodes[expandedNode].specs.map((spec, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: TEAL }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span className="text-sm leading-relaxed text-slate-300">{spec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-5">
          {profitNodes.map((_, index) => (
            <motion.button
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: index === activeIndex ? TEAL : "rgba(0,242,255,0.12)",
                scale: index === activeIndex ? 1.4 : 1,
                boxShadow: index === activeIndex ? `0 0 8px ${TEAL_GLOW}` : "none",
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

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 0.04, 0.04, 0]);

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
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,242,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              background: [
                "radial-gradient(circle, rgba(0,242,255,0.03) 0%, transparent 65%)",
                "radial-gradient(circle, rgba(0,242,255,0.05) 0%, transparent 65%)",
                "radial-gradient(circle, rgba(0,242,255,0.03) 0%, transparent 65%)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(60px)" }}
          />
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(0,242,255,0.15), transparent)` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(0,242,255,0.15), transparent)` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight text-white">
            You're getting leads. You just don't have a system to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${TEAL}, #67E8F9, ${TEAL})`,
                backgroundSize: "200% 200%",
                animation: "gradient-x 4s ease infinite",
              }}
            >
              maximize your marketing ROI.
            </span>
          </h2>

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-slate-400">
            We align your entire customer journey into one intelligent flow.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono backdrop-blur-sm"
            style={{
              borderColor: "rgba(0,242,255,0.25)",
              backgroundColor: "rgba(0,242,255,0.04)",
              color: TEAL,
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: TEAL }}
              animate={{
                boxShadow: [`0 0 4px ${TEAL}`, `0 0 14px ${TEAL}`, `0 0 4px ${TEAL}`],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Sequential Profit Loop™
          </div>
        </motion.div>

        <DesktopCarousel />
        <MobileCarousel />
      </div>
    </section>
  );
}
