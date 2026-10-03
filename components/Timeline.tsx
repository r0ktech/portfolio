"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/** Vertical rail whose accent fill is drawn by scroll progress through the list. */
export default function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative space-y-14 pl-10">
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--color-border)]" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[var(--color-accent)]"
      />
      {children}
    </ol>
  );
}
