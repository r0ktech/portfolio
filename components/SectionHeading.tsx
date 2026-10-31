import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** "Portfolio / Selected Work" style heading, with an optional note on the right. */
export default function SectionHeading({
  kicker,
  title,
  note,
}: {
  kicker?: string;
  title: string;
  note?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-end md:gap-10">
      <Reveal>
        {kicker && <p className="text-[22px] leading-tight text-[var(--color-muted-foreground)]">{kicker}</p>}
        <h2 className="text-[clamp(1.75rem,3vw,2.15rem)] text-[var(--color-foreground)]">{title}</h2>
      </Reveal>
      {note && (
        <Reveal delay={0.05}>
          <p className="max-w-[40ch] text-[15px] leading-[1.9] text-[var(--color-muted-foreground)] md:justify-self-end">{note}</p>
        </Reveal>
      )}
    </div>
  );
}
