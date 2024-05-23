import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

test("Home page loads correctly", async () => {
  // ARRANGE
  render(<Home />);

  // ACT
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("HOME");
});
