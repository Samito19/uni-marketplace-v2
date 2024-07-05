import { supabaseClient } from "@/lib/supabase/supabase";
import Image from "next/image";

export const GoogleSignInButton = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/explore`,
      },
    });
  };

  return (
    <button
      className="flex justify-center items-center w-[20rem] border-[1px] p-3 rounded-md mb-auto"
      onClick={signInWithGoogle}
    >
      <Image
        src="/google-icon.svg"
        width={30}
        height={30}
        alt="Google Icon"
        className="mr-auto ml-4"
      />
      <span className="mr-auto">Sign in with Google</span>
    </button>
  );
};
