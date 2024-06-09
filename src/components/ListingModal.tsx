import { ListingDto } from "@/types/ListingDto";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import ImageCarousel from "./ImageCarousel";
import { useState } from "react";
import { Colors } from "@/types/Colors";
import { capitalizeFirstLetter } from "@/utils/functions";

type Props = {
  listing: ListingDto;
  isOpen: boolean;
  onClose: () => void;
};

enum ExpandDescription {
  False = 2,
  True = 100,
}

/**Modal component to render a listing's details */
export default function ListingModal({ listing, isOpen, onClose }: Props) {
  const [expandDescription, setExpandDescription] = useState<ExpandDescription>(
    ExpandDescription.False
  );

  const handleExpandDescButton = () => {
    if (expandDescription == ExpandDescription.False) {
      setExpandDescription(ExpandDescription.True);
    } else {
      setExpandDescription(ExpandDescription.False);
    }
  };
  return (
    <Modal
      // scrollBehavior="inside"
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{listing.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap={3}>
          <ImageCarousel images={listing.images} />
          <Heading as="h4" size="md">
            Details
          </Heading>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Text noOfLines={expandDescription}>{listing.description}</Text>
            <Text
              onClick={handleExpandDescButton}
              cursor={"pointer"}
              fontWeight={600}
              alignSelf={"end"}
              marginRight={4}
            >
              Show{" "}
              {expandDescription == ExpandDescription.False ? "more" : "less"}
            </Text>
          </Box>

          <Box width={"90%"} display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Text fontWeight={600} size="sm">
                Conditon:
              </Text>
              <Text>{capitalizeFirstLetter(listing.condition)}</Text>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Text fontWeight={600} size="sm">
                Price:
              </Text>
              <Text>${listing.price}</Text>
            </Box>

            <Box display={"flex"} flexDirection={"column"}>
              <Text fontWeight={600} size="sm">
                Category:
              </Text>
              <Text>{capitalizeFirstLetter(listing.category)}</Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            color={"white"}
            bgColor={Colors.primaryRed}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
