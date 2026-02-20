import { motion } from "framer-motion";
import { Building2, Home, Scale, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const caseStudies = [
  {
    category: "Real Estate",
    sub: "Lead qualification, showing coordination, and transaction milestone tracking.",
    icon: Building2,
    metrics: [
      { label: "Speed-to-Lead", before: "1-2 Hours", after: "<1 Minute", highlight: "(Instant)" },
      { label: "Total Lead Conv", before: "2%", after: "8%", highlight: "(+300% ↑)" },
      { label: "Showing Requests", before: "Manual Coordination", after: "Auto-Calibrated Booking", highlight: "" },
    ]
  },
  {
    category: "Home Services",
    sub: "Roofing Company",
    icon: Home,
    metrics: [
      { label: "Lead Follow-Up Rate", before: "31%", after: "89%", highlight: "(+187% ↑)" },
      { label: "Response Time", before: "12+ hours", after: "<5 minutes", highlight: "" },
      { label: "Estimate Bookings", before: "Baseline", after: "+47% ↑", highlight: "" },
    ]
  },
  {
    category: "Law Firms",
    sub: "Personal Injury Firm",
    icon: Scale,
    metrics: [
      { label: "Consultation Avail", before: "Business hours only", after: "24/7", highlight: "" },
      { label: "Qualified Case Intakes", before: "Baseline", after: "+67% ↑", highlight: "" },
      { label: "ROI", before: "Baseline", after: "4.5x (6 months) ↑", highlight: "" },
    ]
  }
];

export function IndustryCaseStudies() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6 text-white">
            Tailored for <span className="text-[#6EE0F7]">High-Impact Results</span>
          </h2>
          <p className="text-lg text-slate-400 font-mono tracking-tight">
            Real metrics from real businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-[#6EE0F7]/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <study.icon className="w-6 h-6 text-[#6EE0F7]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white">{study.category}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{study.sub}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase pb-2 border-b border-zinc-800">
                  <div className="col-span-1">Metric</div>
                  <div className="text-center">Before</div>
                  <div className="text-right">After</div>
                </div>
                {study.metrics.map((m, j) => (
                  <div key={j} className="grid grid-cols-3 items-center py-1">
                    <div className="text-xs text-slate-400 font-medium leading-tight">{m.label}</div>
                    <div className="text-center text-xs text-slate-500">{m.before}</div>
                    <div className="text-right">
                      <div className="text-xs text-[#6EE0F7] font-semibold">{m.after}</div>
                      {m.highlight && <div className="text-[9px] text-[#6EE0F7]/70 font-mono">{m.highlight}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/case-studies">
            <button className="group flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-800 text-sm font-medium text-white hover:bg-white/5 transition-colors">
              View All Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
