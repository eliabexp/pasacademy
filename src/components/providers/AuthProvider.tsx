'use client'

import { createContext } from 'react'

interface AuthProviderProps {
    user: any | false | null
    children: React.ReactNode
}

type User = {
    id: string
    email: string
    name: string
    username: string
    pronoun: string
    avatar: string
    level: number
    role: string
    permissions: string[]
} | false | null

export const AuthContext = createContext<User>(null)

export default function AuthProvider({ user, children }: AuthProviderProps) {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
