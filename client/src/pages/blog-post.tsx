import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Lightbulb, TrendingUp, HelpCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { useParams } from "wouter";
import { blogPosts } from "./blog";

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-medium text-white mb-4">Post Not Found</h1>
          <a href="/blog" className="text-primary hover:text-cyan-300 transition-colors">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

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

      {/* Article Header */}
      <section className="pt-44 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" />
        <CircuitBeams className="opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </a>
            
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-[1.1]">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* Hook Section */}
            <div className="mb-16 space-y-6">
              {post.hook.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`text-lg leading-relaxed ${
                    paragraph.startsWith('"') 
                      ? 'text-white italic pl-4 border-l-2 border-primary/40' 
                      : 'text-slate-300'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Insight Highlight Block */}
            <div className="mb-16 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Key Insight</span>
                </div>
                <p className="text-xl md:text-2xl font-display font-medium text-white leading-relaxed">
                  {post.insight}
                </p>
              </div>
            </div>

            {/* Framework Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-display font-medium text-white mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Framework
              </h2>
              <div className="space-y-4">
                {post.framework.map((item) => (
                  <div 
                    key={item.step}
                    className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-mono font-medium text-primary">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.title}</p>
                      {item.description && (
                        <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Case Study Callout */}
            <div className="mb-16 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />
              <div className="relative z-10 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 block">Real Result</span>
                  <p className="text-slate-200 leading-relaxed">
                    {post.miniCaseStudy}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Block */}
            <div className="mb-8">
              <h2 className="text-2xl font-display font-medium text-white mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faq.map((item, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <HelpCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <h3 className="text-white font-medium">{item.question}</h3>
                    </div>
                    <p className="text-slate-400 pl-7">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
