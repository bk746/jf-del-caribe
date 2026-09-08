import type { StaticImageData } from "next/image";
import cemantanteImg from "@/src/images/materials/cemantante.png";
import gravaMixtaImg from "@/src/images/materials/grava-mixta.png";
import gravillaImg from "@/src/images/materials/gravilla.png";
import piedrasImg from "@/src/images/materials/piedras-mamposteria.webp";
import polvoImg from "@/src/images/materials/polvo.png";
import truckImg from "@/src/images/materials/livraison-camion.webp";
import tierraNegraImg from "@/src/images/6908f1b99bf7a90405d25eaf_66f4656892574f3240ff9572_Compost.webp";

export type Material = {
  id: string;
  name: string;
  description: string;
  /** Granulometría o característica técnica, mostrada en meta de tarjeta */
  spec: string;
  /** Formato de venta */
  format: string;
  image: StaticImageData;
  /**
   * `cutout` : mano sosteniendo el material, recortada y encuadrada por
   * `scripts/prepare-material-assets.mjs` — da la escala del granulado.
   * `cover` : material vendido a granel, mostrado en textura a pantalla completa.
   */
  imageKind: "cutout" | "cover";
};

/** Granulados y ligantes primero (recortados), materiales a granel después (texturas). */
export const MATERIALS: Material[] = [
  {
    id: "grava-mixta",
    name: "Grava mixta",
    description: "Hormigón, relleno y cimentaciones.",
    spec: "0/31,5 mm",
    format: "A granel",
    image: gravaMixtaImg,
    imageKind: "cutout",
  },
  {
    id: "gravilla",
    name: "Gravilla",
    description: "Senderos, drenaje y hormigón visto.",
    spec: "6/14 mm",
    format: "A granel · Big bag",
    image: gravillaImg,
    imageKind: "cutout",
  },
  {
    id: "polvo",
    name: "Polvo",
    description: "Revestimientos, juntas y acabados.",
    spec: "0/4 mm",
    format: "A granel · Big bag",
    image: polvoImg,
    imageKind: "cutout",
  },
  {
    id: "cemantante",
    name: "Cemantante",
    description: "Estabilización de suelos y morteros.",
    spec: "Ligante hidráulico",
    format: "Big bag",
    image: cemantanteImg,
    imageKind: "cutout",
  },
  {
    id: "piedras-mamposteria",
    name: "Piedras mampostería",
    description: "Muros, contenciones y enrocados.",
    spec: "15/30 cm",
    format: "A granel · Paleta",
    image: piedrasImg,
    imageKind: "cover",
  },
  {
    id: "tierra-negra",
    name: "Tierra negra",
    description: "Jardines y paisajismo.",
    spec: "Tierra cribada",
    format: "A granel",
    image: tierraNegraImg,
    imageKind: "cover",
  },
];

/** Foto HD del camión volquete 8×4, fuente `livraison-camion-source.png`. */
export const DELIVERY_IMAGE = truckImg;

export function getMaterialById(id: string): Material | undefined {
  return MATERIALS.find((material) => material.id === id);
}

export function getOtherMaterials(currentId: string, limit = 3): Material[] {
  return MATERIALS.filter((material) => material.id !== currentId).slice(
    0,
    limit,
  );
}
