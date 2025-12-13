import { motion } from "framer-motion";

const opportunities = [
  { id: 1, label: "Triage", x: 100, y: 70, isAI: true, impact: "high" },
  { id: 2, label: "Routing", x: 200, y: 50, isAI: true, impact: "high" },
  { id: 3, label: "Follow-up", x: 300, y: 80, isAI: true, impact: "high" },
  { id: 4, label: "Strategy", x: 80, y: 160, isAI: false, impact: "human" },
  { id: 5, label: "Negotiation", x: 180, y: 180, isAI: false, impact: "human" },
  { id: 6, label: "Relationships", x: 300, y: 170, isAI: false, impact: "human" },
];

export function LocateLeverageDiagram() {
  return (
    <div className="relative w-full max-w-md aspect-[4/3]" data-testid="locate-leverage-diagram">
      <svg
        viewBox="0 0 400 280"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 15px rgba(103,232,249,0.1))" }}
      >
        <defs>
          <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.35)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0)" />
          </radialGradient>
          <radialGradient id="humanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.15)" />
            <stop offset="100%" stopColor="rgba(103,232,249,0)" />
          </radialGradient>
        </defs>

        <motion.rect
          x="40"
          y="30"
          width="320"
          height="90"
          rx="8"
          fill="rgba(103,232,249,0.03)"
          stroke="rgba(103,232,249,0.4)"
          strokeWidth="1"
          strokeDasharray="6 3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.text
          x="55"
          y="48"
          fill="rgba(103,232,249,0.9)"
          className="text-[9px] font-mono uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI Leverage Zone
        </motion.text>

        <motion.rect
          x="40"
          y="130"
          width="320"
          height="90"
          rx="8"
          fill="rgba(103,232,249,0.02)"
          stroke="rgba(103,232,249,0.2)"
          strokeWidth="1"
          strokeDasharray="6 3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.text
          x="55"
          y="148"
          fill="rgba(103,232,249,0.5)"
          className="text-[9px] font-mono uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Human Judgment Zone
        </motion.text>

        {opportunities.map((opp, i) => (
          <motion.g
            key={opp.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            {opp.isAI && (
              <motion.circle
                cx={opp.x}
                cy={opp.y}
                r="35"
                fill="url(#aiGlow)"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            )}
            
            <motion.circle
              cx={opp.x}
              cy={opp.y}
              r="28"
              fill="rgba(24,24,27,0.95)"
              stroke={opp.isAI ? "rgba(103,232,249,0.8)" : "rgba(103,232,249,0.3)"}
              strokeWidth="2"
              animate={opp.isAI ? {
                stroke: ["rgba(103,232,249,0.6)", "rgba(103,232,249,1)", "rgba(103,232,249,0.6)"],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            
            <text
              x={opp.x}
              y={opp.y + 4}
              textAnchor="middle"
              className="fill-white text-[9px] font-medium"
            >
              {opp.label}
            </text>

            {opp.isAI && (
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <rect
                  x={opp.x - 12}
                  y={opp.y + 18}
                  width="24"
                  height="12"
                  rx="2"
                  fill="rgba(103,232,249,0.9)"
                />
                <text
                  x={opp.x}
                  y={opp.y + 26}
                  textAnchor="middle"
                  className="fill-zinc-900 text-[6px] font-bold"
                >
                  AI
                </text>
              </motion.g>
            )}
          </motion.g>
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.circle
            cx="200"
            cy="235"
            r="3"
            fill="rgba(103,232,249,0.9)"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text
            x="215"
            y="238"
            className="fill-white/60 text-[8px]"
          >
            Targeting high-impact AI opportunities
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
