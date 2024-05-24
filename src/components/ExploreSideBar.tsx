import {
  Box,
  Checkbox,
  CheckboxGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { lora } from "@/types/Fonts";
import { PriceRange } from "@/types/PriceRange";
import { Colors } from "@/types/Colors";
import { CATEGORIES } from "./Categories";

//TODO: Figure out why category checkboxes component cannot be isolated

type Props = {
  setCategoriesFilter: Dispatch<SetStateAction<string[]>>;
  setPriceRange: Dispatch<SetStateAction<PriceRange>>;
  currentPriceRange: PriceRange;
  mostExpensiveListing: number;
  isLoading: boolean;
};

export default function ExploreSideBar({
  setCategoriesFilter,
  setPriceRange,
  currentPriceRange,
  mostExpensiveListing,
  isLoading,
}: Props) {
  const handleCategoryCheckBox = (categories: string[]) => {
    setCategoriesFilter(categories);
  };

  const PriceRangeSlider = () => {
    return (
      <Box display="flex" flexDirection={"column"} gap={2} width={"80%"}>
        <Text className={lora.className} fontSize={16}>
          Price Range
        </Text>
        <Stack spacing={1} direction={"column"}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Text fontWeight={500} fontSize={14}>
              ${currentPriceRange.min} – ${currentPriceRange.max}
            </Text>
            <RangeSlider
              focusThumbOnChange={false}
              onChangeEnd={(priceRange) =>
                setPriceRange({ min: priceRange[0], max: priceRange[1] })
              }
              defaultValue={[currentPriceRange.min, currentPriceRange.max]}
              min={0}
              max={mostExpensiveListing}
              step={100}
            >
              <RangeSliderTrack bg="red.100">
                <RangeSliderFilledTrack bg={Colors.primaryRed} />
              </RangeSliderTrack>
              <RangeSliderThumb borderColor={"gray"} boxSize={4} index={0} />
              <RangeSliderThumb borderColor={"gray"} boxSize={4} index={1} />
            </RangeSlider>
          </Box>
        </Stack>
      </Box>
    );
  };

  const LocationCheckBoxes = () => {
    return (
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Text className={lora.className} fontSize={16}>
          Location
        </Text>
        <CheckboxGroup colorScheme="red">
          <Stack spacing={1} direction={"column"}>
            <Checkbox value="On Campus">On Campus</Checkbox>;
            <Checkbox value="On Campus">Off Campus</Checkbox>;
          </Stack>
        </CheckboxGroup>
      </Box>
    );
  };

  return (
    <section className="hidden sm:flex sm:flex-col w-[20rem] h-fit border-[1px] p-6 rounded-[10px] gap-5 mt-6">
      <Text className={lora.className} fontSize={24}>
        Filters
      </Text>
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Text className={lora.className} fontSize={16}>
          Category
        </Text>
        <CheckboxGroup onChange={handleCategoryCheckBox} colorScheme="red">
          <Stack spacing={1} direction={"column"}>
            {CATEGORIES.map((category, index) => {
              return (
                <Checkbox key={index} value={category.name.toLowerCase()}>
                  {category.name}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </Box>
      {isLoading ? null : <PriceRangeSlider />}
      <LocationCheckBoxes />
    </section>
  );
}
