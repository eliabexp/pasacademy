import NextAuth, { type NextAuthOptions, Session } from 'next-auth'
import EmailProvider from "next-auth/providers/email"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import MyAdapter from '@/lib/mongoose/adapter'

export const authOptions: NextAuthOptions = {
    adapter: MyAdapter({}),
    callbacks: {
        async session({ session, user }) {
            const pronouns = {
                m: 'o',
                f: 'a',
                u: 'o(a)'
            }

            session.user = {
                id: user.id,
                email: user.account.email,
                name: user.profile.name,
                pronoun: pronouns[user.profile.gender]
            }

            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login?confirmarEmail',
        newUser: '/login/registrar'
    },
    providers: [
        // EmailProvider({
        //     server: process.env.EMAIL_SERVER,
        // }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
