"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import {
  CONTACT_EMAIL_LINK,
  CONTACT_PHONE_LINK,
  CONTACT_WHATSAPP,
} from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const COLLAPSED_WIDTH = 48;
const COMPACT_SIZE = 40;

type HeroNavProps = {
  compact?: boolean;
  menuOpen: boolean;
  onMenuToggle: () => void;
};

function NavIcon({
  compact,
  children,
}: {
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${
        compact ? "h-10 w-10" : "h-12 w-12"
      }`}
    >
      {children}
    </span>
  );
}

function ExpandableActionButton({
  href,
  label,
  text,
  compact = false,
  external = false,
  tone = "primary",
  reduceMotion = false,
  children,
}: {
  href: string;
  label: string;
  text: string;
  compact?: boolean;
  external?: boolean;
  tone?: "primary" | "whatsapp";
  reduceMotion?: boolean;
  children: ReactNode;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const expandedWidthRef = useRef(COLLAPSED_WIDTH);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const collapsedWidth = compact ? COMPACT_SIZE : COLLAPSED_WIDTH;
  const toneClass =
    tone === "whatsapp"
      ? "bg-[#25D366] text-white hover:opacity-90"
      : "bg-primary text-white hover:opacity-90";

  useLayoutEffect(() => {
    if (compact || reduceMotion) return;

    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const measureExpandedWidth = () => {
      if (!button.offsetParent) return;

      gsap.set(button, { width: collapsedWidth, overflow: "hidden" });
      gsap.set(text, { opacity: 0, x: 14 });
      gsap.set(text, { opacity: 1 });
      gsap.set(button, { width: "auto" });
      expandedWidthRef.current = button.offsetWidth;
      gsap.set(text, { opacity: 0, x: 14 });
      gsap.set(button, { width: collapsedWidth });
    };

    measureExpandedWidth();
    window.addEventListener("resize", measureExpandedWidth, { passive: true });

    return () => {
      window.removeEventListener("resize", measureExpandedWidth);
      timelineRef.current?.kill();
    };
  }, [compact, collapsedWidth, reduceMotion]);

  if (compact) {
    return (
      <a
        href={href}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${toneClass}`}
      >
        {children}
      </a>
    );
  }

  const animate = (expanded: boolean) => {
    if (reduceMotion) return;

    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    timelineRef.current?.kill();

    if (expanded) {
      timelineRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(button, { width: expandedWidthRef.current, duration: 0.55 })
        .to(
          text,
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
          "-=0.35",
        );
      return;
    }

    timelineRef.current = gsap
      .timeline({ defaults: { ease: "power3.inOut" } })
      .to(text, { opacity: 0, x: 10, duration: 0.22 })
      .to(button, { width: collapsedWidth, duration: 0.45 }, "-=0.08");
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex h-12 w-12 shrink-0 items-center overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${toneClass}`}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      onFocus={() => animate(true)}
      onBlur={() => animate(false)}
    >
      <NavIcon>{children}</NavIcon>
      <span
        ref={textRef}
        className="translate-x-[14px] whitespace-nowrap pr-5 text-sm font-medium opacity-0 will-change-transform"
      >
        {text}
      </span>
    </a>
  );
}

function PhoneIcon({ compact }: { compact?: boolean }) {
  const size = compact ? 18 : 20;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
    </svg>
  );
}

function MailIcon({ compact }: { compact?: boolean }) {
  const size = compact ? 18 : 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function WhatsAppIcon({ compact }: { compact?: boolean }) {
  const size = compact ? 18 : 20;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MenuButton({
  compact = false,
  menuOpen,
  onClick,
}: {
  compact?: boolean;
  menuOpen: boolean;
  onClick: () => void;
}) {
  if (compact) {
    return (
      <button
        type="button"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        onClick={onClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {menuOpen ? (
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        ) : (
          <span className="flex flex-col gap-1" aria-hidden>
            <span className="h-0.5 w-4 rounded-full bg-white" />
            <span className="h-0.5 w-4 rounded-full bg-white" />
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={menuOpen}
      onClick={onClick}
      className="flex h-12 shrink-0 items-center gap-5 rounded-full bg-primary px-6 text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="text-base font-medium lowercase tracking-wide">
        {menuOpen ? "cerrar" : "menú"}
      </span>
      {menuOpen ? (
        <span aria-hidden className="text-lg leading-none">
          ×
        </span>
      ) : (
        <span className="flex flex-col gap-1.5" aria-hidden>
          <span className="h-0.5 w-5 rounded-full bg-white" />
          <span className="h-0.5 w-5 rounded-full bg-white" />
        </span>
      )}
    </button>
  );
}

export default function HeroNav({
  compact = false,
  menuOpen,
  onMenuToggle,
}: HeroNavProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <nav
      aria-label="Navegación principal"
      className="flex items-center justify-end gap-2 sm:gap-3"
    >
      {!compact ? (
        <>
          <ExpandableActionButton
            href={CONTACT_PHONE_LINK.href}
            label={CONTACT_PHONE_LINK.label}
            text={CONTACT_PHONE_LINK.display}
            compact={compact}
            reduceMotion={reduceMotion}
          >
            <PhoneIcon compact={compact} />
          </ExpandableActionButton>

          <ExpandableActionButton
            href={CONTACT_EMAIL_LINK.href}
            label={CONTACT_EMAIL_LINK.label}
            text={CONTACT_EMAIL_LINK.display}
            compact={compact}
            reduceMotion={reduceMotion}
          >
            <MailIcon compact={compact} />
          </ExpandableActionButton>
        </>
      ) : null}

      <ExpandableActionButton
        href={CONTACT_WHATSAPP.href}
        label={CONTACT_WHATSAPP.label}
        text={CONTACT_WHATSAPP.display}
        compact={compact}
        external
        tone="whatsapp"
        reduceMotion={reduceMotion}
      >
        <WhatsAppIcon compact={compact} />
      </ExpandableActionButton>

      <MenuButton
        compact={compact}
        menuOpen={menuOpen}
        onClick={onMenuToggle}
      />
    </nav>
  );
}
