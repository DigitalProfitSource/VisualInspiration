import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Tag, Lightbulb } from "lucide-react";
import { Footer } from "@/components/footer";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "wouter";
import { blogPosts, BlogPost } from "./blog";

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
          <ContactFormDialog
            source="blog-post-header"
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
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-8 leading-[1.1]">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed">
              {post.excerpt}
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
            {/* Introduction - uses excerpt as fallback if no intro */}
            <div className="mb-12 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-display font-medium text-white mb-3">Introduction</h2>
              <p className="text-slate-300 leading-relaxed">
                {post.content.intro || post.excerpt}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10">
              {post.content.sections.map((section, index) => (
                <div key={index} className="group">
                  <h2 className="text-2xl font-display font-medium text-white mb-4 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                    {section.heading}
                  </h2>
                  <div className="pl-4 space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex} 
                        className={`leading-relaxed ${
                          paragraph.startsWith('•') 
                            ? 'text-slate-300 pl-4' 
                            : 'text-slate-400'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-16 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white">Key Takeaways</h3>
                </div>
                <ul className="space-y-3">
                  {post.content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <ContactFormDialog
                source={`blog-post-${post.slug}`}
                title="Book a Diagnostic"
                description="Start with a simple, non-technical assessment and get a clear view of where AI can improve your business today."
                trigger={
                  <Button 
                    size="lg"
                    className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                    data-testid="button-blog-post-cta"
                  >
                    Book a Diagnostic
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                }
              />
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
