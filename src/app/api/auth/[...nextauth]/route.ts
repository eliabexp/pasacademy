import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import startDB from '@/lib/mongoose'
import users from '@/models/user'
import { User } from 'types/api'

const handler = NextAuth({
    callbacks: {
        async signIn({ user, account, profile, email }) {
            // Check same provider if user already exists
            await startDB()

            // Email provider
            if(email && !email.verificationRequest) return true

            // OAuth2
            const userEmail = user.email
            const userData: User | null = await users.findOne({ 'account.email': userEmail })
            if(userData) {
                const userProviders = userData.auth.map(({ provider }) => provider)
                return `/login?error=OAuthAccountNotLinked&provider=`
            }

            return true
        },
        async session({ session, token }) {
            // Check if user already exists
            await startDB()

            // All properties added to session object needs to be declared in 'types/next-auth/index.d.ts'
            const email = session.user.email
            const user = await users.findOne({ 'account.email': email })
            if(user) {
                session.user.id = user.id
                session.user.avatar = user.profile.avatar
                session.user.role = user.role
                session.user.permissions = user.account.permissions
                session.user.plusSubscription = {
                    active: user.plusSubscription.active,
                    expiresAt: user.plusSubscription.expires
                }
            }

            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login?confirmarEmail'
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
})

export { handler as GET, handler as POST }
