"use client";
import Categories from "@/components/Categories";
import ExploreSideBar from "@/components/ExploreSideBar";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";
import NavBar from "@/components/NavBar";
import { supabaseClient } from "@/lib/supabase";
import { lora } from "@/types/Fonts";
import HttpStatusCode from "@/types/HtttpStatusCodes";
import { ListingDto } from "@/types/ListingDto";
import { PriceRange } from "@/types/PriceRange";
import { Box, Text } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listings, setListings] = useState<ListingDto[]>([]);
  const [filteredListings, setFilteredListings] = useState<ListingDto[] | null>(
    null
  );
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);

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
    console.log(fetchedListings);
    setListings(fetchedListings ?? []);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /*This piece of code will take care of filtering all the listings down to the ones that contain
   at least one of the keywords typed in the search bar */
  useEffect(() => {
    if (searchKeywords.length == 0 && categoriesFilter.length == 0) {
      setFilteredListings(null);
      return;
    }
    const matchingListings = listings.filter((listing) => {
      const listingTitle = listing.title;
      const keywordsMatch =
        searchKeywords.some((keyword) => listingTitle.includes(keyword)) ||
        searchKeywords.length == 0;

      let categoryMatch =
        categoriesFilter.length == 0 ||
        categoriesFilter.includes(listing.category);

      return keywordsMatch && categoryMatch;
    });

    setFilteredListings(matchingListings);
  }, [searchKeywords, categoriesFilter]);

  return (
    <main className="flex h-screen w-screen flex-col">
      <NavBar setSearchKeywords={setSearchKeywords} />
      <div className="flex w-full overflow-hidden gap-4 px-4">
        <ExploreSideBar
          currentPriceRange={priceRange}
          setPriceRange={setPriceRange}
          setCategoriesFilter={setCategoriesFilter}
        />
        <Box
          display={"flex"}
          paddingY={2}
          paddingX={4}
          flexDirection={"column"}
          gap={6}
          overflow={"scroll"}
          overflowX={"hidden"}
          width={"100%"}
        >
          <Text fontSize={50} className={lora.className}>
            Explore
          </Text>
          <Categories />
          <ListingCardsGrid listings={filteredListings ?? listings} />
        </Box>
      </div>
    </main>
  );
}
