import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken = "";

  try {
    // Await cookies() to resolve the promise
    const cookieStore = cookies(); // cookies() does not need await here as it provides a sync-like API for headers
    const refreshTokenCookie = cookieStore.get("refreshToken")?.value;

    // Safely parse the cookie value
    refreshToken = refreshTokenCookie ? JSON.parse(refreshTokenCookie) : "";
  } catch (e) {
    console.error("Error retrieving refresh token from cookies:", e);
  }

  // Create the Wix client
  const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
