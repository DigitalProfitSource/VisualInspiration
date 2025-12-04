import { cn } from "@/lib/utils";

interface GridBeamProps {
  className?: string;
}

export function GridBeam({ className }: GridBeamProps) {
  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className)}>
      <style>
        {`
          @keyframes beamV {
            0% {
              top: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes beamH {
            0% {
              left: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }

          @keyframes beamHRev {
            0% {
              right: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              right: 100%;
              opacity: 0;
            }
          }

          .animate-beam-v {
            animation: beamV 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .animate-beam-h {
            animation: beamH 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .animate-beam-h-rev {
            animation: beamHRev 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container for Beams */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Left Vertical Beam */}
        <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v" style={{ animationDelay: '0s' }} />
        </div>

        {/* Right Vertical Beam */}
        <div className="absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v" style={{ animationDelay: '4s' }} />
        </div>

        {/* Center Vertical Beam (optional, aligning with content) */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden hidden md:block">
           <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-beam-v" style={{ animationDelay: '2s' }} />
        </div>

        {/* Horizontal Beams */}
        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden">
           <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-beam-h" style={{ animationDelay: '1s' }} />
        </div>

        <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden">
           <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-transparent via-primary/50 to-transparent animate-beam-h-rev" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden">
           <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-beam-h" style={{ animationDelay: '5s' }} />
        </div>
      </div>
    </div>
  );
}
