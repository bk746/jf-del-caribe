"use client";

import { useActionState } from "react";
import {
  submitDevisRequest,
  type DevisFormState,
} from "@/app/actions/devis";
import {
  DEVIS_DEADLINES,
  DEVIS_PROJECT_TYPES,
} from "@/lib/devis-form";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/faq";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Loader2,
  Lock,
} from "lucide-react";

const initialState: DevisFormState = { status: "idle" };

const fieldClassName =
  "min-h-12 w-full rounded-2xl border border-[#171717]/12 bg-white px-4 text-[0.9375rem] text-[#171717] shadow-[0_1px_2px_rgba(23,23,23,0.04)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#171717]/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/12 disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName =
  "text-[0.8125rem] font-semibold tracking-[-0.01em] text-[#171717]";

const legendClassName =
  "text-[0.8125rem] font-semibold tracking-[-0.01em] text-[#171717]";

const optionClassName =
  "group flex cursor-pointer items-start gap-3 rounded-2xl border border-[#171717]/12 bg-white px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#171717]/25 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-500/[0.06] has-[:checked]:shadow-[0_1px_2px_rgba(228,95,33,0.12)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-500 has-[:focus-visible]:ring-offset-2";

function RequiredMark() {
  return (
    <span className="text-orange-600" aria-hidden>
      *
    </span>
  );
}

function RadioDot() {
  return (
    <span className="mt-0.5 flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#171717]/25 transition-colors duration-200 group-has-[:checked]:border-orange-500 group-has-[:checked]:bg-orange-500">
      <span className="h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-opacity duration-200 group-has-[:checked]:opacity-100" />
    </span>
  );
}

export default function DevisForm() {
  const [state, formAction, pending] = useActionState(
    submitDevisRequest,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="py-6 text-center sm:py-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600">
          <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
        </span>

        <p className="mx-auto mt-6 max-w-sm text-balance text-[clamp(1.25rem,2.4vw,1.625rem)] font-semibold leading-snug tracking-[-0.025em] text-[#171717]">
          Su solicitud se ha enviado correctamente.
        </p>

        <p className="mx-auto mt-3 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-[#171717]/60">
          {state.message}
        </p>

        <a
          href={`tel:${CONTACT_PHONE}`}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#171717]/12 px-6 text-[0.9375rem] font-semibold text-[#171717] transition-colors duration-200 hover:border-orange-500 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          ¿Obra urgente? {CONTACT_PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="devis-name" className={labelClassName}>
            Nombre completo <RequiredMark />
          </label>
          <input
            id="devis-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={pending}
            placeholder="Juan Pérez"
            className={fieldClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="devis-company" className={labelClassName}>
            Empresa{" "}
            <span className="font-normal text-[#171717]/40">(opcional)</span>
          </label>
          <input
            id="devis-company"
            name="company"
            type="text"
            autoComplete="organization"
            disabled={pending}
            placeholder="Nombre de la empresa"
            className={fieldClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="devis-email" className={labelClassName}>
            Correo electrónico <RequiredMark />
          </label>
          <input
            id="devis-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={pending}
            placeholder="usted@empresa.com"
            className={fieldClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="devis-phone" className={labelClassName}>
            Teléfono <RequiredMark />
          </label>
          <input
            id="devis-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            disabled={pending}
            placeholder="+52 984 000 0000"
            className={fieldClassName}
          />
        </div>
      </div>

      <fieldset className="mt-7" disabled={pending}>
        <legend className={legendClassName}>
          Su necesidad <RequiredMark />
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {DEVIS_PROJECT_TYPES.map((option) => (
            <label key={option.value} className={optionClassName}>
              <input
                type="radio"
                name="projectType"
                value={option.value}
                required
                className="sr-only"
              />
              <RadioDot />
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold leading-snug text-[#171717]">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-[#171717]/50">
                  {option.hint}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex flex-col gap-2">
        <label htmlFor="devis-site-address" className={labelClassName}>
          Zona o dirección de la obra <RequiredMark />
        </label>
        <input
          id="devis-site-address"
          name="siteAddress"
          type="text"
          autoComplete="street-address"
          required
          disabled={pending}
          placeholder="Playa del Carmen, Tulum, Akumal…"
          className={fieldClassName}
        />
      </div>

      <fieldset className="mt-7" disabled={pending}>
        <legend className={legendClassName}>
          Plazo deseado{" "}
          <span className="font-normal text-[#171717]/40">(opcional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {DEVIS_DEADLINES.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-full border border-[#171717]/12 bg-white px-4 py-2.5 text-[0.875rem] font-medium text-[#171717]/70 transition-colors duration-200 hover:border-[#171717]/25 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-500 has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-500 has-[:focus-visible]:ring-offset-2"
            >
              <input
                type="radio"
                name="deadline"
                value={option.value}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex flex-col gap-2">
        <label htmlFor="devis-need" className={labelClassName}>
          Detalles de la obra <RequiredMark />
        </label>
        <textarea
          id="devis-need"
          name="need"
          rows={5}
          required
          disabled={pending}
          placeholder="Ej. 12 m³ de grava mixta, acceso estrecho para camión, entrega deseada el jueves por la mañana."
          className={`${fieldClassName} min-h-[8.5rem] resize-y py-3.5 leading-relaxed`}
        />
        <p className="text-[0.8125rem] leading-relaxed text-[#171717]/45">
          Materiales, volúmenes y accesos: cuanto más preciso, más exacto será
          el presupuesto desde el primer intento.
        </p>
      </div>

      <label className="sr-only" htmlFor="devis-website">
        No rellenar
      </label>
      <input
        id="devis-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-[0.875rem] leading-relaxed text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 border-t border-[#171717]/8 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-orange-500 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
              Enviando…
            </>
          ) : (
            <>
              Enviar mi solicitud
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>

        <p className="flex items-center gap-2 text-[0.8125rem] leading-relaxed text-[#171717]/45">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Sus datos permanecen confidenciales.
        </p>
      </div>
    </form>
  );
}
