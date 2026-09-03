import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiGit,
  SiPostgresql,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiTailwindcss,
  SiWordpress,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

// Official Simple Icons brand colors. Next.js, Express, and Vercel ship as
// pure black marks, which would vanish on the dark theme's near-black
// background, so those three use the foreground token instead of a literal
// hex, letting them invert to white in dark mode like the rest of the UI.
const stack: { name: string; Icon: IconType; color: string }[] = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "var(--color-foreground)" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "var(--color-foreground)" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Vercel", Icon: SiVercel, color: "var(--color-foreground)" },
];

export default function SkillsMarquee() {
  return (
    <div
      className="relative mt-16 overflow-hidden border-y border-[var(--color-border)] py-8"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max gap-16">
        {[...stack, ...stack].map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="group flex shrink-0 flex-col items-center gap-3"
          >
            <item.Icon
              size={32}
              aria-hidden
              style={{ color: item.color }}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-muted-foreground)]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
