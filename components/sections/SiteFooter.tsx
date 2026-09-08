import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/sections/ArrowIcon";
import { Reveal } from "@/components/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from "@/lib/faq";
import { LOCATION } from "@/lib/location";
import { FOOTER_NAV } from "@/lib/navigation";
import logoJfCaribe from "@/src/images/logo-jf-caribe.png";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white p-3 pt-10 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6 sm:pt-14 md:p-[30px] md:pt-20"
    >
      <Reveal className="overflow-hidden rounded-[16px] bg-[#171717] sm:rounded-[24px] md:rounded-[30px]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
            <div className="md:col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-[16px] bg-white p-1.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:h-20 sm:w-20 sm:rounded-[20px] sm:p-2"
                aria-label="JF Caribe — volver al inicio"
              >
                <Image
                  src={logoJfCaribe}
                  alt=""
                  className="h-full w-full object-contain object-center"
                  sizes="80px"
                />
              </Link>

              <p className="mt-6 max-w-[18ch] text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                Materiales de obra, entregados según su presupuesto.
              </p>

              <p className="mt-4 max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-zinc-400">
                Grava, arena y granulados desde {LOCATION.city}. Presupuesto en
                24 h, entrega según su presupuesto.
              </p>

              <a
                href="/devis"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] sm:w-auto"
              >
                Solicitar presupuesto
                <ArrowIcon />
              </a>
            </div>

            <nav aria-label="Mapa del sitio">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                Navegación
              </p>

              <ul className="mt-5 flex flex-col gap-1">
                {FOOTER_NAV.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-[1.0625rem] font-semibold text-white transition-colors duration-200 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                Oficina
              </p>

              <address className="mt-5 not-italic">
                <p className="text-[1.0625rem] font-semibold text-white">
                  {LOCATION.name}
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-zinc-400">
                  {LOCATION.addressLine}
                </p>
              </address>

              <ul className="mt-5 flex flex-col gap-1">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-zinc-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-zinc-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-zinc-500 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p>
              © {year} {LOCATION.name}. Todos los derechos reservados.
            </p>
            <p>
              {LOCATION.city}, {LOCATION.region}
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
