import Image from "next/image";
import ArrowIcon from "@/components/sections/ArrowIcon";
import { Reveal, RevealFade } from "@/components/Reveal";
import aboutImage from "@/src/images/services/terrassement.webp";

const PROOFS = [
  { value: "3–14 m³", label: "Volúmenes entregados" },
  { value: "24 h", label: "Presupuesto obra" },
  { value: "100 %", label: "Riviera Maya" },
] as const;

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-heading"
      className="scroll-mt-3 bg-white px-3 pb-3 pt-0 sm:scroll-mt-6 sm:px-6 sm:pb-6 md:px-[30px] md:pb-[30px]"
    >
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[16px] border border-[#171717]/8 bg-white px-4 py-14 shadow-[0_12px_32px_-10px_rgba(23,23,23,0.08)] sm:rounded-[24px] sm:px-8 sm:py-16 md:rounded-[30px] md:px-10 md:py-20 lg:px-14 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 xl:gap-20">
          <Reveal className="flex flex-col gap-8 sm:gap-10">
            <header className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                Nosotros
              </p>

              <h2
                id="about-heading"
                className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#171717]"
              >
                Su socio de obra en la Riviera Maya
              </h2>

              <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base">
                JF Del Caribe combina stock de materiales, flota de camiones y
                equipos de obra para entregar, preparar y limpiar sus proyectos
                — un solo interlocutor, del presupuesto a la entrega.
              </p>
            </header>

            <dl className="grid grid-cols-3 gap-4 border-y border-[#171717]/10 py-6 sm:gap-6">
              {PROOFS.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight text-[#171717]">
                    {item.value}
                  </dd>
                  <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45 sm:text-[11px]">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                  Misión
                </p>
                <p className="mt-2 text-pretty text-[0.875rem] leading-relaxed text-black/60 sm:text-[15px]">
                  Materiales, maquinaria y servicios especializados — calidad,
                  seguridad y reactividad al servicio de sus proyectos.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                  Visión
                </p>
                <p className="mt-2 text-pretty text-[0.875rem] leading-relaxed text-black/60 sm:text-[15px]">
                  Convertirnos en la referencia regional de suministro y
                  servicios de obra en construcción.
                </p>
              </div>
            </div>

            <a
              href="/devis"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
            >
              Solicitar presupuesto
              <ArrowIcon />
            </a>
          </Reveal>

          <RevealFade className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_12px_32px_-10px_rgba(23,23,23,0.1)] sm:aspect-[5/6] sm:rounded-[24px] md:rounded-[28px]">
            <Image
              src={aboutImage}
              alt="Movimiento de tierras en una obra junto al mar"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </RevealFade>
        </div>
      </div>
    </section>
  );
}
