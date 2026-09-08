import DevisForm from "@/components/sections/DevisForm";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/faq";
import { COMPANY_ADDRESS } from "@/lib/location";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";

const PROCESS_STEPS = [
  {
    title: "Describe su obra",
    description:
      "Materiales, volúmenes, zona y accesos. Dos minutos bastan para definir la solicitud.",
  },
  {
    title: "Presupuestamos y confirmamos",
    description:
      "Material recomendado, cantidad, modo de entrega y precio — en 24 h hábiles.",
  },
  {
    title: "Entregamos en obra",
    description:
      "Camiones de 3 a 14 m³ según el acceso, con franja confirmada la víspera.",
  },
] as const;

export default function ContactFormSection() {
  return (
    <section
      id="formulaire"
      aria-labelledby="formulaire-heading"
      className="scroll-mt-[4.5rem] bg-white px-3 pb-16 pt-8 sm:scroll-mt-6 sm:px-4 sm:pb-20 sm:pt-10 md:px-[30px] md:pb-24 md:pt-12"
    >
      <div className="mx-auto max-w-[1440px] lg:px-2">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12 xl:gap-16">
          <Reveal className="rounded-[22px] border border-[#171717]/8 bg-white p-5 shadow-[0_24px_70px_-40px_rgba(23,23,23,0.35)] sm:rounded-[28px] sm:p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              Solicitud de presupuesto
            </p>

            <h2
              id="formulaire-heading"
              className="mt-4 text-balance text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#171717]"
            >
              Cuéntenos qué necesita.
            </h2>

            <p className="mt-3 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-[#171717]/55">
              Los campos marcados con{" "}
              <span className="font-semibold text-orange-600">*</span> son
              necesarios para elaborar el presupuesto.
            </p>

            <div className="mt-8 border-t border-[#171717]/8 pt-8">
              <DevisForm />
            </div>
          </Reveal>

          <RevealStagger as="aside" className="flex flex-col gap-4 lg:sticky lg:top-8">
            <RevealItem className="rounded-[22px] bg-[#eceff2] p-6 sm:rounded-[28px] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                Qué ocurre después
              </p>

              <ol className="mt-6 flex flex-col gap-6">
                {PROCESS_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[0.8125rem] font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-[#171717]">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block text-pretty text-[0.875rem] leading-relaxed text-[#171717]/55">
                        {step.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </RevealItem>

            <RevealItem as="address" className="rounded-[22px] border border-[#171717]/8 bg-white p-6 not-italic sm:rounded-[28px] sm:p-8">
              <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Oficina
              </span>

              <p className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.01em] text-[#171717]">
                {COMPANY_ADDRESS.line1}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#171717]/55">
                {COMPANY_ADDRESS.line2}
                <br />
                {COMPANY_ADDRESS.region}
              </p>

              <a
                href={COMPANY_ADDRESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Abrir en Google Maps
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </RevealItem>

            <RevealItem className="rounded-[22px] bg-[#171717] p-6 sm:rounded-[28px] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                Obra urgente
              </p>

              <p className="mt-4 text-balance text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-white">
                ¿Necesita una respuesta inmediata?
              </p>

              <p className="mt-2 text-pretty text-[0.875rem] leading-relaxed text-zinc-400">
                Llámenos o escríbanos por WhatsApp: consultamos la
                disponibilidad de camiones en directo.
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-orange-500 px-5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {CONTACT_PHONE_DISPLAY}
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:border-white/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
