import type { Route } from "./+types/home";
import EventOrderForm from "~/components/CakeOrderForm/EventOrderForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event order forum" },
    { name: "description", content: "Welcome to Cake My Day!" },
  ];
}

export default function ForumEvent() {
  return <EventOrderForm />;
}
