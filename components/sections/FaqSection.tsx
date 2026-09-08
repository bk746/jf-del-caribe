import FaqAccordion from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  FAQ_ITEMS,
} from "@/lib/faq";

const linkClassName =
  "font-semibold text-orange-600 underline decoration-orange-500/40 underline-offset-[0.18em] transition-colors hover:text-orange-700 hover:decoration-orange-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-3 bg-white px-3 pb-16 pt-6 sm:scroll-mt-6 sm:px-6 sm:pb-20 sm:pt-8 md:px-[30px] md:pb-24 md:pt-10"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal as="header" className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
            Soporte y respuestas
          </p>

          <h2
            id="faq-heading"
            className="mt-4 text-balance text-[clamp(1.875rem,4.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-[#171717]"
          >
            Preguntas{" "}
            <span className="text-orange-600">frecuentes</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-[#171717]/75 sm:mt-6 sm:text-base">
            ¿Tiene preguntas? Le damos las respuestas a continuación.
            <br className="hidden sm:inline" /> También puede escribirnos a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
              {CONTACT_EMAIL}
            </a>{" "}
            o llamar al{" "}
            <a href={`tel:${CONTACT_PHONE}`} className={linkClassName}>
              {CONTACT_PHONE_DISPLAY}
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="mt-10 sm:mt-14">
          <FaqAccordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
