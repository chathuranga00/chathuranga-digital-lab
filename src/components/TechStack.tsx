import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skills, allSkills, type SkillItem, type CategorizedSkills, type SkillCategory } from "../data/skills";
import { projects, type Project } from "../data/projects";
import {
  Cpu,
  Code2,
  Layout,
  Server,
  Database,
  Smartphone,
  Wrench,
  X,
  FolderGit2,
  Layers,
  ArrowRight,
} from "lucide-react";

const categoryIcons: Record<SkillCategory, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  Mobile: Smartphone,
  Tools: Wrench,
};

export const TechStack: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close popover on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedSkill) {
        setSelectedSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSkill]);

  // Find projects that use the selected technology
  const associatedProjects: Project[] = selectedSkill
    ? projects.filter((p) => selectedSkill.projectIds.includes(p.id))
    : [];

  // Find related technologies that share projects or category
  const relatedSkills: SkillItem[] = selectedSkill
    ? allSkills.filter(
        (s) =>
          s.name !== selectedSkill.name &&
          (s.projectIds.some((id) => selectedSkill.projectIds.includes(id)) ||
            s.category === selectedSkill.category)
      ).slice(0, 6)
    : [];

  const categories = Object.keys(skills) as Array<keyof CategorizedSkills>;

  return (
    <section id="skills" className="scroll-mt-28 py-10 w-full" aria-label="Tech Stack Matrix">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4" />
          <span>04 // TECH STACK MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
          Categorized Engineering Tooling
        </h2>
        <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
          Clean categorized competencies linked directly to verified project architectures. Zero percentage bars or arbitrary skill levels. Click any technology to view its associated project deployments.
        </p>
      </div>

      {/* Categorized Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const items = skills[category];
          const Icon = categoryIcons[category] || Cpu;

          return (
            <div
              key={category}
              className="rounded-2xl border border-border bg-surface/75 shadow-xl backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/70 select-none">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-surface-muted border border-border text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
                        {category}
                      </h3>
                      <span className="text-[10px] font-mono text-text-secondary/70">
                        {items.length} MODULES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tech Chips Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {items.map((tech) => {
                    const isSelected = selectedSkill?.name === tech.name;

                    return (
                      <button
                        key={tech.name}
                        type="button"
                        onClick={() => setSelectedSkill(tech)}
                        className={`group relative px-3.5 py-2 rounded-xl border text-xs font-mono font-medium transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          isSelected
                            ? "bg-accent/20 border-accent text-text-primary shadow-lg shadow-accent/15"
                            : "bg-surface-muted/60 border-border/80 text-text-secondary hover:text-text-primary hover:border-accent/50 hover:bg-surface-muted"
                        }`}
                        aria-haspopup="dialog"
                        aria-expanded={isSelected}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{tech.name}</span>
                          {tech.projectIds.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-accent/80 font-bold">
                              {tech.projectIds.length}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Footer Hint */}
              <div className="pt-4 mt-6 border-t border-border/40 text-[10px] font-mono text-text-secondary/60 flex justify-between items-center select-none">
                <span>CATEGORY VERIFIED</span>
                <span className="text-accent/80 flex items-center space-x-1">
                  <span>Click to inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technology Popover Modal / Inspection Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tech-popover-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl border border-accent/40 bg-surface shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popover Header */}
              <div className="flex items-start justify-between pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-accent font-bold uppercase tracking-wider mb-1">
                    <span>{selectedSkill.category}</span>
                    <span>//</span>
                    <span>TECH_INSPECTION</span>
                  </div>
                  <h3 id="tech-popover-title" className="text-2xl font-bold font-sans text-text-primary">
                    {selectedSkill.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="p-1.5 rounded-lg border border-border bg-surface-muted hover:bg-surface text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close tech inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              {selectedSkill.description && (
                <div className="p-3.5 rounded-xl border border-border/80 bg-surface-muted/50 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {selectedSkill.description}
                </div>
              )}

              {/* Associated Projects Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                  <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                  <span>ACTIVE PROJECT IMPLEMENTATIONS</span>
                </div>

                {associatedProjects.length > 0 ? (
                  <div className="space-y-2">
                    {associatedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-xl border border-border/80 bg-surface-muted/40 hover:border-accent/40 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold font-sans text-text-primary">
                            {proj.title}
                          </div>
                          <div className="text-[11px] font-mono text-text-secondary line-clamp-1">
                            {proj.subtitle}
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold border ${
                            proj.status === "ACTIVE"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : proj.status === "DEVELOPMENT"
                              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs font-mono text-text-secondary/70 p-3 rounded-xl border border-dashed border-border text-center">
                    Foundational tool used across all general repositories.
                  </div>
                )}
              </div>

              {/* Related Technologies */}
              {relatedSkills.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-border/60">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-text-secondary uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>CO-UTILIZED / RELATED TECHNOLOGIES</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedSkills.map((rel) => (
                      <button
                        key={rel.name}
                        type="button"
                        onClick={() => setSelectedSkill(rel)}
                        className="px-2.5 py-1 rounded-lg border border-border/80 bg-surface-muted hover:border-accent hover:text-text-primary text-[11px] font-mono text-text-secondary transition-colors"
                      >
                        {rel.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 rounded-xl border border-border bg-surface-muted hover:bg-surface text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechStack;
