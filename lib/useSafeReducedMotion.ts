"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * framer-motion's useReducedMotion reads matchMedia synchronously on the
 * client's first render, which is also the hydration render, so when the
 * visitor's OS actually has reduced motion on, that first render disagrees
 * with the server-rendered (always-animated) HTML and React logs a
 * hydration mismatch. Gating on `mounted` keeps the hydration pass
 * identical to the server, then applies the real preference one tick later.
 */
export function useSafeReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? prefersReduced : false;
}
