import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skills, allSkills, type SkillItem, type CategorizedSkills } from "../data/skills";
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Server,
  Layout,
  Smartphone,
  Database,
  Cloud,
  Lock,
} from "lucide-react";

export interface DomainNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  x: number;
  y: number;
  connections: string[];
  getSkills: (all: SkillItem[], cat: CategorizedSkills) => SkillItem[];
}

export const domainNodes: DomainNode[] = [
  {
    id: "computer-science",
    name: "Computer Science",
    icon: Cpu,
    shortDesc: "Core algorithms, data structures, OOP design patterns, and systems programming principles.",
    x: 400,
    y: 220,
    connections: ["backend", "frontend", "databases", "cloud-devops"],
    getSkills: (_all, cat) => [
      ...cat.Languages.filter((s) => ["Java", "SQL"].includes(s.name)),
      ...cat.Tools.filter((s) => ["Git", "GitHub", "IntelliJ IDEA"].includes(s.name)),
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    shortDesc: "Stateless REST architectures, Spring Boot 3, concurrency control, and JWT authentication.",
    x: 240,
    y: 130,
    connections: ["computer-science", "databases", "cybersecurity"],
    getSkills: (_all, cat) => [
      ...cat.Backend,
      ...cat.Languages.filter((s) => s.name === "Java"),
      ...cat.Tools.filter((s) => s.name === "Postman"),
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Layout,
    shortDesc: "Single Page Applications, component composition, reactive state, and modern design systems.",
    x: 560,
    y: 130,
    connections: ["computer-science", "mobile", "ai"],
    getSkills: (_all, cat) => [
      ...cat.Frontend,
      ...cat.Languages.filter((s) => s.name === "JavaScript"),
      ...cat.Tools.filter((s) => s.name === "VS Code"),
    ],
  },
  {
    id: "ai",
    name: "AI",
    icon: Sparkles,
    shortDesc: "LLM prompt inference pipelines, document parsing workers, and adaptive learning loops.",
    x: 660,
    y: 280,
    connections: ["frontend", "computer-science"],
    getSkills: (_all, cat) => [
      ...cat.Languages.filter((s) => s.name === "Python"),
      ...cat.Frontend.filter((s) => s.name === "Vite"),
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: Smartphone,
    shortDesc: "Native Android workflows, cross-platform packaging with Capacitor, and hardware QR scanning.",
    x: 540,
    y: 360,
    connections: ["frontend", "computer-science"],
    getSkills: (_all, cat) => [
      ...cat.Mobile,
      ...cat.Languages.filter((s) => s.name === "Java"),
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    shortDesc: "ACID transactions, relational schema design, query indexing, and pessimistic row locking.",
    x: 260,
    y: 360,
    connections: ["backend", "computer-science"],
    getSkills: (_all, cat) => [
      ...cat.Database,
      ...cat.Languages.filter((s) => s.name === "SQL"),
    ],
  },
  {
    id: "cloud-devops",
    name: "Cloud/DevOps",
    icon: Cloud,
    shortDesc: "Multi-stage container builds, Docker Compose orchestration, and reproducible deployment.",
    x: 140,
    y: 280,
    connections: ["backend", "computer-science"],
    getSkills: (_all, cat) => [
      ...cat.Tools.filter((s) => ["Docker", "Git", "GitHub"].includes(s.name)),
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: Lock,
    shortDesc: "Cryptographic HMAC-SHA256 token verification, rate limiting, and role-based access control.",
    x: 400,
    y: 70,
    connections: ["backend"],
    getSkills: (_all, cat) => [
      ...cat.Backend.filter((s) => s.name === "REST APIs"),
      ...cat.Backend.filter((s) => s.name === "Spring Boot"),
    ],
  },
];

export const Universe: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>("computer-science");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>("computer-science");
  const prefersReducedMotion = useReducedMotion();

  const selectedDomain = domainNodes.find((d) => d.id === selectedDomainId) || domainNodes[0];

  // Helper to test if a line between nodeA and nodeB should be highlighted
  const isLineHighlighted = (nodeAId: string, nodeBId: string) => {
    const active = hoveredNodeId || selectedDomainId;
    return active === nodeAId || active === nodeBId;
  };

  return (
    <section id="universe" className="scroll-mt-28 py-10 w-full" aria-label="Universe Constellation">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>02 // MY UNIVERSE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
          Systems Constellation Graph
        </h2>
        <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
          An interactive topological network mapping my engineering domains. Click any domain node to explore its tech ecosystem pulled directly from <code className="text-accent font-mono text-xs">skills.ts</code>.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= 768px): Interactive Constellation Network Diagram         */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full rounded-2xl border border-border bg-surface/70 shadow-2xl backdrop-blur-xl overflow-hidden p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Constellation SVG Diagram (7 cols) */}
          <div className="lg:col-span-7 relative h-[440px] flex items-center justify-center select-none">
            <svg
              viewBox="0 0 800 440"
              className="w-full h-full max-h-[440px] overflow-visible"
              aria-label="Interactive Systems Constellation Map"
            >
              <defs>
                {/* Radial glow for selected node */}
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Connecting Constellation Lines */}
              <g className="lines" strokeWidth="1.5">
                {domainNodes.map((node) =>
                  node.connections.map((targetId) => {
                    const targetNode = domainNodes.find((n) => n.id === targetId);
                    if (!targetNode) return null;
                    const highlighted = isLineHighlighted(node.id, targetId);

                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={node.x}
                        y1={node.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke={highlighted ? "#818cf8" : "rgba(255, 255, 255, 0.1)"}
                        strokeDasharray={highlighted ? "none" : "3,3"}
                        className="transition-colors duration-300"
                      />
                    );
                  })
                )}
              </g>

              {/* Domain Nodes */}
              {domainNodes.map((node) => {
                const isSelected = selectedDomainId === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isHub = node.id === "computer-science";
                const IconComponent = node.icon;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer focus:outline-none"
                    onClick={() => setSelectedDomainId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${node.name} domain`}
                    aria-pressed={isSelected}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedDomainId(node.id);
                      }
                    }}
                  >
                    {/* Outer Glow Halo when selected */}
                    {(isSelected || isHovered) && (
                      <circle
                        r={isHub ? 42 : 36}
                        fill="url(#nodeGlow)"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Background Circle */}
                    <circle
                      r={isHub ? 26 : 22}
                      className={`transition-all duration-300 ${
                        isSelected
                          ? "fill-[#1e1b4b] stroke-accent stroke-2"
                          : isHovered
                          ? "fill-[#141416] stroke-accent/70 stroke-[1.5]"
                          : "fill-[#141416] stroke-white/20 stroke-1"
                      }`}
                    />

                    {/* Node Icon inside circle */}
                    <foreignObject
                      x={-10}
                      y={-10}
                      width={20}
                      height={20}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent
                          className={`w-3.5 h-3.5 transition-colors duration-200 ${
                            isSelected ? "text-accent" : "text-text-secondary"
                          }`}
                        />
                      </div>
                    </foreignObject>

                    {/* Domain Label Text */}
                    <text
                      y={isHub ? 42 : 36}
                      textAnchor="middle"
                      className={`font-mono text-[11px] font-semibold tracking-wide pointer-events-none transition-colors duration-200 ${
                        isSelected
                          ? "fill-text-primary font-bold"
                          : isHovered
                          ? "fill-accent"
                          : "fill-text-secondary/70"
                      }`}
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Instruction tooltip in corner */}
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-secondary/50 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>CLICK ANY NODE TO INSPECT DOMAIN TECH</span>
            </div>
          </div>

          {/* Expanded Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 min-h-[380px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDomain.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" }}
                className="p-6 rounded-2xl border border-accent/40 bg-surface-muted/90 shadow-xl backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  {/* Domain Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/80">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
                        <selectedDomain.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block">
                          DOMAIN ARCHITECTURE
                        </span>
                        <h3 className="text-xl font-bold font-sans text-text-primary">
                          {selectedDomain.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                    {selectedDomain.shortDesc}
                  </p>

                  {/* Technologies from skills.ts */}
                  <div>
                    <div className="text-[11px] font-mono text-text-secondary/80 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-accent" />
                      <span>ASSOCIATED TECHNOLOGIES (PULLED FROM SKILLS.TS)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedDomain.getSkills(allSkills, skills).map((tech) => (
                        <div
                          key={tech.name}
                          className="group relative px-3 py-1.5 rounded-xl border border-border/80 bg-surface/90 hover:border-accent/60 transition-all text-xs font-mono"
                        >
                          <span className="text-text-primary font-medium">{tech.name}</span>
                          {tech.projectIds.length > 0 && (
                            <span className="ml-1.5 text-[10px] text-accent/80 font-bold">
                              [{tech.projectIds.length} proj]
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Insight */}
                <div className="pt-4 border-t border-border/60 text-[11px] font-mono text-text-secondary/70 flex justify-between items-center">
                  <span>STATUS: VALIDATED</span>
                  <span className="text-accent flex items-center space-x-1">
                    <span>{selectedDomain.getSkills(allSkills, skills).length} Tech Nodes</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW (< 768px): Vertical Accordion List (Per Master Spec)           */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-3">
        {domainNodes.map((domain, index) => {
          const isExpanded = mobileExpandedId === domain.id;
          const IconComponent = domain.icon;
          const domainSkills = domain.getSkills(allSkills, skills);

          return (
            <div
              key={domain.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "border-accent/50 bg-surface/90 shadow-xl"
                  : "border-border bg-surface/60 hover:border-border-hover"
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => setMobileExpandedId(isExpanded ? null : domain.id)}
                className="w-full p-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl border transition-colors ${
                      isExpanded
                        ? "bg-accent/20 border-accent/40 text-accent"
                        : "bg-surface-muted border-border text-text-secondary"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-accent font-semibold tracking-wider">
                      0{index + 1} // DOMAIN
                    </div>
                    <div className="text-base font-bold text-text-primary font-sans">
                      {domain.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-text-secondary">
                    {domainSkills.length} techs
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-1 border-t border-border/60 space-y-4">
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {domain.shortDesc}
                      </p>

                      <div>
                        <div className="text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">
                          Associated Technologies from skills.ts:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {domainSkills.map((tech) => (
                            <span
                              key={tech.name}
                              className="px-2.5 py-1 rounded-lg border border-border/80 bg-surface-muted text-xs font-mono text-text-primary"
                            >
                              {tech.name}
                              {tech.projectIds.length > 0 && (
                                <span className="ml-1 text-[10px] text-accent font-bold">
                                  ({tech.projectIds.length})
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Universe;
