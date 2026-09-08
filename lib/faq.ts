export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "materiaux",
    question: "¿Qué materiales entregan?",
    answer:
      "Grava mixta, gravilla, polvo, cemantante, piedras de mampostería y tierra negra — a granel o en Big Bag según el producto y el acceso a su obra.",
  },
  {
    id: "volumes",
    question: "¿Qué volúmenes de entrega ofrecen?",
    answer:
      "Entrega en camiones de 3 a 14 m³ según el vehículo y el volumen solicitado. Camión volquete 8×4 para grandes tonelajes, Big Bag para accesos restringidos.",
  },
  {
    id: "zone",
    question: "¿Intervienen en toda la Riviera Maya?",
    answer:
      "Sí, principalmente en Playa del Carmen y la Riviera Maya (Quintana Roo). Indique la dirección de su obra: confirmamos la viabilidad en 24 h.",
  },
  {
    id: "obtenir-devis",
    question: "¿Cómo obtener un presupuesto?",
    answer:
      "Mediante el formulario en línea, por correo electrónico o por teléfono. Describa materiales, volúmenes y accesos: respondemos en 24 h hábiles con un presupuesto claro.",
  },
  {
    id: "location-engins",
    question: "¿Alquiler de maquinaria con o sin operador?",
    answer:
      "Sí, alquiler con o sin operador según sus necesidades y la duración de la obra. Especifique la maquinaria y las fechas en su solicitud de presupuesto.",
  },
  {
    id: "travaux",
    question: "¿Qué trabajos realizan?",
    answer:
      "Limpieza de terrenos, demolición, movimiento de tierras, preparación de obra, evacuación y retiro de escombros — materiales, maquinaria y servicios con un solo interlocutor.",
  },
  {
    id: "devis-gratuit",
    question: "¿El presupuesto es gratuito?",
    answer:
      "Sí, el presupuesto es gratuito y sin compromiso. Recibe material recomendado, volumen estimado, modo de entrega y tarifa en 24 h hábiles.",
  },
];

export const CONTACT_EMAIL = "contact@jfcaribe.com";
export const CONTACT_PHONE = "+529841256831";
export const CONTACT_PHONE_DISPLAY = "+52 984 125 6831";

const WHATSAPP_PHONE = CONTACT_PHONE.replace(/\D/g, "");

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hola, me gustaría un presupuesto para mi obra.",
)}`;
