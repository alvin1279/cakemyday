import type { ContactFields } from "./SharedTypes";

export interface EventFormState extends ContactFields {

  // Event details
  eventType: string;
  eventTypeOther: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;

  // Package
  selectedPackage: string;

  // Confirm
  depositUnderstanding: boolean;
  questions: string;
}

export interface EventStepProps {
  form: EventFormState;
  set: <K extends keyof EventFormState>(key: K, val: EventFormState[K]) => void;
  toggleArr?: (key: "contactPref", val: string) => void;
}

export type EventStepPropsMinimal = Omit<EventStepProps, "toggleArr">;
