"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type Verdict = "Safe" | "Suspicious" | "Malicious";
type Row = { id: number; source: string; detail: string; verdict: Verdict; confidence: number };

// Illustrative events modelled on the log types ThreatGuard ingests.
const samples: Omit<Row, "id">[] = [
  { source: "login", detail: "7 failed attempts, new device", verdict: "Malicious", confidence: 0.94 },
  { source: "firewall", detail: "outbound 443, known host", verdict: "Safe", confidence: 0.97 },
  { source: "network", detail: "port 4444, 9.8 KB packets", verdict: "Malicious", confidence: 0.89 },
  { source: "email", detail: "attachment .zip, external sender", verdict: "Suspicious", confidence: 0.71 },
  { source: "cloud", detail: "bucket policy read, IAM role", verdict: "Safe", confidence: 0.92 },
  { source: "login", detail: "off-hours sign-in, VPN disabled", verdict: "Suspicious", confidence: 0.66 },
  { source: "web", detail: "GET /admin, 403 burst", verdict: "Suspicious", confidence: 0.78 },
  { source: "file", detail: "bulk read, 1,204 files", verdict: "Malicious", confidence: 0.86 },
  { source: "user", detail: "session refresh, same IP", verdict: "Safe", confidence: 0.99 },
];

const verdictStyle: Record<Verdict, string> = {
  Safe: "text-[var(--color-ok)] border-[color-mix(in_oklab,var(--color-ok)_40%,transparent)]",
  Suspicious: "text-[var(--color-warn)] border-[color-mix(in_oklab,var(--color-warn)_40%,transparent)]",
  Malicious: "text-[var(--color-destructive)] border-[color-mix(in_oklab,var(--color-destructive)_40%,transparent)]",
};

const VISIBLE = 5;

export default function ThreatFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useSafeReducedMotion();
  const [cursor, setCursor] = useState(VISIBLE);
  const cursorRef = useRef(VISIBLE);
  const [counts, setCounts] = useState<Record<Verdict, number>>({ Safe: 1284, Suspicious: 213, Malicious: 57 });

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      const next = samples[cursorRef.current % samples.length];
      cursorRef.current += 1;
      setCursor(cursorRef.current);
      setCounts((prev) => ({ ...prev, [next.verdict]: prev[next.verdict] + 1 }));
    }, 1400);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const rows: Row[] = Array.from({ length: VISIBLE }, (_, k) => {
    const n = cursor - 1 - k;
    return { id: n, ...samples[n % samples.length] };
  });
  const total = counts.Safe + counts.Suspicious + counts.Malicious;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_40px_80px_-40px_rgb(var(--shadow-tint)/0.5)]"
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
        </div>
        <p className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-[var(--color-destructive)]" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-destructive)]" />
          </span>
          threatguard / live-monitor
        </p>
        <span className="font-mono text-[10px] text-[var(--color-muted-foreground)]">SSE</span>
      </div>

      {/* verdict distribution */}
      <div className="grid grid-cols-3 border-b border-[var(--color-border)]">
        {(Object.keys(counts) as Verdict[]).map((v) => (
          <div key={v} className="border-r border-[var(--color-border)] px-4 py-3 last:border-r-0">
            <p className="font-mono text-[10px] text-[var(--color-muted-foreground)]">{v}</p>
            <p className={`tabular mt-1 text-xl font-semibold tracking-tight ${verdictStyle[v].split(" ")[0]}`}>
              {counts[v].toLocaleString()}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-muted)]">
              <motion.div
                className="h-full rounded-full bg-current"
                style={{ color: `var(--color-${v === "Safe" ? "ok" : v === "Suspicious" ? "warn" : "destructive"})` }}
                animate={{ width: `${(counts[v] / total) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* streaming rows */}
      <ul className="relative h-[17.5rem] overflow-hidden px-2 py-2 font-mono text-[11px]" aria-label="Illustrative stream of classified log events">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row) => (
            <motion.li
              key={row.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: -20, backgroundColor: "var(--color-muted)" }}
              animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,0,0,0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-[8px] px-2.5 py-3"
            >
              <span className="text-[var(--color-muted-foreground)]">{row.source}</span>
              <span className="truncate text-[var(--color-foreground)]">{row.detail}</span>
              <span className="flex items-center gap-2">
                <span className="tabular hidden text-[var(--color-muted-foreground)] sm:inline">
                  p={row.confidence.toFixed(2)}
                </span>
                <span className={`rounded-[5px] border px-1.5 py-0.5 text-[10px] ${verdictStyle[row.verdict]}`}>
                  {row.verdict}
                </span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-card)] to-transparent" />
      </ul>

      <p className="border-t border-[var(--color-border)] px-4 py-2.5 font-mono text-[10px] text-[var(--color-muted-foreground)]">
        Illustrative replay of the dashboard&apos;s live feed. Not real traffic.
      </p>
    </div>
  );
}
