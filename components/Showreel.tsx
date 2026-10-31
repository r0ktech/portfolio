"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { certifications, type Certification } from "@/lib/certifications";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const prints = certifications;
const issuers = [...new Set(certifications.map((c) => c.issuer.split(" ")[0]))];

// Deterministic "random" tilt per print so server and client render the same.
const tilt = (i: number, spread: number) => (((i * 73) % 17) / 16 - 0.5) * 2 * spread;

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

/**
 * Pinned scroll scene: the certificates start as a tidy stack of
 * prints, fan out into an orbit as you scroll, and drift slowly around it
 * while the pitch fades in at the centre.
 */
export default function Showreel() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Certification | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const reduce = useSafeReducedMotion();
  // Progress through the pinned scene, computed from the section's live position.
  // (A target-based useScroll gets offloaded to the browser's scroll timeline for
  // simple opacity links, which misreads this sticky layout.)
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, () => {
    const el = ref.current;
    if (!el) return 0;
    const travel = el.offsetHeight - window.innerHeight;
    return travel > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel)) : 0;
  });

  // Orbit size follows the viewport so the ring always frames the centre text.
  const [orbit, setOrbit] = useState({ rx: 460, ry: 270, card: 210 });
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const card = w < 640 ? 96 : w < 1024 ? 160 : 210;
      setOrbit({
        rx: Math.min(w * 0.5 - card * 0.62, 560),
        ry: Math.min(h * 0.5 - card * 0.62, 300),
        card,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const spread = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);
  const centerY = useTransform(scrollYProgress, [0.42, 0.62], [24, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      id="showreel"
      aria-label="Certifications"
      className={`relative mt-24 ${reduce ? "" : "h-[260vh]"}`}
    >
      <div className={`${reduce ? "relative h-[100dvh]" : "sticky top-0 h-[100dvh]"} overflow-hidden`}>
        {/* faint column guides */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-center gap-[24vw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-full w-px border-l border-dashed border-[var(--color-border)]" />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {prints.map((p, i) => (
            <Print
              key={p.credentialId ?? p.title}
              index={i}
              total={prints.length}
              name={p.title}
              issuer={p.issuer}
              src={p.image}
              background={p.background ?? "#ffffff"}
              onOpen={() => setOpen(p)}
              orbit={orbit}
              spread={spread}
              progress={scrollYProgress}
              reduce={!!reduce}
            />
          ))}

          <motion.div
            style={reduce ? undefined : { opacity: centerOpacity, y: centerY }}
            className="relative z-20 max-w-[min(34rem,78vw)] rounded-[18px] px-5 py-6 text-center max-sm:bg-[color-mix(in_oklab,var(--color-background)_78%,transparent)] max-sm:backdrop-blur-md sm:max-w-[min(34rem,62vw)] sm:p-0"
          >
            <p className="text-[22px] leading-tight text-[var(--color-muted-foreground)]">Credentials</p>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.35rem)] text-[var(--color-foreground)]">Certifications</h2>
            <p className="mx-auto mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              {prints.length} certifications from {issuers.slice(0, -1).join(", ")} and {issuers[issuers.length - 1]}. Tap one to
              view it.
            </p>
          </motion.div>
        </div>

        {!reduce && (
          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-[var(--color-muted-foreground)]"
          >
            Keep scrolling
          </motion.p>
        )}
      </div>

      <AnimatePresence>{open && <Viewer cert={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/** Full-size certificate with its details and verification link. */
function Viewer({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
      onClick={onClose}
      className="fixed inset-0 z-[var(--z-loader)] flex flex-col items-center justify-center gap-5 overflow-y-auto bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <motion.div
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[960px]"
      >
        <div
          className="relative w-full overflow-hidden rounded-[14px] shadow-2xl"
          style={{ aspectRatio: `${cert.width} / ${cert.height}`, background: cert.background ?? "#ffffff", maxHeight: "68vh" }}
        >
          <Image src={cert.image} alt={`${cert.title} certificate from ${cert.issuer}`} fill sizes="960px" className="object-contain" />
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 text-white">
          <div>
            <p className="text-lg font-semibold tracking-tight">{cert.title}</p>
            <p className="mt-1 font-mono text-[11px] text-white/60">
              {cert.issuer} · {cert.issued}
              {cert.expired ? ` · Expired ${cert.expired}` : ""}
              {cert.credentialId ? ` · ID ${cert.credentialId}` : ""}
            </p>
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Verify credential
              <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
        </div>
      </motion.div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close certificate"
        autoFocus
        className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={18} aria-hidden />
      </button>
    </motion.div>
  );
}

function Print({
  index,
  total,
  name,
  issuer,
  background,
  src,
  onOpen,
  orbit,
  spread,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  name: string;
  issuer: string;
  background: string;
  src: string;
  onOpen: () => void;
  orbit: { rx: number; ry: number; card: number };
  spread: MotionValue<number>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Start of the ring at the top, going clockwise.
  const base = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const pos = (s: number, p: number) => {
    const e = ease(s);
    const a = base + p * 0.5; // slow drift around the orbit
    return {
      x: e * Math.cos(a) * orbit.rx + (1 - e) * index * 3,
      y: e * Math.sin(a) * orbit.ry - (1 - e) * index * 3,
    };
  };

  const x = useTransform([spread, progress] as MotionValue<number>[], ([s, p]: number[]) => pos(s, p).x);
  const y = useTransform([spread, progress] as MotionValue<number>[], ([s, p]: number[]) => pos(s, p).y);
  const rotate = useTransform(spread, (s) => tilt(index, 9) * (1 - ease(s)) + tilt(index + 3, 5) * ease(s));

  const still = pos(1, 0.3);
  const number = String(total - index).padStart(2, "0");

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`View ${name} certificate from ${issuer}`}
      style={{
        ...(reduce ? { x: still.x, y: still.y, rotate: tilt(index + 3, 5) } : { x, y, rotate }),
        width: orbit.card,
        zIndex: total - index,
        // px, not %: percentage padding on a positioned box resolves against the whole stage
        padding: `${orbit.card * 0.05}px ${orbit.card * 0.05}px ${orbit.card * 0.15}px`,
      }}
      whileHover={{ scale: 1.08, zIndex: 30, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="absolute block cursor-zoom-in bg-[#f4f1ea] text-left shadow-[0_18px_40px_-14px_rgb(0_0_0/0.55)] ring-1 ring-black/10"
    >
      <span className="relative block aspect-[3/2] overflow-hidden" style={{ background }}>
        <Image src={src} alt={`${name} certificate`} fill sizes="220px" className="object-contain" />
      </span>
      <span className="absolute bottom-[3.5%] left-[5%] right-[5%] flex items-center justify-between font-mono text-[clamp(7px,0.7vw,10px)] uppercase tracking-[0.12em] text-[#6b675e]">
        <span>No. {number}</span>
        <span className="truncate pl-2">{issuer}</span>
      </span>
    </motion.button>
  );
}
