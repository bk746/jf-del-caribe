import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
  Ruler,
  Weight,
} from "lucide-react";
import ArrowIcon from "@/components/sections/ArrowIcon";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Reveal, RevealFade } from "@/components/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from "@/lib/faq";
import { LOCATION } from "@/lib/location";
import type { ProductDetail } from "@/lib/product-details";
import type { Material } from "@/lib/products";

type ProductDetailViewProps = {
  material: Material;
  detail: ProductDetail;
};

function RichParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <p className="text-pretty text-[15px] leading-[1.75] text-[#171717]/80 sm:text-base">
      {parts.map((part) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={part} className="font-semibold text-[#171717]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </p>
  );
}

function SpecIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600"
      aria-hidden
    >
      {children}
    </span>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
      aria-hidden
    >
      {children}
    </span>
  );
}

function SpecRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-black/[0.08] py-4 first:border-t-0 first:pt-0">
      <div className="flex min-w-0 items-center gap-3">
        {icon}
        <span className="text-[15px] text-[#171717]/70">{label}</span>
      </div>
      <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1.5 text-[13px] font-medium text-[#171717] sm:px-4 sm:text-sm">
        {value}
      </span>
    </div>
  );
}

function ProductContactSidebar() {
  return (
    <div className="w-full self-start lg:sticky lg:top-[max(5.5rem,calc(env(safe-area-inset-top)+1rem))]">
      <aside className="h-fit w-full rounded-[20px] bg-[#eceff2] p-5 sm:rounded-[24px] sm:p-6">
        <h2 className="text-[1.0625rem] font-semibold text-[#171717] sm:text-lg">
          ¿Necesita algo?
        </h2>
        <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-[#171717]/65">
          Contáctenos o solicite su presupuesto al instante haciendo clic en el
          botón.
        </p>

        <ul className="mt-5 space-y-3">
        <li>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <ContactIcon>
              <Mail className="h-4 w-4" strokeWidth={2} />
            </ContactIcon>
            <span className="text-[14px] font-medium text-[#171717] sm:text-[15px]">
              {CONTACT_EMAIL}
            </span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <ContactIcon>
              <Phone className="h-4 w-4" strokeWidth={2} />
            </ContactIcon>
            <span className="text-[14px] font-medium text-[#171717] sm:text-[15px]">
              {CONTACT_PHONE_DISPLAY}
            </span>
          </a>
        </li>
        <li className="flex items-center gap-3">
          <ContactIcon>
            <MapPin className="h-4 w-4" strokeWidth={2} />
          </ContactIcon>
          <span className="text-[14px] font-medium text-[#171717] sm:text-[15px]">
            {LOCATION.region}, {LOCATION.country} 🇲🇽
          </span>
        </li>
      </ul>

      <a
        href="/devis"
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-[15px]"
      >
        Solicitar presupuesto
        <ArrowIcon />
      </a>
      </aside>
    </div>
  );
}

export default function ProductDetailView({
  material,
  detail,
}: ProductDetailViewProps) {
  return (
    <article className="bg-white pb-16 pt-[max(5rem,env(safe-area-inset-top))] sm:pb-20 sm:pt-[max(5.5rem,env(safe-area-inset-top))] md:pb-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {/* Fil d'Ariane */}
        <nav aria-label="Ruta de navegación" className="mb-8 sm:mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#171717]/45">
            <li>
              <Link href="/" className="hover:text-[#171717]">
                Inicio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#produits" className="hover:text-[#171717]">
                Productos
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-[#171717]">{material.name}</li>
          </ol>
        </nav>

        {/* Hero — image gauche · infos droite (disposition Koncrete) */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Image produit */}
          <RevealFade className="relative aspect-square overflow-hidden rounded-[20px] bg-[#f4f2ed] sm:rounded-[24px]">
            <Image
              src={material.image}
              alt={
                material.imageKind === "cover"
                  ? `${material.name} — textura del material`
                  : `${material.name} — muestra`
              }
              fill
              className={
                material.imageKind === "cover"
                  ? "object-cover object-center"
                  : "object-contain object-center p-4"
              }
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
            />

            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:bottom-5 sm:right-5 sm:px-4 sm:py-2.5">
              <span className="relative h-7 w-7 overflow-hidden rounded-full bg-[#f4f2ed]">
                <Image
                  src={material.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="28px"
                  aria-hidden
                />
              </span>
              <span className="text-[13px] font-medium text-[#171717] sm:text-sm">
                {detail.category}
              </span>
            </div>
          </RevealFade>

          {/* Caractéristiques */}
          <Reveal className="flex flex-col">
            <h1 className="text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#171717]">
              {detail.headline}
            </h1>

            <h2 className="mt-8 text-[1.125rem] font-semibold text-[#171717] sm:text-xl">
              Características
            </h2>

            <div className="mt-4">
              <SpecRow
                icon={
                  <SpecIcon>
                    <Layers className="h-[18px] w-[18px]" strokeWidth={2} />
                  </SpecIcon>
                }
                label="Tipo de producto:"
                value={detail.category}
              />
              <SpecRow
                icon={
                  <SpecIcon>
                    <Ruler className="h-[18px] w-[18px]" strokeWidth={2} />
                  </SpecIcon>
                }
                label="Granulometría:"
                value={material.spec}
              />
              <SpecRow
                icon={
                  <SpecIcon>
                    <Package className="h-[18px] w-[18px]" strokeWidth={2} />
                  </SpecIcon>
                }
                label="Acondicionamiento:"
                value={material.format}
              />
              <SpecRow
                icon={
                  <SpecIcon>
                    <Weight className="h-[18px] w-[18px]" strokeWidth={2} />
                  </SpecIcon>
                }
                label="Densidad:"
                value={detail.density}
              />
            </div>

            <a
              href="/devis"
              className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:mt-10"
            >
              Solicitar presupuesto
              <ArrowIcon />
            </a>
          </Reveal>
        </div>

        {/* Contenu — texte gauche · sidebar droite (disposition Koncrete) */}
        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-12 xl:gap-16">
          <Reveal className="min-w-0 space-y-6">
            {detail.description.map((paragraph) => (
              <RichParagraph key={paragraph.slice(0, 48)} text={paragraph} />
            ))}

            <h2 className="pt-4 text-[clamp(1.375rem,2.5vw,1.75rem)] font-bold leading-tight tracking-[-0.03em] text-[#171717]">
              {detail.profiles.title}
            </h2>
            <RichParagraph text={detail.profiles.intro} />
            <div className="overflow-x-auto rounded-xl border-[3px] border-orange-500">
              <table className="w-full min-w-[28rem] text-left text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="border-b border-black/[0.08] bg-[#faf9f7]">
                    <th className="px-4 py-3 font-semibold text-[#171717]">Perfil</th>
                    <th className="px-4 py-3 font-semibold text-[#171717]">Tamaño</th>
                    <th className="px-4 py-3 font-semibold text-[#171717]">Obra</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.profiles.table.map((row) => (
                    <tr key={row.profile} className="border-b border-black/[0.06] last:border-0">
                      <td className="px-4 py-3 font-medium text-[#171717]">{row.profile}</td>
                      <td className="px-4 py-3 text-[#171717]/70">{row.spec}</td>
                      <td className="px-4 py-3 text-[#171717]/70">{row.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="pt-4 text-[clamp(1.375rem,2.5vw,1.75rem)] font-bold leading-tight tracking-[-0.03em] text-[#171717]">
              Preguntas frecuentes
            </h2>
            <FaqAccordion items={detail.faq} />
          </Reveal>

          <Reveal>
            <ProductContactSidebar />
          </Reveal>
        </div>
      </div>
    </article>
  );
}
