import type { Adapter } from '@auth/core/adapters'
import startDB from '.'
import accounts from '@/models/account'
import sessions from '@/models/session'
import tokens from '@/models/token'
import users from '@/models/user'

export default function MyAdapter(): Adapter {
    return {
        async createUser(user) {
            const tempUser = {
                id: `temp-${user.email}`,
                email: user.email,
                emailVerified: null,
            }

            return tempUser
        },
        async getUser(id) {
            await startDB()

            const user = await users.findOne({ id })
            return user
        },
        async getUserByEmail(email) {
            await startDB()

            const user = await users.findOne({ email })
            return user
        },
        async getUserByAccount({ providerAccountId, provider }) {
            await startDB('authDB')

            const account = await accounts.findOne({ providerAccountId, provider })
            if(!account) return null

            await startDB('platformDB')

            const user = await users.findOne({ id: account.userId })
            return user
        },
        async updateUser(user) {
            await startDB()

            const userData = await users.findOne({ id: user.id })
            return userData
        },
        async deleteUser(userId) {
            return
        },
        async linkAccount({ userId, provider, providerAccountId, expires_at, type }) {
            if(userId.startsWith('temp-')) return

            await startDB('authDB')

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
            await startDB('authDB')

            const account: any = await accounts.findOneAndDelete({ providerAccountId, provider })
            return account
        },
        async createSession(session) {
            await startDB('authDB')

            return await sessions.create(session)
        },
        async getSessionAndUser(sessionToken) {
            await startDB('authDB')

            let session = await sessions.findOne({ sessionToken }).select({ _id: 0 })
            if(!session) return null

            await startDB('platformDB')

            let user = await users.findOne({ id: session.userId }).select({ _id: 0 })
            if(!user) user = { id: session.userId, email: session.userId.split('-')[1] }

            return { session, user }
        },
        async updateSession({ sessionToken, expires }) {
            await startDB('authDB')

            const session = await sessions.findOneAndUpdate({ sessionToken }, { expires }, { new: true })
            return session
        },
        async deleteSession(sessionToken) {
            await startDB('authDB')

            const session: any = await sessions.findOneAndDelete({ sessionToken })
            return session
        },
        async createVerificationToken({ identifier, expires, token }) {
            await startDB('authDB')

            const tokenData = await tokens.create({ identifier, expires, token })
            return tokenData
        },
        async useVerificationToken({ identifier, token }) {
            await startDB('authDB')

            const tokenData: any = await tokens.findOneAndDelete({ token, identifier })
            return tokenData
        },
    }
}