"use client";

import Image from "next/image";
import Link from "next/link";
import HeroBackgroundMedia from "@/components/sections/HeroBackgroundMedia";
import HeroRotatingWord from "@/components/sections/HeroRotatingWord";
import { useMenu } from "@/components/sections/SiteNav";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  LOGO_NATURAL_HEIGHT,
  LOGO_NATURAL_WIDTH,
  HERO_TRUST,
} from "@/lib/hero";
import { CircleCheck, Clock, Truck, type LucideIcon } from "lucide-react";
import heroPoster from "@/src/images/hero-poster-source.jpeg";
import heroLogo from "@/src/images/hero-logo.jpg";

const HERO_VIDEO_SRC = "/video/video-hero.mp4";

function HeroHeadline({ paused = false }: { paused?: boolean }) {
  return (
    <>
      {/* Mobile : texto estático */}
      <span className="md:hidden">
        <span className="block text-balance">
          Busca{" "}
          <span className="text-primary">materiales</span>,
        </span>
        <span className="block text-balance">entregamos en la Riviera Maya.</span>
      </span>

      {/* Desktop : rotación de palabras */}
      <span className="hidden md:inline">
        <span className="whitespace-nowrap">
          Busca <HeroRotatingWord paused={paused} />
        </span>
        <br />
        <span className="whitespace-nowrap">entregamos en la Riviera Maya.</span>
      </span>
    </>
  );
}

function HeroSubline() {
  return (
    <span className="text-pretty">
      JF Del Caribe: presupuestos en minutos, materiales de calidad y entrega
      en camiones de 3 a 14&nbsp;m³ en toda la Riviera Maya.
    </span>
  );
}

const HERO_TRUST_ICONS: LucideIcon[] = [Clock, CircleCheck, Truck];

function HeroMicroReassurance({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-6 md:mt-6 md:justify-start ${className}`}
      aria-label="Puntos de confianza"
    >
      {HERO_TRUST.map((label, index) => {
        const Icon = HERO_TRUST_ICONS[index] ?? Clock;

        return (
          <li
            key={label}
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.02em] text-white/70 sm:text-xs"
          >
            <Icon
              className="h-3.5 w-3.5 shrink-0 text-orange-400"
              strokeWidth={2.25}
              aria-hidden
            />
            {label}
          </li>
        );
      })}
    </ul>
  );
}

function HeroCtaButtons({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5 ${className}`}
    >
      <Link
        href="#services"
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-white px-9 text-lg font-semibold text-[#171717] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:min-w-[200px]"
      >
        Nuestros servicios
      </Link>
      <Link
        href="/devis"
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-9 text-lg font-semibold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:min-w-[240px]"
      >
        Solicitar presupuesto
      </Link>
    </div>
  );
}

function ScrollChevron({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${animate ? "animate-bounce motion-reduce:animate-none" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function HeroSection() {
  const { menuOpen } = useMenu();
  const reduceMotion = usePrefersReducedMotion();

  const contentHidden = menuOpen;

  return (
    <section
      aria-label="Inicio JF Caribe"
      className="min-h-[100dvh] overflow-x-hidden bg-white p-3 pb-8 sm:p-4 sm:pb-12"
    >
      <div
        data-hero-frame
        className="relative h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[18px] bg-[#1a1a1a] sm:h-[calc(100dvh-2rem)] sm:rounded-[25px]"
      >
        <div className="absolute inset-0" aria-hidden>
          <HeroBackgroundMedia
            poster={heroPoster}
            videoSrc={HERO_VIDEO_SRC}
            enableVideo={!reduceMotion}
            playbackPaused={menuOpen}
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
        </div>

        <div
          className={`absolute inset-x-4 bottom-10 z-10 flex flex-col items-center gap-2 px-1 text-center transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none max-md:bottom-12 md:inset-x-6 md:bottom-12 md:items-start md:gap-3 md:px-0 md:text-left lg:inset-x-8 lg:bottom-14 ${
            contentHidden
              ? "pointer-events-none translate-y-3 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="w-full max-w-2xl text-white lg:max-w-3xl" data-reveal-hero>
            <h1 className="text-balance text-[clamp(1.75rem,6.5vw,2.125rem)] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[2.65rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] md:leading-[1.05]">
              <HeroHeadline paused={reduceMotion || menuOpen} />
            </h1>

            <p className="mx-auto mt-4 max-w-[22rem] text-pretty text-[15px] leading-[1.55] text-white/88 sm:mt-5 sm:max-w-lg sm:text-base sm:leading-relaxed md:mx-0 md:max-w-none md:text-[17px] lg:mt-6 lg:text-lg lg:leading-[1.6]">
              <HeroSubline />
            </p>

            <HeroCtaButtons className="max-md:mx-auto max-md:w-full max-md:max-w-[360px] md:mx-0" />
            <HeroMicroReassurance className="max-md:mx-auto max-md:max-w-[360px] md:mx-0" />

            <Link
              href="#a-propos"
              className="mt-5 inline-flex flex-col items-center gap-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:hidden"
            >
              Descubrir
              <ScrollChevron animate={!reduceMotion} />
            </Link>
          </div>
        </div>

        <Link
          href="#a-propos"
          className={`absolute bottom-2.5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65 transition-[opacity,transform] duration-500 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 motion-reduce:transition-none sm:bottom-3.5 md:flex lg:bottom-4 ${
            contentHidden
              ? "pointer-events-none translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Descubrir
          <ScrollChevron animate={!reduceMotion} />
        </Link>

        <div
          id="hero-logo-target"
          className="absolute left-0 top-0 z-[45] hidden h-[120px] w-[151px] items-center rounded-br-[25px] bg-white px-[22px] sm:flex sm:pl-6 lg:w-[169px]"
        >
          <Link
            href="/"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            aria-label="JF Del Caribe — Inicio"
          >
            <Image
              src={heroLogo}
              alt=""
              width={LOGO_NATURAL_WIDTH}
              height={LOGO_NATURAL_HEIGHT}
              sizes="(max-width: 1023px) 105px, 123px"
              className="block h-[86px] w-auto object-contain object-left lg:h-[100px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
