"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useSafeReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? prefersReduced : false;
}
