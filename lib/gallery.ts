import type { StaticImageData } from "next/image";
import quarryImg from "@/src/images/gallery/chantier-quarry.webp";
import deliverySiteImg from "@/src/images/gallery/livraison-engins-chantier.webp";
import truckFleetImg from "@/src/images/gallery/camion-benne-flotte.webp";
import productionImg from "@/src/images/gallery/stocks-production.webp";

export type GalleryItem = {
  id: string;
  image: StaticImageData;
  alt: string;
  caption: string;
  description: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "chantier-quarry",
    image: quarryImg,
    alt: "Vista aérea de una obra con excavadora y stocks de granulados",
    caption: "Obra y extracción",
    description: "Maquinaria y stocks de granulados en sitio.",
  },
  {
    id: "livraison-chantier",
    image: deliverySiteImg,
    alt: "Camión volquete y maquinaria de obra en la Riviera Maya",
    caption: "Entrega en obra",
    description: "Volquete 8×4 y maquinaria coordinada en sus accesos.",
  },
  {
    id: "camion-benne",
    image: truckFleetImg,
    alt: "Camión volquete Mercedes Actros listo para una entrega de materiales",
    caption: "Flota de entrega",
    description: "Vehículos mantenidos para sus horarios de obra.",
  },
  {
    id: "stocks-production",
    image: productionImg,
    alt: "Sitio de producción con cintas transportadoras, cargadora y stocks de granulados",
    caption: "Stocks y producción",
    description: "Materiales disponibles, volúmenes controlados en continuo.",
  },
];
