import { cookies } from 'next/headers'
import startDB from '@/lib/mongoose'
import sessions from '@/models/session'
import users, { type User } from '@/models/user'

export default async function auth() {
    const token = cookies().get(`${process.env.NODE_ENV === 'development' ? '' : '__Secure-'}token`)
    if (!token) return null

    await startDB('authDB')
    const session = await sessions.findOneAndUpdate(
        { token: token.value },
        { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }
    )
    if (!session) return null

    await startDB('platformDB')
    const user: User | null = await users.findOne({ id: session.userId })
    if (!user) return false

    const pronouns: { [key: string]: 'o' | 'a' | 'o(a)' } = { m: 'o', f: 'a', u: 'o(a)' }

    return {
        id: user.id,
        email: user.email,
        name: user.profile.name,
        username: user.profile.username,
        pronoun: pronouns[user.profile.gender],
        level: user.profile.level,
        avatar: user.profile.avatar,
        role: user.profile.role,
        permissions: user.account.permissions
    }
}
