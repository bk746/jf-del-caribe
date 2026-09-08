import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/sections/ArrowIcon";
import HoverCard from "@/components/sections/HoverCard";
import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
  /** Colonne centrale décalée en `lg`, pour le rythme de la maquette. */
  stagger?: boolean;
};

export default function ServiceCard({
  service,
  stagger = false,
}: ServiceCardProps) {
  return (
    <HoverCard
      imageScale={1.06}
      className={`relative flex w-full flex-col overflow-hidden rounded-[20px] bg-white sm:rounded-[24px] ${stagger ? "lg:mt-8" : ""}`}
    >
      <div
        data-card-media
        className="relative aspect-[4/3] overflow-hidden bg-[#f4f2ed]"
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-balance text-[clamp(1.25rem,1.4vw+0.7rem,1.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#171717]">
            <Link
              href={service.href}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0" aria-hidden />
              {service.title}
              <span className="sr-only"> — solicitar presupuesto</span>
            </Link>
          </h3>

          <span
            data-card-arrow
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f2ed] text-[#171717]"
            aria-hidden
          >
            <ArrowIcon />
          </span>
        </div>

        <p className="mt-2.5 max-w-[34ch] flex-1 text-pretty text-[0.9375rem] leading-relaxed text-black/55">
          {service.description}
        </p>
      </div>
    </HoverCard>
  );
}
