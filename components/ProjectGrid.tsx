import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";
import ProjectPreview from "./ProjectPreview";
import ApiPreview from "./ApiPreview";
import { projects } from "@/lib/projects";

// Zig-zag rhythm: wide/narrow, narrow/wide, wide/narrow…
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];

export default function ProjectGrid() {
  return (
    <section id="projects" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <p className="eyebrow">04 / The range</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[var(--color-foreground)]">
                More things I&apos;ve shipped, <span className="serif-accent text-[var(--color-accent)]">end to end.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-[var(--color-muted-foreground)] lg:text-right">
              Each one is live at its own URL. Hit a preview to load and use the real thing right here,
              not just a screenshot.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={0.06 * (i % 2)} className={spans[i % spans.length]}>
              <Spotlight
                as="article"
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
              >
                {project.liveUrl && project.screenshot ? (
                  <ProjectPreview name={project.name} liveUrl={project.liveUrl} screenshot={project.screenshot} />
                ) : (
                  <ApiPreview name={project.name} />
                )}

                <div className="flex flex-1 flex-col justify-between px-3 pb-3 pt-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-card-foreground)]">
                        {project.name}
                      </h3>
                      <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-[var(--color-muted-foreground)]">
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
                      {project.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
                      {project.stack.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-muted-foreground)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-[var(--color-border)] pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-[13px] font-medium text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                      >
                        Visit live
                        <ArrowUpRight
                          size={14}
                          aria-hidden
                          className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                        <span className="sr-only">: {project.name}</span>
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-4 py-2 text-[13px] font-medium text-[var(--color-foreground)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-muted)] active:scale-[0.97]"
                    >
                      <Github size={14} aria-hidden className="transition-transform duration-300 group-hover/link:rotate-12" />
                      Source
                      <span className="sr-only">: {project.name}</span>
                    </a>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
