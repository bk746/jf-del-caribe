"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

const SHADOW_REST = "0 8px 30px -14px rgba(23,23,23,0.2)";
const SHADOW_HOVER = "0 22px 50px -18px rgba(23,23,23,0.28)";
const ARROW_SHADOW_REST = "0 2px 8px -2px rgba(23,23,23,0.12)";
const ARROW_SHADOW_HOVER = "0 4px 14px -4px rgba(234,88,12,0.45)";

type GsapHoverCardProps = {
  children: ReactNode;
  className?: string;
  imageScale?: number;
  as?: "article" | "figure";
};

export default function GsapHoverCard({
  children,
  className = "",
  imageScale = 1.05,
  as: Tag = "article",
}: GsapHoverCardProps) {
  const rootRef = useRef<HTMLElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = root.querySelector<HTMLElement>("[data-card-media]");
    const mediaTarget =
      media?.querySelector("img") ??
      media?.querySelector("[data-card-media-target]");
    const arrow = root.querySelector<HTMLElement>("[data-card-arrow]");

    const targets = [root, mediaTarget, arrow].filter(Boolean);

    const setRest = (immediate = false) => {
      const duration = immediate || prefersReducedMotion() ? 0 : undefined;

      gsap.killTweensOf(targets);
      gsap.to(root, {
        y: 0,
        boxShadow: SHADOW_REST,
        duration: duration ?? 0.5,
        ease: "power3.inOut",
      });

      if (mediaTarget) {
        gsap.to(mediaTarget, {
          scale: 1,
          duration: duration ?? 0.65,
          ease: "power3.inOut",
        });
      }

      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          backgroundColor: "#f4f2ed",
          color: "#171717",
          boxShadow: ARROW_SHADOW_REST,
          duration: duration ?? 0.4,
          ease: "power3.inOut",
        });
      }
    };

    const setHover = () => {
      if (prefersReducedMotion()) return;

      gsap.killTweensOf(targets);

      gsap.to(root, {
        y: -8,
        boxShadow: SHADOW_HOVER,
        duration: 0.55,
        ease: "power3.out",
      });

      if (mediaTarget) {
        gsap.to(mediaTarget, {
          scale: imageScale,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          backgroundColor: "#f97316",
          color: "#ffffff",
          boxShadow: ARROW_SHADOW_HOVER,
          duration: 0.45,
          ease: "power3.out",
        });
      }
    };

    const activate = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      setHover();
    };

    const deactivate = () => {
      activeRef.current = false;
      setRest();
    };

    const onFocusIn = (event: FocusEvent) => {
      if (root.contains(event.target as Node)) activate();
    };

    const onFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node)) deactivate();
    };

    gsap.set(root, { boxShadow: SHADOW_REST, y: 0 });
    if (mediaTarget) gsap.set(mediaTarget, { scale: 1, transformOrigin: "center center" });
    if (arrow) {
      gsap.set(arrow, {
        x: 0,
        backgroundColor: "#f4f2ed",
        color: "#171717",
        boxShadow: ARROW_SHADOW_REST,
      });
    }

    root.addEventListener("mouseenter", activate);
    root.addEventListener("mouseleave", deactivate);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);

    return () => {
      root.removeEventListener("mouseenter", activate);
      root.removeEventListener("mouseleave", deactivate);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      gsap.killTweensOf(targets);
    };
  }, [imageScale]);

  return (
    <Tag
      ref={rootRef}
      className={className}
      style={{ boxShadow: SHADOW_REST }}
    >
      {children}
    </Tag>
  );
}
