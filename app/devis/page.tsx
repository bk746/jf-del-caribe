import type { Metadata } from "next";
import ContactFaqSection from "@/components/sections/ContactFaqSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import ContactHero from "@/components/sections/ContactHero";
import LocationSection from "@/components/sections/LocationSection";
import SiteFooter from "@/components/sections/SiteFooter";
import { SiteNavProvider } from "@/components/sections/SiteNav";

export const metadata: Metadata = {
  title: "Contacto y presupuesto | JF Caribe",
  description:
    "Contacte con JF Caribe: correo, teléfono, WhatsApp o formulario. Presupuesto gratuito en 24 h para sus materiales y obras en la Riviera Maya.",
  openGraph: {
    title: "Contacto y presupuesto | JF Caribe",
    description:
      "Un solo interlocutor para sus obras — presupuesto gratuito en 24 h en la Riviera Maya.",
  },
};

export default function DevisPage() {
  return (
    <SiteNavProvider>
      <main id="main-content">
        <ContactHero />
        <ContactFormSection />
        <ContactFaqSection />
        <LocationSection />
      </main>
      <SiteFooter />
    </SiteNavProvider>
  );
}
