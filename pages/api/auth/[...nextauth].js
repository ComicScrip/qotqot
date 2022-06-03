import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { getToken } from "next-auth/jwt";
import axios from "axios";
// import {
//   findUserByEmail,
//   getSafeAttributes,
//   verifyPassword,
// } from "../../../models/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url = "https://mocki.io/v1/d9f98981-6f08-4bc3-adcd-ed80bdb10dc3";
        const res = await axios.post(url, credentials);
        const user = await res.json();
        if (res && user) {
          console.log(res.data);
          return res.data;
        } else {
          return console.log("test");
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
});
