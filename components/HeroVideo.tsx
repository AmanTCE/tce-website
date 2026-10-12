"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/paths";

type Props = {
  src: string;
  srcSm?: string | null;
  webm?: string | null;
  webmSm?: string | null;
  poster: string;
  label: string;
};

/**
 * Silent, looping background film. Never plays sound. Shows the poster under
 * reduced motion or data-saver, and offers a pause control (WCAG 2.2.2).
 */
export default function HeroVideo({
  src,
  srcSm,
  webm,
  webmSm,
  poster,
  label,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [allowed, setAllowed] = useState(true);
  // Chosen after mount so phones get the lighter file; the poster shows until then.
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduce || saveData) {
      setAllowed(false);
      setPlaying(false);
      return;
    }
    const small = window.innerWidth < 768;
    const h264 =
      document
        .createElement("video")
        .canPlayType('video/mp4; codecs="avc1.640028"') !== "";
    const mp4 = small && srcSm ? srcSm : src;
    const vp9 = small && webmSm ? webmSm : webm;
    setFile(h264 || !vp9 ? mp4 : vp9);
  }, [src, srcSm, webm, webmSm]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !file) return;
    v.muted = true;
    v.load();
    v.play().catch(() => setPlaying(false));
    // Pause while off-screen to save battery.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (playingRef.current) v.play().catch(() => {});
    });
    io.observe(v);
    return () => io.disconnect();
  }, [file]);

  const playingRef = useRef(playing);
  playingRef.current = playing;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-[2]">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          poster={asset(poster)}
          muted
          loop
          playsInline
          autoPlay={allowed}
          preload={allowed ? "auto" : "none"}
          src={file ? asset(file) : undefined}
          aria-label={label}
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
      {allowed && (
        <button
          type="button"
          onClick={toggle}
          className="mono absolute right-[var(--gutter)] top-[calc(var(--header-h)+env(safe-area-inset-top,0px)+0.75rem)] z-[3] inline-flex min-h-[44px] items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
        >
          <span
            aria-hidden="true"
            className="flex h-3 w-3 items-center justify-center"
          >
            {playing ? (
              <span className="flex gap-[3px]">
                <span className="h-3 w-[2px] bg-current" />
                <span className="h-3 w-[2px] bg-current" />
              </span>
            ) : (
              <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
            )}
          </span>
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
