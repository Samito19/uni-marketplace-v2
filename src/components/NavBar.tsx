import Image from "next/image";
import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { lora } from "@/types/Fonts";
import { SearchIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { Colors } from "@/types/Colors";
import { signOutCurrentUser } from "@/lib/supabase/supabase";

type Props = {
  setSearchKeywords: Dispatch<SetStateAction<string[]>>;
};

export default function NavBar({ setSearchKeywords }: Props) {
  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchSentence = event.target.value;
    const keywords = searchSentence.trimEnd().split(" ");
    setSearchKeywords(keywords);
  };
  const signOut = async () => {
    const authError = await signOutCurrentUser();
    if (authError) {
      console.error(authError);
      return;
    }
    console.log("Successfully signed out !");
  };
  return (
    <nav className="w-full min-h-[4.5rem] border-b-[1px] shadow-sm flex items-center p-4 gap-4 justify-between sm:justify-normal">
      <Image
        alt="Montclair State University Red Hawk"
        src="hawk-logo.svg"
        width={40}
        height={40}
      />
      <Text fontSize={22} className={lora.className + " hidden sm:block"}>
        UniMarketplace
      </Text>
      <InputGroup className="sm:ml-auto ml-0" width={"15rem"}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          focusBorderColor={Colors.primaryRed}
          onChange={handleInputSearch}
          type="tel"
          placeholder="Search for products..."
        />
      </InputGroup>
      <Avatar
        size={"sm"}
        name="Sami Amsaf"
        src="https://bit.ly/broken-link"
        bgColor={Colors.primaryRed}
        color={"white"}
      />
    </nav>
  );
}
