import type { IconType } from "react-icons";
import {
  SiExpress,
  SiFramer,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

type Tool = { name: string; Icon: IconType; color: string };

// Brand colours; marks that ship pure black use the foreground token so they
// stay visible in dark mode.
const fg = "var(--color-foreground)";

const skills: {
  label: string;
  detail: string;
  tools: Tool[];
  span: string;
  wide: boolean;
  Visual: () => ReactNode;
}[] = [
  {
    label: "Frontend",
    detail: "Interfaces that stay fast and readable when real data hits them. Responsive down to 320px, profiled in DevTools.",
    tools: [
      { name: "Next.js", Icon: SiNextdotjs, color: fg },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", Icon: SiFramer, color: fg },
    ],
    span: "lg:col-span-4",
    wide: true,
    Visual: ResponsiveVisual,
  },
  {
    label: "Backend",
    detail: "REST APIs with agreed contracts, normalised schemas and indexed queries.",
    tools: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: fg },
      { name: "Prisma", Icon: SiPrisma, color: fg },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
    ],
    span: "lg:col-span-2",
    wide: false,
    Visual: ApiVisual,
  },
];

/* ---- Card illustrations: small, honest, and animated on card hover ------ */

const frame =
  "relative overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-background)]";

/** A page that reflows from desktop to phone width when the card is hovered. */
function ResponsiveVisual() {
  return (
    <div className={`${frame} flex h-full min-h-[190px] flex-col items-center justify-center p-4`}>
      <div className="w-full max-w-[340px] overflow-hidden rounded-[8px] border border-[var(--color-border-strong)] bg-[var(--color-card)] transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[120px]">
        <div className="flex items-center gap-1 border-b border-[var(--color-border)] px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
        </div>
        <div className="space-y-1.5 p-2">
          <span className="block h-2 w-1/2 rounded-full bg-[var(--color-accent)]" />
          <span className="block h-1.5 w-4/5 rounded-full bg-[var(--color-border-strong)]" />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-8 grow basis-[28%] rounded-[4px] bg-[var(--color-muted)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:basis-full"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-[var(--color-muted-foreground)]">
        <span className="group-hover:hidden">1280px</span>
        <span className="hidden text-[var(--color-accent)] group-hover:inline">320px</span>
        <span> · same layout, reflowed</span>
      </p>
    </div>
  );
}

const requests = [
  { method: "GET", path: "/api/products", status: 200 },
  { method: "POST", path: "/api/orders", status: 201 },
  { method: "GET", path: "/api/orders/:id", status: 401 },
  { method: "PATCH", path: "/api/orders/:id", status: 200 },
];

/** Request log; lines slide in one by one on hover. */
function ApiVisual() {
  return (
    <div className={`${frame} space-y-1.5 p-3 font-mono text-[10.5px]`}>
      {requests.map((r, i) => (
        <div
          key={r.method + r.path}
          style={{ transitionDelay: `${i * 90}ms` }}
          className="flex items-center gap-2 transition-all duration-500 group-hover:translate-x-1"
        >
          <span className="w-10 shrink-0 text-[var(--color-accent)]">{r.method}</span>
          <span className="min-w-0 flex-1 truncate text-[var(--color-foreground)]">{r.path}</span>
          <span
            className={`rounded-[4px] px-1.5 py-px ${
              r.status < 300
                ? "bg-[color-mix(in_oklab,var(--color-ok)_18%,transparent)] text-[var(--color-ok)]"
                : "bg-[color-mix(in_oklab,var(--color-destructive)_18%,transparent)] text-[var(--color-destructive)]"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---- Grid ---------------------------------------------------------------- */

export default function SkillsBento() {
  return (
    <div className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {skills.map(({ label, detail, tools, span, wide, Visual }, i) => (
        <Reveal key={label} delay={0.06 * i} className={`${span} ${wide ? "sm:col-span-2" : ""}`}>
          <Spotlight
            className={`group grid h-full gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-7 ${
              wide ? "md:grid-cols-2 md:grid-rows-[auto_1fr]" : "grid-rows-[auto_auto_1fr]"
            }`}
          >
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-card-foreground)]">{label}</h3>
                <span className="font-mono text-[11px] text-[var(--color-muted-foreground)]">0{i + 1}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">{detail}</p>
            </div>

            <div aria-hidden className={wide ? "md:col-start-2 md:row-span-2 md:row-start-1" : ""}>
              <Visual />
            </div>

            <ul
              className={`flex flex-wrap content-end gap-1.5 ${wide ? "md:col-start-1 md:row-start-2" : ""}`}
              aria-label={`${label} tools`}
            >
              {tools.map(({ name, Icon, color }) => (
                <li
                  key={name}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] py-1 pl-1.5 pr-2.5 text-[12px] text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-border-strong)]"
                >
                  <Icon size={13} aria-hidden style={{ color }} />
                  {name}
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  );
}
