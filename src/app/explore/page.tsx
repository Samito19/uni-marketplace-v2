"use client";
import { getCurrentUser } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const user = await getCurrentUser();
    console.log(user);
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchUser();
    console.log(currentUser);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-[10rem]">EXPLORE</h1>
    </main>
  );
}
