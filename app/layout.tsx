import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollRevealAnimations from "@/components/ScrollRevealAnimations";
import { SCROLL_RESET_SCRIPT } from "@/lib/scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JF Caribe — Materiales de construcción",
  description:
    "Grava, arena, áridos y granulados entregados en sus obras. Presupuesto gratuito en 24 h.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLL_RESET_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>
          {children}
          <ScrollRevealAnimations />
        </SmoothScroll>
      </body>
    </html>
  );
}
