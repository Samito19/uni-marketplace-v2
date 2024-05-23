import { ListingDto } from "@/types/ListingDto";
import {
  SimpleGrid,
  Text,
  Box,
  useDisclosure,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import ListingModal from "./ListingModal";
import { useState } from "react";
import { lora } from "@/types/Fonts";
import ListingCard from "./ListingCard";

type Props = {
  listings: ListingDto[] | null;
};

/**This compoenent is used to render all verified listings in a simple Chakra UI grid */
export const ListingCardsGrid = ({ listings }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedListing, setClickedListing] = useState<ListingDto | null>(null);

  if (!listings) {
    return (
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {[...Array(10)].map((_, index: number) => {
          return (
            <Box
              className="group cursor-pointer"
              borderColor={"gray.300"}
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              padding={5}
              gap={5}
              key={index}
              height={"20rem"}
            >
              <Skeleton height="10rem" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          );
        })}
      </SimpleGrid>
    );
  }

  if (listings.length == 0) {
    return (
      <Box
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text className={lora.className} fontSize={18}>
          No listings found...
        </Text>
      </Box>
    );
  }

  return (
    <>
      {clickedListing ? (
        <ListingModal
          isOpen={isOpen}
          onClose={onClose}
          listing={clickedListing}
        />
      ) : null}

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {listings.map((listing, index) => {
          return (
            <ListingCard
              listing={listing}
              setClickedListing={setClickedListing}
              onOpen={onOpen}
              key={index}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};
