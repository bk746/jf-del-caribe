"use server";

import { CONTACT_EMAIL } from "@/lib/faq";
import {
  DEVIS_DEADLINES,
  DEVIS_PROJECT_TYPES,
  type DevisFormFields,
  isDevisDeadline,
  isDevisProjectType,
} from "@/lib/devis-form";

export type DevisFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(formData: FormData, key: keyof DevisFormFields): string {
  return String(formData.get(key) ?? "").trim();
}

function validateDevisForm(formData: FormData): {
  ok: true;
  data: DevisFormFields;
} | {
  ok: false;
  message: string;
} {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { ok: false, message: "Envío rechazado." };
  }

  const name = getField(formData, "name");
  const company = getField(formData, "company");
  const email = getField(formData, "email");
  const phone = getField(formData, "phone");
  const projectType = getField(formData, "projectType");
  const siteAddress = getField(formData, "siteAddress");
  const deadline = getField(formData, "deadline");
  const need = getField(formData, "need");

  if (name.length < 2) {
    return { ok: false, message: "Indique su nombre (mínimo 2 caracteres)." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Correo electrónico no válido." };
  }

  if (phone.replace(/\D/g, "").length < 8) {
    return { ok: false, message: "Número de teléfono no válido." };
  }

  if (!isDevisProjectType(projectType)) {
    return { ok: false, message: "Seleccione un tipo de solicitud." };
  }

  if (siteAddress.length < 5) {
    return {
      ok: false,
      message: "Indique la dirección o zona de la obra.",
    };
  }

  if (need.length < 10) {
    return {
      ok: false,
      message: "Describa su necesidad (mínimo 10 caracteres).",
    };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      projectType,
      siteAddress,
      deadline: isDevisDeadline(deadline) ? deadline : "",
      need,
    },
  };
}

function formatDevisEmailBody(data: DevisFormFields): string {
  const projectOption = DEVIS_PROJECT_TYPES.find(
    (option) => option.value === data.projectType,
  );
  const projectLabel = projectOption
    ? `${projectOption.label} (${projectOption.hint})`
    : data.projectType;

  const deadlineLabel = data.deadline
    ? (DEVIS_DEADLINES.find((option) => option.value === data.deadline)?.label ??
      data.deadline)
    : null;

  return [
    `Nombre: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Correo: ${data.email}`,
    `Teléfono: ${data.phone}`,
    `Tipo de solicitud: ${projectLabel}`,
    `Dirección / zona de obra: ${data.siteAddress}`,
    deadlineLabel ? `Plazo deseado: ${deadlineLabel}` : null,
    "",
    "Necesidad:",
    data.need,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendDevisEmail(data: DevisFormFields): Promise<boolean> {
  const webhookUrl = process.env.DEVIS_FORM_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "jf-caribe-devis",
        ...data,
        body: formatDevisEmailBody(data),
      }),
    });

    return response.ok;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || "—",
        projectType: data.projectType,
        siteAddress: data.siteAddress,
        deadline: data.deadline || "—",
        need: data.need,
        message: formatDevisEmailBody(data),
        _subject: `Presupuesto JF Caribe — ${data.name}`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  return response.ok;
}

export async function submitDevisRequest(
  _prevState: DevisFormState,
  formData: FormData,
): Promise<DevisFormState> {
  const validated = validateDevisForm(formData);

  if (!validated.ok) {
    return { status: "error", message: validated.message };
  }

  try {
    const sent = await sendDevisEmail(validated.data);

    if (!sent) {
      return {
        status: "error",
        message:
          "El envío ha fallado. Inténtelo de nuevo o llámenos directamente.",
      };
    }

    return {
      status: "success",
      message:
        "Solicitud enviada. Le respondemos en 24 h hábiles.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Ha ocurrido un error. Inténtelo de nuevo o contáctenos por teléfono.",
    };
  }
}
