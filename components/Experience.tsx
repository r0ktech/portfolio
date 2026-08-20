import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import { roles, education } from "@/lib/experience";

export default function Experience() {
  return (
    <section id="experience" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            02 — The journey
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            Two years of shipping real code for real teams.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-12">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={0.05 * i}>
                <div className="border-l-2 border-[var(--color-border)] pl-6 transition-colors duration-300 hover:border-[var(--color-accent)]">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]">
                    {role.period}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-foreground)]">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{role.org}</p>
                  <ul className="mt-4 space-y-2">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="max-w-[var(--measure)] text-base text-[var(--color-muted-foreground)]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <GraduationCap size={20} aria-hidden className="text-[var(--color-accent)]" />
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-card-foreground)]">
                Education
              </h3>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--color-card-foreground)]">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{education.school}</p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{education.period}</p>
              <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">{education.detail}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <a
            href="#work"
            className="group mt-14 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors duration-200 hover:opacity-80"
          >
            See what that experience built
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
