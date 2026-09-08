import type { StaticImageData } from "next/image";
import demolitionImg from "@/src/images/services/demolition.webp";
import enlevementGravatsImg from "@/src/images/services/enlevement-gravats.webp";
import evacuationImg from "@/src/images/services/evacuation-transport.webp";
import nettoyageImg from "@/src/images/services/nettoyage-terrains.webp";
import preparationImg from "@/src/images/services/preparation-chantier.webp";
import terrassementImg from "@/src/images/services/terrassement.webp";

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Medios movilizados — señal concreta de capacidad para un cliente BTP. */
  equipment: string;
  image: StaticImageData;
  imageAlt: string;
  href: string;
};

export const SERVICES: Service[] = [
  {
    id: "nettoyage-terrains",
    title: "Limpieza de terrenos",
    description:
      "Desbroce, nivelación y acondicionamiento de parcelas antes de las obras.",
    equipment: "Cargadora · Volquete",
    image: nettoyageImg,
    imageAlt: "Limpieza de terreno con cargadora y camión volquete",
    href: "/devis",
  },
  {
    id: "demolition",
    title: "Demolición",
    description:
      "Demolición selectiva o completa de edificios, muros y obras ligeras.",
    equipment: "Excavadora · Clasificación in situ",
    image: demolitionImg,
    imageAlt: "Excavadora en acción en un edificio en demolición",
    href: "/devis",
  },
  {
    id: "evacuation-transport",
    title: "Evacuación y transporte",
    description:
      "Retiro de escombros y residuos de obra hacia centros autorizados.",
    equipment: "Camión volquete 8×4",
    image: evacuationImg,
    imageAlt: "Carga de residuos de obra en un camión volquete",
    href: "/devis",
  },
  {
    id: "terrassement",
    title: "Movimiento de tierras",
    description:
      "Excavación, relleno y nivelación para cimentaciones, vías y redes.",
    equipment: "Excavadora · Niveladora",
    image: terrassementImg,
    imageAlt: "Movimiento de tierras en una obra junto al mar",
    href: "/devis",
  },
  {
    id: "preparation-chantier",
    title: "Preparación de obra",
    description:
      "Accesos, plataformas de trabajo y acondicionamiento antes de la entrega.",
    equipment: "Compactación · Vía provisional",
    image: preparationImg,
    imageAlt: "Preparación de obra con excavadora y stocks de materiales",
    href: "/devis",
  },
  {
    id: "enlevement-gravats",
    title: "Retiro de escombros",
    description:
      "Recogida y evacuación de escombros, contenedores adaptados a su volumen.",
    equipment: "Contenedores · Big bag",
    image: enlevementGravatsImg,
    imageAlt: "Evacuación de escombros con camión volquete en obra",
    href: "/devis",
  },
];
