import { AuthOptions } from "next-auth"
import { ApiAdapter } from "./adapter/ApiAdapter"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    adapter: ApiAdapter(),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user = {
                ...session.user,
                id: user.id,
            } as any
            return session
        }
    },
  // Outras configurações do NextAuth, como callbacks, páginas personalizadas, etc.
}