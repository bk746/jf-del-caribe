import Link from "next/link";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { FAQ_ITEMS } from "@/lib/faq";
import { ArrowRight } from "lucide-react";

const CONTACT_FAQ_IDS = ["obtenir-devis", "devis-gratuit", "volumes", "zone"];

const CONTACT_FAQ_ITEMS = CONTACT_FAQ_IDS.map((id) =>
  FAQ_ITEMS.find((item) => item.id === id),
).filter((item) => item !== undefined);

export default function ContactFaqSection() {
  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="bg-white px-3 pb-16 pt-4 sm:px-4 sm:pb-20 md:px-[30px] md:pb-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
            Antes de enviar
          </p>

          <h2
            id="contact-faq-heading"
            className="mt-4 text-balance text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#171717]"
          >
            Las preguntas que más nos hacen.
          </h2>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <FaqAccordion items={CONTACT_FAQ_ITEMS} />
        </Reveal>

        <Reveal>
          <Link
          href="/#faq"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Ver todas las preguntas
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        </Reveal>
      </div>
    </section>
  );
}
