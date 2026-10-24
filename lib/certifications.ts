export type Certification = {
  title: string;
  issuer: string;
  /** Display date, as shown on LinkedIn (e.g. "Oct 2026"). */
  issued: string;
  /** Set when the credential has lapsed, e.g. "Jul 2026". Shown as "Expired …". */
  expired?: string;
  credentialId?: string;
  verifyUrl?: string;
  /** Certificate image in /public/certifications, with its pixel size. */
  image: string;
  width: number;
  height: number;
  /** Colour behind the image when it doesn't exactly fill the card frame. Defaults to white. */
  background?: string;
  /** Short description of what was assessed. */
  detail?: string;
};

// Newest first. To add one: drop the image in public/certifications/ and add an entry.
export const certifications: Certification[] = [
  {
    title: "Introduction to Agents",
    issuer: "Mercor",
    issued: "Oct 2026",
    credentialId: "MRC-2026-NG2PWVZ5",
    verifyUrl: "https://work.mercor.com/learn/verify/MRC-2026-NG2PWVZ5",
    image: "/certifications/mercor-introduction-to-agents.jpg",
    width: 1418,
    height: 878,
    detail: "Rigor, calibration and clarity in AI agent evaluation.",
  },
  {
    title: "Claude Academy: Claude 101",
    issuer: "Anthropic",
    issued: "Oct 2026",
    credentialId: "89bb8140c2fe29bb4315c710e8b55d06",
    image: "/certifications/anthropic-claude-101.jpg",
    width: 1412,
    height: 962,
    background: "#d97656",
    detail: "Course completion badge from Anthropic's Claude Academy.",
  },
  {
    title: "Claude Academy: Claude Code 101",
    issuer: "Anthropic",
    issued: "Oct 2026",
    credentialId: "69d20b77a5fe1866e8f98a109f7bec84",
    image: "/certifications/anthropic-claude-code-101.jpg",
    width: 1559,
    height: 1062,
    background: "#d97656",
    detail: "Course completion badge for Claude Code, Anthropic's agentic coding tool.",
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    issued: "Sep 2026",
    credentialId: "UC-0361a752-b32e-40ee-9ed3-48f7c7264856",
    verifyUrl: "https://www.udemy.com/certificate/UC-0361a752-b32e-40ee-9ed3-48f7c7264856/",
    image: "/certifications/udemy-full-stack-web-development.jpg",
    width: 1536,
    height: 1130,
    background: "#f8f9fb",
    detail: "A 62-hour bootcamp led by Dr. Angela Yu.",
  },
  {
    title: "Blockchain Basics",
    issuer: "Cyfrin Updraft",
    issued: "Jul 2025",
    expired: "Jul 2026",
    credentialId: "BBCC-03/NSQD2PVLAR",
    image: "/certifications/cyfrin-blockchain-basics.jpg",
    width: 680,
    height: 474,
    background: "#f9fafc",
    detail: "Blockchain Basics course and its completion exam.",
  },
];
