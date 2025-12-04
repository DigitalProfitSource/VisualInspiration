import { cn } from "@/lib/utils";

interface CircuitBeamsProps {
  className?: string;
}

export function CircuitBeams({ className }: CircuitBeamsProps) {
  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className)}>
      <style>
        {`
          @keyframes currentFlow {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateX(200%);
              opacity: 0;
            }
          }

          @keyframes currentFlowReverse {
            0% {
              transform: translateX(200%);
              opacity: 0;
            }
            10% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
          }

          @keyframes pulseNode {
            0%, 100% {
              opacity: 0.1;
              box-shadow: 0 0 0 0 rgba(103, 232, 249, 0);
            }
            50% {
              opacity: 0.4;
              box-shadow: 0 0 8px 2px rgba(103, 232, 249, 0.3);
            }
          }

          .circuit-current {
            animation: currentFlow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .circuit-current-rev {
            animation: currentFlowReverse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .circuit-node {
            animation: pulseNode 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Horizontal Circuit Lines with Flowing Current */}
      
      {/* Top Left Circuit Path */}
      <div className="absolute top-[15%] left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent" style={{ animationDelay: '0s' }} />
      </div>
      <div className="absolute top-[15%] left-1/3 w-px h-16 bg-white/[0.03]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Top Right Circuit Path */}
      <div className="absolute top-[20%] right-0 w-2/5 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current-rev absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-transparent via-primary/30 to-transparent" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute top-[20%] right-[40%] w-px h-12 bg-white/[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Mid Left Circuit */}
      <div className="absolute top-[45%] left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" style={{ animationDelay: '1s' }} />
      </div>

      {/* Mid Right Circuit */}
      <div className="absolute top-[50%] right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current-rev absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-transparent via-primary/30 to-transparent" style={{ animationDelay: '3.5s' }} />
      </div>
      
      {/* Bottom Left Circuit with Junction */}
      <div className="absolute bottom-[25%] left-0 w-2/5 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-primary/35 to-transparent" style={{ animationDelay: '4s' }} />
      </div>
      <div className="absolute bottom-[25%] left-[40%] w-px h-20 bg-white/[0.03]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/15 circuit-node" style={{ animationDelay: '4.5s' }} />
      </div>
      <div className="absolute bottom-[5%] left-[40%] w-1/4 h-px bg-gradient-to-r from-white/[0.03] via-white/[0.03] to-transparent">
        <div className="circuit-current absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" style={{ animationDelay: '5s' }} />
      </div>

      {/* Bottom Right Circuit */}
      <div className="absolute bottom-[30%] right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]">
        <div className="circuit-current-rev absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-transparent via-primary/30 to-transparent" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="absolute bottom-[30%] right-1/4 w-px h-24 bg-white/[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node" style={{ animationDelay: '2s' }} />
      </div>

      {/* Additional subtle flowing lines */}
      <div className="absolute top-[35%] left-[10%] w-16 h-px bg-white/[0.02]">
        <div className="circuit-current absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-primary/25 to-transparent" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="absolute top-[60%] right-[15%] w-20 h-px bg-white/[0.02]">
        <div className="circuit-current-rev absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-transparent via-primary/25 to-transparent" style={{ animationDelay: '5.5s' }} />
      </div>
    </div>
  );
}
