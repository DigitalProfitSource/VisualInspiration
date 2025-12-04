import { motion } from "framer-motion";
import { ArrowRight, Check, Activity, Layers, Zap, Brain, ShieldCheck, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import heroBg from "@assets/generated_images/subtle_abstract_dark_technical_flow_background.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-lg tracking-tighter">SimpleSequence</div>
          <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
            <a href="#method" className="hover:text-white transition-colors">Method</a>
            <a href="#offers" className="hover:text-white transition-colors">Offers</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
          <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5 hover:text-white text-xs font-medium">
            Client Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational AI Advisor™
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]">
              Adopting AI requires <br/>
              <span className="text-muted-foreground">operational precision.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              We help service businesses eliminate friction, map the sequences that matter, and implement the foundations required for consistency and speed.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 text-base">
                Get Your AI Clarity Session
              </Button>
              <p className="text-sm text-zinc-500 mt-2 sm:mt-0 sm:ml-4">
                Fix lead flow, follow-up, and operational drag.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Solve */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">The invisible drag on your growth.</h2>
            <p className="text-muted-foreground text-lg">The universal friction patterns holding service businesses back.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Slow Lead Response", desc: "Leads go cold while manual intake processes create bottlenecks." },
              { title: "Manual Follow-up Collapse", desc: "Personalized follow-up is impossible to sustain at scale without systems." },
              { title: "Disconnected Systems", desc: "Data lives in silos, forcing your team to be the manual bridge between tools." },
              { title: "People-Dependent Workflows", desc: "Processes break when key people are out or overwhelmed." },
              { title: "Misplaced AI Efforts", desc: "Using tools without clarity on where they actually create leverage." },
              { title: "Invisible Operational Drag", desc: "Inefficiencies that compound daily, eating into margins and morale." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-8 h-1 mb-4 bg-zinc-700 rounded-full" />
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The SimpleSequence Method */}
      <section id="method" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Methodology</span>
            <h2 className="text-3xl md:text-4xl font-medium mt-4 mb-6">The SimpleSequence Method</h2>
            <p className="text-muted-foreground">
              A clear, mature methodology to remove chaos and build the operational foundation your business needs.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

            <div className="space-y-24 relative z-10">
              {[
                { step: "01", title: "Diagnose Friction", desc: "Identify exactly where operations break down and value leaks out.", icon: Activity },
                { step: "02", title: "Map Sequences", desc: "Document the critical paths that deliver results, removing ambiguity.", icon: Layers },
                { step: "03", title: "Locate Leverage", desc: "Pinpoint where AI provides the highest impact, not just novelty.", icon: Brain },
                { step: "04", title: "Build Foundation", desc: "Construct the intelligent systems that ensure consistency and speed.", icon: LayoutTemplate }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 === 0 && (
                      <div className="md:text-right">
                        <span className="text-6xl font-mono font-bold text-white/5">{item.step}</span>
                        <h3 className="text-2xl font-medium mt-2 mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center relative z-10 shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    {i % 2 === 1 && (
                      <div className="md:text-left">
                        <span className="text-6xl font-mono font-bold text-white/5">{item.step}</span>
                        <h3 className="text-2xl font-medium mt-2 mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
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
      <section className="py-24 bg-zinc-50 border-y border-zinc-200 text-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-xs font-bold mb-6">
                START HERE
              </div>
              <h2 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight">The AI Clarity Assessment™</h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                A quick assessment that reveals where lead flow breaks, where follow-up slows down, and where operations rely too heavily on manual effort. Delivered with an Executive AI Analysis. No fluff, no hype—genuine insight.
              </p>
              <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-lg">
                Take the Free Assessment
              </Button>
            </div>
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
              <div className="space-y-4">
                <div className="h-2 bg-zinc-100 rounded w-3/4" />
                <div className="h-2 bg-zinc-100 rounded w-full" />
                <div className="h-2 bg-zinc-100 rounded w-5/6" />
                <Separator className="my-6" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100" />
                  <div>
                    <div className="h-2 bg-zinc-100 rounded w-24 mb-2" />
                    <div className="h-2 bg-zinc-100 rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offer Stack */}
      <section id="offers" className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Offer 1 */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
              <div className="h-12 mb-6">
                <span className="text-sm font-mono text-muted-foreground">01 / DIAGNOSTIC</span>
              </div>
              <h3 className="text-2xl font-medium mb-4">AI Clarity Session</h3>
              <p className="text-muted-foreground mb-8 h-20">
                A short diagnostic conversation to surface the biggest friction points and identify where AI will create the fastest operational win.
              </p>
              <div className="text-3xl font-medium mb-8">Free</div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                Book Session
              </Button>
            </div>

            {/* Offer 2 */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.05] relative">
              <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                RECOMMENDED
              </div>
              <div className="h-12 mb-6">
                <span className="text-sm font-mono text-white">02 / BLUEPRINT</span>
              </div>
              <h3 className="text-2xl font-medium mb-4">Operational Diagnostic + Blueprint</h3>
              <p className="text-muted-foreground mb-8 h-20">
                A deep operational assessment + sequence-by-sequence AI opportunity map. Analysis, clarity, and direction—no implementation.
              </p>
              <div className="text-3xl font-medium mb-8">$997</div>
              <Button className="w-full bg-white text-black hover:bg-zinc-200">
                Get the Blueprint
              </Button>
            </div>

            {/* Offer 3 */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
              <div className="h-12 mb-6">
                <span className="text-sm font-mono text-muted-foreground">03 / IMPLEMENTATION</span>
              </div>
              <h3 className="text-2xl font-medium mb-4">Operational Tune-Up</h3>
              <p className="text-muted-foreground mb-8 h-20">
                The implementation of the Blueprint: clean operational foundation, optimized lead flow, and consistent follow-up sequences.
              </p>
              <div className="text-3xl font-medium mb-8">$3,500</div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                Apply for Tune-Up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why SimpleSequence */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-medium mb-8">Why SimpleSequence?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide clear thinking and deep pattern recognition for service businesses. 
            We understand the friction that comes with growth. 
            SimpleSequence brings AI clarity without the hype, delivering operational insights rooted in real-world behavior—the antidote to tool-chasing and agency noise.
          </p>
        </div>
      </section>

      {/* About The Advisor */}
      <section id="about" className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-32 h-32 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden border-2 border-white/10">
               {/* Placeholder for avatar */}
               <div className="w-full h-full bg-zinc-700 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-2">The Operational AI Advisor™</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With a background in operations, performance, and AI adoption, our founder understands the friction patterns that plague service industries. 
                Calm, analytical, and systems-driven, he helps businesses adopt AI with precision, not chaos.
              </p>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <ShieldCheck className="w-4 h-4" /> Verified Expert
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-medium mb-8">Start with clarity.</h2>
          <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-10 h-14 text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Get your AI Clarity Session
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-sm text-zinc-600 text-center">
        <div className="container mx-auto px-6">
          <p>&copy; 2025 SimpleSequence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
