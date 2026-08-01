import { useEffect, useRef, useState } from "react";

export const useRevealOnScroll = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null); // TODO: Might been to abstract the type in future
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
