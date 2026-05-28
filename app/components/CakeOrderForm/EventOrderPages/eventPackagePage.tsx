import type { EventStepPropsMinimal } from "../EventOrderForm.Types";
import { PACKAGES } from "../eventOrder.data";

export default function EventPackagePage({ form, set }: EventStepPropsMinimal) {
  return (
    <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto shadow-petal/50">
      <h1 className="text-2xl font-bold text-berry mb-1">Choose a Package</h1>
      <p className="text-sm text-mist/50 font-sans mb-6">
        All packages include cart setup, full service, and a custom display sign.
      </p>

      <div className="flex flex-col gap-3 w-full">
        {PACKAGES.map((pkg) => {
          const selected = form.selectedPackage === pkg.id;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => set("selectedPackage", pkg.id)}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-150
                ${
                  selected
                    ? "border-berry bg-berry/5 shadow-sm"
                    : "border-petal bg-white hover:border-blush/60"
                }
              `}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{pkg.emoji}</span>
                  <span className="font-bold text-sm text-mist font-sans">
                    "{pkg.name}" Package
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selected ? "bg-berry text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ${pkg.price.toLocaleString()}
                </span>
              </div>

              {/* Detail pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  `${pkg.cakes} cakes`,
                  `${pkg.hours}hr service`,
                  `${pkg.cakeFlavors} cake flavors`,
                  `${pkg.frostingFlavors} frosting flavors`,
                  `${pkg.drizzleFlavors} drizzles`,
                  `${pkg.toppings} toppings`,
                ].map((detail) => (
                  <span
                    key={detail}
                    className={`text-xs px-2 py-0.5 rounded-full font-sans ${
                      selected
                        ? "bg-berry/15 text-berry"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Add-ons note */}
      <div className="mt-5 w-full rounded-xl border border-petal bg-cream p-4 text-xs text-mist/60 font-sans leading-relaxed">
        <p className="font-bold text-mist mb-1">Add-ons available:</p>
        <ul className="space-y-0.5 list-none">
          <li>· Additional cakes — $7 / each</li>
          <li>· Extra cake or icing flavor — $30 each</li>
          <li>· Extra toppings — $10 / each (up to 9 total)</li>
          <li>· Travel fee — applies for events 35+ miles from Belton, TX</li>
        </ul>
      </div>
    </div>
  );
}
