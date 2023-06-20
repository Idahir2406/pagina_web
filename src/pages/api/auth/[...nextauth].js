import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "utils/mongoose";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
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
          if(!credentials.email || !credentials.password||credentials.password.length<8) return null;
          
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
          // Validar la contraseña utilizando bcrypt.compare()
          const isValid = await bcrypt.compare(credentials.password,user.password);
          if (!isValid) {
            throw new Error("Password not valid");
          }
          const session = {
            name: user.username,
            email: user.email,
            image: user.image? user.image:null
          }
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
      if(user.account.provider==="credentials")return true;
      
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
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
