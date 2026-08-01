import logo from "@/resources/images/branding/logo.png";

import "./style.scss";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Hero />
    </div>
  );
}

const Hero = () => {
  // Big picture right
  // Big text left
  // Very small text below
  // same very small size text, but gray below small text

  return (
    <div className="hero container">
      {/**Left side */}
      <div className="text_wrapper">{/** Will contain texts */}</div>

      {/**Right side */}
      <div className="image_wrapper">
        {/**Big image */}

        <img src={logo} alt="" />
      </div>
    </div>
  );
};
