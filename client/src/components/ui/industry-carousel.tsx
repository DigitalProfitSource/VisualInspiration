import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Smile, 
  Calculator, 
  Home, 
  HardHat, 
  Scale, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface IndustryCard {
  icon: React.ElementType;
  title: string;
  subtext: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    showArrow?: boolean;
  }[];
}

const industries: IndustryCard[] = [
  {
    icon: Smile,
    title: "Dental Practices",
    subtext: "Appointment reminders, insurance verification, and patient follow-up automation.",
    metrics: [
      { label: "Missed Call Rate", before: "35%", after: "<2% (Auto-Text Back)", showArrow: false },
      { label: "Recall Scheduling", before: "Manual Phone Calls", after: "+45% Automation Rate", showArrow: true },
      { label: "New Patient Intake", before: "Business Hours Only", after: "24/7 Booking", showArrow: false },
    ],
  },
  {
    icon: Calculator,
    title: "Accounting & CPAs",
    subtext: "Client onboarding, document collection, and tax deadline reminders.",
    metrics: [
      { label: "Doc Collection Time", before: "3-5 Days avg", after: "<4 Hours (Auto-Nudge)", showArrow: false },
      { label: "Tax Season Response", before: "24+ Hours", after: "Instant (AI Agent)", showArrow: false },
      { label: "Appointment Shows", before: "Baseline", after: "+22% Improvement", showArrow: true },
    ],
  },
  {
    icon: Home,
    title: "Real Estate",
    subtext: "Lead qualification, showing coordination, and transaction milestone tracking.",
    metrics: [
      { label: "Speed-to-Lead", before: "1-2 Hours", after: "<1 Minute (Instant)", showArrow: false },
      { label: "Portal Lead Conv", before: "2%", after: "8% (+300% ↑)", showArrow: true },
      { label: "Showing Requests", before: "Manual Coordination", after: "Auto-Calibrated Booking", showArrow: false },
    ],
  },
  {
    icon: HardHat,
    title: "Home Services",
    subtext: "Roofing Company",
    metrics: [
      { label: "Lead Follow-Up Rate", before: "31%", after: "89% (+187% ↑)", showArrow: true },
      { label: "Response Time", before: "12+ hours", after: "<5 minutes", showArrow: false },
      { label: "Estimate Bookings", before: "Baseline", after: "+47% ↑", showArrow: true },
      { label: "After-Hours Conv", before: "1x", after: "3.2x ↑", showArrow: true },
    ],
  },
  {
    icon: Scale,
    title: "Law Firms",
    subtext: "Personal Injury Firm",
    metrics: [
      { label: "Consultation Avail", before: "Business hours only", after: "24/7", showArrow: false },
      { label: "Qualified Case Intakes", before: "Baseline", after: "+67% ↑", showArrow: true },
      { label: "ROI", before: "Baseline", after: "4.5x (6 months) ↑", showArrow: true },
    ],
  },
  {
    icon: Sparkles,
    title: "MedSpas",
    subtext: "Premier MedSpa",
    metrics: [
      { label: "Consultation Bookings", before: "Baseline", after: "+127% ↑", showArrow: true },
      { label: "No-Show Rate", before: "High", after: "-64% (Decrease)", showArrow: false },
      { label: "Treatment Packages", before: "Baseline", after: "+203% ↑", showArrow: true },
    ],
  },
];

function IndustryCardComponent({ card }: { card: IndustryCard }) {
  const Icon = card.icon;
  
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 shadow-xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-white">{card.title}</h3>
          <p className="text-slate-500 text-sm">{card.subtext}</p>
        </div>
      </div>
      
      {/* Metrics Table */}
      <div className="space-y-0">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/5">
          <div className="text-xs font-mono text-slate-600 uppercase tracking-wider"></div>
          <div className="text-xs font-mono text-slate-600 uppercase tracking-wider text-center">Before</div>
          <div className="text-xs font-mono text-primary/70 uppercase tracking-wider text-center">After</div>
        </div>
        
        {/* Table Rows */}
        {card.metrics.map((metric, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 py-3 border-b border-white/5 last:border-b-0">
            <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
            <div className="text-xs text-slate-500 text-center">{metric.before}</div>
            <div className="text-xs text-primary font-semibold text-center">
              {metric.after}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Duplicate cards for infinite effect
  const duplicatedCards = [...industries, ...industries];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
            Tailored for <span className="text-primary">High-Impact</span> Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Real metrics from real businesses.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-900/90 border border-white/10 flex items-center justify-center text-white hover:border-primary/30 hover:bg-zinc-800 transition-all ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : ""}`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-900/90 border border-white/10 flex items-center justify-center text-white hover:border-primary/30 hover:bg-zinc-800 transition-all ${!canScrollRight ? "opacity-30 cursor-not-allowed" : ""}`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-14 py-4 -mx-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                <IndustryCardComponent card={card} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            className="border-white/10 hover:border-primary/30 hover:bg-white/5 text-white px-8 h-12 rounded-full font-medium"
          >
            View All Case Studies <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
