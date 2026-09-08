import Image from "next/image";
import Link from "next/link";
import { RevealHero, RevealItem, RevealStagger } from "@/components/Reveal";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/faq";
import { ArrowRight, Clock, Mail, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import contactBackground from "@/src/images/gallery/livraison-camion-chantier.webp";
import logoJfCaribe from "@/src/images/logo-jf-caribe.png";

const TRUST_POINTS = [
  { icon: Clock, label: "Respuesta en 24 h hábiles" },
  { icon: ShieldCheck, label: "Presupuesto gratuito, sin compromiso" },
  { icon: Truck, label: "Camiones de 3 a 14 m³" },
] as const;

const CHANNELS = [
  {
    icon: Mail,
    eyebrow: "Escribir",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: Phone,
    eyebrow: "Llamar",
    value: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE}`,
    external: false,
  },
  {
    icon: MessageCircle,
    eyebrow: "WhatsApp",
    value: "Mensaje directo",
    href: WHATSAPP_URL,
    external: true,
  },
] as const;

export default function ContactHero() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white p-3 pt-[calc(3.5rem+env(safe-area-inset-top)+0.75rem)] sm:p-4 md:p-[30px] md:pb-6"
    >
      <div className="relative overflow-hidden rounded-[18px] bg-[#171717] sm:rounded-[25px]">
        <Image
          src={contactBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#171717]/85 to-[#171717]/45"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#171717] to-transparent"
          aria-hidden
        />

        <Link
          href="/"
          aria-label="JF Caribe — volver al inicio"
          className="absolute left-5 top-5 z-20 hidden h-[88px] w-[110px] items-center justify-center rounded-[18px] bg-white p-3.5 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:flex"
        >
          <Image
            src={logoJfCaribe}
            alt=""
            sizes="124px"
            className="h-full w-full object-contain object-center"
          />
        </Link>

        <div className="relative z-10 px-5 pb-10 pt-9 sm:px-8 sm:pb-14 sm:pt-[9rem] md:px-12 md:pb-16 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
              <RevealHero>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Contacto y presupuesto
                </p>

                <h1
                  id="contact-heading"
                  className="mt-5 text-balance text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
                >
                  Hablemos de su obra.
                </h1>

                <p className="mt-5 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-white/70 sm:text-[17px] sm:leading-[1.6]">
                  Describa sus materiales, volúmenes y accesos. Le respondemos con
                  un presupuesto claro, un plazo firme y un solo interlocutor
                  hasta la entrega.
                </p>

                <ul className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                  {TRUST_POINTS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 text-[0.875rem] text-white/65"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-orange-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {label}
                    </li>
                  ))}
                </ul>

                <a
                  href="#formulaire"
                  className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-orange-500 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:w-auto"
                >
                  Rellenar el formulario
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </RevealHero>

              <RevealStagger as="ul" className="flex flex-col gap-3">
                {CHANNELS.map(({ icon: Icon, eyebrow, value, href, external }) => (
                  <RevealItem as="li" key={href}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-4 backdrop-blur-sm transition-colors duration-200 hover:border-orange-400/50 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:px-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-orange-400 transition-colors duration-200 group-hover:bg-orange-500 group-hover:text-white">
                        <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                          {eyebrow}
                        </span>
                        <span className="mt-1 block truncate text-[0.9375rem] font-semibold text-white sm:text-base">
                          {value}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-white/30 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-orange-400 motion-reduce:transition-none"
                        aria-hidden
                      />
                    </a>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
