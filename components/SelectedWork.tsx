import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectMark from "./ProjectMark";
import { projects, type Project } from "@/lib/projects";

const selected = projects.filter((p) => p.tier === "selected");
const featured = selected.find((p) => p.tint) ?? selected[0];
const rest = selected.filter((p) => p !== featured);

function RoundLink({ href, label, internal }: { href: string; label: string; internal?: boolean }) {
  const cls =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--color-foreground)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 hover:scale-105";
  const icon = <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />;
  return internal ? (
    <Link href={href} aria-label={label} className={cls}>
      {icon}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
      {icon}
    </a>
  );
}

function SourceLink({ project }: { project: Project }) {
  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} source code`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
    >
      <Github size={17} strokeWidth={1.7} aria-hidden />
    </a>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const tint = project.tint ?? { bg: "#e6d5a8", panel: "#ebdcb4" };
  const primary = project.caseStudy ?? project.liveUrl ?? project.repoUrl;
  return (
    <article
      className="group flex h-full flex-col rounded-[22px] border border-black/5 p-4 pb-6"
      style={{ background: tint.bg }}
    >
      <div className="flex items-center justify-between px-2 pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-black/55">
        <span>Featured project</span>
        <span>01</span>
      </div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-[16px] p-5" style={{ background: tint.panel }}>
        <ProjectMark project={project} size={64} />
        {project.screenshot && (
          <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[10px] shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)] ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
            <Image src={project.screenshot} alt={`${project.name} screenshot`} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover object-top" />
          </div>
        )}
      </div>
      <div className="mt-6 flex items-end justify-between gap-4 px-2">
        <div>
          <h3 className="text-[clamp(2rem,3.5vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] text-[#1d1b17]">{project.name}</h3>
          <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-black/65">{project.tagline}</p>
          {project.caseStudy && (
            <div className="mt-3 flex gap-4 text-[13px] text-black/60">
              <Link href={project.caseStudy} className="underline-offset-4 hover:text-black hover:underline">
                Case study
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-black hover:underline">
                  Live site
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-black hover:underline">
                Source
              </a>
            </div>
          )}
        </div>
        <RoundLink href={primary} internal={!!project.caseStudy} label={`Open ${project.name}`} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full min-h-[240px] flex-col justify-between rounded-[22px] border border-[var(--color-border)] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.25)]">
      <ProjectMark project={project} />
      <div className="mt-10 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-[var(--color-foreground)]">{project.name}</h3>
          <p className="mt-2 max-w-[36ch] text-[14px] leading-relaxed text-[var(--color-muted-foreground)]">{project.tagline}</p>
        </div>
        <div className="flex items-center gap-1">
          <SourceLink project={project} />
          <RoundLink href={project.liveUrl ?? project.repoUrl} label={`Open ${project.name}`} />
        </div>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section id="projects" className="scroll-mt-24 pt-28 md:pt-36">
      <div className="container-portfolio">
        <SectionHeading
          kicker="Portfolio"
          title="Selected Work"
          note="A few products I've designed and built end to end, from storefronts and marketplaces to browser tools."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal className="md:row-span-2">
            <FeaturedCard project={featured} />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={0.05 * (i % 2)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
