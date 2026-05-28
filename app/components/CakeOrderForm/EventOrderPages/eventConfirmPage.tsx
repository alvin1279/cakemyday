import type { EventStepPropsMinimal } from "../EventOrderForm.Types";
import { PACKAGES, EVENT_TYPES } from "../eventOrder.data";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function EventConfirmPage({ form, set }: EventStepPropsMinimal) {
  const pkg = PACKAGES.find((p) => p.id === form.selectedPackage);
  const eventTypeLabel =
    EVENT_TYPES.find((e) => e.value === form.eventType)?.label ?? form.eventType;

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="text-2xl font-bold text-berry mb-1">Confirm & Submit</h1>
      <p className="text-sm text-mist/50 font-sans mb-6">
        Review your details and confirm below.
      </p>

      {/* ── Deposit understanding ── */}
      <label
        htmlFor="deposit-understanding"
        className={`
          flex items-start gap-3 w-full p-4 rounded-xl border-2 cursor-pointer mb-5
          transition-all duration-150
          ${
            form.depositUnderstanding
              ? "border-blush bg-blush/10 text-berry"
              : "border-petal bg-white text-mist hover:border-blush/60"
          }
        `}
      >
        <Checkbox
          id="deposit-understanding"
          checked={form.depositUnderstanding}
          onCheckedChange={(checked) => set("depositUnderstanding", !!checked)}
          className="mt-0.5 shrink-0 border-blush data-[state=checked]:bg-blush data-[state=checked]:border-blush"
        />
        <span className="text-sm font-sans leading-snug">
          I understand that a <strong>50% deposit</strong> and a{" "}
          <strong>signed contract</strong> are required to confirm my booking,
          and that my booking will <strong>not</strong> be confirmed until I
          receive confirmation from <em>Cake My Day</em>. *
        </span>
      </label>

      {/* ── Questions / comments ── */}
      <div className="mb-5 w-full">
        <Label
          htmlFor="questions"
          className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2"
        >
          Questions or Comments?
        </Label>
        <Textarea
          id="questions"
          rows={3}
          placeholder="Anything else we should know?"
          value={form.questions}
          onChange={(e) => set("questions", e.target.value)}
          className="border-2 border-petal bg-cream text-mist rounded-xl
                     focus-visible:ring-0 focus-visible:border-blush resize-vertical"
        />
      </div>

      <Separator className="my-2 bg-petal/50" />

      {/* ── Booking summary ── */}
      <Card className="w-full border-2 border-petal bg-cream rounded-xl shadow-none">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-blush">
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-1.5 text-sm font-sans text-mist">
          <p>
            <span className="font-bold">Name:</span> {form.fullName}
          </p>
          <p>
            <span className="font-bold">Contact:</span> {form.email} · {form.phone}
          </p>
          <p>
            <span className="font-bold">Event:</span>{" "}
            {form.eventType === "other" ? form.eventTypeOther : eventTypeLabel}
          </p>
          <p>
            <span className="font-bold">Date:</span> {form.eventDate} at {form.eventTime}
          </p>
          <p>
            <span className="font-bold">Location:</span> {form.eventLocation}
          </p>
          {pkg && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">Package:</span>
              <Badge
                variant="secondary"
                className="bg-blush/10 text-berry border-0 text-xs"
              >
                {pkg.emoji} "{pkg.name}" — {pkg.cakes} cakes ·{" "}
                ${pkg.price.toLocaleString()}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
