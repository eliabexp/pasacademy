import type { Adapter } from 'next-auth/adapters'
import startDB from '.'
import accounts from '@/models/account'
import sessions from '@/models/session'
import users from '@/models/user'

export default function MyAdapter(options = {}): Adapter {
    return {
        async createUser(user) {
            await startDB()

            return await users.create({
                account: {
                    email: user.email,
                },
                profile: {
                    name: user.name,
                }
            })
        },
        async getUser(id) {
            await startDB()

            const user = await users.findOne({ id })
            return user
        },
        async getUserByEmail(email) {
            await startDB()

            const user = await users.findOne({ 'account.email': email })
            return user
        },
        async getUserByAccount({ providerAccountId, provider }) {
            await startDB()

            const account = await accounts.findOne({ providerAccountId, provider })
            if(!account) return null

            const user = await users.findOne({ id: account.userId })

            return user
        },
        async deleteUser(userId) {
            return
        },
        async linkAccount({ userId, provider, providerAccountId, expires_at, type }) {
            const account = await accounts.create({
                userId: userId,
                provider: provider,
                providerAccountId: providerAccountId,
                expires: expires_at,
                type: type
            })

            return account
        },
        async unlinkAccount({ providerAccountId, provider }) {
            await startDB()

            const account = await accounts.findOneAndDelete({ providerAccountId, provider })

            return account
        },
        async createSession({ sessionToken, userId, expires }) {
            await startDB()

            const session = await sessions.create({ sessionToken, userId, expires })
            return session
        },
        async getSessionAndUser(sessionToken) {
            await startDB()

            const session = await sessions.findOne({ sessionToken })
            if(!session) return null

            const user = await users.findOne({ id: session.userId })
            if(!user) return null

            return { session, user }
        },
        async updateSession({ sessionToken, expires }) {
            await startDB()

            const session = await sessions.findOneAndUpdate({ sessionToken }, { expires }, { new: true })
            return session
        },
        async deleteSession(sessionToken) {
            await startDB()

            const session = await sessions.findOneAndDelete({ sessionToken })
            return session
        },
        // async createVerificationToken({ identifier, expires, token }) {
        //     return
        // },
        // async useVerificationToken({ identifier, token }) {
        //     return
        // },
    }
}