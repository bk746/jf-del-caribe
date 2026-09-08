import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/faq";

export const CONTACT_PHONE_LINK = {
  label: "Llamar a JF Caribe",
  display: CONTACT_PHONE_DISPLAY,
  href: `tel:${CONTACT_PHONE}`,
} as const;

export const CONTACT_EMAIL_LINK = {
  label: "Escribir a JF Caribe",
  display: CONTACT_EMAIL,
  href: `mailto:${CONTACT_EMAIL}`,
} as const;

export const CONTACT_WHATSAPP = {
  label: "Contactar por WhatsApp",
  display: "WhatsApp",
  href: WHATSAPP_URL,
} as const;
