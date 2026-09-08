import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
};

type GridSlot = {
  gridColumn: string;
  gridRow: string;
};

const DESKTOP_LAYOUT: GridSlot[] = [
  { gridColumn: "1 / 3", gridRow: "1 / 2" },
  { gridColumn: "3 / 4", gridRow: "1 / 3" },
  { gridColumn: "1 / 2", gridRow: "2 / 3" },
  { gridColumn: "2 / 3", gridRow: "2 / 3" },
];

function GalleryTile({
  item,
  priority = false,
  sizes,
}: {
  item: GalleryItem;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <figure className="group relative h-full w-full overflow-hidden rounded-[20px] bg-[#f6f3ee] sm:rounded-[24px]">
      <Image
        src={item.image}
        alt={item.alt}
        fill
        priority={priority}
        quality={88}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        sizes={sizes}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 motion-reduce:transition-none"
        aria-hidden
      />

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20">
        <p className="text-balance text-[0.9375rem] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-base">
          {item.caption}
        </p>
        <p className="mt-1 hidden text-pretty text-[0.8125rem] leading-relaxed text-white/75 sm:block">
          {item.description}
        </p>
      </figcaption>
    </figure>
  );
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <>
      <div
        data-reveal-stagger
        className="mt-10 grid grid-cols-2 gap-3 sm:hidden"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            data-reveal-item
            className={
              index === 0
                ? "col-span-2 aspect-[16/10]"
                : index === 1
                  ? "aspect-[3/4]"
                  : "aspect-square"
            }
          >
            <GalleryTile
              item={item}
              sizes={index === 0 ? "100vw" : "50vw"}
            />
          </div>
        ))}
      </div>

      <div
        data-reveal-stagger
        className="mt-12 hidden grid-cols-3 gap-4 sm:grid"
        style={{
          gridTemplateRows: "minmax(15rem, 28vw) minmax(13rem, 24vw)",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            data-reveal-item
            className="min-h-0"
            style={{
              gridColumn: DESKTOP_LAYOUT[index]?.gridColumn,
              gridRow: DESKTOP_LAYOUT[index]?.gridRow,
            }}
          >
            <GalleryTile
              item={item}
              sizes={
                index === 0
                  ? "(max-width: 1280px) 66vw, 42vw"
                  : index === 1
                    ? "(max-width: 1280px) 33vw, 22vw"
                    : "(max-width: 1280px) 33vw, 20vw"
              }
            />
          </div>
        ))}
      </div>

      <p
        data-reveal
        className="mt-8 text-center text-[0.875rem] text-black/45 sm:mt-10 sm:text-left"
      >
        {items.length} fotos · Entregas, stocks y materiales en la Riviera Maya
      </p>
    </>
  );
}
