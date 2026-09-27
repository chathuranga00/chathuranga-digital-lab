export interface BugEntry {
  id: string;
  title: string;
  problem: string;
  investigationSteps: string[];
  solution: string;
  lesson: string;
}

/**
 * Authentic engineering debugging post-mortems from production & active development:
 * - BUG-001: Netlify serverless timeout & Supabase client auth in EduPulse
 * - BUG-002: CORS preflight failure & port 8080 collision in Fitness Sharks
 * - BUG-003: Double-allocation race condition under peak load in University Shuttle System
 */
export const bugs: BugEntry[] = [
  {
    id: "BUG-001",
    title: "Serverless Timeout & Supabase 401 Auth Drop in EduPulse PDF Ingestion",
    problem: "When deploying EduPulse on Netlify, serverless edge functions processing multi-page Sri Lankan A/L past-paper PDFs via LLM inference frequently exceeded the 10-second timeout ceiling, dropping active streams with 504 Gateway Timeouts. Concurrently, environmental configuration mismatches intermittently caused the Supabase client to fail initialization, throwing 401 Unauthorized errors on secured endpoints.",
    investigationSteps: [
      "Inspected Netlify production function logs and network waterfall traces; identified monolithic PDF base64 payloads transmitted synchronously over HTTP POST.",
      "Profiled LLM inference latency across NVIDIA NIM models (gpt-oss-20b vs MinimaxAI); verified that payload streaming over 4MB exhausted the serverless memory window.",
      "Audited client runtime environment variables; discovered VITE_SUPABASE_ANON_KEY was intermittently unresolved during edge cold starts."
    ],
    solution: "Refactored PDF extraction to client-side Web Workers using pdfjs-dist for local text chunking, streamed prompts directly to MinimaxAI/NIM API with retry backoff, and injected a verified fallback initialization layer for the Supabase client (commits 1e12d38 and 36f0bee).",
    lesson: "Never route long-running heavy AI file-parsing streams through ephemeral serverless function proxies; offload token extraction to client-side workers and enforce fail-safe client credential bootstrap strategies."
  },
  {
    id: "BUG-002",
    title: "CORS Preflight Drop & Port 8080 Process Lock in Fitness Sharks",
    problem: "During local full-stack integration between the React 18 frontend (port 3000) and the Spring Boot 3.5.6 backend (port 8080), browser OPTIONS preflight requests were rejected with 403 Forbidden despite Spring Security permit-all rules. Additionally, rapid hot-restarts locked port 8080 due to orphaned Java 23 background processes.",
    investigationSteps: [
      "Captured browser DevTools network preflight traces; observed missing Access-Control-Allow-Origin response headers on OPTIONS requests before hitting JWT filters.",
      "Discovered Spring Security filter chains intercepted preflight OPTIONS requests prior to controller-level @CrossOrigin evaluation.",
      "Diagnosed socket lock via 'netstat -ano | findstr :8080', identifying detached JVM background worker daemons spawned by previous test runs."
    ],
    solution: "Configured a centralized WebMvcConfigurer CorsRegistry bean applied before the SecurityFilterChain, added a setupProxy.js reverse proxy to the React dev server to forward /api requests to localhost:8080 seamlessly, and added an automated port cleanup routine.",
    lesson: "Global security filter chains take precedence over controller-level cross-origin annotations; configure CORS at the gateway level and implement reverse proxying in development to eliminate cross-origin complexity."
  },
  {
    id: "BUG-003",
    title: "Seat Double-Allocation Concurrency Race in University Shuttle System",
    problem: "Under simulated peak campus rush-hour loads with multiple students simultaneously scanning and reserving seats on the final departing shuttle, read-then-write transactions caused the available seat count to decrement past zero, issuing valid HMAC QR boarding passes for an over-capacity vehicle.",
    investigationSteps: [
      "Engineered an Apache JMeter stress test simulating 50 concurrent seat-reservation HTTP POST requests within a 300ms window against a shuttle with 2 remaining seats.",
      "Analyzed PostgreSQL transaction logs; discovered standard SELECT available_seats FROM shuttles executed in parallel under default READ COMMITTED isolation before either transaction committed its UPDATE.",
      "Tested optimistic locking (@Version); confirmed that high contention triggered excessive OptimisticLockException rollbacks, causing frustrating booking failures for users."
    ],
    solution: "Switched to pessimistic database locking using Spring Data JPA's @Lock(LockModeType.PESSIMISTIC_WRITE) on the Shuttle entity, ensuring serialized row-level writes during reservation transactions before HMAC-SHA256 boarding pass generation.",
    lesson: "High-contention inventory decrement under strict physical capacity limits must be guarded by pessimistic database write locks rather than application-layer checks or optimistic rollbacks."
  }
];

export default bugs;