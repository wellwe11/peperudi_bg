import { createContext, useContext, useEffect, useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export function useLenis() {
  return useContext(LenisContext);
}

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis();
    setLenis(instance);
    instance.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      instance.raf(time * 1500);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <Nav />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </LenisContext.Provider>
  );
}
