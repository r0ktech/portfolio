export type Project = {
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  screenshot?: string;
  /** Path to an in-depth case study page, if there is one. */
  caseStudy?: string;
  /** One line for cards and list rows. */
  tagline: string;
  /** "selected" = big card in Selected Work, "experiment" = row in Small Experiments. */
  tier: "selected" | "experiment";
  /** Real logo in /public/logos/projects, if the product has one. */
  logo?: string;
  /** Fallback lettered tile when there's no logo. */
  tile?: { text: string; bg: string; fg: string };
  /** Featured card tint (only for the featured project). */
  tint?: { bg: string; panel: string };
};

export const projects: Project[] = [
  {
    name: "Trusta",
    tagline: "A marketplace for finding trusted artisans and service pros across Nigeria.",
    tier: "selected",
    logo: "/logos/projects/trusta.svg",
    description:
      "A marketplace for finding reliable artisans and service professionals in Nigeria: search and filter by trade and location, compare profiles, portfolios and reviews, request bookings and message providers, plus a separate provider dashboard. A frontend-only MVP running on sample data, with every action persisted locally.",
    stack: ["React", "Vite", "React Router", "React Hook Form", "Tailwind CSS", "Recharts"],
    repoUrl: "https://github.com/r0ktech/Trusta",
    liveUrl: "https://trusta-ten.vercel.app",
    screenshot: "/screenshots/trusta.png",
  },
  {
    name: "Veyro",
    tagline: "A full-stack tech store on web and mobile with transactional checkout.",
    tier: "selected",
    tile: { text: "v.", bg: "#3b5bfd", fg: "#ffffff" },
    tint: { bg: "#dde3ff", panel: "#e8ecff" },
    description:
      "An online store for laptops, phones and accessories. Products, carts and orders live in Supabase Postgres behind row-level security, checkout runs as one transaction that prices items from the database and locks stock, Google sign-in handles accounts, Mailgun sends order confirmations, and an Expo app shares the same cart in real time.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Google OAuth", "Mailgun", "Expo"],
    repoUrl: "https://github.com/r0ktech/Veyro",
    liveUrl: "https://veyro-kohl.vercel.app",
    screenshot: "/screenshots/veyro.png",
    caseStudy: "/work/veyro",
  },
  {
    name: "PostFit",
    tagline: "Prepares up to 20 images for X carousels, entirely in the browser.",
    tier: "selected",
    logo: "/logos/projects/postfit.svg",
    description:
      "Prepares up to 20 images for X carousel posts, entirely in the browser. Seamless mode splits pictures across slides so a swipe reads as one continuous image, a content-aware smart crop pads text and screenshots instead of cutting them, and a live X preview, JPG/PNG/WebP export and ZIP download finish the job. Nothing is uploaded.",
    stack: ["Next.js", "React", "Canvas API", "JSZip", "dnd-kit", "Tailwind CSS"],
    repoUrl: "https://github.com/r0ktech/PostFit",
    liveUrl: "https://post-fit-sooty.vercel.app",
    screenshot: "/screenshots/postfit.png",
  },
  {
    name: "Knowledge Management System",
    tagline: "A digital archive of Abia State's leadership history and developments.",
    tier: "selected",
    tile: { text: "KM", bg: "#1f4d3a", fg: "#ffffff" },
    description:
      "A digital archive documenting leadership trajectories and historical developments in Abia State, Nigeria: seven-tier role-based access, document approval workflows, interactive timeline and map explorers, analytics dashboards, and a full audit trail.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Leaflet", "Docker"],
    repoUrl: "https://github.com/r0ktech/Web-Based-Knowledge-Management-System",
    liveUrl: "https://web-based-knowledge-management-syst.vercel.app/",
    screenshot: "/screenshots/knowledge-management.png",
  },
  {
    name: "Trackr",
    tagline: "A student finance tracker for income, expenses, budgets and savings.",
    tier: "selected",
    logo: "/logos/projects/trackr.png",
    description:
      "A student finance tracker for managing income, expenses, budgets, and savings goals in one dashboard: CSV export, dark/light mode, local persistence, and automated spending insights.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Recharts"],
    repoUrl: "https://github.com/r0ktech/Trackr",
    liveUrl: "https://trackr-dun-eta.vercel.app",
    screenshot: "/screenshots/trackr.png",
  },
  {
    name: "SkillSwap",
    tagline: "Trade what you can teach for what you want to learn.",
    tier: "experiment",
    logo: "/logos/projects/skillswap.svg",
    description:
      "A skill-bartering platform where people exchange what they can teach for what they want to learn, with profile-based matching plus built-in messaging and scheduling to coordinate swaps.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/r0ktech/Skill-swap",
    liveUrl: "https://skill-swap-nine-virid.vercel.app",
    screenshot: "/screenshots/skillswap.png",
  },
  {
    name: "News Feed",
    tagline: "Live headlines with search, categories, article views and comments.",
    tier: "experiment",
    description:
      "A news aggregation app for browsing live headlines, searching articles, and filtering by category, with detailed article views and an interactive comments feature.",
    stack: ["React", "Vite", "React Router", "NewsAPI"],
    repoUrl: "https://github.com/r0ktech/News-Feed-Page",
    liveUrl: "https://news-feed-ten-umber.vercel.app/",
    screenshot: "/screenshots/news-feed.png",
  },
  {
    name: "Job Application Portal API",
    tagline: "A recruitment REST API with recruiter and applicant roles over MySQL.",
    tier: "experiment",
    description:
      "A RESTful recruitment API over four normalised MySQL tables (users, companies, jobs, applications) with role-based access separating recruiter and applicant permissions across job CRUD and a five-state application status pipeline.",
    stack: ["Node.js", "Express", "MySQL", "JWT"],
    repoUrl: "https://github.com/r0ktech/Job-Application-Portal-Full-Stack-App-",
  },
  {
    name: "Igbo Grammar Checker",
    tagline: "A grammar checker that makes the Igbo language easier to write online.",
    tier: "experiment",
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
