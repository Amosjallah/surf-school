import { Field } from "@/components/field";
import { skillLabels, swimLabels } from "@/lib/format";
import type { FieldErrors } from "@/lib/types";

export type DetailState = {
  name: string;
  phone: string;
  email: string;
  skillLevel: "" | keyof typeof skillLabels;
  swimmingAbility: "" | keyof typeof swimLabels;
  medicalNotes: string;
};

export function StepDetails({
  details,
  errors,
  onChange,
}: {
  details: DetailState;
  errors: FieldErrors;
  onChange: (next: DetailState) => void;
}) {
  return (
    <div className="grid gap-5">
      <Field id="name" label="Full name" error={errors.name}>
        <input
          name="name"
          autoComplete="name"
          value={details.name}
          onChange={(event) => onChange({ ...details, name: event.target.value })}
        />
      </Field>
      <Field id="phone" label="Phone or WhatsApp" error={errors.phone} hint="Include the country code, for example +27.">
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={details.phone}
          onChange={(event) => onChange({ ...details, phone: event.target.value })}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={details.email}
          onChange={(event) => onChange({ ...details, email: event.target.value })}
        />
      </Field>
      <Field id="skill" label="Have you surfed before?" error={errors.skillLevel}>
        <select
          name="skillLevel"
          value={details.skillLevel}
          onChange={(event) =>
            onChange({ ...details, skillLevel: event.target.value as DetailState["skillLevel"] })
          }
        >
          <option value="">Choose one</option>
          {Object.entries(skillLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="swim" label="How do you feel in the water?" error={errors.swimmingAbility}>
        <select
          name="swimmingAbility"
          value={details.swimmingAbility}
          onChange={(event) =>
            onChange({
              ...details,
              swimmingAbility: event.target.value as DetailState["swimmingAbility"],
            })
          }
        >
          <option value="">Choose one</option>
          {Object.entries(swimLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        id="medical"
        label="Anything the coach should know?"
        error={errors.medicalNotes}
        hint="Optional. Asthma, a recent injury, pregnancy, epilepsy. We only use this to teach you safely."
      >
        <textarea
          name="medicalNotes"
          value={details.medicalNotes}
          maxLength={500}
          onChange={(event) => onChange({ ...details, medicalNotes: event.target.value })}
        />
      </Field>
    </div>
  );
}
