import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { id: 1, label: "LEAD IN", x: 60, y: 190 },
  { id: 2, label: "QUALIFY", x: 140, y: 155 },
  { id: 3, label: "CONSULT", x: 220, y: 115 },
  { id: 4, label: "PROPOSE", x: 300, y: 75 },
  { id: 5, label: "CLOSE", x: 380, y: 35 },
];

const curvePath = "M 60 190 Q 100 175 140 155 Q 180 130 220 115 Q 260 95 300 75 Q 340 55 380 35";

export function MapSequencesDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-md aspect-[4/3]" 
      data-testid="map-sequences-diagram"
    >
      <motion.div
        className="absolute top-2 left-4 md:left-6"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-[11px] md:text-xs font-semibold text-primary tracking-wider">Map Sequences</span>
      </motion.div>

      <motion.div
        className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-[8px] font-mono text-primary/70 uppercase tracking-widest whitespace-nowrap">Progress</span>
      </motion.div>

      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="text-[8px] font-mono text-primary/50 uppercase tracking-widest whitespace-nowrap">Revenue</span>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-zinc-900/80">
          <span className="text-sm font-bold text-primary">02</span>
        </div>
      </motion.div>

      <svg
        viewBox="0 0 440 240"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(103,232,249,0.15))" }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.4)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.8)" />
            <stop offset="100%" stopColor="rgba(147,197,253,1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(103,232,249,1)" />
            <stop offset="100%" stopColor="rgba(147,197,253,1)" />
          </linearGradient>
        </defs>

        <rect
          x="50"
          y="20"
          width="370"
          height="190"
          fill="transparent"
          stroke="rgba(103,232,249,0.08)"
          strokeWidth="1"
          rx="8"
        />

        {[80, 120, 160, 200].map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1="50"
            y1={y}
            x2="420"
            y2={y}
            stroke="rgba(103,232,249,0.05)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
          />
        ))}
        {[100, 160, 220, 280, 340].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="20"
            x2={x}
            y2="210"
            stroke="rgba(103,232,249,0.03)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
          />
        ))}

        <motion.path
          d={curvePath}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />

        <motion.path
          d={curvePath}
          fill="none"
          stroke="rgba(103,232,249,0.3)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />

        {milestones.map((milestone, i) => (
          <motion.g key={milestone.id}>
            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="20"
              fill="rgba(103,232,249,0.1)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.25 }}
            />

            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="12"
              fill="rgba(24,24,27,0.95)"
              stroke="url(#dotGradient)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.25 }}
            />

            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="5"
              fill="url(#dotGradient)"
              initial={{ scale: 0 }}
              animate={isInView ? { 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.2 + i * 0.25,
                ease: "easeInOut"
              }}
            />

            <motion.text
              x={milestone.x}
              y={milestone.y - 22}
              textAnchor="middle"
              fill="rgba(103,232,249,0.9)"
              className="text-[9px] font-semibold uppercase tracking-wider"
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 + i * 0.25 }}
            >
              {milestone.label}
            </motion.text>
          </motion.g>
        ))}

        <motion.circle
          cx="380"
          cy="35"
          r="16"
          fill="none"
          stroke="rgba(147,197,253,0.6)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { 
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 2.5,
            ease: "easeOut"
          }}
        />
      </svg>
    </div>
  );
}
