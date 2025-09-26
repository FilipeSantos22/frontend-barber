import { AuthOptions } from "next-auth"
import { ApiAdapter } from "./adapter/ApiAdapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";


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
            async sendVerificationRequest({ identifier, url, provider }) {
                const transport = nodemailer.createTransport(provider.server);
                await transport.sendMail({
                    to: identifier,
                    from: provider.from,
                    subject: "Seu acesso à Barbearia",
                    text: `Olá! Clique no link para acessar: ${url}`,
                    html: `<p>Olá!</p><p>Para acessar sua conta, clique no link abaixo:</p><p><a href="${url}">Entrar na Barbearia</a></p><p>Se não foi você, ignore este e-mail.</p>`
                });
            }
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