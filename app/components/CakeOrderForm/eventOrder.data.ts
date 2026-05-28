export const EVENT_TYPES = [
  { value: "birthday",  label: "Birthday Party",             emoji: "🎂" },
  { value: "bridal",    label: "Bridal Shower",               emoji: "💍" },
  { value: "baby",      label: "Baby Shower / Gender Reveal", emoji: "🍼" },
  { value: "wedding",   label: "Wedding",                     emoji: "💒" },
  { value: "corporate", label: "Corporate Event",             emoji: "🏢" },
  { value: "other",     label: "Other",                       emoji: "✨" },
] as const;

export interface Package {
  id: string;
  name: string;
  cakes: number;
  price: number;
  hours: number;
  cakeFlavors: number;
  frostingFlavors: number;
  drizzleFlavors: number;
  toppings: number;
  emoji: string;
}

export const PACKAGES: Package[] = [
  {
    id: "mini",
    name: "Mini",
    cakes: 25,
    price: 250,
    hours: 1,
    cakeFlavors: 2,
    frostingFlavors: 2,
    drizzleFlavors: 2,
    toppings: 6,
    emoji: "🧁",
  },
  {
    id: "sprinkles",
    name: "Sprinkles",
    cakes: 50,
    price: 400,
    hours: 1.5,
    cakeFlavors: 2,
    frostingFlavors: 2,
    drizzleFlavors: 2,
    toppings: 6,
    emoji: "✨",
  },
  {
    id: "sugar",
    name: "Sugar",
    cakes: 100,
    price: 800,
    hours: 2,
    cakeFlavors: 3,
    frostingFlavors: 2,
    drizzleFlavors: 2,
    toppings: 6,
    emoji: "🍰",
  },
  {
    id: "celebration",
    name: "Celebration",
    cakes: 150,
    price: 1100,
    hours: 2.5,
    cakeFlavors: 3,
    frostingFlavors: 3,
    drizzleFlavors: 3,
    toppings: 6,
    emoji: "🎉",
  },
  {
    id: "cakemyday",
    name: "Cake My Day",
    cakes: 200,
    price: 1500,
    hours: 3,
    cakeFlavors: 4,
    frostingFlavors: 4,
    drizzleFlavors: 3,
    toppings: 9,
    emoji: "👑",
  },
];
