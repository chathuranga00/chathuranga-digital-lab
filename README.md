# CHATHURANGA // DIGITAL LAB (Portfolio Platform)

> A modern, engineering-first digital laboratory and developer portfolio for **Chathuranga Sandaruwan** (Computer Science Student at NSBM Green University & Full Stack Developer). Engineered with a high-performance dark aesthetic, interactive architecture blueprints, an interactive CLI terminal emulator, live GitHub telemetry, and Git commit history tracking.

---

## 🚀 Quick Start & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Development

1. **Clone or Navigate to the Project Root**:
   ```bash
   cd "Q:\MY Projects\New folder (2)"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Production Build & Preview**:
   ```bash
   npm run build
   npm run preview
   ```
   *Note: Vite is configured with code-splitting (`vendor`, `motion`, `icons`), generating optimized chunks and fast load times.*

---

## 📁 Project Architecture & Folder Structure

```text
├── index.html                    # Root HTML template with SEO tags & font preconnects
├── vite.config.ts                # Vite config with manual chunking & path aliases
├── tailwind.config.js            # Tailwind theme tokens (colors, fonts, glassmorphism)
├── tsconfig.json                 # TypeScript strict compiler configuration
├── src/
│   ├── main.tsx                  # React 19 root bootstrap
│   ├── App.tsx                   # Master lab layout & state orchestrator
│   ├── index.css                 # Tailwind directives, CSS variables, & custom scrollbars
│   │
│   ├── components/               # Specialized UI modules
│   │   ├── Hero.tsx              # System boot landing screen with magnetic CTA
│   │   ├── Navbar.tsx            # Floating glassmorphic navigation with mobile drawer
│   │   ├── Identity.tsx          # IDENTITY.EXE bio terminal & portrait module
│   │   ├── Universe.tsx          # Interactive constellation graph (mobile accordion)
│   │   ├── Projects.tsx          # Architectural lab experiment cards
│   │   ├── ProjectViewer.tsx     # Full-screen X-ray architectural blueprint modal
│   │   ├── BugArchive.tsx        # Incident post-mortems & debugging reports
│   │   ├── EngineeringMindset.tsx# 8-stage methodology pipeline (Problem → Improve)
│   │   ├── TechStack.tsx         # Categorized tool grid with project usage popovers
│   │   ├── CurrentlyBuilding.tsx # Live sprint dispatch panel (no fake percentages)
│   │   ├── Journey.tsx           # Vertical Git commit history timeline
│   │   ├── GitHub.tsx            # Client-side GitHub REST API integration
│   │   ├── Contact.tsx           # "ESTABLISH CONNECTION" terminal & direct channels
│   │   ├── Terminal.tsx          # Interactive CLI with real parser & typing effect
│   │   ├── DeveloperMode.tsx     # Ctrl+Shift+D technical grid overlay & HUD
│   │   └── LabChrome.tsx         # Ambient scroll progress, clock, & status indicators
│   │
│   ├── data/                     # Strictly typed data sources
│   │   ├── siteConfig.ts         # Developer credentials, bio, links, and version
│   │   ├── projects.ts           # Full X-ray project blueprints & concurrency notes
│   │   ├── skills.ts             # Categorized tech stack & cross-project relationships
│   │   ├── bugs.ts               # Production post-mortems (Problem → Solution)
│   │   ├── journey.ts            # Git commit timeline milestones by release epoch
│   │   └── currentlyBuilding.ts  # Active sprint initiatives & pipeline states
│   │
│   └── hooks/
│       └── useMotionConfig.ts    # Centralized prefers-reduced-motion animation hook
```

---

## 📝 Content Configuration Guide (Where to Edit)

All portfolio content is decoupled from components and stored cleanly in `src/data/`:

| File | Content Controlled |
| :--- | :--- |
| **`src/data/siteConfig.ts`** | Name, role, email, phone, location, GitHub username, LinkedIn URL, and build version. |
| **`src/data/projects.ts`** | Project titles, subtitles, statuses, tech stacks, and in-depth X-ray specifications (Problem, Idea, Architecture Notes, Concurrency Challenges, Solutions, Lessons). |
| **`src/data/bugs.ts`** | Engineering incident post-mortems (`BUG #001`, etc.) with problem descriptions, investigation checklists, solutions, and architectural lessons. |
| **`src/data/journey.ts`** | Git commit history milestones categorized by year (`2024`, `2025`, `2026`) and commit types (`milestone`, `feat`, `build`, `refactor`). |
| **`src/data/currentlyBuilding.ts`** | Active sprint pipeline items with real architectural invariants (no fake percentages). |
| **`src/data/skills.ts`** | Categorized technical competencies and cross-project links. |

---

## 📍 Important Placeholders to Know

1. **LinkedIn Profile URL**:
   - Configured in: [`src/data/siteConfig.ts`](src/data/siteConfig.ts) (`linkedinUrl`)
   - Current value: `https://www.linkedin.com/in/chathuranga-sandaruwan-44b054365`

2. **Professional Portrait Photo**:
   - Configured in: [`src/components/Identity.tsx`](src/components/Identity.tsx)
   - Search for: `/* REPLACE: professional portrait image */`
   - Replace the placeholder image URL with your actual professional headshot image path.

3. **Project Result Screenshots**:
   - In [`src/data/projects.ts`](src/data/projects.ts), each project has a `screenshots: []` array.
   - When project screenshots are ready, add the image URLs or local paths to this array; the modal will automatically render an image showcase instead of the default placeholder.

4. **Real Bug Reports**:
   - Pre-populated with real concurrency and architecture incidents (Pessimistic DB deadlocks, JWT clock skews, Memory leaks) in [`src/data/bugs.ts`](src/data/bugs.ts). Update with additional real incidents as they arise.

---

## ⚡ Special Interactive Features

- **Interactive CLI Terminal**:
  - Open via the bottom-right **`CLI // LAB`** button or the **`ESC`** key.
  - Supports commands: `help`, `about`, `projects`, `open <project-id>`, `skills`, `mindset`, `building`, `journey`, `github`, `linkedin`, `contact`, and `clear`.
  - Easter Egg: Type `sudo chathuranga` to authenticate root privileges.
- **Developer Mode**:
  - Global shortcut **`Ctrl+Shift+D`** (or **`Cmd+Shift+D`**) toggles an engineering viewport grid overlay and real-time telemetry HUD.
- **Full-Screen X-Ray Project Viewer**:
  - Click any experiment card (or type `open <project-id>` in the terminal) to open the deep architectural breakdown with SVG flow diagrams, challenges, and concurrency solutions.
- **Ambient Telemetry HUD**:
  - Features a live clock, dynamic scroll-progress bar, active section tracker, and nominal system status indicators.
- **Accessibility & Motion**:
  - Fully navigable via keyboard (<kbd>Tab</kbd>, <kbd>Arrow keys</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>).
  - Honors `prefers-reduced-motion` across all animations and transitions.