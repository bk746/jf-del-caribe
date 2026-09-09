import type { ReactNode } from "react";
import ScrollRevealAnimations from "@/components/ScrollRevealAnimations";
import SmoothScroll from "@/components/SmoothScroll";

export default function ScrollMotionShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <ScrollRevealAnimations />
    </SmoothScroll>
  );
}
