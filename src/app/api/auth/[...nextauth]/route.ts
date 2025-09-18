import { ApiAdapter } from "@/app/_lib/adapter/ApiAdapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    adapter: ApiAdapter(),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
  // Outras configurações do NextAuth, como callbacks, páginas personalizadas, etc.
})

export { handler as GET, handler as POST }