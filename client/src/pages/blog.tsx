import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  paragraphs: string[];
  tldr: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "when-everything-depends-on-the-owner",
    title: "When Everything Depends on the Owner",
    category: "Operations",
    date: "2025-01-14",
    paragraphs: [
      "There's a moment every owner hits where the business stops growing because they're out of bandwidth, not out of opportunity. They don't usually say it directly, but their days all sound the same. Missed calls, half-written follow-ups, notes scattered between a phone, a whiteboard, and whatever they remember at the end of the day. Nothing is \"broken,\" but nothing is moving cleanly either.",
      "It doesn't feel like a collapse. It feels like being pulled apart by a thousand tiny obligations. Every decision is stuck in their head. Every reminder depends on their memory. Every lead depends on whether they happen to catch the call. They're not running the business anymore—the business is running them.",
      "The part they rarely acknowledge is the accumulation. A delayed quote here, a lost voicemail there, a follow-up pushed to tomorrow. None of these moments feel catastrophic. But over months, these tiny delays become patterns, and those patterns become drag. Slow responses. Slow decisions. Slow everything. Not because they're lazy—because the business has no structure supporting them.",
      "The real shift begins when the owner finally sees the system underneath the chaos. Once the flow becomes visible, the pressure drops. Work stops circling. Decisions stop stacking. And they stop being the only person holding the whole thing together. AI doesn't replace them; it absorbs the predictable, repetitive decision-making that's been eating their evenings for years. What changes isn't the business. What changes is how the business runs without consuming them."
    ],
    tldr: "Most owners aren't overwhelmed because the business is too big. They're overwhelmed because the structure is too vague. When the operational flow becomes clear—and AI takes on the grunt work—the entire business becomes lighter, faster, and easier to manage."
  },
  {
    slug: "the-invisible-cost-of-slow-follow-up",
    title: "The Invisible Cost of Slow Follow-Up",
    category: "Leads",
    date: "2025-01-11",
    paragraphs: [
      "Every owner knows they should follow up faster, but everyone underestimates how much money slow responses actually cost. Not in theory—hour by hour, day by day, opportunity by opportunity. The worst part is they can feel the friction but can never quite point to where the breakdown is happening. They blame busyness, or staffing, or the phone system, or \"just a rough week.\" But the real issue is simpler: the business isn't structured to respond at the speed customers expect.",
      "People don't wait anymore. They move on fast. They're already talking to competitors before the owner even sees the notification. Not because the owner doesn't care, but because everything is manual. Every follow-up requires attention. Every call needs intention. Every quote requires energy they don't always have left.",
      "This creates a quiet erosion that almost no one sees. Leads don't say, \"You took too long.\" They just stop responding. Opportunities don't announce that they died; they just fade into the background. Owners think they need more marketing, more traffic, more leads. What they actually need is a system that moves as fast as their customers do.",
      "The clarity unlock happens when they finally see the workflow as a sequence, not a scramble. The moment they map the actual steps—capture, qualify, follow-up, decision—the holes become obvious. And once the structure is visible, AI can reinforce it. Not to sound robotic, not to replace a human voice, but to keep momentum alive when the owner is on another job, in another meeting, or finally taking a damn day off."
    ],
    tldr: "Most businesses don't have a lead problem—they have a response-time problem. Once the flow is clear and the system moves instantly, AI becomes support, not a gimmick, and the business stops bleeding opportunities."
  },
  {
    slug: "when-the-business-outgrows-the-owners-brain",
    title: "When the Business Outgrows the Owner's Brain",
    category: "Management",
    date: "2025-01-08",
    paragraphs: [
      "There comes a point where the owner knows too much, remembers too much, and carries too much. Every task, every exception, every special case lives in their head. It worked when the business was small. It even worked when the business doubled. But eventually, the decisions pile up faster than they can process them, and the whole operation slows under the weight of their memory.",
      "This is the stage where owners start saying things like, \"I'll get to it tonight,\" or \"I'll remember to send that,\" or \"I'll follow up when things calm down.\" But things never calm down. And each of those small promises becomes another point of friction. Another moment where the business leans too heavily on the only person keeping it upright.",
      "The funny thing is—they don't notice the shift happening. What used to be simple routines now feel heavier. Tasks they used to do instantly now sit for hours. They start avoiding certain parts of the business because they just don't have the mental space to deal with them. And slowly, without meaning to, the business becomes limited by the capacity of one person's mind.",
      "The breakthrough comes when the owner externalizes the system—when the invisible becomes visible. When decisions become steps, when steps become sequences, and when sequences become something AI can help reinforce. Not to replace judgment, but to protect the owner from drowning in repetitive, low-impact decisions that should never have been theirs to carry alone."
    ],
    tldr: "Businesses don't stall because owners lack effort—they stall because owners exceed their cognitive bandwidth. When the structure is mapped and AI supports the repetitive load, the owner finally gets to lead instead of chase."
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

function getExcerpt(paragraphs: string[]): string {
  const firstParagraph = paragraphs[0] || "";
  const sentences = firstParagraph.split(/(?<=[.!?])\s+/).slice(0, 2);
  return sentences.join(" ");
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
                    {getExcerpt(post.paragraphs)}
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
