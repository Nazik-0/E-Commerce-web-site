import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";




export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieStore = await cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
  } catch (e) {
    console.error("Error retrieving refresh token from cookies:", e);
  }


  const wixClient = createClient({
    modules: {
      products,
      collections,
      //currentCart
    },
    auth: OAuthStrategy({
      clientId:  process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });
  
  return wixClient;
};