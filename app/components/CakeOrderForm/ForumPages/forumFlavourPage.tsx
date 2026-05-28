import { FLAVORS, TOPPINGS } from "../forum.data";
import type { StepProps, Flavor } from "../Forum.Types";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

// ── Sub-components ──────────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 w-full">
      <Label
        htmlFor={htmlFor}
        className="block text-[11px] font-bold uppercase tracking-widest text-mist mb-2"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

function FlavorChip({
  flavor,
  selected,
  onToggle,
}: {
  flavor: Flavor;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onToggle}
      className={`
        flex items-start justify-start gap-2 px-3 py-2.5 rounded-xl border-2
        h-auto w-full text-left font-normal transition-all duration-150
        ${
          selected
            ? "border-blush bg-blush/10 text-berry hover:bg-blush/15 hover:text-berry"
            : "border-petal text-mist hover:border-blush/60 hover:bg-transparent"
        }
      `}
    >
      <span className="text-xl shrink-0 mt-0.5">{flavor.emoji}</span>
      {/* ✅ wrap-break-word → break-words */}
      <span className="flex-1 text-xs leading-snug wrap-break-word whitespace-normal min-w-0">
        {flavor.label}
      </span>
      {selected && (
        <Badge
          variant="secondary"
          className="shrink-0 bg-blush/20 text-berry border-0 px-1.5 py-0 mt-0.5"
        >
          ✓
        </Badge>
      )}
    </Button>
  );
}

function CheckChip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`
        rounded-full border-2 text-xs h-auto py-1.5 px-3 font-normal
        transition-all duration-150
        ${
          checked
            ? "border-blush bg-blush/10 text-blush font-semibold hover:bg-blush/15 hover:text-blush"
            : "border-petal text-mist hover:border-blush/60 hover:bg-transparent"
        }
      `}
    >
      <span className="font-bold text-[10px] mr-1">{checked ? "✓" : "+"}</span>
      {label}
    </Button>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ForumFlavourPage({ form, set, toggleArr }: StepProps) {
  // ✅ Replaced isReset state + two helpers with clean inline logic
  const handleToppingToggle = (t: string) => {
    if (t === "None") {
      // If "None" is already selected, deselect it; otherwise select only "None"
      set("toppings", form.toppings.includes("None") ? [] : ["None"]);
    } else {
      // If "None" was selected, drop it and start fresh with this topping
      if (form.toppings.includes("None")) {
        set("toppings", [t]);
      } else {
        toggleArr?.("toppings", t); // ✅ optional chaining
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="text-2xl font-bold text-berry mb-1">
        {form.orderType === "flight" ? "Cake Flight" : "Flavors & Toppings"}
      </h1>
      <p className="text-sm text-mist/50 font-sans mb-6">
        {form.orderType === "flight"
          ? "Tell us how many flights you'd like."
          : "Pick your flavors and any extra toppings."}
      </p>

      {form.orderType === "flight" ? (
        // ── Flight view ──
        <div className="rounded-2xl border-2 border-petal bg-cream p-6 text-center mb-5 w-full">
          <div className="text-4xl mb-3">✈️</div>
          <p className="text-sm text-mist/70 mb-4 leading-relaxed font-sans">
            Cake flight flavors are preselected and announced via social media
            each week. Each flight = <strong>3 cakes for $15</strong>.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Label
              htmlFor="flight-count"
              className="text-[11px] font-bold uppercase tracking-widest text-mist"
            >
              How many flights?
            </Label>
            <Input
              id="flight-count"
              type="number"
              min={1}
              placeholder="1"
              value={form.flightCount}
              onChange={(e) => set("flightCount", e.target.value)}
              className="w-24 text-center border-2 border-petal bg-white text-mist
                         focus-visible:ring-0 focus-visible:border-blush rounded-xl"
            />
          </div>
        </div>
      ) : (
        // ── Custom order view ──
        <>
          <Field label="Select your flavor(s) * — each order = 5 cakes · $25">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLAVORS.map((f) => (
                <FlavorChip
                  key={f.id}
                  flavor={f}
                  selected={form.flavors.includes(f.id)}
                  onToggle={() => toggleArr?.("flavors", f.id)}
                />
              ))}
            </div>
          </Field>

          <Field
            label="Flavor breakdown & quantities (multiples of 5 please)"
            htmlFor="flavor-breakdown"
          >
            <Textarea
              id="flavor-breakdown"
              rows={3}
              placeholder="e.g. 5 Vanilla Vanilla, 5 Lemon, 5 Cookies n Cream"
              value={form.flavorBreakdown}
              onChange={(e) => set("flavorBreakdown", e.target.value)}
              className="border-2 border-petal bg-cream text-mist rounded-xl
                         focus-visible:ring-0 focus-visible:border-blush resize-vertical"
            />
          </Field>
        </>
      )}

      <Separator className="my-2 bg-petal/50" />

      <Field label="Additional toppings (optional)">
        <div className="flex flex-wrap gap-2">
          {TOPPINGS.map((t) => (
            <CheckChip
              key={t}
              label={t}
              checked={form.toppings.includes(t)}
              onToggle={() => handleToppingToggle(t)}
            />
          ))}
        </div>
      </Field>
    </div>
  );
}
