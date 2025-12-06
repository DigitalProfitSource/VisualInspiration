import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  content: string[];
  actionSteps: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "when-the-business-starts-slipping-through-the-cracks",
    title: "When the Business Starts Slipping Through the Cracks",
    subtitle: "What happens when growth arrives faster than structure.",
    category: "Operations",
    date: "2025-01-14",
    content: [
      "The owner swore things \"weren't that bad.\"\nJust a few missed calls. A couple follow-ups that fell through the cracks.\nNothing catastrophic.",
      "Then the patterns showed up.",
      "Quotes sent but never followed up.\nCustomers calling back frustrated because nobody replied.\nTasks floating between text messages, sticky notes, and \"I'll handle it later.\"",
      "No big failure — just a hundred small ones.",
      "Every day felt like catching falling plates.\nEvery win took twice the effort it should.\nEvery opportunity required manual pushing to move forward.",
      "The truth usually hits them in one quiet moment:",
      "The business didn't break.\nIt simply outgrew the way it's being run.",
      "AI doesn't fix everything.\nBut it does create breathing room —\nwhen the work is predictable, repeatable, and stupidly time-consuming.",
      "The owners don't ask for sophistication.\nThey ask for relief.",
      "Relief from juggling everything.\nRelief from babysitting every lead.\nRelief from being the person who remembers everything.",
      "And when the structure becomes visible, the overwhelm finally makes sense.\nThe cracks weren't random.\nThey were predictable."
    ],
    actionSteps: [
      "List every repeated task you touch more than twice a day. This becomes your \"automation priority list.\"",
      "Track response times for one week. Identify where prospects are waiting the longest.",
      "Record one real customer journey. Watch where messages, tasks, and decisions get lost.",
      "Pick ONE friction point and fix it first. Small wins sustain momentum; big overhauls kill it."
    ]
  },
  {
    slug: "the-hidden-drag-inside-daily-decisions",
    title: "The Hidden Drag Inside Daily Decisions",
    subtitle: "Why the owner always feels busy but never fully caught up.",
    category: "Management",
    date: "2025-01-11",
    content: [
      "The owner wasn't drowning.\nNot exactly.\nBut every day felt heavy — like carrying the business on their back.",
      "Not because the work was impossible.\nBut because every single decision passed through them:",
      "\"Should we qualify this lead?\"\n\"Can you call this customer back?\"\n\"Did we ever send that quote?\"\n\"What's the status of that job?\"",
      "Dozens of tiny, harmless questions.\nUntil the questions multiplied.\nAnd suddenly the owner isn't running a business —\nthey're running everyone's brain.",
      "The drag is invisible until you name it:",
      "Decision Bottleneck.",
      "The owner becomes the system.\nThe calendar becomes the memory.\nThe inbox becomes the workflow.",
      "And they wonder why they feel exhausted.",
      "AI becomes powerful only when the decisions themselves are clear:\nwhat to ask, what to route, what qualifies, what disqualifies, what moves forward.",
      "Not automating everything —\njust removing the decisions that never needed a human in the first place."
    ],
    actionSteps: [
      "Write down the top 5 questions your team asks you every week. These are your first automation or SOP candidates.",
      "Define \"if X, then Y\" rules for each one. Turn the decisions into simple sequences.",
      "Move ONE decision out of your inbox and into a system. Let the business rely on the process — not your memory.",
      "Recheck in 7 days. If it saved 30+ minutes, automate the next one."
    ]
  },
  {
    slug: "when-follow-up-becomes-a-full-time-job",
    title: "When Follow-Up Becomes a Full-Time Job",
    subtitle: "The emotional cost nobody admits out loud.",
    category: "Leads",
    date: "2025-01-08",
    content: [
      "Nobody likes admitting they're behind on follow-up.\nIt sounds irresponsible.\nUnprofessional.\nLike they don't care about the business.",
      "But the real problem isn't laziness.\nIt's capacity.",
      "Some days the phone won't stop ringing.\nOther days they're buried on job sites.\nAnd by the time they sit down at night, the messages blur together:",
      "\"Who did I promise I'd call back?\"\n\"Did I send that update?\"\n\"Who's waiting on a quote?\"",
      "The owner doesn't see the missed revenue —\nthey feel the guilt.",
      "They know those leads are slipping.\nThey know the conversations went cold.\nThey know the business loses money every time a follow-up gets delayed.",
      "AI doesn't replace the relationship.\nIt simply covers the gaps —\nthe hours the owner can't be everywhere.",
      "Not to \"sound robotic.\"\nBut to make the business feel consistent.",
      "Every lead gets acknowledged.\nEvery message gets answered.\nEvery opportunity moves forward — whether the owner is available or not."
    ],
    actionSteps: [
      "Track the number of follow-ups you send manually for 7 days. The real number will shock you.",
      "List your top 3 message types (quote, reschedule, check-in). These become templates.",
      "Create ONE automated follow-up fallback for after-hours. A simple, human-sounding message.",
      "Measure response lift for 14 days. Even a 20% improvement is a major operational win."
    ]
  }
];

const categoryColors: Record<string, string> = {
  "Operations": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Leads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
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

function getExcerpt(content: string[]): string {
  const firstBlock = content[0] || "";
  const lines = firstBlock.split('\n').slice(0, 2);
  return lines.join(' ');
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
                  
                  <h2 className="text-xl font-display font-medium text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-primary/70 mb-3 italic">
                    {post.subtitle}
                  </p>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {getExcerpt(post.content)}
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
