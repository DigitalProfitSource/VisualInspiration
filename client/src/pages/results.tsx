import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area,
} from "recharts";
import {
  ArrowRight, CheckCircle, ExternalLink, Wrench, Clock, Code, RefreshCw,
  Send, Eye, Zap, TrendingUp, Target, AlertTriangle, Download, Calendar,
  ChevronDown, TrendingDown, Info, Globe,
} from "lucide-react";
import { AssessmentResult, PillarScore, IndustryBenchmark } from "@/lib/scoring";
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

function AnimatedMoney({
  value,
  duration = 1200,
  prefix = "$",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !isInView || value === 0) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}
    </span>
  );
}

// ── Phase 2: Business Health Score Dashboard ──────────────────────────────────
function AnimatedGauge({ score, size = 160, stroke = 14 }: { score: number; size?: number; stroke?: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !isInView) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const duration = 1400;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, score]);

  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - displayScore / 100);
  const cx = size / 2;
  const cy = size / 2;

  const color = displayScore < 40 ? '#c0504d' : displayScore < 65 ? '#0891b2' : '#22d3ee';
  const label = displayScore < 40 ? 'Critical' : displayScore < 65 ? 'Moderate' : 'Healthy';

  // Scale text proportionally so numbers stay inside the circle at every size.
  const numSize  = Math.round(size * 0.235); // ~37px at 160, ~23px at 100
  const lblSize  = Math.max(7, Math.round(size * 0.072)); // ~11px at 160, ~7px at 100

  return (
    // Relative wrapper sized to exactly match the SVG so the overlay centres perfectly.
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2332" strokeWidth={stroke} />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease, stroke 0.4s ease' }}
        />
      </svg>
      {/* Overlay centred over the SVG — inset-0 fills the relative wrapper, then flex centres the text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold leading-none" style={{ color, fontSize: numSize }}>
          {displayScore}
        </span>
        <span
          className="font-bold uppercase tracking-[0.18em] mt-0.5 leading-none"
          style={{ color, fontSize: lblSize }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function PillarBar({ name, score, delay = 0 }: { name: string; score: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !isInView) return;
    hasAnimated.current = true;
    const timeout = setTimeout(() => {
      setWidth(score);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, score, delay]);

  const color = score < 40 ? '#c0504d' : score < 65 ? '#0891b2' : '#22d3ee';

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-slate-300">{name}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 bg-[#1a2332] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

function BusinessHealthDashboard({ result }: { result: { overallScore: number; captureScore: { score: number }; convertScore: { score: number }; compoundScore: { score: number } } }) {
  const score = result.overallScore;
  const scoreColor = score < 40 ? '#c0504d' : score < 65 ? '#0891b2' : '#22d3ee';
  const r = (160 - 14) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
      <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">Business Health Score</p>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Circular gauge */}
        <AnimatedGauge score={score} />
        {/* Pillar breakdown */}
        <div className="flex-1 w-full space-y-5">
          <p className="text-xs text-slate-500 leading-relaxed">
            This composite score reflects how effectively your business captures, converts, and compounds its revenue. The lower the score, the more recoverable revenue is being left on the table.
          </p>
          <PillarBar name="Capture (Speed-to-Lead)" score={result.captureScore.score} delay={100} />
          <PillarBar name="Convert (Follow-Through)" score={result.convertScore.score} delay={250} />
          <PillarBar name="Compound (Growth Engine)" score={result.compoundScore.score} delay={400} />
        </div>
      </div>
    </div>
  );
}

// ── Phase 2: Industry Benchmark Comparison ────────────────────────────────────
function BenchmarkBar({ label, userValue, benchmarkValue, format = 'percent', userLabel, benchmarkLabel }: {
  label: string;
  userValue: number;
  benchmarkValue: number;
  format?: 'percent' | 'dollar' | 'number';
  userLabel?: string;
  benchmarkLabel?: string;
}) {
  const [userW, setUserW] = useState(0);
  const [bmW, setBmW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.4 });
  const hasAnimated = useRef(false);
  const maxVal = Math.max(userValue, benchmarkValue, 1);

  useEffect(() => {
    if (hasAnimated.current || !isInView) return;
    hasAnimated.current = true;
    setTimeout(() => {
      setUserW((userValue / maxVal) * 100);
      setBmW((benchmarkValue / maxVal) * 100);
    }, 100);
  }, [isInView, userValue, benchmarkValue, maxVal]);

  const fmt = (v: number) => {
    if (format === 'percent') return `${Math.round(v * 100)}%`;
    if (format === 'dollar') return `$${v.toLocaleString()}`;
    return String(Math.round(v));
  };

  const userBetter = userValue >= benchmarkValue;

  return (
    <div ref={ref} className="space-y-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">You</span>
          <div className="flex-1 h-2.5 bg-[#1a2332] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${userW}%`,
                backgroundColor: userBetter ? '#22d3ee' : '#c0504d',
                transition: 'width 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
          <span className="text-xs font-mono font-bold w-16 text-right" style={{ color: userBetter ? '#22d3ee' : '#c0504d' }}>
            {userLabel ?? fmt(userValue)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">Industry</span>
          <div className="flex-1 h-2.5 bg-[#1a2332] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-500"
              style={{
                width: `${bmW}%`,
                transition: 'width 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            />
          </div>
          <span className="text-xs font-mono text-slate-400 w-16 text-right">
            {benchmarkLabel ?? fmt(benchmarkValue)}
          </span>
        </div>
      </div>
    </div>
  );
}

function IndustryBenchmarks({ result }: { result: { closeRate: number; monthlyLeads: number; avgJobValue: number; industry: string; overallScore: number } }) {
  // Industry-aware benchmark targets
  const industry = result.industry?.toLowerCase() ?? '';
  const isHighValue = ['roofing', 'solar', 'remodel', 'construction', 'legal', 'hvac'].some(k => industry.includes(k));
  const benchmarkCloseRate = isHighValue ? 0.42 : 0.38;
  const benchmarkLeads = 55;
  const benchmarkJobValue = isHighValue ? 8500 : 2500;
  const benchmarkScore = 62;

  return (
    <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
      <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">
        Industry Benchmark Comparison
      </p>
      <p className="text-xs text-slate-500 mb-6">
        How you stack up against similar {result.industry || 'service'} businesses. Industry averages sourced from aggregated performance data across comparable operators.
      </p>
      <div className="space-y-6">
        <BenchmarkBar
          label="Close Rate"
          userValue={result.closeRate}
          benchmarkValue={benchmarkCloseRate}
          format="percent"
        />
        <BenchmarkBar
          label="Monthly Lead Volume"
          userValue={result.monthlyLeads}
          benchmarkValue={benchmarkLeads}
          format="number"
        />
        <BenchmarkBar
          label="Average Job Value"
          userValue={result.avgJobValue}
          benchmarkValue={benchmarkJobValue}
          format="dollar"
        />
        <BenchmarkBar
          label="Overall Business Health Score"
          userValue={result.overallScore}
          benchmarkValue={benchmarkScore}
          format="number"
          userLabel={`${result.overallScore}/100`}
          benchmarkLabel={`${benchmarkScore}/100`}
        />
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function PillarCard({
  title,
  pillar,
  icon,
  description,
  monthlyImpact,
  calcFormula,
  calcLabel,
  benchmarkNote,
  foundMoneyPotential,
}: {
  title: string;
  pillar: PillarScore;
  icon: React.ReactNode;
  description: string;
  monthlyImpact: number;
  calcFormula: string;
  calcLabel: string;
  benchmarkNote: string;
  foundMoneyPotential?: number;
}) {
  const [showCalc, setShowCalc] = useState(false);

  return (
    <div
      className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_1px_rgba(103,232,249,0.08)]"
      data-testid={`card-pillar-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-[#0c1018] border border-[#182030] shadow-[inset_0_1px_0_rgba(103,232,249,0.05)]">
          {icon}
        </div>
        <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">{description}</p>

      {pillar.findings.length > 0 && (
        <div className="mb-5">
          <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">What We Found</p>
          <ul className="space-y-2">
            {pillar.findings.map((finding, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2.5 leading-relaxed">
                <span className="text-cyan-500/50 mt-0.5 flex-shrink-0">–</span>
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pillar.blindspots.length > 0 && (
        <div className="pt-5 border-t border-[#1a2332] mb-6">
          <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">What's Causing This</p>
          <ul className="space-y-2">
            {pillar.blindspots.map((spot, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2.5 leading-relaxed">
                <AlertTriangle size={13} className="text-cyan-400/60 mt-0.5 flex-shrink-0" />
                {spot}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-5 border-t border-[#1a2332]">
        <div className="flex items-end justify-between mb-1">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] font-semibold mb-2">Estimated Monthly Impact</p>
            <p
              className="text-3xl md:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 leading-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(103, 232, 249, 0.15))' }}
            >
              <AnimatedMoney value={monthlyImpact} prefix="~$" />
            </p>
          </div>
          <button
            onClick={() => setShowCalc(!showCalc)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
            data-testid={`toggle-calc-${title.toLowerCase()}`}
          >
            {showCalc ? 'Hide' : 'Show'} calculation
            <ChevronDown size={14} className={`transition-transform ${showCalc ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showCalc && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-2"
          >
            <p className="text-xs text-slate-500">{calcLabel}</p>
            <div className="rounded-lg bg-[#0c1018] border border-[#182030] px-4 py-3 shadow-[inset_0_1px_0_rgba(103,232,249,0.04)]">
              <p className="text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">{calcFormula}</p>
            </div>
          </motion.div>
        )}
      </div>

      {foundMoneyPotential != null && foundMoneyPotential > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-[#1a2332]" />
            <span className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-[0.2em] whitespace-nowrap">Separate Opportunity</span>
            <div className="flex-1 h-px bg-[#1a2332]" />
          </div>
          <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">DBR Campaign Engine</span>
              <span className="text-[10px] font-semibold text-cyan-500/60 bg-cyan-500/10 px-2 py-0.5 rounded-full">Recurring · 3x/yr</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">
              Your dormant lead database generates an estimated{" "}
              <span className="font-mono font-bold text-cyan-400">~<AnimatedMoney value={foundMoneyPotential} /></span> per campaign.
              Run seasonally (spring push, fall push, new service launch) — this is a recurring revenue engine, not a one-time event.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-cyan-500/10">
              <div className="text-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Per Campaign</p>
                <p className="text-sm font-mono font-bold text-cyan-300"><AnimatedMoney value={foundMoneyPotential} /></p>
              </div>
              <div className="text-center border-x border-cyan-500/10">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Campaigns/yr</p>
                <p className="text-sm font-mono font-bold text-cyan-300">3×</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Annual Total</p>
                <p className="text-sm font-mono font-bold text-cyan-300"><AnimatedMoney value={foundMoneyPotential * 3} /></p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Funds your setup cost upfront. As campaigns compound, they supplement the monthly retainer — dormant leads become a recurring revenue stream.
            </p>
          </div>
        </div>
      )}

      {benchmarkNote && (
        <div className="mt-4 pt-4 border-t border-[#1a2332]">
          <p className="text-xs text-slate-500 flex items-start gap-2">
            <Info size={12} className="text-cyan-400/50 mt-0.5 flex-shrink-0" />
            {benchmarkNote}
          </p>
        </div>
      )}
    </div>
  );
}

function TierCard({
  tier,
  description,
  features,
  isRecommended,
  reason,
}: {
  tier: string;
  description: string;
  features: string[];
  isRecommended: boolean;
  reason?: string;
}) {
  return (
    <div className={`relative rounded-2xl p-6 transition-all flex flex-col ${
      isRecommended
        ? 'bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,217,255,0.15)]'
        : 'bg-slate-900/40 border border-slate-700/50'
    }`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          Recommended based on your analysis
        </div>
      )}

      <h3 className="text-xl font-heading font-bold text-white mb-1">{tier}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>

      {reason && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-cyan-300">{reason}</p>
        </div>
      )}

      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link href="/book">
        <Button
          className={`w-full ${isRecommended ? 'bg-cyan-500 hover:bg-cyan-400 text-black' : 'bg-slate-700 hover:bg-slate-600'}`}
          data-testid={`button-tier-${tier.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Discuss fit &amp; investment
          <ArrowRight size={14} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
}

export default function Results() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const { value: animatedScore, ref: scoreRef } = useCountUp(result?.totalMonthlyGap ?? 0);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    const storedLeadId = sessionStorage.getItem('leadId');
    const storedEmail = sessionStorage.getItem('contactEmail');

    if (storedResult) {
      const parsed = JSON.parse(storedResult) as AssessmentResult;
      if (!parsed.gapBreakdown) {
        parsed.gapBreakdown = {
          captureGap: 0,
          convertGap: 0,
          compoundGap: 0,
          total: parsed.totalMonthlyGap || 0,
          captureCalc: "Calculation unavailable — retake assessment for full breakdown",
          convertCalc: "Calculation unavailable — retake assessment for full breakdown",
          compoundCalc: "Calculation unavailable — retake assessment for full breakdown",
          captureGapLow: 0,
          captureGapHigh: 0,
          convertGapLow: 0,
          convertGapHigh: 0,
          compoundGapLow: 0,
          compoundGapHigh: 0,
          totalLow: 0,
          totalHigh: parsed.totalMonthlyGap || 0,
          confidenceBand: 0.25,
        };
      }
      setResult(parsed);
    }
    if (storedLeadId) setLeadId(storedLeadId);
    if (storedEmail) setContactEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!result) {
      const timer = setTimeout(() => {
        if (!result) setLocation("/assessment");
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

  const fn = result.financialNarrative;
  const bm = result.industryBenchmark ?? {
    industryLabel: "service businesses",
    captureStats: "Lead follow-up rate improved from 31% to 89% after closing speed gaps",
    conversionStats: "Automated follow-up sequences recovered 20-35% of previously lost bookings",
    compoundStats: "Automated review requests drove consistent 5-star growth month over month",
  };

  const pillarScores = [
    { name: "Capture", score: result.captureScore.score, gap: result.gapBreakdown.captureGap },
    { name: "Convert", score: result.convertScore.score, gap: result.gapBreakdown.convertGap },
    { name: "Compound", score: result.compoundScore.score, gap: result.gapBreakdown.compoundGap },
  ];
  const weakestByScore = [...pillarScores].sort((a, b) => a.score - b.score)[0];
  const weakestByGap = [...pillarScores].sort((a, b) => b.gap - a.gap)[0];

  const calendarUrl = "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi";

  const blueprintFeatures = [
    "24/7 Website AI Chatbot",
    "AI Voice Backup Receptionist",
    "Instant SMS Text-Back on missed calls",
    "Speed-to-lead engine (<60 seconds)",
    "Omnichannel intake consolidation",
    "250 AI Voice Minutes/mo",
  ];

  const growthFeatures = [
    "Everything in Blueprint, plus:",
    "Proactive Quote / No-Show Recovery workflows",
    "Smart Lead Triage & AI Qualification",
    "90-Day Lead Nurture Sequences",
    "Automated 5-Star Review Collection",
    "Sentiment-based review routing (public vs. private)",
    "500 AI Voice Minutes/mo",
  ];

  const operatingFeatures = [
    "Everything in Growth Architecture, plus:",
    'The "Found Money" DBR Campaign (30-day guarantee)',
    "AI Search Visibility (ChatGPT, Perplexity, Google AI Overviews)",
    "Machine-readable schema injection (JSON-LD)",
    "Multi-platform reputation management",
    "Database segmentation & lifecycle reactivation",
    "1,000 AI Voice Minutes/mo",
  ];

  const revenueSnapshotData = [
    { name: "Current Annual\nRevenue", value: fn?.currentAnnualRevenue ?? 0, fill: "#334155" },
    { name: "Potential w/ System\n(Conservative)", value: fn?.potentialAnnualRevenue ?? 0, fill: "#22d3ee" },
  ];

  const cumulativeChartData = (fn?.cumulativeGainByMonth ?? []).map((v, i) => ({
    month: `M${i + 1}`,
    value: v,
  }));

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

        {/* === TITLE === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <p className="text-[11px] font-bold text-cyan-400/60 uppercase tracking-[0.25em] mb-2">Sequential Revenue™ Friction Analysis</p>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
            {result.businessName}
          </h1>
          {result.niche && (
            <p className="text-sm md:text-base text-cyan-400/80 mb-3 font-medium">
              {result.niche}
            </p>
          )}
          {/* Methodology frame — positions the report as Step 1 of 4 */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-[11px] text-slate-400">
            <span className="font-bold text-cyan-300 uppercase tracking-wider">Step 1 of 4</span>
            <span className="text-slate-500">·</span>
            <span><span className="text-cyan-400 font-semibold">Diagnose Friction</span> (you are here)</span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-500">Map Sequences</span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-500">Locate Leverage</span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-500">Architect the Flow</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">The 30-minute audit below covers Steps 2–4.</p>
        </motion.div>

        {/* === HERO: Gap + Health Score + Pain Echo === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.02 }}
          className="mb-6"
        >
          <div className="rounded-2xl bg-[#080b10] border border-cyan-500/30 relative overflow-hidden shadow-[0_0_60px_rgba(0,217,255,0.08),0_8px_32px_rgba(0,0,0,0.6)]"
            style={{ backgroundImage: 'radial-gradient(ellipse at 30% 0%, rgba(103,232,249,0.06) 0%, transparent 55%)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="p-6 md:p-8">
              {/* Top row: big gap number + health score */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-6">
                {/* Left: gap number */}
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-cyan-400/70 uppercase tracking-[0.25em] mb-2">Monthly Revenue Gap Identified</p>
                  <p className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 leading-none mb-1"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(103,232,249,0.25))' }}>
                    <AnimatedMoney value={result.totalMonthlyGap} prefix="$" />
                    <span className="text-2xl text-slate-400 font-normal">/mo</span>
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    <AnimatedMoney value={result.annualizedGap} className="font-mono font-semibold text-slate-400" /> annualized
                    {fn && (
                      <span className="text-slate-600"> · +<AnimatedMoney value={fn.dbrAnnualPotential} className="font-mono" /> DBR campaign revenue/yr</span>
                    )}
                  </p>

                  {/* 3-pillar gap breakdown */}
                  <div className="grid grid-cols-3 gap-3">
                    {pillarScores.map((p) => (
                      <div key={p.name} className={`rounded-xl p-3 border ${p.name === weakestByGap.name ? 'border-cyan-500/40 bg-cyan-950/30' : 'border-[#1a2332] bg-[#0c1018]'}`}>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">{p.name}</p>
                        <p className={`text-base font-mono font-bold ${p.name === weakestByGap.name ? 'text-cyan-400' : 'text-slate-300'}`}>
                          ~$<AnimatedMoney value={p.gap} prefix="" />
                          <span className="text-[10px] text-slate-500 font-normal">/mo</span>
                        </p>
                        {p.name === weakestByGap.name && (
                          <p className="text-[9px] text-cyan-500/70 font-semibold mt-0.5">Biggest gap</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: compact health score */}
                <div className="flex flex-col items-center md:items-end flex-shrink-0">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Health Score</p>
                  <AnimatedGauge score={result.overallScore} size={100} stroke={9} />
                  <p className="text-[10px] text-slate-500 mt-1 text-center">
                    Lowest: <span className="text-coral font-semibold" style={{ color: '#c0504d' }}>{weakestByScore.name} {weakestByScore.score}/100</span>
                  </p>
                </div>
              </div>

              {/* Bottom: pain echo — acknowledges all flagged areas, not just the top one */}
              {result.userPainPoints?.topPain && (() => {
                const allPains = result.userPainPoints.allPains ?? [];
                const count = allPains.length;
                const topPain = result.userPainPoints.topPain;
                const others = allPains.filter(p => p.value !== topPain.value).slice(0, 4);

                return (
                  <div className="flex items-start gap-3 pt-4 border-t border-[#1a2332]">
                    <AlertTriangle size={14} className="text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1.5">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {count > 1 ? (
                          <>
                            You flagged{" "}
                            <span className="font-semibold text-white">{count} friction areas</span>.{" "}
                            Our analysis addresses all of them — starting with your sharpest:{" "}
                            <span className="font-semibold text-white">"{topPain.value}"</span>.
                          </>
                        ) : (
                          <>
                            You flagged{" "}
                            <span className="font-semibold text-white">"{topPain.value}"</span>{" "}
                            as your biggest friction point. Our analysis addresses that pillar first.
                          </>
                        )}
                      </p>
                      {others.length > 0 && (
                        <p className="text-[12px] text-slate-500 leading-relaxed">
                          Also flagged:{" "}
                          {others.map((p, i) => (
                            <span key={p.value}>
                              <span className="text-slate-400">{p.value}</span>
                              {i < others.length - 1 ? <span className="text-slate-600"> · </span> : null}
                            </span>
                          ))}
                          {allPains.length > 5 && <span className="text-slate-600"> · …</span>}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </motion.div>

        {/* === BUSINESS HEALTH SCORE DASHBOARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="mb-6"
        >
          <BusinessHealthDashboard result={result} />
        </motion.div>

        {/* === SECTION 2: BUSINESS AT A GLANCE === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <div
            className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_1px_rgba(103,232,249,0.08)]"
            data-testid="card-business-glance"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-5">Your Business At A Glance</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4">
              {[
                { label: "Industry", value: result.industry },
                { label: "Specialization", value: result.niche || "General" },
                { label: "Monthly Leads", value: String(result.monthlyLeads) },
                { label: "Team Size", value: result.teamSize },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Avg Job Value", value: `$${result.avgJobValue.toLocaleString()}` },
                result.monthlySalesVolume > 0 ? { label: "Monthly Job Volume", value: `${result.monthlySalesVolume} jobs/mo` } : null,
                result.adSpend > 0 ? { label: "Monthly Ad Spend", value: `$${result.adSpend.toLocaleString()}/mo` } : null,
              ].filter((item): item is { label: string; value: string } => item !== null).map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === DATA COHERENCE WARNING (when user's inputs contradict each other) === */}
        {result.inputCoherence && !result.inputCoherence.consistent && result.inputCoherence.warning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-6"
          >
            <div
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: 'rgba(192,80,77,0.10)', borderColor: 'rgba(192,80,77,0.32)' }}
              data-testid="card-coherence-warning"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} style={{ color: '#c0504d' }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#c0504d' }}>Data Coherence Check</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{result.inputCoherence.warning}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pain echo now lives in the Hero card above */}

        {/* === SECTION 3: TOTAL IMPACT SUMMARY === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="rounded-2xl bg-[#080b10] border border-cyan-500/15 p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_1px_rgba(103,232,249,0.1)]"
            style={{ backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(103,232,249,0.04) 0%, transparent 60%)' }}
            data-testid="card-total-impact"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-cyan-500/10">
                <TrendingUp size={18} className="text-cyan-400" />
              </div>
              <p className="text-base font-bold text-cyan-400">Total Impact Summary</p>
            </div>
            <div className="text-center mb-6" ref={scoreRef}>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] font-semibold mb-3">Total Monthly Revenue Gap</p>
              <p
                className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#67E8F9] via-[#22d3ee] to-[#0ea5e9] leading-none mb-2"
                style={{ filter: 'drop-shadow(0 0 30px rgba(103, 232, 249, 0.2)) drop-shadow(0 0 60px rgba(103, 232, 249, 0.08))' }}
                data-testid="text-total-gap"
              >
                ${animatedScore > 0 ? animatedScore.toLocaleString() : result.totalMonthlyGap.toLocaleString()}
              </p>
              {result.gapBreakdown.totalLow > 0 && result.gapBreakdown.totalHigh > 0 && (
                <p className="text-xs text-slate-500 font-mono mb-1">
                  Range: ${result.gapBreakdown.totalLow.toLocaleString()} – ${result.gapBreakdown.totalHigh.toLocaleString()}
                  <span className="text-slate-600"> (±{Math.round((result.gapBreakdown.confidenceBand ?? 0.25) * 100)}% confidence band)</span>
                </p>
              )}
              <p className="text-sm text-slate-400">
                Annualized: <AnimatedMoney value={result.annualizedGap} className="font-mono font-semibold text-slate-300" />
              </p>
            </div>
            {/* 3 steady monthly gaps */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Capture Gap", amount: result.gapBreakdown.captureGap, low: result.gapBreakdown.captureGapLow, high: result.gapBreakdown.captureGapHigh },
                { label: "Conversion Gap", amount: result.gapBreakdown.convertGap, low: result.gapBreakdown.convertGapLow, high: result.gapBreakdown.convertGapHigh },
                { label: "Reviews Gap", amount: result.gapBreakdown.compoundGap, low: result.gapBreakdown.compoundGapLow, high: result.gapBreakdown.compoundGapHigh },
              ].map((g) => (
                <div key={g.label} className="text-center">
                  <p className="text-xs font-bold text-cyan-400 mb-1">{g.label}</p>
                  <p className="font-mono font-bold text-base text-slate-300">
                    <AnimatedMoney value={g.amount} />
                  </p>
                  {g.low > 0 && g.high > 0 && (
                    <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                      ${g.low.toLocaleString()}–${g.high.toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* DBR Campaign Layer — recurring, separate from monthly gap */}
            {fn && fn.dbrCampaignValue > 0 && (
              <div className="rounded-xl border border-cyan-500/15 bg-cyan-950/10 p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">+ DBR Campaign Layer</p>
                      <span className="text-[10px] font-semibold text-cyan-500/60 bg-cyan-500/10 px-2 py-0.5 rounded-full">Recurring · {fn.dbrCampaignsPerYear}x/yr</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Seasonal reactivation, new services, re-engagement — funds setup &amp; retainer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-cyan-300">
                      ~<AnimatedMoney value={fn.dbrMonthlyEquivalent} /><span className="text-slate-500 text-xs font-normal">/mo equiv</span>
                    </p>
                    <p className="text-[10px] text-slate-600 font-mono">
                      <AnimatedMoney value={fn.dbrCampaignValue} />/campaign · <AnimatedMoney value={fn.dbrAnnualPotential} />/yr
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* === SECTION 4: REVENUE SNAPSHOT === */}
        {fn && fn.currentAnnualRevenue > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-8"
          >
            <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
              <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">Revenue Snapshot — Current vs. Potential</p>
              <p className="text-xs text-slate-500 mb-6">
                Conservative projection assumes capturing 50% of the identified monthly gap.
              </p>
              <div className="flex items-end justify-center gap-2 mb-2 text-sm font-mono font-bold text-cyan-400">
                +<AnimatedMoney value={fn.conservativeAnnualGain} />/yr potential
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueSnapshotData} barCategoryGap="35%">
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
                    contentStyle={{ background: "#0c1018", border: "1px solid #1a2332", borderRadius: 8, color: "#e2e8f0" }}
                    cursor={{ fill: "rgba(103,232,249,0.04)" }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {revenueSnapshotData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Current Annual Revenue</p>
                  <p className="text-lg font-mono font-bold text-slate-400">
                    <AnimatedMoney value={fn.currentAnnualRevenue} />
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Potential w/ System</p>
                  <p className="text-lg font-mono font-bold text-cyan-400">
                    <AnimatedMoney value={fn.potentialAnnualRevenue} />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === SECTION 5: GAP ANALYSIS (PILLAR CARDS) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="space-y-6 mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-white">Gap Analysis</h2>

          <PillarCard
            title="Capture"
            pillar={result.captureScore}
            icon={<Eye size={20} className="text-cyan-400" />}
            description="Speed-to-lead is the #1 predictor of conversion. Research shows 78% of customers go with whoever responds first."
            monthlyImpact={result.gapBreakdown.captureGap}
            calcFormula={result.gapBreakdown.captureCalc}
            calcLabel="Capture Gap = Unavailable leads × Speed loss rate × Avg job value"
            benchmarkNote={`Among ${bm.industryLabel}: ${bm.captureStats}.`}
          />

          <PillarCard
            title="Conversion"
            pillar={result.convertScore}
            icon={<Target size={20} className="text-cyan-400" />}
            description="Most revenue isn't lost at first contact — it's lost in the days and weeks after when no one follows up."
            monthlyImpact={result.gapBreakdown.convertGap}
            calcFormula={result.gapBreakdown.convertCalc}
            calcLabel="Conversion Gap = (No-show losses) + (Quote follow-up losses) — full math below"
            benchmarkNote={`Among ${bm.industryLabel}: ${bm.conversionStats}.`}
          />

          <PillarCard
            title="Reviews & Reputation"
            pillar={result.compoundScore}
            icon={<TrendingUp size={20} className="text-cyan-400" />}
            description="Every 5-star review generates future leads passively. This monthly gap reflects ongoing revenue lost to reputation drag — leads who chose a competitor with more reviews and trust signals. Closing this funds your monthly retainer by growing inbound leads organically."
            monthlyImpact={result.gapBreakdown.compoundGap}
            calcFormula={result.gapBreakdown.compoundCalc}
            calcLabel="Reviews Gap = Monthly leads × Reputation drag rate × Close rate × Avg job value (ongoing, recurring)"
            benchmarkNote={`Among ${bm.industryLabel}: ${bm.compoundStats}.`}
            foundMoneyPotential={fn?.foundMoneyPotential}
          />
        </motion.div>

        {/* === AI SEARCH VISIBILITY CALLOUT === */}
        {(result.aiSearchFrequency.includes("No") || result.aiSearchFrequency.includes("Not sure") || result.aiReadiness.includes("No") || result.aiReadiness.includes("We don't have") || result.aiReadiness.includes("basic SEO")) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.145 }}
            className="mb-8"
          >
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Globe size={22} className="text-amber-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-[0.25em]">Invisible Gap</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">AI Search Visibility</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">
                    Customers are asking ChatGPT, Perplexity & Google AI who to hire — and you're not in the answer.
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    The way customers find service businesses has permanently changed. Before they visit your website, they're asking AI engines: <em className="text-slate-300">"Best HVAC company near me"</em> or <em className="text-slate-300">"Who has the best reviews for roofing in [city]?"</em> — and getting a named recommendation back. If your business isn't machine-readable, you're being cut out of a growing slice of inbound demand that your competitors are quietly capturing.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "ChatGPT / Claude / Gemini", detail: "Your business needs structured data (JSON-LD schema) so AI engines can read, cite, and recommend you." },
                      { label: "Google AI Overviews", detail: "Google's AI answers are replacing Page 1 clicks. Without schema markup, you're not in the answer box." },
                      { label: "Perplexity & Voice AI", detail: "These engines pull from structured signals, not just SEO rankings. Different game, different rules." },
                    ].map(item => (
                      <div key={item.label} className="rounded-lg bg-amber-950/20 border border-amber-500/10 p-3">
                        <p className="text-xs font-semibold text-amber-300 mb-1">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="text-amber-400 font-semibold">We fix this with Operating System.</span> Machine-readable schema injection (JSON-LD), AI-optimized business citations, and a structured presence that makes you recommendable by every major AI engine.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === PHASE 2: INDUSTRY BENCHMARK COMPARISON === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <IndustryBenchmarks result={result} />
        </motion.div>

        {/* === SECTION 6: SCENARIO ANALYSIS === */}
        {fn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mb-8"
          >
            <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
              <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">What Closing the Gap Looks Like</p>
              <p className="text-xs text-slate-500 mb-5">Our projections use the conservative scenario — capturing just 50% of the identified gap.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="border-b border-[#1a2332]">
                      <th className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-3">Metric</th>
                      <th className="text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-3">Current State</th>
                      <th className="text-right text-[10px] font-bold text-cyan-400 uppercase tracking-wider pb-3">Conservative (50%)</th>
                      <th className="text-right text-[10px] font-bold text-cyan-300 uppercase tracking-wider pb-3">Full Recovery (100%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a2332]">
                    <tr>
                      <td className="py-3 text-slate-400">Monthly Revenue</td>
                      <td className="py-3 text-right font-mono text-slate-300"><AnimatedMoney value={fn.currentMonthlyRevenue} /></td>
                      <td className="py-3 text-right font-mono text-cyan-400"><AnimatedMoney value={fn.currentMonthlyRevenue + fn.conservativeMonthlyRecovery} /></td>
                      <td className="py-3 text-right font-mono text-cyan-300"><AnimatedMoney value={fn.currentMonthlyRevenue + fn.fullMonthlyRecovery} /></td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-400">Additional Monthly</td>
                      <td className="py-3 text-right font-mono text-slate-500">—</td>
                      <td className="py-3 text-right font-mono text-cyan-400">+<AnimatedMoney value={fn.conservativeMonthlyRecovery} prefix="" /></td>
                      <td className="py-3 text-right font-mono text-cyan-300">+<AnimatedMoney value={fn.fullMonthlyRecovery} prefix="" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-400">Additional Annual</td>
                      <td className="py-3 text-right font-mono text-slate-500">—</td>
                      <td className="py-3 text-right font-mono font-bold text-cyan-400">+<AnimatedMoney value={fn.conservativeAnnualGain} prefix="" /></td>
                      <td className="py-3 text-right font-mono font-bold text-cyan-300">+<AnimatedMoney value={fn.fullAnnualGain} prefix="" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* === SECTION 7: 12-MONTH CUMULATIVE GAIN CHART === */}
        {fn && fn.conservativeMonthlyRecovery > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mb-8"
          >
            <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
              <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">12-Month Projected Cumulative Gain (Conservative)</p>
              <p className="text-xs text-slate-500 mb-5">Month-by-month accumulated recovery at 50% of identified gap.</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={cumulativeChartData} barCategoryGap="20%">
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Cumulative Gain"]}
                    contentStyle={{ background: "#0c1018", border: "1px solid #1a2332", borderRadius: 8, color: "#e2e8f0" }}
                    cursor={{ fill: "rgba(103,232,249,0.04)" }}
                  />
                  <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* === SECTION 8: COST OF INACTION === */}
        {fn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e74c3c]/20 to-transparent" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <TrendingDown size={14} className="text-[#e07060]" />
                The Cost of Inaction
              </p>

              <div className="rounded-xl border border-[#e74c3c]/25 bg-[#e74c3c]/05 p-5 mb-6">
                <DailyCostCounter dailyCost={fn.dailyCostOfInaction} />
                <p className="text-sm text-slate-400 mt-2">
                  That's <AnimatedMoney value={fn.totalMonthlyGap} className="font-mono font-semibold text-slate-300" /> per month in revenue that should be yours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-[#e74c3c]/20 bg-[#e74c3c]/05 p-5">
                  <p className="text-[10px] font-bold text-[#e07060] uppercase tracking-wider mb-3">Doing Nothing</p>
                  <ul className="space-y-2.5">
                    {[
                      "Revenue continues to leak",
                      "Competitors answer first and win the job",
                      "Follow-up stays manual and inconsistent",
                      "Past customers stay dormant",
                      "Reputation growth stays slow",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                        <span className="text-[#e07060]/60 mt-0.5 flex-shrink-0">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-5">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-3">With the Gap Closed</p>
                  <ul className="space-y-2.5">
                    {[
                      "Revenue gap captured",
                      "Every lead answered in under 60 seconds",
                      "Pipeline works itself automatically",
                      "Dormant database generates found money",
                      "5-star reviews compound automatically",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <CheckCircle size={13} className="text-cyan-400/60 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Cumulative revenue left on the table</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "6 Months", value: fn.sixMonthInactionCost },
                  { label: "12 Months", value: fn.twelveMonthInactionCost },
                  { label: "3 Years", value: fn.threeYearInactionCost },
                ].map((item) => (
                  <div key={item.label} className="text-center bg-[#0c1018] rounded-xl p-4 border border-[#1a2332]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-xl font-mono font-bold text-[#e07060]">
                      <AnimatedMoney value={item.value} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* === SECTION 9: LONG-TERM COMPOUNDING RETURNS === */}
        {fn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mb-8"
          >
            <div className="rounded-2xl bg-[#080b10] border border-[#1a2332] p-6 md:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
              <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">Long-Term Compounding Returns</p>
              <p className="text-xs text-slate-500 mb-5">Year 1 at conservative (50%), Years 2+ at full gap recovery as systems optimize.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[380px]">
                  <thead>
                    <tr className="border-b border-[#1a2332]">
                      <th className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-3">Timeframe</th>
                      <th className="text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-3">Projected Gain</th>
                      <th className="text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-3">Scenario Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a2332]">
                    <tr>
                      <td className="py-3 text-slate-300 font-semibold">Year 1</td>
                      <td className="py-3 text-right font-mono font-bold text-cyan-400"><AnimatedMoney value={fn.yearOneGain} /></td>
                      <td className="py-3 text-right text-slate-500 text-xs">Conservative (50% gap)</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-300 font-semibold">Year 3</td>
                      <td className="py-3 text-right font-mono font-bold text-cyan-400"><AnimatedMoney value={fn.yearThreeGain} /></td>
                      <td className="py-3 text-right text-slate-500 text-xs">Yr 1 conservative, then full</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-300 font-semibold">Year 5</td>
                      <td className="py-3 text-right font-mono font-bold text-cyan-400"><AnimatedMoney value={fn.yearFiveGain} /></td>
                      <td className="py-3 text-right text-slate-500 text-xs">Yr 1 conservative, then full</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Year 3+ projections assume the system matures to full gap recovery as AI is optimized and the review flywheel compounds.
              </p>
            </div>
          </motion.div>
        )}

        {/* === SECTION 10: BLINDSPOTS === */}
        {result.blindspots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mb-8"
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

        {/* === SECTION 11: ACTION PLAN === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-cyan-400 mb-2">Your Next-30-Day Action Plan</h2>
          <p className="text-slate-300 mb-1">
            Start here — tailored to your <span className="font-bold text-white">biggest gap: {weakestByGap.name}</span>.
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

          {/* === SECTION 12: DIY REALITY === */}
          <GlassCard className="p-6 border-slate-700/50 bg-slate-900/30">
            <h3 className="text-xl font-heading font-bold text-white mb-2">The Reality of DIY Implementation</h3>
            <p className="text-slate-400 text-sm mb-6">Most businesses intend these fixes but never finish.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <Clock size={20} className="text-cyan-400/60 mx-auto mb-3" />
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-2">Time Investment</p>
                <p className="text-2xl font-mono font-bold text-cyan-400 mb-1">15–30 hrs</p>
                <p className="text-xs text-slate-500">setup &amp; troubleshooting</p>
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
                <p className="text-xs text-slate-500">maintenance &amp; monitoring</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* === SECTION 13: TIER RECOMMENDATION === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">Your Prioritized Opportunities</h2>
              <p className="text-sm text-slate-400">
                Based on your <span className="text-white font-semibold">{weakestByScore.name}</span> score of{" "}
                <span className="font-mono text-cyan-400">{weakestByScore.score}/100</span> and a{" "}
                <span className="font-mono text-cyan-400">${weakestByGap.gap.toLocaleString()}/mo</span> gap in{" "}
                <span className="text-white font-semibold">{weakestByGap.name}</span>, here's where SimpleSequence fits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TierCard
              tier="Blueprint"
              description="Stop the bleed. We install the 24/7 AI Front Door — every inquiry answered in under 60 seconds, every missed call recovered, every channel consolidated into one inbox."
              features={blueprintFeatures}
              isRecommended={result.recommendedTier === 'Blueprint'}
              reason={result.recommendedTier === 'Blueprint' ? result.tierReason : undefined}
            />
            <TierCard
              tier="Growth Architecture"
              description="Turn leads into booked revenue. We install the Invisible Sales Rep + Compounding Engine — automated follow-up, no-show recovery, quote chasing, and 5-star review collection running on autopilot."
              features={growthFeatures}
              isRecommended={result.recommendedTier === 'Growth Architecture'}
              reason={result.recommendedTier === 'Growth Architecture' ? result.tierReason : undefined}
            />
            <TierCard
              tier="Operating System"
              description="Complete operational transformation. The entire Sequential Revenue™ loop — Capture, Convert, Compound — plus AI Search Visibility for ChatGPT, Perplexity, and Google AI Overviews, and the Found-Money DBR Campaign."
              features={operatingFeatures}
              isRecommended={result.recommendedTier === 'Operating System'}
              reason={result.recommendedTier === 'Operating System' ? result.tierReason : undefined}
            />
          </div>
        </motion.div>

        {/* === SECTION 14: FINAL CTA — "FOUND MONEY" GUARANTEE === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <GlassCard className="p-8 md:p-10 border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-900/50 relative overflow-hidden" data-testid="card-bottom-ctas">
            {/* Guarantee badge */}
            <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-xl bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(103,232,249,0.3)]">
              Risk-Reversed Offer
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-bold text-cyan-400/80 uppercase tracking-[0.3em] mb-3">Our Guarantee</p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5 leading-tight">
                The &ldquo;Found Money&rdquo; Guarantee
              </h3>
              <p className="text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
                Within your first 30 days on SimpleSequence, we run a targeted Database Reactivation campaign on your existing contacts. <span className="text-white font-semibold">If we don&rsquo;t uncover enough revenue opportunities to meaningfully offset your setup and first month&rsquo;s fees, we&rsquo;ll run a second full reactivation campaign at no additional service cost.</span>
              </p>
              <p className="text-sm text-slate-400 mb-8 italic">
                You get a system designed to turn past customers into new cash flow &mdash; without increasing your ad spend.
              </p>

              <Link href="/book">
                <GlassButton
                  className="w-full md:w-auto min-w-[340px] bg-cyan-500 hover:bg-cyan-400 text-black text-lg font-bold py-5 px-10 rounded-xl shadow-[0_0_30px_rgba(103,232,249,0.35)]"
                  data-testid="button-book-strategy-call"
                >
                  <Calendar size={20} className="mr-2" />
                  Claim My Revenue Recovery Plan
                  <ArrowRight size={20} className="ml-2" />
                </GlassButton>
              </Link>

              <p className="text-xs text-slate-500 mt-4">
                30-minute Revenue Recovery Audit · No pitch deck · Walk away with a written plan either way
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <button
                  onClick={() => {
                    const storedLeadId = sessionStorage.getItem('leadId');
                    if (storedLeadId) {
                      window.open(`/api/assessment/${storedLeadId}/pdf`, '_blank');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700/50 bg-slate-900/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm font-medium"
                  data-testid="link-download-pdf"
                >
                  <Download size={14} />
                  Download Your Full Analysis (PDF)
                </button>

                {contactEmail && (
                  <p className="text-xs text-slate-500 mt-3">
                    <CheckCircle size={12} className="inline text-cyan-400/60 mr-1" />
                    Results also emailed to {contactEmail}
                  </p>
                )}
              </div>
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
            Back to SimpleSequence.ai
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

function DailyCostCounter({ dailyCost }: { dailyCost: number }) {
  const { value, ref } = useCountUp(dailyCost, 1200);
  return (
    <div ref={ref}>
      <p className="text-sm text-slate-400 mb-1">Every day this gap stays open costs</p>
      <p className="text-4xl font-mono font-bold" style={{ color: "#e07060" }}>
        ${value > 0 ? value.toLocaleString() : dailyCost.toLocaleString()}
      </p>
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
        body: JSON.stringify({ leadId: leadId || undefined, feedback: feedback.trim() }),
      });
      if (!response.ok) throw new Error("Failed to submit feedback");
      setSubmitted(true);
      toast({ title: "Thank you!", description: "Your feedback helps us improve the assessment." });
    } catch {
      toast({ title: "Error", description: "Failed to submit feedback. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-12">
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-12">
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
