"use client";

import { useEffect, useState } from "react";

const HERO_ROTATING_TERMS = [
  "grava",
  "arena",
  "polvo",
  "maquinaria",
  "movimiento de tierras",
  "una evacuación",
] as const;

const ROTATE_INTERVAL_MS = 3000;
const ROTATE_DURATION_MS = 700;

type HeroRotatingWordProps = {
  paused?: boolean;
};

export default function HeroRotatingWord({ paused = false }: HeroRotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const current = HERO_ROTATING_TERMS[index];
  const next = HERO_ROTATING_TERMS[(index + 1) % HERO_ROTATING_TERMS.length];

  useEffect(() => {
    if (paused) {
      setIsAnimating(false);
      return;
    }

    const intervalId = window.setInterval(() => {
      setIsAnimating(true);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [paused]);

  useEffect(() => {
    if (!isAnimating || paused) return;

    const timeoutId = window.setTimeout(() => {
      setIndex((value) => (value + 1) % HERO_ROTATING_TERMS.length);
      setIsAnimating(false);
    }, ROTATE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, paused]);

  if (paused) {
    return (
      <span aria-live="polite" className="text-primary">
        {current}
      </span>
    );
  }

  const slotClass =
    "absolute inset-x-0 top-0 block h-[1.12em] whitespace-nowrap leading-[1.05] transform-gpu";

  const transitionClass =
    "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <span
      aria-live="polite"
      className="inline-block min-w-[16ch] align-bottom text-primary leading-[1.05]"
    >
      <span className="relative block h-[1.12em] overflow-clip leading-[1.05]">
        <span
          className={`${slotClass} ${isAnimating ? transitionClass : ""} ${
            isAnimating ? "translate-y-full" : "translate-y-0"
          }`}
        >
          {current}
        </span>
        <span
          className={`${slotClass} ${isAnimating ? transitionClass : ""} ${
            isAnimating ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {next}
        </span>
      </span>
    </span>
  );
}
