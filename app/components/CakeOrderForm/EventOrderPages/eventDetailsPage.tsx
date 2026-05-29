import type { EventStepPropsMinimal } from "../Types/EventOrderForm.Types";
import { EVENT_TYPES } from "../eventOrder.data";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function EventDetailsPage({ form, set }: EventStepPropsMinimal) {
  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="text-2xl font-bold text-berry mb-1">Event Details</h1>
      <p className="text-sm text-mist/50 font-sans mb-6">Tell us about your event.</p>

      {/* ── Event Type ── */}
      <div className="mb-5 w-full">
        <Label className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-3">
          Event Type <span className="text-berry">*</span>
        </Label>
        <RadioGroup
          value={form.eventType}
          onValueChange={(v) => set("eventType", v)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {EVENT_TYPES.map(({ value, label, emoji }) => {
            const selected = form.eventType === value;
            return (
              <label
                key={value}
                className={`
                  flex items-center gap-2 px-3 py-3 rounded-xl border-2 cursor-pointer
                  transition-all duration-150 text-sm font-sans select-none
                  ${
                    selected
                      ? "border-blush bg-blush/10 text-berry"
                      : "border-petal text-mist hover:border-blush/60 bg-white"
                  }
                `}
              >
                <RadioGroupItem value={value} id={value} className="sr-only" />
                <span className="text-base">{emoji}</span>
                <span className="leading-snug">{label}</span>
              </label>
            );
          })}
        </RadioGroup>

        {form.eventType === "other" && (
          <Input
            className="mt-3 border-2 border-petal bg-cream text-mist rounded-xl
                       focus-visible:ring-0 focus-visible:border-blush"
            placeholder="Describe your event…"
            value={form.eventTypeOther}
            onChange={(e) => set("eventTypeOther", e.target.value)}
          />
        )}
      </div>

      {/* ── Date & Time ── */}
      <div className="mb-5 w-full">
        <Label className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2">
          Event Date & Time <span className="text-berry">*</span>
        </Label>
        <p className="text-xs text-mist/50 font-sans mb-3">
          Official timing will be confirmed after your booking is finalised.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="date"
            value={form.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
            className="flex-1 border-2 border-petal bg-cream text-mist rounded-xl
                       focus-visible:ring-0 focus-visible:border-blush"
          />
          <Input
            type="time"
            value={form.eventTime}
            onChange={(e) => set("eventTime", e.target.value)}
            className="flex-1 border-2 border-petal bg-cream text-mist rounded-xl
                       focus-visible:ring-0 focus-visible:border-blush"
          />
        </div>
      </div>

      {/* ── Location ── */}
      <div className="mb-2 w-full">
        <Label className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2">
          Event Location <span className="text-berry">*</span>
        </Label>
        <p className="text-xs text-mist/50 font-sans mb-3">
          A travel fee applies for events 35+ miles from Belton, TX.
        </p>
        <Input
          placeholder="123 Main St, Belton, TX"
          value={form.eventLocation}
          onChange={(e) => set("eventLocation", e.target.value)}
          className="border-2 border-petal bg-cream text-mist rounded-xl
                     focus-visible:ring-0 focus-visible:border-blush"
        />
      </div>
    </div>
  );
}
