import { ListingDto } from "@/types/ListingDto";
import { ViewIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import ListingModal from "./ListingModal";
import { useState } from "react";
import { Colors } from "@/types/Colors";
import { lora } from "@/types/Fonts";

type Props = {
  listings: ListingDto[];
};

/**This compoenent is used to render all verified listings in a simple Chakra UI grid */
export const ListingCardsGrid = ({ listings }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedListing, setClickedListing] = useState<ListingDto | null>(null);

  /**This function handles a user's click on a listing card to show the proper modal that contains details about the listing.
   * It calls the onOpen() function which sets the isOpen boolean variable to true, therefore showing the ListingModal component.
   */
  const handleListingClick = (listing: ListingDto) => {
    setClickedListing(listing);
    onOpen();
  };

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
            <Card
              onClick={() => handleListingClick(listing)}
              className="group cursor-pointer"
              borderColor={"gray.300"}
              borderWidth={1}
              borderRadius="lg"
              variant="unstyled"
              overflow="hidden"
              gap={5}
              key={index}
            >
              <Image
                objectFit="cover"
                src="students-on-grass.jpeg"
                alt="Chakra UI"
              />
              <CardBody paddingLeft={5} gap={1} className="flex flex-col">
                <Heading className="group-hover:underline" size="md">
                  {listing.title}
                </Heading>
                <Text width={"75%"} noOfLines={1}>
                  {listing.description}
                </Text>
              </CardBody>
              <CardFooter
                paddingX={5}
                paddingBottom={3}
                justify="space-between"
                alignItems={"center"}
              >
                <Text color={Colors.primaryRed} fontSize="xl">
                  $450
                </Text>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <ViewIcon w={5} h={5} />
                  <Text color="slate" fontSize="15px" as="b">
                    {listing.views ?? 0}
                  </Text>
                </Box>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};
