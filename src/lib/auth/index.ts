import users, { type User as UserType } from '@/models/user'
import { cookies } from 'next/headers'
import sessions from '@/models/session'
import startDB from '@/lib/mongoose'

export interface User {
    id: string
    email: string
    name: string
    username: string
    pronoun: 'o' | 'a' | 'o(a)'
    level: number
    avatar?: string | null
    teacher: boolean
    roles: string[]
}

interface createSessionOptions {
    userId: string
    provider?: string
    expiresAt?: Date
    temporary?: boolean
}

export async function createSession({ userId, provider, expiresAt, temporary }: createSessionOptions) {
    await startDB('authDB')

    const token = crypto.randomUUID()

    const newSession = await sessions.create({
        token: `${temporary ? '' : 't'}${token}`, // temporary tokens start with 't'
        userId: userId,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        ...(provider && { provider })
    })

    const isInDevEnvironment = process.env.NODE_ENV === 'development' // disable https only cookies in dev environment

    cookies().set({
        sameSite: 'lax',
        httpOnly: true,
        secure: isInDevEnvironment ? false : true,
        name: `${isInDevEnvironment ? '' : '__Host-'}token`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        value: newSession.token
    })

    return token
}

export function getSessionToken() {
    const token = cookies().get(`${process.env.NODE_ENV === 'development' ? '' : '__Host-'}token`)
    if (!token) return

    return token.value
}

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
        teacher: user.profile.teacher,
        roles: user.account.roles
    }
}
