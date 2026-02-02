import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface SamanthaWidgetProps {
  variant?: "default" | "compact";
  className?: string;
}

export function SamanthaWidget({ variant = "default", className = "" }: SamanthaWidgetProps) {
  const handleClick = () => {
    const w = window as any;
    if (w.openLeadConnectorChat) {
      w.openLeadConnectorChat();
    }
  };

  if (variant === "compact") {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-4 py-2 cursor-pointer hover:border-primary/40 hover:shadow-[0_0_30px_rgba(103,232,249,0.15)] transition-all duration-300 ${className}`}
        data-testid="button-samantha-widget-compact"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
            <img 
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/696fd454572f85432b83c7bf/media/682f18b6dba97c4f3f4f55bc.png" 
              alt="Samantha - AI Voice Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-900 animate-pulse" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Talk to Samantha</p>
          <p className="text-xs text-zinc-400">Live AI Demo</p>
        </div>
        <div className="ml-2 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <Phone className="w-4 h-4 text-primary" />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex items-center gap-4 bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/80 backdrop-blur-xl border border-white/10 rounded-2xl pl-3 pr-5 py-3 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_40px_rgba(103,232,249,0.2)] transition-all duration-500 ${className}`}
      data-testid="button-samantha-widget"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-cyan-400/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary transition-colors duration-300">
            <img 
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/696fd454572f85432b83c7bf/media/682f18b6dba97c4f3f4f55bc.png" 
              alt="Samantha - AI Voice Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            <span className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>
        </div>
        
        <div className="text-left">
          <p className="text-base font-bold text-white group-hover:text-primary transition-colors duration-300">Talk to Samantha</p>
          <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Live AI Voice Demo</p>
        </div>
        
        <div className="relative ml-2">
          <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 border border-primary/40 flex items-center justify-center group-hover:from-primary/40 group-hover:to-cyan-500/30 group-hover:border-primary transition-all duration-300">
            <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
