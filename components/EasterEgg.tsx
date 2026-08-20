"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import SnakeGame from "./SnakeGame";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const bufferRef = useRef<string[]>([]);

  // Konami-code listener — paused while the game is open so its own arrow
  // key handling doesn't get intercepted here too.
  useEffect(() => {
    if (open) return;

    function handleKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const next = [...bufferRef.current, key].slice(-SEQUENCE.length);
      bufferRef.current = next;
      if (next.length === SEQUENCE.length && next.every((k, i) => k === SEQUENCE[i])) {
        setOpen(true);
        bufferRef.current = [];
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-background)]/80 p-6 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-w-full overflow-auto border border-[var(--color-border)] bg-[var(--color-card)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close game"
          className="absolute right-3 top-3 cursor-pointer text-[var(--color-muted-foreground)] transition-colors duration-200 hover:text-[var(--color-foreground)]"
        >
          <X size={18} aria-hidden />
        </button>

        <p className="mb-4 max-w-[280px] pr-8 font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--color-foreground)]">
          You found the easter egg.
        </p>

        <SnakeGame />

        <p className="mt-4 text-center text-xs text-[var(--color-muted-foreground)]">Esc to close</p>
      </div>
    </div>
  );
}
