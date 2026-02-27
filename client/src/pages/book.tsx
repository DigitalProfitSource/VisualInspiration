import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import type { InsertLead } from "@shared/schema";

const benefits = [
  "Identify where leads are leaking from your pipeline",
  "Discover hidden revenue sitting in your existing database",
  "Get a clear, no-BS assessment of where AI fits your business",
  "No sales pitch — just diagnostic clarity in 15 minutes",
];

export default function Book() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const submitLead = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request received!",
        description: "We'll reach out within 24 hours to schedule your call.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      ...formData,
      source: "book-discovery-call",
    });
  };

  return (
    <Layout>
      <SEO
        title="Book Your Discovery Call | SimpleSequence"
        description="Schedule a free 15-minute discovery call to find out where your revenue is leaking and how AI can fix it."
      />

      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,0.04),transparent_60%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                <Calendar className="w-3.5 h-3.5" />
                Free Discovery Call
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight" data-testid="text-book-heading">
                Book Your Discovery Call
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                In 15 minutes, we'll pinpoint exactly where your revenue is leaking — and whether our system is the right fix. No pitch. No pressure. Just clarity.
              </p>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-10">
                <Clock className="w-4 h-4 text-primary/60" />
                <span>15 minutes · Free · No obligation</span>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">What you'll walk away with</p>
                {benefits.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* CALENDAR EMBED: Replace this entire div with your Calendly, GHL, or other calendar widget */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-lg opacity-40" />
                <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <h2 className="text-xl font-display font-medium text-white mb-2" data-testid="text-book-form-title">
                    Request a Call
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Fill out the form and we'll reach out within 24 hours to schedule.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="book-name" className="text-white text-sm">Name *</Label>
                      <Input
                        id="book-name"
                        data-testid="input-book-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-slate-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-email" className="text-white text-sm">Email *</Label>
                      <Input
                        id="book-email"
                        data-testid="input-book-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-slate-600"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-company" className="text-white text-sm">Company</Label>
                      <Input
                        id="book-company"
                        data-testid="input-book-company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-slate-600"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-message" className="text-white text-sm">What's your biggest operational challenge?</Label>
                      <Textarea
                        id="book-message"
                        data-testid="input-book-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-slate-600 min-h-[100px]"
                        placeholder="e.g., leads going cold, manual follow-up, no-shows..."
                      />
                    </div>
                    <Button
                      type="submit"
                      data-testid="button-book-submit"
                      disabled={submitLead.isPending}
                      className="w-full bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 font-semibold h-12 text-base rounded-lg transition-colors"
                    >
                      {submitLead.isPending ? "Submitting..." : "Request Discovery Call"}
                    </Button>
                    <p className="text-xs text-slate-600 text-center">
                      No spam. No sales pitch. We'll respond within one business day.
                    </p>
                  </form>
                </div>
              </div>
              {/* END CALENDAR EMBED PLACEHOLDER */}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
