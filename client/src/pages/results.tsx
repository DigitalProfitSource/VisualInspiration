import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight, CheckCircle, ExternalLink, Wrench, Clock, Code, RefreshCw, Send, Eye, Zap, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { AssessmentResult, PillarScore } from "@/lib/scoring";
import { GlassCard, GlassButton } from "@/components/ui/glass-ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

function PillarCard({ 
  title, 
  pillar,
  icon,
  color,
  description
}: { 
  title: string; 
  pillar: PillarScore;
  icon: React.ReactNode;
  color: string;
  description: string;
}) {
  const scoreColor = pillar.score >= 70 ? 'text-green-400' : pillar.score >= 40 ? 'text-yellow-400' : 'text-red-400';
  const barColor = pillar.score >= 70 ? 'bg-green-400' : pillar.score >= 40 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <GlassCard className="p-6 border-cyan-500/20 bg-cyan-950/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <h3 className="text-xl font-heading font-semibold text-white">{title}</h3>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-mono font-bold ${scoreColor}`}>{pillar.score}</span>
          <span className="text-lg font-mono text-slate-500">/100</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pillar.score}%` }} />
      </div>
      
      <p className="text-sm text-slate-400 mb-5">{description}</p>
      
      {pillar.findings.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-cyan-400 uppercase tracking-wider mb-2">What We Found</p>
          <ul className="space-y-1">
            {pillar.findings.map((finding, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-slate-500">-</span>
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {pillar.blindspots.length > 0 && (
        <div>
          <p className="text-xs text-yellow-400 uppercase tracking-wider mb-2">Blindspots</p>
          <ul className="space-y-2">
            {pillar.blindspots.map((spot, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <AlertTriangle size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                {spot}
              </li>
            ))}
          </ul>
        </div>
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

  const overallColor = result.overallScore >= 70 ? 'text-green-400' : result.overallScore >= 40 ? 'text-yellow-400' : 'text-red-400';

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
            Sequential Revenue™ Friction Analysis
          </h1>
          <p className="text-slate-300 text-lg">
            {result.businessName} — here's where friction is slowing your revenue.
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
          <GlassCard className="p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900/50 mb-8">
            <h3 className="text-xl font-heading font-semibold text-cyan-400 flex items-center gap-2 mb-6">
              <BarChart3 size={24} /> Your Sequential Revenue™ Score
            </h3>
            
            <div className="text-center py-6">
              <p className="text-sm text-slate-400 uppercase tracking-wider mb-3">Overall Score</p>
              <p className={`text-5xl md:text-6xl font-mono font-bold ${overallColor} mb-2`}>
                {result.overallScore}
              </p>
              <p className="text-lg text-slate-500 font-mono">/100</p>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Eye size={14} className="text-cyan-400" />
                    <p className="text-cyan-400 font-semibold text-sm">Capture</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white">{result.captureScore.score}</p>
                  <p className="text-xs text-slate-500">/100</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Target size={14} className="text-cyan-400" />
                    <p className="text-cyan-400 font-semibold text-sm">Convert</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white">{result.convertScore.score}</p>
                  <p className="text-xs text-slate-500">/100</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TrendingUp size={14} className="text-cyan-400" />
                    <p className="text-cyan-400 font-semibold text-sm">Compound</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white">{result.compoundScore.score}</p>
                  <p className="text-xs text-slate-500">/100</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/30 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Est. Monthly Revenue Gap</p>
                  <p className="text-2xl font-mono font-bold text-cyan-400">${result.totalMonthlyGap.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Annualized</p>
                  <p className="text-2xl font-mono font-bold text-cyan-400">${result.annualizedGap.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <h2 className="text-2xl font-heading font-bold text-white">Pillar Breakdown</h2>
          
          <PillarCard 
            title="Capture" 
            pillar={result.captureScore}
            icon={<Eye size={20} className="text-cyan-400" />}
            color="bg-cyan-500/10"
            description="How effectively you attract and respond to new leads. This covers response speed, availability, AI search visibility, and lead intake."
          />
          
          <PillarCard 
            title="Convert" 
            pillar={result.convertScore}
            icon={<Target size={20} className="text-cyan-400" />}
            color="bg-cyan-500/10"
            description="How well you turn leads into paying customers. This covers follow-up persistence, no-show recovery, pipeline tracking, and close rate."
          />
          
          <PillarCard 
            title="Compound" 
            pillar={result.compoundScore}
            icon={<TrendingUp size={20} className="text-cyan-400" />}
            color="bg-cyan-500/10"
            description="How effectively past customers fuel future growth. This covers dormant lead reactivation and review generation."
          />
        </motion.div>

        {result.blindspots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Your Blindspots</h2>
            <GlassCard className="p-6 border-yellow-500/20 bg-yellow-950/5">
              <p className="text-sm text-slate-400 mb-4">These are the friction points most likely costing you revenue right now:</p>
              <ul className="space-y-3">
                {result.blindspots.map((spot, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <AlertTriangle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    {spot}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-cyan-400 mb-2">Your Next-30-Day Action Plan</h2>
          <p className="text-slate-400 mb-6">Start here — these are tailored to your weakest pillar. You can implement them with or without SimpleSequence.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GlassCard className="p-6 border-cyan-500/20 bg-cyan-950/10">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-cyan-400" />
                Quick Wins (First 7–14 Days)
              </h3>
              <div className="space-y-3">
                {result.actionPlan.quickWins.map((action, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">{action}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-slate-400" />
                Supporting Actions (Rest of 30 Days)
              </h3>
              <div className="space-y-3">
                {result.actionPlan.supportingActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-400">{action}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
            <h3 className="text-lg font-heading font-semibold text-white mb-3">The Reality of DIY Implementation</h3>
            <p className="text-slate-400 text-sm mb-4">
              Most businesses intend to implement these fixes but never do. Success requires specialized systems that run without your constant attention. Manual implementation typically requires:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs uppercase tracking-wider mb-2 flex items-center gap-1 text-slate-400">
                  <Clock size={12} /> Time Investment
                </p>
                <p className="text-sm text-slate-300">15-30 hours of technical setup and troubleshooting</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs uppercase tracking-wider mb-2 flex items-center gap-1 text-slate-400">
                  <Code size={12} /> Technical Debt
                </p>
                <p className="text-sm text-slate-300">Advanced API & integration knowledge to prevent failures</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs uppercase tracking-wider mb-2 flex items-center gap-1 text-slate-400">
                  <RefreshCw size={12} /> Ongoing Overhead
                </p>
                <p className="text-sm text-slate-300">Constant maintenance, API updates, and security monitoring</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
              description="The Human-First Safety Net — Fix the Capture pillar first."
              features={frontlineFeatures}
              isRecommended={result.recommendedTier === 'Frontline'}
              ctaText="Get Started"
              reason={result.recommendedTier === 'Frontline' ? result.tierReason : undefined}
            />
            
            <TierCard
              tier="Specialist"
              price="$497/mo"
              setupFee="$1,000"
              description="The Revenue & Reputation Accelerator — Address Capture + Convert pillars."
              features={specialistFeatures}
              isRecommended={result.recommendedTier === 'Specialist'}
              ctaText="Get Started"
              reason={result.recommendedTier === 'Specialist' ? result.tierReason : undefined}
            />
            
            <TierCard
              tier="Command"
              price="Starting at $997/mo"
              setupFee="$2,500+"
              description="The Autonomous Operations Engine — Full operational transformation across all pillars."
              features={commandFeatures}
              isRecommended={result.recommendedTier === 'Command'}
              ctaText="Apply Now"
              badge="By Application"
              reason={result.recommendedTier === 'Command' ? result.tierReason : undefined}
            />
          </div>
        </motion.div>

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
              <p className="text-white font-semibold">Thank you for your feedback!</p>
              <p className="text-sm text-slate-400">Your input helps us improve the assessment for future users.</p>
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
        <h3 className="text-lg font-heading font-semibold text-white mb-2">Was this helpful?</h3>
        <p className="text-sm text-slate-400 mb-4">Your feedback helps us improve the assessment experience.</p>
        <Textarea
          placeholder="Tell us what you think about your results..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="bg-slate-900/50 border-slate-700/50 text-white mb-4"
          data-testid="textarea-feedback"
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !feedback.trim()}
          className="bg-cyan-500 hover:bg-cyan-400 text-black"
          data-testid="button-submit-feedback"
        >
          {isSubmitting ? "Sending..." : "Send Feedback"}
          <Send size={14} className="ml-2" />
        </Button>
      </GlassCard>
    </motion.div>
  );
}
