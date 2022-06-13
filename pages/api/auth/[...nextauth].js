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
          console.log("auth");
          const user = await findUserByEmail(email);
          if (user && (await verifyPassword(password, user.fields.MDP))) {
            console.log(user);
            return { email: user.fields.Email };
          } else {
            console.log("error");
            return null;
          }
        } catch (err) {
          console.log("error", err.response);
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/",
  },
});
