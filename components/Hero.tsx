import { ArrowDown, ArrowRight } from "lucide-react";
import VisitCounter from "./VisitCounter";
import PortraitCard from "./PortraitCard";
import Magnetic from "./Magnetic";
import { links } from "@/lib/projects";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient backdrop: engineering grid + two slow-drifting glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-drift absolute -left-[10%] top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]" />
        <div className="animate-drift absolute -right-[15%] top-[35%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] [animation-delay:-9s]" />
      </div>

      <div className="container-portfolio grid min-h-[100dvh] grid-cols-1 items-center gap-14 pb-16 pt-32 lg:grid-cols-[1fr_340px] lg:gap-20 lg:pt-36">
        <div>
          <div className="animate-fade-in-up flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-foreground)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute inset-0 rounded-full bg-[var(--color-signal)]" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--color-signal)]" />
              </span>
              Open to roles &amp; freelance builds
            </span>
            <VisitCounter />
          </div>

          <p className="animate-fade-in-up mt-8 font-mono text-xs text-[var(--color-muted-foreground)] [animation-delay:80ms]">
            Raphael Okeke · Full-stack developer
          </p>

          <h1 className="mt-4 text-[clamp(2.6rem,7.2vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--color-foreground)]">
            <span className="line-mask">
              <span className="line-inner [animation-delay:120ms]">I build the whole</span>
            </span>
            <span className="line-mask">
              <span className="line-inner [animation-delay:200ms]">
                product. <span className="serif-accent text-[var(--color-accent)]">Interface,</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner serif-accent [animation-delay:280ms]">API &amp; the model.</span>
            </span>
          </h1>

          <p className="animate-fade-in-up mt-8 max-w-[56ch] text-lg leading-relaxed text-[var(--color-muted-foreground)] [animation-delay:420ms]">
            I take ideas from database schema to pixel-perfect UI, and wire in machine
            learning where it earns its place. Most recently:{" "}
            <a
              href="#work"
              className="text-[var(--color-foreground)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
            >
              ThreatGuard AI
            </a>
            , a security dashboard that scores logs with a trained classifier in real time.
          </p>

          <div className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:520ms]">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] py-2 pl-6 pr-2 text-sm font-medium text-[var(--color-on-primary)] shadow-[0_14px_40px_-14px_rgb(var(--shadow-tint)/0.55)] transition-transform duration-200 active:scale-[0.97]"
              >
                See the case study
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-signal)] text-[var(--color-on-signal)] transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} aria-hidden />
                </span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${links.email}`}
              className="group relative text-sm font-medium text-[var(--color-foreground)]"
            >
              Email me directly
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-[var(--color-foreground)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-0" />
            </a>
          </div>
        </div>

        <div>
          <PortraitCard />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="container-portfolio pb-10">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="group flex w-fit items-center gap-2 font-mono text-[11px] text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <span className="flex h-8 w-5 justify-center rounded-full border border-[var(--color-border-strong)] pt-1.5">
            <ArrowDown size={10} aria-hidden className="animate-bounce" />
          </span>
          Scroll to explore
        </a>
      </div>
    </section>
  );
}
