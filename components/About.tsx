import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";

const skills = [
  {
    label: "Frontend",
    detail: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
  },
  {
    label: "Backend",
    detail: "Node.js, Express, Prisma, PostgreSQL, REST & SSE APIs",
  },
  {
    label: "ML / Data",
    detail: "Python, FastAPI, scikit-learn, pandas for training and serving models",
  },
  {
    label: "Engineering",
    detail: "Auth & RBAC, Docker, CI-friendly structure, Vercel deploys",
  },
];

export default function About() {
  return (
    <section id="about" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            01. The problem
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            Most products don&apos;t fail because of a bad idea. They fail in the
            gap between design, backend, and data.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[var(--measure)] text-lg text-[var(--color-muted-foreground)]">
            A slow API undermines a good interface. An unvalidated dataset
            undermines a good model. A missing permission check undermines
            everything. I work across the full stack specifically to close
            those gaps myself, rather than hand them off at every seam.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <Reveal key={skill.label} delay={0.05 * i}>
              <div className="relative h-full bg-[var(--color-card)] p-6 transition-colors duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:origin-left before:scale-x-0 before:bg-[var(--color-accent)] before:transition-transform before:duration-200 hover:bg-[var(--color-muted)] hover:before:scale-x-100">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--color-card-foreground)]">
                  {skill.label}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                  {skill.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <SkillsMarquee />
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#experience"
            className="group mt-10 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors duration-200 hover:opacity-80"
          >
            See where that comes from
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
