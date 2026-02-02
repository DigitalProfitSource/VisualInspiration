import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { Footer } from "@/components/footer";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden">
      <Header />
      <main role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Process", href: "/process" },
  { name: "Offers", href: "/offers" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
        role="banner"
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between" role="navigation" aria-label="Main navigation">
          <Link href="/" className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2" aria-label="SimpleSequence Home">
            <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" aria-hidden="true" />
            SimpleSequence
          </Link>
          
          <div className="hidden md:flex gap-10 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`hover:text-primary transition-colors duration-300 ${location === link.href ? 'text-primary' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <span className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" />
                    Menu
                  </span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 -mr-2 text-muted-foreground hover:text-white transition-colors"
                    aria-label="Close menu"
                    data-testid="button-mobile-menu-close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 pb-2">
                  <Link
                    href="/assessment"
                    onClick={closeMobileMenu}
                    className="block w-full py-3 px-4 bg-gradient-to-r from-primary to-cyan-400 text-black font-bold text-center rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    data-testid="mobile-nav-assessment"
                  >
                    Get Your AI Clarity Score
                  </Link>
                </div>
                
                <nav className="flex-1 p-6 pt-2" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                          location === '/' 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'text-white hover:bg-white/5 hover:text-primary'
                        }`}
                        data-testid="mobile-nav-home"
                      >
                        Home
                      </Link>
                    </li>
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                            location === link.href 
                              ? 'bg-primary/10 text-primary border border-primary/20' 
                              : 'text-white hover:bg-white/5 hover:text-primary'
                          }`}
                          data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
