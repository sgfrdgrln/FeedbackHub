import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from "@/backend/db/connection";
import User from "@/backend/models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();

        const githubUsername = (profile as any)?.login;
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            username: githubUsername,
            email: user.email,
            image: user.image,
            provider: account?.provider,
          });
        } else {
          existingUser.name = user.name || existingUser.name;
          existingUser.username = githubUsername || existingUser.username;
          existingUser.image = user.image || existingUser.image;
          await existingUser.save();
        }

        return true;
      } catch (err) {
        console.error("Error during signIn:", err);
        return false;
      }
    },

    async jwt({ token, user, profile }) {
      if (user) {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.username = dbUser.username || (profile as any)?.login;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});

// ✅ Correct route exports
export { handler as GET, handler as POST };
