import HttpStatusCode from "@/types/HtttpStatusCodes";
import { ListingDto } from "@/types/ListingDto";
import { supabaseClient } from "../supabase";
import { PriceRange } from "@/types/PriceRange";
import { Dispatch, SetStateAction } from "react";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * We use this type to aggreate all the different necesaary information into one object which the functio below returns
 * This helps us avoid passing SetState functions
 */
type FetchAllListingsResponse = {
  mostExpensiveListingPrice: number;
  newPriceRange: PriceRange;
  listings: ListingDto[];
  error: PostgrestError;
};

/**
 * This function is responsible solely for fetching VERIFIED listings from the supabase database
 */

/**Fetches all the verified listings from the database */
export const fetchListings = async (
  setMostExpensiveListing: Dispatch<SetStateAction<number>>,
  setPriceRange: Dispatch<SetStateAction<PriceRange>>,
  setListings: Dispatch<SetStateAction<ListingDto[] | null>>,
  priceRange: PriceRange
): Promise<FetchAllListingsResponse> => {
  const {
    data: fetchedListings,
    status,
    error,
  } = await supabaseClient.from("listings").select().returns<ListingDto[]>();

  if (error) {
    console.error(error);
    return {
      listings: [],
      mostExpensiveListingPrice: 0,
      newPriceRange: { min: 0, max: 0 },
      error: error,
    } as FetchAllListingsResponse;
  } else if (status == HttpStatusCode.FORBIDDEN) {
    console.error("You are not logged in !");
  }

  const listingsWithImages = await Promise.all(
    fetchedListings.map(async (listing) => {
      let imageUrls: string[] = [];
      for (const imagePath of listing.images) {
        const { data: imageBlob, error } = await supabaseClient.storage
          .from("listings-images")
          .download(imagePath);

        if (imageBlob && !error) {
          imageUrls.push(URL.createObjectURL(imageBlob));
        }
      }
      return { ...listing, images: imageUrls };
    })
  );

  const mostExpensiveListingPrice = Math.max(
    ...fetchedListings.map((listing) => listing.price)
  );

  const newPriceRange = {
    ...priceRange,
    max: Math.max(...fetchedListings.map((listing) => listing.price)),
  };

  return {
    listings: listingsWithImages ?? null,
    mostExpensiveListingPrice,
    newPriceRange,
  } as FetchAllListingsResponse;
};
