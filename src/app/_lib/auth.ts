import { AuthOptions } from "next-auth"
import { ApiAdapter } from "./adapter/ApiAdapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";


export const authOptions: AuthOptions = {
    adapter: ApiAdapter(),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
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