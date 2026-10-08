"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useSpring, useTransform, type PanInfo } from "framer-motion";
import { useEffect, useState, type PointerEvent } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const chips = [
  { label: "JavaScript", className: "left-2 top-[14%] md:-left-10", delay: "0s" },
  { label: "PostgreSQL", className: "right-2 top-[38%] md:-right-8", delay: "-1.2s" },
  { label: "Next.js", className: "left-2 bottom-[18%] md:-left-8", delay: "-2.4s" },
];

const lanyardText = "RAPHAEL OKEKE ✳ FULL-STACK DEVELOPER ✳ ".repeat(8);

/** True once the intro loader has lifted (layout.tsx sets data-intro on <html> while it plays). */
function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const check = () => !html.hasAttribute("data-intro") && setDone(true);
    check();
    const mo = new MutationObserver(check);
    mo.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
    return () => mo.disconnect();
  }, []);
  return done;
}

/**
 * Portrait as an event badge hanging from a lanyard. After the intro it drops
 * in from above, bounces on the strap and swings to rest around the strap's
 * top. It can be flicked sideways and swings back. Pointer-driven 3D tilt and
 * a sheen stay on the card itself.
 */
export default function PortraitCard() {
  const reduce = useSafeReducedMotion();
  const introDone = useIntroDone();

  // Lanyard physics: drop (y) and pendulum swing (rotate) around the strap top.
  // On desktop the strap runs off the top of the screen, so the pendulum is
  // long: smaller angles and a slower spring keep the card's travel natural.
  const dropY = useMotionValue(-1200);
  const swing = useMotionValue(0);
  const [longStrap, setLongStrap] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLongStrap(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const physics = longStrap
    ? { maxDeg: 4, panDivisor: 70, kick: 4, stiffness: 22, damping: 2.2 }
    : { maxDeg: 18, panDivisor: 9, kick: 26, stiffness: 45, damping: 4 };

  useEffect(() => {
    if (reduce) {
      dropY.set(0);
      swing.set(0);
      return;
    }
    if (!introDone) return;
    const t = setTimeout(() => {
      animate(dropY, 0, { type: "spring", stiffness: 70, damping: 11, mass: 1.1 });
      // A sideways kick on the way down so it swings before settling.
      animate(swing, 0, { type: "spring", stiffness: physics.stiffness, damping: physics.damping, velocity: physics.kick });
    }, 250);
    return () => clearTimeout(t);
    // physics is derived from longStrap; only the first drop matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone, reduce, dropY, swing]);

  function onPan(_: unknown, info: PanInfo) {
    if (reduce) return;
    swing.set(Math.max(-physics.maxDeg, Math.min(physics.maxDeg, info.offset.x / physics.panDivisor)));
  }

  function onPanEnd(_: unknown, info: PanInfo) {
    if (reduce) return;
    animate(swing, 0, {
      type: "spring",
      stiffness: physics.stiffness,
      damping: physics.damping,
      velocity: info.velocity.x / (physics.panDivisor * 3),
    });
  }

  // Card tilt + sheen (unchanged from before, now on the hanging badge).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), spring);
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);
  const sheen = useTransform(
    [sheenX, sheenY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.22), transparent 55%)`
  );

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      style={{ y: dropY, rotate: swing, touchAction: "pan-y" }}
      onPan={onPan}
      onPanEnd={onPanEnd}
      className="relative mx-auto w-full max-w-[340px] origin-top cursor-grab pt-28 active:cursor-grabbing lg:pt-0 lg:[transform-origin:50%_-110vh]"
    >
      {/* Lanyard strap: short on mobile, runs off the top of the hero on desktop */}
      <div aria-hidden className="pointer-events-none absolute bottom-full left-1/2 h-28 -translate-x-1/2 translate-y-28 lg:h-[110vh] lg:translate-y-0">
        <div className="relative mx-auto h-full w-[30px] overflow-hidden bg-[var(--color-signal)] [mask-image:linear-gradient(to_top,black_45%,transparent)] lg:[mask-image:none] shadow-[inset_2px_0_0_rgb(0_0_0/0.12),inset_-2px_0_0_rgb(0_0_0/0.12),0_6px_20px_-8px_rgb(0_0_0/0.5)]">
          <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-semibold tracking-[0.2em] text-[var(--color-on-signal)] [writing-mode:vertical-rl] rotate-180">
            {lanyardText}
          </span>
        </div>
      </div>

      {/* Metal clasp + ring hooking into the badge slot */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-28 z-10 flex -translate-x-1/2 -translate-y-[78%] flex-col items-center lg:top-0">
        <span className="h-6 w-[22px] rounded-[5px] bg-gradient-to-b from-[#f1f1ef] via-[#a9a9a4] to-[#6f6f6a] shadow-[0_2px_4px_rgb(0_0_0/0.35)]" />
        <span className="-mt-1 h-6 w-6 rounded-full border-[3px] border-[#b9b9b4] shadow-[0_2px_3px_rgb(0_0_0/0.3)]" />
      </div>

      <div className="relative [perspective:1000px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[#f4f4f2] shadow-[0_40px_80px_-30px_rgb(var(--shadow-tint)/0.45)]"
        >
          <Image
            src="/raphael-okeke.png"
            alt="Portrait of Raphael Okeke"
            fill
            priority
            draggable={false}
            sizes="(min-width: 1024px) 340px, 80vw"
            className="object-cover object-[50%_30%] grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: sheen }} />

          {/* Punched slot the lanyard clips through */}
          <span
            aria-hidden
            className="absolute left-1/2 top-3 h-3 w-14 -translate-x-1/2 rounded-full bg-[var(--color-background)] shadow-[inset_0_1px_3px_rgb(0_0_0/0.5)] ring-1 ring-black/10"
          />

          {/* Badge name plate */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[10px] border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md">
            <span>
              <span className="block text-[13px] font-semibold leading-tight tracking-tight text-white">Raphael Okeke</span>
              <span className="block font-mono text-[10px] text-white/70">Full-stack developer</span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8f04b]" />
              Awka, NG
            </span>
          </div>
        </motion.div>

        {chips.map((chip) => (
          <span
            key={chip.label}
            aria-hidden
            style={{ animationDelay: chip.delay }}
            className={`animate-bob absolute ${chip.className} rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-foreground)] shadow-[0_10px_30px_-12px_rgb(var(--shadow-tint)/0.4)]`}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
