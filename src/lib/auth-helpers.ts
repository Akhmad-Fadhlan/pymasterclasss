import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    // Supabase auth cookies start with "sb-" and end with "-auth-token"
    const authCookie = cookieStore.getAll().find(
      (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
    );

    if (!authCookie) return null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
    
    // Create a server-side standalone client to verify the user token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });

    const tokenData = JSON.parse(authCookie.value);
    const accessToken = tokenData.access_token;
    if (!accessToken) return null;

    // Securely retrieve the user from Supabase using the signature token
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) return null;
    return user;
  } catch (error) {
    console.error("Error in getAuthUser helper:", error);
    return null;
  }
}
