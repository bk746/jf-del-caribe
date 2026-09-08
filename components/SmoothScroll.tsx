"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { ensureGsapScroll, ScrollTrigger } from "@/lib/gsap-client";
import { markScrollSystemReady } from "@/lib/scroll-ready";
import {
  clearScrollHashFromUrl,
  isPageReload,
  resetScrollToTop,
  scrollToHashElement,
  shouldStartAtTopOnLoad,
} from "@/lib/scroll";

function applyInitialScroll() {
  if (shouldStartAtTopOnLoad()) {
    if (isPageReload()) clearScrollHashFromUrl();
    resetScrollToTop();
    return;
  }

  scrollToHashElement(window.location.hash, { immediate: true });
}

function lockScrollAtTop() {
  if (!shouldStartAtTopOnLoad()) return;
  resetScrollToTop();
}

function notifyScrollReady() {
  markScrollSystemReady();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    ensureGsapScroll();
    lockScrollAtTop();

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
        if (shouldStartAtTopOnLoad()) lockScrollAtTop();
        return;
      }
      scrollToHashElement(hash);
    };

    const onPageShow = () => {
      applyInitialScroll();
    };

    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onPageShow);

    applyInitialScroll();

    requestAnimationFrame(() => {
      lockScrollAtTop();
      ScrollTrigger.refresh();
      notifyScrollReady();
    });

    return () => {
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onPageShow);
      window.clearTimeout(refreshTimer);
    };
  }, []);

  useEffect(() => {
    if (shouldStartAtTopOnLoad()) {
      lockScrollAtTop();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        notifyScrollReady();
      });
      return;
    }

    const hash = window.location.hash;
    const timer = window.setTimeout(() => {
      scrollToHashElement(hash, { immediate: true });
      ScrollTrigger.refresh();
      notifyScrollReady();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return children;
}
