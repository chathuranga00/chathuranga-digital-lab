import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Target,
  Compass,
  BookOpen,
  Cpu,
  Terminal,
  ShieldCheck,
  Flame,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Workflow,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export interface MindsetStage {
  id: string;
  step: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  focusPrinciples: string[];
}

export const mindsetStages: MindsetStage[] = [
  {
    id: "problem",
    step: "01",
    name: "PROBLEM",
    icon: Target,
    tagline: "Dissecting the root symptom before writing code",
    description:
      "I resist jumping straight into implementation. Instead, I isolate the core bottleneck to discover what invariants are broken, who is affected, and why existing tools fell short.",
    focusPrinciples: ["Root-cause analysis", "Constraint mapping", "Invariant definition"],
  },
  {
    id: "understand",
    step: "02",
    name: "UNDERSTAND",
    icon: Compass,
    tagline: "Tracing end-to-end data flows and failure boundaries",
    description:
      "I trace execution paths from user interaction down to the database and network layers. Gaining deep visibility into edge cases early prevents having to refactor flawed assumptions downstream.",
    focusPrinciples: ["Data-flow modeling", "Failure domain boundaries", "User perspective auditing"],
  },
  {
    id: "research",
    step: "03",
    name: "RESEARCH",
    icon: BookOpen,
    tagline: "Learning from battle-tested industry architectures and RFCs",
    description:
      "I consult primary documentation, RFC specifications, and published post-mortems of how high-scale distributed teams solved similar challenges. I value proven architectural patterns over hype-driven new dependencies.",
    focusPrinciples: ["RFC standards review", "Post-mortem analysis", "Operational drag minimization"],
  },
  {
    id: "design",
    step: "04",
    name: "DESIGN",
    icon: Cpu,
    tagline: "Modeling schemas, state transitions, and concurrency guarantees",
    description:
      "I sketch state machine transitions, concurrency locks, and schema relationships before writing code. When interfaces and error states are clearly contracted, the implementation itself becomes deterministic.",
    focusPrinciples: ["State machine design", "Concurrency safety", "Interface contract drafting"],
  },
  {
    id: "build",
    step: "05",
    name: "BUILD",
    icon: Terminal,
    tagline: "Writing modular, strongly-typed code in small commits",
    description:
      "I develop in cohesive, testable increments with strict type safety and linting. I prioritize clean, self-documenting code over clever abstractions that become liabilities for the team later.",
    focusPrinciples: ["Strict TypeScript typing", "Modular single-responsibility", "Atomic commit hygiene"],
  },
  {
    id: "test",
    step: "06",
    name: "TEST",
    icon: ShieldCheck,
    tagline: "Stress-testing edge cases and race conditions",
    description:
      "I don't just verify the happy path; I actively simulate dropped network packets, duplicate requests, and race conditions. If an invariant isn't verified by an automated test, it is merely wishful thinking.",
    focusPrinciples: ["Pessimistic concurrency testing", "Payload boundary validation", "Automated regression tests"],
  },
  {
    id: "debug",
    step: "07",
    name: "DEBUG",
    icon: Flame,
    tagline: "Systematic hypothesis testing using telemetry",
    description:
      "When unexpected failures occur, I formulate hypotheses and test them against structured telemetry logs and stack traces. I never guess or blindly apply trial-and-error patches to production code.",
    focusPrinciples: ["Hypothesis-driven debugging", "Structured log auditing", "Root-cause reproduction"],
  },
  {
    id: "improve",
    step: "08",
    name: "IMPROVE",
    icon: Sparkles,
    tagline: "Profiling performance and archiving incident learnings",
    description:
      "Once functional, I profile memory allocations, query plans, and bundle overhead to eliminate waste. I document the findings in our incident logs so the same mistake is never repeated by myself or others.",
    focusPrinciples: ["Query plan optimization", "Memory leak profiling", "Incident post-mortems"],
  },
];

export const EngineeringMindset: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeStage = mindsetStages[activeStageIndex];
  const IconComponent = activeStage.icon;

  // Keyboard navigation across stages with ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        setActiveStageIndex((prev) => (prev + 1) % mindsetStages.length);
      } else if (e.key === "ArrowLeft") {
        setActiveStageIndex((prev) => (prev - 1 + mindsetStages.length) % mindsetStages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    setActiveStageIndex((prev) => (prev + 1) % mindsetStages.length);
  };

  const handlePrev = () => {
    setActiveStageIndex((prev) => (prev - 1 + mindsetStages.length) % mindsetStages.length);
  };

  return (
    <section
      id="mindset"
      className="scroll-mt-28 py-10 w-full"
      aria-label="Engineering Mindset & Methodology"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <Workflow className="w-4 h-4" />
          <span>04 // ENGINEERING MINDSET</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
          Systematic Engineering Lifecycle
        </h2>
        <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
          An 8-stage methodology refined through debugging distributed concurrency, optimizing query latency, and building resilient production software. Click any node to inspect my approach.
        </p>
      </div>

      {/* 1. Desktop Horizontal Process Flow (md and up) */}
      <div className="hidden md:block mb-8">
        <div className="relative p-3 rounded-2xl border border-border bg-surface/75 backdrop-blur-xl shadow-xl">
          {/* Horizontal connecting track line */}
          <div
            className="absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2 bg-border/80 z-0"
            aria-hidden="true"
          />

          {/* Stepper nodes flex container */}
          <div className="relative z-10 flex items-center justify-between gap-1">
            {mindsetStages.map((stage, index) => {
              const isSelected = activeStageIndex === index;
              const isPast = activeStageIndex > index;
              const StageIcon = stage.icon;

              return (
                <React.Fragment key={stage.id}>
                  {/* Clickable Node Pill */}
                  <button
                    type="button"
                    onClick={() => setActiveStageIndex(index)}
                    className={`group relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isSelected
                        ? "bg-accent/15 border-accent text-white shadow-lg shadow-accent/20 scale-105"
                        : isPast
                        ? "bg-surface-muted/90 border-accent/40 text-text-primary hover:border-accent/80 hover:bg-surface-muted"
                        : "bg-surface border-border text-text-secondary hover:border-accent/40 hover:text-text-primary"
                    }`}
                    aria-label={`Select stage ${stage.step}: ${stage.name}`}
                    aria-pressed={isSelected}
                  >
                    {/* Node Icon & Step */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                        isSelected
                          ? "bg-accent text-white shadow-md shadow-accent/30"
                          : isPast
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-surface-muted text-text-secondary group-hover:text-text-primary"
                      }`}
                    >
                      <StageIcon className="w-4 h-4" />
                    </div>

                    {/* Step label */}
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary/70">
                      STEP {stage.step}
                    </span>

                    {/* Name */}
                    <span
                      className={`font-mono text-[11px] font-bold tracking-wider ${
                        isSelected
                          ? "text-accent"
                          : isPast
                          ? "text-text-primary"
                          : "text-text-secondary group-hover:text-text-primary"
                      }`}
                    >
                      {stage.name}
                    </span>

                    {/* Active indicator dot */}
                    {isSelected && (
                      <motion.span
                        layoutId="active-mindset-indicator"
                        className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-accent ring-4 ring-accent/30"
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      />
                    )}
                  </button>

                  {/* Connecting Arrow between nodes */}
                  {index < mindsetStages.length - 1 && (
                    <div
                      className="shrink-0 px-0.5 text-text-secondary/40 select-none z-10"
                      aria-hidden="true"
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-colors ${
                          index < activeStageIndex ? "text-accent" : "text-border"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Mobile Vertical Process Stepper (< md) */}
      <div className="md:hidden space-y-3 mb-8">
        <div className="relative pl-6 space-y-2 border-l-2 border-border/80 ml-3">
          {mindsetStages.map((stage, index) => {
            const isSelected = activeStageIndex === index;
            const StageIcon = stage.icon;

            return (
              <div key={stage.id} className="relative">
                {/* Vertical track bead */}
                <div
                  className={`absolute -left-[31px] top-3.5 w-3 h-3 rounded-full border-2 transition-colors ${
                    isSelected
                      ? "bg-accent border-white ring-4 ring-accent/20"
                      : "bg-surface border-border"
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => setActiveStageIndex(index)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-accent/15 border-accent text-white shadow-md shadow-accent/10"
                      : "bg-surface/80 border-border text-text-secondary hover:border-accent/40"
                  }`}
                  aria-expanded={isSelected}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center ${
                          isSelected
                            ? "bg-accent text-white"
                            : "bg-surface-muted text-text-secondary"
                        }`}
                      >
                        <StageIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-text-secondary/70">
                          STAGE {stage.step}
                        </div>
                        <div
                          className={`font-mono text-xs font-bold ${
                            isSelected ? "text-accent" : "text-text-primary"
                          }`}
                        >
                          {stage.name}
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected ? "rotate-180 text-accent" : "text-text-secondary/60"
                      }`}
                    />
                  </div>

                  {/* Inline collapse description on mobile */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-accent/20 font-sans text-xs text-text-secondary leading-relaxed"
                    >
                      <p className="italic text-text-primary mb-2 font-serif text-sm">
                        &ldquo;{stage.description}&rdquo;
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {stage.focusPrinciples.map((principle) => (
                          <span
                            key={principle}
                            className="px-2 py-0.5 rounded bg-accent/20 border border-accent/30 text-[10px] font-mono text-accent"
                          >
                            {principle}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Inspection Card (Visible on desktop & mobile) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="rounded-2xl border border-border bg-surface/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          {/* Subtle corner watermark */}
          <div
            className="absolute top-2 right-4 text-7xl sm:text-8xl font-black font-mono text-white/[0.02] select-none pointer-events-none"
            aria-hidden="true"
          >
            {activeStage.step}
          </div>

          {/* Card Top Row: Step Tag & Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                  STAGE {activeStage.step} // LIFECYCLE
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-text-primary">
                  {activeStage.name}
                </h3>
              </div>
            </div>

            {/* Stepper Navigation buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl border border-border bg-surface-muted hover:border-accent/50 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous stage"
                title="Previous stage (Arrow Left)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl border border-border bg-surface-muted hover:border-accent/50 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next stage"
                title="Next stage (Arrow Right)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stage Tagline */}
          <p className="text-xs sm:text-sm font-mono text-accent mb-4">
            {activeStage.tagline}
          </p>

          {/* First-person approach description (in stylized quote block) */}
          <div className="relative pl-5 border-l-2 border-accent/70 my-5 py-1">
            <p className="text-sm sm:text-base text-text-primary font-sans leading-relaxed">
              &ldquo;{activeStage.description}&rdquo;
            </p>
          </div>

          {/* Focus Principles */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-text-secondary">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>CORE FOCUS PRINCIPLES:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeStage.focusPrinciples.map((principle) => (
                <span
                  key={principle}
                  className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-[11px] font-mono text-text-primary"
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default EngineeringMindset;