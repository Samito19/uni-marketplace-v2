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
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { lora } from "@/types/Fonts";
import { PriceRange } from "@/types/PriceRange";
import { Colors } from "@/types/Colors";
import { CATEGORIES } from "./Categories";

//TODO: Figure out why category checkboxes component cannot be isolated

type Props = {
  setCategoriesFilter: Dispatch<SetStateAction<string>>;
  categoriesFilter: string;
  setConditionFilter: Dispatch<SetStateAction<string>>;
  conditionFilter: string;
  setPriceRange: Dispatch<SetStateAction<PriceRange>>;
  currentPriceRange: PriceRange;
  mostExpensiveListing: number;
  isLoading: boolean;
};

export const CONDITION = ["Brand New", "Like New", "Good", "Worn"];

export default function ExploreSideBar({
  setCategoriesFilter,
  categoriesFilter,
  setConditionFilter,
  conditionFilter,
  setPriceRange,
  currentPriceRange,
  mostExpensiveListing,
  isLoading,
}: Props) {
  const handleCategoryCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCategoriesFilter(e.target.value);
    } else {
      setCategoriesFilter("");
    }
  };

  const handleConditionCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setConditionFilter(e.target.value);
    } else {
      setConditionFilter("");
    }
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
    <section className="hidden sm:flex sm:flex-col w-[16rem] h-full px-3 py-5 border-r-[1px] gap-5">
      <Text className={lora.className} fontSize={24}>
        Filters
      </Text>
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Text className={lora.className} fontSize={16}>
          Category
        </Text>
        <Stack spacing={1} direction={"column"}>
          {CATEGORIES.map((category, index) => {
            return (
              <Checkbox
                onChange={handleCategoryCheckBox}
                key={index}
                value={category.name.toLowerCase()}
                colorScheme={"red"}
                isChecked={categoriesFilter === category.name.toLowerCase()}
              >
                {category.name}
              </Checkbox>
            );
          })}
        </Stack>
      </Box>
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Text className={lora.className} fontSize={16}>
          Condition
        </Text>
        <Stack spacing={1} direction={"column"}>
          {CONDITION.map((condition, index) => {
            return (
              <Checkbox
                onChange={handleConditionCheckBox}
                key={index}
                value={condition}
                colorScheme={"red"}
                isChecked={conditionFilter === condition}
              >
                {condition}
              </Checkbox>
            );
          })}
        </Stack>
      </Box>
      {isLoading ? null : <PriceRangeSlider />}
      <LocationCheckBoxes />
    </section>
  );
}
