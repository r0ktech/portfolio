import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,7rem)] font-semibold">
        Route <span className="serif-accent text-[var(--color-accent)]">not found</span>
      </h1>
      <p className="mt-6 max-w-md text-[var(--color-muted-foreground)]">
        This URL doesn&apos;t match anything I&apos;ve built. The portfolio itself is one click away.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
