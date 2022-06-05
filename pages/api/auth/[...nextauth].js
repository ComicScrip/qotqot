import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { verifyPassword } from "../../../models/user";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize({ email, password }) {
        try {
          const {
            data: {
              records: [user],
            },
          } = await axios.get(
            `${
              process.env.AIRTABLE_API
            }/users?filterByFormula=%7BEmail%7D%3D%22${encodeURIComponent(
              email
            )}%22`,
            {
              headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
              },
            }
          );
          if (user && (await verifyPassword(password, user.hashedPassword))) {
            return user;
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
    signIn: "/login",
  },
});
