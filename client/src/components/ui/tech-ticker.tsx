import { cn } from "@/lib/utils";

interface TechTickerProps {
  className?: string;
}

// Using Simple Icons CDN for consistent, high-quality SVG logos
// Color: #94a3b8 (Slate-400)
const technologies = [
  { name: "OpenAI", slug: "openai" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Perplexity", slug: "perplexity" },
  { name: "Gemini", slug: "googlegemini" }, // Simple Icons uses googlegemini
  { name: "Notion", slug: "notion" },
  { name: "n8n", slug: "n8n" },
  { name: "Slack", slug: "slack" },
  { name: "GitHub", slug: "github" },
  { name: "ElevenLabs", slug: "elevenlabs" },
  { name: "Runway", slug: "runway" }, // Might need checking, if not found will fallback to text
  { name: "HubSpot", slug: "hubspot" },
  { name: "Make", slug: "make" },
  { name: "Supabase", slug: "supabase" },
];

export function TechTicker({ className }: TechTickerProps) {
  return (
    <div className={cn("w-full overflow-hidden bg-background/50 border-y border-white/5 py-8 backdrop-blur-sm", className)}>
      <div className="container mx-auto px-6 flex items-center gap-4">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest shrink-0 mr-8 border-r border-white/10 pr-8 hidden md:block">
          Operational Stack
        </div>
        
        <div className="relative flex-1 overflow-hidden group">
           {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-20 animate-ticker hover:[animation-play-state:paused] w-max">
            {[...technologies, ...technologies].map((tech, i) => (
              <div 
                key={`${tech.slug}-${i}`} 
                className="flex items-center gap-3 shrink-0 group/item opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <img 
                  src={`https://cdn.simpleicons.org/${tech.slug}/94a3b8`}
                  alt={tech.name}
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-lg font-medium text-slate-400 font-display whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
