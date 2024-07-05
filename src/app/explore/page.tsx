"use client";
import Categories from "@/components/Categories";
import ExploreSideBar from "@/components/ExploreSideBar";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";
import NavBar from "@/components/NavBar";
import { fetchListings } from "@/lib/supabase/api/fetchListings";
import { Colors } from "@/types/Colors";
import { lora } from "@/types/Fonts";
import { ListingDto, filterListings } from "@/types/ListingDto";
import { PriceRange } from "@/types/PriceRange";
import { capitalizeFirstLetter } from "@/utils/functions";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { navigate } from "../actions";

export default function ExplorePage() {
  const [listings, setListings] = useState<ListingDto[] | null>(null);
  const [filteredListings, setFilteredListings] = useState<ListingDto[] | null>(
    null
  );
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<string>("");
  const [conditionFilter, setConditionFilter] = useState<string>("");

  const [mostExpensiveListing, setMostExpensiveListing] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 0,
  });

  const loadExplorePage = async () => {
    const response = await fetchListings(
      setMostExpensiveListing,
      setPriceRange,
      setListings,
      priceRange
    );
    setMostExpensiveListing(response.mostExpensiveListingPrice);
    setPriceRange(response.newPriceRange);
    setListings(response.listings);
  };

  useEffect(() => {
    loadExplorePage();
  }, []);

  /*This piece of code will take care of filtering all the listings down to the ones that contain
   at least one of the keywords typed in the search bar */
  useEffect(() => {
    if (!listings) return;
    setFilteredListings(
      filterListings(
        listings,
        searchKeywords,
        categoriesFilter,
        priceRange,
        conditionFilter
      )
    );
  }, [searchKeywords, categoriesFilter, priceRange, conditionFilter]);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden">
      <NavBar setSearchKeywords={setSearchKeywords} />
      <div className="flex h-full w-full overflow-hidden px-4">
        <ExploreSideBar
          conditionFilter={conditionFilter}
          setConditionFilter={setConditionFilter}
          categoriesFilter={categoriesFilter}
          isLoading={!!!listings}
          currentPriceRange={priceRange}
          setPriceRange={setPriceRange}
          setCategoriesFilter={setCategoriesFilter}
          mostExpensiveListing={mostExpensiveListing}
        />
        <Box
          display={"flex"}
          paddingY={2}
          paddingX={8}
          paddingBottom={30}
          flexDirection={"column"}
          overflow={"scroll"}
          overflowX={"hidden"}
          width={"100%"}
          className="gap-2 sm:gap-6 bg-slate-50/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-0">
            <Text fontSize={50} className={lora.className}>
              {categoriesFilter
                ? capitalizeFirstLetter(categoriesFilter)
                : "Explore"}
            </Text>
            <Button
              className="bg-white text-white rounded-[4px] p-2 font-semibold w-[10rem] sm:w-fit"
              color={"red.500"}
              _hover={{ bg: Colors.primaryRed, textColor: "white" }}
              leftIcon={<AddIcon />}
              variant="outline"
              borderColor={"red.500"}
              onClick={() => {
                navigate("/listings/create");
              }}
            >
              Add new listing
            </Button>
          </div>

          <Categories />
          <ListingCardsGrid listings={filteredListings ?? listings} />
        </Box>
      </div>
    </main>
  );
}
