export type BuildingStatus = "RESEARCH" | "DESIGN" | "DEVELOPMENT" | "TESTING" | "DEPLOYMENT";

export interface CurrentlyBuildingItem {
  id: string;
  projectId?: string; // Optional link to projects.ts for X-ray viewer integration
  name: string;
  subtitle: string;
  status: BuildingStatus;
  focusArea: string;
  currentMilestone: string;
  architectureHighlight: string;
  techStack: string[];
  lastSprintUpdate: string;
}

export const currentlyBuildingItems: CurrentlyBuildingItem[] = [
  {
    id: "edupulse-ai",
    projectId: "edupulse",
    name: "EduPulse AI",
    subtitle: "Adaptive Revision & LLM Document Extraction Assistant",
    status: "TESTING",
    focusArea: "Edge Case Payload Validation & LLM Prompt Distillation",
    currentMilestone: "Validating client-side PDF document parser and caching synthesized revision curves in Supabase.",
    architectureHighlight: "Multi-turn context window distillation with client-side offline revision curves and trilingual support.",
    techStack: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "NVIDIA NIM", "Capacitor"],
    lastSprintUpdate: "Sprint 26.09 // Direct OpenAI client integration and MinimaxAI PDF analysis benchmark."
  },
  {
    id: "fitness-sharks",
    projectId: "fitness-sharks",
    name: "Fitness Sharks Gym Suite",
    subtitle: "Enterprise Gym & Member Lifecycle Management Platform",
    status: "DEVELOPMENT",
    focusArea: "Dual Role-Based Portals & Spring Security Integration",
    currentMilestone: "Finalizing member attendance tracking, subscription renewal hooks, and workout plan persistence.",
    architectureHighlight: "Dual-portal architecture separating administrative oversight from member booking workflows with Spring Boot 3.5.",
    techStack: ["Java 23", "Spring Boot 3.5", "React 18", "MySQL 8", "Spring Security", "Maven"],
    lastSprintUpdate: "Sprint 26.09 // Configuring reverse proxy on client port 3000 to eliminate dev CORS preflight bottlenecks."
  },
  {
    id: "university-shuttle",
    projectId: "university-shuttle-system",
    name: "University Shuttle Management System",
    subtitle: "Campus Fleet Transit Ecosystem with Concurrency Protection",
    status: "DEVELOPMENT",
    focusArea: "HMAC QR Validation & Concurrency Stress Testing",
    currentMilestone: "Refining pessimistic DB lock release intervals and offline QR validation tokens for student boarding.",
    architectureHighlight: "Atomic boarding transactions to mathematically prevent seat double-allocation under high latency.",
    techStack: ["Spring Boot 3", "Java 21", "PostgreSQL", "Docker", "Flyway"],
    lastSprintUpdate: "Sprint 26.09 // Load-testing pessimistic write locks with JMeter under simulated peak-hour spikes."
  }
];

export default currentlyBuildingItems;