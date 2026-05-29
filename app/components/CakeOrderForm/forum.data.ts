import type { Flavor } from "./Types/Forum.Types";

export const FLAVORS: Flavor[] = [
  { id: "vanilla_vanilla",    label: "Vanilla with Vanilla Buttercream",                          emoji: "🍦" },
  { id: "vanilla_chocolate",  label: "Vanilla with Chocolate Buttercream",                        emoji: "🍫" },
  { id: "chocolate_vanilla",  label: "Chocolate with Vanilla Buttercream",                        emoji: "🤍" },
  { id: "chocolate_chocolate",label: "Chocolate with Chocolate Buttercream",                      emoji: "🍫" },
  { id: "red_velvet",         label: "Red Velvet with Vanilla Buttercream",                       emoji: "❤️" },
  { id: "biscoff",            label: "Biscoff with Biscoff Buttercream",                          emoji: "🍪" },
  { id: "lemon",              label: "Lemon with Lemon Buttercream & Graham Cracker Crumbles",    emoji: "🍋" },
  { id: "cookies_cream",      label: "Cookies 'n Cream",                                         emoji: "🖤" },
  { id: "strawberry",         label: "Strawberry with Strawberry Buttercream & White Chocolate",  emoji: "🍓" },
  { id: "confetti",           label: "Confetti Sprinkle with Vanilla or Chocolate Buttercream",   emoji: "🎉" },
  { id: "other",              label: "Other",                                                     emoji: "✨" },
];

export const TOPPINGS: string[] = [
  "Oreo Crumbles", "Chocolate Chip Cookie Pieces", "Peanuts", "Mini M&Ms",
  "Heath", "White Chocolate Chips", "Strawberries", "Gummy Bears",
  "Sprinkles", "Chocolate Chips", "Reese's", "Mini Marshmallow", "None",
];