export interface Flavor {
  id: string;
  label: string;
  emoji: string;
}

export interface FormState {
  fullName: string;
  phone: number|null;
  email: string;
  contactPref: string[];
  orderType: string;
  withinDistance: boolean;
  flavors: string[];
  toppings: string[];
  flavorBreakdown: string;
  flightCount: string;
  pickupDate: string;
  pickupTime: string;
  comments: string;
  paidUnderstanding: boolean;
}

export interface StepProps {
  form: FormState;
  set: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  toggleArr: (key: "contactPref" | "flavors" | "toppings", val: string) => void;
}
export interface StepPropsMinimal {
  form: FormState;
  set: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
}