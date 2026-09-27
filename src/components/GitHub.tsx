import React, { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import {
  Github as GithubIcon,
  GitFork,
  Star,
  ExternalLink,
  FolderGit2,
  RefreshCw,
  Code2,
  Terminal,
} from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  bio: string | null;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface LanguageMetric {
  language: string;
  count: number;
}

const CACHE_KEY_USER = "chathuranga_gh_user_cache";
const CACHE_KEY_REPOS = "chathuranga_gh_repos_cache_v3";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes client-side cache

// Language color resolver for terminal chips
const getLanguageColor = (lang: string | null): string => {
  if (!lang) return "#9a9aa0";
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Dart: "#00b4ab",
    Shell: "#89e051",
  };
  return colors[lang] || "#6366f1";
};

// Fallback descriptions for repositories with empty GitHub descriptions
const repoDescriptions: Record<string, string> = {
  "chathuranga-digital-lab": "Flagship interactive digital engineering laboratory, X-ray blueprint viewer, and CLI terminal.",
  "shuttle-project": "Campus fleet transit management API with HMAC-SHA256 QR validation and pessimistic DB row locks.",
  "Inclass-04-cricket-app": "In-class academic practical: real-time mobile cricket match scoring in Flutter, Dart & C++.",
  "Inclass-2": "In-class academic practical: Material 3 mobile profile interface and widget tree composition in Flutter.",
  "EduPulse": "Sri Lankan A/L AI revision assistant with PDF parsing, NVIDIA NIM inference, and Capacitor Android.",
  "EscapeVerse": "Interactive virtual puzzle and room-escape simulation with deterministic state logic.",
  "Space-explorer": "Celestial navigation and interactive particle system visualization built with HTML5 Canvas.",
  "Cyberpunk-City-Portfolio": "Stylized cyber-city environment visual concept and design token showcase.",
  "Space-Portfolio": "Cosmic-themed interactive portfolio environment concept.",
  "OneTapHelp": "Emergency assistance platform concept with instant SOS broadcasting and location sharing.",
  "Forum-Website": "Full-stack sports community discussion forum with PHP, MySQL, thread categories, and reply trees.",
  "Fitness-sharks": "Full-stack enterprise gym management platform with dual React 18 & Spring Boot 3.5 portals.",
};

export const GitHub: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [topLanguages, setTopLanguages] = useState<LanguageMetric[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showAllRepos, setShowAllRepos] = useState<boolean>(true);
  const prefersReducedMotion = useReducedMotion();

  // Fetch telemetry from GitHub REST API
  const fetchGitHubData = useCallback(async (bypassCache = false) => {
    setIsLoading(true);
    setIsError(false);

    try {
      // Check client-side cache if not explicitly refreshing
      if (!bypassCache) {
        const cachedUserRaw = sessionStorage.getItem(CACHE_KEY_USER);
        const cachedReposRaw = sessionStorage.getItem(CACHE_KEY_REPOS);

        if (cachedUserRaw && cachedReposRaw) {
          const cachedUser = JSON.parse(cachedUserRaw);
          const cachedRepos = JSON.parse(cachedReposRaw);

          if (
            Date.now() - cachedUser.timestamp < CACHE_TTL_MS &&
            Date.now() - cachedRepos.timestamp < CACHE_TTL_MS
          ) {
            setUser(cachedUser.data);
            setRepos(cachedRepos.data);
            computeTopLanguages(cachedRepos.data);
            setIsLoading(false);
            return;
          }
        }
      }

      // Fetch user profile
      const userRes = await fetch(
        `https://api.github.com/users/${siteConfig.githubUsername}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!userRes.ok) {
        throw new Error(`GitHub user API returned status ${userRes.status}`);
      }

      const userData: GitHubUser = await userRes.json();

      // Fetch recent public repositories
      const reposRes = await fetch(
        `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!reposRes.ok) {
        throw new Error(`GitHub repos API returned status ${reposRes.status}`);
      }

      const reposData: GitHubRepo[] = await reposRes.json();

      // Save to state
      setUser(userData);
      setRepos(reposData);
      computeTopLanguages(reposData);

      // Save to session cache
      sessionStorage.setItem(
        CACHE_KEY_USER,
        JSON.stringify({ timestamp: Date.now(), data: userData })
      );
      sessionStorage.setItem(
        CACHE_KEY_REPOS,
        JSON.stringify({ timestamp: Date.now(), data: reposData })
      );
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Compute top languages from actual repository list
  const computeTopLanguages = (repoList: GitHubRepo[]) => {
    const counts: Record<string, number> = {};
    repoList.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
      }
    });

    const sorted = Object.entries(counts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTopLanguages(sorted);
  };

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchGitHubData(true);
  };

  return (
    <section
      id="github"
      className="scroll-mt-28 py-10 w-full"
      aria-label="GitHub Telemetry & Public Repositories"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
          <GithubIcon className="w-4 h-4" />
          <span>07 // GITHUB TELEMETRY</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-text-primary mb-2">
              Public Activity &amp; Repositories
            </h2>
            <p className="text-text-secondary text-sm sm:text-base font-sans max-w-2xl">
              Live telemetry fetched directly from GitHub&apos;s REST API for @{siteConfig.githubUsername}. Real public repositories, language distribution, and commit activity.
            </p>
          </div>

          {/* Sync Status / Manual Refresh Button */}
          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing || isLoading}
              className="px-3 py-2 rounded-xl border border-border bg-surface hover:border-accent text-text-secondary hover:text-text-primary font-mono text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
              title="Refresh live GitHub telemetry"
              aria-label="Refresh GitHub telemetry"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-accent ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              <span className="hidden sm:inline">SYNC TELEMETRY</span>
            </button>

            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-accent/15 border border-accent/30 hover:bg-accent/25 text-accent font-mono text-xs font-semibold flex items-center space-x-2 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GITHUB PROFILE &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Case 1: Loading Skeleton */}
      {isLoading && (
        <div className="p-8 rounded-2xl border border-border bg-surface/60 backdrop-blur-xl animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-surface-muted rounded w-48" />
            <div className="h-6 bg-surface-muted rounded w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-20 bg-surface-muted rounded-xl" />
            <div className="h-20 bg-surface-muted rounded-xl" />
            <div className="h-20 bg-surface-muted rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-surface-muted rounded-xl" />
            <div className="h-32 bg-surface-muted rounded-xl" />
          </div>
        </div>
      )}

      {/* Case 2: Static Fallback Card (Triggered on API error or rate-limiting) */}
      {!isLoading && (isError || !user) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="p-8 rounded-2xl border border-border bg-surface/75 backdrop-blur-xl text-center flex flex-col items-center justify-center space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center text-text-secondary">
            <GithubIcon className="w-6 h-6" />
          </div>

          <div className="max-w-md">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-surface-muted border border-border text-[10px] font-mono text-text-secondary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>API STATUS: OFFLINE / RATE-LIMITED</span>
            </div>
            <h3 className="text-xl font-bold font-sans text-text-primary mb-1">
              Live Telemetry Temporarily Unavailable
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
              Public GitHub API rate limits or client network restrictions prevented live data retrieval. Explore all source repositories directly on GitHub.
            </p>
          </div>

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View GitHub Profile &rarr;</span>
          </a>
        </motion.div>
      )}

      {/* Case 3: Live Telemetry Rendered with Real Stats */}
      {!isLoading && !isError && user && (
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="space-y-6"
        >
          {/* Top Telemetry Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Real Public Repos Count */}
            <div className="p-5 rounded-2xl border border-border bg-surface/80 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  PUBLIC REPOSITORIES
                </span>
                <FolderGit2 className="w-4 h-4 text-accent" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-text-primary">
                {user.public_repos}
              </div>
              <div className="text-[11px] font-mono text-text-secondary/70 mt-1">
                Active open-source codebases
              </div>
            </div>

            {/* Account Status / Profile */}
            <div className="p-5 rounded-2xl border border-border bg-surface/80 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  PROFILE TELEMETRY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-xl font-bold font-mono text-text-primary truncate">
                @{user.login}
              </div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center space-x-1">
                <span>&bull;</span>
                <span>REST API SYNCHRONIZED</span>
              </div>
            </div>

            {/* Top Primary Languages from actual repos */}
            <div className="p-5 rounded-2xl border border-border bg-surface/80 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  TOP LANGUAGES
                </span>
                <Code2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {topLanguages.map((lang) => (
                  <span
                    key={lang.language}
                    className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md border border-border bg-surface-muted text-[10px] font-mono text-text-primary"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: getLanguageColor(lang.language) }}
                    />
                    <span>{lang.language}</span>
                    <span className="text-text-secondary/60">({lang.count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Repositories Grid (All public repos with toggle) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-text-secondary uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>ALL PUBLIC REPOSITORIES ({repos.length})</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[11px] font-mono text-text-secondary/60 hidden sm:inline">
                  Sorted by latest push
                </span>
                {repos.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllRepos(!showAllRepos)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-border bg-surface-muted hover:border-accent/40 text-text-primary transition-colors cursor-pointer"
                  >
                    {showAllRepos ? "SHOW TOP 6" : `SHOW ALL (${repos.length})`}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllRepos ? repos : repos.slice(0, 6)).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-5 rounded-2xl border border-border bg-surface/70 hover:border-accent/50 transition-all duration-200 backdrop-blur-xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div>
                    {/* Header: Repo Name & Language Tag */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-base font-bold font-mono text-text-primary group-hover:text-accent transition-colors flex items-center space-x-1.5">
                        <span className="truncate">{repo.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent shrink-0" />
                      </h4>

                      {repo.language && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono border border-border/80 bg-surface-muted shrink-0 text-text-secondary">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span>{repo.language}</span>
                        </span>
                      )}
                    </div>

                    {/* Repo Description */}
                    <p className="text-xs text-text-secondary font-sans leading-relaxed line-clamp-2 mb-4">
                      {repo.description || repoDescriptions[repo.name] || "Public repository and source implementation."}
                    </p>
                  </div>

                  {/* Footer: Stars, Forks & Last Push */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/60 text-[11px] font-mono text-text-secondary">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-amber-400/80" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="w-3 h-3 text-text-secondary/60" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-text-secondary/60">
                      Updated {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GitHub;