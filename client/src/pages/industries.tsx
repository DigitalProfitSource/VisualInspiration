import { motion } from "framer-motion";
import { 
  Home, 
  Scale, 
  Sparkles, 
  Building2, 
  Smile,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { CircuitBeams } from "@/components/ui/circuit-beams";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

interface CaseStudy {
  title: string;
  subtitle?: string;
  metrics: { value: string; label: string }[];
}

interface Industry {
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  deliverables: { title: string; desc: string }[];
  caseStudy: CaseStudy;
}

const industries: Industry[] = [
  {
    label: "Home Services",
    title: "Home Services",
    description: "For roofing, HVAC, plumbing, electrical, and other home service businesses where speed and availability win contracts.",
    icon: Home,
    deliverables: [
      { title: "Intake Flow Architecture", desc: "Clear pathways for leads across phone, web, and text" },
      { title: "Priority Routing Logic", desc: "Know which leads need immediate attention" },
      { title: "Follow-Up Sequences", desc: "Consistent rhythm for estimates and callbacks" },
      { title: "AI-Readiness Map", desc: "Where automation genuinely helps vs. hinders" }
    ],
    caseStudy: {
      title: "Real Results",
      metrics: [
        { value: "47%", label: "Increase in estimate bookings for roofing company" },
        { value: "3.2×", label: "More emergency calls converted after hours" },
        { value: "89%", label: "Lead follow-up completion rate (vs. 31% before)" }
      ]
    }
  },
  {
    label: "Legal",
    title: "Law Firms",
    description: "For personal injury, family law, and estate planning practices where initial consultation quality determines case value.",
    icon: Scale,
    deliverables: [
      { title: "Case Intake Sequences", desc: "From first contact to qualified consultation" },
      { title: "Nurture Campaign Clarity", desc: "Keep prospects engaged during decision period" },
      { title: "Referral Partner Workflows", desc: "Make it easy for others to send you cases" },
      { title: "Client Communication Hub", desc: "Reduce \"where's my case\" calls" }
    ],
    caseStudy: {
      title: "Case Study",
      subtitle: "Personal Injury Firm",
      metrics: [
        { value: "24/7", label: "Consultation availability" },
        { value: "67%", label: "More qualified case intakes" },
        { value: "4.5×", label: "ROI in first 6 months" }
      ]
    }
  },
  {
    label: "MedSpa & Aesthetics",
    title: "MedSpas & Aesthetic Practices",
    description: "For cosmetic and wellness businesses where consultation experience and follow-up determine lifetime customer value.",
    icon: Sparkles,
    deliverables: [
      { title: "Consultation Booking Flow", desc: "Smart scheduling with service pre-qualification" },
      { title: "Treatment Series Logic", desc: "Follow-up sequences for package buyers" },
      { title: "Membership Clarity", desc: "Retain recurring revenue clients" },
      { title: "Post-Treatment Check-Ins", desc: "Automated care and upsell opportunities" }
    ],
    caseStudy: {
      title: "Client Success Story",
      metrics: [
        { value: "+127%", label: "Consultation bookings" },
        { value: "-64%", label: "No-show rate" },
        { value: "+203%", label: "Treatment packages sold" }
      ]
    }
  },
  {
    label: "Real Estate",
    title: "Real Estate Teams & Brokerages",
    description: "For residential teams and brokerages where lead speed, pipeline visibility, and follow-through drive commissions.",
    icon: Building2,
    deliverables: [
      { title: "Lead Response Sequences", desc: "Consistent handling across the whole team" },
      { title: "Nurture Cadences", desc: "Stay top-of-mind with past clients" },
      { title: "Pipeline Stage Clarity", desc: "Know exactly where every deal stands" },
      { title: "Transaction Updates", desc: "Keep buyers informed without manual effort" }
    ],
    caseStudy: {
      title: "Real Results",
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
    description: "For dental offices where patient retention, recare scheduling, and treatment acceptance drive practice health.",
    icon: Smile,
    deliverables: [
      { title: "New Patient Onboarding", desc: "Seamless intake from first call to first visit" },
      { title: "Recare Reminder Logic", desc: "Never let hygiene appointments slip" },
      { title: "Treatment Acceptance Flow", desc: "Follow-up that moves patients to yes" },
      { title: "Front Desk Efficiency", desc: "Reduce phone tag and manual scheduling" }
    ],
    caseStudy: {
      title: "Practice Results",
      metrics: [
        { value: "-38%", label: "Reduction in missed appointments" },
        { value: "+24%", label: "Increase in treatment acceptance" },
        { value: "19 hrs", label: "Front desk time regained weekly" }
      ]
    }
  }
];

function IndustrySection({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon;
  const isReversed = index % 2 === 1;
  
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-start ${isReversed ? 'lg:flex-row-reverse' : ''}`}
        >
          {/* Main Content */}
          <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Icon Box */}
            <div className="w-16 h-16 mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 hover:border-primary/50 transition-all duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
              {industry.title}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              {industry.description}
            </p>

            {/* The Clarity We Deliver */}
            <div>
              <h3 className="text-base font-semibold text-white mb-6">The Clarity We Deliver:</h3>
              <ul className="space-y-5">
                {industry.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">{item.title}:</span>{" "}
                      <span className="text-slate-400">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Card */}
          <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
              {/* Card Header */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white">{industry.caseStudy.title}</h4>
                {industry.caseStudy.subtitle && (
                  <p className="text-sm text-slate-500 mt-1">{industry.caseStudy.subtitle}</p>
                )}
              </div>

              {/* Metrics */}
              <div className="space-y-8">
                {industry.caseStudy.metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-display font-semibold text-primary mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      {index < industries.length - 1 && (
        <div className="container mx-auto px-6 mt-24 md:mt-32">
          <div className="border-b border-white/5" />
        </div>
      )}
    </section>
  );
}

export default function Industries() {
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
              Industry-Specific <span className="text-primary">Operational Clarity</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              We specialize in service businesses where response time, follow-up, and operational efficiency decide who wins the work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Sections */}
      {industries.map((industry, index) => (
        <IndustrySection key={industry.label} industry={industry} index={index} />
      ))}

      {/* Bottom CTA */}
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
