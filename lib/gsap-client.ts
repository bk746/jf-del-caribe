import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapScroll() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function getScrollTriggerScroller() {
  return typeof document !== "undefined" ? document.documentElement : undefined;
}

export function getScrollTriggerConfig(
  trigger: Element | null,
  start = "top 78%",
) {
  return {
    trigger,
    start,
    once: true,
    scroller: getScrollTriggerScroller(),
  };
}

export { gsap, ScrollTrigger };
