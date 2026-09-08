"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type HeroBackgroundMediaProps = {
  poster: StaticImageData;
  videoSrc: string;
  enableVideo: boolean;
  playbackPaused?: boolean;
};

export default function HeroBackgroundMedia({
  poster,
  videoSrc,
  enableVideo,
  playbackPaused = false,
}: HeroBackgroundMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!enableVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      if (playbackPaused || document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => {});
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [enableVideo, playbackPaused]);

  return (
    <div className="relative h-full w-full bg-[#1a1a1a]">
      <Image
        src={poster}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />

      {enableVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster.src}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            videoReady && !playbackPaused ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
