import { motion } from "framer-motion";

const systemNodes = [
  { id: 1, label: "Intake", x: 60, y: 80, hasFriction: false },
  { id: 2, label: "CRM", x: 180, y: 60, hasFriction: true },
  { id: 3, label: "Scheduling", x: 300, y: 90, hasFriction: false },
  { id: 4, label: "Follow-up", x: 120, y: 180, hasFriction: true },
  { id: 5, label: "Billing", x: 240, y: 200, hasFriction: false },
  { id: 6, label: "Reporting", x: 340, y: 170, hasFriction: true },
];

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
];

export function DiagnoseFrictionDiagram() {
  const getNode = (id: number) => systemNodes.find(n => n.id === id)!;

  return (
    <div className="relative w-full max-w-md aspect-[4/3]" data-testid="diagnose-friction-diagram">
      <svg
        viewBox="0 0 400 280"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 15px rgba(103,232,249,0.1))" }}
      >
        <defs>
          <filter id="scanGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="scanLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(103,232,249,0)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.8)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0)" />
          </linearGradient>
        </defs>

        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return (
            <motion.line
              key={`conn-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(103,232,249,0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          );
        })}

        <motion.rect
          x="0"
          y="0"
          width="400"
          height="40"
          fill="url(#scanLine)"
          initial={{ y: -40 }}
          animate={{ y: 280 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        />

        {systemNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <motion.rect
              x={node.x - 35}
              y={node.y - 18}
              width="70"
              height="36"
              rx="6"
              fill="rgba(24,24,27,0.95)"
              stroke={node.hasFriction ? "rgba(239,68,68,0.7)" : "rgba(103,232,249,0.4)"}
              strokeWidth="1.5"
              animate={node.hasFriction ? {
                stroke: ["rgba(239,68,68,0.5)", "rgba(239,68,68,1)", "rgba(239,68,68,0.5)"],
                filter: [
                  "drop-shadow(0 0 4px rgba(239,68,68,0.3))",
                  "drop-shadow(0 0 12px rgba(239,68,68,0.8))",
                  "drop-shadow(0 0 4px rgba(239,68,68,0.3))",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-white text-[10px] font-medium"
            >
              {node.label}
            </text>
            {node.hasFriction && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.5 + i * 0.2 }}
              >
                <circle
                  cx={node.x + 30}
                  cy={node.y - 12}
                  r="8"
                  fill="rgba(239,68,68,0.9)"
                />
                <text
                  x={node.x + 30}
                  y={node.y - 8}
                  textAnchor="middle"
                  className="fill-white text-[8px] font-bold"
                >
                  !
                </text>
              </motion.g>
            )}
          </motion.g>
        ))}

        <motion.text
          x="200"
          y="260"
          textAnchor="middle"
          className="fill-primary/70 text-[9px] font-mono uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scanning for friction points...
        </motion.text>
      </svg>
    </div>
  );
}
