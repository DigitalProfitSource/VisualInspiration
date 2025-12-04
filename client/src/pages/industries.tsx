import { motion } from "framer-motion";
import { 
  Home, 
  Scale, 
  Sparkles, 
  Building2, 
  Bug, 
  Hammer,
  AlertCircle,
  Lightbulb
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

interface Industry {
  label: string;
  title: string;
  blurb: string;
  icon: React.ElementType;
  dragPoints: string[];
  aiPoints: string[];
}

const industries: Industry[] = [
  {
    label: "Home Services",
    title: "Home Services & Home Trades",
    blurb: "For roofing, HVAC, plumbing, electrical, landscaping, and other home service businesses where speed, scheduling, and follow-up decide who gets the job.",
    icon: Home,
    dragPoints: [
      "Leads come in from too many places with no clear intake path",
      "Scheduling, rescheduling, and \"just checking in\" calls eat the day",
      "Estimates and follow-ups depend on whoever remembers"
    ],
    aiPoints: [
      "Clarifying a single intake sequence across phone, web, and text",
      "Prioritizing which leads get contacted first during peak demand",
      "Giving your team a clear follow-up rhythm they can run or automate"
    ]
  },
  {
    label: "Legal",
    title: "Law Firms & Legal Practices",
    blurb: "For personal injury, family law, and estate planning firms where intake quality and consistent communication drive case value.",
    icon: Scale,
    dragPoints: [
      "Intake forms collect info but don't qualify cases consistently",
      "Staff spends hours chasing documents and next steps",
      "Clients call \"just for an update\" because the process isn't clear"
    ],
    aiPoints: [
      "Defining a repeatable case-intake sequence from first contact to consult",
      "Standardizing follow-up and expectations between consult and engagement",
      "Mapping which updates should be automated vs. handled by your team"
    ]
  },
  {
    label: "MedSpa & Aesthetics",
    title: "MedSpas & Aesthetic Practices",
    blurb: "For cosmetic and wellness clinics where consultation flow, package follow-up, and membership retention drive lifetime value.",
    icon: Sparkles,
    dragPoints: [
      "Consultation requests pile up without clear triage or qualification",
      "Package follow-ups rely on manual reminders or individual providers",
      "Membership billing and engagement happen in separate silos"
    ],
    aiPoints: [
      "Designing a consultation journey from first interest to booked visit",
      "Clarifying touchpoints for package follow-ups and re-engagement",
      "Mapping a simple rhythm for check-ins, reviews, and renewals"
    ]
  },
  {
    label: "Real Estate",
    title: "Real Estate Teams & Brokerages",
    blurb: "For residential teams and small brokerages where lead speed, pipeline visibility, and communication discipline drive commissions.",
    icon: Building2,
    dragPoints: [
      "Online leads sit in inboxes or CRMs with unclear next steps",
      "Agents each run their own follow-up style with no shared rhythm",
      "Transaction updates are scattered across email, text, and calls"
    ],
    aiPoints: [
      "Clarifying a single lead-handling sequence for the whole team",
      "Designing follow-up cadences for new leads, nurture, and past clients",
      "Defining when and how AI should assist with updates, reminders, and routing"
    ]
  },
  {
    label: "Field Services",
    title: "Pest Control & Field Service Operators",
    blurb: "For pest control, wildlife removal, and similar field services where urgency, routing, and repeat visits are core to revenue.",
    icon: Bug,
    dragPoints: [
      "Urgent leads compete with scheduled work and overwhelm the front desk",
      "Technicians, office staff, and customers aren't always on the same page",
      "Recurring or quarterly treatments slip through the cracks"
    ],
    aiPoints: [
      "Designing a triage sequence for urgent vs. routine requests",
      "Clarifying communication handoffs between office, tech, and customer",
      "Mapping reminders and re-service touchpoints your team can run or automate"
    ]
  },
  {
    label: "Specialty Trades",
    title: "Specialty & Project-Based Contractors",
    blurb: "For remodeling, concrete, garage door, and other project-based contractors where estimates, pipeline discipline, and change orders can make or break margins.",
    icon: Hammer,
    dragPoints: [
      "Estimates and proposals are handled differently by each salesperson",
      "Pipeline stages aren't clear, so follow-up is inconsistent",
      "Change orders and updates don't flow cleanly back to the client"
    ],
    aiPoints: [
      "Standardizing how leads move from inquiry → estimate → decision",
      "Clarifying what information must be captured before quoting",
      "Designing simple update and follow-up sequences around each project stage"
    ]
  }
];

function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  
  return (
    <div className="flex-shrink-0 w-[400px] md:w-[480px] p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group">
      {/* Label Chip */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-6">
        <Icon className="w-3.5 h-3.5" />
        {industry.label}
      </div>
      
      {/* Title & Blurb */}
      <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-primary transition-colors">
        {industry.title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        {industry.blurb}
      </p>
      
      {/* Two Column Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Where operations drag */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-400/80" />
            <span className="text-xs font-mono text-orange-400/80 uppercase tracking-wider">Where operations drag</span>
          </div>
          <ul className="space-y-2">
            {industry.dragPoints.map((point, i) => (
              <li key={i} className="text-xs text-slate-500 leading-relaxed pl-4 border-l border-white/10">
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Where AI actually fits */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary/80" />
            <span className="text-xs font-mono text-primary/80 uppercase tracking-wider">Where AI fits</span>
          </div>
          <ul className="space-y-2">
            {industry.aiPoints.map((point, i) => (
              <li key={i} className="text-xs text-slate-400 leading-relaxed pl-4 border-l border-primary/30">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InfiniteCarousel({ 
  items, 
  direction = "left",
  speed = 40
}: { 
  items: Industry[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
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
          scrollPosition += 0.5;
          if (scrollPosition >= scrollContainer.scrollWidth / 2) {
            scrollPosition = 0;
          }
        } else {
          scrollPosition -= 0.5;
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
  }, [direction, isPaused, speed]);
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
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
  const row3Industries = [industries[4], industries[5]]; // Pest Control, Specialty Contractors
  
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
      <section className="pt-40 pb-20 relative overflow-hidden">
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
      <section className="py-16 space-y-12">
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
            <p className="text-xl text-slate-400 mb-6 max-w-2xl mx-auto">
              If your business relies on leads, calls, or booked appointments, the same operational patterns apply. We work with service businesses where response time, follow-up, and workflow clarity directly impact revenue.
            </p>
            <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto">
              If you're not sure whether AI can actually help your operations, that's exactly what we're here to clarify.
            </p>
            <ContactFormDialog
              source="industries-cta"
              title="Talk About Your Industry"
              description="Tell us about your business and we'll help you understand where AI and operational clarity can make the biggest impact."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  data-testid="button-industries-cta"
                >
                  Talk About Your Industry
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
