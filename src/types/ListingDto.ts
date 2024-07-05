import { PriceRange } from "./PriceRange";

export type ListingDto = {
  author_id: string;
  category: string;
  condition: string;
  created_at?: string;
  description: string;
  id: string | undefined;
  images: string[];
  price: number;
  title: string;
  views?: number;
};

export const filterListings = (
  listings: ListingDto[],
  searchKeywords: string[],
  categoriesFilter: string,
  priceRange: PriceRange,
  conditionFilter: string
) => {
  if (
    !listings ||
    (searchKeywords.length == 0 && categoriesFilter.length == 0 && !priceRange)
  ) {
    return null;
  }

  const matchingListings = listings.filter((listing) => {
    const listingTitle = listing.title;
    const listingDescription = listing.description;
    const keywordsMatch =
      searchKeywords.some(
        (keyword) =>
          listingTitle.toLowerCase().includes(keyword.toLowerCase()) ||
          listingDescription.toLowerCase().includes(keyword.toLowerCase())
      ) || searchKeywords.length == 0;

    let categoryMatch =
      categoriesFilter.length == 0 || categoriesFilter == listing.category;

    let conditionMatch =
      conditionFilter.length == 0 || conditionFilter == listing.condition;

    let priceRangeMatch =
      !priceRange ||
      (listing.price >= priceRange.min && listing.price <= priceRange.max);

    return keywordsMatch && categoryMatch && priceRangeMatch && conditionMatch;
  });

  return matchingListings;
};
