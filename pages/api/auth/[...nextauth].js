import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  findUserByEmail,
  getSafeAttributes,
  verifyPassword,
} from "../../../models/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize({ username, password }) {
        const user = await findUserByEmail(username);
        const passwordVerified =
          user && (await verifyPassword(user.hashedPassword, password));
        if (passwordVerified) return getSafeAttributes(user);
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
