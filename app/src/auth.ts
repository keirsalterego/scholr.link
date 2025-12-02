import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

interface TwitterProfile {
  data?: {
    id: string;
    username: string;
    profile_image_url: string;
  };
  id?: string;
  username?: string;
  profile_image_url?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the Twitter user data in the token
      if (account && profile) {
        const twitterProfile = profile as TwitterProfile;
        token.twitterId = twitterProfile.data?.id || twitterProfile.id;
        token.twitterUsername = twitterProfile.data?.username || twitterProfile.username;
        token.twitterImage = twitterProfile.data?.profile_image_url || twitterProfile.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      // Add Twitter data to the session
      if (session.user) {
        session.user.id = token.twitterId as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.image = token.twitterImage as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});
