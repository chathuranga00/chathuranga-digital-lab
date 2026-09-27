import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { journey, type CommitType } from "../data/journey";
import {
  GitCommit,
  GitBranch,
  Tag,
  Calendar,
  Copy,
  Check,
  CornerDownRight,
  Filter,
  Terminal,
} from "lucide-react";

export const Journey: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");
  const [selectedType, setSelectedType] = useState<CommitType | "ALL">("ALL");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Copy commit hash handler
  const handleCopyHash = (hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 1800);
    }
  };

  // Commit type color & icon resolver
  const getCommitTypeBadge = (type: CommitType) => {
    switch (type) {
      case "milestone":
        return {
          label: "milestone",
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          dot: "bg-amber-400",
        };
      case "feat":
        return {
          label: "feature",
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          dot: "bg-emerald-400",
        };
      case "build":
        return {
          label: "build",
          bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
          dot: "bg-cyan-400",
        };
      case "refactor":
        return {
          label: "refactor",
          bg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
          dot: "bg-indigo-400",
        };
      case "fix":
        return {
          label: "fix",
          bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
          dot: "bg-rose-400",
        };
      default:
        return {
          label: type,
          bg: "bg-surface-muted border-border text-text-secondary",
          dot: "bg-text-secondary",
        };
    }
  };

  // Year theme subtitles
  const getYearTheme = (year: number) => {
    switch (year) {
      case 2024:
        return "Core Foundations // Java, Data Structures, OOP, ACID Transactions";
      case 2025:
        return "Distributed Architecture // Spring Boot 3, Concurrency, HMAC Security, AI Integration";
      case 2026:
        return "Production Systems // Microservices, Dynamic Scheduling, Lab Platform";
      default:
        return "Engineering Milestones";
    }
  };

  // Filter groups
  const filteredJourney = journey
    .filter((group) => selectedYear === "ALL" || group.year === selectedYear)
    .map((group) => ({
      ...group,
      entries: group.entries.filter(
        (entry) => selectedType === "ALL" || entry.type === selectedType
      ),
    }))
    .filter((group) => group.entries.length > 0);

  const totalCommitsCount = journey.reduce((acc, curr) => acc + curr.entries.length, 0);

  return (
    <section
      id="journey"
      className="scroll-mt-28 py-10 w-full"
      aria-label="Engineering Journey Timeline"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <GitBranch className="w-4 h-4" />
          <span>06 // ENGINEERING TIMELINE</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
              Git Commit History
            </h2>
            <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
              Chronological evolution from computer science fundamentals to production distributed architectures. Styled like an active Git commit log.
            </p>
          </div>

          {/* Git Terminal Command Tag */}
          <div className="shrink-0 p-2.5 rounded-xl border border-border bg-surface/80 font-mono text-xs text-text-secondary flex items-center space-x-2 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent font-bold">git log</span>
            <span className="text-text-secondary/60">--graph --oneline</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-muted text-[10px] text-text-primary">
              {totalCommitsCount} commits
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-10 p-4 rounded-2xl border border-border bg-surface/60 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Year Filter Pills */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <span className="text-text-secondary/70 flex items-center space-x-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-accent" />
            <span>EPOCH:</span>
          </span>
          {(["ALL", 2024, 2025, 2026] as const).map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedYear === year
                  ? "bg-accent text-white border-accent font-bold shadow-md shadow-accent/20"
                  : "bg-surface-muted border-border text-text-secondary hover:text-text-primary hover:border-accent/40"
              }`}
            >
              {year === "ALL" ? "ALL YEARS" : `YEAR ${year}`}
            </button>
          ))}
        </div>

        {/* Commit Type Filter */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-2">
          <span className="text-text-secondary/70 mr-1">TYPE:</span>
          {(["ALL", "milestone", "feat", "build", "refactor"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-md border text-[11px] capitalize transition-all ${
                selectedType === type
                  ? "bg-surface text-accent border-accent font-bold"
                  : "bg-surface/40 border-border/70 text-text-secondary hover:text-text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Git Timeline Container */}
      <div className="relative pl-6 sm:pl-10">
        {/* Continuous Git Branch Spine Line */}
        <div
          className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-0.5 bg-gradient-to-b from-accent via-indigo-500/70 to-emerald-500/50 z-0"
          aria-hidden="true"
        />

        <div className="space-y-12 relative z-10">
          {filteredJourney.map((group) => (
            <div key={group.year} className="space-y-6">
              {/* Year Group Header (Anchored to Branch Line) */}
              <div className="relative flex items-center space-x-3 -ml-6 sm:-ml-10">
                {/* Year Branch Junction Node */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-surface border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/30 text-accent shrink-0 z-10 ml-0.5">
                  <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>

                {/* Year Pill & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 bg-surface/90 border border-border/80 px-4 py-2 rounded-xl backdrop-blur-xl shadow-md">
                  <span className="font-mono text-xs font-bold text-accent tracking-wider uppercase flex items-center space-x-1.5">
                    <span>RELEASE EPOCH // {group.year}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                  <span className="hidden sm:inline text-border">|</span>
                  <span className="font-mono text-[11px] text-text-secondary">
                    {getYearTheme(group.year)}
                  </span>
                </div>
              </div>

              {/* Commit Entries for this Year */}
              <div className="space-y-5 pl-2 sm:pl-4">
                {group.entries.map((entry, entryIndex) => {
                  const typeBadge = getCommitTypeBadge(entry.type);

                  return (
                    <motion.article
                      key={entry.hash}
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        delay: prefersReducedMotion ? 0 : entryIndex * 0.08,
                      }}
                      className="group relative rounded-2xl border border-border bg-surface/80 hover:border-accent/50 p-5 sm:p-6 transition-all duration-300 shadow-lg backdrop-blur-xl hover:shadow-2xl hover:shadow-accent/5"
                    >
                      {/* Branch Dot on the timeline spine */}
                      <div
                        className="absolute -left-[27px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-surface border-2 border-border group-hover:border-accent group-hover:scale-125 transition-all shadow-sm flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${typeBadge.dot} group-hover:animate-ping`}
                        />
                      </div>

                      {/* Header Line: Commit Hash, Type, Date, Copy Affordance */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 text-xs font-mono">
                        <div className="flex items-center space-x-2">
                          {/* Commit Hash Button */}
                          <button
                            type="button"
                            onClick={(e) => handleCopyHash(entry.hash, e)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-surface-muted border border-border hover:border-accent text-accent font-bold transition-colors"
                            title="Click to copy commit hash"
                            aria-label={`Copy commit hash ${entry.hash}`}
                          >
                            <GitCommit className="w-3.5 h-3.5" />
                            <span>{entry.hash}</span>
                            {copiedHash === entry.hash ? (
                              <Check className="w-3 h-3 text-emerald-400 ml-1" />
                            ) : (
                              <Copy className="w-3 h-3 text-text-secondary/70 ml-1 group-hover:text-accent" />
                            )}
                          </button>

                          {/* Commit Type Badge */}
                          <span
                            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${typeBadge.bg}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${typeBadge.dot}`} />
                            <span>{typeBadge.label}</span>
                          </span>
                        </div>

                        {/* Date Stamp */}
                        <div className="flex items-center space-x-1.5 text-text-secondary text-[11px]">
                          <Calendar className="w-3 h-3 text-text-secondary/60" />
                          <span>{entry.date}</span>
                        </div>
                      </div>

                      {/* Arrow-Prefixed Commit Message */}
                      <h3 className="text-sm sm:text-base font-bold font-mono text-text-primary group-hover:text-accent transition-colors mb-2.5 flex items-start space-x-2">
                        <span className="text-accent shrink-0 select-none">&rarr;</span>
                        <span className="leading-snug">{entry.message}</span>
                      </h3>

                      {/* Commit Detail / Architecture Notes */}
                      <div className="mt-2 pt-2.5 border-t border-border/60 flex items-start space-x-2 text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                        <CornerDownRight className="w-4 h-4 text-accent/70 shrink-0 mt-0.5 select-none" />
                        <p>{entry.detail}</p>
                      </div>

                      {/* Copied Feedback Toast */}
                      {copiedHash === entry.hash && (
                        <span className="absolute top-3 right-3 font-mono text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md animate-fade-in">
                          HASH COPIED // {entry.hash}
                        </span>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;