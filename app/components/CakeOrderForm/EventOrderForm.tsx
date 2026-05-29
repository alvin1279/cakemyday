import React, { useState } from "react";
import "./CakeMyDayForm.css";
import type { EventFormState, EventStepProps } from "./Types/EventOrderForm.Types";
import { EventContactPage } from "./EventOrderPages/eventContactPage";
import EventDetailsPage from "./EventOrderPages/eventDetailsPage";
import EventPackagePage from "./EventOrderPages/eventPackagePage";
import EventConfirmPage from "./EventOrderPages/eventConfirmPage";
import EventSuccessPage from "./EventOrderPages/eventSuccessPage";

const STEPS: string[] = ["Contact", "Event Details", "Package", "Confirm"];

const initialFormState: EventFormState = {
  fullName: "",
  phone: null,
  email: "",
  contactPref: [],
  eventType: "",
  eventTypeOther: "",
  eventDate: "",
  eventTime: "",
  eventLocation: "",
  selectedPackage: "",
  depositUnderstanding: false,
  questions: "",
};

// --- Main Container Component ---

export default function EventOrderForm() {
  const [step, setStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<EventFormState>(initialFormState);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const set = <K extends keyof EventFormState>(key: K, val: EventFormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const toggleArr = (key: "contactPref", val: string) => {
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
    if (step === 1)
      return !!(
        form.eventType &&
        form.eventDate &&
        form.eventTime &&
        form.eventLocation &&
        (form.eventType !== "other" || form.eventTypeOther)
      );
    if (step === 2) return !!form.selectedPackage;
    if (step === 3) return form.depositUnderstanding;
    return true;
  };

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
    return (
      <div className="page">
        <EventSuccessPage form={form} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <div className="logo">🎉</div>
          <div>
            <h1 className="title">Cake My Day</h1>
            <p className="subtitle">Event Interest Form</p>
          </div>
        </div>
        <p className="header-note">
          Mobile cake bar cart · Belton, TX · Events within 35 miles
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
        {step === 0 && (
          <StepContact form={form} set={set} toggleArr={toggleArr} />
        )}
        {step === 1 && <StepDetails form={form} set={set} />}
        {step === 2 && <StepPackage form={form} set={set} />}
        {step === 3 && <StepConfirm form={form} set={set} />}

        {/* Navigation */}
        <div className="nav-row">
          {step > 0 && (
            <button
              className="back-btn"
              onClick={() => { setStep((s) => s - 1); scrollToTop(); }}
            >
              ← Back
            </button>
          )}
          <div className="spacer" />
          {step < STEPS.length - 1 ? (
            <button
              className={`next-btn ${canNext() ? "" : "disabled"}`}
              onClick={() => { if (canNext()) { setStep((s) => s + 1); scrollToTop(); } }}
            >
              Continue →
            </button>
          ) : (
            <button
              className={`submit-btn ${canNext() ? "" : "disabled"}`}
              onClick={handleSubmit}
            >
              🎉 Submit Interest
            </button>
          )}
        </div>
      </div>

      <p className="footer">
        Submitting this form does not confirm your booking. A Cake My Day team
        member will reach out to finalise details. A 50% deposit and signed
        contract are required to secure your date.
      </p>
    </div>
  );
}

// --- Step wrappers ---

function StepContact({ form, set, toggleArr }: EventStepProps) {
  return <EventContactPage form={form} set={set} toggleArr={toggleArr} />;
}

function StepDetails({ form, set }: Pick<EventStepProps, "form" | "set">) {
  return (
    <div className="step-content">
      <EventDetailsPage form={form} set={set} />
    </div>
  );
}

function StepPackage({ form, set }: Pick<EventStepProps, "form" | "set">) {
  return (
    <div className="step-content">
      <EventPackagePage form={form} set={set} />
    </div>
  );
}

function StepConfirm({ form, set }: Pick<EventStepProps, "form" | "set">) {
  return (
    <div className="step-content">
      <EventConfirmPage form={form} set={set} />
    </div>
  );
}
