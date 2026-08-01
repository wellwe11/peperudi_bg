// src/components/ui/Button/Button.test.tsx
import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders button text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
