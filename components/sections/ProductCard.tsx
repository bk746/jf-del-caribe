import Image from "next/image";
import Link from "next/link";
import type { Material } from "@/lib/products";
import ArrowIcon from "@/components/sections/ArrowIcon";
import GsapHoverCard from "@/components/sections/GsapHoverCard";

type ProductCardProps = {
  material: Material;
  index: number;
  total: number;
};

export default function ProductCard({
  material,
  index,
  total,
}: ProductCardProps) {
  const imageScale = material.imageKind === "cover" ? 1.07 : 1.05;

  return (
    <GsapHoverCard
      imageScale={imageScale}
      className="group relative flex w-full flex-col rounded-[20px] bg-white sm:rounded-[24px]"
    >
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
        <span className="font-mono text-[11px] tracking-tight text-black/35">
          {String(index + 1).padStart(2, "0")}
          <span className="text-black/20">/{String(total).padStart(2, "0")}</span>
        </span>

        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-black/45">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden
          />
          En stock
        </span>
      </div>

      <div
        data-card-media
        className="relative mx-5 mt-4 aspect-[40/21] overflow-hidden rounded-[12px] bg-[#f6f3ee] sm:mx-6"
      >
        <Image
          src={material.image}
          alt={
            material.imageKind === "cutout"
              ? `${material.name} — granulado en la mano, para la escala`
              : `${material.name} — textura del material a granel`
          }
          fill
          className={
            material.imageKind === "cover"
              ? "object-cover object-center will-change-transform"
              : "object-contain object-center will-change-transform"
          }
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
        />
      </div>

      <div className="mt-auto flex flex-col px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-balance text-[clamp(1.375rem,1.6vw+0.75rem,1.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#171717]">
            <Link
              href={`/produits/${material.id}`}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0" aria-hidden />
              {material.name}
              <span className="sr-only"> — ver ficha del producto</span>
            </Link>
          </h3>

          <span
            data-card-arrow
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f2ed] text-[#171717] will-change-transform"
            aria-hidden
          >
            <ArrowIcon />
          </span>
        </div>

        <p className="mt-2.5 max-w-[34ch] text-pretty text-[0.9375rem] leading-relaxed text-black/55">
          {material.description}
        </p>

        {(material.spec.includes("mm") || material.spec.includes("cm")) && (
          <dl className="mt-5 border-t border-black/[0.08] pt-4">
            <dt className="sr-only">Granulometría</dt>
            <dd className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/45">
              {material.spec.replace(/\bmm\b/i, "MM").replace(/\bcm\b/i, "CM")}
            </dd>
          </dl>
        )}
      </div>
    </GsapHoverCard>
  );
}
