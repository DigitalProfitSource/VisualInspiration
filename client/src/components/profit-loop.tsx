import { motion, AnimatePresence, useScroll, useTransform, useInView, PanInfo } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Globe, Zap, RefreshCw, Star, Database } from "lucide-react";
import aiPoweredPresenceImg from "@assets/AI_Powered_Precence_1771960529215.webp";
import automationImplementationImg from "@assets/Automation_Implementation_1771968107967.webp";
import persistentFollowUpImg from "@assets/Persistent_Follow-Up_1772071745452.webp";
import reputationFlywheelImg from "@assets/Reputation_Flywheel_1772072730522.webp";
import revenueReactivationImg from "@assets/Revenue_Reactivation_1772074531525.webp";

const TEAL = "#6EE0F7";
const TEAL_DIM = "rgba(110,224,247,0.15)";
const TEAL_GLOW = "rgba(110,224,247,0.6)";
const OBSIDIAN = "#0A0A0A";

const NODE_COUNT = 5;

const profitNodes = [
  {
    id: "01",
    title: "AI-Powered Presence",
    subtitle: "Machine-Readable Standard",
    context: "Re-architecting your web presence for the generative search era — so AI agents recommend you, not just rank you.",
    icon: Globe,
    image: aiPoweredPresenceImg,
    specs: [
      "AI-Ready Web-Presence Optimization (ChatGPT, Perplexity, Google AI Overviews)",
      "Omnichannel Intake Architecture (GMB, Web, SMS, Social DMs)",
      "24/7 AI Receptionist — Multimodal intent qualification & instant booking",
      "AI Voice Phone Answering — Intelligent after-hours & overflow routing"
    ],
  },
  {
    id: "02",
    title: "Automation & Implementation",
    subtitle: "Zero-Manual Architecture",
    context: "Your CRM, calendars, and billing sync instantly — zero manual data entry, sub-60s lead response.",
    icon: Zap,
    image: automationImplementationImg,
    specs: [
      "Instant CRM & Calendar Synchronization",
      "Sub-60s \"Speed-to-Lead\" SMS/Voice Engagement",
      "Automated Billing & Invoice Integration",
      "Zero-Manual Data Entry Architecture"
    ],
  },
  {
    id: "03",
    title: "Persistent Follow-Up",
    subtitle: "Recovering Lost Revenue",
    context: "Automated nurture sequences that chase no-shows and stale quotes until they book or buy.",
    icon: RefreshCw,
    image: persistentFollowUpImg,
    specs: [
      "Automated Nurture for No-Shows and Canceled Appointments",
      "Intelligent Quote Follow-Up Sequences",
      "Behavior-Based Re-engagement Timing",
      "Expired Estimate Recovery"
    ],
  },
  {
    id: "04",
    title: "Reputation Flywheel",
    subtitle: "Bulletproofing Your Brand",
    context: "Automated 5-star review collection with internal interception of negative feedback.",
    icon: Star,
    image: reputationFlywheelImg,
    specs: [
      "Automated 5-Star Review Collection",
      "Internal Sentiment Detection (Intercept Negative Feedback)",
      "Reputation Velocity Tracking",
      "Automated Response Templates"
    ],
  },
  {
    id: "05",
    title: "Revenue Reactivation (DBR)",
    subtitle: "Database Reactivation",
    context: "Re-engage your existing database to trigger immediate cash flow with zero additional ad spend.",
    icon: Database,
    image: revenueReactivationImg,
    specs: [
      "Database Reactivation Campaigns (Win-Backs)",
      "Dormant Contact Re-engagement",
      "Seasonal & Lifecycle-Based Offers",
      "Immediate Cash Flow Generation from Existing Assets"
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
        borderColor: isActive ? TEAL : "rgba(110,224,247,0.25)",
        backgroundColor: isActive ? TEAL : "rgba(110,224,247,0.05)",
        boxShadow: isActive
          ? `0 0 12px ${TEAL_GLOW}, 0 0 24px rgba(110,224,247,0.3)`
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
  const NODE_BASE = 370;

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

    let x: number, y: number, scale: number;
    if (isCenter) {
      x = 0; y = 60; scale = 1.15;
    } else if (isAdj) {
      x = offset * 410; y = 60; scale = 0.82;
    } else {
      x = (offset > 0 ? 1 : -1) * 220; y = -210; scale = 0.45;
    }
    return { cx: centerX + x, cy: centerY + y, scale };
  };

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > 2) offset -= NODE_COUNT;
    if (offset < -2) offset += NODE_COUNT;
    return offset;
  };

  const segments: { fromIdx: number; toIdx: number; fromOffset: number; toOffset: number }[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const nextI = (i + 1) % NODE_COUNT;
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
          startX = from.cx + (fromOffset >= 0 ? fromW * 0.7 : -fromW * 0.7);
          startY = from.cy - fromH;
          endX = to.cx + (toOffset > 0 ? toW + 5 : toOffset < 0 ? -toW - 5 : 0);
          endY = to.cy + toH;
          cp1x = startX + (endX - startX) * 0.15;
          cp1y = startY + (endY - startY) * 0.5;
          cp2x = endX - (endX - startX) * 0.15;
          cp2y = endY - (endY - startY) * 0.3;
        } else if (!fromFront && !toFront) {
          if (fromOffset > 0 && toOffset <= 0) {
            startX = from.cx - fromW - 5;
            startY = from.cy - fromH * 0.3;
            endX = to.cx + toW + 5;
            endY = to.cy - toH * 0.3;
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
          const midY = Math.min(startY, endY) - 30;
          cp1x = midX;
          cp1y = midY;
          cp2x = midX;
          cp2y = midY;
        } else {
          startX = from.cx - fromW * 0.7;
          startY = from.cy + fromH;
          endX = to.cx - toW - 7;
          endY = to.cy - toH * 0.5;
          cp1x = startX + (endX - startX) * 0.15;
          cp1y = startY + (endY - startY) * 0.5;
          cp2x = endX - (endX - startX) * 0.15;
          cp2y = endY - (endY - startY) * 0.3;
        }

        const isActive = fromIdx === activeIndex || toIdx === activeIndex;
        const opacityVal = isActive ? 0.6 : 0.12;

        const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
        const pulseId = `pulse-path-${fromIdx}-${toIdx}`;

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
            {isActive && (
              <>
                <path id={pulseId} d={pathD} fill="none" stroke="none" />
                <circle r="3" fill={TEAL} opacity="0.9" filter="url(#connectorGlow)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${fromIdx * 0.4}s`}
                  >
                    <mpath href={`#${pulseId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
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

function DesktopCarousel({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselAreaRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((newDirection: number) => {
    setActiveIndex(prev => wrap(0, NODE_COUNT, prev + newDirection));
  }, [setActiveIndex]);

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
    if (offset > 2) offset -= NODE_COUNT;
    if (offset < -2) offset += NODE_COUNT;

    const isCenter = offset === 0;
    const isAdj = Math.abs(offset) === 1;

    const isFrontRow = isCenter || isAdj;
    const isBackRow = !isFrontRow;

    let x: number, y: number, scale: number, opacity: number, zIndex: number, blur: number;

    if (isCenter) {
      x = 0; y = 60; scale = 1.15; opacity = 1; zIndex = 50; blur = 0;
    } else if (isAdj) {
      x = offset * 410; y = 60; scale = 0.82; opacity = 0.85; zIndex = 30; blur = 0;
    } else {
      x = (offset > 0 ? 1 : -1) * 220; y = -210; scale = 0.45; opacity = 0.55; zIndex = 10; blur = 0;
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
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      data-testid="profit-loop-desktop"
    >
      <div ref={carouselAreaRef} className="relative h-[820px] overflow-hidden">
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
                  width: "370px",
                  height: "370px",
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
                    if (o > 2) o -= NODE_COUNT;
                    if (o < -2) o += NODE_COUNT;
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
                      borderColor: props.isCenter ? "rgba(110,224,247,0.5)" : "rgba(110,224,247,0.08)",
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
                            boxShadow: `inset 0 0 50px rgba(110,224,247,0.06), 0 0 40px rgba(110,224,247,0.12), 0 0 80px rgba(110,224,247,0.04)`,
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          animate={{ opacity: [0.15, 0.35, 0.15] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            background: `linear-gradient(135deg, rgba(110,224,247,0.1), transparent 50%, rgba(110,224,247,0.08))`,
                          }}
                        />
                      </>
                    )}

                    {node.image ? (
                      <div className="relative z-10 w-full h-full">
                        <img
                          src={node.image}
                          alt={node.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        <div className="absolute top-3 left-4 flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-zinc-400">{node.id}</span>
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            animate={{
                              backgroundColor: props.isCenter ? TEAL : TEAL_DIM,
                              boxShadow: props.isCenter ? `0 0 10px ${TEAL_GLOW}` : "none",
                            }}
                          />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h4 className="text-sm font-display font-semibold leading-tight text-white drop-shadow-lg">
                            {node.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-300/80 drop-shadow-lg">
                            {node.subtitle}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 p-5 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-mono font-bold text-zinc-500">{node.id}</span>
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            animate={{
                              backgroundColor: props.isCenter ? TEAL : TEAL_DIM,
                              boxShadow: props.isCenter ? `0 0 10px ${TEAL_GLOW}` : "none",
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-display font-semibold leading-tight text-white">
                            {node.title}
                          </h4>
                          <motion.div
                            className="w-7 h-7 rounded-md flex items-center justify-center border flex-shrink-0"
                            animate={{
                              backgroundColor: props.isCenter ? "rgba(110,224,247,0.12)" : "rgba(110,224,247,0.04)",
                              borderColor: props.isCenter ? "rgba(110,224,247,0.4)" : "rgba(110,224,247,0.1)",
                              boxShadow: props.isCenter ? `0 0 16px rgba(110,224,247,0.25)` : "none",
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: TEAL }} />
                          </motion.div>
                        </div>
                        <span
                          className="text-[10px] font-mono block mb-2 text-slate-400"
                        >
                          {node.subtitle}
                        </span>
                        <p className="text-xs leading-relaxed flex-shrink-0 text-slate-400">
                          {node.context}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}

function DesktopCarouselWithFooter() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="hidden md:block">
      <DesktopCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <SpecFooter activeIndex={activeIndex} />
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 18);
    return () => clearTimeout(timer);
  }, [started, displayed, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          className="inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom"
          style={{ backgroundColor: TEAL }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  );
}

function SpecFooter({ activeIndex }: { activeIndex: number }) {
  const node = profitNodes[activeIndex];
  const prevIndexRef = useRef(activeIndex);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      prevIndexRef.current = activeIndex;
      setKey(k => k + 1);
    }
  }, [activeIndex]);

  return (
    <motion.div
      className="mt-2 max-w-3xl mx-auto"
      data-testid="spec-footer"
    >
      <div
        className="rounded-xl border p-6 backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(10,10,10,0.9)",
          borderColor: "rgba(110,224,247,0.12)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: TEAL }}
            animate={{
              boxShadow: [`0 0 4px ${TEAL_GLOW}`, `0 0 12px ${TEAL_GLOW}`, `0 0 4px ${TEAL_GLOW}`],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              Module {node.id} — {node.title}
            </motion.span>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {node.specs.map((spec, i) => (
                <li key={`${key}-${i}`} className="flex items-start gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: TEAL }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                  />
                  <span className="text-sm leading-relaxed text-slate-300">
                    <TypewriterText text={spec} delay={i * 0.15} />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setActiveIndex(prev => wrap(0, NODE_COUNT, prev + 1));
    } else if (info.offset.x > threshold) {
      setActiveIndex(prev => wrap(0, NODE_COUNT, prev - 1));
    }
    setShowHint(false);
  };

  const node = profitNodes[activeIndex];
  const Icon = node.icon;

  return (
    <div className="md:hidden relative" data-testid="profit-loop-mobile">
      <div className="flex gap-4 pl-3 pr-4">
        <div className="flex flex-col items-center pt-2 pb-2 flex-shrink-0">
          <div
            className="relative w-[3px] rounded-full flex-1"
            style={{ backgroundColor: "rgba(110,224,247,0.08)" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              animate={{
                height: `${((activeIndex + 1) / NODE_COUNT) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              style={{
                background: `linear-gradient(180deg, ${TEAL}, rgba(110,224,247,0.3))`,
                boxShadow: `0 0 8px ${TEAL_GLOW}`,
              }}
            />
            {profitNodes.map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full cursor-pointer"
                style={{
                  top: `${(i / (NODE_COUNT - 1)) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  backgroundColor: i <= activeIndex ? TEAL : "rgba(110,224,247,0.15)",
                  scale: i === activeIndex ? 1.6 : 1,
                  boxShadow: i === activeIndex ? `0 0 10px ${TEAL_GLOW}` : "none",
                }}
                onClick={() => setActiveIndex(i)}
                data-testid={`profit-node-mobile-${profitNodes[i].id}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
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
                onDragEnd={handleDragEnd}
                className="w-full"
              >
                <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                  <Port side="in" isActive={true} />
                  <Port side="out" isActive={true} />

                  <div
                    className="w-full h-full rounded-xl border overflow-hidden relative"
                    style={{
                      borderColor: "rgba(110,224,247,0.4)",
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
                        boxShadow: `inset 0 0 40px rgba(110,224,247,0.05), 0 0 30px rgba(110,224,247,0.08)`,
                      }}
                    />

                    {node.image ? (
                      <div className="relative z-10 w-full h-full">
                        <img
                          src={node.image}
                          alt={node.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        <div className="absolute top-3 left-4 flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
                            Node {node.id} / 05
                          </span>
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: TEAL }}
                            animate={{ boxShadow: [`0 0 6px ${TEAL_GLOW}`, `0 0 14px ${TEAL_GLOW}`, `0 0 6px ${TEAL_GLOW}`] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h4 className="text-base font-display font-semibold mb-0.5 text-white drop-shadow-lg">
                            {node.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-300/80 drop-shadow-lg">
                            {node.subtitle}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 p-5 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500"
                          >
                            Node {node.id} / 05
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
                            backgroundColor: "rgba(110,224,247,0.1)",
                            borderColor: "rgba(110,224,247,0.3)",
                            boxShadow: `0 0 20px rgba(110,224,247,0.15)`,
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
                        <p className="text-xs leading-relaxed text-slate-400">
                          {node.context}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="mt-3"
                  >
                    <div
                      className="rounded-lg border p-4"
                      style={{
                        borderColor: "rgba(110,224,247,0.12)",
                        backgroundColor: "rgba(10,10,10,0.9)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: TEAL }}
                          animate={{
                            boxShadow: [`0 0 3px ${TEAL_GLOW}`, `0 0 8px ${TEAL_GLOW}`, `0 0 3px ${TEAL_GLOW}`],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                          Specifications
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {node.specs.map((spec, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                          >
                            <motion.div
                              className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: TEAL }}
                            />
                            <span className="text-xs leading-relaxed text-slate-300">{spec}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {showHint && (
                <SwipeHint onComplete={() => setShowHint(false)} />
              )}
            </AnimatePresence>
          </div>
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
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.05, 0.18, 0.18, 0.05]);

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
              backgroundImage: `linear-gradient(rgba(110,224,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(110,224,247,0.3) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            }}
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              background: [
                "radial-gradient(circle, rgba(110,224,247,0.03) 0%, transparent 65%)",
                "radial-gradient(circle, rgba(110,224,247,0.05) 0%, transparent 65%)",
                "radial-gradient(circle, rgba(110,224,247,0.03) 0%, transparent 65%)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(60px)" }}
          />
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(110,224,247,0.15), transparent)` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(110,224,247,0.15), transparent)` }}
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
          className="flex justify-center -mb-4 relative z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono backdrop-blur-sm"
            style={{
              borderColor: "rgba(110,224,247,0.25)",
              backgroundColor: "rgba(110,224,247,0.04)",
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

        <DesktopCarouselWithFooter />
        <MobileCarousel />

        <MetricsStrip />
      </div>
    </section>
  );
}

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

const metrics = [
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

function MetricsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const count0 = useCountUp(metrics[0].value, 2, inView);
  const count1 = useCountUp(metrics[1].value, 2.2, inView);
  const count2 = useCountUp(metrics[2].value, 1.5, inView);
  const counts = [count0, count1, count2];

  return (
    <div ref={ref} className="mt-20 md:mt-24" data-testid="profit-loop-metrics">
      <div className="text-center mb-10">
        <motion.span 
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#6EE0F7] opacity-90"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clarity Delivered. Efficiency Unlocked.
        </motion.span>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            className="group relative rounded-xl border p-5 md:p-6 text-center transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: "rgba(10,10,10,0.8)",
              borderColor: "rgba(110,224,247,0.08)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              borderColor: "rgba(110,224,247,0.25)",
              backgroundColor: "rgba(10,10,10,0.95)",
              y: -3
            }}
            data-testid={`metric-card-${i}`}
          >
            <div className="relative z-10">
              <div className="mb-2 flex items-baseline justify-center gap-1">
                <span className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                  {metric.prefix}{counts[i]}
                </span>
                <span className="text-xs md:text-sm font-display font-medium text-[#6EE0F7]">
                  {metric.suffix}
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-none mx-auto">
                {metric.description}
              </p>
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(110,224,247,0.03) 0%, transparent 70%)"
              }}
            />
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  );
}
