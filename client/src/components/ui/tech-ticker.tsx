import { cn } from "@/lib/utils";

interface TechTickerProps {
  className?: string;
}

const technologies = [
  "OpenAI",
  "Anthropic",
  "Perplexity",
  "Gemini",
  "Notion AI",
  "Cursor",
  "n8n",
  "Slack",
  "GitHub",
  "ElevenLabs",
  "Runway",
  "HubSpot",
  "GoHighLevel",
  "Make",
  "Supabase",
];

export function TechTicker({ className }: TechTickerProps) {
  return (
    <div className={cn("w-full overflow-hidden bg-background/50 border-y border-white/5 py-6 backdrop-blur-sm", className)}>
      <div className="container mx-auto px-6 flex items-center gap-4">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest shrink-0 mr-8 border-r border-white/10 pr-8 hidden md:block">
          Operational Stack
        </div>
        
        <div className="relative flex-1 overflow-hidden group">
           {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-16 animate-ticker hover:[animation-play-state:paused]">
            {[...technologies, ...technologies].map((tech, i) => (
              <div 
                key={`${tech}-${i}`} 
                className="flex items-center gap-2 shrink-0"
              >
                <span className="text-lg font-medium text-slate-400 hover:text-primary transition-colors cursor-default font-display whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
