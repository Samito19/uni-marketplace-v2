import { ListingDto } from "@/types/ListingDto";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  CardFooter,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Colors } from "@/types/Colors";

type Props = {
  listing: ListingDto;
  setClickedListing: Dispatch<SetStateAction<ListingDto | null>>;
  onOpen: () => void;
};

export default function ListingCard({
  listing,
  setClickedListing,
  onOpen,
}: Props) {
  /**This function handles a user's click on a listing card to show the proper modal that contains details about the listing.
   * It calls the onOpen() function which sets the isOpen boolean variable to true, therefore showing the ListingModal component.
   */
  const handleListingClick = (listing: ListingDto) => {
    setClickedListing(listing);
    onOpen();
  };
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
    >
      <Image objectFit="cover" src="students-on-grass.jpeg" alt="Chakra UI" />
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
          ${listing.price}
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
}
