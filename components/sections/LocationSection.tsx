import Link from "next/link";
import { Reveal, RevealFade } from "@/components/Reveal";
import {
  COMPANY_ADDRESS,
  getGoogleMapsEmbedUrl,
} from "@/lib/location";

export default function LocationSection() {
  return (
    <section
      id="localisation"
      aria-labelledby="map-heading"
      className="scroll-mt-3 bg-white px-5 py-16 sm:scroll-mt-6 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#171717]/45">
              Ubicación
            </p>
            <h2
              id="map-heading"
              className="mt-3 text-2xl font-black uppercase leading-[0.95] tracking-tight text-[#171717] sm:text-3xl lg:text-4xl"
            >
              Cómo{" "}
              <span className="text-orange-600">encontrarnos</span>
            </h2>
          </div>

          <address className="not-italic text-sm leading-relaxed text-[#171717]/60 sm:text-right">
            <span className="block font-semibold text-[#171717]">
              {COMPANY_ADDRESS.line1}
            </span>
            <span className="block">{COMPANY_ADDRESS.line2}</span>
            <span className="block">{COMPANY_ADDRESS.region}</span>
            <Link
              href={COMPANY_ADDRESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-orange-600 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              Abrir en Google Maps →
            </Link>
          </address>
        </Reveal>

        <RevealFade className="mt-8 overflow-hidden rounded-[25px] border border-[#171717]/8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:mt-10">
          <iframe
            title={`Mapa de Google Maps — ${COMPANY_ADDRESS.display}`}
            src={getGoogleMapsEmbedUrl()}
            className="block h-[320px] w-full sm:h-[400px] lg:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </RevealFade>
      </div>
    </section>
  );
}
