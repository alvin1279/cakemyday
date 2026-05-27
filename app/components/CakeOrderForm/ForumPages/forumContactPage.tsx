import { Checkbox } from "~/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { StepProps } from "../Forum.Types";

export function ForumContactPage({ form, set, toggleArr }: StepProps) {
  return (
    <div className="p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h2 className="mb-8 mt-4 text-2xl font-bold text-berry">
        Contact Information
      </h2>
      {/* 1. Pass the form props down to the child inputs */}
      <FieldInput form={form} set={set} toggleArr={toggleArr} />
    </div>
  );
}

export function FieldInput({ form, set, toggleArr }: StepProps) {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          {/* 2. Bind value and handle changes */}
          <Input
            id="fullName"
            type="text"
            placeholder="Max Leiter"
            className=""
            value={form.fullName || ""}
            onChange={(e) => set("fullName", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone || ""}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={form.email || ""}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
      </FieldGroup>

      {/* 3. Forward state to the checkbox group */}
      <CheckboxGroup form={form} toggleArr={toggleArr} set={set} />
    </FieldSet>
  );
}

export function CheckboxGroup({ form, toggleArr }: StepProps) {
  const preferences = form.contactPref || [];

  return (
    <FieldSet>
      <FieldLegend variant="label">Contact Preference:</FieldLegend>
      <FieldDescription>
        Select the options you are available for contact.
      </FieldDescription>

      {/* Changed to flex-row and items-center to force horizontal alignment */}
      <FieldGroup className="flex flex-row items-center gap-6">
        {/* Text Preference */}
        <Field
          orientation="horizontal"
          className="flex items-center gap-2  hover:bg-berry/10 p-4 rounded-md"
        >
          <Checkbox
            id="pref-text"
            name="contact-preference"
            className="h-5 w-5 transitions-all bg-petal/50" // Increased size to h-5 w-5
            checked={preferences.includes("Text")}
            onCheckedChange={() => toggleArr("contactPref", "Text")}
          />
          <FieldLabel
            htmlFor="pref-text"
            className="font-normal text-sm cursor-pointer select-none "
          >
            Text
          </FieldLabel>
        </Field>

        {/* Call Preference */}
        <Field
          orientation="horizontal"
          className="flex items-center gap-2  hover:bg-berry/10 p-4 rounded-md"
        >
          <Checkbox
            id="pref-call"
            name="contact-preference"
            className="h-5 w-5 transitions-all bg-petal/50" // Increased size to h-5 w-5
            checked={preferences.includes("Call")}
            onCheckedChange={() => toggleArr("contactPref", "Call")}
          />
          <FieldLabel
            htmlFor="pref-call"
            className="font-normal text-sm cursor-pointer select-none"
          >
            Call
          </FieldLabel>
        </Field>

        {/* Email Preference */}
        <Field
          orientation="horizontal"
          className="flex items-center gap-2 hover:bg-berry/10 p-4 rounded-md"
        >
          <Checkbox
            id="pref-email"
            name="contact-preference"
            className="h-5 w-5 transitions-all bg-petal/50" // Increased size to h-5 w-5
            checked={preferences.includes("Email")}
            onCheckedChange={() => toggleArr("contactPref", "Email")}
          />
          <FieldLabel
            htmlFor="pref-email"
            className="font-normal text-sm cursor-pointer select-none"
          >
            Email
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
