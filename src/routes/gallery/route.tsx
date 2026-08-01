import { createFileRoute } from "@tanstack/react-router";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import "@/styles/productCard.scss";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div
        style={{
          height: "1000px",
          width: "100%",
          backgroundColor: "gray",
        }}
      />

      <GreenComponent />
    </div>
  );
}

const GreenComponent = () => {
  const { ref, isVisible } = useRevealOnScroll();
  console.log(isVisible);

  return (
    <div
      ref={ref}
      style={{
        width: "50%",
        height: "300px",
        backgroundColor: "green",
      }}
      className={`product-card ${isVisible ? "is-visible" : ""}`}
    />
  );
};
