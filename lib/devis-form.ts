export const DEVIS_PROJECT_TYPES = [
  {
    value: "materiaux",
    label: "Materiales",
    hint: "Grava, arena, granulados",
  },
  {
    value: "travaux",
    label: "Obras",
    hint: "Movimiento de tierras, demolición",
  },
  {
    value: "mixte",
    label: "Ambos",
    hint: "Materiales + servicios",
  },
] as const;

export const DEVIS_DEADLINES = [
  { value: "urgent", label: "En 48 h" },
  { value: "semaine", label: "Esta semana" },
  { value: "mois", label: "Este mes" },
  { value: "flexible", label: "Flexible" },
] as const;

export type DevisProjectType = (typeof DEVIS_PROJECT_TYPES)[number]["value"];
export type DevisDeadline = (typeof DEVIS_DEADLINES)[number]["value"];

export type DevisFormFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: DevisProjectType;
  siteAddress: string;
  deadline: DevisDeadline | "";
  need: string;
};

export function isDevisProjectType(value: string): value is DevisProjectType {
  return DEVIS_PROJECT_TYPES.some((option) => option.value === value);
}

export function isDevisDeadline(value: string): value is DevisDeadline {
  return DEVIS_DEADLINES.some((option) => option.value === value);
}
