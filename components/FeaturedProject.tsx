import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import ThreatFeed from "./ThreatFeed";
import Pipeline from "./Pipeline";
import Magnetic from "./Magnetic";
import { featuredProject } from "@/lib/projects";

const stageLabels = ["Data", "Model", "API", "Interface"];

export default function FeaturedProject() {
  return (
    <section id="work" className="chapter overflow-hidden border-t border-[var(--color-border)]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_60%_50%_at_75%_20%,var(--glow),transparent_70%)]" />

      <div className="container-portfolio">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">03 / Case study</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[var(--color-foreground)]">
                ThreatGuard <span className="serif-accent text-[var(--color-accent)]">AI</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[44ch] text-lg text-[var(--color-muted-foreground)]">{featuredProject.tagline}.</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-4 font-mono text-[11px]">
              <div>
                <dt className="text-[var(--color-muted-foreground)]">Scope</dt>
                <dd className="mt-1 text-[var(--color-foreground)]">Full stack + ML</dd>
              </div>
              <div>
                <dt className="text-[var(--color-muted-foreground)]">Model</dt>
                <dd className="mt-1 text-[var(--color-foreground)]">RandomForest, 250 trees</dd>
              </div>
              <div>
                <dt className="text-[var(--color-muted-foreground)]">Training set</dt>
                <dd className="mt-1 text-[var(--color-foreground)]">~15,000 logs, 80/20 split</dd>
              </div>
              <div>
                <dt className="text-[var(--color-muted-foreground)]">Access</dt>
                <dd className="mt-1 text-[var(--color-foreground)]">Admin / Analyst / Viewer</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal y={40}>
            <ThreatFeed />
          </Reveal>

          <div className="space-y-10">
            <Reveal>
              <h3 className="font-mono text-xs text-[var(--color-accent)]">The problem</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-foreground)]">{featuredProject.problem}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="font-mono text-xs text-[var(--color-accent)]">The result</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">{featuredProject.result}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-transform duration-200 active:scale-[0.97]"
                  >
                    <Github size={16} aria-hidden />
                    View the source
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-mono text-xs text-[var(--color-muted-foreground)]">Architecture, end to end</h3>
          <div className="mt-5">
            <Pipeline />
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-xs text-[var(--color-muted-foreground)]">How it was built</h3>
          </Reveal>
          <ol className="mt-6 grid grid-cols-1 border-t border-[var(--color-border)] md:grid-cols-2">
            {featuredProject.approach.map((step, i) => (
              <Reveal
                as="li"
                key={step}
                delay={0.05 * (i % 2)}
                className="group border-b border-[var(--color-border)] py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-semibold leading-none tracking-[-0.04em] text-[var(--color-border-strong)] transition-colors duration-500 group-hover:text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-accent)]">{stageLabels[i]}</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">{step}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {featuredProject.stack.map((item) => (
              <li
                key={item}
                className="cursor-default rounded-full border border-[var(--color-border)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-muted-foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-foreground)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
