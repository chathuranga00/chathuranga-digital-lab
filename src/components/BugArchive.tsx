import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { bugs, type BugEntry } from "../data/bugs";
import {
  Bug,
  ChevronDown,
  CheckSquare,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";

export const BugArchive: React.FC = () => {
  // Set first bug expanded by default to demonstrate the view
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    [bugs[0]?.id || "BUG-001"]: true,
  });
  const prefersReducedMotion = useReducedMotion();

  const toggleBug = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = () => {
    const allOpen = Object.values(expandedIds).filter(Boolean).length === bugs.length;
    if (allOpen) {
      setExpandedIds({});
    } else {
      const all: Record<string, boolean> = {};
      bugs.forEach((b) => (all[b.id] = true));
      setExpandedIds(all);
    }
  };

  const isAllOpen = Object.values(expandedIds).filter(Boolean).length === bugs.length;

  return (
    <section id="lab" className="scroll-mt-28 py-10 w-full" aria-label="Bug Archive & Lab">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
            <Bug className="w-4 h-4" />
            <span>05 // LAB &amp; BUG ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
            Engineering Incident Post-Mortems
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
            Deconstructed system failures, concurrency defects, and real debugging post-mortems. Structured as incident reports with investigation checklists and architectural lessons.
          </p>
        </div>

        {/* Global Expand / Collapse Control */}
        <button
          type="button"
          onClick={toggleAll}
          className="self-start sm:self-auto inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface-muted text-xs font-mono text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Activity className="w-3.5 h-3.5 text-accent" />
          <span>{isAllOpen ? "COLLAPSE ALL" : "EXPAND ALL"}</span>
        </button>
      </div>

      {/* Incident Reports List */}
      <div className="space-y-4">
        {bugs.map((bug: BugEntry) => {
          const isExpanded = !!expandedIds[bug.id];
          const formattedId = bug.id.replace("BUG-", "BUG #");

          return (
            <article
              key={bug.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                isExpanded
                  ? "border-accent/40 bg-surface/85 shadow-2xl shadow-black/40"
                  : "border-border bg-surface/65 hover:border-border-hover shadow-lg"
              }`}
            >
              {/* Incident Header (Always Visible & Clickable) */}
              <button
                type="button"
                onClick={() => toggleBug(bug.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
                aria-expanded={isExpanded}
                aria-controls={`incident-details-${bug.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  {/* Monospace Bug Tag + Status Accent */}
                  <div className="flex items-center space-x-2.5 shrink-0">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 tracking-wider">
                      {formattedId}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>RESOLVED</span>
                    </span>
                  </div>

                  {/* Incident Title */}
                  <h3 className="text-base sm:text-lg font-bold font-sans text-text-primary group-hover:text-accent transition-colors truncate">
                    {bug.title}
                  </h3>
                </div>

                {/* Right Metadata & Expand Chevron */}
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="hidden sm:inline text-[11px] font-mono text-text-secondary/70">
                    {bug.investigationSteps.length} STEPS
                  </span>
                  <div
                    className={`p-1.5 rounded-lg border border-border/60 bg-surface-muted text-text-secondary transition-all duration-200 ${
                      isExpanded ? "rotate-180 text-accent border-accent/40" : "group-hover:text-text-primary"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Expandable Incident Details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`incident-details-${bug.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 pt-0 border-t border-border/60 space-y-6 font-mono text-xs">
                      {/* 1. PROBLEM / SYMPTOM (Red / Amber Accent) */}
                      <section className="space-y-2">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-rose-400 tracking-wider uppercase">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>INCIDENT_REPORT // PROBLEM SYMPTOMS</span>
                        </div>
                        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 text-rose-200/90 leading-relaxed font-sans text-xs sm:text-sm">
                          {bug.problem}
                        </div>
                      </section>

                      {/* 2. INVESTIGATION (Checklist Style) */}
                      <section className="space-y-2.5">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-accent tracking-wider uppercase">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>DIAGNOSTIC_PROTOCOL // INVESTIGATION CHECKLIST</span>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-surface-muted/60 space-y-2.5">
                          {bug.investigationSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start space-x-3 text-text-secondary leading-relaxed">
                              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="font-sans text-xs sm:text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* 3. SOLUTION (Green Accent) */}
                      <section className="space-y-2">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PATCH_APPLIED // ARCHITECTURAL SOLUTION</span>
                        </div>
                        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-200/90 leading-relaxed font-sans text-xs sm:text-sm">
                          {bug.solution}
                        </div>
                      </section>

                      {/* 4. LESSON (Engineering Takeaway) */}
                      <section className="space-y-2">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-accent tracking-wider uppercase">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>POST_MORTEM_ANALYSIS // LESSON LEARNED</span>
                        </div>
                        <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 text-text-primary leading-relaxed font-sans text-xs sm:text-sm flex items-start space-x-3">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{bug.lesson}</span>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BugArchive;
