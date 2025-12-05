import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { Footer } from "@/components/footer";
import { useState } from "react";

const fadeInUpViewport = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7 }
};

export default function Offers() {
  const [entryCardsHovered, setEntryCardsHovered] = useState(false);

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
            <a href="/offers" className="text-sm text-white">Offers</a>
          </nav>
          <ContactFormDialog
            source="offers-header"
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
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm font-mono text-primary mb-6 block">SERVICES & PRICING</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight">
              Choose Your <span className="text-primary">Path Forward</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              From strategic clarity to full operational transformation — select the level that matches where you are today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Clarity Assessment */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              initial={fadeInUpViewport.initial}
              whileInView={fadeInUpViewport.whileInView}
              viewport={fadeInUpViewport.viewport}
              transition={fadeInUpViewport.transition}
              className="max-w-2xl"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-wide">
                START HERE
              </div>
              <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight">The AI Clarity Assessment™</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                A quick assessment that reveals where lead flow breaks, where follow-up slows down, and where operations rely too heavily on manual effort. Delivered with an Executive AI Analysis. No fluff, no hype—genuine insight.
              </p>
              <ContactFormDialog
                source="assessment-offers"
                title="Take the Free Assessment"
                description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
                trigger={
                  <Button 
                    size="lg" 
                    data-testid="button-offers-assessment-cta"
                    className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]"
                  >
                    Take the Free Assessment
                  </Button>
                }
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md relative"
            >
               {/* Mockup Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg opacity-50" />
               <div className="relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#403e3e80]" />
                      <div className="w-3 h-3 rounded-full bg-[#7f7e7d80]" />
                      <div className="w-3 h-3 rounded-full bg-[#b9bdba80]" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500">ASSESSMENT_RESULTS.PDF</div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-2 bg-white/10 rounded w-3/4" />
                      <div className="h-2 bg-white/10 rounded w-full" />
                      <div className="h-2 bg-white/5 rounded w-5/6" />
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary">OPERATIONAL SCORE</span>
                      </div>
                      <div className="text-3xl font-mono font-bold text-white">72<span className="text-zinc-600">/100</span></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                        <div className="space-y-1.5">
                          <div className="h-2 bg-white/10 rounded w-24" />
                          <div className="h-2 bg-white/5 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Offer Stack */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-primary mb-4 block">SELECT YOUR PACKAGE</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">Find Your Fit</h2>
          </motion.div>

          {/* Tier 1 & 2: Entry Level Row with Dual-Hover Animation */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="grid md:grid-cols-2 gap-6 mb-6"
            onMouseEnter={() => setEntryCardsHovered(true)}
            onMouseLeave={() => setEntryCardsHovered(false)}
          >
            {/* 01 - Blueprint $997 */}
            <div 
              className={`group p-8 rounded-2xl border bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ${
                entryCardsHovered ? 'border-primary/30' : 'border-white/10 hover:border-primary/30'
              }`}
              data-testid="card-offers-blueprint"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary">01</span>
                <span className="text-3xl font-display font-bold text-white">$997</span>
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-3 text-white">
                Operational Diagnostic + AI-Clarity Blueprint™
              </h3>
              
              <p className="text-primary text-sm font-medium mb-4">
                If you want answers before you spend real money.
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm italic">
                This is for businesses that say: "I know something isn't working… I just don't know what."
              </p>

              {/* Expandable Content */}
              <AnimatePresence>
                {entryCardsHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6">
                      <h4 className="text-xs font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A clear picture of where you're losing revenue</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A breakdown of what's slowing you down</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A map of where automation actually helps</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A simple, prioritized plan telling you exactly what to fix first</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Your Operational Clarity Score (0–100)</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A no-fluff AI-readiness analysis</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                      <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
                      <p className="text-slate-300 text-sm">
                        You finally know what's broken, why it's broken, and what to do next — without buying a full system.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ContactFormDialog
                source="blueprint"
                title="Get the AI-Clarity Blueprint"
                description="Request a comprehensive operational assessment and AI opportunity map tailored to your business."
                trigger={
                  <Button 
                    data-testid="button-offers-get-blueprint"
                    className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all group-hover:border-primary/30"
                  >
                    Get the Blueprint <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Button>
                }
              />
            </div>

            {/* 02 - Tune-Up $3,500 */}
            <div 
              className={`group p-8 rounded-2xl border bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ${
                entryCardsHovered ? 'border-primary/30' : 'border-white/10 hover:border-primary/30'
              }`}
              data-testid="card-offers-tuneup"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary">02</span>
                <span className="text-3xl font-display font-bold text-white">$3,500</span>
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-3 text-white">
                Operational Tune-Up
              </h3>
              
              <p className="text-primary text-sm font-medium mb-4">
                If you want things to "just work" without rebuilding everything.
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm italic">
                This is for owners who say: "I don't need a big system. I just need things to stop falling apart."
              </p>

              {/* Expandable Content */}
              <AnimatePresence>
                {entryCardsHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6">
                      <h4 className="text-xs font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A cleaned-up CRM that actually makes sense</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A website that captures leads instead of losing them</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Follow-up that doesn't forget or stall</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A helpful AI chat assistant for basic questions</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Better routing so the right leads reach the right person</li>
                        <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Reduced manual work for your team</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                      <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
                      <p className="text-slate-300 text-sm">
                        Your business stops leaking. Your team stops guessing. Leads stop slipping.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ContactFormDialog
                source="tune-up"
                title="Apply for Operational Tune-Up"
                description="Tell us about your business and we'll help implement your operational foundation."
                trigger={
                  <Button 
                    data-testid="button-offers-apply-tuneup"
                    className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all group-hover:border-primary/30"
                  >
                    Apply for Tune-Up <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Button>
                }
              />
            </div>
          </motion.div>

          {/* Tier 3: Growth Architecture - Featured */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={{ once: true }}
            transition={fadeInUpViewport.transition}
            className="mb-6"
          >
            <div className="p-10 rounded-2xl border border-primary/30 bg-gradient-to-b from-zinc-800/80 to-zinc-950 relative shadow-2xl overflow-hidden">
              <BorderBeam size={400} duration={12} delay={0} colorFrom="var(--color-primary)" colorTo="transparent" />
              
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider">
                MOST POPULAR
              </div>
              
              <div className="grid lg:grid-cols-2 gap-10 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono text-primary">03</span>
                    <span className="text-3xl font-display font-bold text-white">$7,500</span>
                  </div>
                  <h3 className="text-3xl font-display font-semibold mb-3 text-white">The Growth Architecture</h3>
                  <p className="text-primary text-lg mb-4 font-medium">If you want more leads, more sales, and less staff pressure.</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Built for businesses ready to grow without hiring more people.
                  </p>
                  <ContactFormDialog
                    source="growth-architecture"
                    title="Build Your Growth Architecture"
                    description="Ready to automate your acquisition and conversion systems? Tell us about your business."
                    trigger={
                      <Button 
                        data-testid="button-offers-growth-architecture"
                        className="bg-primary text-primary-foreground hover:bg-cyan-300 h-14 px-8 rounded-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] text-base"
                      >
                        Build My Architecture <span className="ml-2">→</span>
                      </Button>
                    }
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-mono text-primary mb-4">WHAT YOU REALLY GET</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> An AI assistant that pre-qualifies leads automatically</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Two high-performance funnels</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Automated review + reputation system</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Follow-up sequences that reactivate dead leads</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> A nurture engine that keeps prospects warm</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Testing + optimization to increase conversions</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Two diagnostic review cycles</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <h4 className="text-xs font-mono text-primary mb-2">OUTCOME</h4>
                    <p className="text-slate-300 text-sm">Your business becomes a lead machine that responds faster, converts more, and runs itself ~80% of the time.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier 4: Operating System */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={{ once: true }}
            transition={fadeInUpViewport.transition}
            className="mb-6"
          >
            <div className="p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-transparent relative overflow-hidden hover:border-primary/20 transition-all">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono text-primary/70">04</span>
                    <span className="text-3xl font-display font-bold text-white">$12,500</span>
                  </div>
                  <h3 className="text-3xl font-display font-semibold mb-3 text-white">AI-Powered Business Operating System</h3>
                  <p className="text-primary/80 text-lg mb-4 font-medium">If you want a system that runs the business with you, not a collection of tools.</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Built for businesses that want enterprise-level capability with a small-team budget.
                  </p>
                  <ContactFormDialog
                    source="operating-system"
                    title="Deploy Your Operating System"
                    description="Ready for a complete AI-assisted operational engine? Tell us about your business goals."
                    trigger={
                      <Button 
                        data-testid="button-offers-operating-system"
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-14 px-8 rounded-lg font-medium text-base transition-all"
                      >
                        Deploy My Operating System <span className="ml-2 opacity-50 group-hover:opacity-100">→</span>
                      </Button>
                    }
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-mono text-primary/70 mb-4">WHAT YOU REALLY GET</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Voice-based AI that answers calls + follows up</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Automated outbound recovery calls</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Smart routing that sends the right leads to the right person</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Executive KPI dashboard</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Staff SOPs + training docs</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Cross-channel attribution</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Three review cycles</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Everything in Growth Architecture included</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-mono text-slate-500 mb-2">OUTCOME</h4>
                    <p className="text-slate-400 text-sm">Your business operates like a scaled organization, even with a small team.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ongoing Optimization Partner */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={{ once: true }}
            transition={fadeInUpViewport.transition}
          >
            <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-transparent relative group hover:border-primary/20 transition-all">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-slate-500">ONGOING SUPPORT</span>
                </div>
                <h3 className="text-2xl font-display font-medium mb-2 text-white">Ongoing Optimization Partner</h3>
                <p className="text-primary text-sm mb-6 font-medium">Keep improving. Protect your investment.</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For businesses that want their system to evolve and strengthen over time.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-mono text-primary/70 mb-4">WHAT YOU GET</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Monthly performance checkups</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Workflow refinements</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Messaging + conversion improvements</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> New automation testing</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Priority consulting</li>
                      <li className="flex items-start gap-3"><Check className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" /> Unlimited iteration support</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-mono text-slate-500 mb-3">PRICING TRANSPARENCY</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      Ongoing optimization typically ranges between <span className="text-white font-medium">$300–$900/mo</span>, depending on the size and complexity of your system.
                    </p>
                    <p className="text-slate-500 text-sm">
                      Most clients budget around 8–12% of their original build for continuous performance improvements and AI refinement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-36 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium mb-10">
              Not Sure Where to <span className="text-primary">Start</span>?
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
              Take the free AI Clarity Assessment and we'll help you identify the right path forward.
            </p>
            <ContactFormDialog
              source="offers-bottom-cta"
              title="Take the Free Assessment"
              description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]"
                  data-testid="button-offers-bottom-cta"
                >
                  Take the Free Assessment
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
