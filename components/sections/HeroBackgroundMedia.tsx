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

const VIDEO_LOAD_DELAY_MS = 1800;

export default function HeroBackgroundMedia({
  poster,
  videoSrc,
  enableVideo,
  playbackPaused = false,
}: HeroBackgroundMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    if (!enableVideo) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateAllowVideo = () => {
      setAllowVideo(!mobileQuery.matches);
    };

    updateAllowVideo();
    mobileQuery.addEventListener("change", updateAllowVideo);
    return () => mobileQuery.removeEventListener("change", updateAllowVideo);
  }, [enableVideo]);

  useEffect(() => {
    if (!enableVideo || !allowVideo) return;

    const loadVideo = () => setShouldLoadVideo(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadVideo, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = setTimeout(loadVideo, VIDEO_LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, [allowVideo, enableVideo]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enableVideo || !shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      if (playbackPaused || document.hidden || !isInView) {
        video.pause();
        return;
      }
      void video.play().catch(() => {});
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [enableVideo, isInView, playbackPaused, shouldLoadVideo]);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-[#1a1a1a]">
      <Image
        src={poster}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />

      {enableVideo && allowVideo && shouldLoadVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster.src}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            videoReady && !playbackPaused && isInView ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
