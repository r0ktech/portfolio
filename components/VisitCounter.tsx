"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// A free, key-based hit counter — https://abacus.jasoncameron.dev. No auth
// and no setup on our side; the trade-off is the count lives on a
// third-party service rather than infrastructure we control. Namespaced to
// this portfolio so it isn't shared with anyone else's counter.
const COUNTER_URL = "https://abacus.jasoncameron.dev/hit/r0ktech-portfolio/visits";

// Guards against React StrictMode's dev-only double-invoke of effects,
// which would otherwise count one real page view as two hits.
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
    <p className="inline-flex items-center gap-2 border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-muted-foreground)]">
      <Eye size={14} aria-hidden className="text-[var(--color-accent)]" />
      {count === null ? (
        <span aria-hidden className="inline-block h-3 w-20 animate-pulse bg-[var(--color-muted)]" />
      ) : (
        <span>{count.toLocaleString()} portfolio views</span>
      )}
    </p>
  );
}
