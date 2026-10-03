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
  const host = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-muted)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        </div>
        <span className="min-w-0 flex-1 truncate rounded-[6px] bg-[var(--color-muted)] px-2.5 py-1 text-center font-mono text-[10px] text-[var(--color-muted-foreground)]">
          {host}
        </span>
        {launched && (
          <div className="flex shrink-0 items-center gap-2 text-[var(--color-muted-foreground)]">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${name} in a new tab`}
              className="transition-colors duration-200 hover:text-[var(--color-foreground)]"
            >
              <ArrowUpRight size={14} aria-hidden />
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
        )}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden">
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
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/preview:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[var(--color-background)]/0 transition-colors duration-500 group-hover/preview:bg-[var(--color-background)]/45" />
            <span className="relative flex translate-y-3 items-center gap-2 rounded-full bg-[var(--color-signal)] py-2 pl-2 pr-4 text-xs font-medium text-[var(--color-on-signal)] opacity-0 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/preview:translate-y-0 group-hover/preview:opacity-100 group-focus-visible/preview:translate-y-0 group-focus-visible/preview:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-on-signal)] text-[var(--color-signal)]">
                <Play size={12} aria-hidden className="ml-0.5" fill="currentColor" />
              </span>
              Try it live, right here
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
              className={`h-full w-full border-0 bg-white transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
            {!loaded && (
              <div className="absolute inset-0 flex flex-col gap-3 bg-[var(--color-muted)] p-5" role="status">
                <span className="h-5 w-1/3 animate-pulse rounded-[6px] bg-[var(--color-border)]" />
                <span className="h-24 w-full animate-pulse rounded-[8px] bg-[var(--color-border)]" />
                <div className="grid grid-cols-3 gap-3">
                  <span className="h-14 animate-pulse rounded-[8px] bg-[var(--color-border)]" />
                  <span className="h-14 animate-pulse rounded-[8px] bg-[var(--color-border)] [animation-delay:150ms]" />
                  <span className="h-14 animate-pulse rounded-[8px] bg-[var(--color-border)] [animation-delay:300ms]" />
                </div>
                <span className="sr-only">Loading live preview…</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
