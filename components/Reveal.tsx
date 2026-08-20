"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
};

/**
 * Scroll-triggered reveal for the "chapter" sections. Content is always in the
 * DOM in reading order — this only animates opacity/position, never mounts
 * content late. Under prefers-reduced-motion it renders the final state with
 * no animation at all, per the storytelling pattern's requirements.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const Tag = as === "section" ? motion.section : motion.div;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
