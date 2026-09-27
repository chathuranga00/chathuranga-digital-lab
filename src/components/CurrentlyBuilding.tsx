import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { currentlyBuildingItems, type BuildingStatus } from "../data/currentlyBuilding";
import {
  Activity,
  Radio,
  Cpu,
  Eye,
  Clock,
  Workflow,
  Sparkles,
} from "lucide-react";

interface CurrentlyBuildingProps {
  onOpenProject?: (projectId: string) => void;
}

export const CurrentlyBuilding: React.FC<CurrentlyBuildingProps> = ({ onOpenProject }) => {
  const prefersReducedMotion = useReducedMotion();

  // Status badge style resolver (RESEARCH / DESIGN / DEVELOPMENT / TESTING / DEPLOYMENT)
  const getStatusBadge = (status: BuildingStatus) => {
    switch (status) {
      case "RESEARCH":
        return {
          label: "RESEARCH",
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          dot: "bg-amber-400",
        };
      case "DESIGN":
        return {
          label: "DESIGN",
          bg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
          dot: "bg-purple-400",
        };
      case "DEVELOPMENT":
        return {
          label: "DEVELOPMENT",
          bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
          dot: "bg-cyan-400",
        };
      case "TESTING":
        return {
          label: "TESTING",
          bg: "bg-orange-500/10 border-orange-500/30 text-orange-400",
          dot: "bg-orange-400",
        };
      case "DEPLOYMENT":
        return {
          label: "DEPLOYMENT",
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          dot: "bg-emerald-400",
        };
      default:
        return {
          label: status,
          bg: "bg-surface-muted border-border text-text-secondary",
          dot: "bg-text-secondary",
        };
    }
  };

  return (
    <section
      id="currently-building"
      className="scroll-mt-28 py-10 w-full"
      aria-label="Currently Building Dashboard"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>05 // LIVE PIPELINE DISPATCH</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
              Currently Building
            </h2>
            <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
              Real-time sprint monitor of active engineering initiatives. Focused on concrete architectural milestones, concurrency invariants, and production reliability—no arbitrary percentage meters.
            </p>
          </div>

          {/* Telemetry Status Pill */}
          <div className="shrink-0 p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xl flex items-center space-x-2.5 shadow-lg shadow-emerald-500/5">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="font-mono text-xs">
              <span className="font-bold text-emerald-400 block tracking-wider">
                LIVE DISPATCH ACTIVE
              </span>
              <span className="text-[10px] text-text-secondary">
                {currentlyBuildingItems.length} initiatives in active sprint
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentlyBuildingItems.map((item, index) => {
          const statusStyle = getStatusBadge(item.status);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="group relative rounded-2xl border border-border bg-surface/85 hover:border-accent/50 p-6 sm:p-7 transition-all duration-300 shadow-xl backdrop-blur-xl flex flex-col justify-between hover:shadow-2xl hover:shadow-accent/5"
            >
              {/* Card Top Row: Pipeline Tag & Status Pill */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 select-none">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-text-secondary">
                    <span className="text-accent font-bold">ACTIVE_PIPE_0{index + 1}</span>
                    <span className="text-border">/</span>
                    <span className="uppercase tracking-wider font-semibold">SPRINT_MONITOR</span>
                  </div>

                  {/* Status Pill (RESEARCH / DESIGN / DEVELOPMENT / TESTING / DEPLOYMENT) */}
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${statusStyle.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`} />
                    <span>{statusStyle.label}</span>
                  </span>
                </div>

                {/* Project Name */}
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-text-primary group-hover:text-accent transition-colors mb-1.5">
                  {item.name}
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-mono text-accent mb-4">
                  {item.subtitle}
                </p>

                {/* Focus Area Pill */}
                <div className="mb-4 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface-muted border border-border text-[11px] font-mono text-text-secondary">
                  <Workflow className="w-3.5 h-3.5 text-accent" />
                  <span>{item.focusArea}</span>
                </div>

                {/* Current Milestone Block */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-surface-muted/60 mb-4 font-mono text-xs">
                  <div className="flex items-center space-x-1.5 text-accent font-bold text-[10px] tracking-wider uppercase mb-1.5">
                    <Clock className="w-3 h-3" />
                    <span>CURRENT MILESTONE OBJECTIVE</span>
                  </div>
                  <p className="text-text-primary font-sans leading-relaxed text-xs">
                    {item.currentMilestone}
                  </p>
                </div>

                {/* Architecture Highlight */}
                <div className="mb-5 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-text-secondary">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-text-primary">CORE INVARIANT / TARGET:</span>
                  </div>
                  <p className="text-xs font-sans text-text-secondary leading-relaxed pl-5">
                    {item.architectureHighlight}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tech Stack & Blueprint Action */}
              <div className="pt-4 border-t border-border/60 space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md border border-border/70 bg-surface-muted text-[10px] font-mono text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-text-secondary/70">
                    {item.lastSprintUpdate}
                  </span>

                  {/* X-Ray Link (if project has associated X-ray blueprint) */}
                  {item.projectId && onOpenProject ? (
                    <button
                      type="button"
                      onClick={() => onOpenProject(item.projectId!)}
                      className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-accent hover:text-white transition-colors group-hover:underline"
                      aria-label={`Inspect X-ray blueprint for ${item.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>X-RAY VIEW &rarr;</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-accent/60 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span>LAB EXPERIMENT</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Corner Coordinate Crosshair */}
              <span
                className="absolute top-2 right-2 text-[10px] font-mono text-border group-hover:text-accent/40 select-none pointer-events-none"
                aria-hidden="true"
              >
                +
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;