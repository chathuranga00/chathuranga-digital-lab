import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Activity, X, Layers, Cpu, Compass, Terminal as TerminalIcon } from "lucide-react";

interface DeveloperModeProps {
  isActive: boolean;
  onToggle: () => void;
  onOpenTerminal?: () => void;
}

export const DeveloperMode: React.FC<DeveloperModeProps> = ({
  isActive,
  onToggle,
  onOpenTerminal,
}) => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Monitor viewport and scroll metrics
  useEffect(() => {
    const updateMetrics = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setScrollY(Math.round(window.scrollY));
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", updateMetrics, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", updateMetrics);
    };
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="pointer-events-none fixed inset-0 z-50 select-none" aria-hidden="true">
          {/* 1. Technical Grid Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {/* Subtle grid pattern lines */}
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px",
              }}
            />

            {/* 128px Sub-grid crosshairs */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px)`,
                backgroundSize: "128px 128px",
              }}
            />
          </motion.div>

          {/* 2. Viewport Corner Crosshairs */}
          <div className="absolute top-3 left-3 font-mono text-[10px] text-accent/70 flex items-center space-x-1">
            <span>+ (0, 0)</span>
          </div>
          <div className="absolute top-3 right-3 font-mono text-[10px] text-accent/70 flex items-center space-x-1">
            <span>+ ({viewport.width}, 0)</span>
          </div>
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-accent/70 flex items-center space-x-1">
            <span>+ (0, {viewport.height})</span>
          </div>
          <div className="absolute bottom-3 right-3 font-mono text-[10px] text-accent/70 flex items-center space-x-1">
            <span>+ ({viewport.width}, {viewport.height})</span>
          </div>

          {/* 3. Floating Developer Telemetry HUD */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 right-6 z-50 rounded-xl border border-emerald-500/40 bg-surface/95 backdrop-blur-xl p-3.5 shadow-2xl font-mono text-xs max-w-sm w-72"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-border/80 pb-2 mb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-400 tracking-wider text-[11px]">
                  DEVELOPER_MODE // ACTIVE
                </span>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="text-text-secondary hover:text-rose-400 p-1 rounded transition-colors"
                title="Disable Developer Mode (Ctrl+Shift+D)"
                aria-label="Close developer mode"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Telemetry Metrics */}
            <div className="space-y-1.5 text-[11px] text-text-secondary">
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-accent" />
                  <span>BUILD_VER:</span>
                </span>
                <span className="text-text-primary font-semibold">{siteConfig.buildVersion}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-1">
                  <Compass className="w-3 h-3 text-emerald-400" />
                  <span>VIEWPORT:</span>
                </span>
                <span className="text-text-primary font-semibold">
                  {viewport.width} x {viewport.height} px
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-indigo-400" />
                  <span>SCROLL_Y:</span>
                </span>
                <span className="text-text-primary font-semibold">{scrollY} px</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span>RUNTIME:</span>
                </span>
                <span className="text-emerald-400 font-semibold">React 19 / Vite / Tailwind</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between">
              <span className="text-[10px] text-text-secondary/70">
                [Ctrl+Shift+D] to toggle
              </span>
              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-accent/15 border border-accent/30 text-accent text-[10px] font-semibold hover:bg-accent/25 transition-colors"
                >
                  <TerminalIcon className="w-3 h-3" />
                  <span>LAUNCH CLI</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperMode;