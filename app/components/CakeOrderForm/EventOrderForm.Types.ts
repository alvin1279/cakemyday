export interface EventFormState {
  // Contact (identical fields to FormState so ForumContactPage can be reused)
  fullName: string;
  phone: string | null;
  email: string;
  contactPref: string[];

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
