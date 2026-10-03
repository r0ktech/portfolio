import Image from "next/image";
import { GraduationCap, HeartHandshake } from "lucide-react";
import Reveal from "./Reveal";
import Timeline from "./Timeline";
import Spotlight from "./Spotlight";
import CountUp from "./CountUp";
import { roles, education, volunteering } from "@/lib/experience";

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-white">
      <Image src={src} alt={alt} width={44} height={44} className="h-full w-full object-cover" />
    </span>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">02 / The journey</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[var(--color-foreground)]">
              Shipping real code for <span className="serif-accent text-[var(--color-accent)]">real teams.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] text-[var(--color-muted-foreground)]">
              Two years building client interfaces, then backend work on authenticated APIs,
              alongside a First Class Computer Science degree.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Spotlight className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="flex items-center gap-3">
                <Logo src={education.logo} alt={`${education.school} logo`} />
                <div>
                  <p className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-muted-foreground)]">
                    <GraduationCap size={13} aria-hidden className="text-[var(--color-accent)]" />
                    Education &middot; {education.period}
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-[var(--color-card-foreground)]">
                    {education.degree}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">{education.school}</p>
              <div className="mt-5 flex items-end justify-between border-t border-[var(--color-border)] pt-5">
                <p className="text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--color-foreground)]">
                  <CountUp to={4.65} decimals={2} />
                  <span className="ml-1 text-lg text-[var(--color-muted-foreground)]">/ 5.0</span>
                </p>
                <p className="max-w-[16ch] text-right font-mono text-[11px] leading-snug text-[var(--color-muted-foreground)]">
                  CGPA, First Class Honours (in progress)
                </p>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        <div>
          <Timeline>
            {roles.map((role, i) => (
              <Reveal as="li" key={role.title} delay={0.05 * i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-10 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-background)]"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-[var(--color-accent)]" />
                </span>
                <p className="font-mono text-xs text-[var(--color-accent)]">{role.period}</p>
                <div className="mt-3 flex items-center gap-3">
                  {role.logo ? (
                    <Logo src={role.logo} alt={`${role.org} logo`} />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-muted)] font-mono text-xs font-semibold text-[var(--color-foreground)]">
                      {role.org
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-2xl">
                      {role.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">{role.org}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="relative max-w-[var(--measure)] pl-5 text-[15px] text-[var(--color-muted-foreground)] before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-[var(--color-border-strong)]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal as="li" delay={0.1} className="relative">
              <span
                aria-hidden
                className="absolute -left-10 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-background)]"
              />
              <p className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)]">
                <HeartHandshake size={13} aria-hidden />
                Community &amp; volunteering
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {volunteering.map((v) => (
                  <Spotlight
                    key={v.role}
                    className="flex gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
                  >
                    <Logo src={v.logo} alt={`${v.org} logo`} />
                    <div>
                      <h4 className="font-semibold leading-snug tracking-tight text-[var(--color-foreground)]">{v.role}</h4>
                      <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">{v.org}</p>
                      <p className="mt-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">{v.period}</p>
                    </div>
                  </Spotlight>
                ))}
              </div>
            </Reveal>
          </Timeline>
        </div>
      </div>
    </section>
  );
}
