"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Copy,
  FileText,
  Github,
  Hash,
  Linkedin,
  Mail,
  Search,
  SunMoon,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { links, projects } from "@/lib/projects";

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Actions";
  label: string;
  hint?: string;
  Icon: LucideIcon;
  run: () => void;
};

export const OPEN_PALETTE_EVENT = "open-command-palette";
export const TOGGLE_THEME_EVENT = "toggle-theme";

function goToSection(id: string) {
  if (window.location.pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  } else {
    window.location.href = `/#${id}`;
  }
}

const openTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(() => {
    const sections: [string, string][] = [
      ["top", "Home"],
      ["about", "About"],
      ["experience", "Experience"],
      ["showreel", "Certifications"],
      ["projects", "Projects"],
      ["process", "Process"],
      ["github", "GitHub activity"],
      ["contact", "Contact"],
    ];
    return [
      ...sections.map(([id, label]) => ({
        id: `go-${id}`,
        group: "Navigate" as const,
        label,
        hint: "Jump to section",
        Icon: Hash,
        run: () => goToSection(id),
      })),
      ...projects.flatMap((p) => [
        ...(p.caseStudy
          ? [
              {
                id: `case-${p.name}`,
                group: "Projects" as const,
                label: `${p.name}: read the case study`,
                Icon: BookOpen,
                run: () => {
                  window.location.href = p.caseStudy!;
                },
              },
            ]
          : []),
        {
          id: `proj-${p.name}`,
          group: "Projects" as const,
          label: p.liveUrl ? `${p.name}: open live site` : `${p.name}: view source`,
          hint: p.stack.slice(0, 3).join(" · "),
          Icon: ArrowUpRight,
          run: () => openTab(p.liveUrl ?? p.repoUrl),
        },
      ]),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: links.email,
        Icon: Copy,
        run: () => {
          navigator.clipboard
            .writeText(links.email)
            .then(() => setToast("Email copied"))
            .catch(() => setToast("Couldn't copy. Email: " + links.email));
        },
      },
      { id: "email", group: "Actions", label: "Send an email", Icon: Mail, run: () => (window.location.href = `mailto:${links.email}`) },
      { id: "resume", group: "Actions", label: "Open résumé (PDF)", Icon: FileText, run: () => openTab(links.resume) },
      { id: "github", group: "Actions", label: "Open GitHub profile", Icon: Github, run: () => openTab(links.github) },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", Icon: Linkedin, run: () => openTab(links.linkedin) },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        Icon: SunMoon,
        run: () => window.dispatchEvent(new Event(TOGGLE_THEME_EVENT)),
      },
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const words = q.split(/\s+/);
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  // Global shortcut + external open requests
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Reset + focus on open, restore focus and scroll on close
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = prev;
        restoreFocus.current?.focus?.();
      };
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  function runCommand(c: Command | undefined) {
    if (!c) return;
    close();
    // Let the dialog unmount (and body scroll unlock) before navigating/scrolling.
    setTimeout(c.run, 60);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[var(--z-loader)] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[600px] overflow-hidden rounded-[16px] border border-[var(--color-border-strong)] bg-[var(--color-card)] shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)]"
            >
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
                <Search size={17} aria-hidden className="shrink-0 text-[var(--color-muted-foreground)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Search sections, projects, actions…"
                  aria-label="Search commands"
                  aria-controls="palette-results"
                  aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                  role="combobox"
                  aria-expanded="true"
                  className="h-14 w-full bg-transparent text-[15px] text-[var(--color-foreground)] outline-none focus-visible:outline-none placeholder:text-[var(--color-muted-foreground)]"
                />
                <kbd className="hidden shrink-0 rounded-[5px] border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted-foreground)] sm:block">
                  Esc
                </kbd>
              </div>

              <ul id="palette-results" ref={listRef} role="listbox" className="max-h-[min(420px,55vh)] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-10 text-center text-sm text-[var(--color-muted-foreground)]">
                    Nothing matches &ldquo;{query}&rdquo;.
                  </li>
                )}
                {results.map((c, i) => {
                  const header = c.group !== lastGroup ? c.group : null;
                  lastGroup = c.group;
                  return (
                    <li key={c.id} role="presentation">
                      {header && (
                        <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] first:pt-1">
                          {header}
                        </p>
                      )}
                      <div
                        id={`cmd-${c.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => runCommand(c)}
                        className={`flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors ${
                          i === active ? "bg-[var(--color-muted)]" : ""
                        }`}
                      >
                        <c.Icon size={16} aria-hidden className="shrink-0 text-[var(--color-muted-foreground)]" />
                        <span className="min-w-0 flex-1 truncate text-[14px] text-[var(--color-foreground)]">{c.label}</span>
                        {c.hint && (
                          <span className="hidden max-w-[45%] truncate font-mono text-[11px] text-[var(--color-muted-foreground)] sm:block">
                            {c.hint}
                          </span>
                        )}
                        <ArrowRight
                          size={14}
                          aria-hidden
                          className={`shrink-0 text-[var(--color-muted-foreground)] transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] px-4 py-2.5 font-mono text-[10px] text-[var(--color-muted-foreground)]">
                <span>↑ ↓ to move · ↵ to run</span>
                <span>⌘K / Ctrl K anywhere</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[var(--z-loader)] -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-4 py-2 font-mono text-xs text-[var(--color-on-primary)] shadow-lg"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
