"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import MenuMaterialsCarousel from "@/components/sections/MenuMaterialsCarousel";
import { PRIMARY_NAV } from "@/lib/navigation";
import logoJfCaribe from "@/src/images/logo-jf-caribe.png";
import menuPoster from "@/src/images/hero-poster-source.jpeg";

type HeroMenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onClosed?: () => void;
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function HeroMenuOverlay({
  isOpen,
  onClose,
  onClosed,
}: HeroMenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isRendered) return;

    if (isOpen) {
      gsap.killTweensOf(panel);

      if (reduceMotion) {
        gsap.set(panel, { yPercent: 0 });
        const items = panel.querySelectorAll("[data-menu-item]");
        gsap.set(items, { y: 0, opacity: 1 });
        return;
      }

      gsap.set(panel, { yPercent: -100 });
      gsap.to(panel, {
        yPercent: 0,
        duration: 0.72,
        ease: "power3.inOut",
      });

      const items = panel.querySelectorAll("[data-menu-item]");
      gsap.fromTo(
        items,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.18,
        },
      );
      return;
    }

    gsap.killTweensOf(panel);

    if (reduceMotion) {
      gsap.set(panel, { yPercent: -100 });
      setIsRendered(false);
      onClosed?.();
      return;
    }

    gsap.to(panel, {
      yPercent: -100,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        setIsRendered(false);
        onClosed?.();
      },
    });
  }, [isOpen, isRendered, onClosed, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed inset-x-0 top-0 z-[9998] max-h-[100dvh] w-full overflow-y-auto bg-white"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label="Menú principal"
    >
      <Link
        href="/"
        onClick={onClose}
        data-menu-item
        className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[16px] bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(23,23,23,0.2)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:left-6 sm:h-16 sm:w-16 sm:rounded-[18px] sm:p-2 md:left-10 lg:h-20 lg:w-20"
        aria-label="JF Caribe — volver al inicio"
      >
        <Image
          src={logoJfCaribe}
          alt=""
          width={320}
          height={320}
          className="h-full w-full object-contain object-center"
          sizes="80px"
        />
      </Link>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,env(safe-area-inset-top))] sm:px-6 sm:pb-8 sm:pt-24 md:pt-28 lg:px-8">
        <div className="flex flex-col gap-4 lg:min-h-[clamp(380px,52vh,520px)] lg:flex-row lg:items-stretch lg:gap-5">
          <div className="flex min-h-0 flex-1 flex-col rounded-[25px] bg-[#eceff2] p-6 sm:p-8 lg:max-w-[min(100%,42rem)] lg:p-9 xl:p-10">
            <nav aria-label="Navegación principal" className="min-h-0">
              <ul className="space-y-2.5 sm:space-y-3 lg:space-y-3.5">
                {PRIMARY_NAV.map((link) => (
                  <li key={link.href} data-menu-item>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`rounded-sm text-[clamp(1.5rem,4vw,2.35rem)] font-bold uppercase leading-[0.95] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                        link.highlight
                          ? "text-orange-500 hover:text-orange-600"
                          : "text-[#171717] hover:text-orange-500"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-6 sm:pt-8" data-menu-item>
              <Link
                href="/devis"
                onClick={onClose}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#171717] transition-colors duration-200 hover:border-orange-500/30 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                Solicitar presupuesto
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="flex min-h-[min(52vh,420px)] min-w-0 flex-1 flex-col rounded-[25px] bg-[#eceff2] p-5 sm:min-h-[min(48vh,460px)] sm:p-6 lg:min-h-0 lg:p-7 xl:p-8">
            <MenuMaterialsCarousel
              onNavigate={onClose}
              isActive={isOpen}
            />
          </div>

          <aside
            className="relative hidden min-h-0 overflow-hidden rounded-[25px] lg:block lg:w-[min(100%,20rem)] xl:w-[min(100%,22rem)]"
            data-menu-item
          >
            <Image
              src={menuPoster}
              alt="Obra JF Caribe en la Riviera Maya"
              fill
              className="object-cover"
              sizes="22rem"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 xl:p-9">
              <p className="text-xl font-bold uppercase leading-[1.05] text-white xl:text-2xl">
                Materiales
                <br />
                de obra
              </p>
              <p className="mt-2.5 max-w-[16rem] text-sm leading-relaxed text-white/80">
                Grava, arena y granulados entregados rápidamente para sus
                obras.
              </p>
              <Link
                href="/devis"
                onClick={onClose}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
              >
                Solicitar presupuesto
                <ArrowIcon />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}
