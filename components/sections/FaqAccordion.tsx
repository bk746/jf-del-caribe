"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faq";

function PlusToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out motion-reduce:transition-none sm:h-11 sm:w-11 ${
        open
          ? "rotate-45 border-orange-500 bg-orange-500 text-white shadow-[0_4px_14px_-4px_rgba(234,88,12,0.55)]"
          : "border-orange-500/40 bg-white text-orange-600"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        <path d="M8 3.5v9M3.5 8h9" />
      </svg>
    </span>
  );
}

function FaqAnswer({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-3 border-t border-orange-500/20 pt-4">
      {paragraphs.map((paragraph) => {
        const lines = paragraph.split("\n");
        const isList = lines.every(
          (line) => line.trim().startsWith("•") || line.trim().startsWith("-"),
        );

        if (isList) {
          return (
            <ul key={paragraph} className="space-y-2 pl-1">
              {lines.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#171717]/75 sm:text-base"
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{line.replace(/^[-•]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={paragraph}
            className="text-pretty text-[0.9375rem] leading-relaxed text-[#171717]/75 sm:text-base"
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <ul className="flex flex-col gap-3 sm:gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <li
            key={item.id}
            className={`overflow-hidden rounded-[20px] transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none sm:rounded-[24px] ${
              isOpen
                ? "bg-[#ffe8d9] shadow-[0_10px_32px_-14px_rgba(23,23,23,0.1)]"
                : "bg-[#fff0e6] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-14px_rgba(23,23,23,0.12)] motion-reduce:hover:translate-y-0"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-[3.75rem] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff0e6] sm:min-h-[4.25rem] sm:gap-6 sm:px-6 sm:py-5"
              >
                <span
                  className={`text-pretty text-[1rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.0625rem] ${
                    isOpen ? "text-orange-700" : "text-[#171717]"
                  }`}
                >
                  {item.question}
                </span>
                <PlusToggleIcon open={isOpen} />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid px-5 transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none sm:px-6 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 sm:pb-6">
                  <FaqAnswer text={item.answer} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
