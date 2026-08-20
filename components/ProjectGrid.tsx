import { Github } from "lucide-react";
import Reveal from "./Reveal";
import ProjectPreview from "./ProjectPreview";
import { projects } from "@/lib/projects";

export default function ProjectGrid() {
  return (
    <section id="projects" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            04 — The range
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            More things I&apos;ve shipped, end to end.
          </h2>
          <p className="mt-6 max-w-[var(--measure)] text-lg text-[var(--color-muted-foreground)]">
            Each one is live at its own URL — click a preview to load and use the
            real thing right here, not just a screenshot.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={0.05 * (i % 4)}>
              <article className="flex h-full flex-col justify-between border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)]">
                {project.liveUrl && project.screenshot && (
                  <ProjectPreview
                    name={project.name}
                    liveUrl={project.liveUrl}
                    screenshot={project.screenshot}
                  />
                )}

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-card-foreground)]">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <li
                          key={item}
                          className="border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted-foreground)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-border)] pt-4">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors duration-200 hover:text-[var(--color-foreground)]"
                    >
                      <Github
                        size={14}
                        aria-hidden
                        className="transition-transform duration-200 group-hover/link:rotate-12"
                      />
                      Source
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
