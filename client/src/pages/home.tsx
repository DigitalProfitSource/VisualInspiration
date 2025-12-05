import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate, ChevronDown, Snail, TriangleAlert, Unplug, FlagOff, CloudOff, Frown, Stethoscope, Map, Target, Blocks, Quote, MessageSquareQuote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { TechTicker } from "@/components/ui/tech-ticker";
import { GridBeam } from "@/components/ui/grid-beam";
import { CircuitBeams } from "@/components/ui/circuit-beams";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import { AnimatedMetric } from "@/components/ui/slot-counter";
import { IndustryCarousel } from "@/components/ui/industry-carousel";
import heroBg from "@assets/generated_images/subtle_abstract_dark_technical_flow_background.png";
import founderPhoto from "@assets/Untitled_design_1764887004065.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
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
  transition: { duration: 0.7 }
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
            <a href="/solutions" className="hover:text-primary transition-colors duration-300">Solutions</a>
            <a href="/industries" className="hover:text-primary transition-colors duration-300">Industries</a>
            <a href="/process" className="hover:text-primary transition-colors duration-300">Process</a>
            <a href="/offers" className="hover:text-primary transition-colors duration-300">Offers</a>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40" />
          <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
          <CircuitBeams className="opacity-60" />
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
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 leading-[1.1] text-balance max-w-5xl mx-auto">
              Stop Guessing How AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">Actually Fits Your Business</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              We give service businesses the exact sequences and clarity to turn AI into calm, predictable leverage — without chaos, new headcount, or costly mistakes.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <ContactFormDialog
                source="clarity-session"
                title="Get Your AI Clarity Session"
                description="Tell us about your business and we'll help you identify the best AI opportunities for operational efficiency."
                trigger={
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                    <button 
                      data-testid="button-hero-cta"
                      className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-3.5 pr-6 pb-3.5 pl-7 relative shadow-2xl backdrop-blur-xl w-full sm:w-auto"
                    >
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
                }
              />
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
      {/* Tech Stack Ticker */}
      <TechTicker />
      {/* What We Solve - Friction Grid */}
      <section className="py-32 border-t border-white/5 bg-zinc-950/30 relative overflow-hidden">
        <GridBeam showCenterBeam={false} gridOpacity={0.2} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-medium mb-6 text-[#f8fcfc]">The invisible drag on your growth.</h2>
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
                transition={{ delay: i * 0.1, duration: 0.5 }}
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
      {/* Customer Journey Alignment Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          {/* Main Container with all cards */}
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-10 md:p-16 relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight">
                We Align Your Entire Customer Journey Into One <span className="text-primary">Intelligent Flow.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                SimpleSequence clarifies how every touchpoint — human, system, or AI — should work together so your business runs smoother, responds faster, and scales without chaos.
              </p>
            </div>

            {/* 4 Core Blocks - Staggered Grid */}
            <div className="space-y-6 mb-12 relative z-10">
              {/* Row 1 - Staggered */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Block 1 - Lead Capture Architecture (narrower) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-5 group p-8 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/20 transition-all"
                >
                  <div className="w-10 h-10 mb-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    <LayoutTemplate className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-2 text-white group-hover:text-primary transition-colors">Lead Capture Architecture</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Patterns and intake sequences that turn anonymous traffic into structured opportunities — no website rebuilds required.
                  </p>
                </motion.div>

                {/* Block 2 - Operational Backbone Design (wider) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-7 group p-8 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/20 transition-all"
                >
                  <div className="w-10 h-10 mb-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-2 text-white group-hover:text-primary transition-colors">Operational Backbone Design</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A clear architectural map for how your systems, handoffs, communication layers, and AI opportunities can work together without adding complexity.
                  </p>
                </motion.div>
              </div>

              {/* Row 2 - Staggered (reversed) */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Block 3 - Follow-Up Clarity Engine (narrower) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-4 group p-8 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/20 transition-all"
                >
                  <div className="w-10 h-10 mb-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-2 text-white group-hover:text-primary transition-colors">Follow-Up Clarity Engine</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Streamlined engagement sequences that remove guesswork and ensure every opportunity receives timely, consistent follow-up.
                  </p>
                </motion.div>

                {/* Block 4 - AI-Ready Front Desk Layer (wider) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="md:col-span-8 group p-8 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/20 transition-all"
                >
                  <div className="w-10 h-10 mb-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-2 text-white group-hover:text-primary transition-colors">AI-Ready Front Desk Layer</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Strategic insight into where AI can support inbound calls, qualification, routing, and booking — without replacing your team or overhauling your systems.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <span className="text-xs font-mono text-primary/70 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">Strategic Clarity</span>
                    <span className="text-xs font-mono text-primary/70 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">AI Readiness</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 my-12" />

            {/* Metrics Row */}
            <div className="relative z-10">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-sm font-mono text-primary mb-10 tracking-wider"
              >
                CLARITY DELIVERED. EFFICIENCY UNLOCKED.
              </motion.h3>
              <div className="grid md:grid-cols-3 gap-8">
                <AnimatedMetric 
                  value="40-90" 
                  suffix="hrs/mo" 
                  description="Time regained once operational loops are clarified."
                />
                <AnimatedMetric 
                  value="82" 
                  suffix="%" 
                  description="Average reduction in friction across lead, follow-up, and ops sequences."
                />
                <AnimatedMetric 
                  value="3" 
                  suffix="× faster" 
                  description="Typical timeframe for clients to gain AI adoption clarity."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Industry Results Carousel */}
      <IndustryCarousel />
      {/* The SimpleSequence Method */}
      <section id="method" className="py-40 relative overflow-hidden bg-background">
        <GridBeam />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center max-w-2xl mx-auto mb-24"
          >
            <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">How We Deploy</span>
            <h2 className="text-4xl md:text-5xl font-medium mb-6">The SimpleSequence Method</h2>
            <p className="text-muted-foreground text-lg">From diagnostic audit to fully-operational system in weeks, not months.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            <div className="space-y-32 relative z-10">
              {[
                { step: "01", title: "Diagnose Friction", desc: "Identify exactly where operations break down and value leaks out.", icon: Stethoscope },
                { step: "02", title: "Map Sequences", desc: "Document the critical paths that deliver results, removing ambiguity.", icon: Map },
                { step: "03", title: "Locate Leverage", desc: "Pinpoint where AI provides the highest impact, not just novelty.", icon: Target },
                { step: "04", title: "Build Foundation", desc: "Construct the intelligent systems that ensure consistency and speed.", icon: Blocks }
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
              <ContactFormDialog
                source="assessment"
                title="Take the Free Assessment"
                description="Complete the form and we'll send you a personalized AI readiness assessment for your business."
                trigger={
                  <Button 
                    size="lg" 
                    data-testid="button-assessment-cta"
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
      {/* FAQ Section */}
      <section id="faq" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-primary mb-4 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">Common Questions</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-1">
                  What does SimpleSequence actually do?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4">SimpleSequence helps you understand exactly how your business should operate across lead flow, follow-up, internal communication, and customer workflows — and where AI can create real leverage without adding complexity.</p>
                  <p className="mb-4">You get a clear operational map, tailored to your business, showing which processes should stay human, which can be streamlined, and which are strong candidates for AI support.</p>
                  <p className="text-primary/80 font-medium">No software pitches. No implementation traps. Just clarity.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-2">
                  How is this different from hiring a web agency?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-white">Agencies build things.</span> SimpleSequence clarifies what should be built in the first place — and why.</p>
                  <p className="mb-4">A web agency will redesign your site. An automation shop will install tools. But neither will diagnose the root operational friction or the AI opportunities unique to your workflow.</p>
                  <p>I help you avoid unnecessary spending, avoid shiny-object traps, and avoid building systems that don't align with how your business truly works.</p>
                  <p className="text-primary/80 font-medium mt-4">This is strategic architecture — not execution.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-3">
                  Do I need to replace my current tools?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-primary font-medium">Usually, no.</span></p>
                  <p className="mb-4">Most businesses don't need more tools — they need a clearer understanding of how the tools they already have should work together.</p>
                  <p className="mb-2">Part of the diagnostic includes:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Identifying where your tools are creating friction</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Uncovering gaps in handoffs or follow-up</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Showing where AI could support the workflow without replacing your systems</li>
                  </ul>
                  <p>If a replacement is genuinely necessary, you'll get a clear rationale — not a sales pitch.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-4">
                  How long until I see results?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4"><span className="text-white">Most clients experience clarity within the first session.</span></p>
                  <p className="mb-2">The Operational Diagnostic typically reveals:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Where time is being lost</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Which workflows are causing drag</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Which AI opportunities will produce immediate leverage</li>
                  </ul>
                  <p className="mb-4">From there, businesses often see faster decisions, smoother coordination, and better follow-up rhythm within 30 days — even before implementing larger changes.</p>
                  <p className="text-primary/80 font-medium">Clarity is an accelerant.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors" data-testid="faq-trigger-5">
                  What's the best way to get started?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  <p className="mb-4">Start with the free <span className="text-primary font-medium">Operational Clarity Score™</span>.</p>
                  <p className="mb-2">It gives you:</p>
                  <ul className="space-y-2 mb-4 ml-4">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> A high-level look at your lead flow, follow-up, operations, and AI readiness</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Estimated time lost each month</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span> Early friction patterns</li>
                  </ul>
                  <p>If the diagnostic uncovers deeper issues, the next step is the <span className="text-white">Operational Diagnostic + AI-Clarity Blueprint</span>, which maps your architecture and identifies the highest-leverage improvements.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-32 bg-zinc-950/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05),transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial={fadeInUpViewport.initial}
            whileInView={fadeInUpViewport.whileInView}
            viewport={fadeInUpViewport.viewport}
            transition={fadeInUpViewport.transition}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-primary mb-4 block">RESULTS</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium">What Business Owners Say</h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "We stopped losing leads. The system captures every inquiry, responds instantly, and the automated follow-up means nothing falls through the cracks anymore.",
                name: "Jake Martinez",
                role: "Roofing Company Owner",
                initials: "JM"
              },
              {
                quote: "Our operations finally work together. Everything is connected — website, CRM, follow-up. We're converting more with less effort.",
                name: "Sarah Chen",
                role: "MedSpa Director",
                initials: "SC"
              },
              {
                quote: "The optimization work is ongoing and measurable. Every month we see improvements in how leads are qualified and moved through our intake process.",
                name: "David Walsh",
                role: "Managing Partner, Law Firm",
                initials: "DW"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-primary" />
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 italic relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Why SimpleSequence + Founder - Combined */}
      <section id="about" className="py-32 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Why Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-8 text-white">
                Why SimpleSequence?
              </h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  In a market flooded with tool-chasers and agency hype, we offer <span className="text-white">clear thinking</span> and <span className="text-white">deep pattern recognition</span>.
                </p>
                <p>
                  We understand service businesses from the inside out. We don't just add AI; we fix the <span className="text-primary">operational behavior</span> that makes AI effective.
                </p>
              </div>
            </div>

            {/* Right - Founder Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0 shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]">
                  <img 
                    src={founderPhoto} 
                    alt="The Founder" 
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">The Founder</h3>
                  <p className="text-sm font-mono text-primary">OPERATIONAL AI ADVISOR™</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Background in operations, performance, and AI adoption. I help businesses adopt AI with precision, not chaos.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Calm
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Analytical
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-primary">✓</span> Systems-Driven
                </div>
              </div>
            </motion.div>
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
