"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  ensureGsapScroll,
  getScrollTriggerConfig,
  gsap,
  ScrollTrigger,
} from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isScrollSystemReady } from "@/lib/scroll-ready";

const PHRASE =
  "Solicite su presupuesto gratuito y arranque su obra en la Riviera Maya esta misma semana.";
const WORDS = PHRASE.split(" ");
const HIGHLIGHT_WORDS = new Set(["presupuesto", "gratuito", "Riviera", "Maya"]);

function isHighlighted(word: string) {
  return HIGHLIGHT_WORDS.has(word.replace(/[.,!?]/g, ""));
}

export default function ConversionBridge() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;

    ensureGsapScroll();

    let ctx: gsap.Context | null = null;

    const runAnimation = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        gsap.set("[data-conversion-word]", { opacity: 0, yPercent: 110 });
        gsap.set("[data-conversion-cta]", { opacity: 0, y: 12 });

        const timeline = gsap.timeline({
          scrollTrigger: getScrollTriggerConfig(sectionRef.current, "top 85%"),
        });

        timeline.to("[data-conversion-word]", {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.035,
          ease: "power2.out",
        });

        timeline.to(
          "[data-conversion-cta]",
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
          },
          "-=0.35",
        );
      }, sectionRef);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => runAnimation();

    if (isScrollSystemReady()) {
      runAnimation();
    }

    window.addEventListener("scroll-system-ready", onReady);

    const replayAfterRestore = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      runAnimation();
    };

    window.addEventListener("pageshow", replayAfterRestore);

    return () => {
      window.removeEventListener("scroll-system-ready", onReady);
      window.removeEventListener("pageshow", replayAfterRestore);
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Mensaje de conversión"
      className="bg-white px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:px-12 lg:pt-28 lg:pb-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-[#171717] sm:text-4xl lg:text-[3.25rem]">
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <span
                data-conversion-word
                className={`inline-block ${
                  isHighlighted(word) ? "text-orange-600" : "text-[#171717]"
                }`}
              >
                {word}
                {index < WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </p>

        <Link
          data-conversion-cta
          href="/devis"
          className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-orange-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 lg:hidden"
        >
          Formulario de presupuesto completo
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
