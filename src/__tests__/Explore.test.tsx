import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExplorePage from "@/app/explore/page";
import { ChakraProvider } from "@chakra-ui/react";


test("Explore page loads correctly", async () => {
  // ARRANGE
  render(
    <ChakraProvider>
      <ExplorePage />
    </ChakraProvider>
  );

  // ACT
  const exploreHeading = screen.getByText("Explore");

  // ASSERT
  expect(exploreHeading).toBeTruthy();
});
