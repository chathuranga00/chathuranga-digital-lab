import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  MapPin,
  Radio,
  Send,
  ArrowUpRight,
  Terminal,
  GraduationCap,
} from "lucide-react";

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<"email" | "academic" | "phone" | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Copy to clipboard helper
  const handleCopy = (text: string, type: "email" | "academic" | "phone") => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 1800);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-28 py-12 w-full"
      aria-label="Establish Connection & Contact Terminal"
    >
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>08 // TRANSMISSION TERMINAL</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
              ESTABLISH CONNECTION
            </h2>
            <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              Open for developer opportunities, internships, backend collaborations, and technical discussions. Channels are monitored with low latency.
            </p>
          </div>

          {/* Availability Status Badge */}
          <div className="shrink-0 p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xl flex items-center space-x-2.5 shadow-lg shadow-emerald-500/5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="font-mono text-xs">
              <span className="font-bold text-emerald-400 block tracking-wider">
                STATUS: AVAILABLE
              </span>
              <span className="text-[10px] text-text-secondary">
                Computer Science Student &amp; Developer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Connection Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        className="rounded-3xl border border-border bg-surface/85 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden"
      >
        {/* Terminal Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border/70 text-xs font-mono text-text-secondary">
          <div className="flex items-center space-x-2.5">
            <Terminal className="w-4 h-4 text-accent" />
            <span className="text-text-primary font-bold">DISPATCH // INBOX_GATEWAY</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-text-secondary/70">
            <span>PROTOCOL: TLS 1.3</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">LOCATION: {siteConfig.location}</span>
          </div>
        </div>

        {/* 1. Primary Action Buttons (Email, LinkedIn, GitHub) */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-accent font-bold mb-4 flex items-center space-x-2">
            <Send className="w-3.5 h-3.5" />
            <span>DIRECT PROTOCOL ACTIONS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Button 1: EMAIL */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group p-4 rounded-2xl border border-border bg-surface-muted hover:border-accent hover:bg-accent/10 transition-all duration-200 flex flex-col justify-between shadow-md hover:shadow-accent/10"
              aria-label="Send Email to Chathuranga"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-text-primary block group-hover:text-accent transition-colors">
                  SEND EMAIL
                </span>
                <span className="text-[11px] text-text-secondary/70 font-mono">
                  Primary Transmission
                </span>
              </div>
            </a>

            {/* Button 2: LINKEDIN */}
            {/* NOTE: LinkedIn profile link from siteConfig.ts - update this link if URL changes */}
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-2xl border border-border bg-surface-muted hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-200 flex flex-col justify-between shadow-md hover:shadow-[#0077b5]/10"
              aria-label="Connect with Chathuranga on LinkedIn"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077b5]/15 border border-[#0077b5]/30 text-[#0077b5] flex items-center justify-center group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-[#0077b5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-text-primary block group-hover:text-[#0077b5] transition-colors">
                  CONNECT ON LINKEDIN
                </span>
                <span className="text-[11px] text-text-secondary/70 font-mono">
                  Professional Network
                </span>
              </div>
            </a>

            {/* Button 3: GITHUB */}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-2xl border border-border bg-surface-muted hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-200 flex flex-col justify-between shadow-md hover:shadow-emerald-500/10"
              aria-label="View Chathuranga's GitHub Repositories"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-text-primary block group-hover:text-emerald-400 transition-colors">
                  VIEW GITHUB REPOSITORIES
                </span>
                <span className="text-[11px] text-text-secondary/70 font-mono">
                  @{siteConfig.githubUsername}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* 2. Plain Readable Text Display (Personal Email, Academic Email & Phone) with Copy Controls */}
        <div className="pt-6 border-t border-border/70">
          <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-bold mb-4">
            COMMUNICATION COORDINATES (READABLE TEXT)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Personal / Primary Email */}
            <div className="p-4 rounded-2xl border border-border/80 bg-surface/60 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-accent shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-text-secondary uppercase">
                    Primary Email
                  </div>
                  <span className="text-xs font-mono font-bold text-text-primary select-all truncate block">
                    {siteConfig.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(siteConfig.email, "email")}
                className="p-2 rounded-lg border border-border bg-surface-muted hover:border-accent text-text-secondary hover:text-accent transition-colors shrink-0"
                title="Copy primary email to clipboard"
                aria-label="Copy primary email address"
              >
                {copiedType === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* 2. Academic / University Email */}
            <div className="p-4 rounded-2xl border border-border/80 bg-surface/60 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-indigo-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-text-secondary uppercase">
                    Academic // NSBM
                  </div>
                  <span className="text-xs font-mono font-bold text-text-primary select-all truncate block">
                    {siteConfig.academicEmail}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(siteConfig.academicEmail, "academic")}
                className="p-2 rounded-lg border border-border bg-surface-muted hover:border-accent text-text-secondary hover:text-accent transition-colors shrink-0"
                title="Copy academic email to clipboard"
                aria-label="Copy academic email address"
              >
                {copiedType === "academic" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* 3. Phone / WhatsApp */}
            <div className="p-4 rounded-2xl border border-border/80 bg-surface/60 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-text-secondary uppercase">
                    Phone / WhatsApp
                  </div>
                  <span className="text-xs font-mono font-bold text-text-primary select-all truncate block">
                    {siteConfig.phone}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(siteConfig.phone, "phone")}
                className="p-2 rounded-lg border border-border bg-surface-muted hover:border-accent text-text-secondary hover:text-accent transition-colors shrink-0"
                title="Copy phone number to clipboard"
                aria-label="Copy phone number"
              >
                {copiedType === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Location & Response Expectation Footer */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-text-secondary">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>BASE LOCATION: {siteConfig.location}</span>
          </div>
          <span className="text-[11px] text-text-secondary/70">
            Average response time: &lt; 24 hours
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;