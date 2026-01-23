import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as SliderPrimitive from "@radix-ui/react-slider"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold tracking-wide ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 uppercase",
          {
            "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "hover:bg-cyan-950/30 hover:text-cyan-400": variant === "ghost",
            "border border-slate-700 bg-transparent hover:border-cyan-500/50 hover:text-cyan-400": variant === "outline",
            "h-9 px-4 py-2": size === "sm",
            "h-12 px-8 py-2": size === "md",
            "h-14 px-10 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassButton.displayName = "GlassButton"

const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl text-card-foreground p-8 md:p-12 transition-all duration-300 w-full bg-[#0d1117] border border-[#1e2830] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
)
GlassCard.displayName = "GlassCard"

const GlassInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-[#2a3038] bg-[#12161a] px-4 py-2 text-base text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6b7280] focus-visible:outline-none focus-visible:border-[#00D9FF]/60 focus-visible:shadow-[0_0_12px_rgba(0,217,255,0.15),inset_0_1px_0_rgba(0,217,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassInput.displayName = "GlassInput"

const GlassLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block text-slate-200",
        className
      )}
      {...props}
    />
  )
)
GlassLabel.displayName = "GlassLabel"

interface GlassSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

const GlassSelect = React.forwardRef<HTMLButtonElement, GlassSelectProps>(
  ({ children, value, onValueChange, placeholder, className }, ref) => {
    return (
      <SelectPrimitive.Root value={value || undefined} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex h-14 w-full items-center justify-between rounded-xl border border-[#2a3038] bg-[#12161a] px-4 py-3 text-base text-white ring-offset-background placeholder:text-[#6b7280] focus:outline-none focus:border-[#00D9FF]/60 focus:shadow-[0_0_12px_rgba(0,217,255,0.15),inset_0_1px_0_rgba(0,217,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#3a4048] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] data-[state=open]:border-[#00D9FF]/60",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-5 w-5 text-[#6b7280]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="relative z-50 max-h-96 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#2a3038] bg-[#0d1117] text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)
GlassSelect.displayName = "GlassSelect"

const GlassSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-3 px-4 text-base outline-none focus:bg-[#00D9FF] focus:text-[#0a0f12] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors cursor-pointer hover:bg-[#00D9FF]/90 hover:text-[#0a0f12] data-[state=checked]:bg-[#00D9FF] data-[state=checked]:text-[#0a0f12]",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
GlassSelectItem.displayName = SelectPrimitive.Item.displayName

interface RadioOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface GlassRadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  columns?: 1 | 2 | 3;
}

const GlassRadioGroup = React.forwardRef<HTMLDivElement, GlassRadioGroupProps>(
  ({ options, value, onChange, className, columns = 1 }, ref) => {
    const gridClass = columns === 3 ? "grid-cols-1 md:grid-cols-3" : 
                      columns === 2 ? "grid-cols-1 md:grid-cols-2" : 
                      "grid-cols-1";
    
    return (
      <div ref={ref} className={cn(`grid ${gridClass} gap-3`, className)}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={cn(
                "relative flex flex-col p-4 rounded-xl border text-left transition-all duration-200 overflow-hidden",
                isSelected 
                  ? "bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(0,217,255,0.1)]" 
                  : "bg-[#12161a] border-[#2a3038] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-[#181d22] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              )}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/[0.08] via-transparent to-transparent pointer-events-none" />
              )}
              <div className="relative flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  isSelected 
                    ? "border-[#00D9FF] bg-[#00D9FF] shadow-[0_0_8px_rgba(0,217,255,0.5)]" 
                    : "border-[#4a5058]"
                )}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#0a0f12]" />}
                </div>
                <span className={cn("font-medium", isSelected ? "text-white" : "text-[#c0c8d0]")}>
                  {option.label}
                </span>
              </div>
              {option.subtitle && (
                <span className="relative text-sm text-[#6b7280] mt-1 ml-8">{option.subtitle}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
GlassRadioGroup.displayName = "GlassRadioGroup";

interface VisualCardOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface VisualCardSelectorProps {
  options: VisualCardOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  columns?: 1 | 2;
}

const VisualCardSelector = React.forwardRef<HTMLDivElement, VisualCardSelectorProps>(
  ({ options, value, onChange, className, columns = 1 }, ref) => {
    const gridClass = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
    
    return (
      <div ref={ref} className={cn(`grid ${gridClass} gap-3`, className)}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={cn(
                "relative flex flex-col p-5 rounded-xl border text-left transition-all duration-200 overflow-hidden",
                isSelected 
                  ? "bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(0,217,255,0.1)]" 
                  : "bg-[#12161a] border-[#2a3038] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-[#181d22] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              )}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/[0.08] via-transparent to-transparent pointer-events-none" />
              )}
              <span className={cn("relative text-lg font-medium", isSelected ? "text-white" : "text-[#c0c8d0]")}>
                {option.label}
              </span>
              {option.subtitle && (
                <span className="relative text-sm text-[#6b7280] mt-1">{option.subtitle}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
VisualCardSelector.displayName = "VisualCardSelector";

const GlassSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-4",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-800 border border-slate-700/50 shadow-inner">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
    </SliderPrimitive.Track>
    {props.value?.[0] !== -1 && (
        <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-cyan-300 bg-slate-950 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 shadow-[0_0_20px_rgba(34,211,238,0.6)] cursor-grab active:cursor-grabbing" />
    )}
  </SliderPrimitive.Root>
))
GlassSlider.displayName = SliderPrimitive.Root.displayName

export { 
  GlassButton, 
  GlassCard, 
  GlassInput, 
  GlassLabel, 
  GlassSelect, 
  GlassSelectItem, 
  GlassSlider, 
  GlassRadioGroup, 
  VisualCardSelector 
}
