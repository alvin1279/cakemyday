import type { StepPropsMinimal } from "../Types/Forum.Types";
import { FLAVORS } from "../forum.data";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function ForumDetailsPage({ form, set }: StepPropsMinimal) {
  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="text-2xl font-bold text-berry mb-1">Pickup & Final Details</h1>
      <p className="text-sm text-mist/50 font-sans mb-6">
        Almost done — just a few final details.
      </p>

      {/* ── Pickup date & time (custom orders only) ── */}
      {form.orderType === "custom" && (
        <div className="mb-5 w-full">
          <Label className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2">
            Preferred Pickup Date & Time *
          </Label>
          <p className="text-xs text-mist/50 font-sans mb-3">
            Pickup times based on availability. Official time confirmed after order is approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="date"
              value={form.pickupDate}
              onChange={(e) => set("pickupDate", e.target.value)}
              className="flex-1 border-2 border-petal bg-cream text-mist rounded-xl
                         focus-visible:ring-0 focus-visible:border-blush"
            />
            <Input
              type="time"
              value={form.pickupTime}
              onChange={(e) => set("pickupTime", e.target.value)}
              className="flex-1 border-2 border-petal bg-cream text-mist rounded-xl
                         focus-visible:ring-0 focus-visible:border-blush"
            />
          </div>
        </div>
      )}

      {/* ── Paid understanding ── */}
      <label
        htmlFor="paid-understanding"
        className={`
          flex items-start gap-3 w-full p-4 rounded-xl border-2 cursor-pointer mb-5
          transition-all duration-150
          ${form.paidUnderstanding
            ? "border-blush bg-blush/10 text-berry"
            : "border-petal bg-white text-mist hover:border-blush/60"
          }
        `}
      >
        <Checkbox
          id="paid-understanding"
          checked={form.paidUnderstanding}
          onCheckedChange={(checked) => set("paidUnderstanding", !!checked)}
          className="mt-0.5 shrink-0 border-blush data-[state=checked]:bg-blush data-[state=checked]:border-blush"
        />
        <span className="text-sm font-sans leading-snug">
          I understand that orders must be paid in full at least{" "}
          <strong>48 hours before pickup</strong> (rush orders have additional fees) *
        </span>
      </label>

      {/* ── Comments ── */}
      <div className="mb-5 w-full">
        <Label
          htmlFor="comments"
          className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2"
        >
          Questions or Comments?
        </Label>
        <Textarea
          id="comments"
          rows={4}
          placeholder="Anything else we should know?"
          value={form.comments}
          onChange={(e) => set("comments", e.target.value)}
          className="border-2 border-petal bg-cream text-mist rounded-xl
                     focus-visible:ring-0 focus-visible:border-blush resize-vertical"
        />
      </div>

      <Separator className="my-2 bg-petal/50" />

      {/* ── Order summary ── */}
      <Card className="w-full border-2 border-petal bg-cream rounded-xl shadow-none">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-blush">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-1.5 text-sm font-sans text-mist">
          <p><span className="font-bold">Name:</span> {form.fullName}</p>
          <p><span className="font-bold">Contact:</span> {form.email} · {form.phone}</p>
          <p>
            <span className="font-bold">Order type:</span>{" "}
            {form.orderType === "flight" ? "Presale Cake Flight" : "Custom Order"}
          </p>

          {form.orderType === "custom" && form.flavors.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">Flavors:</span>
              {form.flavors.map((id) => {
                const flavor = FLAVORS.find((f) => f.id === id);
                return flavor ? (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="bg-blush/10 text-berry border-0 text-xs"
                  >
                    {flavor.emoji} {flavor.label}
                  </Badge>
                ) : null;
              })}
            </div>
          )}

          {form.orderType === "flight" && form.flightCount && (
            <p>
              <span className="font-bold">Flights:</span>{" "}
              {form.flightCount} × $15 ={" "}
              <span className="text-berry font-bold">
                ${parseInt(form.flightCount || "0") * 15}
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}