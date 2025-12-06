import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { useParams } from "wouter";
import { blogPosts } from "./blog";

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
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-[1.1] mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-primary/80 italic">
              {post.subtitle}
            </p>
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
            {/* Main Content */}
            <div className="mb-16 space-y-6">
              {post.content.map((block, index) => {
                const lines = block.split('\n');
                
                if (lines.length === 1 && block.length < 60) {
                  return (
                    <p 
                      key={index} 
                      className="text-2xl md:text-3xl font-display font-medium text-white"
                    >
                      {block}
                    </p>
                  );
                }
                
                return (
                  <div key={index} className="space-y-1">
                    {lines.map((line, lineIndex) => (
                      <p 
                        key={lineIndex} 
                        className="text-lg text-slate-300 leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Action Steps */}
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-display font-medium text-white">Action Steps</span>
                </div>
                <ol className="space-y-4">
                  {post.actionSteps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
