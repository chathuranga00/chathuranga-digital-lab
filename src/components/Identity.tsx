import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Terminal, Shield, MapPin, GraduationCap, Code2 } from "lucide-react";
import profileImg from "../assets/profile.png";

export const focusAreas = [
  "Computer Science",
  "Backend Development",
  "AI",
  "Mobile Applications",
  "Web Development",
];

export const Identity: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Subtle scroll-reveal variants
  const containerVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="identity" className="scroll-mt-28 py-10 w-full" aria-label="Identity">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full rounded-2xl border border-border bg-surface/75 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* IDENTITY.EXE Window Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/70 bg-surface-muted/90 font-mono text-xs select-none">
          <div className="flex items-center space-x-3">
            {/* Terminal Window Controls */}
            <div className="flex space-x-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center space-x-2 pl-2 border-l border-border/80 text-text-primary">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold tracking-widest text-[11px] sm:text-xs">IDENTITY.EXE</span>
            </div>
          </div>

          {/* System File Metadata */}
          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-text-secondary/70">
            <span>PERMS: rwxr-xr-x</span>
            <span className="text-border">|</span>
            <span>SIZE: 4.82 KB</span>
            <span className="text-border">|</span>
            <span className="text-emerald-400 font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>AUTHENTICATED</span>
            </span>
          </div>
        </div>

        {/* Window Body: 2-Column Responsive Layout */}
        <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bio & Core Capabilities (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent">
                <span>$ cat /sys/student/bio.md</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-text-primary">
                {siteConfig.name}
              </h2>
              <p className="text-sm sm:text-base font-mono font-medium text-accent">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* Professional Bio Copy */}
            <motion.div variants={itemVariants} className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Passionate about building scalable backend architectures, high-concurrency systems, and practical AI applications that solve real-world problems. I combine rigorous Object-Oriented principles in Java and Spring Boot with responsive modern web development in React and TypeScript.
              </p>
              <p>
                From architecting enterprise campus shuttle systems with cryptographic QR verification and pessimistic database concurrency, to engineering intelligent learning platforms like EduPulse, my focus is on reliability, clean architecture, and zero-runtime-crash design.
              </p>
            </motion.div>

            {/* Focus Areas Chips */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex items-center space-x-2 font-mono text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                <Code2 className="w-3.5 h-3.5 text-accent" />
                <span>CORE FOCUS DOMAINS</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {focusAreas.map((area, idx) => (
                  <span
                    key={area}
                    className="group inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-border bg-surface-muted/60 hover:bg-surface-muted hover:border-accent/50 text-xs font-mono text-text-primary transition-all duration-200 shadow-sm"
                  >
                    <span className="text-[10px] text-accent/80 font-bold">0{idx + 1}</span>
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Telemetry Quick Badges */}
            <motion.div variants={itemVariants} className="pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-text-secondary">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-accent/80 shrink-0" />
                <span>Based in {siteConfig.location}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <GraduationCap className="w-4 h-4 text-accent/80 shrink-0" />
                <span>Computer Science Student @ NSBM Green University</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Tech Portrait Frame (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Corner Crosshairs */}
              <span className="absolute -top-2 -left-2 text-accent/70 font-mono text-xs select-none pointer-events-none" aria-hidden="true">+</span>
              <span className="absolute -top-2 -right-2 text-accent/70 font-mono text-xs select-none pointer-events-none" aria-hidden="true">+</span>
              <span className="absolute -bottom-2 -left-2 text-accent/70 font-mono text-xs select-none pointer-events-none" aria-hidden="true">+</span>
              <span className="absolute -bottom-2 -right-2 text-accent/70 font-mono text-xs select-none pointer-events-none" aria-hidden="true">+</span>

              {/* Portrait Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 bg-surface shadow-2xl group">
                {/* Verified Professional Portrait */}
                <img
                  src={profileImg}
                  alt="Chathuranga Sandaruwan - Professional Portrait"
                  className="w-full h-full object-cover object-[center_15%] grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle Inner Glow / Vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none opacity-80"
                  aria-hidden="true"
                />

                {/* High-Tech Framing Overlay */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-surface/80 border border-border/60 backdrop-blur-md font-mono text-[10px] text-text-secondary flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>PORTRAIT_REF // VERIFIED</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-text-secondary/80 px-2 py-1 rounded-lg bg-surface/70 border border-border/40 backdrop-blur-md">
                  <span>ID: CHATHURANGA-00</span>
                  <span className="text-accent flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>SYS_DEV</span>
                  </span>
                </div>
              </div>

              {/* Photo Identity Tag */}
              <p className="mt-2.5 text-center text-[11px] font-mono text-text-secondary/60">
                SYS_IDENTITY // CHATHURANGA_SANDARUWAN.RAW
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Identity;
