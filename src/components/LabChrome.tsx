import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Clock, Compass } from "lucide-react";

export const LabChrome: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [timeString, setTimeString] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("IDENTITY");

  // Live clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formats as HH:MM:SS
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeString(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = [
      "identity",
      "universe",
      "projects",
      "skills",
      "lab",
      "mindset",
      "journey",
      "currently-building",
      "github",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId.toUpperCase().replace("-", "_"));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Accessible Skip to Main Content Link */}
      <a
        href="#identity"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-white transition-all"
      >
        Skip to main content &darr;
      </a>

      {/* 2. Top Scroll-Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-border/20">
        <motion.div
          className="h-full bg-gradient-to-r from-accent via-indigo-400 to-emerald-400 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* 3. Bottom-Left Corner HUD Telemetry Strip */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center space-x-2 text-[10px] font-mono select-none">
        <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full border border-border/80 bg-surface/90 backdrop-blur-xl shadow-2xl text-text-secondary">
          {/* System status indicator */}
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS: NOMINAL</span>
          </div>

          <span className="text-border" aria-hidden="true">|</span>

          {/* Live local time */}
          <div className="flex items-center space-x-1 text-text-primary">
            <Clock className="w-3 h-3 text-accent" />
            <span>{timeString || "00:00:00"}</span>
          </div>

          <span className="text-border" aria-hidden="true">|</span>

          {/* Current Section indicator */}
          <div className="flex items-center space-x-1 text-accent font-semibold">
            <Compass className="w-3 h-3" />
            <span>LOC: {activeSection}</span>
          </div>

          <span className="text-border" aria-hidden="true">|</span>

          {/* Build Version Tag */}
          <div className="text-text-secondary/70">
            {siteConfig.buildVersion}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabChrome;