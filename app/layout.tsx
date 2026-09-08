import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ScrollMotionShell from "@/components/ScrollMotionShell";
import { SCROLL_RESET_SCRIPT } from "@/lib/scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLL_RESET_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ScrollMotionShell>{children}</ScrollMotionShell>
      </body>
    </html>
  );
}
