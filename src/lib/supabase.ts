import { Database } from "@/utils/database.types";
import { AuthError, createClient } from "@supabase/supabase-js";

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

export const signOutCurrentUser = async (): Promise<AuthError | null> => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    return error;
  }
  return null;
};
