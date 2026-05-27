import React, { useState } from "react";
import "./CakeMyDayForm.css";
import type{ Flavor, FormState, StepProps } from "./Forum.Types";
import { ForumContactPage } from "./ForumPages/forumContactPage";


// --- Types & Interfaces ---



// --- Constants ---

export const FLAVORS: Flavor[] = [
  { id: "vanilla_vanilla", label: "Vanilla with Vanilla Buttercream", emoji: "🍦" },
  { id: "vanilla_chocolate", label: "Vanilla with Chocolate Buttercream", emoji: "🍫" },
  { id: "chocolate_vanilla", label: "Chocolate with Vanilla Buttercream", emoji: "🤍" },
  { id: "chocolate_chocolate", label: "Chocolate with Chocolate Buttercream", emoji: "🍫" },
  { id: "red_velvet", label: "Red Velvet with Vanilla Buttercream", emoji: "❤️" },
  { id: "biscoff", label: "Biscoff with Biscoff Buttercream", emoji: "🍪" },
  { id: "lemon", label: "Lemon with Lemon Buttercream & Graham Cracker Crumbles", emoji: "🍋" },
  { id: "cookies_cream", label: "Cookies 'n Cream", emoji: "🖤" },
  { id: "strawberry", label: "Strawberry with Strawberry Buttercream & White Chocolate", emoji: "🍓" },
  { id: "confetti", label: "Confetti Sprinkle with Vanilla or Chocolate Buttercream", emoji: "🎉" },
  { id: "other", label: "Other", emoji: "✨" },
];

export const TOPPINGS: string[] = [
  "Oreo Crumbles", "Chocolate Chip Cookie Pieces", "Peanuts", "Mini M&Ms",
  "Heath", "White Chocolate Chips", "Strawberries", "Gummy Bears",
  "Sprinkles", "Chocolate Chips", "Reese's", "Mini Marshmallow", "None",
];

const STEPS: string[] = ["Contact", "Order Type", "Flavors & Toppings", "Details"];

const initialFormState: FormState = {
  fullName: "",
  phone: null,
  email: "",
  contactPref: [],
  orderType: "",
  withinDistance: false,
  flavors: [],
  toppings: [],
  flavorBreakdown: "",
  flightCount: "",
  pickupDate: "",
  pickupTime: "",
  comments: "",
  paidUnderstanding: false,
};

// --- Main Container Component ---

export default function CakeMyDayForm() {
  const [step, setStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(initialFormState);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const toggleArr = (key: "contactPref" | "flavors" | "toppings", val: string) => {
    setForm((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const canNext = (): boolean => {
    if (step === 0) return !!(form.fullName && form.phone && form.email && form.contactPref.length > 0);
    if (step === 1) return !!(form.orderType && form.withinDistance);
    if (step === 2) return form.flavors.length > 0 || form.orderType === "flight";
    if (step === 3) return form.paidUnderstanding;
    return true;
  };

  const handleSubmit = () => {
    if (canNext()) setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(0);
    setForm(initialFormState);
  };

  if (submitted) {
    return <SuccessPage form={form} onReset={handleReset} />;
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <div className="logo">🎂</div>
          <div>
            <h1 className="title">Cake My Day</h1>
            <p className="subtitle">Custom Order & Preorder Form</p>
          </div>
        </div>
        <p className="header-note">
          Mini cakes sold in orders of 5 ($25) · Cake flights sold in orders of 3 ($15) · Pickup only · Belton, TX
        </p>
      </div>

      {/* Progress */}
      <div className="progress-wrap">
        {STEPS.map((s, i) => (
          <div key={s} className="step-item">
            <div className={`step-dot ${i <= step ? "active" : ""} ${i < step ? "done" : ""}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`step-label ${i === step ? "active" : ""}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${i < step ? "done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="card">
        {step === 0 && <StepContact form={form} set={set} toggleArr={toggleArr} />}
        {step === 1 && <StepOrderType form={form} set={set} toggleArr={toggleArr} />}
        {step === 2 && <StepFlavors form={form} set={set} toggleArr={toggleArr} />}
        {step === 3 && <StepDetails form={form} set={set} toggleArr={toggleArr} />}

        {/* Navigation */}
        <div className="nav-row">
          {step > 0 && (
            <button className="back-btn" onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          )}
          <div className="spacer" />
          {step < STEPS.length - 1 ? (
            <button
              className={`next-btn ${canNext() ? "" : "disabled"}`}
              onClick={() => canNext() && setStep((s) => s + 1)}
            >
              Continue →
            </button>
          ) : (
            <button
              className={`submit-btn ${canNext() ? "" : "disabled"}`}
              onClick={handleSubmit}
            >
              🎂 Submit Order
            </button>
          )}
        </div>
      </div>

      <p className="footer">
        Submitting does not guarantee your order until availability is confirmed by a Cake My Day team member.
      </p>
    </div>
  );
}

// --- Step Components ---

function StepContact({ form, set, toggleArr }: StepProps) {
  return (
      <ForumContactPage form={form} set={set} toggleArr={toggleArr} />
  );
}

function StepOrderType({ form, set }: StepProps) {
  return (
    <div className="step-content">
      <h2 className="step-title">Order Type</h2>
      <Field label="What are you ordering? *">
        <div className="radio-group">
          <RadioCard
            emoji="✈️"
            title="Weekly Cake Flight"
            desc="3 preselected flavors · $15 · Flavors announced on social media"
            selected={form.orderType === "flight"}
            onClick={() => set("orderType", "flight")}
          />
          <RadioCard
            emoji="🎂"
            title="Custom Order"
            desc="Choose your own flavors · 5 cakes per order · $25"
            selected={form.orderType === "custom"}
            onClick={() => set("orderType", "custom")}
          />
        </div>
      </Field>
      <Field label="Are you within driving distance of Belton, Texas? *">
        <p className="field-note">
          We are a home bakery and do not offer delivery.
        </p>
        <div
          className={`confirm-box ${form.withinDistance ? "active" : ""}`}
          onClick={() => set("withinDistance", !form.withinDistance)}
        >
          <span className="confirm-check">
            {form.withinDistance ? "✓" : "○"}
          </span>
          <span>Yes, I can pick up in Belton, TX</span>
        </div>
      </Field>
    </div>
  );
}

function StepFlavors({ form, set, toggleArr }: StepProps) {
  return (
    <div className="step-content">
      <h2 className="step-title">
        {form.orderType === "flight" ? "Cake Flight" : "Flavors & Toppings"}
      </h2>

      {form.orderType === "flight" ? (
        <div className="flight-note">
          <span style={{ fontSize: 32 }}>✈️</span>
          <p>
            Cake flight flavors are preselected and announced via social media each week. Each flight = 3 cakes for $15.
          </p>
          <Field label="How many flights would you like?">
            <input
              className="input flight-input"
              type="number"
              min={1}
              placeholder="1"
              value={form.flightCount}
              onChange={(e) => set("flightCount", e.target.value)}
            />
          </Field>
        </div>
      ) : (
        <>
          <Field label="Select your flavor(s) * — each order = 5 cakes · $25">
            <div className="flavor-grid">
              {FLAVORS.map((f) => (
                <FlavorChip
                  key={f.id}
                  flavor={f}
                  selected={form.flavors.includes(f.id)}
                  onToggle={() => toggleArr("flavors", f.id)}
                />
              ))}
            </div>
          </Field>
          <Field label="Flavor breakdown & quantities (multiples of 5 please)">
            <textarea
              className="textarea"
              rows={3}
              placeholder="e.g. 5 Vanilla Vanilla, 5 Lemon, 5 Cookies n Cream"
              value={form.flavorBreakdown}
              onChange={(e) => set("flavorBreakdown", e.target.value)}
            />
          </Field>
        </>
      )}

      <Field label="Additional toppings (optional)">
        <div className="topping-grid">
          {TOPPINGS.map((t) => (
            <CheckChip
              key={t}
              label={t}
              checked={form.toppings.includes(t)}
              onToggle={() => toggleArr("toppings", t)}
              small
            />
          ))}
        </div>
      </Field>
    </div>
  );
}

function StepDetails({ form, set }: StepProps) {
  return (
    <div className="step-content">
      <h2 className="step-title">Pickup & Final Details</h2>

      {form.orderType === "custom" && (
        <Field label="Preferred pickup date & time *">
          <p className="field-note">
            Pickup times based on availability. Official time confirmed after order is approved.
          </p>
          <div className="date-row">
            <input
              className="input"
              type="date"
              value={form.pickupDate}
              onChange={(e) => set("pickupDate", e.target.value)}
            />
            <input
              className="input"
              type="time"
              value={form.pickupTime}
              onChange={(e) => set("pickupTime", e.target.value)}
            />
          </div>
        </Field>
      )}

      <div
        className={`confirm-box paid-understanding ${
          form.paidUnderstanding ? "active" : ""
        }`}
        onClick={() => set("paidUnderstanding", !form.paidUnderstanding)}
      >
        <span className="confirm-check">
          {form.paidUnderstanding ? "✓" : "○"}
        </span>
        <span>
          I understand that orders must be paid in full at least 48 hours before pickup (rush orders have additional fees) *
        </span>
      </div>

      <Field label="Questions or Comments?">
        <textarea
          className="textarea"
          rows={4}
          placeholder="Anything else we should know?"
          value={form.comments}
          onChange={(e) => set("comments", e.target.value)}
        />
      </Field>

      <div className="summary-box">
        <h3 className="summary-title">Order Summary</h3>
        <p><strong>Name:</strong> {form.fullName}</p>
        <p><strong>Contact:</strong> {form.email} · {form.phone}</p>
        <p>
          <strong>Order type:</strong>{" "}
          {form.orderType === "flight" ? "Weekly Cake Flight" : "Custom Order"}
        </p>
        {form.orderType === "custom" && form.flavors.length > 0 && (
          <p>
            <strong>Flavors:</strong>{" "}
            {form.flavors
              .map((id) => FLAVORS.find((f) => f.id === id)?.emoji)
              .join(" ")}
          </p>
        )}
        {form.orderType === "flight" && form.flightCount && (
          <p>
            <strong>Flights:</strong> {form.flightCount} × $15 = $
            {parseInt(form.flightCount || "0") * 15}
          </p>
        )}
      </div>
    </div>
  );
}

function SuccessPage({ form, onReset }: { form: FormState; onReset: () => void }) {
  return (
    <div className="page">
      <div className="success-card">
        <div className="success-emoji">🎂</div>
        <h2 className="success-title">Order Submitted!</h2>
        <p className="success-text">
          Thank you, <strong>{form.fullName}</strong>! We'll reach out via{" "}
          {form.contactPref.join(" or ").toLowerCase()} to confirm your order.
        </p>
        <p className="success-note">
          Remember: submitting this form does not guarantee your order until availability is confirmed by a Cake My Day team member.
        </p>
        <button className="reset-btn" onClick={onReset}>
          Place Another Order
        </button>
      </div>
    </div>
  );
}

// --- Shared UI Components ---

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function CheckChip({ label, checked, onToggle, small }: { label: string; checked: boolean; onToggle: () => void; small?: boolean }) {
  return (
    <div
      className={`chip ${checked ? "active" : ""} ${small ? "small" : ""}`}
      onClick={onToggle}
    >
      <span className="chip-check">{checked ? "✓" : "+"}</span>
      {label}
    </div>
  );
}

function FlavorChip({ flavor, selected, onToggle }: { flavor: Flavor; selected: boolean; onToggle: () => void }) {
  return (
    <div className={`flavor-chip ${selected ? "active" : ""}`} onClick={onToggle}>
      <span style={{ fontSize: 22 }}>{flavor.emoji}</span>
      <span className="flavor-label">{flavor.label}</span>
      {selected && <span className="flavor-check">✓</span>}
    </div>
  );
}

function RadioCard({ emoji, title, desc, selected, onClick }: { emoji: string; title: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <div className={`radio-card ${selected ? "active" : ""}`} onClick={onClick}>
      <span style={{ fontSize: 32 }}>{emoji}</span>
      <div>
        <div className="radio-title">{title}</div>
        <div className="radio-desc">{desc}</div>
      </div>
      <div className={`radio-dot ${selected ? "active" : ""}`} />
    </div>
  );
}