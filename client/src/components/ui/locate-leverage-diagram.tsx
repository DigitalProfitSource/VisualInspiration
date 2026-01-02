import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const aiTasks = [
  { id: 1, label: "Triage", offset: -80 },
  { id: 2, label: "Routing", offset: -40 },
  { id: 3, label: "Follow-up", offset: 0 },
];

const humanTasks = [
  { id: 4, label: "Strategy", offset: 0 },
  { id: 5, label: "Negotiation", offset: 40 },
  { id: 6, label: "Relationships", offset: 80 },
];

export function LocateLeverageDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-md aspect-[4/3]" 
      data-testid="locate-leverage-diagram"
    >
      <svg
        viewBox="0 0 400 260"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(103,232,249,0.15))" }}
      >
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.9)" />
            <stop offset="50%" stopColor="rgba(147,197,253,1)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.9)" />
          </linearGradient>
          <filter id="fulcrumGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="aiTaskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.4)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0)" />
          </radialGradient>
          <linearGradient id="fulcrumFill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(147,197,253,1)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.8)" />
          </linearGradient>
        </defs>

        <motion.polygon
          points="200,230 185,180 215,180"
          fill="url(#fulcrumFill)"
          filter="url(#fulcrumGlow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.circle
          cx="200"
          cy="180"
          r="8"
          fill="rgba(147,197,253,1)"
          filter="url(#fulcrumGlow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1,
          } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.circle
          cx="200"
          cy="180"
          r="12"
          fill="transparent"
          stroke="rgba(103,232,249,0.5)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { 
            opacity: [0.5, 0, 0.5],
            scale: [1, 2, 1]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <motion.g
          initial={{ rotate: 0 }}
          animate={isInView ? { rotate: [-8, -3, -8] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 180px" }}
        >
          <motion.rect
            x="40"
            y="175"
            width="320"
            height="10"
            rx="5"
            fill="url(#beamGradient)"
            filter="url(#softGlow)"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformOrigin: "200px 180px" }}
          />

          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {aiTasks.map((task, i) => {
              const xPos = 100 + task.offset;
              const yPos = 140;
              
              return (
                <motion.g key={task.id}>
                  <motion.line
                    x1={xPos}
                    y1={yPos + 25}
                    x2={xPos}
                    y2="175"
                    stroke="rgba(103,232,249,0.6)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
                  />
                  
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="30"
                    fill="url(#aiTaskGlow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { 
                      scale: [1, 1.2, 1], 
                      opacity: [0.4, 0.7, 0.4] 
                    } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 + i * 0.2 }}
                  />
                  
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="22"
                    fill="rgba(24,24,27,0.95)"
                    stroke="rgba(103,232,249,0.9)"
                    strokeWidth="2"
                    filter="url(#softGlow)"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.15, type: "spring" }}
                  />
                  
                  <motion.text
                    x={xPos}
                    y={yPos + 4}
                    textAnchor="middle"
                    className="fill-white text-[8px] font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    {task.label}
                  </motion.text>

                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + i * 0.15 }}
                  >
                    <rect
                      x={xPos - 10}
                      y={yPos + 12}
                      width="20"
                      height="10"
                      rx="2"
                      fill="rgba(103,232,249,1)"
                    />
                    <text
                      x={xPos}
                      y={yPos + 19}
                      textAnchor="middle"
                      className="fill-zinc-900 text-[6px] font-bold"
                    >
                      AI
                    </text>
                  </motion.g>
                </motion.g>
              );
            })}
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            {humanTasks.map((task, i) => {
              const xPos = 300 + task.offset;
              const yPos = 140;
              
              return (
                <motion.g key={task.id}>
                  <motion.line
                    x1={xPos}
                    y1={yPos + 25}
                    x2={xPos}
                    y2="175"
                    stroke="rgba(103,232,249,0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.3 + i * 0.15 }}
                  />
                  
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="22"
                    fill="rgba(24,24,27,0.95)"
                    stroke="rgba(103,232,249,0.35)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.15, type: "spring" }}
                  />
                  
                  <motion.text
                    x={xPos}
                    y={yPos + 4}
                    textAnchor="middle"
                    className="fill-white/70 text-[7px] font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.6 + i * 0.15 }}
                  >
                    {task.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </motion.g>
        </motion.g>

        <motion.text
          x="100"
          y="65"
          textAnchor="middle"
          className="text-[9px] font-mono uppercase tracking-wider"
          fill="rgba(103,232,249,0.9)"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
        >
          AI Lifts
        </motion.text>
        <motion.path
          d="M 100 75 L 100 100"
          stroke="rgba(103,232,249,0.5)"
          strokeWidth="1"
          strokeDasharray="3 3"
          markerEnd="url(#arrowDown)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: 2, duration: 0.5 }}
        />

        <motion.text
          x="340"
          y="65"
          textAnchor="middle"
          className="text-[9px] font-mono uppercase tracking-wider"
          fill="rgba(103,232,249,0.5)"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.9 }}
        >
          Human Grounds
        </motion.text>
        <motion.path
          d="M 340 75 L 340 100"
          stroke="rgba(103,232,249,0.3)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: 2.1, duration: 0.5 }}
        />

        <defs>
          <marker
            id="arrowDown"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <polygon points="0,0 6,3 0,6" fill="rgba(103,232,249,0.5)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
