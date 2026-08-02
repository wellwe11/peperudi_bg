import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useLenis } from "@/routes/__root";
import useCurrentTime from "@/hooks/useCurrentTime";

import butterfly from "@/resources/images/insects/butterfly.svg";
import bee from "@/resources/images/insects/bee.svg";
import ladybug from "@/resources/images/insects/ladybug.svg";
import ant from "@/resources/images/insects/ant.svg";
import dragonfly from "@/resources/images/insects/dragonfly.svg";
import grasshopper from "@/resources/images/insects/grasshopper.svg";
import moth from "@/resources/images/insects/moth.svg";
import cricket from "@/resources/images/insects/cricket.svg";
import mantis from "@/resources/images/insects/mantis.svg";

import "./Footer.scss";

const SAMPLE_TEXTS = [
  { left: "My name is", right: "Robin Ryan" },
  { left: "I live in", right: "Sofia, Bulgaria" },
  { left: "I work as a", right: "Software Developer" },
  { left: "Today is", right: null },
  { left: "I'm currently building", right: "Peperudi BG" },
  { left: "My favorite stack is", right: "React & TypeScript" },
  { left: "This site runs on", right: "Vite & TanStack Router" },
  { left: "Coffee count today:", right: "3 and counting" },
  { left: "Status:", right: "Still debugging" },
];

const SVG_SAMPLES = [
  { name: "butterfly", src: butterfly },
  { name: "bee", src: bee },
  { name: "ladybug", src: ladybug },
  { name: "ant", src: ant },
  { name: "dragonfly", src: dragonfly },
  { name: "grasshopper", src: grasshopper },
  { name: "moth", src: moth },
  { name: "cricket", src: cricket },
  { name: "mantis", src: mantis },
];

const MAX_PUSH = 70; // horizontal swing at peak proximity
const ARC_HEIGHT = 22; // vertical pull toward icon at peak proximity
const INFLUENCE_RANGE = 140; // how far the effect reaches from the icon
const SMOOTHING = 0.12; // 0–1: lower = smoother/laggier, higher = snappier

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer_inner">
        <Scroller />
      </div>
    </footer>
  );
}

function Scroller() {
  const lenis = useLenis();
  const [activeInsect, setActiveInsect] = useState(0);
  const sofiaTime = useCurrentTime("Europe/Sofia");

  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const rightRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const containerTopRef = useRef(0);
  const copyHeightRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // per-row damped proximity — this is what makes motion ease instead of snap
  const smoothedRef = useRef<number[]>([]);

  const baseRows = SAMPLE_TEXTS.map((row) =>
    row.right === null ? { ...row, right: sofiaTime } : row,
  );
  const N = baseRows.length;

  useEffect(() => {
    smoothedRef.current = baseRows.map(() => 0);
  }, [N]);

  useEffect(() => {
    const triggers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveInsect(i % N),
        onEnterBack: () => setActiveInsect(i % N),
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, [N]);

  useEffect(() => {
    function measure() {
      const container = rowsContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      containerTopRef.current = rect.top + window.scrollY;
      copyHeightRef.current = container.scrollHeight / 2;
    }
    measure();
    window.addEventListener("resize", measure);
    lastScrollYRef.current = window.scrollY;
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    function updatePush() {
      const imageEl = imageWrapperRef.current;
      if (!imageEl) return;
      const imageRect = imageEl.getBoundingClientRect();
      const imageCenterY = imageRect.top + imageRect.height / 2;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const rowCenterY = rect.top + rect.height / 2;
        const distance = rowCenterY - imageCenterY;
        const clamped = Math.max(
          -INFLUENCE_RANGE,
          Math.min(INFLUENCE_RANGE, distance),
        );

        // smoothstep instead of linear falloff — no hard corner at the boundary
        const signed = clamped / INFLUENCE_RANGE; // continuous -1..1, passes smoothly through 0
        const target = 1 - Math.abs(signed);
        const smoothTarget = target * target * (3 - 2 * target);

        const prev = smoothedRef.current[i] ?? 0;
        const eased = prev + (smoothTarget - prev) * SMOOTHING;
        smoothedRef.current[i] = eased;

        const pushX = eased * MAX_PUSH;
        const pushY = -signed * ARC_HEIGHT * eased; // sign now varies continuously, no snap

        const left = leftRefs.current[i];
        const right = rightRefs.current[i];
        if (left) left.style.transform = `translate(${-pushX}px, ${pushY}px)`;
        if (right) right.style.transform = `translate(${pushX}px, ${pushY}px)`;
      });
    }
    gsap.ticker.add(updatePush);
    return () => gsap.ticker.remove(updatePush);
  }, []);

  useEffect(() => {
    function handleLoop() {
      if (!lenis) return;
      if (copyHeightRef.current === 0) return;

      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollYRef.current ? "down" : "up";
      lastScrollYRef.current = currentScrollY;

      if (direction !== "down") return;

      let relative = currentScrollY - containerTopRef.current;
      let newScrollY = currentScrollY;

      while (relative >= copyHeightRef.current) {
        newScrollY -= copyHeightRef.current;
        relative -= copyHeightRef.current;
      }

      if (newScrollY !== currentScrollY) {
        lenis.scrollTo(newScrollY, { immediate: true });
        lastScrollYRef.current = newScrollY;
      }
    }

    gsap.ticker.add(handleLoop);
    return () => gsap.ticker.remove(handleLoop);
  }, [lenis]);

  const insect = SVG_SAMPLES[activeInsect];

  return (
    <div className="scroller">
      <section className="contact-visual">
        <div className="contact-sticky">
          <div className="contact-icon" ref={imageWrapperRef}>
            <img
              key={insect.name}
              src={insect.src}
              alt={insect.name}
              className="icon-fade"
            />
          </div>
        </div>
      </section>

      <section className="contact-info" ref={rowsContainerRef}>
        {baseRows.map(({ left, right }, i) => (
          <div
            key={i}
            className="contact-info-row"
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          >
            <p
              className="label sans_text"
              ref={(el) => {
                leftRefs.current[i] = el;
              }}
            >
              {left}
            </p>
            <p
              className="value sans_text"
              ref={(el) => {
                rightRefs.current[i] = el;
              }}
            >
              {right}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Footer;
