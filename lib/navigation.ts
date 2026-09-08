export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Nosotros", href: "/#a-propos" },
  { label: "Productos", href: "/#produits" },
  { label: "Servicios", href: "/#services" },
  { label: "Galería", href: "/#galerie" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contacto", href: "/devis#contact", highlight: true },
];

export const SECONDARY_NAV: NavLink[] = [
  { label: "Solicitar presupuesto", href: "/devis", highlight: true },
  { label: "Ubicación", href: "/#localisation" },
  { label: "Contacto", href: "/devis#contact" },
];

export const FOOTER_NAV: NavLink[] = [
  { label: "Nosotros", href: "/#a-propos" },
  { label: "Productos", href: "/#produits" },
  { label: "Servicios", href: "/#services" },
  { label: "Galería", href: "/#galerie" },
  { label: "FAQ", href: "/#faq" },
  { label: "Ubicación", href: "/#localisation" },
];
