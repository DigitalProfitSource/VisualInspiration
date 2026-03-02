import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, ExternalLink, Wrench, Clock, Code, RefreshCw, Send, Eye, Zap, TrendingUp, Target, AlertTriangle, Download, Calendar } from "lucide-react";
import { AssessmentResult, PillarScore } from "@/lib/scoring";
import { GlassCard, GlassButton } from "@/components/ui/glass-ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

function useCountUp(end: number, duration: number = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);
  const targetRef = useRef(end);
  targetRef.current = end;

  useEffect(() => {
    if (hasAnimated.current) return;
    if (!isInView) return;
    if (targetRef.current === 0) return;
    hasAnimated.current = true;

    const target = targetRef.current;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return { value, ref };
}

function PillarCard({ 
  title, 
  pillar,
  icon,
  description
}: { 
  title: string; 
  pillar: PillarScore;
  icon: React.ReactNode;
  description: string;
}) {
  const isStrong = pillar.score >= 70;

  return (
    <GlassCard className="p-6 border-cyan-500/10 bg-slate-900/40 relative overflow-hidden" data-testid={`card-pillar-${title.toLowerCase()}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
            {isStrong && (
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                ✓ Strong foundation
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-white">{pillar.score}</span>
          <span className="text-base font-mono text-slate-500"> / 100</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-5">
        <div 
          className="h-full rounded-full transition-all bg-gradient-to-r from-cyan-500 to-teal-400" 
          style={{ width: `${pillar.score}%`, opacity: Math.max(0.4, pillar.score / 100) }} 
        />
      </div>
      
      <p className="text-base text-slate-400 mb-6">{description}</p>
      
      {pillar.findings.length > 0 && (
        <div className="mb-5">
          <p className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">What We Found</p>
          <ul className="space-y-2.5">
            {pillar.findings.map((finding, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2.5 leading-relaxed">
                <span className="text-cyan-500/60 mt-0.5">–</span>
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {pillar.blindspots.length > 0 && (
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Blindspots</p>
          <ul className="space-y-2.5">
            {pillar.blindspots.map((spot, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2.5 leading-relaxed">
                <AlertTriangle size={14} className="text-cyan-400/70 mt-0.5 flex-shrink-0" />
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
  const [contactEmail, setContactEmail] = useState<string>('');
  const { value: animatedScore, ref: scoreRef } = useCountUp(result?.overallScore ?? 0);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    const storedLeadId = sessionStorage.getItem('leadId');
    const storedEmail = sessionStorage.getItem('contactEmail');
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedLeadId) {
      setLeadId(storedLeadId);
    }
    if (storedEmail) {
      setContactEmail(storedEmail);
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

  const pillars = [
    { name: "Capture", score: result.captureScore.score },
    { name: "Convert", score: result.convertScore.score },
    { name: "Compound", score: result.compoundScore.score },
  ];
  const weakest = pillars.reduce((a, b) => a.score <= b.score ? a : b);

  const calendarUrl = "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi";

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

        {/* === SCORE DASHBOARD CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <GlassCard className="p-8 md:p-10 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900/50 relative overflow-hidden" data-testid="card-hero-dashboard">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
            <div className="relative">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wide mb-1">
                Sequential Revenue™ Friction Analysis
              </h1>
              <p className="text-base text-slate-400 mb-8">
                {result.businessName} — where friction is slowing your revenue
              </p>

              <div className="rounded-xl bg-slate-900/60 border border-cyan-500/20 p-6 md:p-8 text-center mb-6" ref={scoreRef}>
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold mb-3">Sequential Revenue™ Score</p>
                <div className="relative inline-block">
                  <span 
                    className="text-7xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(103, 232, 249, 0.3))'
                    }}
                    data-testid="text-overall-score"
                  >
                    {animatedScore}
                  </span>
                  <span className="text-3xl md:text-4xl font-mono text-slate-500 ml-2">/ 100</span>
                </div>
                <p className="text-base text-slate-400 mt-3">
                  Your Capture–Convert–Compound loop is dragging
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <Eye size={16} className="text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-sm uppercase tracking-wide text-[#ebf1f2]">Capture</span>
                  <span className="text-white font-mono font-bold text-lg">{result.captureScore.score}</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <Target size={16} className="text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-sm uppercase tracking-wide text-[#ffffff]">Convert</span>
                  <span className="text-white font-mono font-bold text-lg">{result.convertScore.score}</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <TrendingUp size={16} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-cyan-400 font-bold text-sm uppercase tracking-wide">Compound</span>
                  <span className="text-white font-mono font-bold text-lg">{result.compoundScore.score}</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 text-center">
                Industry: {result.industry}{result.niche ? ` — ${result.niche}` : ''} &nbsp;|&nbsp; Leads: {result.monthlyLeads}/mo &nbsp;|&nbsp; Team: {result.teamSize} &nbsp;|&nbsp; Avg Job: ${result.avgJobValue.toLocaleString()}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* === REVENUE DRAG CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <GlassCard className="p-8 md:p-10 border-cyan-500/30 bg-gradient-to-br from-slate-900/60 to-cyan-950/30 relative overflow-hidden text-center" data-testid="card-revenue-drag">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-heading font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 uppercase tracking-wider mb-6 text-[#f7f2f2]">
                Estimated Revenue Drag
              </h2>
              
              <p className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-1" style={{ filter: 'drop-shadow(0 0 20px rgba(103, 232, 249, 0.25))' }}>
                ${result.totalMonthlyGap.toLocaleString()}
              </p>
              <p className="text-sm text-slate-400 font-medium mb-6">Monthly Revenue Drag</p>
              
              <p className="text-3xl md:text-4xl font-mono font-bold text-cyan-400/80 mb-1">
                ${result.annualizedGap.toLocaleString()}
              </p>
              <p className="text-sm text-slate-400 font-medium mb-6">Annualized Revenue Drag</p>
              
              <p className="text-xs text-slate-500">Based on avg job value × leads lost to friction</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* === PILLAR BREAKDOWN === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-white">Pillar Breakdown</h2>
          
          <PillarCard 
            title="Capture" 
            pillar={result.captureScore}
            icon={<Eye size={20} className="text-cyan-400" />}
            description="How effectively you attract and respond to new leads. This covers response speed, availability, AI search visibility, and lead intake."
          />
          
          <PillarCard 
            title="Convert" 
            pillar={result.convertScore}
            icon={<Target size={20} className="text-cyan-400" />}
            description="How well you turn leads into paying customers. This covers follow-up persistence, no-show recovery, pipeline tracking, and close rate."
          />
          
          <PillarCard 
            title="Compound" 
            pillar={result.compoundScore}
            icon={<TrendingUp size={20} className="text-cyan-400" />}
            description="How effectively past customers fuel future growth. This covers dormant lead reactivation and review generation."
          />
        </motion.div>

        {/* === BLINDSPOTS === */}
        {result.blindspots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Your Blindspots</h2>
            <GlassCard className="p-6 border-cyan-500/10 bg-slate-900/40">
              <p className="text-sm text-slate-400 mb-4">These are the friction points most likely costing you revenue right now:</p>
              <ul className="space-y-3">
                {result.blindspots.map((spot, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <AlertTriangle size={16} className="text-cyan-400/70 mt-0.5 flex-shrink-0" />
                    {spot}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        )}

        {/* === ACTION PLAN === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-cyan-400 mb-2">Your Next-30-Day Action Plan</h2>
          <p className="text-slate-300 mb-1">
            Start here — tailored to your <span className="font-bold text-white">weakest pillar: {weakest.name} ({weakest.score}/100)</span>.
          </p>
          <p className="text-slate-500 text-sm mb-6">You can implement with or without SimpleSequence.</p>
          
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
                    <p className="text-sm text-slate-300 leading-relaxed">{action}</p>
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
                    <p className="text-sm text-slate-400 leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* === DIY REALITY === */}
          <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
            <h3 className="text-xl font-heading font-bold text-white mb-2">The Reality of DIY Implementation</h3>
            <p className="text-slate-400 text-sm mb-6">
              Most businesses intend these fixes but never finish.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <Clock size={20} className="text-cyan-400/60 mx-auto mb-3" />
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-2">Time Investment</p>
                <p className="text-2xl font-mono font-bold text-cyan-400 mb-1">15–30 hrs</p>
                <p className="text-xs text-slate-500">setup & troubleshooting</p>
              </div>
              <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <Code size={20} className="text-cyan-400/60 mx-auto mb-3" />
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-2">Technical Debt</p>
                <p className="text-2xl font-mono font-bold text-cyan-400 mb-1">API Skills</p>
                <p className="text-xs text-slate-500">needed to prevent failures</p>
              </div>
              <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <RefreshCw size={20} className="text-cyan-400/60 mx-auto mb-3" />
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-2">Ongoing Overhead</p>
                <p className="text-2xl font-mono font-bold text-cyan-400 mb-1">Constant</p>
                <p className="text-xs text-slate-500">maintenance & monitoring</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* === TIER CARDS === */}
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

        {/* === BOTTOM CTAs === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <GlassCard className="p-8 border-cyan-500/20 bg-gradient-to-br from-cyan-950/15 to-slate-900/40 text-center" data-testid="card-bottom-ctas">
            <div className="space-y-4">
              <Link href="/book">
                <GlassButton 
                  className="w-full md:w-auto min-w-[300px] bg-cyan-500 hover:bg-cyan-400 text-black text-lg font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(103,232,249,0.2)]"
                  data-testid="button-get-installed"
                >
                  Get SimpleSequence Installed
                  <ArrowRight size={18} className="ml-2" />
                </GlassButton>
              </Link>

              <div>
                <a 
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all text-base font-semibold"
                  data-testid="button-book-strategy-call"
                >
                  <Calendar size={16} />
                  Book 15-min Strategy Call
                </a>
              </div>

              <div>
                <button
                  onClick={() => {
                    const storedLeadId = sessionStorage.getItem('leadId');
                    if (storedLeadId) {
                      window.open(`/api/assessment/${storedLeadId}/pdf`, '_blank');
                    }
                  }}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 underline underline-offset-2"
                  data-testid="link-download-pdf"
                >
                  <Download size={14} />
                  Download PDF Results
                </button>
              </div>

              {contactEmail && (
                <p className="text-sm text-slate-500 mt-4">
                  <CheckCircle size={14} className="inline text-cyan-400/60 mr-1.5" />
                  Results emailed to {contactEmail}
                </p>
              )}
            </div>
          </GlassCard>
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
