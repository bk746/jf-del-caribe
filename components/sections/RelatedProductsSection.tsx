import ProductCard from "@/components/sections/ProductCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/Reveal";
import { getOtherMaterials, type Material } from "@/lib/products";

type RelatedProductsSectionProps = {
  currentMaterial: Material;
};

export default function RelatedProductsSection({
  currentMaterial,
}: RelatedProductsSectionProps) {
  const related = getOtherMaterials(currentMaterial.id, 3);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-products-heading"
      className="bg-white p-3 pt-0 sm:p-6 sm:pt-0 md:p-[30px] md:pt-0"
    >
      <div className="overflow-hidden rounded-[16px] bg-[#f4f2ed] px-4 py-14 sm:rounded-[24px] sm:px-8 sm:py-20 md:rounded-[30px] md:px-10 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <Reveal as="header">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
              Catálogo
            </p>
            <h2
              id="related-products-heading"
              className="mt-4 max-w-[20ch] text-balance text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#171717]"
            >
              Otros materiales disponibles
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-black/60 sm:text-base">
              Descubra el resto de nuestro catálogo de granulados, ligantes y
              materiales de obra.
            </p>
          </Reveal>

          <RevealStagger as="ul" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {related.map((material, index) => (
              <RevealItem as="li" key={material.id} className="flex">
                <ProductCard
                  material={material}
                  index={index}
                  total={related.length}
                />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
