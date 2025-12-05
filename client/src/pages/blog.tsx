import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      content: string[];
    }[];
    keyTakeaways: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "reduce-operational-drag-using-practical-ai",
    title: "How to Reduce Operational Drag Using Practical AI",
    category: "Operations",
    excerpt: "Most service businesses lose 30–90 hours a month to avoidable manual work. Here's how to identify and remove the bottlenecks.",
    date: "2025-01-15",
    content: {
      intro: "Operational drag isn't caused by bad employees — it's caused by unclear workflows. This guide shows you where AI actually makes a difference today (and where it doesn't).",
      sections: [
        {
          heading: "1. Identify your \"manual loops\"",
          content: [
            "These are tasks repeated daily or weekly that follow the same steps each time.",
            "Examples: intake, follow-up, scheduling, updates, qualification."
          ]
        },
        {
          heading: "2. Determine which loops require judgment",
          content: [
            "AI is great at structured tasks, not ambiguous ones.",
            "Mark loops as:",
            "• admin",
            "• communication",
            "• decision-support"
          ]
        },
        {
          heading: "3. Deploy AI only on structured, repeatable sequences",
          content: [
            "This is where real ROI appears — not in random experiments."
          ]
        },
        {
          heading: "4. Track before→after impact",
          content: [
            "Measure:",
            "• hours saved",
            "• response time improvement",
            "• follow-up completion",
            "• fewer customer complaints"
          ]
        }
      ],
      keyTakeaways: [
        "AI removes bottlenecks only when workflows are clear. Fix clarity first, then apply AI deliberately."
      ]
    }
  },
  {
    slug: "fix-follow-up-system-with-ai",
    title: "How to Fix Your Follow-Up System with AI (Without Automating Everything)",
    category: "Leads",
    excerpt: "Follow-up creates more revenue than lead generation — but most businesses fail at it. Here's a practical fix.",
    date: "2025-01-12",
    content: {
      intro: "You don't need \"AI agents\" to improve follow-up. You need a clean sequence that AI can support.",
      sections: [
        {
          heading: "1. Map the actual follow-up steps",
          content: [
            "No tools. No apps. Just the real flow:",
            "Inquiry → first reply → qualification → offer → reminder → close → review request."
          ]
        },
        {
          heading: "2. Add AI only where predictable",
          content: [
            "Examples:",
            "• confirming inquiries",
            "• sending reminders",
            "• summarizing customer notes",
            "• detecting stalled leads"
          ]
        },
        {
          heading: "3. Keep humans where nuance matters",
          content: [
            "Offers, negotiation, complex questions — human only."
          ]
        },
        {
          heading: "4. Measure \"follow-up completion rate\"",
          content: [
            "This metric determines revenue predictability."
          ]
        }
      ],
      keyTakeaways: [
        "AI boosts follow-up consistency, but the sequence must be clear first."
      ]
    }
  },
  {
    slug: "map-customer-journey-for-ai",
    title: "The Simplest Way to Map Your Customer Journey for AI",
    category: "Systems",
    excerpt: "Before AI can help, your business needs a clear, step-by-step customer journey. Here's the simplest method.",
    date: "2025-01-10",
    content: {
      intro: "AI can't fix chaos. It can only enhance clarity. This framework gives you that clarity.",
      sections: [
        {
          heading: "1. Break the journey into 5 phases",
          content: [
            "Awareness → Inquiry → Conversion → Delivery → Retention"
          ]
        },
        {
          heading: "2. List every touchpoint",
          content: [
            "Forms, emails, calls, texts, tasks, reminders."
          ]
        },
        {
          heading: "3. Mark each touchpoint as:",
          content: [
            "• Manual",
            "• Semi-automated",
            "• Fully automated",
            "• AI-supported",
            "• AI-ready (but not implemented)"
          ]
        },
        {
          heading: "4. Identify bottlenecks",
          content: [
            "Common ones: slow replies, unclear next steps, manual routing, inconsistent updates."
          ]
        }
      ],
      keyTakeaways: [
        "A clean journey map is the foundation of all operational AI work."
      ]
    }
  },
  {
    slug: "where-ai-is-useful-in-service-businesses",
    title: "Where AI Is Actually Useful in Service Businesses Today",
    category: "AI Adoption",
    excerpt: "Here are the use cases producing real results — and the ones still overhyped.",
    date: "2025-01-08",
    content: {
      intro: "AI can reduce friction, but it must be used where the patterns are stable.",
      sections: [
        {
          heading: "Useful Today",
          content: [
            "• Intake confirmation",
            "• Lead scoring",
            "• Customer updates",
            "• Scheduling assistance",
            "• SOP generation",
            "• Message drafting",
            "• Internal summaries"
          ]
        },
        {
          heading: "Not Useful Yet",
          content: [
            "• Full conversation replacement",
            "• Emotional handling",
            "• Complex troubleshooting",
            "• Long-form negotiation",
            "• Anything requiring deep context"
          ]
        }
      ],
      keyTakeaways: [
        "Practical AI is narrow, structured, and specific — not general intelligence."
      ]
    }
  },
  {
    slug: "use-ai-to-improve-team-communication",
    title: "How to Use AI to Improve Team Communication",
    category: "Operations",
    excerpt: "Most internal mistakes happen because teams don't have a shared understanding. AI can fix that.",
    date: "2025-01-05",
    content: {
      intro: "",
      sections: [
        {
          heading: "1. Use AI to summarize calls, notes, and updates",
          content: [
            "Everyone stays aligned."
          ]
        },
        {
          heading: "2. Use AI to create SOP drafts",
          content: [
            "Then humans refine them."
          ]
        },
        {
          heading: "3. Use AI to detect missing info",
          content: [
            "AI can tell you when something needs clarification."
          ]
        }
      ],
      keyTakeaways: [
        "AI enhances alignment — but not leadership."
      ]
    }
  },
  {
    slug: "weekly-ops-review-improves-everything",
    title: "The 30-Minute Weekly Ops Review That Improves Everything",
    category: "Management",
    excerpt: "This simple habit makes AI adoption easier and operations more predictable.",
    date: "2025-01-02",
    content: {
      intro: "",
      sections: [
        {
          heading: "Step 1: List last week's failures or friction",
          content: [
            "No blaming. Just patterns."
          ]
        },
        {
          heading: "Step 2: Map each issue to a sequence",
          content: [
            "Intake, follow-up, scheduling, handoffs, etc."
          ]
        },
        {
          heading: "Step 3: Decide whether the fix is:",
          content: [
            "• clarity",
            "• SOP",
            "• automation",
            "• AI support",
            "• human training"
          ]
        },
        {
          heading: "Step 4: Track improvements weekly",
          content: [
            "This builds momentum."
          ]
        }
      ],
      keyTakeaways: [
        "AI works best in businesses that review their ops regularly."
      ]
    }
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
          <ContactFormDialog
            source="blog-header"
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
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
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

      {/* Bottom CTA */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium mb-10">
              Ready for <span className="text-primary">Clarity</span>?
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              Start with a simple diagnostic to see exactly where AI can improve your operations today.
            </p>
            <ContactFormDialog
              source="blog-cta"
              title="Book a Diagnostic"
              description="Start with a simple, non-technical assessment and get a clear view of where AI can improve your business today."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]"
                  data-testid="button-blog-cta"
                >
                  Book a Diagnostic
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
