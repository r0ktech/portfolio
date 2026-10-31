import { Download, Mail } from "lucide-react";
import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";
import { links } from "@/lib/projects";

export default function Intro() {
  return (
    <section id="top" className="pt-36 md:pt-44">
      <div className="container-portfolio">
        <Reveal>
          <h1 className="text-[clamp(2.4rem,5vw,3.25rem)] text-[var(--color-foreground)]">
            Hey, I&apos;m Raphael. Software Engineer
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-7 max-w-[40ch] text-[clamp(1.15rem,1.8vw,1.3rem)] leading-[1.6] text-[var(--color-muted-foreground)]">
            I build full-stack products end to end: fast interfaces, reliable APIs and the data behind them.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px] text-[var(--color-secondary)]">
            <a href={`mailto:${links.email}`} className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]">
              <Mail size={14} strokeWidth={1.7} aria-hidden />
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Email me
              </span>
            </a>
            <a href={links.resume} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]">
              <Download size={14} strokeWidth={1.7} aria-hidden />
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Resume
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <SkillsMarquee className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}
