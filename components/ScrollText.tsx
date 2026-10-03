"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Paragraph whose words brighten one by one as it scrolls through the
 * viewport. Words wrapped in *asterisks* render in the serif accent.
 * Full text is always in the DOM; reduced motion shows it fully lit.
 */
export default function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accent} reduce={!!reduce}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className={`mr-[0.25em] ${accent ? "serif-accent text-[var(--color-accent)]" : ""}`}>
      <motion.span style={reduce ? undefined : { opacity }}>{children}</motion.span>
    </span>
  );
}
