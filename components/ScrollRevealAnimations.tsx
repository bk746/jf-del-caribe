"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const REVEAL_SELECTORS =
  "[data-reveal]:not([data-reveal-item]), [data-reveal-fade], [data-conversion-section]";

function revealAll(nodes: NodeListOf<Element>) {
  nodes.forEach((node) => node.classList.add("is-revealed"));
}

function setupHeroReveals() {
  document.querySelectorAll<HTMLElement>("[data-reveal-hero]").forEach((hero) => {
    Array.from(hero.children).forEach((child, index) => {
      (child as HTMLElement).style.setProperty(
        "--reveal-delay",
        `${80 + index * 70}ms`,
      );
    });
    hero.classList.add("is-revealed");
  });
}

function setupStaggerDelays() {
  document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach(
    (container) => {
      container.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach(
        (item, index) => {
          item.style.setProperty("--reveal-delay", `${index * 60}ms`);
        },
      );
    },
  );

  document.querySelectorAll<HTMLElement>("[data-conversion-word]").forEach(
    (word, index) => {
      word.style.setProperty("--reveal-delay", `${index * 35}ms`);
    },
  );
}

export default function ScrollRevealAnimations() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setupStaggerDelays();

    if (reduceMotion) {
      revealAll(document.querySelectorAll(REVEAL_SELECTORS));
      revealAll(document.querySelectorAll("[data-reveal-item]"));
      setupHeroReveals();
      return;
    }

    setupHeroReveals();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;

          if (target.matches("[data-conversion-section]")) {
            target.classList.add("is-revealed");
            observer.unobserve(target);
            return;
          }

          if (target.matches("[data-reveal-item]")) {
            target.classList.add("is-revealed");
            observer.unobserve(target);
            return;
          }

          target.classList.add("is-revealed");
          observer.unobserve(target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document
      .querySelectorAll<HTMLElement>(REVEAL_SELECTORS)
      .forEach((el) => observer.observe(el));

    document
      .querySelectorAll<HTMLElement>("[data-reveal-item]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname, reduceMotion]);

  return null;
}
