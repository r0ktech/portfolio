import Image from "next/image";
import { ArrowDown } from "lucide-react";
import VisitCounter from "./VisitCounter";

export default function Hero() {
  return (
    <section
      id="top"
      className="container-portfolio grid min-h-[100svh] grid-cols-1 items-center gap-16 pt-16 lg:grid-cols-[1fr_320px]"
    >
      <div>
        <div className="animate-fade-in-up mb-6">
          <VisitCounter />
        </div>

        <p
          className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] [animation-delay:50ms]"
        >
          Full Stack Developer
        </p>

        <h1
          className="animate-fade-in-up max-w-4xl font-[family-name:var(--font-heading)] text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--color-foreground)] [animation-delay:100ms]"
        >
          Raphael Okeke
        </h1>

        <p
          className="animate-fade-in-up mt-6 max-w-[var(--measure)] text-lg text-[var(--color-muted-foreground)] sm:text-xl [animation-delay:150ms]"
        >
          Full-Stack Developer | JavaScript, React, Next.js, Node.js, Express,
          MySQL, Tailwind CSS, WordPress Dev | Building scalable web
          applications and seamless user experiences with clean, efficient,
          and maintainable code.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-4 [animation-delay:200ms]">
          <a
            href="#work"
            className="cursor-pointer bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="cursor-pointer border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.98]"
          >
            Get in touch
          </a>
        </div>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="group mt-16 flex w-fit cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:text-[var(--color-foreground)]"
        >
          Scroll
          <ArrowDown
            size={14}
            aria-hidden
            className="animate-bounce transition-transform duration-200 group-hover:translate-y-1"
          />
        </a>
      </div>

      <div className="animate-fade-in-up group relative aspect-square w-full max-w-[320px] justify-self-center overflow-hidden border border-[var(--color-border)] lg:justify-self-end [animation-delay:100ms]">
        <Image
          src="/raphael-okeke.png"
          alt="Portrait of Raphael Okeke"
          fill
          priority
          sizes="320px"
          className="object-cover grayscale transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </section>
  );
}
