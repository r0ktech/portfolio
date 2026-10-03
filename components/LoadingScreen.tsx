"use client";

import { useLayoutEffect, useRef, useState } from "react";

const PROGRESS_MS = 1300;
const HOLD_MS = 200;
const EXIT_MS = 800;

type Phase = "loading" | "exiting" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // sessionStorage unavailable, show the intro.
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const releaseHero = () => document.documentElement.removeAttribute("data-intro");

    if (seen || prefersReducedMotion) {
      releaseHero();
      setPhase("done");
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PROGRESS_MS);
      // easeInOutCubic so the number lingers at both ends like a real load
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const toExit = setTimeout(() => {
      setPhase("exiting");
      releaseHero();
    }, PROGRESS_MS + HOLD_MS);
    const toDone = setTimeout(() => setPhase("done"), PROGRESS_MS + HOLD_MS + EXIT_MS);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(toExit);
      clearTimeout(toDone);
      releaseHero();
    };
    // Only ever needs to run once.
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

  const exiting = phase === "exiting";

  return (
    <div
      aria-hidden
      data-loader
      className={`fixed inset-0 z-[var(--z-loader)] flex flex-col justify-between bg-[var(--color-background)] p-6 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:p-10 ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-xs text-[var(--color-muted-foreground)]">
        <span>Raphael Okeke</span>
        <span>Portfolio / 2026</span>
      </div>

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          exiting ? "-translate-y-8 opacity-0" : ""
        }`}
      >
        <p className="line-mask text-[clamp(3rem,12vw,10rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-[var(--color-foreground)]">
          <span className="line-inner">Raphael</span>
        </p>
        <p className="line-mask text-[clamp(3rem,12vw,10rem)] leading-[0.9] text-[var(--color-foreground)]">
          <span className="line-inner serif-accent [animation-delay:120ms]">
            Okeke<span className="text-[var(--color-accent)]">.</span>
          </span>
        </p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 overflow-hidden bg-[var(--color-border)]">
          <div className="animate-loader-fill h-full w-full origin-left bg-[var(--color-accent)]" />
        </div>
        <span className="tabular font-mono text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-tight text-[var(--color-foreground)]">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
