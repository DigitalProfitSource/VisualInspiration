import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const aiTasks = [
  { id: 1, label: "Triage", x: 80, y: 100 },
  { id: 2, label: "Routing", x: 50, y: 145 },
  { id: 3, label: "Follow-up", x: 110, y: 145 },
];

const humanTasks = [
  { id: 4, label: "Strategy", x: 320, y: 100 },
  { id: 5, label: "Negotiation", x: 290, y: 145 },
  { id: 6, label: "Relationships", x: 350, y: 145 },
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
        style={{ filter: "drop-shadow(0 0 15px rgba(103,232,249,0.1))" }}
      >
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.7)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.9)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.7)" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="aiTaskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.3)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0)" />
          </radialGradient>
        </defs>

        <motion.polygon
          points="200,230 190,195 210,195"
          fill="rgba(103,232,249,0.6)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.g
          initial={{ rotate: 0 }}
          animate={isInView ? { rotate: [-6, -2, -6] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 195px" }}
        >
          <motion.rect
            x="50"
            y="190"
            width="300"
            height="8"
            rx="4"
            fill="url(#beamGradient)"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformOrigin: "200px 195px" }}
          />

          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {aiTasks.map((task, i) => {
              return (
                <motion.g key={task.id}>
                  <motion.line
                    x1={task.x}
                    y1={task.y + 22}
                    x2={80}
                    y2="190"
                    stroke="rgba(103,232,249,0.4)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  />
                  
                  <motion.circle
                    cx={task.x}
                    cy={task.y}
                    r="26"
                    fill="url(#aiTaskGlow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { 
                      scale: [1, 1.15, 1], 
                      opacity: [0.3, 0.5, 0.3] 
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.2 + i * 0.2 }}
                  />
                  
                  <motion.circle
                    cx={task.x}
                    cy={task.y}
                    r="20"
                    fill="rgba(24,24,27,0.95)"
                    stroke="rgba(103,232,249,0.8)"
                    strokeWidth="2"
                    filter="url(#softGlow)"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1, type: "spring" }}
                  />
                  
                  <motion.text
                    x={task.x}
                    y={task.y + 4}
                    textAnchor="middle"
                    className="fill-white text-[7px] font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {task.label}
                  </motion.text>

                  <motion.g
                    initial={{ opacity: 0, y: 3 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + i * 0.1 }}
                  >
                    <rect
                      x={task.x - 9}
                      y={task.y + 10}
                      width="18"
                      height="9"
                      rx="2"
                      fill="rgba(103,232,249,1)"
                    />
                    <text
                      x={task.x}
                      y={task.y + 17}
                      textAnchor="middle"
                      className="fill-zinc-900 text-[5px] font-bold"
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
              return (
                <motion.g key={task.id}>
                  <motion.line
                    x1={task.x}
                    y1={task.y + 22}
                    x2={320}
                    y2="190"
                    stroke="rgba(103,232,249,0.25)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
                  />
                  
                  <motion.circle
                    cx={task.x}
                    cy={task.y}
                    r="20"
                    fill="rgba(24,24,27,0.95)"
                    stroke="rgba(103,232,249,0.3)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.1, type: "spring" }}
                  />
                  
                  <motion.text
                    x={task.x}
                    y={task.y + 4}
                    textAnchor="middle"
                    className="fill-white/60 text-[6px] font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.6 + i * 0.1 }}
                  >
                    {task.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </motion.g>
        </motion.g>

        <motion.text
          x="80"
          y="55"
          textAnchor="middle"
          className="text-[9px] font-mono uppercase tracking-wider"
          fill="rgba(103,232,249,0.9)"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
        >
          AI Lifts
        </motion.text>

        <motion.text
          x="320"
          y="55"
          textAnchor="middle"
          className="text-[9px] font-mono uppercase tracking-wider"
          fill="rgba(103,232,249,0.5)"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.9 }}
        >
          Human Grounds
        </motion.text>
      </svg>
    </div>
  );
}
