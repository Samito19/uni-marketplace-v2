import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";
import { mockListingsArray } from "@/mocks/listings";

//TODO: Fix price testing bug
test("ListingCardsGrid properly renders", async () => {
  // ARRANGE
  render(<ListingCardsGrid listings={mockListingsArray} />);

  // ACT
  const listingTitle = screen.getByText(mockListingsArray[0].title);
  const listingDescription = screen.getByText(mockListingsArray[0].description);
  //   const listingPrice = screen.getByText(mockListingsArray[0].price);
  const listingViews = screen.getByText(mockListingsArray[0].views);

  fireEvent.mouseEnter(listingTitle);

  // ASSERT
  expect(listingTitle).toBeTruthy();
  expect(listingDescription).toBeTruthy();
  expect(listingViews).toBeTruthy();
  //   expect(listingPrice).toBeTruthy();
});
