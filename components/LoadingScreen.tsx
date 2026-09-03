"use client";

import { useLayoutEffect, useState } from "react";

const PROGRESS_MS = 1100;
const HOLD_MS = 150;
const EXIT_MS = 400;

type Phase = "loading" | "exiting" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // sessionStorage unavailable (private mode, etc.), just play the intro once.
    }

    // Read matchMedia directly rather than through a mount-gated hook: this
    // effect only ever fires client-side, and the loader's initial JSX never
    // branches on the result, so there's no SSR/hydration risk here, just a
    // synchronous check, taken once, before the timers are armed.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || prefersReducedMotion) {
      setPhase("done");
      return;
    }

    const toExit = setTimeout(() => setPhase("exiting"), PROGRESS_MS + HOLD_MS);
    const toDone = setTimeout(() => setPhase("done"), PROGRESS_MS + HOLD_MS + EXIT_MS);
    return () => {
      clearTimeout(toExit);
      clearTimeout(toDone);
    };
    // Only ever needs to run once. Re-evaluating on a later reduced-motion
    // flip mid-intro would restart the gate and isn't worth the complexity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (phase === "done") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-background)] transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
        Welcome
      </p>
      <p className="font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
        RO
      </p>
      <div className="mt-8 h-[2px] w-40 overflow-hidden bg-[var(--color-border)]">
        <div className="animate-loader-fill h-full w-full origin-left bg-[var(--color-accent)]" />
      </div>
    </div>
  );
}
