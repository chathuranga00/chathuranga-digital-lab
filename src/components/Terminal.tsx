import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { journey } from "../data/journey";
import {
  Terminal as TerminalIcon,
  X,
  Minimize2,
  Maximize2,
  CornerDownLeft,
} from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenProject: (projectId: string) => void;
  devMode: boolean;
  onToggleDevMode: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string;
  isSpecial?: boolean;
  shouldType?: boolean;
}

// Typing effect renderer for streaming output
const TypewriterStream: React.FC<{
  text: string;
  isSpecial?: boolean;
  shouldType?: boolean;
  onScrollToBottom: () => void;
}> = ({ text, isSpecial, shouldType = true, onScrollToBottom }) => {
  const [displayedText, setDisplayedText] = useState(shouldType ? "" : text);
  const [isTyping, setIsTyping] = useState(shouldType);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    if (!shouldType) {
      setDisplayedText(text);
      setIsTyping(false);
      onScrollToBottom();
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    // Dynamic chunk sizing to ensure fast response: completes in ~30-50 ticks (~400-600ms)
    const chunkSize = Math.max(2, Math.ceil(text.length / 40));

    const interval = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= textRef.current.length) {
        setDisplayedText(textRef.current);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(textRef.current.slice(0, currentIndex));
      }
      onScrollToBottom();
    }, 14);

    return () => clearInterval(interval);
  }, [text, shouldType, onScrollToBottom]);

  return (
    <div
      className={`pl-4 whitespace-pre-wrap leading-relaxed font-mono ${
        isSpecial
          ? "text-emerald-400 font-bold bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30 shadow-sm shadow-emerald-500/10"
          : "text-text-secondary"
      }`}
    >
      {displayedText}
      {isTyping && (
        <span className="inline-block w-2 h-3.5 ml-1 bg-accent animate-pulse align-middle" />
      )}
    </div>
  );
};

export const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onToggle,
  onOpenProject,
  devMode,
  onToggleDevMode,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init-welcome",
      command: "welcome",
      output:
        "CHATHURANGA_OS // INTERACTIVE LAB TERMINAL v1.0\nType 'help' to inspect available system commands.\nTip: Try 'open <project-id>' or easter eggs like 'sudo chathuranga'.",
      shouldType: false,
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputEndRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll to bottom callback
  const scrollToBottom = useCallback(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Auto-scroll when history length changes
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [history.length, isOpen, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle global shortcut for Esc (close terminal) and Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Dev Mode with Ctrl+Shift+D or Cmd+Shift+D
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        onToggleDevMode();
      }

      // Close terminal with Esc if open
      if (e.key === "Escape" && isOpen) {
        onToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggle, onToggleDevMode]);

  // Command parser logic
  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to command history navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim().toLowerCase();

    let outputText = "";
    let isSpecial = false;

    // Special check for multi-word command "sudo chathuranga"
    if (trimmed.toLowerCase() === "sudo chathuranga" || trimmed.toLowerCase() === "sudo chathuranga") {
      outputText = "Access granted. Welcome to the lab.";
      isSpecial = true;
    } else {
      switch (command) {
        case "help":
          outputText = `AVAILABLE COMMANDS:
  help               - Display this command reference manual
  about              - Print engineer bio & core credentials
  projects           - List all project experiments in the lab
  building           - Inspect active sprint initiatives & pipeline states
  open <project-id>  - Scroll to and open X-ray blueprint for a project
  skills             - Inspect categorized technical tooling
  mindset            - Inspect the 8-stage engineering process flow
  journey            - View recent engineering commit milestones
  github             - Display public repository telemetry
  linkedin           - Display LinkedIn professional profile
  contact            - Print communication channels (Email, Phone, LinkedIn)
  clear              - Wipe terminal screen buffer
  sudo chathuranga   - Authenticate root privileges [EASTER EGG]
  devmode            - Toggle technical developer HUD [Ctrl+Shift+D]`;
          break;

        case "about":
          outputText = `${siteConfig.name} // ${siteConfig.role}
Tagline:  ${siteConfig.tagline}
Location: ${siteConfig.location}
Build:    ${siteConfig.buildVersion}`;
          break;

        case "building":
          outputText = `ACTIVE SPRINT INITIATIVES (currentlyBuilding.ts):
  • EduPulse AI                     [TESTING]     - Dynamic quiz synthesis & NVIDIA NIM LLM inference
  • Fitness Sharks Gym Suite        [DEVELOPMENT] - Dual-portal React 18 & Spring Boot 3.5.6
  • University Shuttle System       [DEVELOPMENT] - Pessimistic DB locks & HMAC QR tokens

Scrolling to Currently Building section.`;
          setTimeout(() => {
            document.getElementById("currently-building")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
          break;

        case "projects":
          outputText = `ACTIVE LAB EXPERIMENTS:
${projects
  .map(
    (p, i) =>
      `  [0${i + 1}] ID: ${p.id.padEnd(26)} [${p.status}] - ${p.title}`
  )
  .join("\n")}

Hint: Type 'open <project-id>' (e.g. 'open university-shuttle-system') to launch the X-ray view.`;
          break;

        case "open":
          if (!arg) {
            outputText = `Error: Missing <project-id>. Usage: open <project-id>\nAvailable project IDs:\n${projects
              .map((p) => `  - ${p.id}`)
              .join("\n")}`;
          } else {
            const target = projects.find(
              (p) =>
                p.id.toLowerCase() === arg ||
                p.title.toLowerCase().includes(arg) ||
                p.id.toLowerCase().includes(arg)
            );

            if (target) {
              outputText = `Launching X-ray blueprint for: ${target.title}...
Target ID: ${target.id}
Status:    ${target.status}
Scrolling to Projects laboratory and opening X-ray view.`;
              // Trigger project modal and scroll
              onOpenProject(target.id);
            } else {
              outputText = `Error: Project '${arg}' not found.\nAvailable project IDs:\n${projects
                .map((p) => `  - ${p.id}`)
                .join("\n")}`;
            }
          }
          break;

        case "mindset":
          outputText = `ENGINEERING LIFECYCLE METHODOLOGY (8 Stages):
  01. PROBLEM    - Dissect root symptoms & invariants
  02. UNDERSTAND - Trace end-to-end data flows & failure domains
  03. RESEARCH   - Consult battle-tested RFCs & post-mortems
  04. DESIGN     - Map state transitions & concurrency guarantees
  05. BUILD      - Modular, strongly-typed code in small commits
  06. TEST       - Simulate edge cases & race conditions
  07. DEBUG      - Structured telemetry & hypothesis testing
  08. IMPROVE    - Query plan profiling & incident archiving

Scrolling to Engineering Mindset section.`;
          setTimeout(() => {
            document.getElementById("mindset")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
          break;

        case "skills":
          outputText = `CATEGORIZED TECH STACK (skills.ts):
  - Languages: ${skills.Languages.map((s) => s.name).join(", ")}
  - Frontend:  ${skills.Frontend.map((s) => s.name).join(", ")}
  - Backend:   ${skills.Backend.map((s) => s.name).join(", ")}
  - Database:  ${skills.Database.map((s) => s.name).join(", ")}
  - Mobile:    ${skills.Mobile.map((s) => s.name).join(", ")}
  - Tools:     ${skills.Tools.map((s) => s.name).join(", ")}`;
          break;

        case "journey":
          outputText = `LATEST ENGINEERING COMMITS (journey.ts):
${journey
  .flatMap((g) => g.entries)
  .slice(-4)
  .map((e) => `  commit ${e.hash} [${e.date}] - ${e.message}`)
  .join("\n")}`;
          break;

        case "github":
          outputText = `GITHUB TELEMETRY:
User:   @${siteConfig.githubUsername}
URL:    ${siteConfig.githubUrl}
Status: Public repositories synchronized`;
          break;

        case "linkedin":
          outputText = `LINKEDIN PROFILE:
URL:  ${siteConfig.linkedinUrl}
User: Chathuranga Sandaruwan`;
          break;

        case "contact":
          outputText = `COMMUNICATION CHANNELS:
Primary Email:  ${siteConfig.email}
Academic Email: ${siteConfig.academicEmail}
Phone:          ${siteConfig.phone}
GitHub:         ${siteConfig.githubUrl}
LinkedIn:       ${siteConfig.linkedinUrl}
Location:       ${siteConfig.location}`;
          break;

        case "clear":
          setHistory([]);
          setInputVal("");
          return;

        case "sudo":
          if (arg === "chathuranga" || arg === "chathura") {
            outputText = "Access granted. Welcome to the lab.";
            isSpecial = true;
          } else {
            outputText = `sudo: ${arg || "user"}: user is not in the sudoers file. This incident will be reported.`;
          }
          break;

        case "devmode":
          onToggleDevMode();
          outputText = `Developer mode ${!devMode ? "ENABLED" : "DISABLED"} (Shortcut: Ctrl+Shift+D)`;
          isSpecial = true;
          break;

        default:
          outputText = `command not found: '${trimmed}'. Type 'help' to view available commands.`;
          break;
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmed,
        output: outputText,
        isSpecial,
        shouldType: !prefersReducedMotion,
      },
    ]);

    setInputVal("");
  };

  // Keyboard navigation through history with ArrowUp / ArrowDown & Tab autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || "");
      }
    } else if (e.key === "Tab") {
      // Tab autocomplete
      e.preventDefault();
      const available = [
        "help",
        "about",
        "projects",
        "building",
        "open university-shuttle-system",
        "open edupulse",
        "open fitness-sharks",
        "open cricket-score-tracker",
        "skills",
        "mindset",
        "journey",
        "github",
        "linkedin",
        "contact",
        "clear",
        "sudo chathuranga",
        "devmode",
      ];
      const match = available.find((cmd) => cmd.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      {/* Fixed Floating Launcher Button in bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isOpen
              ? "bg-accent text-white border-accent shadow-accent/25"
              : "bg-surface/90 border-border text-text-primary hover:border-accent/50 hover:bg-surface-muted"
          }`}
          aria-label={isOpen ? "Close terminal" : "Open interactive terminal"}
          aria-expanded={isOpen}
        >
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold tracking-wider">
            {isOpen ? "CLOSE CLI" : "CLI // LAB"}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-text-secondary">
            ESC
          </span>
        </motion.button>
      </div>

      {/* Interactive Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`fixed z-50 rounded-2xl border border-accent/40 bg-surface/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden font-mono ${
              isMaximized
                ? "inset-4 sm:inset-10"
                : "bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-[580px] h-[460px] max-h-[75vh]"
            }`}
            role="region"
            aria-label="Interactive CLI Terminal"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 bg-surface-muted/90 select-none">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-text-primary tracking-wider">
                  CHATHURANGA_CLI // v1.0
                </span>
                <span className="text-[10px] text-text-secondary/60 hidden sm:inline">
                  [Ctrl+Shift+D: DevMode]
                </span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                  aria-label={isMaximized ? "Restore size" : "Maximize terminal"}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onToggle}
                  className="p-1 rounded-md text-text-secondary hover:text-rose-400 hover:bg-surface transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal History Output Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs select-text">
              {history.map((log) => (
                <div key={log.id} className="space-y-1">
                  {/* Command Prompt Line */}
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <span className="text-accent font-bold">visitor@chathuranga-lab:~$</span>
                    <span className="text-text-primary font-semibold">{log.command}</span>
                  </div>

                  {/* Output Result with Typing Effect */}
                  <TypewriterStream
                    text={log.output}
                    isSpecial={log.isSpecial}
                    shouldType={log.shouldType}
                    onScrollToBottom={scrollToBottom}
                  />
                </div>
              ))}
              <div ref={outputEndRef} />
            </div>

            {/* Command Input Row */}
            <div className="p-3 border-t border-border/70 bg-surface-muted/50 flex items-center space-x-2">
              <span className="text-accent font-bold text-xs shrink-0">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command... (e.g. 'help', 'projects', 'open edupulse')"
                className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-secondary/40 focus:outline-none font-mono"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => executeCommand(inputVal)}
                className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-accent transition-colors"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;