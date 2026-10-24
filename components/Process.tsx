"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const steps = [
  {
    title: "Understand",
    detail: "Who uses it, what they need, and what done looks like. Questions before code.",
  },
  {
    title: "Model",
    detail: "The schema, the API contract and the permissions, agreed before any screen is built.",
  },
  {
    title: "Build",
    detail: "Interface and backend together, shipped in small working slices instead of one big reveal.",
  },
  {
    title: "Test",
    detail: "Real devices, real data, slow networks and edge cases, profiled before it goes out.",
  },
  {
    title: "Ship",
    detail: "Deployed, documented and easy to change, so the next feature is as quick as the first.",
  },
];

/** One row; brightens while it sits in the middle band of the viewport. */
function Step({ index, title, detail }: { index: number; title: string; detail: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useSafeReducedMotion();
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const lit = reduce || active;

  return (
    <li
      ref={ref}
      className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 border-b border-[var(--color-border)] py-8 md:grid-cols-[4rem_1fr_1.2fr] md:items-baseline md:gap-x-8 md:py-10"
    >
      <span
        className={`font-mono text-xs transition-colors duration-500 ${
          lit ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className={`text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold leading-none tracking-[-0.045em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          lit ? "translate-x-0 text-[var(--color-foreground)]" : "translate-x-[-6px] text-[var(--color-muted-foreground)]"
        }`}
      >
        {title}
      </h3>
      <p
        className={`col-start-2 max-w-[46ch] text-[15px] leading-relaxed transition-colors duration-700 md:col-start-3 ${
          lit ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"
        }`}
      >
        {detail}
      </p>
    </li>
  );
}

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">04 — The process</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[var(--color-foreground)]">
              From first question <span className="serif-accent text-[var(--color-foreground)]">to production.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[38ch] text-[var(--color-muted-foreground)]">
              Whether it&apos;s a founder&apos;s first product or a feature for an existing team, the
              steps stay the same.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* scroll-driven progress rail */}
          <span aria-hidden className="absolute -left-4 bottom-0 top-0 hidden w-px bg-[var(--color-border)] md:block" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute -left-4 bottom-0 top-0 hidden w-px origin-top bg-[var(--color-foreground)] md:block"
          />
          <ol ref={listRef} className="border-t border-[var(--color-border)]">
            {steps.map((s, i) => (
              <Step key={s.title} index={i} title={s.title} detail={s.detail} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
