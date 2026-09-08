import type { FaqItem } from "@/lib/faq";

export type ProductProfileRow = {
  profile: string;
  spec: string;
  usage: string;
};

export type ProductDetail = {
  materialId: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  category: string;
  description: string[];
  density: string;
  profiles: {
    title: string;
    intro: string;
    table: ProductProfileRow[];
  };
  faq: FaqItem[];
};

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "grava-mixta": {
    materialId: "grava-mixta",
    seoTitle: "Entrega de grava mixta 0/31,5 mm | JF Caribe",
    seoDescription:
      "Grava mixta 0/31,5 mm para hormigón, relleno y cimentaciones. Entrega a granel en obra en Playa del Carmen y Quintana Roo. Presupuesto en 24 h.",
    headline: "Entrega de grava mixta",
    category: "Grava",
    description: [
      "La grava mixta es una **grava mixta 0/31,5 mm** — uno de los granulados más utilizados en obras de construcción en la Riviera Maya. Combina arena y grava para ofrecer **compacidad** y **resistencia mecánica**.",
      "Se emplea para **hormigón estructural**, **rellenos** bajo losa, **capas de forma**, **cimentaciones** y **preparación de plataformas**. Su densidad compactada se sitúa entre **1,7 y 1,9 t/m³**.",
      "En zona tropical, es adecuada para cimentaciones, losas, rellenos de piscina y movimientos de tierra, respetando compactación y espesores previstos en el proyecto. No confundir con gravilla decorativa 6/14 mm, reservada al drenaje o acabado.",
      "JF Caribe la entrega **a granel en camión volquete 8×4**, directamente en la obra. **Presupuesto en 24 h** — el **plazo de entrega se confirma en su presupuesto** (volumen, accesos, planificación).",
    ],
    density: "1,7 a 1,9 t/m³",
    profiles: {
      title: "¿Qué tamaño para su obra?",
      intro:
        "Grava mixta estándar a granel — elija la granulometría según su obra.",
      table: [
        {
          profile: "Grava mixta",
          spec: "0/20 mm",
          usage: "Hormigón corriente, soleras, acabados",
        },
        {
          profile: "Grava mixta",
          spec: "0/31,5 mm",
          usage: "Relleno, cimentaciones, losas, capa de forma",
        },
        {
          profile: "Grava mixta",
          spec: "0/40 mm",
          usage: "Relleno pesado, plataformas, accesos de obra",
        },
      ],
    },
    faq: [
      {
        id: "grava-beton",
        question: "¿Se puede hacer hormigón con grava mixta 0/31,5 mm?",
        answer:
          "Sí, es uno de los usos principales. Asociada al cemento y al agua, constituye el granulado del hormigón para cimentaciones, losas y obras corrientes.",
      },
      {
        id: "grava-gravillon",
        question: "¿Qué diferencia hay con gravilla 6/14 mm?",
        answer:
          "La gravilla 6/14 mm sirve para drenaje o decoración. La grava mixta 0/31,5 mm contiene arena y grava: está hecha para hormigón, relleno y capas portantes.",
      },
      {
        id: "grava-livraison",
        question: "¿Qué plazo de entrega en Quintana Roo?",
        answer:
          "El plazo de entrega depende de su presupuesto: volumen, acceso a la obra y disponibilidad. Respondemos al presupuesto en 24 h hábiles con la franja propuesta.",
      },
    ],
  },

  gravilla: {
    materialId: "gravilla",
    seoTitle: "Entrega de gravilla 6/14 mm | JF Caribe",
    seoDescription:
      "Gravilla lavada 6/14 mm para senderos, drenaje y hormigón visto. Entrega a granel o Big Bag en Playa del Carmen. Presupuesto gratuito en 24 h.",
    headline: "Entrega de gravilla",
    category: "Gravilla",
    description: [
      "La gravilla es una **gravilla lavada 6/14 mm**, regular y **drenante**. Granos limpios, sin exceso de finos — una ventaja clave bajo las lluvias tropicales de la costa mexicana, donde la evacuación de aguas pluviales es esencial.",
      "Sirve para **senderos peatonales y transitables**, **drenaje** alrededor de cimentaciones, **hormigón visto**, **macizos paisajísticos** y **lecho de apoyo** bajo adoquines. Densidad: **1,5 a 1,6 t/m³**.",
      "Más ligera que una grava mixta, deja circular el agua sin obstruir los drenes. Para una losa portante o relleno estructural, prefiera grava mixta 0/31,5 mm.",
      "Disponible **a granel o en Big Bag** según volumen y accesibilidad. **Presupuesto en 24 h** — **plazo de entrega según su presupuesto**.",
    ],
    density: "1,5 a 1,6 t/m³",
    profiles: {
      title: "¿Qué perfil para su obra?",
      intro:
        "Elija el perfil según el aspecto, drenaje o acabado deseado.",
      table: [
        {
          profile: "Gravilla triturada",
          spec: "6/14 mm",
          usage: "Drenaje, zanjas, senderos técnicos",
        },
        {
          profile: "Gravilla rodada",
          spec: "6/14 mm",
          usage: "Senderos, macizos, paisajismo exterior",
        },
        {
          profile: "Gravilla lavada premium",
          spec: "6/14 mm",
          usage: "Hormigón visto, terrazas decorativas",
        },
      ],
    },
    faq: [
      {
        id: "gravilla-drain",
        question: "¿La gravilla sirve para un drenaje de cimentación?",
        answer:
          "Sí, con gravilla lavada 6/14 mm. Coloque 20 a 30 cm mínimo alrededor del drenaje, con geotextil para evitar obstrucciones.",
      },
      {
        id: "gravilla-allée",
        question: "¿Qué espesor para un sendero peatonal?",
        answer:
          "5 a 8 cm compactados para acceso peatonal. 8 a 12 cm para acceso de vehículo ligero.",
      },
      {
        id: "gravilla-vs-grava",
        question: "¿Gravilla o grava mixta para mi losa?",
        answer:
          "Para una losa portante, elija grava mixta 0/31,5 mm. La gravilla 6/14 mm sirve para drenaje, senderos o hormigón decorativo.",
      },
    ],
  },

  polvo: {
    materialId: "polvo",
    seoTitle: "Entrega de polvo (arena fina 0/4 mm) | JF Caribe",
    seoDescription:
      "Polvo 0/4 mm para revestimientos, lecho de apoyo y recubrimiento de redes. Entrega a granel o Big Bag en la Riviera Maya. Presupuesto en 24 h.",
    headline: "Entrega de polvo",
    category: "Arena fina",
    description: [
      "El polvo es un **polvo fino 0/4 mm**, cercano a la arena de albañilería. Su finura permite extenderlo fácilmente, compactarse con humedad y llenar los mínimos intersticios — ideal para **acabados** y **trabajos de precisión**.",
      "Uso corriente: **lecho de apoyo para adoquines y solados**, **recubrimiento de canalizaciones**, **arena de juntas**, **revestimientos** y **relleno fino de zanja**. Densidad aparente: **1,5 a 1,6 t/m³**.",
      "No confundir con el cemento (ligante) ni con una grava portante: el polvo es un granulado fino para acabados y redes, no para hormigón estructural.",
      "Entrega **a granel o en Big Bag**, **presupuesto en 24 h**. **Plazo de entrega confirmado en su presupuesto** según accesos y volumen.",
    ],
    density: "1,5 a 1,6 t/m³",
    profiles: {
      title: "¿Qué perfil para su obra?",
      intro:
        "Desde polvo estándar hasta fino lavado, según revestimiento, colocación de adoquines o redes enterradas.",
      table: [
        {
          profile: "Polvo estándar",
          spec: "0/4 mm",
          usage: "Revestimientos corrientes, relleno fino, recubrimiento",
        },
        {
          profile: "Polvo lavado",
          spec: "0/4 mm",
          usage: "Lecho de apoyo, juntas, redes",
        },
        {
          profile: "Polvo silíceo fino",
          spec: "0/4 mm",
          usage: "Revestimientos decorativos, soleras finas",
        },
      ],
    },
    faq: [
      {
        id: "polvo-enduit",
        question: "¿Se pueden hacer revestimientos con polvo?",
        answer:
          "Sí, mezclado con cemento y agua según dosificaciones previstas. El polvo 0/4 mm sirve para revestimientos tradicionales y morteros de colocación.",
      },
      {
        id: "polvo-pavage",
        question: "¿Qué espesor de polvo bajo adoquines?",
        answer:
          "3 a 5 cm sobre una base de grava compactada. Nivelar con regla sin compactador vibrante sobre la capa de apoyo.",
      },
      {
        id: "polvo-beton",
        question: "¿El polvo puede entrar en un hormigón estructural?",
        answer:
          "Para hormigón portante, una arena 0/4 mm controlada asociada a gravilla es preferible. El polvo solo no sustituye un granulado estructural.",
      },
    ],
  },

  cemantante: {
    materialId: "cemantante",
    seoTitle: "Entrega de cemantante (ligante hidráulico) | JF Caribe",
    seoDescription:
      "Ligante hidráulico para estabilización de suelos, morteros y soleras. Entrega Big Bag en la Riviera Maya. Presupuesto en 24 h.",
    headline: "Entrega de cemantante",
    category: "Ligante",
    description: [
      "La cemantante es un **ligante hidráulico** que endurece al contacto con el agua. Sirve para **estabilizar suelos**, elaborar **morteros y soleras**, y **reforzar gravas** en obra.",
      "Entregada en **Big Bag**, se manipula con carretilla elevadora o grúa auxiliar. Densidad: **1,0 a 1,3 t/m³** — más ligera que los granulados, pero sensible a la humedad: almacene bajo cubierta hasta su uso.",
      "Dosificación típica para estabilización: **3 a 6 % de ligante** en peso sobre grava seca, luego compactación inmediata. Nuestros equipos le aconsejan la dosificación adaptada a su obra.",
      "**Presupuesto en 24 h** — **plazo de entrega según su presupuesto**. Posibilidad de agrupar ligante + granulados en la misma ruta de camión.",
    ],
    density: "1,0 a 1,3 t/m³ (según acondicionamiento)",
    profiles: {
      title: "¿Qué perfil para su obra?",
      intro:
        "Mortero corriente, suelo estabilizado u obra exigente — el ligante se adapta a su uso.",
      table: [
        {
          profile: "Cemantante estándar",
          spec: "Big bag",
          usage: "Morteros, soleras, hormigón corriente",
        },
        {
          profile: "Ligante de estabilización",
          spec: "Big bag",
          usage: "Suelo estabilizado, grava ligada, accesos de obra",
        },
        {
          profile: "Ligante alta resistencia",
          spec: "Big bag",
          usage: "Obras sometidas, refuerzos estructurales",
        },
      ],
    },
    faq: [
      {
        id: "cemantante-stabilisation",
        question: "¿Cómo estabilizar una grava con cemantante?",
        answer:
          "Mezcla grava seca + ligante (3 a 6 % en peso) + agua controlada, luego compactación inmediata. La dosificación exacta depende de la capacidad portante buscada.",
      },
      {
        id: "cemantante-stockage",
        question: "¿Cómo almacenar un Big Bag abierto?",
        answer:
          "Consuma rápidamente tras abrir. En clima húmedo, proteja el saco o ciérrelo para preservar el rendimiento.",
      },
      {
        id: "cemantante-livraison",
        question: "¿Entregan cemantante sola o con granulados?",
        answer:
          "Ambos. Agrupar ligante + arena/grava en la misma entrega suele optimizar costes.",
      },
    ],
  },

  "piedras-mamposteria": {
    materialId: "piedras-mamposteria",
    seoTitle: "Entrega de piedras de mampostería | JF Caribe",
    seoDescription:
      "Piedras 15/30 cm para muros, contenciones y enrocados. Entrega a granel o paleta en la Riviera Maya. Presupuesto en 24 h.",
    headline: "Entrega de piedras de mampostería",
    category: "Piedra",
    description: [
      "Las piedras de mampostería son bloques naturales **15 a 30 cm**, colocados con mortero para **muros portantes**, **cercas**, **muretes**, **contenciones** y **enrocados** en mampostería tradicional.",
      "Su **densidad** (**1,6 a 1,8 t/m³**) aporta solidez, inercia térmica y un acabado estético auténtico — muy utilizadas en arquitectura local y paisajismo tropical.",
      "Prevea una **cimentación adecuada** (zapata de hormigón o grava compactada) y **drenaje** detrás de la obra en zona húmeda. Nuestros equipos estudian el acceso a la obra para descarga a granel o paleta.",
      "Entrega **a granel o en paleta**, **presupuesto en 24 h** — **plazo según su presupuesto**. Albarán y volumen controlados a la recepción.",
    ],
    density: "1,6 a 1,8 t/m³",
    profiles: {
      title: "¿Qué perfil para su obra?",
      intro:
        "Muro corriente, fachada cuidada o contención — elija la piedra adaptada a la obra.",
      table: [
        {
          profile: "Piedra local estándar",
          spec: "15/30 cm",
          usage: "Muros corrientes, cercas, muretes",
        },
        {
          profile: "Piedra calibrada",
          spec: "15/30 cm",
          usage: "Fachadas vistas, obras cuidadas",
        },
        {
          profile: "Piedra de contención",
          spec: "15/30 cm",
          usage: "Taludes, enrocados, terrazas",
        },
      ],
    },
    faq: [
      {
        id: "piedras-fondation",
        question: "¿Hace falta cimentación para un murete de piedra?",
        answer:
          "Sí, incluso para un murete bajo. Una zapata de hormigón o grava compactada de 20 a 40 cm evita asentamientos.",
      },
      {
        id: "piedras-mortier",
        question: "¿Qué mortero en zona tropical?",
        answer:
          "Mortero cemento-cal o cemento adaptado a la humedad, con drenaje detrás de la obra.",
      },
      {
        id: "piedras-livraison",
        question: "¿A granel o paleta: qué elegir?",
        answer:
          "A granel para grandes volúmenes y muros largos. Paleta para muretes y obras con manutención limitada.",
      },
    ],
  },

  "tierra-negra": {
    materialId: "tierra-negra",
    seoTitle: "Entrega de tierra negra cribada | JF Caribe",
    seoDescription:
      "Tierra vegetal cribada para césped, macizos y huertos. Entrega a granel en la Riviera Maya. Presupuesto en 24 h.",
    headline: "Entrega de tierra negra",
    category: "Tierra",
    description: [
      "La tierra negra es una **tierra vegetal cribada**, rica en materia orgánica. El cribado elimina piedras, raíces y restos para obtener un **sustrato homogéneo**, fácil de trabajar.",
      "Ideal para **césped**, **macizos**, **huertos** y **nivelación paisajística**. Densidad: **1,2 a 1,4 t/m³** — más ligera que los granulados estructurales.",
      "En clima tropical, una tierra de calidad retiene mejor la humedad mientras drena correctamente. **No usar como relleno de edificación**: se asienta y se descompone con el tiempo.",
      "Entrega **a granel en camión volquete**, directamente en su parcela en la Riviera Maya. **Presupuesto en 24 h** — **plazo de entrega confirmado en su presupuesto**.",
    ],
    density: "1,2 a 1,4 t/m³",
    profiles: {
      title: "¿Qué perfil para su obra?",
      intro:
        "Césped, huerto o paisajismo premium — la tierra se adapta a su proyecto.",
      table: [
        {
          profile: "Tierra cribada estándar",
          spec: "Cribada",
          usage: "Césped, macizos, nivelación",
        },
        {
          profile: "Tierra enriquecida compost",
          spec: "Cribada + compost",
          usage: "Huertos, plantaciones exigentes",
        },
        {
          profile: "Tierra premium jardín",
          spec: "Cribada premium",
          usage: "Paisajismo de alto nivel, parques",
        },
      ],
    },
    faq: [
      {
        id: "tierra-pelouse",
        question: "¿Qué espesor de tierra para un césped?",
        answer:
          "8 a 15 cm según el suelo existente. En suelo pobre, apuntar a 12 a 15 cm para un césped duradero.",
      },
      {
        id: "tierra-compost",
        question: "¿La tierra negra contiene compost?",
        answer:
          "La tierra cribada estándar contiene materia orgánica natural. Una versión enriquecida con compost está disponible bajo pedido.",
      },
      {
        id: "tierra-remblai",
        question: "¿Se puede usar como relleno de edificación?",
        answer:
          "No. La tierra vegetal se asienta y se descompone. Para relleno estructural, use grava mixta o grava adaptada.",
      },
    ],
  },
};

export function getProductDetail(materialId: string): ProductDetail | undefined {
  return PRODUCT_DETAILS[materialId];
}
