import { Box, Checkbox, CheckboxGroup, Stack, Text } from "@chakra-ui/react";
import { CATEGORIES } from "./Categories";
import { Dispatch, SetStateAction } from "react";
import { lora } from "@/types/Fonts";
import { PriceRange } from "@/types/PriceRange";

type Props = {
  setCategoriesFilter: Dispatch<SetStateAction<string[]>>;
  setPriceRange: Dispatch<SetStateAction<PriceRange | null>>;
  currentPriceRange: PriceRange | null;
};

export default function ExploreSideBar({
  setCategoriesFilter,
  setPriceRange,
  currentPriceRange,
}: Props) {
  const handleCategoryCheckBox = (categories: string[]) => {
    setCategoriesFilter(categories);
  };

  // const handlePriceRangeCheck = (range: string) {

  // }

  return (
    <section className="hidden sm:flex sm:flex-col w-[20rem] h-fit border-[1px] p-6 rounded-[10px] gap-6 mt-6">
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

      <Box display="flex" flexDirection={"column"} gap={2}>
        <Text className={lora.className} fontSize={16}>
          Price Range
        </Text>
        <Stack spacing={1} direction={"column"}>
          {Object.values(PriceRange).map((range, index) => {
            return (
              <Checkbox
                colorScheme="red"
                isChecked={currentPriceRange === range}
                onChange={() => setPriceRange(range)}
                key={index}
                value={range}
              >
                {range}
              </Checkbox>
            );
          })}
        </Stack>
      </Box>

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
    </section>
  );
}
