import { motion } from "framer-motion";

const layers = [
  { id: 1, label: "Channels", y: 40, width: 340, items: ["Phone", "Email", "Chat", "Forms"] },
  { id: 2, label: "Intake Layer", y: 100, width: 300, items: ["Triage", "Classify", "Route"] },
  { id: 3, label: "Processing", y: 160, width: 260, items: ["Automate", "Escalate"] },
  { id: 4, label: "Output", y: 220, width: 220, items: ["CRM", "Calendar", "Notify"] },
];

export function ArchitectFlowDiagram() {
  const centerX = 200;

  return (
    <div className="relative w-full max-w-md aspect-[4/3]" data-testid="architect-flow-diagram">
      <svg
        viewBox="0 0 400 280"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 15px rgba(163,230,53,0.1))" }}
      >
        <defs>
          <linearGradient id="blueprintGrid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(163,230,53,0.05)" />
            <stop offset="100%" stopColor="rgba(163,230,53,0.02)" />
          </linearGradient>
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(163,230,53,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="400" height="280" fill="url(#gridPattern)" />

        {layers.map((layer, i) => {
          const x = centerX - layer.width / 2;
          return (
            <motion.g key={layer.id}>
              <motion.line
                x1={centerX}
                y1={i === 0 ? 0 : layers[i - 1].y + 30}
                x2={centerX}
                y2={layer.y - 5}
                stroke="rgba(163,230,53,0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              />

              <motion.rect
                x={x}
                y={layer.y}
                width={layer.width}
                height="50"
                rx="6"
                fill="rgba(24,24,27,0.9)"
                stroke="rgba(163,230,53,0.4)"
                strokeWidth="1.5"
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
              />

              <motion.text
                x={x + 10}
                y={layer.y + 18}
                className="fill-lime-400 text-[9px] font-mono uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {layer.label}
              </motion.text>

              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                {layer.items.map((item, j) => {
                  const itemWidth = (layer.width - 30) / layer.items.length;
                  const itemX = x + 15 + j * itemWidth;
                  return (
                    <motion.g key={`${layer.id}-${j}`}>
                      <rect
                        x={itemX}
                        y={layer.y + 28}
                        width={itemWidth - 8}
                        height="16"
                        rx="3"
                        fill="rgba(163,230,53,0.1)"
                        stroke="rgba(163,230,53,0.3)"
                        strokeWidth="0.5"
                      />
                      <text
                        x={itemX + (itemWidth - 8) / 2}
                        y={layer.y + 39}
                        textAnchor="middle"
                        className="fill-white/80 text-[7px] font-medium"
                      >
                        {item}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>

              <motion.circle
                cx={x - 8}
                cy={layer.y + 25}
                r="4"
                fill="rgba(163,230,53,0.8)"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          );
        })}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`flow-${i}`}
              cx={centerX}
              cy={0}
              r="4"
              fill="rgba(163,230,53,0.9)"
              initial={{ cy: 20 }}
              animate={{ cy: [20, 260, 20] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>

        <motion.text
          x="10"
          y="270"
          className="fill-lime-400/50 text-[8px] font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          SYSTEM ARCHITECTURE v1.0
        </motion.text>
      </svg>
    </div>
  );
}
