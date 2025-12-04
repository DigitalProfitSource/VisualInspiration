import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate, ChevronDown, Snail, TriangleAlert, Unplug, FlagOff, CloudOff, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import heroBg from "@assets/generated_images/subtle_abstract_dark_technical_flow_background.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUpViewport = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" />
            SimpleSequence
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium text-muted-foreground">
            <a href="#method" className="hover:text-primary transition-colors duration-300">Method</a>
            <a href="#offers" className="hover:text-primary transition-colors duration-300">Offers</a>
            <a href="#about" className="hover:text-primary transition-colors duration-300">About</a>
          </div>
          <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5 hover:text-white text-xs font-medium rounded-full px-6 transition-all duration-300 hover:border-primary/50">
            Client Login
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40" />
          <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              Operational AI Advisor™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.1]">
              Adopting AI requires <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">operational precision.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              We help service businesses eliminate friction, map the sequences that matter, and implement the foundations required for consistency and speed.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <button className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-3.5 pr-6 pb-3.5 pl-7 relative shadow-2xl backdrop-blur-xl w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-left">
                      <p className="group-hover:text-white transition-colors duration-300 text-base font-bold text-white font-sans drop-shadow-sm">Get Your AI Clarity Session</p>
                    </div>
                    <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
                        <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <p className="text-sm text-muted-foreground/80">
                Fix lead flow, follow-up, and operational drag.
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* What We Solve - Friction Grid */}
      <section className="py-32 border-t border-white/5 bg-zinc-950/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-medium mb-6">The invisible drag on your growth.</h2>
            <p className="text-muted-foreground text-lg">The universal friction patterns holding service businesses back.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Slow Lead Response", desc: "Leads go cold while manual intake processes create bottlenecks.", icon: Snail },
              { title: "Manual Follow-up Collapse", desc: "Personalized follow-up is impossible to sustain at scale without systems.", icon: TriangleAlert },
              { title: "Disconnected Systems", desc: "Data lives in silos, forcing your team to be the manual bridge between tools.", icon: Unplug },
              { title: "People-Dependent Workflows", desc: "Processes break when key people are out or overwhelmed.", icon: FlagOff },
              { title: "Misplaced AI Efforts", desc: "Using tools without clarity on where they actually create leverage.", icon: CloudOff },
              { title: "Invisible Operational Drag", desc: "Inefficiencies that compound daily, eating into margins and morale.", icon: Frown }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.12] hover:to-white/[0.02] transition-all relative overflow-hidden shadow-lg"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-10 h-10 mb-6 bg-white/5 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/20">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium mb-3 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-zinc-300 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The SimpleSequence Method */}
      <section id="method" className="py-40 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center max-w-2xl mx-auto mb-24"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">Methodology</span>
            <h2 className="text-4xl md:text-5xl font-medium mb-6">The SimpleSequence Method</h2>
            <p className="text-muted-foreground text-lg">
              A clear, mature methodology to remove chaos and build the operational foundation your business needs.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            <div className="space-y-32 relative z-10">
              {[
                { step: "01", title: "Diagnose Friction", desc: "Identify exactly where operations break down and value leaks out.", icon: Activity },
                { step: "02", title: "Map Sequences", desc: "Document the critical paths that deliver results, removing ambiguity.", icon: Layers },
                { step: "03", title: "Locate Leverage", desc: "Pinpoint where AI provides the highest impact, not just novelty.", icon: Brain },
                { step: "04", title: "Build Foundation", desc: "Construct the intelligent systems that ensure consistency and speed.", icon: LayoutTemplate }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} relative group`}
                >
                  {/* Text Content */}
                  <div className="flex-1 pl-20 md:pl-0 md:text-right">
                    {i % 2 === 0 && (
                      <div className="md:text-right">
                        <div className="inline-flex items-center gap-2 text-primary/50 font-mono mb-2">
                           <span>STEP</span>
                           <span className="text-xl font-bold text-primary">{item.step}</span>
                        </div>
                        <h3 className="text-3xl font-medium mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-background border border-primary/30 flex items-center justify-center relative z-10 shrink-0 shadow-[0_0_30px_-10px_var(--color-primary)] group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-20" />
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Text Content (Right side for odd items) */}
                  <div className="flex-1 pl-20 md:pl-0 md:text-left">
                    {i % 2 === 1 && (
                      <div className="md:text-left">
                        <div className="inline-flex items-center gap-2 text-primary/50 font-mono mb-2">
                           <span>STEP</span>
                           <span className="text-xl font-bold text-primary">{item.step}</span>
                        </div>
                        <h3 className="text-3xl font-medium mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)]">
                Take the Free Assessment
              </Button>
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
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
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
      <section id="offers" className="py-40">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-8 items-start"
          >
            {/* Offer 1 */}
            <motion.div variants={fadeIn} className="group p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.12] hover:to-white/[0.02] transition-all relative shadow-lg">
              <div className="h-12 mb-6">
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">01 / DIAGNOSTIC</span>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-white">AI Clarity Session</h3>
              <p className="text-muted-foreground mb-8 h-20 leading-relaxed">
                A short diagnostic conversation to surface the biggest friction points and identify where AI will create the fastest operational win.
              </p>
              <div className="text-3xl font-medium mb-8 text-white">Free</div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all">
                Book Session
              </Button>
            </motion.div>

            {/* Offer 2 - Main Highlight */}
            <motion.div variants={fadeIn} className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-zinc-800 to-zinc-950 relative shadow-2xl overflow-hidden">
              <BorderBeam size={300} duration={10} delay={0} colorFrom="var(--color-primary)" colorTo="transparent" />
              
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl tracking-wider">
                RECOMMENDED
              </div>
              <div className="h-12 mb-6 relative z-10">
                <span className="text-sm font-mono text-primary">02 / BLUEPRINT</span>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-white relative z-10">Operational Diagnostic + Blueprint</h3>
              <p className="text-muted-foreground mb-8 h-20 leading-relaxed relative z-10">
                A deep operational assessment + sequence-by-sequence AI opportunity map. Analysis, clarity, and direction—no implementation.
              </p>
              <div className="text-3xl font-medium mb-8 text-white relative z-10">$997</div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-cyan-300 h-12 rounded-lg font-semibold shadow-[0_0_15px_-5px_var(--color-primary)] relative z-10">
                Get the Blueprint
              </Button>
            </motion.div>

            {/* Offer 3 */}
            <motion.div variants={fadeIn} className="group p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.12] hover:to-white/[0.02] transition-all relative shadow-lg">
              <div className="h-12 mb-6">
                <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">03 / IMPLEMENTATION</span>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-white">Operational Tune-Up</h3>
              <p className="text-muted-foreground mb-8 h-20 leading-relaxed">
                The implementation of the Blueprint: clean operational foundation, optimized lead flow, and consistent follow-up sequences.
              </p>
              <div className="text-3xl font-medium mb-8 text-white">$3,500</div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all">
                Apply for Tune-Up
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why SimpleSequence */}
      <section className="py-32 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.h2 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-3xl md:text-4xl font-medium mb-10"
          >
            Why SimpleSequence?
          </motion.h2>
          <motion.p 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={{ ...fadeInUpViewport.transition, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light"
          >
            We provide <span className="text-white font-normal">clear thinking</span> and deep pattern recognition for service businesses. 
            We understand the friction that comes with growth. 
            SimpleSequence brings <span className="text-primary">AI clarity without the hype</span>, delivering operational insights rooted in real-world behavior—the antidote to tool-chasing and agency noise.
          </motion.p>
        </div>
      </section>

      {/* About The Advisor */}
      <section id="about" className="py-32 bg-zinc-950/50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 bg-white/[0.02] border border-white/5 p-12 rounded-3xl"
          >
            <div className="w-40 h-40 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden border-2 border-white/10 shadow-xl relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               {/* Placeholder for avatar */}
               <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <Brain className="w-12 h-12 opacity-20" />
               </div>
            </div>
            <div>
              <h3 className="text-3xl font-medium mb-4 text-white">The Operational AI Advisor™</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                With a background in operations, performance, and AI adoption, our founder understands the friction patterns that plague service industries. 
                Calm, analytical, and systems-driven, he helps businesses adopt AI with precision, not chaos.
              </p>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-sm text-primary/80 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <ShieldCheck className="w-4 h-4" /> Verified Expert
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-5xl md:text-7xl font-medium mb-12 tracking-tight"
          >
            Start with <span className="text-primary">clarity.</span>
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-4 pr-8 pb-4 pl-9 relative shadow-2xl backdrop-blur-xl inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <div className="text-left">
                  <p className="group-hover:text-white transition-colors duration-300 text-xl font-bold text-white font-sans drop-shadow-sm">Get your AI Clarity Session</p>
                </div>
                <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
            </button>
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
