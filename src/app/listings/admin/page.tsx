"use client";

import Categories from "@/components/Categories";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";
import NavBar from "@/components/NavBar";
import { supabaseClient } from "@/lib/supabase/supabase";
import { lora } from "@/types/Fonts";
import HttpStatusCode from "@/types/HtttpStatusCodes";
import { ListingDto } from "@/types/ListingDto";
import { PriceRange } from "@/types/PriceRange";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [listings, setListings] = useState<ListingDto[] | null>(null);
  const [filteredListings, setFilteredListings] = useState<ListingDto[] | null>(
    null
  );
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<string>("");
  const [mostExpensiveListing, setMostExpensiveListing] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 0,
  });

  const [imagesLoaded, setImagedLoaded] = useState<boolean>(false);

  /**Fetches all the verified listings from the database */
  const fetchListings = async () => {
    const {
      data: fetchedListings,
      status,
      error,
    } = await supabaseClient.from("listings").select().returns<ListingDto[]>();

    if (error) {
      console.error(error);
      return;
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

    setListings(listingsWithImages ?? null);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /*This piece of code will take care of filtering all the listings down to the ones that contain
     at least one of the keywords typed in the search bar */
  useEffect(() => {
    if (
      !listings ||
      (searchKeywords.length == 0 &&
        categoriesFilter.length == 0 &&
        !priceRange)
    ) {
      setFilteredListings(null);
      return;
    }

    const matchingListings = listings.filter((listing) => {
      const listingTitle = listing.title;
      const keywordsMatch =
        searchKeywords.some((keyword) => listingTitle.includes(keyword)) ||
        searchKeywords.length == 0;

      let categoryMatch =
        categoriesFilter.length == 0 || categoriesFilter == listing.category;

      let priceRangeMatch =
        !priceRange ||
        (listing.price >= priceRange.min && listing.price <= priceRange.max);

      return keywordsMatch && categoryMatch && priceRangeMatch;
    });

    setFilteredListings(matchingListings);
  }, [searchKeywords, categoriesFilter, priceRange]);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden">
      <NavBar setSearchKeywords={setSearchKeywords} />
      <div className="flex w-full overflow-hidden gap-4 px-4">
        <Box
          display={"flex"}
          paddingY={2}
          paddingX={4}
          paddingBottom={10}
          flexDirection={"column"}
          overflow={"scroll"}
          overflowX={"hidden"}
          width={"100%"}
          className="gap-2 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-0">
            <Text fontSize={50} className={lora.className}>
              Admin Dashboard
            </Text>
          </div>
          <Categories />
          <ListingCardsGrid listings={filteredListings ?? listings} />
        </Box>
      </div>
    </main>
  );
}
