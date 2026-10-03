import { ArrowUpRight, FileText, Github, Linkedin } from "lucide-react";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";
import LocalTime from "./LocalTime";
import { links } from "@/lib/projects";

const channels = [
  { label: "GitHub", note: "Source for everything above", href: links.github, Icon: Github },
  { label: "LinkedIn", note: "Roles, references, updates", href: links.linkedin, Icon: Linkedin },
  { label: "Résumé", note: "One page, PDF", href: links.resume, Icon: FileText },
];

export default function Contact() {
  return (
    <section id="contact" className="chapter overflow-hidden border-t border-[var(--color-border)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="animate-drift absolute bottom-[-30%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_60%)]" />
      </div>

      <div className="container-portfolio">
        <Reveal>
          <p className="eyebrow">06 / Let&apos;s build something</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[var(--color-foreground)]">
            Got a product to build? <span className="serif-accent text-[var(--color-accent)]">Let&apos;s talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[52ch] text-lg text-[var(--color-muted-foreground)]">
            Hiring for a full-stack role, or need someone to own a product from schema to
            screen? Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <CopyEmail email={links.email} />
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
              Awka, Nigeria
            </span>
            <span className="text-[var(--color-foreground)]">
              Local time <LocalTime />
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <ul className="border-t border-[var(--color-border)]">
            {channels.map(({ label, note, href, Icon }) => (
              <li key={label} className="border-b border-[var(--color-border)]">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate flex items-center justify-between gap-4 overflow-hidden py-6 md:py-7"
                >
                  {/* fill wipes up from the bottom on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--color-primary)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <span className="flex items-center gap-4 pl-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pl-5 group-hover:text-[var(--color-on-primary)]">
                    <Icon size={20} strokeWidth={1.6} aria-hidden />
                    <span className="text-2xl font-semibold tracking-tight md:text-4xl">{label}</span>
                  </span>
                  <span className="flex items-center gap-4 pr-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pr-5 group-hover:text-[var(--color-on-primary)]">
                    <span className="hidden font-mono text-xs text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-on-primary)]/70 sm:inline">
                      {note}
                    </span>
                    <ArrowUpRight
                      size={22}
                      aria-hidden
                      className="transition-transform duration-500 group-hover:rotate-45"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
