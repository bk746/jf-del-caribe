"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const ScrollRevealAnimations = dynamic(
  () => import("@/components/ScrollRevealAnimations"),
  { ssr: false },
);

export default function ScrollMotionShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <ScrollRevealAnimations />
    </SmoothScroll>
  );
}
