"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

const STORAGE_KEY = "music-off";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    let turnedOffBefore = false;
    try {
      turnedOffBefore = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage unavailable, just try to autoplay.
    }
    if (turnedOffBefore) return;

    // No browser allows real, audible autoplay without a prior user
    // gesture. That's an enforced platform policy, not something client
    // code can opt out of. Muted autoplay IS always allowed, though, so we
    // start playback silently right away and unmute on the visitor's very
    // first interaction with the page (scroll, click, tap, key press):
    // the closest a site can get to "plays automatically."
    audio.muted = true;
    audio.play().catch(() => {});

    function revealSound() {
      audio!.muted = false;
      setIsPlaying(true);
    }

    window.addEventListener("pointerdown", revealSound, { once: true, passive: true });
    window.addEventListener("keydown", revealSound, { once: true });
    window.addEventListener("scroll", revealSound, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", revealSound);
      window.removeEventListener("keydown", revealSound);
      window.removeEventListener("scroll", revealSound);
    };
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
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/retro-theme.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className="fixed bottom-[4.75rem] right-6 z-[var(--z-float)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-card)_80%,transparent)] backdrop-blur-md shadow-[0_10px_30px_-12px_rgb(var(--shadow-tint)/0.35)] text-[var(--color-foreground)] transition-all duration-300 hover:scale-[1.05] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.95]"
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
