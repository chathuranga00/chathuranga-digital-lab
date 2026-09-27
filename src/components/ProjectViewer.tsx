import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Project } from "../data/projects";
import {
  X,
  Github,
  ExternalLink,
  Shield,
  Layers,
  AlertCircle,
  Lightbulb,
  Cpu,
  Wrench,
  CheckCircle2,
  BookOpen,
  Image as ImageIcon,
  ArrowRight,
  Database,
  Smartphone,
  Lock,
} from "lucide-react";

interface ProjectViewerProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close on Escape key & trap focus
  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button initially
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Trap focus
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Render project-specific lightweight architecture flow diagram (SVG/Flow layout)
  const renderArchitectureDiagram = (id: string) => {
    if (id === "university-shuttle-system") {
      return (
        <div className="w-full p-6 rounded-xl border border-border/80 bg-surface-muted/60 font-mono text-xs">
          <div className="text-[11px] text-text-secondary/70 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>CONCURRENCY ARCHITECTURE // PESSIMISTIC LOCK TRANSACTION PIPELINE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Smartphone className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Student / Driver App</div>
              <div className="text-[10px] text-text-secondary mt-1">HMAC-SHA256 Signed QR Card</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center text-center shadow-lg">
              <Lock className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Spring Boot 3 API</div>
              <div className="text-[10px] text-text-secondary mt-1">Rate Limiter + Concurrency Guard</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Database className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">MySQL 8.0 InnoDB</div>
              <div className="text-[10px] text-text-secondary mt-1">PESSIMISTIC_WRITE Row Lock</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 text-[11px] text-text-secondary flex justify-between items-center">
            <span>Transaction Isolation: SERIALIZABLE ROW-LOCK</span>
            <span className="text-emerald-400 font-semibold">DOUBLE-BOARDING ELIMINATED</span>
          </div>
        </div>
      );
    }

    if (id === "edupulse") {
      return (
        <div className="w-full p-6 rounded-xl border border-border/80 bg-surface-muted/60 font-mono text-xs">
          <div className="text-[11px] text-text-secondary/70 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>ADAPTIVE LEARNING &amp; INFERENCE WORKFLOW</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Layers className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Study Material</div>
              <div className="text-[10px] text-text-secondary mt-1">Multi-page PDF / Syllabi</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center text-center shadow-lg">
              <Cpu className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Extraction Worker</div>
              <div className="text-[10px] text-text-secondary mt-1">Client chunking &amp; sanitization</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="font-bold text-text-primary text-xs">Adaptive Output</div>
              <div className="text-[10px] text-text-secondary mt-1">Structured JSON Quizzes &amp; Curves</div>
            </div>
          </div>
        </div>
      );
    }

        if (id === "fitness-sharks") {
      return (
        <div className="w-full p-6 rounded-xl border border-border/80 bg-surface-muted/60 font-mono text-xs">
          <div className="text-[11px] text-text-secondary/70 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>FULL-STACK GYM ECOSYSTEM ARCHITECTURE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Smartphone className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Dual React 18 UI</div>
              <div className="text-[10px] text-text-secondary mt-1">Admin Console &amp; Member Portal</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center text-center shadow-lg">
              <Shield className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Spring Boot 3.5.6 API</div>
              <div className="text-[10px] text-text-secondary mt-1">BCrypt Auth + Membership Engine</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Database className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">MySQL 8.0 InnoDB</div>
              <div className="text-[10px] text-text-secondary mt-1">ACID Membership Ledger</div>
            </div>
          </div>
        </div>
      );
    }

    if (id === "cricket-score-tracker") {
      return (
        <div className="w-full p-6 rounded-xl border border-border/80 bg-surface-muted/60 font-mono text-xs">
          <div className="text-[11px] text-text-secondary/70 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>REACTIVE EVENT STREAM ARCHITECTURE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Smartphone className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Flutter Mobile Client</div>
              <div className="text-[10px] text-text-secondary mt-1">Real-time Ball-by-Ball UI</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center text-center shadow-lg">
              <Layers className="w-5 h-5 text-accent mb-2" />
              <div className="font-bold text-text-primary text-xs">Dart Event Stream</div>
              <div className="text-[10px] text-text-secondary mt-1">Match State &amp; Over Reducer</div>
            </div>

            <div className="hidden md:flex justify-center text-accent">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
              <Cpu className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="font-bold text-text-primary text-xs">C++ Native Engine</div>
              <div className="text-[10px] text-text-secondary mt-1">Compiled Scoring Validation</div>
            </div>
          </div>
        </div>
      );
    }

    // Default flow diagram for system architecture
    return (
      <div className="w-full p-6 rounded-xl border border-border/80 bg-surface-muted/60 font-mono text-xs">
        <div className="text-[11px] text-text-secondary/70 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>SYSTEM PIPELINE WORKFLOW</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
            <Smartphone className="w-5 h-5 text-accent mb-2" />
            <div className="font-bold text-text-primary text-xs">Client Interface</div>
            <div className="text-[10px] text-text-secondary mt-1">React SPA / RBAC Dashboard</div>
          </div>

          <div className="hidden md:flex justify-center text-accent">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center text-center shadow-lg">
            <Shield className="w-5 h-5 text-accent mb-2" />
            <div className="font-bold text-text-primary text-xs">Service Engine</div>
            <div className="text-[10px] text-text-secondary mt-1">Spring Boot Stateful Pipeline</div>
          </div>

          <div className="hidden md:flex justify-center text-accent">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center text-center">
            <Database className="w-5 h-5 text-accent mb-2" />
            <div className="font-bold text-text-primary text-xs">Data Persistence</div>
            <div className="text-[10px] text-text-secondary mt-1">MySQL Normalized Ledger</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/90 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="xray-viewer-title"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/80 bg-surface-muted/90 select-none">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary block">
                  X-RAY ARCHITECTURAL SPECIFICATION
                </span>
                <h2 id="xray-viewer-title" className="text-xl sm:text-2xl font-bold font-sans text-text-primary">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-muted text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close project viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
            {/* Project Subtitle & Description */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold text-accent font-mono">{project.subtitle}</p>
                {project.badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 border border-amber-500/40 text-amber-300">
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{project.description}</p>
            </div>

            {/* 1. PROBLEM */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>01 // THE PROBLEM</span>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.problem}
              </div>
            </section>

            {/* 2. IDEA */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>02 // THE ARCHITECTURAL IDEA</span>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.idea}
              </div>
            </section>

            {/* 3. ARCHITECTURE (Interactive Flow Diagram) */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>03 // SYSTEM ARCHITECTURE &amp; TOPOLOGY</span>
              </div>
              {renderArchitectureDiagram(project.id)}
              <p className="text-xs text-text-secondary leading-relaxed font-mono bg-surface-muted/40 p-4 rounded-xl border border-border/60">
                {project.architectureNotes}
              </p>
            </section>

            {/* 4. TECHNOLOGY */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>04 // TECHNOLOGY STACK</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl border border-border bg-surface-muted font-mono text-xs font-medium text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 5. DEVELOPMENT */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                <span>05 // DEVELOPMENT LOGS &amp; PIPELINES</span>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-border bg-surface-muted/40 text-xs sm:text-sm text-text-secondary leading-relaxed font-mono">
                {project.developmentNotes}
              </div>
            </section>

            {/* 6. CHALLENGES */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>06 // ENGINEERING CHALLENGES</span>
              </div>
              <ul className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl border border-border/80 bg-surface-muted/30 text-xs sm:text-sm text-text-secondary flex items-start space-x-3"
                  >
                    <span className="text-xs font-mono text-orange-400 font-bold shrink-0 mt-0.5">[{idx + 1}]</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. SOLUTIONS */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>07 // APPLIED ENGINEERING SOLUTIONS</span>
              </div>
              <ul className="space-y-2">
                {project.solutions.map((solution, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs sm:text-sm text-text-secondary flex items-start space-x-3"
                  >
                    <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 mt-0.5">[{idx + 1}]</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. RESULT (Screenshot gallery placeholder if empty) */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <ImageIcon className="w-4 h-4" />
                <span>08 // RESULTS &amp; ARTIFACTS</span>
              </div>

              {project.screenshots && project.screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((shot, idx) => (
                    <img
                      key={idx}
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="rounded-xl border border-border object-cover w-full h-48"
                    />
                  ))}
                </div>
              ) : (
                /* Screenshot Gallery Placeholder */
                <div className="w-full p-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/30 flex flex-col items-center justify-center text-center font-mono">
                  <div className="p-3 rounded-full bg-surface border border-border text-accent mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-text-primary mb-1">
                    GALLERY ARCHIVE PLACEHOLDER
                  </div>
                  <p className="text-[11px] text-text-secondary/70 max-w-sm">
                    No static screenshots uploaded yet. Screenshots will render automatically when populated in <code className="text-accent">projects.ts</code>.
                  </p>
                </div>
              )}
            </section>

            {/* 9. LESSONS */}
            <section className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>09 // ARCHITECTURAL LESSONS LEARNED</span>
              </div>
              <ul className="space-y-2">
                {project.lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl border border-accent/20 bg-accent/5 text-xs sm:text-sm text-text-secondary flex items-start space-x-3"
                  >
                    <span className="text-xs font-mono text-accent font-bold shrink-0 mt-0.5">&gt;</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Modal Footer with Actions (SHOW VIEW GITHUB / LIVE DEMO ONLY WHEN NON-NULL) */}
          <div className="p-4 sm:p-6 border-t border-border/80 bg-surface-muted/90 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-text-secondary/70">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>STATUS: {project.status}</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-accent text-text-primary font-mono text-xs font-semibold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW GITHUB</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-semibold transition-colors shadow-lg shadow-accent/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE DEMO</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-border bg-surface-muted hover:bg-surface text-text-secondary hover:text-text-primary font-mono text-xs transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectViewer;
