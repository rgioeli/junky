import { mongo_connect } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async signIn(props) {
      // add user to database
      if (props.account.provider == "google") {
        const db = await mongo_connect();
        const user = await db
          .collection("users")
          .findOne({ email: props.user.email });

        if (user) return true;

        await db.collection("users").insertOne({
          email: props.user.email,
        });

        return true;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
