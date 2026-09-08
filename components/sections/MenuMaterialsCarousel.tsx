"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ArrowIcon from "@/components/sections/ArrowIcon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MATERIALS } from "@/lib/products";

const AUTOPLAY_MS = 4000;

type MenuMaterialsCarouselProps = {
  onNavigate?: () => void;
  isActive?: boolean;
};

export default function MenuMaterialsCarousel({
  onNavigate,
  isActive = true,
}: MenuMaterialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((nextIndex: number) => {
    setIndex((nextIndex + MATERIALS.length) % MATERIALS.length);
  }, []);

  useEffect(() => {
    if (!isActive || reduceMotion || isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MATERIALS.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isActive, isPaused, reduceMotion]);

  const material = MATERIALS[index];

  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-3"
      data-menu-item
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717]/45">
          Nuestros materiales
        </p>
        <p
          className="font-mono text-[11px] tracking-tight text-[#171717]/35"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-[#171717]/20">
            /{String(MATERIALS.length).padStart(2, "0")}
          </span>
        </p>
      </div>

      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        aria-label="Carrusel de materiales"
        aria-roledescription="carousel"
      >
        <div
          className={`flex h-full ${reduceMotion ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {MATERIALS.map((item) => (
            <Link
              key={item.id}
              href={`/produits/${item.id}`}
              onClick={onNavigate}
              className="group flex h-full w-full shrink-0 flex-col overflow-hidden rounded-[18px] bg-white p-3 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-20px_rgba(23,23,23,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:p-4"
              aria-hidden={item.id !== material.id}
              tabIndex={item.id === material.id ? 0 : -1}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-[#f6f3ee] sm:aspect-[5/3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={
                    item.imageKind === "cover"
                      ? "object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                      : "object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  }
                  sizes="(max-width: 1024px) 90vw, 320px"
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
                <div className="min-w-0">
                  <p className="text-balance text-[clamp(1rem,2.5vw,1.125rem)] font-semibold leading-tight tracking-[-0.02em] text-[#171717]">
                    {item.name}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-pretty text-[13px] leading-snug text-[#171717]/55 sm:text-[14px]">
                    {item.description}
                  </p>
                </div>

                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eceff2] text-[#171717] transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white"
                  aria-hidden
                >
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 pt-1">
        {MATERIALS.map((item, dotIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Mostrar ${item.name}`}
            aria-current={dotIndex === index ? "true" : undefined}
            onClick={() => goTo(dotIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${
              dotIndex === index
                ? "w-5 bg-orange-500"
                : "w-1.5 bg-[#171717]/15 hover:bg-[#171717]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
