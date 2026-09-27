import React, { useState, useEffect, useRef, useId } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Terminal, ArrowRight, ShieldCheck, Cpu, FastForward } from "lucide-react";

interface HeroProps {
  onEnterLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterLab }) => {
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();

  // Magnetic hover coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 18, stiffness: 200, mass: 0.1 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  // Handle magnetic attraction on button mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Immediate skip function
  const handleSkipOrInstantEnter = () => {
    onEnterLab();
  };

  // Trigger boot sequence
  const startBoot = () => {
    if (prefersReducedMotion) {
      onEnterLab();
      return;
    }
    setIsBooting(true);
    setBootStep(1);
  };

  // Boot sequence timer (total < 1.2s)
  useEffect(() => {
    if (!isBooting) return;

    const t1 = setTimeout(() => setBootStep(2), 250);
    const t2 = setTimeout(() => setBootStep(3), 550);
    const t3 = setTimeout(() => setBootStep(4), 850);
    const tEnd = setTimeout(() => {
      onEnterLab();
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [isBooting, onEnterLab]);

  // Global keyboard shortcuts (Esc to skip, Enter to boot)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkipOrInstantEnter();
      } else if (!isBooting && (e.key === "Enter" || e.code === "Space")) {
        // Prevent default scrolling on space if focusing container
        if (e.target === document.body) {
          e.preventDefault();
          startBoot();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBooting]);

  // Understated ambient floating particles (no heavy 3D, zero neon)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle count: 32 particles for optimal performance & subtle aesthetic
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 225, 255, ${p.alpha})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  const bootLogs = [
    "[INIT] System kernel mounting: CHATHURANGA_DEV_CORE v1.0",
    "[DIAGNOSTICS] Verifying Spring Boot, React, and MySQL subsystems... OK",
    "[BLUEPRINTS] Linking University Shuttle & EduPulse modules... OK",
    "[READY] Authorization confirmed. Launching Digital Lab workspace...",
  ];

  return (
    <section 
      className="relative min-h-screen w-full flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none"
      onClick={isBooting ? handleSkipOrInstantEnter : undefined}
      aria-labelledby={titleId}
    >
      {/* Background Animated Subtle Grid */}
      <div 
        className="absolute inset-0 lab-grid-bg lab-radial-mask pointer-events-none opacity-40 animate-grid-fade"
        aria-hidden="true" 
      />

      {/* Floating Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Top Telemetry Header */}
      <header className="w-full max-w-6xl flex justify-between items-center z-10 text-xs font-mono text-text-secondary">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase">SYS_ACTIVE // {siteConfig.buildVersion}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-[11px] tracking-wider text-text-secondary/70">
          <span>LOC: {siteConfig.location}</span>
          <span className="text-border">|</span>
          <span>HOST: CHATHURANGA00</span>
        </div>
      </header>

      {/* Center Landing / Boot Content */}
      <div className="my-auto w-full max-w-4xl flex flex-col items-center text-center z-10 px-4">
        {!isBooting ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-surface/60 backdrop-blur-md mb-8">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-mono tracking-wide text-text-secondary">
                SOFTWARE ARCHITECTURE // FULL STACK LAB
              </span>
            </div>

            {/* Name Typography */}
            <h1 
              id={titleId}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary mb-4 font-sans leading-[1.08]"
            >
              {siteConfig.name}
            </h1>

            {/* Role */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-accent tracking-wide mb-6 font-mono">
              {siteConfig.role}
            </p>

            {/* Tagline Statement */}
            <p className="max-w-2xl text-sm sm:text-base text-text-secondary leading-relaxed mb-10 font-sans">
              {siteConfig.tagline}
            </p>

            {/* Magnetic Button */}
            <motion.div
              style={{ x: buttonX, y: buttonY }}
              className="relative inline-block"
            >
              <button
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={startBoot}
                className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-surface border border-border hover:border-accent/50 text-text-primary font-mono text-sm tracking-widest font-semibold transition-all duration-200 shadow-lg shadow-black/40 hover:shadow-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>ENTER DIGITAL LAB</span>
                <ArrowRight className="w-4 h-4 text-accent transition-transform duration-200 group-hover:translate-x-1" />
                <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </button>
            </motion.div>

            {/* Quick Helper */}
            <span className="mt-4 text-[11px] font-mono text-text-secondary/50">
              Press [Enter ↵] or click to initialize
            </span>
          </motion.div>
        ) : (
          /* System Boot Sequence Modal / Overlay (<1.2s) */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-surface/90 border border-border shadow-2xl backdrop-blur-xl text-left font-mono"
            role="status"
            aria-live="polite"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-border/60">
              <div className="flex items-center space-x-2 text-xs text-accent">
                <Terminal className="w-4 h-4" />
                <span className="tracking-widest font-bold">BOOT SEQUENCE IN PROGRESS</span>
              </div>
              <button
                onClick={handleSkipOrInstantEnter}
                className="inline-flex items-center space-x-1 text-[11px] text-text-secondary hover:text-text-primary px-2 py-0.5 rounded bg-surface-muted border border-border"
              >
                <FastForward className="w-3 h-3" />
                <span>ESC to skip</span>
              </button>
            </div>

            {/* Terminal Logs Animation */}
            <div className="space-y-2 text-xs min-h-[110px]">
              {bootLogs.slice(0, bootStep).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-start space-x-2"
                >
                  <span className="text-accent">&gt;</span>
                  <span className={index === bootStep - 1 ? "text-text-primary font-medium" : "text-text-secondary"}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden border border-border/40">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: "10%" }}
                  animate={{ width: `${bootStep * 25}%` }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-text-secondary/60 mt-2">
                <span>BUFFER: ALLOCATED</span>
                <span>{bootStep * 25}% COMPLETE</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Info & Accessibility Notes */}
      <footer className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 z-10 text-[11px] font-mono text-text-secondary/60">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-accent/80" />
          <span>ZERO RUNTIME CRASH TOLERANCE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>GITHUB: @{siteConfig.githubUsername}</span>
          <span className="text-border">|</span>
          <span>SYSTEM READY</span>
        </div>
      </footer>
    </section>
  );
};

export default Hero;
