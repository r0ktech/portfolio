import { ArrowUp } from "lucide-react";
import { links } from "@/lib/projects";

const linkClass =
  "relative pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-foreground)] after:transition-transform after:duration-300 hover:text-[var(--color-foreground)] hover:after:scale-x-100";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="container-portfolio pt-10">
        <div className="flex flex-col items-start justify-between gap-6 font-mono text-xs text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
            <a href={`mailto:${links.email}`} className={linkClass}>
              Email
            </a>
            <a href={links.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Résumé
            </a>
          </div>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]">
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-accent)]">
              <ArrowUp size={12} aria-hidden />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark: outlined, fills with a sweep on hover */}
      <div aria-hidden className="group relative mt-10 select-none px-2 pb-[2vw] text-center">
        <p className="text-outline whitespace-nowrap text-[13.5vw] font-semibold leading-[0.78] tracking-[-0.06em]">
          Raphael Okeke
        </p>
        <p className="absolute inset-x-2 top-0 whitespace-nowrap text-[13.5vw] font-semibold leading-[0.78] tracking-[-0.06em] text-[var(--color-foreground)] [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[clip-path:inset(0_0%_0_0)]">
          Raphael Okeke
        </p>
      </div>

      <div className="container-portfolio flex flex-col justify-between gap-2 py-6 font-mono text-[11px] text-[var(--color-muted-foreground)] sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Raphael Okeke. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
