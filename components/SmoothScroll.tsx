"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { ensureGsapScroll, gsap, ScrollTrigger } from "@/lib/gsap-client";
import { prefersReducedMotion } from "@/lib/motion";
import { markScrollSystemReady } from "@/lib/scroll-ready";
import {
  clearScrollHashFromUrl,
  isPageReload,
  resetScrollToTop,
  SCROLL_ANCHOR_OFFSET,
  scrollToHashElement,
  shouldStartAtTopOnLoad,
} from "@/lib/scroll";
import "lenis/dist/lenis.css";

function scrollLenisToTop(lenis: Lenis) {
  lenis.scrollTo(0, { immediate: true, force: true });
}

function scrollLenisToHash(lenis: Lenis, hash: string, immediate = false) {
  lenis.scrollTo(hash, {
    offset: SCROLL_ANCHOR_OFFSET,
    immediate,
    force: true,
  });
}

function applyInitialScroll(lenis?: Lenis | null) {
  if (shouldStartAtTopOnLoad()) {
    if (isPageReload()) clearScrollHashFromUrl();
    resetScrollToTop();
    if (lenis) scrollLenisToTop(lenis);
    return;
  }

  const hash = window.location.hash;
  if (lenis) {
    scrollLenisToHash(lenis, hash, true);
  } else {
    scrollToHashElement(hash, { immediate: true });
  }
}

function lockScrollAtTop(lenis?: Lenis | null) {
  if (!shouldStartAtTopOnLoad()) return;

  resetScrollToTop();
  if (lenis) scrollLenisToTop(lenis);
}

function notifyScrollReady() {
  markScrollSystemReady();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    lockScrollAtTop();

    if (prefersReducedMotion()) {
      applyInitialScroll();
      requestAnimationFrame(notifyScrollReady);
      return;
    }

    ensureGsapScroll();

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    ScrollTrigger.defaults({ scroller: document.documentElement });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true, force: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    let refreshTimer: number | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        if (shouldStartAtTopOnLoad()) lockScrollAtTop(lenis);
        return;
      }
      scrollLenisToHash(lenis, hash);
    };

    const onPageShow = () => {
      applyInitialScroll(lenis);
    };

    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onPageShow);

    applyInitialScroll(lenis);

    requestAnimationFrame(() => {
      lockScrollAtTop(lenis);
      ScrollTrigger.refresh();
      notifyScrollReady();
    });

    return () => {
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onPageShow);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (shouldStartAtTopOnLoad()) {
      lockScrollAtTop(lenisRef.current);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        notifyScrollReady();
      });
      return;
    }

    const hash = window.location.hash;

    if (prefersReducedMotion()) {
      const timer = window.setTimeout(() => {
        scrollToHashElement(hash, { immediate: true });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    const lenis = lenisRef.current;
    if (!lenis) return;

    const timer = window.setTimeout(() => {
      scrollLenisToHash(lenis, hash);
      ScrollTrigger.refresh();
      notifyScrollReady();
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return children;
}
