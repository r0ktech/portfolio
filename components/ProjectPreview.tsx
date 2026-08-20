"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, X } from "lucide-react";

type ProjectPreviewProps = {
  name: string;
  liveUrl: string;
  screenshot: string;
};

export default function ProjectPreview({ name, liveUrl, screenshot }: ProjectPreviewProps) {
  const [launched, setLaunched] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-muted)]">
      {!launched && (
        <button
          type="button"
          onClick={() => setLaunched(true)}
          aria-label={`Launch interactive preview of ${name}`}
          className="group/preview absolute inset-0 flex cursor-pointer flex-col items-center justify-center"
        >
          <Image
            src={screenshot}
            alt={`Screenshot of ${name}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover/preview:scale-105"
          />
          <div className="absolute inset-0 bg-[var(--color-background)]/40 transition-colors duration-200 group-hover/preview:bg-[var(--color-background)]/55" />
          <span className="relative flex h-14 w-14 items-center justify-center border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-transform duration-200 group-hover/preview:scale-110">
            <Play size={20} aria-hidden className="ml-0.5" />
          </span>
          <span className="relative mt-3 border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)]">
            Launch interactive preview
          </span>
        </button>
      )}

      {launched && (
        <>
          <iframe
            src={liveUrl}
            title={`Live interactive preview of ${name}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-muted)]">
              <span
                aria-hidden
                className="h-8 w-8 animate-spin border-2 border-[var(--color-border)] border-t-[var(--color-accent)]"
              />
              <span className="sr-only">Loading live preview…</span>
            </div>
          )}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-[var(--color-background)]/90 px-3 py-2 text-xs text-[var(--color-muted-foreground)] backdrop-blur">
            <span className="truncate">{name} — live preview</span>
            <div className="flex shrink-0 items-center gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="flex cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-[var(--color-foreground)]"
              >
                Open in new tab
                <ArrowUpRight size={12} aria-hidden />
              </a>
              <button
                type="button"
                onClick={() => {
                  setLaunched(false);
                  setLoaded(false);
                }}
                aria-label="Close live preview"
                className="cursor-pointer transition-colors duration-200 hover:text-[var(--color-foreground)]"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
