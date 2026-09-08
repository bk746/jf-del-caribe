import Image from "next/image";
import ArrowIcon from "@/components/sections/ArrowIcon";
import ProductCard from "@/components/sections/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/faq";
import { DELIVERY_IMAGE, MATERIALS } from "@/lib/products";

export default function ProductsSection() {
  return (
    <section
      id="produits"
      aria-labelledby="products-heading"
      className="scroll-mt-3 bg-white px-3 pb-0 pt-8 sm:scroll-mt-6 sm:px-6 sm:pb-0 sm:pt-12 md:px-[30px] md:pb-0 md:pt-16"
    >
      <div className="overflow-hidden rounded-[16px] bg-[#f4f2ed] px-4 py-14 sm:rounded-[24px] sm:px-8 sm:py-20 md:rounded-[30px] md:px-10 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <Reveal as="header" className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,23rem)] lg:items-end lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                Catálogo de materiales
              </p>

              <h2
                id="products-heading"
                className="mt-5 max-w-[16ch] text-balance text-[clamp(2.125rem,5.5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#171717]"
              >
                Los materiales adecuados, en el momento adecuado.
              </h2>
            </div>

            <div className="flex flex-col items-start gap-6 lg:pb-2">
              <p className="max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base">
                Cuéntenos qué construye. Validamos el material,
                calculamos el volumen y organizamos la entrega en obra.
              </p>

              <a
                href="/devis"
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] sm:w-auto"
              >
                Hablar de mi obra
                <ArrowIcon />
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 rounded-[20px] bg-[#f4f2ed] px-6 py-8 text-center shadow-[0_12px_40px_-16px_rgba(23,23,23,0.18)] sm:mt-16 sm:rounded-[24px] sm:py-10">
            <p className="text-balance text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-[#171717]">
              Todos nuestros productos
            </p>
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 animate-chevron-bounce text-[#171717]/60 motion-reduce:animate-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </Reveal>

          <RevealStagger as="ul" className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {MATERIALS.map((material, index) => (
              <RevealItem as="li" key={material.id} className="flex">
                <ProductCard
                  material={material}
                  index={index}
                  total={MATERIALS.length}
                />
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal as="article" className="relative mt-6 grid items-center gap-8 overflow-hidden rounded-[20px] bg-[#171717] p-6 sm:mt-8 sm:rounded-[24px] sm:p-10 lg:mt-10 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-14 lg:p-14">
            <div className="flex flex-col items-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                Transporte y entrega
              </p>

              <h3 className="mt-5 max-w-[13ch] text-balance text-[clamp(1.875rem,4vw,3.25rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">
                Entregado directamente en la obra.
              </h3>

              <p className="mt-5 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-zinc-400 sm:text-base">
                Camiones volquete 8×4, horarios ajustados a su planificación y
                descarga coordinada con su jefe de obra.
              </p>

              <ul className="mt-8 flex flex-col gap-3 text-[0.9375rem] text-zinc-300">
                {[
                  "Plazo confirmado en su presupuesto",
                  "Acceso a la obra estudiado de antemano",
                  "Albarán y volumen controlados",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/devis"
                className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#171717] transition-colors duration-300 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:w-auto"
              >
                Organizar una entrega
                <ArrowIcon />
              </a>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-white/[0.06]">
              <Image
                src={DELIVERY_IMAGE}
                alt="Camión volquete 8×4 de JF Caribe, listo para una entrega de granulados"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 512px"
              />
            </div>
          </Reveal>

          <Reveal className="mt-14 flex flex-col gap-8 border-t border-black/[0.09] pt-10 sm:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                Asesoramiento y estimación
              </p>
              <h3 className="mt-4 max-w-[22ch] text-balance text-[clamp(1.625rem,3.4vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#171717]">
                Indique sus dimensiones, calculamos el volumen.
              </h3>
              <p className="mt-4 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base">
                Respuesta clara en 24 h: material adaptado, cantidad en m³,
                disponibilidad en stock y coste del transporte.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:shrink-0">
              <a
                href="/devis"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed]"
              >
                Solicitar presupuesto
                <ArrowIcon />
              </a>

              <a
                href={`tel:${CONTACT_PHONE}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-7 py-3.5 text-[15px] font-semibold text-[#171717] transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed]"
              >
                Llamar — {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
