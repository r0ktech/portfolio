import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { links } from "@/lib/projects";

export default function Contact() {
  return (
    <section id="contact" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            05 — Let&apos;s build something
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            Got a product to build? I&apos;d like to hear about it.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${links.email}`}
            className="mt-10 inline-flex cursor-pointer items-center gap-3 bg-[var(--color-primary)] px-8 py-4 text-base font-medium text-[var(--color-on-primary)] transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
          >
            <Mail size={18} aria-hidden />
            {links.email}
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-2 border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.98]"
            >
              <Github size={16} aria-hidden />
              GitHub
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-2 border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.98]"
            >
              <Linkedin size={16} aria-hidden />
              LinkedIn
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-2 border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.98]"
            >
              <FileText size={16} aria-hidden />
              Resume
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
