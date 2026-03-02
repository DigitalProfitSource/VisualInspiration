import React, { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";

import { 
  AssessmentSchema, 
  AssessmentData, 
  ContactChannel
} from "@/lib/types";
import { 
  STEPS, 
  REVENUE_PAIN_OPTIONS,
  INDUSTRY_NICHE_MAP,
  TEAM_SIZE_OPTIONS,
  MONTHLY_LEAD_VOLUME_OPTIONS,
  FIRST_CONTACT_SPEED_OPTIONS,
  LEAD_UNAVAILABILITY_OPTIONS,
  PHONE_UNAVAILABLE_HANDLING_OPTIONS,
  DIGITAL_UNAVAILABLE_HANDLING_OPTIONS,
  NO_SHOW_RECOVERY_OPTIONS,
  QUOTE_FOLLOWUP_OPTIONS,
  DORMANT_LEADS_OPTIONS,
  NO_SHOW_RATE_OPTIONS,
  CONTACT_CHANNEL_OPTIONS,
  AI_SEARCH_FREQUENCY_OPTIONS,
  AI_READINESS_OPTIONS,
  INTAKE_CENTRALIZATION_OPTIONS,
  PIPELINE_TRACKING_OPTIONS,
  REVIEW_REQUEST_OPTIONS,
  CLOSE_RATE_OPTIONS,
  MANUAL_HOURS_OPTIONS,
  KNOWLEDGE_BOTTLENECK_OPTIONS,
  OPERATIONAL_COMPLEXITY_OPTIONS
} from "@/lib/constants";
import { calculateResults, AssessmentResult } from "@/lib/scoring";
import { 
  GlassButton, 
  GlassCard, 
  GlassInput, 
  GlassLabel, 
  GlassSelect, 
  GlassSelectItem, 
  GlassSlider, 
  GlassRadioGroup, 
  VisualCardSelector 
} from "@/components/ui/glass-ui";

interface JobValueConfig {
  min: number;
  max: number;
  step: number;
  default: number;
}

function getJobValueConfig(niche: string): JobValueConfig {
  if (!niche) return { min: 100, max: 25000, step: 100, default: 2500 };
  
  const highValueNiches = ["Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Renovation", "Room Additions", "Roofing", "Solar", "Legal", "Family Law", "Personal Injury", "Estate Planning"];
  const lowValueNiches = ["Lawn Care", "Cleaning", "Pest Control", "Oil Change"];
  
  if (highValueNiches.some(n => niche.includes(n))) {
    return { min: 1000, max: 100000, step: 1000, default: 15000 };
  }
  if (lowValueNiches.some(n => niche.includes(n))) {
    return { min: 50, max: 5000, step: 50, default: 200 };
  }
  return { min: 100, max: 25000, step: 100, default: 2500 };
}

export default function Assessment() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<AssessmentData>({
    resolver: zodResolver(AssessmentSchema),
    mode: "onChange",
    defaultValues: {
      revenue_pain: [],
      contact_channels: [],
      disclaimer_accepted: false,
      website_url: ""
    }
  });

  const watchedValues = useWatch({ control });
  const currentStep = STEPS[currentStepIndex];

  const isStep3 = currentStep.id === 'calibration';

  const handlePainToggle = (value: string) => {
    const currentPains = (watchedValues.revenue_pain || []) as { value: string; severity: number }[];
    const existingIndex = currentPains.findIndex(p => p.value === value);
    
    if (existingIndex >= 0) {
      setValue('revenue_pain', currentPains.filter(p => p.value !== value));
    } else if (currentPains.length < 3) {
      setValue('revenue_pain', [...currentPains, { value, severity: 3 }]);
    }
  };

  const handleChannelToggle = (channel: ContactChannel) => {
    const current = watchedValues.contact_channels || [];
    if (current.includes(channel)) {
      setValue('contact_channels', current.filter(c => c !== channel));
    } else {
      setValue('contact_channels', [...current, channel]);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = currentStep.fields as (keyof AssessmentData)[];
    const isValid = await trigger(fieldsToValidate);
    
    if (!isValid) return;

    if (currentStepIndex === STEPS.length - 1) {
      setIsSubmitting(true);
      const data = getValues();
      
      try {
        const result = calculateResults(data);
        
        const response = await fetch('/api/assessment/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentData: data,
            contactFirstName: data.contact_first_name,
            contactLastName: data.contact_last_name,
            contactEmail: data.contact_email,
            contactPhone: data.contact_phone || '',
          }),
        });
        
        const responseData = await response.json();
        
        sessionStorage.setItem('assessmentResult', JSON.stringify(result));
        sessionStorage.setItem('leadId', responseData.leadId || '');
        sessionStorage.setItem('contactEmail', data.contact_email || '');
        
        setLocation('/results');
      } catch (error) {
        console.error('Error submitting assessment:', error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setCurrentStepIndex(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  };

  const renderField = (field: string) => {
    switch (field) {
      case 'revenue_pain':
        return (
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">{(watchedValues.revenue_pain || []).length}/3 selected</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REVENUE_PAIN_OPTIONS.map(option => {
                const isSelected = (watchedValues.revenue_pain || []).some(p => p.value === option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handlePainToggle(option.value)}
                    className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2)]' 
                        : 'bg-[#12161a] border-[#2a3038] hover:bg-[#181d22] hover:border-[#3a4048]'
                    }`}
                    data-testid={`button-pain-${option.value.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className={`font-medium ${isSelected ? 'text-white' : 'text-[#c0c8d0]'}`}>{option.value}</span>
                    <span className="text-sm text-[#6b7280] mt-1">{option.subtitle}</span>
                  </button>
                );
              })}
            </div>
            {errors.revenue_pain && <p className="text-cyan-400 text-xs">{errors.revenue_pain.message}</p>}
          </div>
        );

      case 'business_name':
        return (
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <GlassLabel htmlFor="business_name">Company Name</GlassLabel>
              <GlassInput 
                id="business_name" 
                placeholder="e.g. Acme Services" 
                {...register('business_name')} 
                data-testid="input-business-name"
              />
              {errors.business_name && <p className="text-cyan-400 text-xs">{errors.business_name.message}</p>}
            </div>
            <div className="space-y-2">
              <GlassLabel htmlFor="website_url">Website URL (Optional)</GlassLabel>
              <GlassInput 
                id="website_url" 
                placeholder="e.g. https://acme.com" 
                {...register('website_url')} 
                data-testid="input-website-url"
              />
              {errors.website_url && <p className="text-cyan-400 text-xs">{errors.website_url.message}</p>}
            </div>
          </div>
        );

      case 'industry':
        return (
          <div className="space-y-2 w-full">
            <GlassLabel htmlFor="industry">Industry</GlassLabel>
            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <GlassSelect
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue('niche_specificity', '');
                  }}
                  placeholder="Select your industry"
                >
                  {Object.keys(INDUSTRY_NICHE_MAP).map(industry => (
                    <GlassSelectItem key={industry} value={industry}>{industry}</GlassSelectItem>
                  ))}
                </GlassSelect>
              )}
            />
            {errors.industry && <p className="text-cyan-400 text-xs">{errors.industry.message}</p>}
          </div>
        );

      case 'niche_specificity':
        const niches = watchedValues.industry ? INDUSTRY_NICHE_MAP[watchedValues.industry] || [] : [];
        return (
          <div className="space-y-2 w-full">
            <GlassLabel htmlFor="niche_specificity">Specialization</GlassLabel>
            <Controller
              control={control}
              name="niche_specificity"
              render={({ field }) => (
                <GlassSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder={watchedValues.industry ? "Select your specialization" : "Select industry first"}
                >
                  {niches.map(niche => (
                    <GlassSelectItem key={niche} value={niche}>{niche}</GlassSelectItem>
                  ))}
                </GlassSelect>
              )}
            />
            {errors.niche_specificity && <p className="text-cyan-400 text-xs">{errors.niche_specificity.message}</p>}
          </div>
        );

      case 'team_size':
        return (
          <div className="space-y-3 w-full">
            <GlassLabel htmlFor="team_size">Team Size</GlassLabel>
            <Controller
              control={control}
              name="team_size"
              render={({ field }) => (
                <GlassRadioGroup
                  options={TEAM_SIZE_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={3}
                />
              )}
            />
            {errors.team_size && <p className="text-cyan-400 text-xs">{errors.team_size.message}</p>}
          </div>
        );

      case 'avg_job_value':
        const config = getJobValueConfig(watchedValues.niche_specificity || '');
        return (
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center">
              <GlassLabel htmlFor="avg_job_value">Average Job Value</GlassLabel>
              <span className={`font-mono font-medium ${watchedValues.avg_job_value ? 'text-cyan-400' : 'text-slate-500'}`}>
                {watchedValues.avg_job_value ? `$${parseInt(watchedValues.avg_job_value).toLocaleString()}${parseInt(watchedValues.avg_job_value) >= config.max ? '+' : ''}` : "Select"}
              </span>
            </div>
            <Controller
              control={control}
              name="avg_job_value"
              render={({ field: sliderField }) => {
                const value = sliderField.value ? parseInt(sliderField.value) : config.min;
                return (
                  <GlassSlider
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={[value]}
                    onValueChange={(vals) => sliderField.onChange(vals[0].toString())}
                    className={!sliderField.value ? "opacity-60" : ""}
                  />
                );
              }}
            />
            {errors.avg_job_value && <p className="text-cyan-400 text-xs">{errors.avg_job_value.message}</p>}
          </div>
        );

      case 'monthly_lead_volume':
        return (
          <div className="space-y-3 w-full">
            <GlassLabel htmlFor="monthly_lead_volume">Monthly Lead Volume</GlassLabel>
            <Controller
              control={control}
              name="monthly_lead_volume"
              render={({ field }) => (
                <GlassRadioGroup
                  options={MONTHLY_LEAD_VOLUME_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.monthly_lead_volume && <p className="text-cyan-400 text-xs">{errors.monthly_lead_volume.message}</p>}
          </div>
        );

      case 'first_contact_speed':
        return (
          <div className="space-y-3 w-full">
            <GlassLabel className="text-cyan-400 font-bold">How fast do you typically make first contact with new leads?</GlassLabel>
            <Controller
              control={control}
              name="first_contact_speed"
              render={({ field }) => (
                <GlassRadioGroup
                  options={FIRST_CONTACT_SPEED_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.first_contact_speed && <p className="text-cyan-400 text-xs">{errors.first_contact_speed.message}</p>}
          </div>
        );

      case 'lead_unavailability':
        return (
          <div className="space-y-3 w-full pt-4">
            <GlassLabel className="text-cyan-400 font-bold">How often are leads trying to reach you when no one's available?</GlassLabel>
            <p className="text-xs text-slate-500 mb-2">Think about after-hours, weekends, busy periods, team in the field, etc.</p>
            <Controller
              control={control}
              name="lead_unavailability"
              render={({ field }) => (
                <GlassRadioGroup
                  options={LEAD_UNAVAILABILITY_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.lead_unavailability && <p className="text-cyan-400 text-xs">{errors.lead_unavailability.message}</p>}
          </div>
        );

      case 'phone_unavailable_handling':
        return (
          <div className="space-y-4 w-full">
            <GlassLabel className="text-cyan-400 font-bold">When a phone call comes in and you can't answer, what happens?</GlassLabel>
            <Controller
              control={control}
              name="phone_unavailable_handling"
              render={({ field }) => (
                <VisualCardSelector
                  options={PHONE_UNAVAILABLE_HANDLING_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value, 
                    subtitle: opt.subtitle 
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.phone_unavailable_handling && <p className="text-cyan-400 text-xs">{errors.phone_unavailable_handling.message}</p>}
          </div>
        );

      case 'digital_unavailable_handling':
        return (
          <div className="space-y-4 w-full">
            <GlassLabel className="text-cyan-400 font-bold">When a text, email, or web form comes in and you're busy, what happens?</GlassLabel>
            <Controller
              control={control}
              name="digital_unavailable_handling"
              render={({ field }) => (
                <VisualCardSelector
                  options={DIGITAL_UNAVAILABLE_HANDLING_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value, 
                    subtitle: opt.subtitle 
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.digital_unavailable_handling && <p className="text-cyan-400 text-xs">{errors.digital_unavailable_handling.message}</p>}
          </div>
        );

      case 'no_show_recovery':
        const isAppointmentBased = ['Legal', 'Med Spa / Aesthetics', 'Real Estate', 'Other'].includes(watchedValues.industry || '');
        const label = isAppointmentBased 
          ? "Do you systematically follow up with no-shows to rebook them?"
          : "Do you follow up when customers cancel or aren't home?";
        
        return (
          <div className="space-y-3 w-full">
            <GlassLabel className="text-cyan-400 font-bold">{label}</GlassLabel>
            <Controller
              control={control}
              name="no_show_recovery"
              render={({ field }) => (
                <GlassRadioGroup
                  options={NO_SHOW_RECOVERY_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.no_show_recovery && <p className="text-cyan-400 text-xs">{errors.no_show_recovery.message}</p>}
          </div>
        );

      case 'quote_followup':
        return (
          <div className="space-y-3 w-full">
            <GlassLabel className="text-cyan-400 font-bold">What happens to quotes that don't close immediately?</GlassLabel>
            <Controller
              control={control}
              name="quote_followup"
              render={({ field }) => (
                <GlassRadioGroup
                  options={QUOTE_FOLLOWUP_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.quote_followup && <p className="text-cyan-400 text-xs">{errors.quote_followup.message}</p>}
          </div>
        );

      case 'dormant_leads':
        return (
          <div className="space-y-3 w-full pt-4">
            <GlassLabel className="text-cyan-400 font-bold">Do you have old leads (6+ months dormant) sitting in your database?</GlassLabel>
            <Controller
              control={control}
              name="dormant_leads"
              render={({ field }) => (
                <GlassRadioGroup
                  options={DORMANT_LEADS_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.dormant_leads && <p className="text-cyan-400 text-xs">{errors.dormant_leads.message}</p>}
          </div>
        );

      case 'no_show_rate':
        const rateIsAppointmentBased = ['Legal', 'Med Spa / Aesthetics', 'Real Estate', 'Other'].includes(watchedValues.industry || '');
        const rateLabel = rateIsAppointmentBased
          ? "What's your appointment no-show rate?"
          : "What's your average cancellation rate?";

        return (
          <div className="space-y-3 w-full">
            <GlassLabel className="text-cyan-400 font-bold">{rateLabel}</GlassLabel>
            <Controller
              control={control}
              name="no_show_rate"
              render={({ field }) => (
                <GlassRadioGroup
                  options={NO_SHOW_RATE_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.no_show_rate && <p className="text-cyan-400 text-xs">{errors.no_show_rate.message}</p>}
          </div>
        );

      case 'contact_channels':
        return (
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center">
              <GlassLabel className="text-cyan-400 font-bold">How can leads currently contact you?</GlassLabel>
              <span className="text-sm text-slate-500">{(watchedValues.contact_channels || []).length}/8 selected</span>
            </div>
            <p className="text-xs text-slate-500">Select ALL that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONTACT_CHANNEL_OPTIONS.map(option => {
                const isSelected = (watchedValues.contact_channels || []).includes(option.value as ContactChannel);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChannelToggle(option.value as ContactChannel)}
                    className={`flex flex-col p-3 rounded-lg border text-center transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500' 
                        : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>{option.value}</span>
                    <span className="text-xs text-slate-500 mt-1">{option.subtitle}</span>
                  </button>
                );
              })}
            </div>
            {errors.contact_channels && <p className="text-cyan-400 text-xs">{errors.contact_channels.message}</p>}
          </div>
        );

      case 'ai_search_frequency':
        return (
          <div className="space-y-3 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2">AI SEARCH VISIBILITY</div>
            <GlassLabel className="text-cyan-400 font-bold">How often do AI tools (ChatGPT, Siri, Google AI) recommend or mention your business?</GlassLabel>
            <Controller
              control={control}
              name="ai_search_frequency"
              render={({ field }) => (
                <GlassRadioGroup
                  options={AI_SEARCH_FREQUENCY_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.ai_search_frequency && <p className="text-cyan-400 text-xs">{errors.ai_search_frequency.message}</p>}
          </div>
        );

      case 'ai_readiness':
        return (
          <div className="space-y-3 w-full">
            <GlassLabel className="text-cyan-400 font-bold">Have you taken any steps to make your business visible to AI assistants and AI-powered search?</GlassLabel>
            <Controller
              control={control}
              name="ai_readiness"
              render={({ field }) => (
                <VisualCardSelector
                  options={AI_READINESS_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.ai_readiness && <p className="text-cyan-400 text-xs">{errors.ai_readiness.message}</p>}
          </div>
        );

      case 'intake_centralization':
        return (
          <div className="space-y-4 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">CAPTURE ARCHITECTURE</div>
            <GlassLabel className="text-cyan-400 font-bold">How are new leads currently captured?</GlassLabel>
            <Controller
              control={control}
              name="intake_centralization"
              render={({ field }) => (
                <VisualCardSelector
                  options={INTAKE_CENTRALIZATION_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.intake_centralization && <p className="text-cyan-400 text-xs">{errors.intake_centralization.message}</p>}
          </div>
        );

      case 'pipeline_tracking':
        return (
          <div className="space-y-4 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">CONVERSION PIPELINE</div>
            <GlassLabel className="text-cyan-400 font-bold">Do you track your active pipeline/quotes systematically?</GlassLabel>
            <Controller
              control={control}
              name="pipeline_tracking"
              render={({ field }) => (
                <VisualCardSelector
                  options={PIPELINE_TRACKING_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.pipeline_tracking && <p className="text-cyan-400 text-xs">{errors.pipeline_tracking.message}</p>}
          </div>
        );

      case 'review_request':
        return (
          <div className="space-y-3 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">COMPOUNDING ENGINE</div>
            <GlassLabel className="text-cyan-400 font-bold">Do you systematically ask customers for reviews?</GlassLabel>
            <Controller
              control={control}
              name="review_request"
              render={({ field }) => (
                <GlassRadioGroup
                  options={REVIEW_REQUEST_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.review_request && <p className="text-cyan-400 text-xs">{errors.review_request.message}</p>}
          </div>
        );

      case 'close_rate':
        return (
          <div className="space-y-3 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">CONVERSION PIPELINE</div>
            <GlassLabel className="text-cyan-400 font-bold">Out of every 10 leads, how many become paying customers?</GlassLabel>
            <p className="text-xs text-slate-500 mb-2 text-center md:text-left">This is your close rate - just estimate if you don't track it exactly</p>
            <Controller
              control={control}
              name="close_rate"
              render={({ field }) => (
                <GlassRadioGroup
                  options={CLOSE_RATE_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={3}
                />
              )}
            />
            {errors.close_rate && <p className="text-cyan-400 text-xs">{errors.close_rate.message}</p>}
          </div>
        );

      case 'manual_hours':
        return (
          <div className="space-y-3 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">OPERATIONAL DRAG</div>
            <GlassLabel className="text-cyan-400 font-bold">How many hours per week do you spend on manual coordination?</GlassLabel>
            <Controller
              control={control}
              name="manual_hours"
              render={({ field }) => (
                <GlassRadioGroup
                  options={MANUAL_HOURS_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
            {errors.manual_hours && <p className="text-cyan-400 text-xs">{errors.manual_hours.message}</p>}
          </div>
        );

      case 'knowledge_bottleneck':
        return (
          <div className="space-y-3 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">OPERATIONAL DRAG</div>
            <GlassLabel className="text-cyan-400 font-bold">Do you have repetitive questions that create bottlenecks?</GlassLabel>
            <Controller
              control={control}
              name="knowledge_bottleneck"
              render={({ field }) => (
                <GlassRadioGroup
                  options={KNOWLEDGE_BOTTLENECK_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.knowledge_bottleneck && <p className="text-cyan-400 text-xs">{errors.knowledge_bottleneck.message}</p>}
          </div>
        );

      case 'operational_complexity':
        return (
          <div className="space-y-4 w-full">
            <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 text-center md:text-left">OPERATIONAL DRAG</div>
            <GlassLabel className="text-cyan-400 font-bold">How complex are your operations?</GlassLabel>
            <Controller
              control={control}
              name="operational_complexity"
              render={({ field }) => (
                <VisualCardSelector
                  options={OPERATIONAL_COMPLEXITY_OPTIONS.map(opt => ({ 
                    value: opt.value, 
                    label: opt.value
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  columns={1}
                />
              )}
            />
            {errors.operational_complexity && <p className="text-cyan-400 text-xs">{errors.operational_complexity.message}</p>}
          </div>
        );

      case 'contact_first_name':
        return (
          <div className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <GlassLabel htmlFor="contact_first_name">First Name</GlassLabel>
                <GlassInput 
                  id="contact_first_name" 
                  placeholder="Jane" 
                  {...register('contact_first_name')} 
                  data-testid="input-contact-first-name"
                />
                {errors.contact_first_name && <p className="text-cyan-400 text-xs">{errors.contact_first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <GlassLabel htmlFor="contact_last_name">Last Name</GlassLabel>
                <GlassInput 
                  id="contact_last_name" 
                  placeholder="Doe" 
                  {...register('contact_last_name')} 
                  data-testid="input-contact-last-name"
                />
                {errors.contact_last_name && <p className="text-cyan-400 text-xs">{errors.contact_last_name.message}</p>}
              </div>
            </div>
          </div>
        );

      case 'contact_email':
        return (
          <div className="space-y-2 w-full">
            <GlassLabel htmlFor="contact_email">Email Address</GlassLabel>
            <GlassInput 
              id="contact_email" 
              type="email"
              placeholder="john@example.com" 
              {...register('contact_email')} 
              data-testid="input-contact-email"
            />
            {errors.contact_email && <p className="text-cyan-400 text-xs">{errors.contact_email.message}</p>}
          </div>
        );

      case 'contact_phone':
        return (
          <div className="space-y-2 w-full">
            <GlassLabel htmlFor="contact_phone">Cell Phone Number (Optional)</GlassLabel>
            <GlassInput 
              id="contact_phone" 
              type="tel"
              placeholder="(555) 000-0000" 
              {...register('contact_phone')} 
              data-testid="input-contact-phone"
            />
          </div>
        );

      case 'disclaimer_accepted':
        return (
          <div className="space-y-4 w-full pt-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800">
              <input 
                type="checkbox" 
                id="disclaimer_accepted"
                {...register('disclaimer_accepted')}
                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="disclaimer_accepted" className="text-xs text-slate-400 leading-relaxed cursor-pointer">I understand that these estimates are conservative benchmarks based on industry data. By submitting, I agree to receive my report and related business insights via email.</label>
            </div>
            {errors.disclaimer_accepted && <p className="text-cyan-400 text-xs">{errors.disclaimer_accepted.message}</p>}
          </div>
        );

      default:
        return null;
    }
  };

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

      <main className="relative z-10 pt-32 pb-12 px-4 md:px-8 max-w-2xl mx-auto min-h-[calc(100vh-80px)] flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-cyan-400">
              {currentStep.progress}% Complete
            </span>
            {currentStepIndex < STEPS.length - 1 && (
              <span className="text-sm text-slate-500">
                Step {currentStepIndex + 1} of {STEPS.length - 1}
              </span>
            )}
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${currentStepIndex === STEPS.length - 1 ? 100 : currentStep.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8">
              <div className="mb-8">
                {isStep3 && (
                  <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2">
                    DIAGNOSTIC CALIBRATION
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                  {currentStep.title}
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              <div className="space-y-6">
                {currentStep.fields.map(field => (
                  <div key={field}>{renderField(field)}</div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700/50">
                <GlassButton
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  data-testid="button-back"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </GlassButton>
                <GlassButton
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  data-testid="button-next"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : currentStepIndex === STEPS.length - 1 ? (
                    <>
                      Get Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
