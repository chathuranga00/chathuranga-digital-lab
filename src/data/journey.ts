export type CommitType = "feat" | "fix" | "build" | "refactor" | "milestone" | "chore";

export interface JourneyEntry {
  hash: string;
  date: string;
  type: CommitType;
  message: string;
  detail: string;
  year: number;
}

export interface JourneyYearGroup {
  year: number;
  entries: JourneyEntry[];
}

export const journey: JourneyYearGroup[] = [
  {
    year: 2024,
    entries: [
      {
        hash: "7f4c10a",
        date: "2024-03",
        type: "milestone",
        message: "init: Started studying Computer Science at NSBM Green University",
        detail: "Focused on core programming principles, Object-Oriented Design in Java, Data Structures, Algorithms, and relational database modeling.",
        year: 2024
      },
      {
        hash: "9a2b34d",
        date: "2024-07",
        type: "feat",
        message: "feat(core): Mastered Java OOP, design patterns & MySQL ACID transactions",
        detail: "Engineered desktop and command-line academic systems emphasizing clean architecture, unit testing, and relational database integrity.",
        year: 2024
      },
      {
        hash: "e51c89f",
        date: "2024-11",
        type: "feat",
        message: "feat(web): Built responsive web apps and discussion forums with JavaScript & PHP",
        detail: "Expanded into modern frontend development, DOM manipulation, asynchronous REST client calls, and component-based user interfaces.",
        year: 2024
      }
    ]
  },
  {
    year: 2025,
    entries: [
      {
        hash: "3b8e721",
        date: "2025-02",
        type: "feat",
        message: "feat(backend): Transitioned to enterprise Spring Boot 3 & stateless REST APIs",
        detail: "Implemented Spring Security, stateless JWT authentication filters, database schema versioning, and containerized development environments.",
        year: 2025
      },
      {
        hash: "c49d10e",
        date: "2025-06",
        type: "build",
        message: "build(transit): Architected University Shuttle Management System",
        detail: "Engineered campus transit ecosystem featuring HMAC-SHA256 signed QR boarding validation, student mobile virtual cards, and pessimistic concurrency locks to eliminate double-boarding.",
        year: 2025
      },
      {
        hash: "5f1a92b",
        date: "2025-08",
        type: "feat",
        message: "feat(academic): Mobile Scoring In-Class Practical in Flutter & C++",
        detail: "Engineered real-time ball-by-ball event streaming and over evaluation as a Computer Science university lab practical, exploring Flutter state management and native C++ compilation.",
        year: 2025
      },
      {
        hash: "81f034a",
        date: "2025-10",
        type: "feat",
        message: "feat(ai): Initiated EduPulse AI adaptive revision & exam assistant",
        detail: "Combined React 19, Vite, and NVIDIA NIM LLM inference pipelines with client-side document extraction to automate dynamic quiz generation and student revision curves.",
        year: 2025
      }
    ]
  },
  {
    year: 2026,
    entries: [
      {
        hash: "d29a56c",
        date: "2026-02",
        type: "feat",
        message: "feat(enterprise): Engineered Fitness Sharks Gym Management Suite",
        detail: "Architected full-stack enterprise gym platform with Spring Boot 3.5.6, Java 23, React 18, and MySQL 8 featuring role-based portals (Admin/Member) and secure membership lifecycles.",
        year: 2026
      },
      {
        hash: "107e84b",
        date: "2026-06",
        type: "milestone",
        message: "milestone(portfolio): Built CHATHURANGA.DEV Digital Lab Showcase",
        detail: "Architected an interactive developer showcase with X-ray architecture modal inspection, live command-line terminal emulator, and real system debugging post-mortems.",
        year: 2026
      }
    ]
  }
];

// Flat array helper for linear rendering
export const flatJourney: JourneyEntry[] = journey.flatMap((group) => group.entries);

export default journey;