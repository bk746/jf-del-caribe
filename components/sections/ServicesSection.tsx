import Image from "next/image";
import ArrowIcon from "@/components/sections/ArrowIcon";
import ServiceCard from "@/components/sections/ServiceCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";
import vectorBg from "@/src/images/svg/Vector 2.png";

const vectorDecoClassName =
  "pointer-events-none absolute left-0 z-[100] h-[22rem] w-[min(88vw,52rem)] sm:left-4 sm:h-[26rem] sm:w-[min(72vw,64rem)] md:left-8 md:h-[28rem] md:w-[min(58vw,72rem)] lg:left-12 lg:h-[30rem] lg:w-[60rem]";

const vectorDecoBottomClassName =
  "pointer-events-none absolute right-0 z-[100] h-[22rem] w-[min(88vw,52rem)] sm:right-4 sm:h-[26rem] sm:w-[min(72vw,64rem)] md:right-8 md:h-[28rem] md:w-[min(58vw,72rem)] lg:right-12 lg:h-[30rem] lg:w-[60rem]";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-3 overflow-hidden bg-white p-3 pb-16 pt-12 sm:scroll-mt-6 sm:p-6 sm:pb-20 sm:pt-16 md:p-[30px] md:pb-24 md:pt-20 lg:pt-24"
    >
      <div
        className={`${vectorDecoClassName} top-10 sm:top-14 md:top-16 lg:top-20`}
        aria-hidden
      >
        <Image
          src={vectorBg}
          alt=""
          fill
          className="origin-center rotate-90 object-contain object-left-top opacity-[0.35]"
          sizes="(max-width: 1024px) 768px, 960px"
        />
      </div>

      <div
        className={`${vectorDecoBottomClassName} bottom-10 sm:bottom-14 md:bottom-16 lg:bottom-20`}
        aria-hidden
      >
        <Image
          src={vectorBg}
          alt=""
          fill
          className="origin-center rotate-90 object-contain object-right-bottom opacity-[0.35]"
          sizes="(max-width: 1024px) 768px, 960px"
        />
      </div>

      <div className="relative z-[101] mx-auto max-w-[1440px]">
        <Reveal as="header" className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,23rem)] lg:items-end lg:gap-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
              Obras y servicios
            </p>

            <h2
              id="services-heading"
              className="mt-6 max-w-[15ch] text-balance text-[clamp(2.125rem,5.5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#171717] sm:mt-7"
            >
              Toda la obra, de la A a la Z.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-8">
            <p className="max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base">
              Más allá de la venta de materiales, nuestros equipos preparan,
              demuelen, limpian y evacuan — con nuestra propia maquinaria y
              nuestra red de camiones.
            </p>

            <a
              href="/devis"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
            >
              Presupuestar mis obras
              <ArrowIcon />
            </a>
          </div>
        </Reveal>

        <RevealStagger as="ul" className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          {SERVICES.map((service, index) => (
            <RevealItem as="li" key={service.id} className="flex">
              <ServiceCard
                service={service}
                stagger={index % 3 === 1}
              />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-16 flex justify-center sm:mt-20 lg:mt-24">
          <a
            href="/devis"
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            Solicitar presupuesto de obras
            <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
