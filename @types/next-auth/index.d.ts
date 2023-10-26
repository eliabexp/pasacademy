import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            avatar: string
            role: string
            permissions: string[]
            plusSubscription: {
                active: boolean
                expiresAt: Date
            }
        } & DefaultSession['user']
    }
}
