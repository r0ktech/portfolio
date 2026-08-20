"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import ScrollProgress from "./ScrollProgress";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [activeId, setActiveId] = useState<string>("about");
  const shouldReduceMotion = useSafeReducedMotion();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur">
      <nav className="container-portfolio flex h-16 items-center justify-between">
        <a
          href="#top"
          className="cursor-pointer font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight text-[var(--color-foreground)] transition-colors duration-200"
        >
          Raphael Okeke
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative cursor-pointer pb-1 text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform after:duration-200 hover:text-[var(--color-foreground)] hover:after:scale-x-100 ${
                    isActive
                      ? "text-[var(--color-foreground)] after:scale-x-100"
                      : "text-[var(--color-muted-foreground)]"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="cursor-pointer overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] p-2 text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.05] hover:bg-[var(--color-muted)] active:scale-[0.95]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="block"
              >
                <Sun size={16} aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="block"
              >
                <Moon size={16} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <ScrollProgress />
    </header>
  );
}
