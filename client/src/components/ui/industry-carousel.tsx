import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Smile, 
  Calculator, 
  Home, 
  HardHat, 
  Scale, 
  Sparkles,
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
  }[];
}

const industries: IndustryCard[] = [
  {
    icon: Smile,
    title: "Dental Practices",
    subtext: "Appointment reminders, insurance verification, and patient follow-up automation.",
    metrics: [
      { label: "Missed Call Rate", before: "35%", after: "<2% (Auto-Text Back)" },
      { label: "Recall Scheduling", before: "Manual Phone Calls", after: "+45% Automation Rate" },
      { label: "New Patient Intake", before: "Business Hours Only", after: "24/7 Booking" },
    ],
  },
  {
    icon: Calculator,
    title: "Accounting & CPAs",
    subtext: "Client onboarding, document collection, and tax deadline reminders.",
    metrics: [
      { label: "Doc Collection Time", before: "3-5 Days avg", after: "<4 Hours (Auto-Nudge)" },
      { label: "Tax Season Response", before: "24+ Hours", after: "Instant (AI Agent)" },
      { label: "Appointment Shows", before: "Baseline", after: "+22% Improvement" },
    ],
  },
  {
    icon: Home,
    title: "Real Estate",
    subtext: "Lead qualification, showing coordination, and transaction milestone tracking.",
    metrics: [
      { label: "Speed-to-Lead", before: "1-2 Hours", after: "<1 Minute (Instant)" },
      { label: "Portal Lead Conv", before: "2%", after: "8% (+300% ↑)" },
      { label: "Showing Requests", before: "Manual Coordination", after: "Auto-Calibrated Booking" },
    ],
  },
  {
    icon: HardHat,
    title: "Home Services",
    subtext: "Roofing Company",
    metrics: [
      { label: "Lead Follow-Up Rate", before: "31%", after: "89% (+187% ↑)" },
      { label: "Response Time", before: "12+ hours", after: "<5 minutes" },
      { label: "Estimate Bookings", before: "Baseline", after: "+47% ↑" },
    ],
  },
  {
    icon: Scale,
    title: "Law Firms",
    subtext: "Personal Injury Firm",
    metrics: [
      { label: "Consultation Avail", before: "Business hours only", after: "24/7" },
      { label: "Qualified Case Intakes", before: "Baseline", after: "+67% ↑" },
      { label: "ROI", before: "Baseline", after: "4.5x (6 months) ↑" },
    ],
  },
  {
    icon: Sparkles,
    title: "MedSpas",
    subtext: "Premier MedSpa",
    metrics: [
      { label: "Consultation Bookings", before: "Baseline", after: "+127% ↑" },
      { label: "No-Show Rate", before: "High", after: "-64% (Decrease)" },
      { label: "Treatment Packages", before: "Baseline", after: "+203% ↑" },
    ],
  },
];

function IndustryCardComponent({ card }: { card: IndustryCard }) {
  const Icon = card.icon;
  
  return (
    <div className="w-[360px] h-[320px] flex-shrink-0 p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 shadow-xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-display font-semibold text-white truncate">{card.title}</h3>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{card.subtext}</p>
        </div>
      </div>
      
      {/* Metrics Table */}
      <div className="space-y-0">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/5">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider"></div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider text-center">Before</div>
          <div className="text-[10px] font-mono text-primary/70 uppercase tracking-wider text-center">After</div>
        </div>
        
        {/* Table Rows */}
        {card.metrics.map((metric, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 py-2.5 border-b border-white/5 last:border-b-0">
            <div className="text-[11px] text-slate-400 font-medium">{metric.label}</div>
            <div className="text-[11px] text-slate-500 text-center">{metric.before}</div>
            <div className="text-[11px] text-primary font-semibold text-center">
              {metric.after}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustryCarousel() {
  // Duplicate cards for seamless infinite scroll
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
      </div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2280],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedCards.map((card, index) => (
              <IndustryCardComponent key={index} card={card} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/industries">
            <Button 
              variant="outline" 
              className="border-white/10 hover:border-primary/30 hover:bg-white/5 text-white px-8 h-12 rounded-full font-medium"
            >
              View All Case Studies <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
