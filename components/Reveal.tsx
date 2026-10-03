"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
  y?: number;
};

/**
 * Scroll-triggered reveal for the "chapter" sections. Content is always in the
 * DOM in reading order, this only animates opacity/position/blur, never mounts
 * content late. Under prefers-reduced-motion it renders the final state with
 * no animation at all.
 */
export default function Reveal({ children, className, delay = 0, as = "div", y = 28 }: RevealProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const Tag = as === "section" ? motion.section : as === "li" ? motion.li : motion.div;

  if (shouldReduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
