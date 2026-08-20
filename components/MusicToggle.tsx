"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

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
      // localStorage unavailable — just try to autoplay.
    }
    if (turnedOffBefore) return;

    // No browser allows real, audible autoplay without a prior user
    // gesture — that's an enforced platform policy, not something client
    // code can opt out of. Muted autoplay IS always allowed, though, so we
    // start playback silently right away and unmute on the visitor's very
    // first interaction with the page (scroll, click, tap, key press) —
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
        className="fixed bottom-[4.75rem] right-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] transition-all duration-200 hover:scale-[1.05] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)] active:scale-[0.95]"
      >
        {isPlaying ? <Volume2 size={18} aria-hidden /> : <VolumeX size={18} aria-hidden />}
      </button>
    </>
  );
}
