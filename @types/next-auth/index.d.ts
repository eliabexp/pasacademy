import type { DefaultSession, DefaultUser } from 'next-auth'
import type { User as ModelUser } from '@/models/user'

declare module 'next-auth' {
    interface User extends DefaultUser, ModelUser {}

    interface Session {
        user: {
            id: string
            email: string
            name: string
            pronoun: string
        }
    }
}