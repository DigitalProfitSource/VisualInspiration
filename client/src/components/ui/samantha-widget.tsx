import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import samanthaAvatar from "@assets/Untitled_design_1764887004065.png";

interface SamanthaWidgetProps {
  size?: "default" | "compact";
  className?: string;
  testId?: string;
}

export function SamanthaWidget({ size = "default", className = "", testId = "button-samantha" }: SamanthaWidgetProps) {
  const handleClick = () => {
    const w = window as any;
    if (w.openLeadConnectorChat) {
      w.openLeadConnectorChat();
    }
  };

  const isCompact = size === "compact";

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex items-center gap-3 cursor-pointer ${className}`}
      data-testid={testId}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500" />
      
      <div className={`relative flex items-center gap-3 ${isCompact ? 'py-2 px-3' : 'py-3 px-5'} rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl group-hover:border-primary/40 group-hover:shadow-primary/20 transition-all duration-300`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-cyan-400/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src={samanthaAvatar} 
            alt="Samantha - AI Voice Assistant"
            className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full object-cover border-2 border-white/20 group-hover:border-primary/50 transition-colors duration-300`}
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse" />
        </div>
        
        <div className="flex flex-col items-start">
          <span className={`${isCompact ? 'text-sm' : 'text-base'} font-semibold text-white group-hover:text-primary transition-colors duration-300`}>
            Talk to Samantha
          </span>
          {!isCompact && (
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
              Live AI Demo
            </span>
          )}
        </div>
        
        <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300`}>
          <Phone className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} text-primary group-hover:scale-110 transition-transform duration-300`} />
        </div>
      </div>
    </motion.button>
  );
}
