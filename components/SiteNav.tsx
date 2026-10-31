"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { links } from "@/lib/projects";

const nav = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: links.github, label: "GitHub", Icon: Github },
  { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${links.email}`, label: "Email", Icon: Mail },
];

/** Floating white pill. Full width at the top, tucks in to the content column on scroll. */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)] px-3 pt-3 md:px-8 md:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto rounded-[28px] border border-[var(--color-border)] bg-white/90 shadow-[0_6px_24px_-12px_rgb(0_0_0/0.18)] backdrop-blur-md transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "max-w-[980px]" : "max-w-[1376px]"
        }`}
      >
        <div className="flex h-[52px] items-center justify-between pl-2 pr-4">
          <a href="#top" onClick={() => setOpen(false)} aria-label="Raphael Okeke, home" className="shrink-0">
            <span className="block h-11 w-11 overflow-hidden rounded-full bg-[var(--color-signal)] p-[3px]">
              <Image src="/avatar.png" alt="" width={88} height={88} priority className="h-full w-full rounded-full object-cover" />
            </span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-[15px] text-[var(--color-foreground)] transition-opacity hover:opacity-60">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--color-foreground)] transition-opacity hover:opacity-60"
              >
                <Icon size={19} strokeWidth={1.7} aria-hidden />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full md:hidden"
          >
            {open ? <X size={22} strokeWidth={1.7} aria-hidden /> : <Menu size={22} strokeWidth={1.7} aria-hidden />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="space-y-1 border-t border-[var(--color-border)] px-5 py-4">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} onClick={() => setOpen(false)} className="block py-2 text-[17px] text-[var(--color-foreground)]">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex gap-5 border-t border-[var(--color-border)] px-5 py-4">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-[var(--color-foreground)]"
                  >
                    <Icon size={20} strokeWidth={1.7} aria-hidden />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
