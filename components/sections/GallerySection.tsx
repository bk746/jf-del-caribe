import GalleryGrid from "@/components/sections/GalleryGrid";
import { Reveal } from "@/components/Reveal";
import { GALLERY_ITEMS } from "@/lib/gallery";

export default function GallerySection() {
  return (
    <section
      id="galerie"
      aria-labelledby="gallery-heading"
      className="scroll-mt-3 bg-white p-3 pb-10 pt-12 sm:scroll-mt-6 sm:p-6 sm:pb-12 sm:pt-16 md:p-[30px] md:pb-14 md:pt-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal as="header" className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,23rem)] lg:items-end lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
              Galería de obra
            </p>

            <h2
              id="gallery-heading"
              className="mt-5 max-w-[14ch] text-balance text-[clamp(2.125rem,5.5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#171717] sm:mt-6"
            >
              En el terreno.
            </h2>
          </div>

          <p className="max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base lg:pb-1">
            Entregas, stocks y materiales — la prueba visual de nuestra
            presencia en sus obras en la Riviera Maya.
          </p>
        </Reveal>

        <GalleryGrid items={GALLERY_ITEMS} />
      </div>
    </section>
  );
}
