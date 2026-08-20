export type Role = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

export const roles: Role[] = [
  {
    title: "Backend Developer Intern",
    org: "Apex Technology Hub & Services Limited, Awka",
    period: "Sep 2025 – Nov 2025",
    points: [
      "Built and maintained RESTful APIs in Node.js and Express, agreeing request/response contracts with the frontend team up front to eliminate integration rework.",
      "Implemented JWT and bcrypt authentication across protected routes — token issuance, session validation, and secure password storage.",
      "Designed relational schemas and optimised SQL queries for full CRUD functionality, indexing frequently filtered columns to keep read times stable as data grew.",
    ],
  },
  {
    title: "Frontend Developer",
    org: "Elegant Computers",
    period: "Aug 2021 – Sep 2023",
    points: [
      "Translated design mockups into responsive, cross-browser interfaces across a range of client-facing web projects.",
      "Built a reusable React component set with hooks-based state management, shortening build time on each new page.",
      "Implemented mobile-first layouts verified down to 320px width, and profiled page performance in Chrome DevTools to cut render-blocking requests.",
    ],
  },
];

export const education = {
  degree: "B.Sc. Computer Science",
  school: "Nnamdi Azikiwe University, Awka",
  period: "Expected Aug 2027",
  detail: "CGPA 4.41 / 5.0 — First Class Honours (in progress).",
};
