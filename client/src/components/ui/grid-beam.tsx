import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface GridBeamProps {
  className?: string;
  showCenterBeam?: boolean;
  gridOpacity?: number;
}

const STYLE_ID = "grid-beam-keyframes";

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes beamV {
      0% { top: -150px; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes beamH {
      0% { left: -150px; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { left: 100%; opacity: 0; }
    }
    @keyframes beamHRev {
      0% { right: -150px; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { right: 100%; opacity: 0; }
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
  `;
  document.head.appendChild(style);
}

export function GridBeam({ className, showCenterBeam = true, gridOpacity = 0.15 }: GridBeamProps) {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      ensureStyles();
      initialized.current = true;
    }
  }, []);

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className)}>
      <div 
        className="absolute inset-0" 
        style={{
          opacity: gridOpacity,
          backgroundImage: 'linear-gradient(to right, rgba(110, 224, 247, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(110, 224, 247, 0.25) 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      <div className="absolute inset-0 w-full h-full">
        <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v" style={{ animationDelay: '0s' }} />
        </div>

        <div className="absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v" style={{ animationDelay: '4s' }} />
        </div>

        {showCenterBeam && (
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden hidden md:block">
             <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-beam-v" style={{ animationDelay: '2s' }} />
          </div>
        )}

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
