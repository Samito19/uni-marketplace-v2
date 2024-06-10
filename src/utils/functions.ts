import { navigate } from "@/app/actions";
import { supabaseClient } from "@/lib/supabase";
import { User } from "@supabase/auth-js";
import { Dispatch, SetStateAction } from "react";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function redirectUnauthenticatedUser(
  setCurrentUser?: Dispatch<SetStateAction<User | null>>
) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) {
    console.error("Not authenticated !");
    navigate("/login");
    return;
  }
  if (setCurrentUser) setCurrentUser(user);
}
