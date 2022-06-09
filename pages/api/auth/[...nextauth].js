import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword, findUserByEmail } from "../../../models/user";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize({ email, password }) {
        try {
          const user = await findUserByEmail(email);
          if (user && (await verifyPassword(password, user.fields.MDP))) {
            return { email: user.fields.Email };
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
    // ...add more providers here
    // voir doc next auth callbacks redirect call back
  ],
  pages: {
    signIn: "/",
  },
});
