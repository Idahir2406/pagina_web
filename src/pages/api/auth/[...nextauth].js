import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as normalUser } from "../../../services/constants";
import { connectDB } from "utils/mongoose";
import User from "../../../models/user";
import bcrypt from "bcrypt";

connectDB();
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          if (
            !credentials.email ||
            !credentials.password ||
            credentials.password.length < 8
          )
            return null;
            
          const user = await User.findOne({ email: credentials.email }).select(
            "username email image role password"
          );
  
          if (!user) throw new Error("User not found");
          // Validar la contraseña utilizando bcrypt.compare()
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isValid) throw new Error("Password not valid");
          const session = {
            name: user.username,
            email: user.email,
            image: user.image ? user.image : null,
            role: user.role ? user.role : normalUser,
          };
          return session;
        } catch (error) {
          throw new Error({
            message: "Este es el error",
            error: error.message,
          });
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      // Custom logic to handle user sign-in
      if (user.account.provider === "credentials") return true;

      // Check if the user already exists in your database
      const existingUser = await User.findOne({ email: user.user.email });
      if (existingUser) {
        if (
          existingUser.username === user.profile.name &&
          existingUser.image === user.profile.picture
        )
          return true;
        await User.findOneAndUpdate(
          { _id: existingUser._id },
          { username: user.profile.name },
          { image: user.profile.picture }
        );
        return true;
      } else {
        await User.create({
          username: user.profile.name,
          email: user.user.email,
          image: user.profile.picture,
          role: normalUser,
        });
      }
      return true;
    },
    async jwt({ token, user,    }) {
      if (user) token.user = user;

      const userFinded = await User.findOne({ email: token.email }).select(
        "username email image role"
      );
      token.user = {
        email: userFinded.email,
        name: userFinded.username,
        image: userFinded.image,
        role: userFinded.role ? userFinded.role : normalUser,
      };
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
