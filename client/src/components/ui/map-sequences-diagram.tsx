import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { id: 1, label: "LEAD IN", x: 60, y: 190 },
  { id: 2, label: "QUALIFY", x: 140, y: 155 },
  { id: 3, label: "CONSULT", x: 220, y: 115 },
  { id: 4, label: "PROPOSE", x: 300, y: 75 },
  { id: 5, label: "CLOSE", x: 380, y: 35, isWin: true },
];

const curvePath = "M 60 190 Q 100 175 140 155 Q 180 130 220 115 Q 260 95 300 75 Q 340 55 380 35";

export function MapSequencesDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const totalMilestones = milestones.length;
  const sequenceDuration = 1.2;
  const sequenceDelay = 0.6;
  const totalSequenceTime = (totalMilestones - 1) * sequenceDelay + sequenceDuration;

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-md aspect-[4/3]" 
      data-testid="map-sequences-diagram"
    >
      <svg
        viewBox="0 0 440 240"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 25px rgba(103,232,249,0.2))" }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.5)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.9)" />
            <stop offset="100%" stopColor="rgba(147,197,253,1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="dotFill" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="40%" stopColor="rgba(147,197,253,1)" />
            <stop offset="100%" stopColor="rgba(103,232,249,1)" />
          </radialGradient>
        </defs>

        <motion.path
          d={curvePath}
          fill="none"
          stroke="rgba(103,232,249,0.15)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.3 }}
        />

        <motion.path
          d={curvePath}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.3 }}
        />

        {milestones.map((milestone, i) => {
          const isWin = milestone.isWin;
          const dotSize = isWin ? 14 : 11;
          const glowSize = isWin ? 32 : 26;
          const pulseStartDelay = 4 + i * sequenceDelay;
          
          return (
            <motion.g key={milestone.id}>
              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r={glowSize}
                fill="rgba(103,232,249,0.1)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.5, ease: "easeOut" }}
              />

              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r={dotSize}
                fill="url(#dotFill)"
                filter={isWin ? "url(#strongGlow)" : "url(#glow)"}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + i * 0.5, ease: "backOut" }}
              />

              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r={dotSize}
                fill="transparent"
                stroke="rgba(147,197,253,0.7)"
                strokeWidth={isWin ? 3 : 2}
                initial={{ scale: 1, opacity: 0 }}
                animate={isInView ? { 
                  scale: [1, isWin ? 2.5 : 2, 1],
                  opacity: [0.8, 0, 0]
                } : {}}
                transition={{
                  duration: sequenceDuration,
                  repeat: Infinity,
                  repeatDelay: totalSequenceTime - sequenceDuration,
                  delay: pulseStartDelay,
                  ease: "easeOut"
                }}
              />

              {isWin && (
                <>
                  <motion.circle
                    cx={milestone.x}
                    cy={milestone.y}
                    r={dotSize}
                    fill="transparent"
                    stroke="rgba(103,232,249,0.6)"
                    strokeWidth={2}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isInView ? { 
                      scale: [1, 3.5, 1],
                      opacity: [0.6, 0, 0]
                    } : {}}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: totalSequenceTime - 1.6,
                      delay: pulseStartDelay + 0.15,
                      ease: "easeOut"
                    }}
                  />
                  <motion.circle
                    cx={milestone.x}
                    cy={milestone.y}
                    r={18}
                    fill="transparent"
                    stroke="rgba(103,232,249,0.4)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={isInView ? { 
                      opacity: [0, 0.8, 0],
                      rotate: 360
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: pulseStartDelay,
                      ease: "linear"
                    }}
                  />
                </>
              )}

              <motion.text
                x={milestone.x}
                y={milestone.y - (isWin ? 24 : 20)}
                textAnchor="middle"
                fill="rgba(103,232,249,0.95)"
                className={`font-semibold uppercase tracking-wider ${isWin ? 'text-[10px]' : 'text-[9px]'}`}
                initial={{ opacity: 0, y: 5 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 + i * 0.5 }}
              >
                {milestone.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
