"use client";
import Categories from "@/components/Categories";
import ExploreSideBar from "@/components/ExploreSideBar";
import { ListingCardsGrid } from "@/components/ListingCardsGrid";
import NavBar from "@/components/NavBar";
import { supabaseClient } from "@/lib/supabase";
import { Colors } from "@/types/Colors";
import { lora } from "@/types/Fonts";
import HttpStatusCode from "@/types/HtttpStatusCodes";
import { ListingDto } from "@/types/ListingDto";
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

  const [imagesLoaded, setImagedLoaded] = useState<boolean>(false);

  /**Fetches all the verified listings from the database */
  const fetchListings = async () => {
    const {
      data: fetchedListings,
      status,
      error,
    } = await supabaseClient
      .from("listings")
      .select()
      .order("created_at", { ascending: false })
      .returns<ListingDto[]>();

    if (error) {
      console.error(error);
      return;
    } else if (status == HttpStatusCode.FORBIDDEN) {
      console.error("You are not logged in !");
    }

    setMostExpensiveListing(
      Math.max(...fetchedListings.map((listing) => listing.price))
    );
    setPriceRange({
      ...priceRange,
      max: Math.max(...fetchedListings.map((listing) => listing.price)),
    });

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

      return (
        keywordsMatch && categoryMatch && priceRangeMatch && conditionMatch
      );
    });

    setFilteredListings(matchingListings);
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
