import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Identity } from "./components/Identity";
import { Universe } from "./components/Universe";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { BugArchive } from "./components/BugArchive";
import { EngineeringMindset } from "./components/EngineeringMindset";
import { Journey } from "./components/Journey";
import { CurrentlyBuilding } from "./components/CurrentlyBuilding";
import { GitHub } from "./components/GitHub";
import { Contact } from "./components/Contact";
import { Terminal } from "./components/Terminal";
import { LabChrome } from "./components/LabChrome";
import { DeveloperMode } from "./components/DeveloperMode";
import { siteConfig } from "./data/siteConfig";

export const App: React.FC = () => {
  const [hasEnteredLab, setHasEnteredLab] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleEnterLab = () => {
    setHasEnteredLab(true);
  };

  const handleResetToHero = () => {
    setHasEnteredLab(false);
    setIsTerminalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleToggleDevMode = () => {
    setDevMode((prev) => !prev);
  };

  // Global listener for shortcut Ctrl+Shift+D / Cmd+Shift+D
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setDevMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  // Handler for opening a project from terminal command 'open <project-id>'
  const handleOpenProject = (projectId: string) => {
    // If not entered lab yet, enter it
    if (!hasEnteredLab) {
      setHasEnteredLab(true);
    }

    setSelectedProjectId(projectId);

    // Smooth scroll down to the projects section
    setTimeout(() => {
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent/30 selection:text-white relative">
      {/* Developer Mode Grid Overlay & HUD */}
      <DeveloperMode
        isActive={devMode}
        onToggle={handleToggleDevMode}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <AnimatePresence mode="wait">
        {!hasEnteredLab ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            <Hero onEnterLab={handleEnterLab} />
          </motion.div>
        ) : (
          <motion.div
            key="lab"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen flex flex-col relative"
          >
            {/* Floating Glassmorphic Navbar & Ambient Telemetry Chrome */}
            <Navbar onReboot={handleResetToHero} />
            <LabChrome />

            {/* Subtle background grid across the entire lab */}
            <div
              className="fixed inset-0 lab-grid-bg lab-radial-mask pointer-events-none opacity-25"
              aria-hidden="true"
            />

            {/* Main Lab Content Container */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-24 pb-20 space-y-28 relative z-10">
              {/* SECTION: Identity (Phase 4 Component) */}
              <Identity />

              {/* SECTION: Universe (Phase 5 Component) */}
              <Universe />

              {/* SECTION: Projects & X-Ray Viewer (Phase 6 Component) */}
              <Projects
                selectedProjectId={selectedProjectId}
                onSelectProject={(project) =>
                  setSelectedProjectId(project ? project.id : null)
                }
              />

              {/* SECTION: Skills (Phase 9 Component) */}
              <TechStack />

              {/* SECTION: Lab & Bug Archive (Phase 7 Component) */}
              <BugArchive />

              {/* SECTION: Engineering Mindset (Phase 8 Component) */}
              <EngineeringMindset />

              {/* SECTION: Journey (Phase 11 Component) */}
              <Journey />

              {/* SECTION: Currently Building (Phase 12 Component) */}
              <CurrentlyBuilding onOpenProject={handleOpenProject} />

              {/* SECTION: GitHub Telemetry (Phase 13 Component) */}
              <GitHub />

              {/* SECTION: Contact / Establish Connection (Phase 14 Component) */}
              <Contact />
            </main>

            {/* Bottom Footer */}
            <footer className="w-full border-t border-border/60 py-8 px-6 text-center text-xs font-mono text-text-secondary/60">
              <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <span>{siteConfig.buildVersion} // CHATHURANGA SANDARUWAN</span>
                <span>DESIGNED AS AN ENGINEERING LAB</span>
              </div>
            </footer>

            {/* Fixed Interactive CLI Terminal Component */}
            <Terminal
              isOpen={isTerminalOpen}
              onToggle={handleToggleTerminal}
              onOpenProject={handleOpenProject}
              devMode={devMode}
              onToggleDevMode={handleToggleDevMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;