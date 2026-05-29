import React, { useState } from "react";
import "./CakeMyDayForm.css";
import type { FormState, StepProps } from "./Forum.Types";
import ForumContactPage from "./ForumPages/forumContactPage";
import ForumOrderTypePage from "./ForumPages/forumOrderTypePage";
import ForumFlavourPage from "./ForumPages/forumFlavourPage";
import ForumDetailsPage from "./ForumPages/forumDetailsPage";
import ForumSuccessPage from "./ForumPages/forumSuccessPage";

const STEPS: string[] = [
  "Contact",
  "Order Type",
  "Flavors & Toppings",
  "Details",
];

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

  const toggleArr = (
    key: "contactPref" | "flavors" | "toppings",
    val: string,
  ) => {
    setForm((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const canNext = (): boolean => {
    if (step === 0)
      return !!(
        form.fullName &&
        form.phone &&
        form.email &&
        form.contactPref.length > 0
      );
    if (step === 1) return !!(form.orderType && form.withinDistance);
    if (step === 2)
      return form.flavors.length > 0 || form.orderType === "flight";
    if (step === 3) return form.paidUnderstanding;
    return true;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = () => {
    if (canNext()) {
      scrollToTop();
      setSubmitted(true);
    }
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
          Mini cakes sold in orders of 5 ($25) · Cake flights sold in orders of
          3 ($15) · Pickup only · Belton, TX
        </p>
      </div>

      {/* Progress */}
      <div className="progress-wrap">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className="step-item">
              <div
                className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`step-label ${i === step ? "active" : ""}`}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${i < step ? "done" : ""}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="card">

        {step === 0 && 
          <ForumContactPage form={form} set={set} toggleArr={toggleArr} />
        }
        {step === 1 && 
          <ForumOrderTypePage form={form} set={set} />
        }
        {step === 2 &&
          <ForumFlavourPage form={form} set={set} toggleArr={toggleArr} />
        }
        {step === 3 &&
          <ForumDetailsPage form={form} set={set} />
        }

        {/* Navigation */}
        <div className="nav-row">
          {step > 0 && (
            <button
              className="back-btn"
              onClick={() => {
                setStep((s) => s - 1);
                scrollToTop();
              }}
            >
              ← Back
            </button>
          )}
          <div className="spacer" />
          {step < STEPS.length - 1 ? (
            <button
              className={`next-btn ${canNext() ? "" : "disabled"}`}
              onClick={() => {
                if (canNext()) {
                  setStep((s) => s + 1);
                  scrollToTop();
                }
              }}
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
        Submitting does not guarantee your order until availability is confirmed
        by a Cake My Day team member.
      </p>
    </div>
  );
}

function SuccessPage({
  form,
  onReset,
}: {
  form: FormState;
  onReset: () => void;
}) {
  return (
    <div className="page">
      <ForumSuccessPage form={form} onReset={onReset} />
    </div>
  );
}
