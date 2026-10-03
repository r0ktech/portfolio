import { BrainCircuit, Layers, Server, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import ScrollText from "./ScrollText";
import Spotlight from "./Spotlight";
import SkillsMarquee from "./SkillsMarquee";

const skills = [
  {
    label: "Frontend",
    Icon: Layers,
    detail: "Interfaces that stay fast and readable when real data hits them. Responsive down to 320px, profiled in DevTools.",
    tools: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
    span: "lg:col-span-4",
  },
  {
    label: "Backend",
    Icon: Server,
    detail: "REST APIs with agreed contracts, normalised schemas and indexed queries.",
    tools: ["Node.js", "Express", "Prisma", "PostgreSQL", "MySQL"],
    span: "lg:col-span-2",
  },
  {
    label: "ML / Data",
    Icon: BrainCircuit,
    detail: "Training models and serving them behind an API the product can call.",
    tools: ["Python", "FastAPI", "scikit-learn", "pandas"],
    span: "lg:col-span-2",
  },
  {
    label: "Engineering",
    Icon: ShieldCheck,
    detail: "The unglamorous parts that decide whether a product survives contact with users: auth, permissions, deploys.",
    tools: ["JWT + bcrypt", "Role-based access", "Docker", "Vercel"],
    span: "lg:col-span-4",
  },
];

export default function About() {
  return (
    <section id="about" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          <Reveal>
            <p className="eyebrow">01 / The problem</p>
          </Reveal>

          <div>
            <ScrollText
              className="max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--color-foreground)]"
              text="Most products don't fail because of a bad idea. They fail in the *gap* between design, backend, and data. I work across the full stack to *close* those gaps myself, instead of handing them off at every seam."
            />

            <Reveal delay={0.05}>
              <div className="mt-14 grid grid-cols-1 gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-3">
                {[
                  ["A slow API", "undermines a good interface."],
                  ["An unvalidated dataset", "undermines a good model."],
                  ["A missing permission check", "undermines everything."],
                ].map(([lead, rest], i) => (
                  <p key={lead} className="text-base text-[var(--color-muted-foreground)]">
                    <span className="mb-2 block font-mono text-[11px] text-[var(--color-accent)]">0{i + 1}</span>
                    <span className="text-[var(--color-foreground)]">{lead}</span> {rest}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skills.map((skill, i) => (
            <Reveal key={skill.label} delay={0.06 * i} className={skill.span}>
              <Spotlight className="group flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                    <skill.Icon size={20} strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-muted-foreground)]">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--color-card-foreground)]">{skill.label}</h3>
                  <p className="mt-2 max-w-[48ch] text-[15px] text-[var(--color-muted-foreground)]">{skill.detail}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {skill.tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-muted-foreground)] transition-colors duration-200 group-hover:border-[var(--color-border-strong)] group-hover:text-[var(--color-foreground)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}
