import type { EventFormState } from "../Types/EventOrderForm.Types";
import { PACKAGES, EVENT_TYPES } from "../eventOrder.data";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";

interface EventSuccessPageProps {
  form: EventFormState;
  onReset: () => void;
}

export default function EventSuccessPage({ form, onReset }: EventSuccessPageProps) {
  const pkg = PACKAGES.find((p) => p.id === form.selectedPackage);
  const eventTypeLabel =
    EVENT_TYPES.find((e) => e.value === form.eventType)?.label ?? form.eventType;

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-white to-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-petal rounded-2xl shadow-lg shadow-petal/30">
        <CardContent className="flex flex-col items-center text-center px-6 py-10 gap-4">
          {/* Icon */}
          <div className="text-6xl mb-1">🎉</div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-berry">Interest Submitted!</h2>

          {/* Thank you */}
          <p className="text-sm font-sans text-mist/70 leading-relaxed">
            Thank you, <strong className="text-mist">{form.fullName}</strong>!
            We'll reach out via{" "}
            <span className="text-berry font-semibold">
              {form.contactPref.join(" or ").toLowerCase()}
            </span>{" "}
            to discuss your event and finalize details.
          </p>

          {/* Contact pref badges */}
          {form.contactPref.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {form.contactPref.map((pref) => (
                <Badge
                  key={pref}
                  variant="secondary"
                  className="bg-blush/10 text-berry border-0 capitalize"
                >
                  {pref.toLowerCase()}
                </Badge>
              ))}
            </div>
          )}

          {/* Package & event summary */}
          {pkg && (
            <p className="text-sm font-sans text-mist/70">
              {pkg.emoji}{" "}
              <strong className="text-mist">"{pkg.name}"</strong> package ·{" "}
              {pkg.cakes} cakes ·{" "}
              <span className="text-berry font-bold">
                ${pkg.price.toLocaleString()}
              </span>
            </p>
          )}
          <p className="text-xs font-sans text-mist/50">
            {form.eventType === "other" ? form.eventTypeOther : eventTypeLabel}
            {form.eventDate && ` · ${form.eventDate}`}
          </p>

          <Separator className="bg-petal/50 w-full" />

          {/* Disclaimer */}
          <p className="text-xs font-sans text-mist/40 italic leading-relaxed">
            Submitting this form does not confirm your booking. A 50% deposit
            and signed contract are required to secure your date.
          </p>

          {/* CTA */}
          <Button
            onClick={onReset}
            className="mt-2 w-full bg-linear-to-r from-blush to-berry text-white
                       rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            🎉 Submit Another Interest Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
