"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import ScrollProgress from "./ScrollProgress";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { links } from "@/lib/projects";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Case study" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [activeId, setActiveId] = useState<string>("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide while reading downward, return on any upward scroll.
    setHidden(y > prev && y > 400 && !menuOpen);
  });

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
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    for (const s of [{ id: "top" }, ...sections]) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease }}
        className="fixed inset-x-0 top-0 z-[var(--z-nav)] px-3 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-[var(--container)] items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-500 ${
            scrolled || menuOpen
              ? "border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_72%,transparent)] shadow-[0_8px_30px_-12px_rgb(var(--shadow-tint)/0.25),inset_0_1px_0_0_rgb(255_255_255/0.04)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[var(--color-foreground)]"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-[8px] bg-[var(--color-primary)] text-[11px] font-bold text-[var(--color-on-primary)] transition-transform duration-300 group-hover:rotate-[-8deg]">
              RO
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--color-signal)] ring-2 ring-[var(--color-background)]" />
            </span>
            <span className="hidden sm:inline">Raphael Okeke</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id} className="relative">
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-on-primary)]"
                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    }`}
                  >
                    {s.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full text-[var(--color-foreground)] transition-all duration-200 hover:bg-[var(--color-muted)] active:scale-[0.92]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme === "dark" ? "sun" : "moon"}
                  initial={shouldReduceMotion ? false : { y: 14, rotate: -60, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { y: -14, rotate: 60, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="block"
                >
                  {theme === "dark" ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1 rounded-full bg-[var(--color-signal)] px-4 py-2 text-[13px] font-medium text-[var(--color-on-signal)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] sm:flex"
            >
              Résumé
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[var(--color-muted)] md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-[var(--color-foreground)] transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-[var(--color-foreground)] transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>

        <div className="mx-auto mt-1 max-w-[var(--container)] overflow-hidden rounded-full px-6">
          <ScrollProgress />
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[calc(var(--z-nav)-1)] flex flex-col justify-between bg-[var(--color-background)] px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-1">
              {sections.map((s, i) => (
                <li key={s.id} className="overflow-hidden">
                  <motion.a
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={shouldReduceMotion ? false : { y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease }}
                    className="flex items-baseline gap-4 py-1 text-[2.6rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--color-foreground)]"
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-[var(--color-accent)]">
                      0{i + 1}
                    </span>
                    {s.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-6 font-mono text-xs text-[var(--color-muted-foreground)]"
            >
              <a href={links.resume} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)]">
                Résumé ↗
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)]">
                GitHub ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)]">
                LinkedIn ↗
              </a>
              <a href={`mailto:${links.email}`} className="hover:text-[var(--color-foreground)]">
                Email ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
