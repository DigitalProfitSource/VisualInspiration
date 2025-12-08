import { useState } from "react";
import { ChevronDown } from "lucide-react";

function MobileAccordion({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-white/5 md:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 md:hidden text-left"
        data-testid={`footer-accordion-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="text-xs font-semibold text-white uppercase tracking-wider">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} md:block pb-3 md:pb-0`}>
        <h4 className="hidden md:block text-xs font-semibold text-white uppercase tracking-wider mb-3">{title}</h4>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Brand Column */}
            <div className="md:col-span-5 lg:col-span-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-sm shadow-[0_0_8px_var(--color-primary)]" />
                <span className="font-mono font-bold text-base tracking-tighter text-white">SimpleSequence</span>
              </div>
              <p className="text-primary/80 font-medium text-xs mb-1">
                Practical AI for Service Businesses
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clarity-first systems. Smarter workflows. Better decisions.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 lg:col-span-4">
              <MobileAccordion title="Navigation">
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 md:gap-x-5">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Solutions", href: "/solutions" },
                    { name: "Industries", href: "/industries" },
                    { name: "Process", href: "/process" },
                    { name: "Offers", href: "/offers" },
                    { name: "Blog", href: "/blog" }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-slate-400 hover:text-primary transition-colors text-xs"
                        data-testid={`footer-link-${link.name.toLowerCase()}`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
            </div>

            {/* Company Column */}
            <div className="md:col-span-3 lg:col-span-3">
              <MobileAccordion title="Company">
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 md:gap-x-5">
                  {[
                    { name: "Contact", href: "/contact" },
                    { name: "Privacy", href: "/privacy" },
                    { name: "Terms", href: "/terms" }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-slate-400 hover:text-primary transition-colors text-xs"
                        data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-slate-500 text-xs">
              © SimpleSequence.ai  Practical AI, thoughtfully applied.
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <span className="text-xs text-slate-600 font-mono">Operational AI Advisor™</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
