import type { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface User extends DefaultUser {}

    interface Session {
        user: {
            id: string
            email: string
            level: number
            name: string
            username: string
            permissions: string[]
            plus: boolean | undefined
            pronoun: string
            registered: true
        } | {
            registered: false
            email: string
        }
    }
}