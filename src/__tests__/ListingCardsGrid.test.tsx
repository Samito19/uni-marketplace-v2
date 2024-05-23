import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockListingsArray } from "@/mocks/listings";
import { ChakraProvider } from "@chakra-ui/react";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";

test("ListingCardsGrid properly renders", async () => {
  // ARRANGE
  render(
    <ChakraProvider>
      <ListingCardsGrid listings={mockListingsArray} />
    </ChakraProvider>
  );

  // ACT
  const listingTitle = screen.getByText(mockListingsArray[0].title);
  const listingDescription = screen.getByText(mockListingsArray[0].description);
  const listingViews = screen.getByText(mockListingsArray[0].views);
  const listingPrice = screen.getByText("$" + mockListingsArray[0].price);

  // ASSERT
  expect(listingTitle).toBeTruthy();
  expect(listingDescription).toBeTruthy();
  expect(listingViews).toBeTruthy();
  expect(listingPrice).toBeTruthy();
});
