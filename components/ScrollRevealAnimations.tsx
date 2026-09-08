"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  ensureGsapScroll,
  getScrollTriggerConfig,
  gsap,
  ScrollTrigger,
} from "@/lib/gsap-client";
import { isScrollSystemReady } from "@/lib/scroll-ready";

function primeHiddenState() {
  gsap.set("[data-reveal], [data-reveal-item], [data-reveal-fade]", {
    opacity: 0,
    y: 14,
  });
}

function createRevealAnimations() {
  return gsap.context(() => {
    primeHiddenState();

    gsap.utils.toArray<HTMLElement>("[data-reveal-hero]").forEach((el) => {
      const children = Array.from(el.children);
      const targets = children.length ? children : [el];

      gsap.fromTo(
        targets,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.08,
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: getScrollTriggerConfig(el, "top 90%"),
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach(
      (container) => {
        const items = container.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: getScrollTriggerConfig(container, "top 88%"),
          },
        );
      },
    );

    gsap.utils.toArray<HTMLElement>("[data-reveal-fade]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: getScrollTriggerConfig(el, "top 92%"),
        },
      );
    });
  });
}

export default function ScrollRevealAnimations() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;

    ensureGsapScroll();

    let ctx: ReturnType<typeof createRevealAnimations> | null = null;

    const mount = () => {
      ctx?.revert();
      ctx = createRevealAnimations();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => mount();

    if (isScrollSystemReady()) {
      mount();
    }

    window.addEventListener("scroll-system-ready", onReady);

    const replayAfterRestore = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      mount();
    };

    window.addEventListener("pageshow", replayAfterRestore);

    return () => {
      window.removeEventListener("scroll-system-ready", onReady);
      window.removeEventListener("pageshow", replayAfterRestore);
      ctx?.revert();
    };
  }, [pathname, reduceMotion]);

  return null;
}
