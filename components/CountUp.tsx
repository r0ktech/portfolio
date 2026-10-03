"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useSafeReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className="tabular">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
