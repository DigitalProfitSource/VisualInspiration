import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  hook: string[];
  insight: string;
  framework: {
    step: number;
    title: string;
    description?: string;
  }[];
  miniCaseStudy: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "reduce-operational-drag-using-practical-ai",
    title: "How to Reduce Operational Drag Using Practical AI",
    category: "Operations",
    date: "2025-01-14",
    hook: [
      "The owner of a 20-person service business told me something I hear every week:",
      "\"Why does everything feel harder than it should? We're busy, but nothing feels smooth.\"",
      "Their team wasn't lazy. Their tools weren't bad. But every day felt the same: slow follow-ups, unclear handoffs, piling tasks. Tiny delays stacked until the whole day became heavy.",
      "They weren't dealing with incompetence — they were dealing with invisible friction."
    ],
    insight: "AI removes drag only when you know where the drag lives.",
    framework: [
      { step: 1, title: "Identify repeated tasks draining time." },
      { step: 2, title: "Map the steps exactly as they happen today." },
      { step: 3, title: "Mark steps as manual, semi-manual, or repeatable." },
      { step: 4, title: "Automate predictable steps first." },
      { step: 5, title: "Reduce human involvement in low-value steps." }
    ],
    miniCaseStudy: "One company reduced 40–70 hours/month of admin simply by automating confirmations and reminders.",
    faq: [
      { question: "What causes operational drag?", answer: "Repeated manual tasks and unclear steps." },
      { question: "Where does AI help most?", answer: "Repetitive workflows." },
      { question: "Do I need new software?", answer: "Usually no." },
      { question: "How fast can drag be reduced?", answer: "Days for basics, weeks for deeper fixes." }
    ]
  },
  {
    slug: "fix-follow-up-system-with-ai",
    title: "How to Fix Your Follow-Up System with AI (Without Automating Everything)",
    category: "Leads",
    date: "2025-01-11",
    hook: [
      "A business owner once showed me their follow-up system: notebooks, a spreadsheet, a half-finished CRM. They weren't failing — they were overwhelmed.",
      "New leads came in faster than anyone could respond. Old leads quietly died. Follow-up depended entirely on whoever was \"on it\" that week.",
      "This is one of the most common points where businesses leak money without knowing it."
    ],
    insight: "AI doesn't replace follow-up — it makes it consistent.",
    framework: [
      { step: 1, title: "Separate leads into new, warm, dormant." },
      { step: 2, title: "Define the first three touches for each group." },
      { step: 3, title: "Mark where humans add value." },
      { step: 4, title: "Add AI to fill timing gaps." },
      { step: 5, title: "Use AI to notify humans when real conversations matter." }
    ],
    miniCaseStudy: "One contractor increased follow-up completion from 31% to 89% using AI for timing, not tone.",
    faq: [
      { question: "What should be automated first?", answer: "First-touch and reminders." },
      { question: "Will AI sound robotic?", answer: "Not when AI handles timing, not tone." },
      { question: "How do I divide human vs AI tasks?", answer: "Humans handle nuance; AI handles repetition." }
    ]
  },
  {
    slug: "map-customer-journey-for-ai",
    title: "The Simplest Way to Map Your Customer Journey for AI",
    category: "Systems",
    date: "2025-01-09",
    hook: [
      "A business came to me drowning in tools — CRM, forms, chat widgets, messy automations.",
      "Customers felt it too: unanswered forms, double reminders, unclear next steps.",
      "Nobody truly knew the journey. Everyone assumed someone else did."
    ],
    insight: "AI can only improve what is already clear.",
    framework: [
      { step: 1, title: "Break the journey into 5 phases." },
      { step: 2, title: "List every touchpoint." },
      { step: 3, title: "Mark each touchpoint by automation level." },
      { step: 4, title: "Identify bottlenecks." },
      { step: 5, title: "Fix the flow before adding AI." }
    ],
    miniCaseStudy: "A medspa cut no-shows by 64% after mapping their journey and adding AI at the right moments.",
    faq: [
      { question: "Why start with a journey map?", answer: "It prevents automating the wrong things." },
      { question: "How long should it be?", answer: "One page." },
      { question: "Where does AI fit best?", answer: "Timing and consistency." }
    ]
  },
  {
    slug: "where-ai-is-useful-in-service-businesses",
    title: "Where AI Is Actually Useful in Service Businesses Today",
    category: "AI Adoption",
    date: "2025-01-07",
    hook: [
      "People talk about AI like it's magic, but business owners ask something different:",
      "\"Where does AI help me today without breaking my operations?\"",
      "The good news: the answer is simple, and far less dramatic than the hype."
    ],
    insight: "AI works best where work repeats.",
    framework: [
      { step: 1, title: "Instant responses to new inquiries." },
      { step: 2, title: "Routing requests to the right person." },
      { step: 3, title: "Sending reminders and updates." },
      { step: 4, title: "Qualifying leads with simple questions." },
      { step: 5, title: "Answering repeated internal questions." }
    ],
    miniCaseStudy: "A firm increased qualified intakes by 67% using simple AI-assisted intake questions.",
    faq: [
      { question: "Is AI better for customers or teams?", answer: "Both." },
      { question: "Will AI replace staff?", answer: "No — it removes busywork." },
      { question: "Does AI need a perfect system?", answer: "No — just clarity." }
    ]
  },
  {
    slug: "use-ai-to-improve-team-communication",
    title: "How to Use AI to Improve Team Communication",
    category: "Operations",
    date: "2025-01-04",
    hook: [
      "Most internal mistakes happen not from laziness but from misalignment.",
      "Teams interpret tasks differently, forget details, or miss messages buried in apps.",
      "I've watched teams argue over things that were never clearly defined."
    ],
    insight: "AI reduces miscommunication by standardizing repetition.",
    framework: [
      { step: 1, title: "Centralize rules and processes." },
      { step: 2, title: "Turn repeated questions into AI prompts." },
      { step: 3, title: "Use AI to summarize updates." },
      { step: 4, title: "Use AI to notify the right people." },
      { step: 5, title: "Add AI to the weekly team rhythm." }
    ],
    miniCaseStudy: "A 15-person company cut internal mistakes by half using AI summaries and alerts.",
    faq: [
      { question: "Does AI replace communication?", answer: "No — it organizes it." },
      { question: "Where should AI pull from?", answer: "One central source." },
      { question: "Does it work for small teams?", answer: "Even better." }
    ]
  },
  {
    slug: "weekly-ops-review-improves-everything",
    title: "The 30-Minute Weekly Ops Review That Improves Everything",
    category: "Management",
    date: "2025-01-01",
    hook: [
      "Most owners only discover problems when they've already exploded.",
      "Teams don't escalate early, owners can't check everything, and issues \"fix themselves\" (they don't).",
      "Small operational problems become revenue problems fast."
    ],
    insight: "AI makes a weekly review fast and predictable.",
    framework: [
      { step: 1, title: "Pull last week's data into one place." },
      { step: 2, title: "Let AI summarize key issues." },
      { step: 3, title: "Identify the top 3 priorities." },
      { step: 4, title: "Assign owners." },
      { step: 5, title: "Let AI track changes next week." }
    ],
    miniCaseStudy: "One business caught months of missed follow-up in a single 30-minute session because AI surfaced the pattern.",
    faq: [
      { question: "Why weekly?", answer: "Best rhythm for ops." },
      { question: "What to review first?", answer: "Handoffs and follow-up." },
      { question: "What does AI do?", answer: "Highlights patterns humans miss." }
    ]
  }
];

const categoryColors: Record<string, string> = {
  "Operations": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Leads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Systems": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "AI Adoption": "bg-primary/10 text-primary border-primary/20",
  "Management": "bg-amber-500/10 text-amber-400 border-amber-500/20"
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function getExcerpt(hook: string[]): string {
  return hook.slice(0, 2).join(" ");
}

export default function Blog() {
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
            <a href="/industries" className="text-sm text-muted-foreground hover:text-white transition-colors">Industries</a>
            <a href="/process" className="text-sm text-muted-foreground hover:text-white transition-colors">Process</a>
            <a href="/offers" className="text-sm text-muted-foreground hover:text-white transition-colors">Offers</a>
            <a href="/blog" className="text-sm text-white">Blog</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-44 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-40" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8">
              Insights & <span className="text-primary">How-To Guides</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl">
              Straightforward, practical guidance for applying AI to everyday operations. No hype — just clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block"
                data-testid={`blog-card-${post.slug}`}
              >
                <article className="h-full p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-display font-medium text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {getExcerpt(post.hook)}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
