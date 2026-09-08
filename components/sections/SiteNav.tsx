"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import HeroNav from "@/components/sections/HeroNav";
import heroLogo from "@/src/images/hero-logo.jpg";

const HeroMenuOverlay = dynamic(
  () => import("@/components/sections/HeroMenuOverlay"),
  { ssr: false },
);

type MenuContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within SiteNavProvider");
  }
  return context;
}

const SCROLL_THRESHOLD = 48;

function getScrollTop() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function SiteNavProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);

  useEffect(() => {
    let lastScrolled = false;

    const updateScroll = () => {
      const nextScrolled = getScrollTop() > SCROLL_THRESHOLD;
      if (nextScrolled === lastScrolled) return;
      lastScrolled = nextScrolled;
      setScrolled(nextScrolled);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) setOverlayMounted(true);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, toggleMenu }}>
      {children}

      <header className="fixed inset-x-0 top-0 z-[9999] border-b border-black/[0.06] bg-white/95 pt-[env(safe-area-inset-top)] shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md sm:hidden">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4">
          <Link
            href="/"
            className="flex min-h-11 min-w-0 shrink items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            aria-label="JF Del Caribe — Inicio"
          >
            <Image
              src={heroLogo}
              alt=""
              width={1120}
              height={912}
              priority
              className="h-9 w-auto object-contain object-left"
              sizes="120px"
            />
          </Link>

          <HeroNav
            compact
            menuOpen={menuOpen}
            onMenuToggle={toggleMenu}
          />
        </div>
      </header>

      <div
        className={`fixed z-[9999] hidden items-center justify-end gap-3 transition-all duration-300 ease-out motion-reduce:transition-none sm:right-6 sm:flex ${
          scrolled
            ? "top-[max(1rem,env(safe-area-inset-top))] rounded-full border border-white/40 bg-white/75 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "top-10"
        }`}
      >
        <HeroNav
          menuOpen={menuOpen}
          onMenuToggle={toggleMenu}
        />
      </div>

      {overlayMounted ? (
        <HeroMenuOverlay
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onClosed={() => setOverlayMounted(false)}
        />
      ) : null}
    </MenuContext.Provider>
  );
}
