import { motion } from "framer-motion";

const stages = [
  { id: 1, label: "Lead In", x: 40 },
  { id: 2, label: "Qualify", x: 120 },
  { id: 3, label: "Consult", x: 200 },
  { id: 4, label: "Propose", x: 280 },
  { id: 5, label: "Close", x: 360 },
];

const lanes = [
  { label: "Marketing", y: 60, color: "rgba(163,230,53,0.6)" },
  { label: "Sales", y: 130, color: "rgba(163,230,53,0.5)" },
  { label: "Operations", y: 200, color: "rgba(163,230,53,0.4)" },
];

const flowPaths = [
  { lane: 0, stages: [1, 2] },
  { lane: 1, stages: [2, 3, 4] },
  { lane: 2, stages: [3, 4, 5] },
];

export function MapSequencesDiagram() {
  return (
    <div className="relative w-full max-w-md aspect-[4/3]" data-testid="map-sequences-diagram">
      <svg
        viewBox="0 0 420 260"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 15px rgba(163,230,53,0.1))" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="rgba(163,230,53,0.6)" />
          </marker>
        </defs>

        {stages.map((stage, i) => (
          <motion.g key={stage.id}>
            <motion.line
              x1={stage.x}
              y1="30"
              x2={stage.x}
              y2="230"
              stroke="rgba(163,230,53,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
            <motion.text
              x={stage.x}
              y="20"
              textAnchor="middle"
              className="fill-lime-400 text-[9px] font-semibold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {stage.label}
            </motion.text>
          </motion.g>
        ))}

        {lanes.map((lane, i) => (
          <motion.g key={i}>
            <motion.rect
              x="10"
              y={lane.y - 25}
              width="400"
              height="50"
              rx="4"
              fill="rgba(24,24,27,0.6)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            />
            <motion.text
              x="20"
              y={lane.y + 4}
              className="fill-white/50 text-[8px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {lane.label}
            </motion.text>
          </motion.g>
        ))}

        {flowPaths.map((path, pathIdx) => {
          const lane = lanes[path.lane];
          return path.stages.slice(0, -1).map((stageId, i) => {
            const fromStage = stages.find(s => s.id === stageId)!;
            const toStage = stages.find(s => s.id === path.stages[i + 1])!;
            return (
              <motion.line
                key={`path-${pathIdx}-${i}`}
                x1={fromStage.x}
                y1={lane.y}
                x2={toStage.x - 8}
                y2={lane.y}
                stroke={lane.color}
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + pathIdx * 0.3 + i * 0.2 }}
              />
            );
          });
        })}

        {flowPaths.map((path, pathIdx) => {
          const lane = lanes[path.lane];
          return path.stages.map((stageId, i) => {
            const stage = stages.find(s => s.id === stageId)!;
            return (
              <motion.g key={`node-${pathIdx}-${stageId}`}>
                <motion.circle
                  cx={stage.x}
                  cy={lane.y}
                  r="12"
                  fill="rgba(24,24,27,0.95)"
                  stroke={lane.color}
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + pathIdx * 0.2 + i * 0.1 }}
                />
                <motion.circle
                  cx={stage.x}
                  cy={lane.y}
                  r="4"
                  fill={lane.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: pathIdx * 0.3 + i * 0.2,
                  }}
                />
              </motion.g>
            );
          });
        })}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.rect
            x="10"
            y="235"
            width="400"
            height="3"
            rx="1.5"
            fill="rgba(163,230,53,0.2)"
          />
          <motion.rect
            x="10"
            y="235"
            width="0"
            height="3"
            rx="1.5"
            fill="rgba(163,230,53,0.8)"
            animate={{ width: [0, 400, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
