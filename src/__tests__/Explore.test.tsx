import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExplorePage from "@/app/explore/page";

test("Explore page loads correctly", async () => {
  // ARRANGE
  render(<ExplorePage />);

  // ACT
  const exploreHeading = screen.getByText("Explore");
  console.log(exploreHeading);

  // ASSERT
  expect(exploreHeading).toBeTruthy();
});
