import React, { useState, useEffect } from "react";
import { projects, type Project } from "../data/projects";
import { ProjectViewer } from "./ProjectViewer";
import { FolderGit2, ArrowUpRight, Eye } from "lucide-react";

export interface ProjectsProps {
  selectedProjectId?: string | null;
  onSelectProject?: (project: Project | null) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  selectedProjectId,
  onSelectProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync external selection (e.g. from Terminal 'open <project-id>')
  useEffect(() => {
    if (selectedProjectId) {
      const match = projects.find(
        (p) => p.id.toLowerCase() === selectedProjectId.toLowerCase()
      );
      if (match) {
        setSelectedProject(match);
      }
    }
  }, [selectedProjectId]);

  // Handle closing modal
  const handleCloseModal = () => {
    setSelectedProject(null);
    onSelectProject?.(null);
  };

  // Status color pill resolver
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          dot: "bg-emerald-400",
        };
      case "DEVELOPMENT":
        return {
          bg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
          dot: "bg-indigo-400",
        };
      case "RESEARCH":
        return {
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          dot: "bg-amber-400",
        };
    }
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    onSelectProject?.(project);
  };

  return (
    <section id="projects" className="scroll-mt-28 py-10 w-full" aria-label="Projects Lab">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <FolderGit2 className="w-4 h-4" />
          <span>03 // PROJECT LAB &amp; EXPERIMENTS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
          Architectural Lab Experiments
        </h2>
        <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
          Engineered systems with deep technical blueprints. Click any experiment card to inspect its full X-ray specification including problem, architecture flow, and concurrency solutions.
        </p>
      </div>

      {/* Lab Experiment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const statusStyle = getStatusBadge(project.status);

          return (
            <article
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group relative rounded-2xl border border-border bg-surface/75 hover:border-accent/50 p-6 sm:p-7 transition-all duration-300 shadow-xl backdrop-blur-xl flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
              tabIndex={0}
              role="button"
              aria-label={`Open X-Ray view for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(project);
                }
              }}
            >
              {/* Card Header (Experiment Tag & Status) */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 select-none">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-text-secondary">
                    <span className="text-accent font-bold">EXP_0{index + 1}</span>
                    <span className="text-border">/</span>
                    <span className="uppercase tracking-wider font-semibold">LAB_SPEC</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {project.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 border border-amber-500/40 text-amber-300">
                        {project.badge}
                      </span>
                    )}

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${statusStyle.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`} />
                      <span>{project.status}</span>
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-text-primary group-hover:text-accent transition-colors mb-1.5 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-mono text-accent/90 mb-4 line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Tech Tags & X-Ray Action */}
              <div className="space-y-4 pt-4 border-t border-border/60">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md border border-border/80 bg-surface-muted text-[11px] font-mono text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* X-Ray Prompt Button */}
                <div className="flex items-center justify-between pt-1 text-xs font-mono text-text-secondary group-hover:text-text-primary transition-colors">
                  <div className="flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5 text-accent" />
                    <span>INSPECT X-RAY SPECIFICATION</span>
                  </div>
                  <span className="text-[10px] text-accent/70 font-semibold">[ESC to exit viewer]</span>
                </div>
              </div>

              {/* Corner Crosshair Decoration */}
              <span className="absolute top-2 right-2 text-[10px] font-mono text-border group-hover:text-accent/40 select-none pointer-events-none" aria-hidden="true">+</span>
            </article>
          );
        })}
      </div>

      {/* Full-Screen X-Ray Modal Viewer */}
      <ProjectViewer
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;