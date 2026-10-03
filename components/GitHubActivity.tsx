"use client";

import { useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { GITHUB_USER, streaks, type ContributionDay, type GitHubActivity as Activity } from "@/lib/github";
import { links } from "@/lib/projects";

const levelColor = [
  "var(--color-muted)",
  "color-mix(in oklab, var(--color-accent) 30%, var(--color-muted))",
  "color-mix(in oklab, var(--color-accent) 55%, var(--color-muted))",
  "color-mix(in oklab, var(--color-accent) 80%, var(--color-muted))",
  "var(--color-accent)",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Splits the day list into Sunday-first week columns, padding the first week. */
function toWeeks(days: ContributionDay[]) {
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

type Tip = { text: string; x: number; y: number } | null;

export default function GitHubActivity() {
  const [data, setData] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<Tip>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => (r.ok ? (r.json() as Promise<Activity>) : Promise.reject()))
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // On narrow screens the grid scrolls sideways; start on the most recent weeks.
  useEffect(() => {
    if (data && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  const weeks = useMemo(() => (data ? toWeeks(data.days) : []), [data]);
  const stats = useMemo(() => {
    if (!data) return null;
    const active = data.days.filter((d) => d.count > 0).length;
    const best = data.days.reduce((a, b) => (b.count > a.count ? b : a), data.days[0]);
    return { active, best, ...streaks(data.days) };
  }, [data]);

  // Month label sits over the first week of each month; a label that would
  // crowd the next one (a month with only a few days showing) is dropped.
  const monthLabels = useMemo(() => {
    let prev = -1;
    const labels = weeks.map((w) => {
      const day = w.find(Boolean);
      if (!day) return "";
      const m = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
      if (m === prev) return "";
      prev = m;
      return MONTHS[m];
    });
    return labels.map((l, i) => (l && (labels[i + 1] || labels[i + 2]) ? "" : l));
  }, [weeks]);

  function showTip(e: PointerEvent<HTMLSpanElement>, day: ContributionDay) {
    const host = gridRef.current?.getBoundingClientRect();
    const cell = e.currentTarget.getBoundingClientRect();
    if (!host) return;
    const n = day.count;
    setTip({
      text: `${n === 0 ? "No" : n} contribution${n === 1 ? "" : "s"} on ${formatDay(day.date)}`,
      x: cell.left - host.left + cell.width / 2,
      y: cell.top - host.top,
    });
  }

  return (
    <section id="github" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">05 / In the commits</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[var(--color-foreground)]">
                Building in public, <span className="serif-accent text-[var(--color-accent)]">one commit at a time.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-muted)] active:scale-[0.97]"
            >
              <Github size={16} aria-hidden />
              @{GITHUB_USER}
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 md:p-8">
            {/* Headline number + supporting stats */}
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div>
                <p className="text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--color-foreground)]">
                  {data ? <CountUp to={data.total} /> : <span className="inline-block h-[0.8em] w-[3ch] animate-pulse rounded-[8px] bg-[var(--color-muted)] align-baseline" />}
                </p>
                <p className="mt-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
                  contributions in the last 12 months
                </p>
              </div>
              {stats && data && (
                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-[11px] sm:grid-cols-4">
                  {[
                    ["Active days", String(stats.active)],
                    ["Longest streak", `${stats.longest} day${stats.longest === 1 ? "" : "s"}`],
                    ["Busiest day", `${stats.best.count} on ${formatDay(stats.best.date).replace(/, \d{4}$/, "")}`],
                    ...(data.publicRepos !== null ? [["Public repos", String(data.publicRepos)]] : []),
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[var(--color-muted-foreground)]">{k}</dt>
                      <dd className="mt-1 text-[var(--color-foreground)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* Heatmap */}
            <div ref={scrollRef} className="mt-10 overflow-x-auto pb-2 [scrollbar-width:thin]">
              <div ref={gridRef} className="relative w-max">
                {failed ? (
                  <p className="py-10 text-[15px] text-[var(--color-muted-foreground)]">
                    Couldn&apos;t load the contribution graph right now.{" "}
                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-foreground)] underline underline-offset-4">
                      See it on GitHub
                    </a>
                    .
                  </p>
                ) : (
                  <div className="flex gap-2">
                    {/* weekday labels */}
                    <div className="grid grid-rows-[16px_repeat(7,var(--cell))] gap-[3px] pr-1 font-mono text-[10px] leading-none text-[var(--color-muted-foreground)] [--cell:13px] md:[--cell:15px]">
                      <span />
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <span key={i} className="flex items-center">
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="[--cell:13px] md:[--cell:15px]">
                      {/* month labels */}
                      <div className="mb-[3px] grid h-4 grid-flow-col gap-[3px] font-mono text-[10px] leading-none text-[var(--color-muted-foreground)] [grid-auto-columns:var(--cell)]">
                        {(data ? monthLabels : Array(53).fill("")).map((m, i) => (
                          <span key={i} className="overflow-visible whitespace-nowrap">
                            {m}
                          </span>
                        ))}
                      </div>

                      <div
                        role="img"
                        aria-label={
                          data && stats
                            ? `GitHub contribution graph: ${data.total} contributions over the last year across ${stats.active} active days.`
                            : "Loading GitHub contribution graph"
                        }
                        onPointerLeave={() => setTip(null)}
                        className="grid grid-flow-col gap-[3px] [grid-auto-columns:var(--cell)] [grid-template-rows:repeat(7,var(--cell))]"
                      >
                        {data
                          ? weeks.map((week, col) =>
                              Array.from({ length: 7 }, (_, row) => {
                                const day = week[row];
                                if (!day) return <span key={`${col}-${row}`} />;
                                return (
                                  <span
                                    key={day.date}
                                    onPointerEnter={(e) => showTip(e, day)}
                                    style={{
                                      backgroundColor: levelColor[day.level],
                                      transitionDelay: inView ? `${col * 14 + row * 22}ms` : "0ms",
                                    }}
                                    className={`rounded-[3px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:outline hover:outline-1 hover:outline-[var(--color-foreground)] ${
                                      inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
                                    }`}
                                  />
                                );
                              })
                            )
                          : Array.from({ length: 53 * 7 }, (_, i) => (
                              <span key={i} className="animate-pulse rounded-[3px] bg-[var(--color-muted)]" />
                            ))}
                      </div>
                    </div>
                  </div>
                )}

                {tip && (
                  <span
                    role="status"
                    style={{ left: tip.x, top: tip.y }}
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-[var(--color-primary)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--color-on-primary)] shadow-lg"
                  >
                    {tip.text}
                  </span>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-5 font-mono text-[11px] text-[var(--color-muted-foreground)]">
              <span>Live from GitHub, refreshed every few hours</span>
              <span className="flex items-center gap-1.5">
                Less
                {levelColor.map((c, i) => (
                  <span key={i} className="h-[11px] w-[11px] rounded-[3px]" style={{ backgroundColor: c }} />
                ))}
                More
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
