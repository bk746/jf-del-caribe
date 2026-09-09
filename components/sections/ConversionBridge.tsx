import Link from "next/link";

const PHRASE =
  "Solicite su presupuesto gratuito y arranque su obra en la Riviera Maya esta misma semana.";
const WORDS = PHRASE.split(" ");
const HIGHLIGHT_WORDS = new Set(["presupuesto", "gratuito", "Riviera", "Maya"]);

function isHighlighted(word: string) {
  return HIGHLIGHT_WORDS.has(word.replace(/[.,!?]/g, ""));
}

export default function ConversionBridge() {
  return (
    <section
      data-conversion-section
      aria-label="Mensaje de conversión"
      className="bg-white px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:px-12 lg:pt-28 lg:pb-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-[#171717] sm:text-4xl lg:text-[3.25rem]">
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <span
                data-conversion-word
                className={`inline-block ${
                  isHighlighted(word) ? "text-orange-600" : "text-[#171717]"
                }`}
              >
                {word}
                {index < WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </p>

        <Link
          data-conversion-cta
          href="/devis"
          className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-orange-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 lg:hidden"
        >
          Formulario de presupuesto completo
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
