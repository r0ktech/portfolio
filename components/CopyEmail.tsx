"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="group relative inline-block break-all text-[clamp(1.4rem,4.4vw,3.5rem)] font-medium leading-tight tracking-[-0.03em] text-[var(--color-foreground)]"
      >
        {email}
        <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="relative flex h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[var(--color-border)] px-4 font-mono text-xs text-[var(--color-foreground)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-muted)] active:scale-[0.96]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {state === "copied" ? (
              <>
                <Check size={14} aria-hidden className="text-[var(--color-accent)]" /> Copied
              </>
            ) : state === "failed" ? (
              <>Copy failed. Select it manually.</>
            ) : (
              <>
                <Copy size={14} aria-hidden /> Copy
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
