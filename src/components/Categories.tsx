import { Category } from "@/types/Category";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export const CATEGORIES: Category[] = [
  { name: "Textbooks", icon: "book-icon.svg", size: 30 },
  { name: "Electronics", icon: "computer-icon.svg", size: 35 },
  { name: "Furniture", icon: "couch-icon.svg", size: 40 },
  { name: "Clothing", icon: "clothes-icon.svg", size: 30 },
  { name: "Miscellaneous", icon: "glare-icon.svg", size: 30 },
];

export default function Categories() {
  return (
    <Box
      className="sm:hidden w-full flex gap-10 items-center"
      cursor={"pointer"}
      overflowX={"scroll"}
    >
      {CATEGORIES.map((category, index) => {
        return (
          <div
            key={category.name}
            className="flex flex-col items-center gap-1 rounded-[10px] cursor-pointer"
          >
            <Box
              borderRadius={"50%"}
              padding={5}
              borderColor={"black"}
              borderWidth={1}
            >
              <Image
                alt={category.name}
                src={category.icon}
                width={category.size}
                height={category.size}
              />
            </Box>
            <Text>{category.name}</Text>
          </div>
        );
      })}
    </Box>
  );
}
