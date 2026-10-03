const endpoints = [
  { method: "POST", path: "/auth/register", role: "public" },
  { method: "POST", path: "/auth/login", role: "public" },
  { method: "POST", path: "/jobs", role: "recruiter" },
  { method: "PATCH", path: "/jobs/:id", role: "recruiter" },
  { method: "POST", path: "/jobs/:id/apply", role: "applicant" },
  { method: "PATCH", path: "/applications/:id/status", role: "recruiter" },
];

const methodColor: Record<string, string> = {
  GET: "text-[var(--color-ok)]",
  POST: "text-[var(--color-accent)]",
  PATCH: "text-[var(--color-warn)]",
};

/** Stand-in "screenshot" for API-only projects: a route table in a terminal frame. */
export default function ApiPreview({ name }: { name: string }) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        </div>
        <span className="flex-1 truncate text-center font-mono text-[10px] text-[var(--color-muted-foreground)]">
          ~/job-portal-api &middot; routes (simplified)
        </span>
      </div>
      <div
        role="img"
        aria-label={`Route table for ${name}`}
        className="flex aspect-[16/10] flex-col justify-center gap-2 bg-[var(--color-background)] p-5 font-mono text-[11px] sm:text-xs"
      >
        {endpoints.map((e, i) => (
          <div
            key={e.path + e.method}
            className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-dashed border-[var(--color-border)] pb-2 opacity-80 transition-opacity duration-300 last:border-0 group-hover:opacity-100"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className={methodColor[e.method]}>{e.method}</span>
            <span className="truncate text-[var(--color-foreground)]">{e.path}</span>
            <span className="rounded-[4px] bg-[var(--color-muted)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted-foreground)]">
              {e.role}
            </span>
          </div>
        ))}
        <p className="pt-1 text-[var(--color-muted-foreground)]">
          <span className="text-[var(--color-accent)]">$</span> 4 tables &middot; 5-state pipeline
          <span className="animate-caret ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-[var(--color-accent)]" />
        </p>
      </div>
    </div>
  );
}
