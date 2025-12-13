import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Footer } from "@/components/footer";

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

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
      role="banner"
    >
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <a href="/" className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2" aria-label="SimpleSequence Home">
          <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]" aria-hidden="true" />
          SimpleSequence
        </a>
        <div className="hidden md:flex gap-10 text-sm font-medium text-muted-foreground">
          <a href="/solutions" className="hover:text-primary transition-colors duration-300">Solutions</a>
          <a href="/industries" className="hover:text-primary transition-colors duration-300">Industries</a>
          <a href="/process" className="hover:text-primary transition-colors duration-300">Process</a>
          <a href="/offers" className="hover:text-primary transition-colors duration-300">Offers</a>
        </div>
      </nav>
    </motion.header>
  );
}
