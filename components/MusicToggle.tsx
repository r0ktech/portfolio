"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Music only ever starts from an explicit click on the toggle. It never
  // autoplays or unmutes itself, so nobody gets surprised in an open office.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.35;
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted) {
      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/retro-theme.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className="fixed bottom-[4.75rem] right-6 z-[var(--z-float)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-card)_80%,transparent)] backdrop-blur-md shadow-[0_10px_30px_-12px_rgb(var(--shadow-tint)/0.35)] text-[var(--color-foreground)] transition-all duration-300 hover:scale-[1.05] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-muted)] active:scale-[0.95]"
      >
        {isPlaying ? (
          <span aria-hidden className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="animate-eq w-[3px] rounded-full bg-[var(--color-accent)]"
                style={{ animationDelay: `${i * -0.25}s` }}
              />
            ))}
          </span>
        ) : (
          <VolumeX size={17} aria-hidden />
        )}
      </button>
    </>
  );
}
