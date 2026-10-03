const stages = [
  { label: "Logs", detail: "8 sources, ~15k records" },
  { label: "FastAPI + RF", detail: "250-tree classifier" },
  { label: "Express + Prisma", detail: "JWT / RBAC, Postgres" },
  { label: "Next.js", detail: "SOC dashboard, SSE" },
];

/**
 * End-to-end architecture strip. Packets travel the connectors with CSS only,
 * horizontally on desktop and vertically on mobile; frozen under reduced motion.
 */
export default function Pipeline() {
  return (
    <ol className="flex flex-col gap-0 md:flex-row md:items-stretch">
      {stages.map((s, i) => (
        <li key={s.label} className="flex flex-col md:flex-1 md:flex-row md:items-center">
          <div className="flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors duration-300 hover:border-[var(--color-accent)]">
            <p className="font-mono text-[10px] text-[var(--color-accent)]">0{i + 1}</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-[var(--color-foreground)]">{s.label}</p>
            <p className="mt-0.5 font-mono text-[11px] text-[var(--color-muted-foreground)]">{s.detail}</p>
          </div>
          {i < stages.length - 1 && (
            <div aria-hidden className="relative mx-auto h-8 w-px bg-[var(--color-border-strong)] md:mx-0 md:h-px md:w-8">
              <span
                className="animate-travel-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] md:hidden"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <span
                className="animate-travel-x absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-accent)] md:block"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
