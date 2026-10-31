import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
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

export default function SkillsMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`mask-fade-x relative overflow-hidden py-2 ${className}`} aria-label="Tech stack">
      <div className="animate-marquee flex w-max gap-3">
        {[...stack, ...stack].map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            aria-hidden={i >= stack.length || undefined}
            className="group flex shrink-0 items-center gap-2.5 rounded-[12px] bg-white px-4 py-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
          >
            <item.Icon
              size={22}
              aria-hidden
              style={{ color: item.color }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-[15px] text-[var(--color-foreground)]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
