import heroImg from "@/resources/images/branding/hero_ex_one.jpg";

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
  return (
    <section className="hero container">
      {/**Left side */}
      <div className="text_wrapper">
        {/** Will contain texts */}

        <h1 className="hero_name">
          <span>Peperudi</span>
          <span className="title_span">.BG</span>
        </h1>

        <h5 className="hero_caption">
          <span className="eyebrow sans_text">
            Butterflies · Scorpions · Spiders
            <span>
              <a>Sofia</a> · <a>Plovdiv</a> · <a>Varna</a>
            </span>
            <span className="s">
              <span>Scroll</span>
            </span>
          </span>
        </h5>
      </div>

      {/**Right side */}
      <div className="image_wrapper">
        <img src={heroImg} alt="eperudi BG logo" />
      </div>
    </section>
  );
};
