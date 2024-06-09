"use client";
import { navigate } from "@/app/actions";
import { Colors } from "@/types/Colors";
import { lora } from "@/types/Fonts";
import { Button, Text } from "@chakra-ui/react";
import Confetti from "react-confetti";

export default function ListingCreatedSuccess() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-1 items-center justify-center z-10 bg-white text-center">
        <Text
          //   bgColor={"white"}
          className={
            lora.className + " text-[1.7em] px-5 sm:p-0 sm:text-[40px]"
          }
        >
          Your listing was successfully created !
        </Text>
        <Text className="px-5 sm:p-0 " bgColor={"white"} fontSize={18}>
          Please allow 24 hours for your listing to verified by the moderation
          team.
        </Text>
      </div>

      <Button
        onClick={() => {
          navigate("/explore");
        }}
        cursor={"pointer"}
        bgColor={Colors.primaryRed}
        color={"white"}
        _hover={{ bg: Colors.primaryRed }}
        className="z-10"
      >
        Take me to the Explore page
      </Button>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      ></Confetti>
    </div>
  );
}
