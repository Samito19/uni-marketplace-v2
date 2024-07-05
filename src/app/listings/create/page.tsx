"use client";

import { navigate } from "@/app/actions";
import { CATEGORIES } from "@/components/Categories";
import { supabaseClient } from "@/lib/supabase/supabase";
import { Colors } from "@/types/Colors";
import { lora } from "@/types/Fonts";
import { ListingDto } from "@/types/ListingDto";
import {
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { redirectUnauthenticatedUser } from "@/utils/functions";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { IoClose } from "react-icons/io5";

export default function CreateListingPage() {
  const CONDITION_OPTIONS = ["Brand New", "Like New", "Good", "Worn"];

  const [uploadingListingLoading, setUploadingListingLoading] =
    useState<boolean>(false);

  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const [titleError, setTitleError] = useState<boolean>(false);
  const [descError, setDescError] = useState<boolean>(false);
  const [imagesError, setImagesError] = useState<boolean>(false);

  const imageFilesInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>();

  const [newListing, setNewListing] = useState<ListingDto>({
    author_id: "",
    id: uuidv4(),
    title: "",
    description: "",
    category: "",
    price: 0,
    condition: "",
    images: [],
  });

  const handleListingSubmission = async () => {
    setUploadingListingLoading(true);

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (!user) {
      setUploadingListingLoading(false);
      console.error("Not authenticated !");
      navigate("/login");
      return;
    }

    let listing = newListing;

    if (listing.title.length < 5) {
      setTitleError(true);
      setUploadingListingLoading(false);
      return;
    }

    if (listing.description.length < 10) {
      setDescError(true);
      setUploadingListingLoading(false);
      return;
    }

    listing.author_id = user.id;

    if (!imageFiles) {
      setUploadingListingLoading(false);
      setImagesError(true);
      return;
    }
    for (let i = 0; i < imageFiles?.length; i++) {
      const { data, error } = await supabaseClient.storage
        .from("listings-images")
        .upload(
          `${newListing.id}/${imageFiles.at(i)!.name}`,
          imageFiles.at(i)!,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (!data || error) {
        console.error(error);
        return setUploadingListingLoading(false);
      }
      listing.images.push(data.path);
    }

    const { error } = await supabaseClient.from("listings").insert(listing);
    if (error) {
      console.error(error);
      return setUploadingListingLoading(false);
    }

    navigate("/listings/create/success");
  };

  useEffect(() => {
    redirectUnauthenticatedUser();
  }, []);

  useEffect(() => {
    setTitleError(false);
    setDescError(false);
  }, [newListing]);

  useEffect(() => {
    setImagesError(false);
  }, [imageFiles]);

  useEffect(() => {
    console.log(newListing);
  }, [newListing]);

  const Content = () => {
    return (
      <main className="min-h-screen flex flex-col items-center pt-[4.5rem] pb-8 px-5 mt-[1.5rem] sm:mt-[2rem]">
        <form
          action={() => {
            handleListingSubmission();
          }}
          className="flex flex-col gap-6 sm:w-[25rem]"
        >
          <Text fontSize={38} className={lora.className + ""}>
            Create a New Listing
          </Text>{" "}
          <FormControl isInvalid={titleError} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={(e) =>
                setNewListing({ ...newListing, title: e.target.value })
              }
              placeholder="Ex: Macbook Air M2"
            />
            <FormErrorMessage>
              Title needs to be at least 5 characters long.
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={descError} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={(e) =>
                setNewListing({ ...newListing, description: e.target.value })
              }
              height={"6rem"}
              resize={"none"}
              placeholder="Bought this mac a year and a half ago, it works perfectly fine..."
            />
            <FormErrorMessage>
              Description needs to be at least 10 characters long.
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              onChange={(e) =>
                setNewListing({
                  ...newListing,
                  category: e.target.value.toLowerCase(),
                })
              }
              placeholder="Choose a category"
            >
              {CATEGORIES.map((category, index) => {
                return (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </Select>{" "}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Condition</FormLabel>
            <Select
              onChange={(e) =>
                setNewListing({ ...newListing, condition: e.target.value })
              }
              placeholder="Choose a category"
            >
              {CONDITION_OPTIONS.map((condition, index) => {
                return (
                  <option key={index} value={condition}>
                    {condition}
                  </option>
                );
              })}
            </Select>{" "}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <NumberInput
              onChange={(valueString) =>
                setNewListing({
                  ...newListing,
                  price: Number(parse(valueString)),
                })
              }
              value={format(String(newListing.price))}
              defaultValue={0}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isInvalid={imagesError} isRequired>
            <FormLabel>Images</FormLabel>
            <div
              onClick={() => imageFilesInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-[2px] border-dashed border-[#e2e8f0] hover:border-[#cad5e1] h-[10rem] rounded-[5px] transition-all cursor-pointer"
            >
              <Image
                src="/camera-plus-icon.svg"
                width={50}
                height={50}
                alt="Camera with a plus icon"
              />
              <input
                ref={imageFilesInputRef}
                multiple
                hidden
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImageFiles(Array.from(e.target.files!))}
              />
              <Text fontSize={14}>Upload a file or drag and drop</Text>
              <Text fontSize={12}>PNG, JPG, GIF up to 10MB</Text>
            </div>
            <FormErrorMessage>
              Please make sure to add some images to your listing.
            </FormErrorMessage>
          </FormControl>
          {imageFiles ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {Array.from(imageFiles).map((imageFile, index) => {
                return (
                  <div
                    key={index}
                    className="flex relative rounded-[8px] border-[1px] border-slate-200 min-h-[10rem] max-w-[12rem] overflow-hidden"
                  >
                    <CloseButton
                      onClick={() =>
                        setImageFiles(
                          Array.from(imageFiles).filter((_, i) => i !== index)
                        )
                      }
                      className="absolute right-0"
                      bgColor={"white"}
                    />
                    <img
                      src={URL.createObjectURL(imageFile)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </Grid>
          ) : null}
          <Button
            isLoading={uploadingListingLoading}
            loadingText="Submitting"
            type="submit"
            className="bg-primaryRed text-white rounded-[4px] p-2 font-semibold"
            color={"white"}
            bgColor={Colors.primaryRed}
            _hover={{ bg: Colors.primaryRed }}
          >
            Submit listing
          </Button>
        </form>
      </main>
    );
  };

  return (
    <>
      <nav className="w-full min-h-[4.5rem] border-b-[1px] shadow-sm flex items-center p-4 gap-4 justify-between fixed top-0 z-10 bg-white">
        <div className="hidden md:flex items-center">
          <Button
            onClick={() => {
              navigate("/explore");
            }}
            leftIcon={<ArrowBackIcon />}
            color="red.500"
            variant="ghost"
          >
            Back to Explore page
          </Button>
        </div>

        <div className="block md:hidden">
          <Button
            onClick={() => {
              navigate("/explore");
            }}
            variant="ghost"
            fontSize={30}
          >
            <IoClose />
          </Button>
        </div>

        <div className="hidden md:flex items-center">
          <Button
            onClick={() => {
              handleListingSubmission();
            }}
            rightIcon={<ArrowForwardIcon />}
            color="red.500"
            variant="ghost"
          >
            Submit listing
          </Button>
        </div>

        <div className="block md:hidden">
          <Button
            onClick={() => {
              handleListingSubmission();
            }}
            variant="ghost"
            fontSize={20}
          >
            <span style={{ textDecoration: "underline" }}>Submit</span>
          </Button>
        </div>
      </nav>
      <main className="min-h-screen flex flex-col items-center pt-[4.5rem] pb-8 px-5 mt-[1.5rem] sm:mt-[2rem]">
        <form
          action={() => {
            handleListingSubmission();
          }}
          className="flex flex-col gap-6 sm:w-[25rem]"
        >
          <Text fontSize={38} className={lora.className + ""}>
            Create a New Listing
          </Text>{" "}
          <FormControl isInvalid={titleError} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={(e) =>
                setNewListing({ ...newListing, title: e.target.value })
              }
              placeholder="Ex: Macbook Air M2"
            />
            <FormErrorMessage>
              Title needs to be at least 5 characters long.
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={descError} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={(e) =>
                setNewListing({ ...newListing, description: e.target.value })
              }
              height={"6rem"}
              resize={"none"}
              placeholder="Bought this mac a year and a half ago, it works perfectly fine..."
            />
            <FormErrorMessage>
              Description needs to be at least 10 characters long.
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              onChange={(e) =>
                setNewListing({
                  ...newListing,
                  category: e.target.value.toLowerCase(),
                })
              }
              placeholder="Choose a category"
            >
              {CATEGORIES.map((category, index) => {
                return (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </Select>{" "}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Condition</FormLabel>
            <Select
              onChange={(e) =>
                setNewListing({ ...newListing, condition: e.target.value })
              }
              placeholder="Choose a category"
            >
              {CONDITION_OPTIONS.map((condition, index) => {
                return (
                  <option key={index} value={condition}>
                    {condition}
                  </option>
                );
              })}
            </Select>{" "}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <NumberInput
              onChange={(valueString) =>
                setNewListing({
                  ...newListing,
                  price: Number(parse(valueString)),
                })
              }
              value={format(String(newListing.price))}
              defaultValue={0}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isInvalid={imagesError} isRequired>
            <FormLabel>Images</FormLabel>
            <div
              onClick={() => imageFilesInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-[2px] border-dashed border-[#e2e8f0] hover:border-[#cad5e1] h-[10rem] rounded-[5px] transition-all cursor-pointer"
            >
              <Image
                src="/camera-plus-icon.svg"
                width={50}
                height={50}
                alt="Camera with a plus icon"
              />
              <input
                ref={imageFilesInputRef}
                multiple
                hidden
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImageFiles(Array.from(e.target.files!))}
              />
              <Text fontSize={14}>Upload a file or drag and drop</Text>
              <Text fontSize={12}>PNG, JPG, GIF up to 10MB</Text>
            </div>
            <FormErrorMessage>
              Please make sure to add some images to your listing.
            </FormErrorMessage>
          </FormControl>
          {imageFiles ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {Array.from(imageFiles).map((imageFile, index) => {
                return (
                  <div
                    key={index}
                    className="flex relative rounded-[8px] border-[1px] border-slate-200 min-h-[10rem] max-w-[12rem] overflow-hidden"
                  >
                    <CloseButton
                      onClick={() =>
                        setImageFiles(
                          Array.from(imageFiles).filter((_, i) => i !== index)
                        )
                      }
                      className="absolute right-0"
                      bgColor={"white"}
                    />
                    <img
                      src={URL.createObjectURL(imageFile)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </Grid>
          ) : null}
          <Button
            isLoading={uploadingListingLoading}
            loadingText="Submitting"
            type="submit"
            className="bg-primaryRed text-white rounded-[4px] p-2 font-semibold"
            color={"white"}
            bgColor={Colors.primaryRed}
            _hover={{ bg: Colors.primaryRed }}
          >
            Submit listing
          </Button>
        </form>
      </main>
    </>
  );
}
