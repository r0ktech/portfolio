"use client";

import { useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react";

type SpotlightProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "article";
};

/**
 * Writes the pointer position into --mx/--my so the .spotlight CSS can draw a
 * cursor-following glow and illuminated border. No React state, no re-renders.
 */
export default function Spotlight({ as = "div", className = "", onPointerMove, ...rest }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  }

  return <Tag ref={ref} onPointerMove={handleMove} className={`spotlight ${className}`} {...rest} />;
}
