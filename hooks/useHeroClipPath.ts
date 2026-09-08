"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import { buildHeroPath, getHeroMetrics, type HeroMetrics } from "@/lib/hero";

type HeroLayout = {
  metrics: HeroMetrics;
  path: string;
};

function computeLayout(width: number, height: number): HeroLayout {
  const safeWidth = Math.max(width, 1);
  const safeHeight = Math.max(height, 1);
  const metrics = getHeroMetrics(safeWidth);

  return {
    metrics,
    path: buildHeroPath(
      safeWidth,
      safeHeight,
      metrics.notchWidth,
      metrics.notchHeight,
      metrics.radius,
    ),
  };
}

function layoutsEqual(a: HeroLayout, b: HeroLayout) {
  return a.path === b.path;
}

export function useHeroClipPath(frameRef: RefObject<HTMLElement | null>) {
  const [layout, setLayout] = useState<HeroLayout | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let rafId = 0;

    const update = () => {
      const { width, height } = frame.getBoundingClientRect();
      if (width < 1 || height < 1) return;

      setLayout((current) => {
        const next = computeLayout(width, height);
        if (current && layoutsEqual(current, next)) return current;
        return next;
      });
    };

    update();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    });
    observer.observe(frame);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [frameRef]);

  const fallbackMetrics = getHeroMetrics(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  return {
    metrics: layout?.metrics ?? fallbackMetrics,
    path: layout?.path ?? "",
    isReady: layout !== null,
  };
}
