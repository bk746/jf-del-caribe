/** Lecture ponctuelle côté client (éviter en render React — préférer le hook). */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
