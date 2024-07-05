import { navigate } from "@/app/actions";
import { supabaseClient } from "@/lib/supabase/supabase";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function redirectUnauthenticatedUser() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) {
    console.error("Not authenticated !");
    navigate("/login");
    return;
  }
}
