import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/projects";

const experiments = projects.filter((p) => p.tier === "experiment");

export default function Experiments() {
  return (
    <section className="pt-28 md:pt-32">
      <div className="container-portfolio">
        <SectionHeading
          kicker="More builds"
          title="Small Experiments"
          note="Smaller tools, APIs and practice projects I've built along the way."
        />

        <ul className="mt-10 border-t border-[var(--color-border-strong)]/60">
          {experiments.map((p, i) => (
            <Reveal as="li" key={p.name} delay={0.03 * i} className="border-b border-[var(--color-border-strong)]/60">
              <a
                href={p.liveUrl ?? p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span className="min-w-0">
                  <span className="block text-[19px] font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">{p.name}</span>
                  <span className="mt-1 block text-[14px] text-[var(--color-muted-foreground)]">{p.tagline}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden
                  className="shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-foreground)]"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
