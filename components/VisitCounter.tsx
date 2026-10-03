"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const COUNTER_URL = "https://abacus.jasoncameron.dev/hit/r0ktech-portfolio/visits";

let hasFetchedThisPageLoad = false;

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (hasFetchedThisPageLoad) return;
    hasFetchedThisPageLoad = true;

    let cancelled = false;
    fetch(COUNTER_URL)
      .then((res) => {
        if (!res.ok) throw new Error("counter request failed");
        return res.json() as Promise<{ value: number }>;
      })
      .then((data) => {
        if (!cancelled) setCount(data.value);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-muted-foreground)]">
      <Eye size={13} aria-hidden className="text-[var(--color-accent)]" />
      {count === null ? (
        <span aria-hidden className="inline-block h-2.5 w-24 animate-pulse rounded-full bg-[var(--color-muted)]" />
      ) : (
        <span className="tabular">{count.toLocaleString()} portfolio views</span>
      )}
    </p>
  );
}
