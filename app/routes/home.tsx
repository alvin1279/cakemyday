import Social from "~/components/Social/social";
import type { Route } from "./+types/home";
import Hero from "~/components/Hero/hero";

const logo = "/logo.png";

export const links: Route.LinksFunction = () => [
  // { rel: "icon", type: "image/svg+xml", href: "/home.svg" },
  { rel: "icon", type: "image/png", href: logo },
];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cake My Day" },
    { name: "description", content: "Welcome to Cake My Day!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Social />
    </>
  );
}
