import CakeMyDayForm from "~/components/CakeOrderForm/CakeMyDayForm";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Custom order forum" },
    { name: "description", content: "Welcome to Cake My Day!" },
  ];
}

export default function ForumCustom() {
  return <CakeMyDayForm />;
}
