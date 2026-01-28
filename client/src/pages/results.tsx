import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight, CheckCircle, ChevronDown, ChevronUp, ExternalLink, Wrench, Clock, Code, RefreshCw, Send } from "lucide-react";
import { AssessmentResult, GapScore } from "@/lib/scoring";
import { GlassCard, GlassButton } from "@/components/ui/glass-ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

function GapCard({ 
  title, 
  gap, 
  description
}: { 
  title: string; 
  gap: GapScore; 
  description: string;
}) {
  const [showCalculation, setShowCalculation] = useState(false);

  return (
    <GlassCard className="p-6 border-cyan-500/20 bg-cyan-950/10 relative overflow-hidden">
      <div className="mb-4">
        <h3 className="text-xl font-heading font-semibold text-white">{title}</h3>
      </div>
      
      <p className="text-sm text-slate-400 mb-6">{description}</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs text-cyan-400 uppercase tracking-wider mb-2">What We Found</p>
          <ul className="space-y-1">
            {gap.findings.map((finding, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-slate-500">-</span>
                {finding}
              </li>
            ))}
          </ul>
        </div>
        
        {gap.causes.length > 0 && (
          <div>
            <p className="text-xs text-cyan-400 uppercase tracking-wider mb-2">What's Causing This</p>
            <ul className="space-y-1">
              {gap.causes.map((cause, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-slate-500">-</span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
        <div>
          <p className="text-xs text-slate-500 uppercase">Estimated Monthly Impact</p>
          <p className="text-2xl font-mono font-bold text-cyan-400">~${gap.estimate.toLocaleString()}</p>
        </div>
        
        <button 
          onClick={() => setShowCalculation(!showCalculation)}
          className="text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
        >
          {showCalculation ? 'Hide' : 'Show'} calculation
          {showCalculation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      
      {showCalculation && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-slate-700/30"
        >
          <p className="text-xs text-slate-500 mb-2">{gap.calculationDetails.description}</p>
          <p className="text-xs font-mono text-slate-400 bg-slate-900/50 p-2 rounded">{gap.calculationDetails.formula}</p>
        </motion.div>
      )}
    </GlassCard>
  );
}

function TierCard({
  tier,
  price,
  setupFee,
  description,
  features,
  isRecommended,
  ctaText,
  badge,
  reason
}: {
  tier: string;
  price: string;
  setupFee: string;
  description: string;
  features: string[];
  isRecommended: boolean;
  ctaText: string;
  badge?: string;
  reason?: string;
}) {
  return (
    <div className={`relative rounded-2xl p-6 transition-all ${
      isRecommended 
        ? 'bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,217,255,0.15)]' 
        : 'bg-slate-900/40 border border-slate-700/50'
    }`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          RECOMMENDED
        </div>
      )}
      {badge && (
        <div className="absolute -top-3 right-4 bg-slate-700 text-white text-xs px-2 py-1 rounded">
          {badge}
        </div>
      )}
      
      <h3 className="text-xl font-heading font-bold text-white mb-1">{tier}</h3>
      <p className="text-2xl font-mono font-bold text-cyan-400 mb-1">{price}</p>
      <p className="text-xs text-slate-500 mb-4">Setup: {setupFee}</p>
      
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      
      {reason && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-cyan-300">{reason}</p>
        </div>
      )}
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${isRecommended ? 'bg-cyan-500 hover:bg-cyan-400 text-black' : 'bg-slate-700 hover:bg-slate-600'}`}
        data-testid={`button-tier-${tier.toLowerCase()}`}
      >
        {ctaText}
      </Button>
    </div>
  );
}

export default function Results() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [leadId, setLeadId] = useState<string>('');

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    const storedLeadId = sessionStorage.getItem('leadId');
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedLeadId) {
      setLeadId(storedLeadId);
    }
  }, []);

  useEffect(() => {
    if (!result) {
      const timer = setTimeout(() => {
        if (!result) {
          setLocation("/assessment");
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, setLocation]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your results...</p>
        </div>
      </div>
    );
  }

  const frontlineFeatures = [
    "AI Voice backup when team is busy/after-hours",
    "24/7 website chatbot",
    "Instant SMS text-back",
    "Speed-to-lead engine (<60 seconds)",
    "250 AI Voice Minutes/mo"
  ];

  const specialistFeatures = [
    "Everything in Frontline, plus:",
    "Automated no-show recovery",
    "Quote follow-up sequences",
    "Database reactivation campaigns",
    "Review request automation",
    "500 AI Voice Minutes/mo"
  ];

  const commandFeatures = [
    "Everything in Specialist, plus:",
    "Internal AI Knowledge Base",
    "Custom system integrations",
    "Service delivery automation",
    "Priority decision logic",
    "1,000 AI Voice Minutes/mo"
  ];

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 relative overflow-hidden bg-background">
      <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <header className="fixed top-0 left-0 right-0 z-50 h-20 glass-panel flex items-center px-6 md:px-12 justify-between">
        <Link href="/">
          <div className="text-xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-3 cursor-pointer">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <span className="text-white text-lg tracking-wide">SimpleSequence</span>
          </div>
        </Link>
        
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00D9FF] transition-colors" 
          data-testid="link-back-to-main-site"
        >
          <span className="hidden md:inline">Back to Main Site</span>
          <ExternalLink size={16} />
        </Link>
      </header>

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            Your Revenue Gap Report: {result.businessName}
          </h1>
          <p className="text-slate-300 text-lg">
            Here's what's really happening in your business - and exactly how much it's costing you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <GlassCard className="p-6 border-slate-700/50 bg-slate-900/40">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Your Business at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Industry</p>
                <p className="text-white font-medium">{result.industry}</p>
              </div>
              <div>
                <p className="text-slate-500">Specialization</p>
                <p className="text-white font-medium">{result.niche}</p>
              </div>
              <div>
                <p className="text-slate-500">Monthly Leads</p>
                <p className="text-white font-medium">{result.monthlyLeads}</p>
              </div>
              <div>
                <p className="text-slate-500">Team Size</p>
                <p className="text-white font-medium">{result.teamSize}</p>
              </div>
              <div>
                <p className="text-slate-500">Avg Job Value</p>
                <p className="text-white font-medium">${result.avgJobValue.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-white">Gap Analysis</h2>
          
          <GapCard 
            title="Speed Gap" 
            gap={result.speedGap}
            description="Speed-to-lead is the #1 predictor of conversion. Research shows 78% of customers go with whoever responds first."
          />
          
          <GapCard 
            title="Silence Gap" 
            gap={result.silenceGap}
            description="Most revenue isn't lost at first contact - it's lost in the days and weeks after when no one follows up."
          />
          
          <GapCard 
            title="Chaos Gap" 
            gap={result.chaosGap}
            description="Time spent on manual coordination and busywork is time not spent serving customers or closing deals."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <GlassCard className="p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900/50">
            <h3 className="text-xl font-heading font-semibold text-cyan-400 flex items-center gap-2 mb-4">
              <BarChart3 size={24} /> Total Impact Summary
            </h3>
            
            <div className="text-center py-6">
              <p className="text-sm text-slate-400 uppercase tracking-wider mb-3">Total Monthly Revenue Gap</p>
              <p className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-2">
                ${result.totalMonthlyGap.toLocaleString()}
              </p>
              <p className="text-lg text-slate-300 font-medium">
                Annualized: ${result.annualizedGap.toLocaleString()}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-cyan-400 font-semibold">Speed Gap</p>
                  <p className="text-white font-mono">${result.speedGap.estimate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold">Silence Gap</p>
                  <p className="text-white font-mono">${result.silenceGap.estimate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold">Chaos Gap</p>
                  <p className="text-white font-mono">${result.chaosGap.estimate.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">Your Prioritized Opportunities</h2>
              <p className="text-slate-400">{result.tierReason}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TierCard
              tier="Frontline"
              price="$297/mo"
              setupFee="$500"
              description="The Human-First Safety Net - Fix the Speed Gap first."
              features={frontlineFeatures}
              isRecommended={result.recommendedTier === 'Frontline'}
              ctaText="Get Started"
              reason={result.recommendedTier === 'Frontline' ? result.tierReason : undefined}
            />
            
            <TierCard
              tier="Specialist"
              price="$497/mo"
              setupFee="$1,000"
              description="The Revenue & Reputation Accelerator - Address Speed + Silence Gaps."
              features={specialistFeatures}
              isRecommended={result.recommendedTier === 'Specialist'}
              ctaText="Get Started"
              reason={result.recommendedTier === 'Specialist' ? result.tierReason : undefined}
            />
            
            <TierCard
              tier="Command"
              price="Starting at $997/mo"
              setupFee="$2,500+"
              description="The Autonomous Operations Engine - Full operational transformation."
              features={commandFeatures}
              isRecommended={result.recommendedTier === 'Command'}
              ctaText="Apply Now"
              badge="By Application"
              reason={result.recommendedTier === 'Command' ? result.tierReason : undefined}
            />
          </div>
        </motion.div>

        <DIYSection />

        <FeedbackSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3038] bg-[#12161a] text-[#c0c8d0] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,217,255,0.1)]" 
            data-testid="link-return-to-main-site"
          >
            <ArrowRight size={16} className="rotate-180" />
            Return to simplesequence.ai
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

function DIYSection() {
  const speedGapFixes = [
    {
      title: "Set up auto-responders",
      description: "Use Google Voice or your CRM's basic auto-reply for after-hours leads."
    },
    {
      title: "Instant SMS Text-Back",
      description: "Connect Zapier to Twilio to send an \"I'll call you right back\" text on every missed call (~$30/mo)."
    },
    {
      title: "Response Protocol",
      description: "Train your team on a strict sub-5-minute response protocol for all new inquiries."
    }
  ];

  const silenceGapFixes = [
    {
      title: "No-Show Recovery",
      description: "Create a script: \"Hi [Name], we missed you! Would you like to reschedule for tomorrow?\""
    },
    {
      title: "Quote Follow-up",
      description: "Set manual calendar reminders for Day 3, 7, and 14 after sending any quote."
    },
    {
      title: "Database Reactivation",
      description: "Export your old leads and send a \"Checking in\" email with a special seasonal offer."
    }
  ];

  const chaosGapFixes = [
    {
      title: "Task Documentation",
      description: "Document your top 10 most repetitive administrative tasks step-by-step."
    },
    {
      title: "Free Automation",
      description: "Use the free tiers of Zapier or Make.com to sync data between your tools automatically."
    },
    {
      title: "Google Docs Wiki",
      description: "Create a central \"Wiki\" in Google Docs for FAQs, pricing, and common scenarios."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-heading font-bold text-cyan-400 mb-2">Your DIY Action Plan</h2>
      <p className="text-slate-400 mb-6">You can implement these fixes with or without SimpleSequence. Here is how to do it yourself:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400">1.</span> Speed Gap Fixes
          </h3>
          <div className="space-y-4">
            {speedGapFixes.map((fix, i) => (
              <div key={i}>
                <p className="font-semibold text-white text-sm mb-1">{fix.title}</p>
                <p className="text-xs text-slate-400">{fix.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400">2.</span> Silence Gap Fixes
          </h3>
          <div className="space-y-4">
            {silenceGapFixes.map((fix, i) => (
              <div key={i}>
                <p className="font-semibold text-white text-sm mb-1">{fix.title}</p>
                <p className="text-xs text-slate-400">{fix.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400">3.</span> Chaos Gap Fixes
          </h3>
          <div className="space-y-4">
            {chaosGapFixes.map((fix, i) => (
              <div key={i}>
                <p className="font-semibold text-white text-sm mb-1">{fix.title}</p>
                <p className="text-xs text-slate-400">{fix.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6 border-amber-500/20 bg-amber-950/10">
        <h3 className="text-lg font-heading font-semibold text-white mb-3">The Reality of DIY Implementation</h3>
        <p className="text-slate-400 text-sm mb-4">
          Most businesses intend to implement these fixes but never do. Success requires specialized systems that run without your constant attention. Manual implementation typically requires:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Clock size={12} /> Time Investment
            </p>
            <p className="text-sm text-slate-300">15-30 hours of technical setup and troubleshooting</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Code size={12} /> Technical Debt
            </p>
            <p className="text-sm text-slate-300">Advanced API & integration knowledge to prevent failures</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <RefreshCw size={12} /> Ongoing Overhead
            </p>
            <p className="text-sm text-slate-300">Constant maintenance, API updates, and security monitoring</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function FeedbackSection() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    try {
      const leadId = sessionStorage.getItem('leadId');
      
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          leadId: leadId || undefined,
          feedback: feedback.trim() 
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }
      
      setSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve the assessment.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-12"
      >
        <GlassCard className="p-6 border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyan-400" size={24} />
            <div>
              <h3 className="text-lg font-heading font-semibold text-white">Thank you for your feedback!</h3>
              <p className="text-slate-400 text-sm">We appreciate you taking the time to help us improve.</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mb-12"
    >
      <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
        <h3 className="text-xl font-heading font-semibold text-white mb-2">How did we do?</h3>
        <p className="text-slate-400 text-sm mb-4">Was this assessment helpful? Any suggestions for making it better?</p>
        
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts..."
          className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 mb-4 min-h-[100px]"
          data-testid="textarea-feedback"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !feedback.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 text-white"
          data-testid="button-submit-feedback"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </GlassCard>
    </motion.div>
  );
}
