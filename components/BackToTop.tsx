"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-[var(--z-float)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-card)_80%,transparent)] backdrop-blur-md shadow-[0_10px_30px_-12px_rgb(var(--shadow-tint)/0.35)] text-[var(--color-foreground)] transition-all duration-300 hover:scale-[1.05] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.95] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={18} aria-hidden />
    </a>
  );
}
