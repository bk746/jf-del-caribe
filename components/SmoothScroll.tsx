"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
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

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    lockScrollAtTop();

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

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onPageShow);

    applyInitialScroll();
    requestAnimationFrame(lockScrollAtTop);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  useEffect(() => {
    if (shouldStartAtTopOnLoad()) {
      lockScrollAtTop();
      return;
    }

    const hash = window.location.hash;
    const timer = window.setTimeout(() => {
      scrollToHashElement(hash, { immediate: true });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return children;
}
