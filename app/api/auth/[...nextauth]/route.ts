import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDataBase } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { routeModule } from "next/dist/build/templates/pages";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        
      },
      async authorize(credentials) {
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectDataBase();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordCorrect = await User.findOne({password: credentials.password});
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }
        

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role : user.role,
          
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        
        
      }
      return token;
    },
    async session({ session, token }) {
      const customtoken = token as {id:string, name:string, email:string,role:string};
      
       session.user.id= customtoken.id;
       session.user.name = customtoken.name;
       session.user.email = customtoken.email;
       session.user.role = customtoken.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
