"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

export default function ScrollProgress() {
  const shouldReduceMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="h-[2px] origin-left bg-[var(--color-accent)]"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothed }}
    />
  );
}
