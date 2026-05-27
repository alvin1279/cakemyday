// import type { StepProps } from "../Forum.Types";

// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldLegend,
//   FieldSet,
// } from "~/components/ui/field";

// function forumOrderTypePage({ form, set }: StepProps) {
//   return (
//     <div className="step-content">
//       <h2 className="step-title">Order Type</h2>
//       <Field label="What are you ordering? *">
//         <div className="radio-group">
//           <RadioCard
//             emoji="✈️"
//             title="Weekly Cake Flight"
//             desc="3 preselected flavors · $15 · Flavors announced on social media"
//             selected={form.orderType === "flight"}
//             onClick={() => set("orderType", "flight")}
//           />
//           <RadioCard
//             emoji="🎂"
//             title="Custom Order"
//             desc="Choose your own flavors · 5 cakes per order · $25"
//             selected={form.orderType === "custom"}
//             onClick={() => set("orderType", "custom")}
//           />
//         </div>
//       </Field>
//       <Field label="Are you within driving distance of Belton, Texas? *">
//         <p className="field-note">
//           We are a home bakery and do not offer delivery.
//         </p>
//         <div
//           className={`confirm-box ${form.withinDistance ? "active" : ""}`}
//           onClick={() => set("withinDistance", !form.withinDistance)}
//         >
//           <span className="confirm-check">
//             {form.withinDistance ? "✓" : "○"}
//           </span>
//           <span>Yes, I can pick up in Belton, TX</span>
//         </div>
//       </Field>
//     </div>
//   );
// }
