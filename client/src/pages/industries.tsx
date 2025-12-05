import { motion } from "framer-motion";
import { 
  Home, 
  Scale, 
  Sparkles, 
  Building2, 
  Smile,
  Users,
  CheckCircle2,
  TrendingUp,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

interface CaseStudy {
  title: string;
  metrics: { value: string; label: string }[];
}

interface ClientQuote {
  quote: string;
  name: string;
  role: string;
}

interface Industry {
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  clarifies: string[];
  caseStudy: CaseStudy;
  clientQuote?: ClientQuote;
}

const industries: Industry[] = [
  {
    label: "Home Services",
    title: "Home Services",
    description: "Speed and follow-through define success in home services. When leads slip through the cracks or scheduling falls apart, revenue walks out the door.",
    icon: Home,
    clarifies: [
      "Intake flow clarity across phone, web, and text channels",
      "Lead prioritization sequences during peak demand windows",
      "Follow-up rhythm mapping for estimates and callbacks",
      "AI-readiness assessment for scheduling and routing"
    ],
    caseStudy: {
      title: "Roofing Company",
      metrics: [
        { value: "31%", label: "Increase in estimate bookings" },
        { value: "2.4×", label: "Faster lead response time" },
        { value: "27 hrs", label: "Operational time regained monthly" }
      ]
    },
    clientQuote: {
      quote: "We finally see exactly where leads get stuck. The clarity alone changed how we think about our day.",
      name: "Marcus T.",
      role: "Owner, Reliable Roofing Co."
    }
  },
  {
    label: "Legal",
    title: "Law Firms & Legal Practices",
    description: "Case value begins at intake. Inconsistent qualification and unclear follow-up sequences leave potential clients uncertain and unengaged.",
    icon: Scale,
    clarifies: [
      "Case intake sequence from first contact to consultation",
      "Qualification logic for consistent case screening",
      "Client communication cadence during evaluation period",
      "Document request workflow and follow-up clarity"
    ],
    caseStudy: {
      title: "Personal Injury Firm",
      metrics: [
        { value: "24/7", label: "Intake visibility across channels" },
        { value: "41%", label: "More qualified case intakes" },
        { value: "3.2×", label: "ROI in first 6 months" }
      ]
    }
  },
  {
    label: "MedSpa & Aesthetics",
    title: "MedSpas & Aesthetic Clinics",
    description: "Consultation flow and package follow-up drive lifetime value. When prospects fall through the cracks, so does recurring revenue.",
    icon: Sparkles,
    clarifies: [
      "Consultation journey from inquiry to booked appointment",
      "Package follow-up touchpoints and re-engagement timing",
      "Membership renewal and retention workflow mapping",
      "AI-readiness for appointment reminders and check-ins"
    ],
    caseStudy: {
      title: "Premier MedSpa",
      metrics: [
        { value: "+89%", label: "Consultation booking rate" },
        { value: "-52%", label: "No-show reduction" },
        { value: "+127%", label: "Treatment package conversions" }
      ]
    },
    clientQuote: {
      quote: "SimpleSequence showed us the gaps we couldn't see. Our consultation process finally makes sense.",
      name: "Sarah C.",
      role: "Director, Premier MedSpa"
    }
  },
  {
    label: "Real Estate",
    title: "Real Estate Teams & Brokerages",
    description: "Lead speed and pipeline discipline determine who closes. Without shared sequences, every agent operates in a silo.",
    icon: Building2,
    clarifies: [
      "Lead-handling sequence for consistent team response",
      "Follow-up cadences for new leads, nurture, and past clients",
      "Pipeline stage clarity and accountability mapping",
      "Transaction update workflow and communication standards"
    ],
    caseStudy: {
      title: "Regional Brokerage",
      metrics: [
        { value: "18%", label: "Faster average lead response" },
        { value: "2.1×", label: "Improvement in lead conversion" },
        { value: "34 hrs", label: "Agent time saved monthly" }
      ]
    }
  },
  {
    label: "Dental",
    title: "Dental Practices",
    description: "Patient retention and recare scheduling drive practice health. Missed appointments and inconsistent follow-up erode both revenue and trust.",
    icon: Smile,
    clarifies: [
      "New patient intake and onboarding sequence clarity",
      "Recare and hygiene appointment reminder workflows",
      "Treatment acceptance follow-up mapping",
      "AI-readiness for scheduling and patient communication"
    ],
    caseStudy: {
      title: "Family Dental Practice",
      metrics: [
        { value: "-38%", label: "Reduction in missed appointments" },
        { value: "+24%", label: "Increase in treatment acceptance" },
        { value: "19 hrs", label: "Front desk time regained weekly" }
      ]
    },
    clientQuote: {
      quote: "Our recare system was chaos. Now we actually know which patients need attention and when.",
      name: "Dr. Amanda R.",
      role: "Owner, Bright Smile Dental"
    }
  },
  {
    label: "Professional Services",
    title: "Coaching & Professional Services",
    description: "Discovery calls and client onboarding set the tone for the entire relationship. Unclear sequences create friction before work even begins.",
    icon: Users,
    clarifies: [
      "Discovery call intake and qualification sequence",
      "Client onboarding workflow and milestone clarity",
      "Engagement follow-up and check-in rhythm mapping",
      "Referral and testimonial request timing"
    ],
    caseStudy: {
      title: "Executive Coaching Firm",
      metrics: [
        { value: "+47%", label: "Discovery call booking rate" },
        { value: "2.8×", label: "Client onboarding efficiency" },
        { value: "+31%", label: "Referral conversion improvement" }
      ]
    }
  }
];

function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  
  return (
    <div className="flex-shrink-0 w-[520px] md:w-[600px] lg:w-[700px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group overflow-hidden">
      <div className="grid md:grid-cols-12 h-full">
        {/* Main Content */}
        <div className="md:col-span-7 p-8">
          {/* Label Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-5">
            <Icon className="w-3.5 h-3.5" />
            {industry.label}
          </div>
          
          {/* Title & Description */}
          <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-primary transition-colors">
            {industry.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {industry.description}
          </p>
          
          {/* What We Clarify For You */}
          <div>
            <h4 className="text-xs font-mono text-primary/80 uppercase tracking-wider mb-4">What We Clarify For You</h4>
            <ul className="space-y-2.5">
              {industry.clarifies.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Case Study Panel */}
        <div className="md:col-span-5 p-6 bg-white/[0.02] border-l border-white/5 flex flex-col justify-between">
          {/* Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary/60" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Case Study</span>
            </div>
            <p className="text-sm font-medium text-white mb-4">{industry.caseStudy.title}</p>
            <div className="space-y-4">
              {industry.caseStudy.metrics.map((metric, i) => (
                <div key={i}>
                  <div className="text-2xl font-display font-semibold text-primary">{metric.value}</div>
                  <div className="text-xs text-slate-500">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Client Quote */}
          {industry.clientQuote && (
            <div className="mt-6 pt-5 border-t border-white/5">
              <Quote className="w-4 h-4 text-primary/40 mb-2" />
              <p className="text-xs text-slate-400 italic leading-relaxed mb-3">
                "{industry.clientQuote.quote}"
              </p>
              <div>
                <p className="text-xs font-medium text-white">{industry.clientQuote.name}</p>
                <p className="text-xs text-slate-500">{industry.clientQuote.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfiniteCarousel({ 
  items, 
  direction = "left"
}: { 
  items: Industry[];
  direction?: "left" | "right";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId: number;
    let scrollPosition = direction === "left" ? 0 : scrollContainer.scrollWidth / 2;
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        if (direction === "left") {
          scrollPosition += 0.4;
          if (scrollPosition >= scrollContainer.scrollWidth / 2) {
            scrollPosition = 0;
          }
        } else {
          scrollPosition -= 0.4;
          if (scrollPosition <= 0) {
            scrollPosition = scrollContainer.scrollWidth / 2;
          }
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [direction, isPaused]);
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];
  
  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden py-2"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedItems.map((industry, index) => (
          <IndustryCard key={`${industry.label}-${index}`} industry={industry} />
        ))}
      </div>
    </div>
  );
}

export default function Industries() {
  // Split industries into pairs for each row
  const row1Industries = [industries[0], industries[1]]; // Home Services, Law Firms
  const row2Industries = [industries[2], industries[3]]; // MedSpas, Real Estate
  const row3Industries = [industries[4], industries[5]]; // Dental, Coaching
  
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-display font-semibold tracking-tight text-white hover:text-primary transition-colors">
            SimpleSequence
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Home</a>
            <a href="/solutions" className="text-sm text-muted-foreground hover:text-white transition-colors">Solutions</a>
            <a href="/industries" className="text-sm text-white">Industries</a>
            <a href="/#offers" className="text-sm text-muted-foreground hover:text-white transition-colors">Offers</a>
          </nav>
          <ContactFormDialog
            source="industries-header"
            title="Get Started"
            description="Tell us about your business and we'll help you find the right solution."
            trigger={
              <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5 hover:text-white text-xs font-medium rounded-full px-6 transition-all duration-300 hover:border-primary/50">
                Get Started
              </Button>
            }
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-40" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm font-mono text-primary mb-6 block">INDUSTRIES WE SUPPORT</span>
            <h1 className="text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight">
              Industry-Specific <span className="text-primary">AI & Operational Clarity</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-6 max-w-3xl mx-auto">
              We specialize in service businesses where response time, follow-up, and operational efficiency decide who wins the work.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Every industry has its own friction patterns. SimpleSequence helps you see where AI actually fits into your operations — so your team can move faster, waste less effort, and make better use of the systems you already have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Carousels */}
      <section className="py-12 space-y-10">
        {/* Row 1 - Left to Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfiniteCarousel items={row1Industries} direction="left" />
        </motion.div>
        
        {/* Row 2 - Right to Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteCarousel items={row2Industries} direction="right" />
        </motion.div>
        
        {/* Row 3 - Left to Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfiniteCarousel items={row3Industries} direction="left" />
        </motion.div>
      </section>

      {/* Bottom CTA - Don't See Your Industry? */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-8">
              Don't See <span className="text-primary">Your Industry</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              We work with any service business where operational clarity and response consistency drive revenue. Let's discuss your specific needs.
            </p>
            <ContactFormDialog
              source="industries-cta"
              title="Schedule a Discovery Call"
              description="Tell us about your business and we'll help you understand where operational clarity can make the biggest impact."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  data-testid="button-industries-cta"
                >
                  Schedule a Discovery Call
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-sm text-zinc-600 text-center bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 SimpleSequence. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
