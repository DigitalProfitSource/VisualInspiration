import { motion } from "framer-motion";

const outerNodes = [
  { label: "First Contact", angle: 0 },
  { label: "Identify Revenue Drivers", angle: 51.4 },
  { label: "Uncover System Gaps", angle: 102.8 },
  { label: "Clarify Bottlenecks", angle: 154.2 },
  { label: "Map Current Processes", angle: 205.6 },
  { label: "Optimize Workflows", angle: 257 },
  { label: "Achieve Repeat Business", angle: 308.4 },
];

function polarToCartesian(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function ArchitectFlowDiagram() {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 160;
  const nodeRadius = 45;
  const centerRadius = 55;

  const nodePositions = outerNodes.map((node) => ({
    ...node,
    ...polarToCartesian(node.angle, outerRadius, cx, cy),
  }));

  return (
    <div className="relative w-full max-w-md aspect-square" data-testid="architect-flow-diagram">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(103,232,249,0.15))" }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.3)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.8)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0.3)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodePositions.map((node, i) => {
          const nextNode = nodePositions[(i + 1) % nodePositions.length];
          return (
            <g key={`connection-${i}`}>
              <motion.line
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="rgba(103,232,249,0.2)"
                strokeWidth="1"
              />
              <motion.line
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                filter="url(#glow)"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -24 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            </g>
          );
        })}

        {nodePositions.map((node, i) => (
          <motion.line
            key={`center-line-${i}`}
            x1={cx}
            y1={cy}
            x2={node.x}
            y2={node.y}
            stroke="rgba(103,232,249,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        <motion.circle
          cx={cx}
          cy={cy}
          r={centerRadius}
          fill="rgba(24,24,27,0.95)"
          stroke="rgba(103,232,249,0.5)"
          strokeWidth="2"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.03, 1],
            filter: [
              "drop-shadow(0 0 8px rgba(103,232,249,0.3))",
              "drop-shadow(0 0 15px rgba(103,232,249,0.6))",
              "drop-shadow(0 0 8px rgba(103,232,249,0.3))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-primary text-[9px] font-semibold"
        >
          Document Real
        </text>
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          className="fill-primary text-[9px] font-semibold"
        >
          Workflows
        </text>

        {nodePositions.map((node, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius}
              fill="rgba(24,24,27,0.9)"
              stroke="rgba(103,232,249,0.4)"
              strokeWidth="1.5"
              animate={{
                stroke: [
                  "rgba(103,232,249,0.3)",
                  "rgba(103,232,249,0.7)",
                  "rgba(103,232,249,0.3)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.35,
              }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-[7px] font-medium"
            >
              {node.label.split(" ").map((word, wi, arr) => (
                <tspan
                  key={wi}
                  x={node.x}
                  dy={wi === 0 ? `-${(arr.length - 1) * 4}px` : "10px"}
                >
                  {word}
                </tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>

      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(103,232,249,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
