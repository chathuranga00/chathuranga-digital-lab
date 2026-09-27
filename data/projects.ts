export type ProjectCategory = "FULL-STACK" | "MOBILE" | "ACADEMIC" | "SYSTEMS" | "CREATIVE";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category?: ProjectCategory;
  badge?: string;
  techStack: string[];
  description: string;
  status: "ACTIVE" | "RESEARCH" | "DEVELOPMENT";
  githubUrl: string | null;
  liveUrl: string | null;
  problem: string;
  idea: string;
  architectureNotes: string;
  developmentNotes: string;
  challenges: string[];
  solutions: string[];
  lessons: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "edupulse",
    title: "EduPulse AI",
    subtitle: "AI-Powered Adaptive Revision & Model Paper Generator for A/L Students",
    category: "FULL-STACK",
    techStack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "NVIDIA NIM",
      "Capacitor",
      "Web Workers"
    ],
    description:
      "A specialized educational platform tailored for Sri Lankan G.C.E. Advanced Level students. Features AI-driven syllabus decomposition, automated model paper generation using NVIDIA NIM (gpt-oss-20b and minimax-m3), trilingual support (Sinhala, Tamil, English), real-time progress analytics, and native Android packaging.",
    status: "ACTIVE",
    githubUrl: "https://github.com/chathuranga00/EduPulse",
    liveUrl: "https://edupulse-ai.netlify.app",
    problem:
      "Sri Lankan A/L students struggle with unstructured past-paper revisions, lack of immediate marking scheme feedback, language-barrier limitations in standard LLMs, and high mobile latency when loading heavy syllabus PDFs.",
    idea:
      "An intelligent, offline-first revision workspace that parses examination syllabi on the client, generates contextual model questions with step-by-step solutions, tracks spaced repetition curves, and runs seamlessly across mobile and web.",
    architectureNotes:
      "Client-side document parsing using Web Workers and pdfjs-dist. Direct integration with NVIDIA NIM inference endpoints for high-throughput model paper generation. Supabase PostgreSQL backend with Row Level Security (RLS) and real-time revision sync. Packaged for Android with Capacitor.",
    developmentNotes:
      "Configured robust client-side token caching to eliminate serverless proxy timeouts. Engineered trilingual prompt templates optimized for Sinhala, Tamil, and English educational terminology. Deployed on Netlify with automated CI/CD pipelines.",
    challenges: [
      "Handling large multi-page syllabus PDF parsing without exceeding serverless memory limits.",
      "Ensuring accurate localized prompt outputs across technical subjects like Combined Mathematics and Physics.",
      "Eliminating CORS preflight and 401 token authentication drops during cold-start edge network requests."
    ],
    solutions: [
      "Offloaded document extraction to client-side Web Workers, streaming token chunks directly to LLM inference endpoints.",
      "Engineered structured JSON schema constraints to enforce deterministic question formats and marking schemes.",
      "Implemented a resilient client credential bootstrap layer with verified Netlify environment injection."
    ],
    lessons: [
      "Client-side chunking dramatically lowers serverless edge operating costs and eliminates timeout bottlenecks.",
      "Constrained decoding via strict JSON schemas is essential when generating structured educational tests."
    ],
    screenshots: []
  },
  {
    id: "fitness-sharks",
    title: "Fitness Sharks",
    subtitle: "Enterprise Gym Management Platform with Dual Member/Admin Portals",
    category: "FULL-STACK",
    techStack: [
      "Java 23",
      "Spring Boot 3.5.6",
      "React 18.2",
      "MySQL 8.0",
      "Spring Security",
      "JPA / Hibernate",
      "Maven"
    ],
    description:
      "A full-stack enterprise gym and fitness management suite engineered with Spring Boot 3.5.6 and React 18. Features distinct portals for administrators and members, membership subscription lifecycle tracking, trainer scheduling, workout program management, and secure BCrypt role-based authentication.",
    status: "DEVELOPMENT",
    githubUrl: "https://github.com/chathuranga00/Fitness-sharks",
    liveUrl: null,
    problem:
      "Independent fitness centers face high administrative friction managing member renewals, class capacities, trainer assignments, and workout logs across disconnected paper records and rudimentary spreadsheets.",
    idea:
      "A centralized gym management ecosystem offering a frictionless member booking interface alongside an administrative control plane for real-time attendance tracking, member billing cycles, and trainer scheduling.",
    architectureNotes:
      "Dual-portal architecture separating administrative oversight from member self-service. Spring Boot REST API structured around clean service layers, Spring Data JPA repositories, and MySQL relational persistence. React 18 client equipped with reverse proxying for seamless local API forwarding.",
    developmentNotes:
      "Implemented BCrypt password hashing and custom authentication filters. Configured centralized CORS registries and setupProxy.js reverse proxy on port 3000 to cleanly interface with the Spring Boot port 8080 backend. Designed normalized relational schema with cascading integrity constraints.",
    challenges: [
      "Preventing CORS preflight drops during local full-stack development between distinct frontend and backend ports.",
      "Managing complex relational mappings between members, trainers, subscription tiers, and attendance logs.",
      "Resolving port 8080 socket contention caused by detached JVM processes during rapid test restarts."
    ],
    solutions: [
      "Configured a global WebMvcConfigurer CorsRegistry bean and integrated setupProxy.js on the React development server.",
      "Structured bidirectional JPA entity relations with clean DTO mapping to prevent circular reference serialization.",
      "Automated JVM background process cleanup routines in the development environment."
    ],
    lessons: [
      "Centralized gateway-level CORS configurations are vastly superior to ad-hoc controller annotations.",
      "Decoupling entity models from API DTOs is critical for security and maintainability in enterprise systems."
    ],
    screenshots: []
  },
  {
    id: "university-shuttle-system",
    title: "University Shuttle Management System",
    subtitle: "Campus Fleet Transit Ecosystem with Concurrency Protection & HMAC Validation",
    category: "SYSTEMS",
    techStack: [
      "Spring Boot 3",
      "Java 21",
      "PostgreSQL",
      "Docker",
      "Flyway",
      "HMAC-SHA256"
    ],
    description:
      "An automated campus fleet management and student boarding transit platform engineered to handle peak departure rushes. Incorporates HMAC-SHA256 signed QR virtual boarding passes, driver validation scanners, and pessimistic row-level database locking to guarantee zero seat double-allocations.",
    status: "ACTIVE",
    githubUrl: "https://github.com/chathuranga00/shuttle-project",
    liveUrl: null,
    problem:
      "At university departure peaks, hundreds of students attempt to board shuttles simultaneously. Physical tickets and slow network validation cause severe bottleneck queues and chronic overbooking.",
    idea:
      "A real-time transit management system that provides students with tamper-proof HMAC QR boarding passes on their mobile devices, validated instantly by driver terminals, backed by high-concurrency reservation locking.",
    architectureNotes:
      "Spring Boot 3 backend with stateless REST endpoints. PostgreSQL database with strict transactional isolation and pessimistic row-level write locks (PESSIMISTIC_WRITE). Signed HMAC-SHA256 tokens enable offline cryptographic verification by driver devices.",
    developmentNotes:
      "Constructed custom JPA repository queries with explicit lock annotations. Stress-tested concurrency behavior under 50+ simultaneous reservation requests using Apache JMeter. Containerized services with Docker Compose.",
    challenges: [
      "Preventing double-allocation of the final remaining seats when multiple students confirm reservations within milliseconds.",
      "Ensuring driver ticket verification works instantaneously even during intermittent campus Wi-Fi drops."
    ],
    solutions: [
      "Applied pessimistic write locks (SELECT ... FOR UPDATE) on the Shuttle entity, serializing reservation transactions at the database level.",
      "Implemented HMAC-SHA256 signed tokens containing embedded expiration timestamps, allowing driver terminals to verify authenticity offline."
    ],
    lessons: [
      "High-contention inventory operations require strict database-level pessimistic locking rather than optimistic application checks.",
      "Cryptographic offline validation provides seamless reliability in unpredictable network environments."
    ],
    screenshots: []
  },
  {
    id: "forum-website",
    title: "Community Sports & Discussion Forum",
    subtitle: "Relational Community Forum Platform with Multi-Category Threading & Moderation",
    category: "FULL-STACK",
    techStack: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SQL Schema"
    ],
    description:
      "A full-featured relational discussion board engineered with PHP and MySQL. Supports specialized sport categories (Cricket, Football, Formula 1, Rugby, Boxing, Basketball), user registration and session management, hierarchical reply trees, full-text thread search, and image uploads.",
    status: "ACTIVE",
    githubUrl: "https://github.com/chathuranga00/Forum-Website",
    liveUrl: null,
    problem:
      "Campus sports clubs and fan communities needed a centralized, responsive discussion platform that organizes threads by sporting categories while maintaining fast page generation and secure message authoring without heavy CMS bloat.",
    idea:
      "A lightweight, modular PHP MVC application connected to a normalized MySQL relational database schema supporting thread creation, category filtering, user authentication, and reply cascades.",
    architectureNotes:
      "Engineered with native PHP server-side rendering and procedural MVC structure. Relational persistence in MySQL with foreign key constraints across users, categories, threads, and replies. Prepared statements utilized to prevent SQL injection.",
    developmentNotes:
      "Built dynamic routing for category pages (cricket.php, football.php, formula1.php, etc.). Structured user authentication sessions with password hashing and implemented search filtering across thread titles and bodies.",
    challenges: [
      "Ensuring transactional consistency and preventing orphaned reply rows upon thread deletion.",
      "Securing user input against SQL injection and cross-site scripting (XSS) in discussion text."
    ],
    solutions: [
      "Structured foreign key CASCADE deletion in MySQL schema (forum_db.sql).",
      "Applied strict input sanitization, htmlspecialchars encoding, and prepared PDO/MySQLi statements."
    ],
    lessons: [
      "Relational schema integrity constraints at the database level are the most reliable defense against orphaned data.",
      "Clean modular PHP with prepared statements delivers rapid page loads with minimal server overhead."
    ],
    screenshots: []
  },
  {
    id: "cricket-score-tracker",
    title: "Cricket Score & Match Tracker",
    subtitle: "In-Class University Practical // Mobile Scoring Application in Flutter & C++",
    category: "ACADEMIC",
    badge: "IN-CLASS ACTIVITY",
    techStack: [
      "Flutter",
      "Dart",
      "C++",
      "CMake",
      "Android",
      "iOS"
    ],
    description:
      "An in-class laboratory practical engineered as part of the Computer Science curriculum at NSBM Green University. Built with Flutter, Dart, and native C++ CMake bindings to explore mobile application architecture, real-time ball-by-ball match state management, and platform-channel interop.",
    status: "RESEARCH",
    githubUrl: "https://github.com/chathuranga00/Inclass-04-cricket-app",
    liveUrl: null,
    problem:
      "Academic laboratory requirement to design and implement a responsive mobile scoring model capable of tracking real-time overs, wickets, extras, and strike rates without external network dependencies.",
    idea:
      "An in-class mobile computing exercise demonstrating Flutter's reactive widget tree and Dart asynchronous state streams paired with native compiled logic for rapid offline score evaluation.",
    architectureNotes:
      "Built with Flutter and Dart for cross-platform UI rendering across Android and iOS, backed by native C++ and CMake bindings for platform channels and statistical computation engines.",
    developmentNotes:
      "Developed as an in-class laboratory session (Inclass-04-cricket-app). Configured multi-platform runners (Android, Windows, Linux) and implemented state reducers for ball-by-ball scoring.",
    challenges: [
      "Maintaining zero-lag UI responsiveness during rapid ball-by-ball score entry.",
      "Ensuring clean cross-platform build orchestration across Android and C++ CMake environments."
    ],
    solutions: [
      "Utilized reactive state management with immutable match state models.",
      "Configured Flutter platform channels with native compilation hooks via CMake."
    ],
    lessons: [
      "Hands-on university lab experience demonstrating Flutter cross-platform velocity when backed by clean domain-driven state models.",
      "Decoupling scoring logic from rendering logic enables straightforward porting across mobile and desktop runtimes."
    ],
    screenshots: []
  },
  {
    id: "inclass-flutter-profile",
    title: "Material 3 Mobile Profile App",
    subtitle: "In-Class University Practical // Flutter & Dart Material Design Lab",
    category: "ACADEMIC",
    badge: "IN-CLASS ACTIVITY",
    techStack: [
      "Flutter",
      "Dart",
      "Material 3",
      "Android",
      "CMake"
    ],
    description:
      "An academic in-class laboratory practical exploring Flutter's Material 3 design system, dynamic color seeding, responsive layout builders, and cross-platform mobile application lifecycles.",
    status: "RESEARCH",
    githubUrl: "https://github.com/chathuranga00/Inclass-2",
    liveUrl: null,
    problem:
      "Exploring component composition, theme customization, and responsive layout handling across differing mobile screen dimensions within the Flutter SDK.",
    idea:
      "An in-class laboratory activity demonstrating stateless and stateful widget architecture, Material 3 theme seeds, and clean mobile screen composition.",
    architectureNotes:
      "Built with Flutter Material 3 widget tree, custom theme configuration, and platform runners across Android and desktop targets.",
    developmentNotes:
      "Engineered profile screen components, theme color palettes, and structured asset loading.",
    challenges: [
      "Adapting UI components dynamically to varying viewport aspect ratios."
    ],
    solutions: [
      "Utilized flexible layouts, safe area constraints, and theme-derived color schemes."
    ],
    lessons: [
      "Mastery of Flutter widget trees and Material 3 design tokens accelerates high-fidelity mobile prototyping."
    ],
    screenshots: []
  },
  {
    id: "onetaphelp",
    title: "One Tap Help",
    subtitle: "Emergency Assistance & Rapid Response Platform Concept",
    category: "SYSTEMS",
    techStack: [
      "JavaScript",
      "Geolocation API",
      "Mobile Integration",
      "REST APIs"
    ],
    description:
      "An emergency assistance platform concept designed to provide instantaneous SOS signal broadcasting, real-time geolocation sharing, and urgent alert dispatch to pre-configured trusted contacts.",
    status: "RESEARCH",
    githubUrl: "https://github.com/chathuranga00/OneTapHelp",
    liveUrl: null,
    problem:
      "In urgent distress situations, navigating multi-step phone dials or complex apps is too slow and error-prone.",
    idea:
      "A streamlined, high-priority emergency dispatch interface that triggers distress alerts, captures device coordinates, and notifies emergency contacts with a single tap.",
    architectureNotes:
      "Engineered around low-latency event triggers, client-side geolocation caching, and resilient notification dispatch pipelines.",
    developmentNotes:
      "Prototyped emergency trigger flows, contact priority tiers, and offline fallback SMS integration concepts.",
    challenges: [
      "Ensuring coordinate acquisition succeeds even under degraded GPS or network conditions."
    ],
    solutions: [
      "Designed progressive location resolution falling back to last-known cached coordinates."
    ],
    lessons: [
      "Critical safety systems require zero-friction UX and defensive fallbacks at every tier."
    ],
    screenshots: []
  },
  {
    id: "escapeverse",
    title: "EscapeVerse",
    subtitle: "Interactive Virtual Puzzle & Exploration Simulation",
    category: "CREATIVE",
    techStack: [
      "JavaScript",
      "HTML5 Canvas",
      "CSS3",
      "Game Loop Logic"
    ],
    description:
      "An interactive virtual escape room and adventure exploration simulation. Features procedural clue discovery, state-driven puzzle verification, inventory tracking, and dynamic visual state updates.",
    status: "RESEARCH",
    githubUrl: "https://github.com/chathuranga00/EscapeVerse",
    liveUrl: null,
    problem:
      "Creating engaging web-based interactive puzzle environments without heavy 3D game engines or excessive asset bundles.",
    idea:
      "A lightweight, state-driven adventure engine managing room transitions, inventory interactions, and conditional logic directly in the browser.",
    architectureNotes:
      "Structured finite-state machine (FSM) governing room states, item combinations, and puzzle completion triggers.",
    developmentNotes:
      "Implemented event handlers for room exploration, item combination rules, and interactive clues.",
    challenges: [
      "Managing complex interdependent puzzle states without regression or impossible game states."
    ],
    solutions: [
      "Modeled room state transitions as a deterministic directed acyclic graph (DAG)."
    ],
    lessons: [
      "Finite state machines provide predictable, bug-free game state and puzzle management."
    ],
    screenshots: []
  },
  {
    id: "chathuranga-digital-lab",
    title: "CHATHURANGA.DEV Digital Lab",
    subtitle: "Interactive Engineering Portfolio, X-Ray Blueprint Viewer & CLI Terminal",
    category: "SYSTEMS",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "GitHub REST API"
    ],
    description:
      "The flagship digital engineering laboratory and portfolio platform. Features an interactive CLI terminal emulator, full-screen X-ray architectural blueprint viewer, real system debugging post-mortems, live GitHub telemetry streaming, and dark cyber-aesthetic design.",
    status: "ACTIVE",
    githubUrl: "https://github.com/chathuranga00/chathuranga-digital-lab",
    liveUrl: null,
    problem:
      "Standard developer portfolios are static, generic, and fail to demonstrate actual engineering rigor, system architecture thought processes, or real production debugging experience.",
    idea:
      "An interactive engineering lab where visitors can inspect real architecture blueprints, run terminal commands, view authentic incident post-mortems, and verify live GitHub telemetry.",
    architectureNotes:
      "Built with React 19 and Vite with strict TypeScript. Modular component architecture with centralized data stores. Framer Motion animation engine with prefers-reduced-motion support. Real-time GitHub REST API integration with client session caching.",
    developmentNotes:
      "Configured code-splitting chunks (`vendor`, `motion`, `icons`) in Vite, responsive layout down to 320px mobile screens, and accessible keyboard navigation.",
    challenges: [
      "Maintaining instantaneous 60fps animations across complex modal and terminal overlays on mobile devices.",
      "Gracefully handling GitHub API rate limits without breaking UI telemetry."
    ],
    solutions: [
      "Utilized CSS transforms and lightweight Framer Motion variants with hardware acceleration.",
      "Implemented a resilient 10-minute sessionStorage cache and clean static fallback cards on rate-limit detection."
    ],
    lessons: [
      "A portfolio should be a working demonstration of engineering standards, not just a resume list.",
      "Resilient fallback UX is essential when depending on third-party public APIs."
    ],
    screenshots: []
  }
];

export default projects;