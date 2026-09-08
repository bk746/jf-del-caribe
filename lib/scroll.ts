/** Décalage pour la nav fixe lors du scroll vers une ancre */
export const SCROLL_ANCHOR_OFFSET = -104;

export function hasScrollHash() {
  const hash = window.location.hash;
  return Boolean(hash && hash !== "#");
}

export function isPageReload() {
  if (typeof performance === "undefined") return false;

  const entry = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;

  return entry?.type === "reload";
}

export function shouldStartAtTopOnLoad() {
  return isPageReload() || !hasScrollHash();
}

export function clearScrollHashFromUrl() {
  if (!hasScrollHash()) return;
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export function resetScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function scrollToHashElement(
  hash: string,
  options: { immediate?: boolean; offset?: number } = {},
) {
  if (!hash || hash === "#") return false;

  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;

  const top =
    target.getBoundingClientRect().top +
    window.scrollY +
    (options.offset ?? SCROLL_ANCHOR_OFFSET);

  window.scrollTo({
    top,
    left: 0,
    behavior: options.immediate ? "auto" : "smooth",
  });

  return true;
}

/** Bloque la restauration native et remonte en haut avant l’hydratation React. */
export const SCROLL_RESET_SCRIPT = `(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;for(var i=0;i<sessionStorage.length;i++){var k=sessionStorage.key(i);if(k&&k.indexOf("jf-scroll:")===0)sessionStorage.removeItem(k);}}catch(e){}})();`;
