import type { StepPropsMinimal } from "../Forum.Types";
import { FieldLabel } from "~/components/ui/field";
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroupItem, RadioGroup } from "~/components/ui/radio-group";
import { Card } from "~/components/ui/card";
import { Cake, Sparkles, MapPin } from "lucide-react";

export default function ForumOrderTypePage({ form, set }: StepPropsMinimal) {
  const orderOptions = [
    {
      value: "flight",
      icon: <Cake className="w-6 h-6 text-berry" />,
      title: "Presale Cake Flight",
      badge: "$15",
      description:
        "Flavors are announced via our social media for each presale — follow us to stay in the loop!",
      highlights: ["3 mini cakes", "$15 per order"],
    },
    {
      value: "custom",
      icon: <Sparkles className="w-6 h-6 text-berry" />,
      title: "Custom Order",
      badge: "$25",
      description:
        "Hand-pick your own flavors for a fully personalized box of mini cakes.",
      highlights: ["5 mini cakes", "$25 per order"],
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="mb-2 mt-4 text-2xl font-bold text-berry text-center">
        Order Type
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        What are you ordering? <span className="text-berry">*</span>
      </p>

      <RadioGroup
        value={form.orderType}
        className="flex flex-col sm:flex-row gap-4 w-full"
        onValueChange={(value) => set("orderType", value)}
      >
        {orderOptions.map(
          ({ value, icon, title, badge, description, highlights }) => {
            const isSelected = form.orderType === value;
            return (
              <Card
                key={value}
                onClick={() => set("orderType", value)}
                className={`
                relative flex-1 p-5 rounded-xl border-2 cursor-pointer
                transition-all duration-200
                ${
                  isSelected
                    ? "border-berry bg-berry/5 shadow-md"
                    : "border-gray-200 hover:border-berry/40 hover:shadow-sm"
                }
              `}
              >
                {/* Hidden radio for a11y */}
                <RadioGroupItem value={value} id={value} className="sr-only" />

                {/* Top row: icon + price badge */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${isSelected ? "bg-berry/10" : "bg-gray-100"}
                  `}
                  >
                    {icon}
                  </div>
                  <span
                    className={`
                    text-xs font-semibold px-2 py-0.5 rounded-full self-start
                    ${isSelected ? "bg-berry text-white" : "bg-gray-100 text-gray-500"}
                  `}
                  >
                    {badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  {title}
                </h3>

                {/* Highlight pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className={`
                      text-xs font-semibold px-2 py-0.5 rounded-full
                      ${isSelected ? "bg-berry/15 text-berry" : "bg-gray-100 text-gray-500"}
                    `}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  {description}
                </p>

                {/* Selected indicator dot */}
                {isSelected && (
                  <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-berry" />
                )}
              </Card>
            );
          },
        )}
      </RadioGroup>

      {/* Pickup distance section */}
      <div className="mt-6 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-berry mt-0.5 shrink-0" />
          <div>
            <FieldLabel
              htmlFor="within-distance"
              className="text-sm font-semibold text-gray-800"
            >
              Are you within driving distance of Belton, Texas?{" "}
              <span className="text-berry">*</span>
            </FieldLabel>
            <p className="text-xs text-muted-foreground mt-0.5">
              We are a home bakery and do not offer delivery.
            </p>
          </div>
        </div>

        <label
          htmlFor="within-distance"
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm
            transition-colors duration-150
            ${
              form.withinDistance
                ? "border-berry bg-berry/5 text-berry font-medium"
                : "border-gray-200 bg-white text-gray-600 hover:border-berry/40"
            }
          `}
        >
          <Checkbox
            id="within-distance"
            checked={form.withinDistance}
            onCheckedChange={() => set("withinDistance", !form.withinDistance)}
            className="shrink-0"
          />
          Yes, I can pick up in Belton, TX
        </label>
      </div>
    </div>
  );
}
