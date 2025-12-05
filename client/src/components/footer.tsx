import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/contact-form-dialog";

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
        className="flex items-center justify-between w-full py-4 md:hidden text-left"
        data-testid={`footer-accordion-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="text-sm font-semibold text-white uppercase tracking-wider">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} md:block pb-4 md:pb-0`}>
        <h4 className="hidden md:block text-sm font-semibold text-white uppercase tracking-wider mb-6">{title}</h4>
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
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Brand Column */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" />
                <span className="font-mono font-bold text-lg tracking-tighter text-white">SimpleSequence</span>
              </div>
              <p className="text-primary/80 font-medium text-sm mb-2">
                Practical AI for Service Businesses
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Clarity-first systems. Smarter workflows. Better decisions.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-2">
              <MobileAccordion title="Navigation">
                <ul className="space-y-3">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Solutions", href: "/solutions" },
                    { name: "Industries", href: "/industries" },
                    { name: "Process", href: "/process" },
                    { name: "Offers", href: "/offers" },
                    { name: "About", href: "/about" }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-slate-400 hover:text-primary transition-colors text-sm"
                        data-testid={`footer-link-${link.name.toLowerCase()}`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
            </div>

            {/* Operational AI Playbook Column - Featured */}
            <div className="md:col-span-4 lg:col-span-4">
              <MobileAccordion title="Operational AI Playbook" defaultOpen={true}>
                <div className="p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono text-primary uppercase tracking-wider">Resources</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Straightforward guides to help service businesses reduce friction, improve follow-up, and adopt AI where it actually makes sense.
                    </p>
                    <ul className="space-y-2.5">
                      {[
                        { name: "What Is Operational AI?", href: "/playbook/what-is-operational-ai" },
                        { name: "How to Fix Your Lead Follow-Up Bottlenecks", href: "/playbook/lead-follow-up" },
                        { name: "AI Readiness Checklist", href: "/playbook/ai-readiness" }
                      ].map((link) => (
                        <li key={link.name}>
                          <a 
                            href={link.href}
                            className="text-slate-300 hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                            data-testid={`footer-playbook-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a 
                      href="/playbook"
                      className="inline-flex items-center gap-1.5 text-primary hover:text-cyan-300 text-sm font-medium mt-4 group transition-colors"
                      data-testid="footer-playbook-view-all"
                    >
                      View Full Playbook
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </MobileAccordion>
            </div>

            {/* Get Clarity + Company Column */}
            <div className="md:col-span-2 lg:col-span-3">
              {/* Get Clarity CTA */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get Clarity</h4>
                <ContactFormDialog
                  source="footer-diagnostic"
                  title="Book a Diagnostic"
                  description="Start with a simple, non-technical assessment and get a clear view of where AI can improve your business today."
                  trigger={
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/30 hover:border-primary hover:bg-primary/10 text-primary hover:text-cyan-300 rounded-full px-5 text-sm font-medium transition-all duration-300 group"
                      data-testid="footer-book-diagnostic"
                    >
                      Book a Diagnostic
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  }
                />
                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  Start with a simple, non-technical assessment and get a clear view of where AI can improve your business today.
                </p>
              </div>

              {/* Company Links */}
              <MobileAccordion title="Company">
                <ul className="space-y-3">
                  {[
                    { name: "Contact", href: "/contact" },
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "Terms", href: "/terms" }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-slate-400 hover:text-primary transition-colors text-sm"
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
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © SimpleSequence. Practical AI, thoughtfully applied.
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
