import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const inputs = [
  { id: 1, label: "PHONE", y: 40, icon: "M12 18.5c-4.1 0-7.5-3.4-7.5-7.5S7.9 3.5 12 3.5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5zm0-13c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5z M15 11h-2V9c0-.6-.4-1-1-1s-1 .4-1 1v3c0 .6.4 1 1 1h3c.6 0 1-.4 1-1s-.4-1-1-1z" },
  { id: 2, label: "EMAIL", y: 90, icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5v12h16V6zm-8 3.5L20 4H4l8 5.5z" },
  { id: 3, label: "CHAT", y: 140, icon: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" },
  { id: 4, label: "FORMS", y: 190, icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" },
];

const coreNodes = [
  { id: 1, label: "INTELLIGENT ROUTING", y: 70 },
  { id: 2, label: "AUTOMATED PROCESSING", y: 120 },
  { id: 3, label: "DATA ENRICHMENT", y: 170 },
];

const outputs = [
  { id: 1, label: "CRM RECORD", y: 55, icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm2 0c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V7z M8 9h8v2H8V9zm0 4h5v2H8v-2z" },
  { id: 2, label: "REVENUE PIPELINE", y: 115, icon: "M3 17l6-6 4 4 8-8v3h2V4h-6v2h3l-7 7-4-4-7 7 1.5 1z" },
  { id: 3, label: "STRATEGIC INSIGHTS", y: 175, icon: "M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3c1.8-1.3 3-3.4 3-5.7a7 7 0 0 0-7-7zm2 14h-4v-1h4v1zm1-3H9v-1h6v1zm.3-3.3l-1.4 1.4-.9-.9-1 1-.9-.9 1-1-.9-.9 1.4-1.4.9.9 1-1 .9.9-1 1 .9.9z" },
];

export function ArchitectFlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-lg aspect-[16/10]" 
      data-testid="architect-flow-diagram"
    >
      <svg
        viewBox="0 0 500 240"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(103,232,249,0.15))" }}
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.3)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.8)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.3)" />
          </linearGradient>
          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.15)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.05)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="iconGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {inputs.map((input, i) => (
          <motion.g key={input.id}>
            <motion.rect
              x="10"
              y={input.y}
              width="75"
              height="36"
              rx="5"
              fill="rgba(24,24,27,0.95)"
              stroke="rgba(103,232,249,0.6)"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.1 }}
            >
              <g transform={`translate(${18}, ${input.y + 8}) scale(0.7)`}>
                <path
                  d={input.icon}
                  fill="rgba(103,232,249,0.9)"
                  filter="url(#iconGlow)"
                />
              </g>
            </motion.g>
            <motion.text
              x="55"
              y={input.y + 23}
              textAnchor="middle"
              fill="rgba(103,232,249,0.95)"
              className="text-[7px] font-semibold tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {input.label}
            </motion.text>
          </motion.g>
        ))}

        <motion.text
          x="47"
          y="28"
          textAnchor="middle"
          fill="rgba(103,232,249,0.5)"
          className="text-[6px] font-mono uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Raw Inputs
        </motion.text>

        {inputs.map((input, i) => (
          <motion.path
            key={`path-in-${input.id}`}
            d={`M 85 ${input.y + 18} Q 115 ${input.y + 18} 140 120`}
            fill="none"
            stroke="rgba(103,232,249,0.4)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
          />
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.rect
            x="150"
            y="35"
            width="200"
            height="175"
            rx="10"
            fill="url(#coreGradient)"
            stroke="rgba(103,232,249,0.7)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          <motion.text
            x="250"
            y="55"
            textAnchor="middle"
            fill="rgba(103,232,249,1)"
            className="text-[8px] font-bold tracking-widest"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            ENGINEERED CORE
          </motion.text>

          {coreNodes.map((node, i) => (
            <motion.g key={node.id}>
              <motion.rect
                x="170"
                y={node.y}
                width="160"
                height="34"
                rx="6"
                fill="rgba(24,24,27,0.9)"
                stroke="rgba(103,232,249,0.5)"
                strokeWidth="1"
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.15 }}
              />
              <motion.text
                x="250"
                y={node.y + 21}
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                className="text-[7px] font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                {node.label}
              </motion.text>
            </motion.g>
          ))}

          <motion.path
            d="M 340 87 Q 355 87 355 120 Q 355 153 340 153"
            fill="none"
            stroke="rgba(103,232,249,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <motion.path
            d="M 160 153 Q 145 153 145 120 Q 145 87 160 87"
            fill="none"
            stroke="rgba(103,232,249,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
          />
          
          <motion.circle
            cx="355"
            cy="120"
            r="0"
            fill="rgba(103,232,249,0.9)"
            animate={isInView ? {
              r: [0, 4, 0],
              cy: [87, 153, 87]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="145"
            cy="120"
            r="0"
            fill="rgba(103,232,249,0.9)"
            animate={isInView ? {
              r: [0, 4, 0],
              cy: [153, 87, 153]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 2.3,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {outputs.map((output, i) => (
          <motion.path
            key={`path-out-${output.id}`}
            d={`M 350 120 Q 380 120 400 ${output.y + 22}`}
            fill="none"
            stroke="rgba(103,232,249,0.5)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.8 + i * 0.1 }}
          />
        ))}

        {outputs.map((output, i) => (
          <motion.g key={output.id}>
            <motion.rect
              x="405"
              y={output.y}
              width="88"
              height="44"
              rx="5"
              fill="rgba(24,24,27,0.95)"
              stroke="rgba(103,232,249,0.8)"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 2 + i * 0.15 }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.15 + i * 0.15 }}
            >
              <g transform={`translate(${413}, ${output.y + 12}) scale(0.8)`}>
                <path
                  d={output.icon}
                  fill="rgba(103,232,249,0.9)"
                  filter="url(#iconGlow)"
                />
              </g>
            </motion.g>
            <motion.text
              x="458"
              y={output.y + 18}
              textAnchor="middle"
              fill="rgba(103,232,249,1)"
              className="text-[5px] font-bold tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.2 + i * 0.15 }}
            >
              {output.label.split(' ')[0]}
            </motion.text>
            <motion.text
              x="458"
              y={output.y + 30}
              textAnchor="middle"
              fill="rgba(103,232,249,0.8)"
              className="text-[5px] font-bold tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.2 + i * 0.15 }}
            >
              {output.label.split(' ').slice(1).join(' ')}
            </motion.text>
          </motion.g>
        ))}

        <motion.text
          x="449"
          y="232"
          textAnchor="middle"
          fill="rgba(103,232,249,0.5)"
          className="text-[6px] font-mono uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
        >
          Reliable Outputs
        </motion.text>

        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`packet-${i}`}
            r="3"
            fill="rgba(103,232,249,0.95)"
            filter="url(#strongGlow)"
            initial={{ opacity: 0 }}
            animate={isInView ? {
              opacity: [0, 1, 1, 1, 0],
              cx: [47, 115, 250, 380, 449],
              cy: [90 + i * 30, 120, 120, 120, 77 + i * 60]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2.5 + i * 1.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
