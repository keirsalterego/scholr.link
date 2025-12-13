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
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
        // @ts-expect-error Twitter provider supports OAuth 2.0 via `version` flag
      version: "2.0",
      // Twitter (X) OAuth2 requires the callback URL to be whitelisted in the app settings
      // and uses clientId/clientSecret (not the old API key/secret pair).
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the Twitter user data in the token
      if (account && profile) {
        const twitterProfile = profile as TwitterProfile;
        token.twitterId = twitterProfile.data?.id || twitterProfile.id;
        token.twitterUsername = twitterProfile.data?.username || twitterProfile.username;
        token.twitterImage = twitterProfile.data?.profile_image_url || twitterProfile.profile_image_url;
      }
      
      // If user data is available (from DB or signup), add it
      if (user) {
        token.id = user.id;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Add Twitter data to the session
      if (session.user) {
        session.user.id = (token.twitterId || token.id) as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.image = token.twitterImage as string;
      }
      return session;
    },
    async signIn({ profile }) {
      // Optionally validate the profile here
      if (!profile) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=auth_error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn({ user, profile }) {
      console.log("User signed in:", user?.email || user?.id);
    },
    async signOut() {
      console.log("User signed out");
    },
  },
});
