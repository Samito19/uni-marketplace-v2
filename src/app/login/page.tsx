"use client";

import { Lora } from "next/font/google";
import { StudentsOnGrassBGImage } from "@/components/StudentsOnGrassBgImage";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

const lora = Lora({
  weight: "500",
  subsets: ["latin"],
});

export default function LoginPage() {
  return (
    <main
      className={lora.className + " flex min-h-screen w-screen items-center"}
    >
      <StudentsOnGrassBGImage />
      <div className=" relative flex flex-col justify-center items-center gap-3 min-h-screen w-full sm:w-[50%] bg-login2 bg-contain bg-no-repeat">
        <h1 className="font-medium text-[1.6em] sm:text-[2.5rem] mt-auto">
          Welcome to MSU Marketplace
        </h1>
        <GoogleSignInButton />
      </div>
    </main>
  );
}
