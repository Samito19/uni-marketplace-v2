import { Database } from "@/utils/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return user;
};
