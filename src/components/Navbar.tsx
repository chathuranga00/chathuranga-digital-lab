import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "identity", label: "Identity" },
  { id: "universe", label: "Universe" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "lab", label: "Lab" },
  { id: "mindset", label: "Mindset" },
  { id: "journey", label: "Journey" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  onReboot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReboot }) => {
  const [activeSection, setActiveSection] = useState<string>("identity");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Track scroll state for subtle elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to highlight current active section
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio descending
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-25% 0px -40% 0px", // triggers when section is in optimal reading view
      threshold: [0.1, 0.3, 0.6],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open & handle Esc key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating Glassmorphic Header */}
      <header
        className={`fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
        role="banner"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
            scrolled
              ? "bg-surface/85 border-border shadow-2xl shadow-black/50"
              : "bg-surface/65 border-border/80 shadow-lg shadow-black/30"
          }`}
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Brand/System Tag */}
          <button
            onClick={() => {
              if (onReboot) onReboot();
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-text-primary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Chathuranga Digital Lab Home"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">CHATHURANGA</span>
            <span className="text-text-secondary/60">.DEV</span>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`relative z-10 block px-3 py-1.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>

                  {/* Smooth active sliding pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-surface-muted border border-border shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-overlay"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Overlay (<768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/95 flex flex-col justify-between p-6 md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center pb-4 border-b border-border/60">
              <div className="flex items-center space-x-2 font-mono text-xs text-text-primary">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="font-bold tracking-widest">{siteConfig.buildVersion}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border border-border bg-surface hover:bg-surface-muted text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close navigation overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Touch-Friendly Navigation Links */}
            <ul className="flex flex-col space-y-3 my-auto py-6 overflow-y-auto">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`group flex items-center justify-between py-3.5 px-4 rounded-xl border transition-all text-xl font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isActive
                          ? "bg-accent/15 border-accent/40 text-text-primary font-bold shadow-lg shadow-accent/10"
                          : "border-transparent text-text-secondary hover:text-text-primary hover:bg-surface hover:border-border"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="text-xs font-mono text-accent">0{index + 1}</span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowUpRight
                        className={`w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isActive ? "text-accent" : "text-text-secondary/40"
                        }`}
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Mobile Footer Telemetry */}
            <div className="pt-4 border-t border-border/60 text-xs font-mono text-text-secondary/70 flex justify-between items-center">
              <span>HOST: {siteConfig.githubUsername}</span>
              <span className="text-emerald-400">● SYSTEM OPERATIONAL</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
