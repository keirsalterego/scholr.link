import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      twitterUsername: string;
      walletAddress?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    twitterUsername?: string;
    walletAddress?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    twitterId?: string;
    twitterUsername?: string;
    twitterImage?: string;
    walletAddress?: string;
  }
}
