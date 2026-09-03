export type Project = {
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  screenshot?: string;
};

export const featuredProject = {
  name: "ThreatGuard AI",
  tagline: "Machine learning threat intelligence for big-data security",
  description:
    "An enterprise-style cybersecurity dashboard that ingests security logs (firewall, network, login, email, web, cloud, file-access, user-activity), scores every record with a trained RandomForestClassifier, and surfaces the results as live threat intelligence: dashboards, geo attack maps, ML performance metrics, alerting, and downloadable PDF/CSV reports.",
  problem:
    "Security teams drown in log volume long before they can act on it. Raw firewall and network events carry signal, but turning that signal into a Safe / Suspicious / Malicious call, fast enough to matter, means owning the full path from ingestion to inference to the analyst's screen.",
  approach: [
    "Generated ~15,000 label-conditioned synthetic security logs so the model learns real attack signal (failed logins, unusual ports, packet size, VPN state) rather than noise.",
    "Trained a scikit-learn pipeline (one-hot encoding + a 250-tree RandomForestClassifier) on an 80/20 stratified split, and shipped it behind a FastAPI service exposing /predict, /predict/batch, and /metrics.",
    "Built the Node/Express API layer to persist every prediction to PostgreSQL via Prisma, enforce JWT auth with role-based access (Admin / Analyst / Viewer), and stream live-traffic scoring over SSE.",
    "Shipped the Next.js dashboard: threat detection, live monitoring feed, ML performance charts (confusion matrix, ROC/AUC, feature importance), geo attack maps, alerting, and PDF/CSV reporting.",
  ],
  stack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "shadcn/ui",
    "Framer Motion",
    "Node.js / Express",
    "Prisma / PostgreSQL",
    "FastAPI",
    "scikit-learn",
  ],
  result:
    "A working full-stack + ML systems prototype: JWT/RBAC-secured API, a trained classifier serving real-time predictions, and a SOC-style interface (including a live command palette and a rule-based threat assistant) built on live backend data end to end.",
  repoUrl: "https://github.com/r0ktech/Threat-Guard",
} satisfies {
  name: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string[];
  stack: string[];
  result: string;
  repoUrl: string;
};

export const projects: Project[] = [
  {
    name: "Knowledge Management System",
    description:
      "A digital archive documenting leadership trajectories and historical developments in Abia State, Nigeria: seven-tier role-based access, document approval workflows, interactive timeline and map explorers, analytics dashboards, and a full audit trail.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Leaflet", "Docker"],
    repoUrl: "https://github.com/r0ktech/Web-Based-Knowledge-Management-System",
    liveUrl: "https://web-based-knowledge-management-syst.vercel.app/",
    screenshot: "/screenshots/knowledge-management.png",
  },
  {
    name: "Trackr",
    description:
      "A student finance tracker for managing income, expenses, budgets, and savings goals in one dashboard: CSV export, dark/light mode, local persistence, and automated spending insights.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Recharts"],
    repoUrl: "https://github.com/r0ktech/Trackr",
    liveUrl: "https://trackr-dun-eta.vercel.app",
    screenshot: "/screenshots/trackr.png",
  },
  {
    name: "SkillSwap",
    description:
      "A skill-bartering platform where people exchange what they can teach for what they want to learn, with profile-based matching plus built-in messaging and scheduling to coordinate swaps.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/r0ktech/Skill-swap",
    liveUrl: "https://skill-swap-nine-virid.vercel.app",
    screenshot: "/screenshots/skillswap.png",
  },
  {
    name: "News Feed",
    description:
      "A news aggregation app for browsing live headlines, searching articles, and filtering by category, with detailed article views and an interactive comments feature.",
    stack: ["React", "Vite", "React Router", "NewsAPI"],
    repoUrl: "https://github.com/r0ktech/News-Feed-Page",
    liveUrl: "https://news-feed-ten-umber.vercel.app/",
    screenshot: "/screenshots/news-feed.png",
  },
  {
    name: "Job Application Portal API",
    description:
      "A RESTful recruitment API over four normalised MySQL tables (users, companies, jobs, applications) with role-based access separating recruiter and applicant permissions across job CRUD and a five-state application status pipeline.",
    stack: ["Node.js", "Express", "MySQL", "JWT"],
    repoUrl: "https://github.com/r0ktech/Job-Application-Portal-Full-Stack-App-",
  },
  {
    name: "Igbo Grammar Checker",
    description:
      "A web-based tool for checking grammar in the Igbo language, built to make a low-resource language easier to write correctly online.",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/r0ktech/Igbo-Grammar-Checker",
    liveUrl: "https://igbo-grammar-checker.vercel.app",
    screenshot: "/screenshots/igbo-grammar-checker.png",
  },
];

export const links = {
  github: "https://github.com/r0ktech",
  linkedin: "https://www.linkedin.com/in/r0ktech",
  email: "raphaelokeke002@gmail.com",
  resume: "/Raphael-Okeke-Resume.pdf",
};
