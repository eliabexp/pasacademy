import users, { type User as UserType } from '@/models/user'
import { cookies } from 'next/headers'
import sessions from '@/models/session'
import startDB from '@/lib/mongoose'

export function getSessionToken() {
    const token = cookies().get(`${process.env.NODE_ENV === 'development' ? '' : '__Host-'}token`)
    if (!token) return

    return token.value
}

export type User = {
    id: string
    email: string
    name: string
    username: string
    pronoun: 'o' | 'a' | 'o(a)'
    level: number
    avatar?: string | null
    role: string
    permissions: string[]
} | null

export async function auth() {
    const token = getSessionToken()
    if (!token) return null

    await startDB('authDB')
    const session = await sessions.findOne({ token: token, expires: { $gt: new Date() } })
    if (!session) return null
    if (!session.authorized) return null

    // Update session
    await sessions.updateOne(
        { token },
        { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }
    )

    await startDB()
    const user: UserType | null = await users.findOne({ id: session.userId })
    if (!user) return null

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
