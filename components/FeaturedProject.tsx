import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import { featuredProject } from "@/lib/projects";

export default function FeaturedProject() {
  return (
    <section id="work" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            03. The proof
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            {featuredProject.name}
          </h2>
          <p className="mt-2 text-lg text-[var(--color-muted-foreground)]">
            {featuredProject.tagline}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-foreground)]">
                Problem
              </h3>
              <p className="mt-3 max-w-[var(--measure)] text-base text-[var(--color-muted-foreground)]">
                {featuredProject.problem}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h3 className="mt-10 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-foreground)]">
                Approach
              </h3>
              <ol className="mt-3 max-w-[var(--measure)] space-y-3">
                {featuredProject.approach.map((step, i) => (
                  <li key={step} className="flex gap-4 text-base text-[var(--color-muted-foreground)]">
                    <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-10 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-foreground)]">
                Result
              </h3>
              <p className="mt-3 max-w-[var(--measure)] text-base text-[var(--color-muted-foreground)]">
                {featuredProject.result}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-card-foreground)]">
                Stack
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {featuredProject.stack.map((item) => (
                  <li
                    key={item}
                    className="cursor-default border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted-foreground)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={featuredProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex cursor-pointer items-center justify-between border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)]"
              >
                <span className="flex items-center gap-2">
                  <Github size={16} aria-hidden />
                  View source
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <a
            href="#projects"
            className="group mt-14 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors duration-200 hover:opacity-80"
          >
            See more of what I&apos;ve shipped
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
