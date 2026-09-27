export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Tools";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  projectIds: string[]; // Linked project ids from projects.ts
  description?: string;
}

export interface CategorizedSkills {
  Languages: SkillItem[];
  Frontend: SkillItem[];
  Backend: SkillItem[];
  Database: SkillItem[];
  Mobile: SkillItem[];
  Tools: SkillItem[];
}

export const skills: CategorizedSkills = {
  Languages: [
    {
      name: "Java",
      category: "Languages",
      projectIds: ["university-shuttle-system", "fitness-sharks"],
      description: "Modern Java (Java 21/23), Object-Oriented Architecture, multithreading, concurrency models, and enterprise backend systems."
    },
    {
      name: "TypeScript",
      category: "Languages",
      projectIds: ["edupulse"],
      description: "Strict static typing, generic interfaces, compile-time safety, and scalable full-stack web applications."
    },
    {
      name: "JavaScript",
      category: "Languages",
      projectIds: ["edupulse", "fitness-sharks"],
      description: "ES6+ asynchronous runtime, DOM manipulation, Promise chains, and client-side web application logic."
    },
    {
      name: "Dart",
      category: "Languages",
      projectIds: ["cricket-score-tracker"],
      description: "Type-safe language for cross-platform Flutter applications, reactive asynchronous streams, and event-driven mobile apps."
    },
    {
      name: "C++",
      category: "Languages",
      projectIds: ["cricket-score-tracker"],
      description: "High-performance computational algorithms, native system bindings, and compiled platform-specific logic."
    },
    {
      name: "SQL",
      category: "Languages",
      projectIds: ["university-shuttle-system", "fitness-sharks", "edupulse"],
      description: "ACID transactions, relational schema design, complex query optimization, indexing, and pessimistic locking."
    }
  ],
  Frontend: [
    {
      name: "React",
      category: "Frontend",
      projectIds: ["edupulse", "fitness-sharks"],
      description: "Modern React (v18 & v19), functional components, custom hooks, SPA architecture, and reactive UI state management."
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      projectIds: ["edupulse"],
      description: "Utility-first design systems, responsive layouts, dark-mode styling, and micro-interaction animations."
    },
    {
      name: "HTML5 & CSS3",
      category: "Frontend",
      projectIds: ["edupulse", "fitness-sharks"],
      description: "Semantic accessible markup, CSS Grid, Flexbox, responsive layouts, and cross-browser styling."
    },
    {
      name: "Vite",
      category: "Frontend",
      projectIds: ["edupulse"],
      description: "Lightning-fast frontend build tooling, rapid HMR feedback loops, and optimized production rollups."
    }
  ],
  Backend: [
    {
      name: "Spring Boot",
      category: "Backend",
      projectIds: ["university-shuttle-system", "fitness-sharks"],
      description: "Enterprise Java framework (v3.x / v3.5.6), Spring MVC, Spring Data JPA, Hibernate ORM, and dependency injection."
    },
    {
      name: "Spring Security & JWT",
      category: "Backend",
      projectIds: ["university-shuttle-system", "fitness-sharks"],
      description: "Stateless security filter chains, BCrypt password hashing, role-based authorization (RBAC), and CORS configuration."
    },
    {
      name: "RESTful APIs",
      category: "Backend",
      projectIds: ["university-shuttle-system", "fitness-sharks", "edupulse", "cricket-score-tracker"],
      description: "Stateless API contract design, standard HTTP verbs, DTO validation, error envelopes, and reverse proxying."
    },
    {
      name: "Supabase & Edge Auth",
      category: "Backend",
      projectIds: ["edupulse"],
      description: "PostgreSQL cloud backend, row-level security (RLS), real-time subscriptions, and token-based client authentication."
    }
  ],
  Database: [
    {
      name: "MySQL 8.0",
      category: "Database",
      projectIds: ["fitness-sharks"],
      description: "Relational database modeling, InnoDB storage engine, foreign key constraints, and transactional consistency."
    },
    {
      name: "PostgreSQL",
      category: "Database",
      projectIds: ["university-shuttle-system", "edupulse"],
      description: "Advanced relational engine, pessimistic row-level locking (FOR UPDATE), ACID guarantees, and JSONB document storage."
    }
  ],
  Mobile: [
    {
      name: "Flutter",
      category: "Mobile",
      projectIds: ["cricket-score-tracker"],
      description: "Cross-platform mobile UI development for Android and iOS, reactive widget trees, and custom match state management."
    },
    {
      name: "Capacitor / Android",
      category: "Mobile",
      projectIds: ["edupulse"],
      description: "Packaging responsive web applications into native Android binaries with device hardware bridge integration."
    }
  ],
  Tools: [
    {
      name: "Git & GitHub",
      category: "Tools",
      projectIds: ["university-shuttle-system", "edupulse", "fitness-sharks", "cricket-score-tracker"],
      description: "Distributed version control, branch management, semantic commit hygiene, and collaborative code reviews."
    },
    {
      name: "Maven",
      category: "Tools",
      projectIds: ["university-shuttle-system", "fitness-sharks"],
      description: "Java build automation, dependency management, multi-module configuration, and deployment packaging."
    },
    {
      name: "Postman",
      category: "Tools",
      projectIds: ["university-shuttle-system", "fitness-sharks", "edupulse"],
      description: "API design testing, automated endpoint validation suites, and mock environment management."
    },
    {
      name: "IntelliJ IDEA & VS Code",
      category: "Tools",
      projectIds: ["university-shuttle-system", "edupulse", "fitness-sharks", "cricket-score-tracker"],
      description: "Full-stack development environments, Java JVM profiling, TypeScript LSP integration, and Flutter tooling."
    }
  ]
};

// Flattened helper list for direct search or filtering
export const allSkills: SkillItem[] = [
  ...skills.Languages,
  ...skills.Frontend,
  ...skills.Backend,
  ...skills.Database,
  ...skills.Mobile,
  ...skills.Tools
];

export default skills;