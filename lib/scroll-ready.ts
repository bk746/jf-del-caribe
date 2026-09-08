let scrollSystemReady = false;

export function markScrollSystemReady() {
  scrollSystemReady = true;
  window.dispatchEvent(new Event("scroll-system-ready"));
}

export function isScrollSystemReady() {
  return scrollSystemReady;
}

export function onScrollSystemReady(callback: () => void) {
  if (scrollSystemReady) {
    callback();
    return () => {};
  }

  window.addEventListener("scroll-system-ready", callback, { once: true });
  return () => window.removeEventListener("scroll-system-ready", callback);
}

export function resetScrollSystemReady() {
  scrollSystemReady = false;
}
